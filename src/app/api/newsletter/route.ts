import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validar el email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Aquí podrías integrar con un servicio de email marketing
    // como Mailchimp, ConvertKit, etc.
    // Por ahora, solo simulamos el registro
    
    console.log('Nuevo suscriptor:', email);

    // Simular proceso de suscripción
    // En producción, aquí integrarías con tu servicio de email marketing:
    /*
    const response = await fetch('https://api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    });
    */

    return NextResponse.json(
      { 
        message: '¡Gracias por suscribirte! Te enviaremos las mejores noticias de tech y finanzas.',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al procesar suscripción:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
