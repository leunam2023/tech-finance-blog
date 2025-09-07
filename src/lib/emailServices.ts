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
      const response = await fetch(`https://api.convertkit.com/v3/forms/${this.formId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          email: email,
          first_name: options.firstName || '',
          tags: options.tags || ['tech-finance-blog']
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: 'Successfully subscribed to ConvertKit' };
      } else {
        return { success: false, error: data.message || 'ConvertKit subscription failed' };
      }
    } catch (error) {
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
  if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
    return new ConvertKitService(process.env.CONVERTKIT_API_KEY, process.env.CONVERTKIT_FORM_ID);
  }
  
  if (process.env.BREVO_API_KEY) {
    return new BrevoService(process.env.BREVO_API_KEY);
  }
  
  if (process.env.RESEND_API_KEY) {
    return new ResendService(process.env.RESEND_API_KEY);
  }
  
  if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
    return new MailchimpService(process.env.MAILCHIMP_API_KEY, process.env.MAILCHIMP_LIST_ID);
  }

  return null; // No hay servicio configurado
}

// Función para enviar email de bienvenida (opcional)
export async function sendWelcomeEmail(email: string, service: EmailService) {
  // Esta función se puede expandir para enviar emails de bienvenida personalizados
  console.log(`Welcome email would be sent to ${email} via ${service.name}`);
  
  // TODO: Implementar envío de email de bienvenida
  // Puedes usar servicios como Resend, SendGrid, etc.
}
