import { NextRequest, NextResponse } from 'next/server';
import { createEmailService, sendWelcomeEmail } from '@/lib/emailServices';

// Simulamos una base de datos en memoria para el desarrollo
// En producción, esto debería ser una base de datos real
const subscribers: { email: string; subscribedAt: string; id: string }[] = [];

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

    // Verificar si ya está suscrito
    const existingSubscriber = subscribers.find(sub => sub.email === normalizedEmail);
    
    if (existingSubscriber) {
      return NextResponse.json(
        { 
          error: 'Este email ya está suscrito a nuestro newsletter',
          code: 'ALREADY_SUBSCRIBED'
        },
        { status: 409 }
      );
    }

    // Crear nuevo suscriptor
    const newSubscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: normalizedEmail,
      subscribedAt: new Date().toISOString()
    };

    // Guardar suscriptor (en memoria para desarrollo)
    subscribers.push(newSubscriber);

    console.log('Nuevo suscriptor registrado:', {
      id: newSubscriber.id,
      email: normalizedEmail,
      totalSubscribers: subscribers.length
    });

    // Intentar suscribir a servicio de email marketing externo
    const emailService = createEmailService();
    let emailServiceResult = null;
    
    console.log('Checking email service configuration:', {
      hasConvertKitKey: !!process.env.CONVERTKIT_API_KEY,
      hasFormId: !!process.env.CONVERTKIT_FORM_ID,
      emailServiceCreated: !!emailService,
      serviceName: emailService?.name || 'none'
    });
    
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

    // Enviar email de bienvenida (opcional)
    if (emailService && emailServiceResult?.success) {
      try {
        await sendWelcomeEmail(normalizedEmail, emailService);
      } catch (error) {
        console.error('Error sending welcome email:', error);
      }
    }

    // Respuesta exitosa
    return NextResponse.json(
      { 
        message: '¡Gracias por suscribirte! 🎉 Te enviaremos las mejores noticias de tecnología y finanzas.',
        success: true,
        subscriberId: newSubscriber.id
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
        const testEmail = 'test-' + Date.now() + '@ejemplo.com';
        const response = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: process.env.CONVERTKIT_API_KEY,
            email: testEmail,
            tags: ['test-from-api']
          }),
        });

        const data = await response.json();
        
        return NextResponse.json({
          testEmail,
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
      // Solo para verificar configuración - REMOVER EN PRODUCCIÓN
      const emailService = createEmailService();
      return NextResponse.json({
        hasConvertKitKey: !!process.env.CONVERTKIT_API_KEY,
        hasFormId: !!process.env.CONVERTKIT_FORM_ID,
        keyPrefix: process.env.CONVERTKIT_API_KEY?.substring(0, 10) + '...',
        formId: process.env.CONVERTKIT_FORM_ID,
        emailServiceCreated: !!emailService,
        serviceName: emailService?.name || 'none',
        totalSubscribers: subscribers.length
      });
    }

    if (action === 'stats') {
      return NextResponse.json({
        totalSubscribers: subscribers.length,
        recentSubscribers: subscribers
          .slice(-5)
          .map(sub => ({
            id: sub.id,
            email: sub.email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Ofuscar email
            subscribedAt: sub.subscribedAt
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
