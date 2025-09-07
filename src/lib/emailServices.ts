// Utilidades para integraciones de email marketing

export interface EmailService {
  name: string;
  subscribe: (email: string, options?: Record<string, unknown>) => Promise<{ success: boolean; message?: string; error?: string }>;
}

// Mailchimp Integration
export class MailchimpService implements EmailService {
  name = 'Mailchimp';
  private apiKey: string;
  private listId: string;
  private datacenter: string;

  constructor(apiKey: string, listId: string) {
    this.apiKey = apiKey;
    this.listId = listId;
    this.datacenter = apiKey.split('-')[1] || 'us1';
  }

  async subscribe(email: string, options: { tags?: string[], mergeFields?: Record<string, unknown> } = {}) {
    try {
      const response = await fetch(`https://${this.datacenter}.api.mailchimp.com/3.0/lists/${this.listId}/members`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: options.tags || ['tech-finance-blog'],
          merge_fields: options.mergeFields || {}
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: 'Successfully subscribed to Mailchimp' };
      } else {
        return { success: false, error: data.detail || 'Mailchimp subscription failed' };
      }
    } catch (error) {
      return { success: false, error: `Mailchimp error: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }
}

// ConvertKit Integration
export class ConvertKitService implements EmailService {
  name = 'ConvertKit';
  private apiKey: string;
  private formId: string;

  constructor(apiKey: string, formId: string) {
    this.apiKey = apiKey;
    this.formId = formId;
  }

  async subscribe(email: string, options: { firstName?: string, tags?: string[] } = {}) {
    try {
      const url = `https://api.convertkit.com/v3/forms/${this.formId}/subscribe`;
      const payload = {
        api_key: this.apiKey,
        email: email,
        first_name: options.firstName || '',
        tags: options.tags || ['tech-finance-blog']
      };

      console.log('ConvertKit API call:', {
        url,
        formId: this.formId,
        email,
        apiKeyPrefix: this.apiKey.substring(0, 10) + '...'
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      console.log('ConvertKit response:', {
        status: response.status,
        ok: response.ok,
        data
      });

      if (response.ok) {
        return { success: true, message: 'Successfully subscribed to ConvertKit' };
      } else {
        return { success: false, error: data.message || data.error || 'ConvertKit subscription failed' };
      }
    } catch (error) {
      console.error('ConvertKit API error:', error);
      return { success: false, error: `ConvertKit error: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }
}

// Resend Integration
export class ResendService implements EmailService {
  name = 'Resend';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async subscribe(email: string, options: { audienceId?: string } = {}) {
    try {
      const response = await fetch('https://api.resend.com/audiences/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          audience_id: options.audienceId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: 'Successfully subscribed to Resend' };
      } else {
        return { success: false, error: data.message || 'Resend subscription failed' };
      }
    } catch (error) {
      return { success: false, error: `Resend error: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }
}

// Brevo (ex-Sendinblue) Integration
export class BrevoService implements EmailService {
  name = 'Brevo';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async subscribe(email: string, options: { listIds?: number[], attributes?: Record<string, unknown> } = {}) {
    try {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify({
          email: email,
          listIds: options.listIds || [1], // Lista por defecto
          attributes: {
            FNAME: options.attributes?.firstName || '',
            LNAME: options.attributes?.lastName || '',
            SOURCE: 'tech-finance-blog',
            SIGNUP_DATE: new Date().toISOString(),
            ...options.attributes
          }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: 'Successfully subscribed to Brevo' };
      } else {
        return { success: false, error: data.message || 'Brevo subscription failed' };
      }
    } catch (error) {
      return { success: false, error: `Brevo error: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }
}

// Factory para crear el servicio de email configurado
export function createEmailService(): EmailService | null {
  // Verificar qué servicio está configurado (orden de prioridad)
  // ConvertKit para suscripciones, otros servicios como backup
  
  if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
    return new ConvertKitService(process.env.CONVERTKIT_API_KEY, process.env.CONVERTKIT_FORM_ID);
  }
  
  if (process.env.BREVO_API_KEY) {
    return new BrevoService(process.env.BREVO_API_KEY);
  }
  
  if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
    return new MailchimpService(process.env.MAILCHIMP_API_KEY, process.env.MAILCHIMP_LIST_ID);
  }

  return null; // No hay servicio configurado
}

// Interfaces para envío de emails
export interface EmailSendOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface EmailSendResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

export interface EmailSender {
  sendEmail: (options: EmailSendOptions) => Promise<EmailSendResult>;
}

// Factory específico para envío de emails (Resend)
export function createEmailSender(): EmailSender | null {
  if (process.env.RESEND_API_KEY) {
    return {
      async sendEmail(options: EmailSendOptions): Promise<EmailSendResult> {
        try {
          const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: options.from || process.env.NEWSLETTER_FROM_EMAIL || 'onboarding@resend.dev',
              to: options.to,
              subject: options.subject,
              html: options.html,
            }),
          });

          const data = await response.json();
          
          if (response.ok) {
            return { success: true, data };
          } else {
            return { success: false, error: data.message || 'Failed to send email' };
          }
        } catch (error) {
          return { success: false, error: `Email send error: ${error instanceof Error ? error.message : 'Unknown error'}` };
        }
      }
    };
  }
  
  return null;
}

// Función para enviar email de bienvenida usando Resend
export async function sendWelcomeEmail(email: string, service: EmailService) {
  const emailSender = createEmailSender();
  
  if (emailSender) {
    try {
      console.log(`Sending welcome email to ${email} via Resend`);
      
      const result = await emailSender.sendEmail({
        to: email,
        subject: '¡Bienvenido a TechFinance Blog! 🚀',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0070f3;">¡Bienvenido a TechFinance Blog! 🚀</h1>
            <p>Gracias por suscribirte a nuestro newsletter.</p>
            <p>Recibirás las mejores noticias sobre:</p>
            <ul>
              <li>💻 Tecnología e Innovación</li>
              <li>💰 Finanzas y Mercados</li>
              <li>🚀 Startups y Emprendimiento</li>
              <li>📈 Análisis de Tendencias</li>
            </ul>
            <p>¡Mantente al día con las últimas tendencias!</p>
            <hr>
            <p><small>Te has suscrito con: ${email}</small></p>
            <p><small>También estás registrado en: ${service.name}</small></p>
          </div>
        `,
        from: process.env.NEWSLETTER_FROM_EMAIL || 'noreply@techfinance.com'
      });
      
      if (result.success) {
        console.log(`Welcome email sent successfully to ${email}`);
      } else {
        console.error(`Failed to send welcome email to ${email}:`, result.error);
      }
      
      return result;
    } catch (error) {
      console.error(`Error sending welcome email to ${email}:`, error);
      return { success: false, error: `Welcome email error: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  } else {
    console.log(`No email sender configured - welcome email for ${email} skipped`);
    return { success: false, error: 'No email sender service available' };
  }
}
