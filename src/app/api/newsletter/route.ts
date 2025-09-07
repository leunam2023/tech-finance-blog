import { NextRequest, NextResponse } from 'next/server';
import { createEmailService, sendWelcomeEmail } from '@/lib/emailServices';
import SubscriberService from '@/lib/database';

// Rate limiting simple (en producción usar Redis o similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Función para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para implementar rate limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutos
  const maxRequests = 5; // máximo 5 requests por IP en 15 minutos

  const current = rateLimitMap.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Obtener IP para rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown';
    
    // Verificar rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    const { email } = await request.json();

    // Validaciones
    if (!email) {
      return NextResponse.json(
        { 
          error: 'El email es requerido',
          code: 'EMAIL_REQUIRED'
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { 
          error: 'Por favor, ingresa un email válido',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      );
    }

    // Normalizar email
    const normalizedEmail = email.toLowerCase().trim();

    // Inicializar servicio de base de datos
    const subscriberService = new SubscriberService();

    // Verificar si ya está suscrito
    const existingSubscriber = subscriberService.getSubscriberByEmail(normalizedEmail);
    
    if (existingSubscriber) {
      return NextResponse.json(
        { 
          error: 'Este email ya está suscrito a nuestro newsletter',
          code: 'ALREADY_SUBSCRIBED'
        },
        { status: 409 }
      );
    }

    console.log('Checking email service configuration:', {
      hasConvertKitKey: !!process.env.CONVERTKIT_API_KEY,
      hasFormId: !!process.env.CONVERTKIT_FORM_ID,
    });
    
    // Intentar suscribir a servicio de email marketing externo
    const emailService = createEmailService();
    let emailServiceResult = null;
    
    if (emailService) {
      try {
        console.log(`Attempting to subscribe ${normalizedEmail} to ${emailService.name}`);
        emailServiceResult = await emailService.subscribe(normalizedEmail, {
          tags: ['tech-finance-blog'],
          mergeFields: {
            SIGNUP_URL: request.headers.get('referer') || 'direct',
            SIGNUP_DATE: new Date().toISOString()
          }
        });
        
        if (emailServiceResult.success) {
          console.log(`Successfully subscribed to ${emailService.name}:`, normalizedEmail);
        } else {
          console.error(`Failed to subscribe to ${emailService.name}:`, emailServiceResult.error);
        }
      } catch (error) {
        console.error('Error with email service:', error);
      }
    }

    // Guardar en base de datos local
    const dbResult = subscriberService.addSubscriber({
      email: normalizedEmail,
      status: 'active',
      source: 'website',
      service_name: emailService?.name || 'none',
      service_id: emailServiceResult?.success ? 'subscribed' : 'failed',
      tags: JSON.stringify(['tech-finance-blog'])
    });

    if (!dbResult.success) {
      console.error('Database error:', dbResult.error);
    }

    // Enviar email de bienvenida (independientemente del estado del servicio externo)
    try {
      console.log(`Attempting to send welcome email to: ${normalizedEmail}`);
      const serviceForEmail = emailService || { name: 'Local', subscribe: () => Promise.resolve({ success: false, error: 'Local service' }) };
      await sendWelcomeEmail(normalizedEmail, serviceForEmail);
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }

    // Respuesta exitosa
    return NextResponse.json(
      { 
        message: '¡Gracias por suscribirte! 🎉 Te enviaremos las mejores noticias de tecnología y finanzas.',
        success: true,
        subscriberId: dbResult.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al procesar suscripción:', error);
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor. Inténtalo de nuevo más tarde.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

// Endpoint GET para obtener estadísticas (opcional, para admin)
export async function GET(request: NextRequest) {
  try {
    // En producción, verificar autenticación de admin aquí
    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    if (action === 'test-convertkit') {
      // Prueba directa a ConvertKit API
      try {
        // Permitir email personalizado o usar uno de prueba
        const customEmail = url.searchParams.get('email');
        const testEmail = customEmail || 'test-' + Date.now() + '@ejemplo.com';
        
        const response = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: process.env.CONVERTKIT_API_KEY,
            email: testEmail,
            tags: customEmail ? ['real-test'] : ['test-from-api']
          }),
        });

        const data = await response.json();
        
        return NextResponse.json({
          testEmail,
          isCustomEmail: !!customEmail,
          success: response.ok,
          status: response.status,
          response: data,
          url: `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`
        });
      } catch (error) {
        return NextResponse.json({
          error: `Test error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          success: false
        });
      }
    }

    if (action === 'debug') {
      // Solo para verificar configuración - REMOVER EN PRODUCCIÓN
      const emailService = createEmailService();
      const subscriberService = new SubscriberService();
      const stats = subscriberService.getStats();
      
      return NextResponse.json({
        hasConvertKitKey: !!process.env.CONVERTKIT_API_KEY,
        hasFormId: !!process.env.CONVERTKIT_FORM_ID,
        keyPrefix: process.env.CONVERTKIT_API_KEY?.substring(0, 10) + '...',
        formId: process.env.CONVERTKIT_FORM_ID,
        emailServiceCreated: !!emailService,
        serviceName: emailService?.name || 'none',
        totalSubscribers: stats.total
      });
    }

    if (action === 'stats') {
      const subscriberService = new SubscriberService();
      const stats = subscriberService.getStats();
      const recentSubscribers = subscriberService.getActiveSubscribers(5);
      
      return NextResponse.json({
        totalSubscribers: stats.total,
        recentSubscribers: recentSubscribers
          .map(sub => ({
            id: sub.id,
            email: sub.email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Ofuscar email
            subscribedAt: sub.subscribed_at
          }))
      });
    }

    return NextResponse.json(
      { message: 'Newsletter API activa', version: '1.0.0' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en GET newsletter:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
