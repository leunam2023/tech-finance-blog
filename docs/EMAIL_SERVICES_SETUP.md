# Configuración Recomendada para Servicios Gratuitos

## Configuración ConvertKit (Recomendado)

### 1. Crear Cuenta
1. Ve a [convertkit.com](https://convertkit.com)
2. Crea cuenta gratuita
3. Verifica tu email

### 2. Configurar Formulario
1. Ve a "Forms" → "Create Form"
2. Selecciona "Inline" o "Modal"
3. Personaliza diseño y texto
4. Obtén el Form ID (aparece en la URL)

### 3. Obtener API Key
1. Ve a "Settings" → "Advanced"
2. Copia tu "API Secret" (no el público)

### 4. Variables de Entorno
```env
CONVERTKIT_API_KEY=tu_api_secret_aqui
CONVERTKIT_FORM_ID=tu_form_id_aqui
```

## Configuración Resend (Para emails transaccionales)

### 1. Crear Cuenta
1. Ve a [resend.com](https://resend.com)
2. Regístrate con GitHub
3. Verifica tu dominio (opcional para empezar)

### 2. Obtener API Key
1. Ve a "API Keys"
2. Crea nueva API key
3. Copia el token

### 3. Variables de Entorno
```env
RESEND_API_KEY=re_tu_api_key_aqui
```

## Configuración Dual (Lo Mejor de Ambos)

Para aprovechar lo mejor de ambos servicios:

### ConvertKit: Newsletter principal
- Gestión de suscriptores
- Campañas de email marketing
- Automatizaciones
- Segmentación

### Resend: Emails transaccionales
- Email de confirmación de suscripción
- Notificaciones del sistema
- Emails de bienvenida personalizados

### Variables de Entorno Completas
```env
# ConvertKit (Newsletter principal)
CONVERTKIT_API_KEY=tu_api_secret
CONVERTKIT_FORM_ID=tu_form_id

# Resend (Emails transaccionales)
RESEND_API_KEY=re_tu_api_key

# Configuración
NEWSLETTER_FROM_EMAIL=noreply@tudominio.com
NEWSLETTER_FROM_NAME=TechFinance Blog
```

## Configuración Alternativa: Solo Brevo

Si prefieres un solo servicio:

### 1. Crear Cuenta en Brevo
1. Ve a [brevo.com](https://brevo.com)
2. Crea cuenta gratuita
3. Verifica email y teléfono

### 2. Obtener API Key
1. Ve a "SMTP & API" → "API Keys"
2. Crea nueva API key
3. Copia el token

### 3. Variables de Entorno
```env
BREVO_API_KEY=xkeysib-tu_api_key
```

## Límites y Consideraciones

### ConvertKit Free
- ✅ 1,000 suscriptores
- ✅ Emails ilimitados a esos suscriptores
- ✅ Automatizaciones básicas
- ❌ No remove branding
- ❌ No advanced reporting

### Resend Free
- ✅ 3,000 emails/mes
- ✅ Contactos ilimitados
- ✅ API completa
- ❌ Solo para uso personal/desarrollo

### Brevo Free
- ✅ 300 emails/día (9,000/mes)
- ✅ Contactos ilimitados
- ✅ Plantillas incluidas
- ❌ Branding de Brevo incluido

## Migración Futura

Cuando crezcas:
- **ConvertKit**: $9/mes hasta 300 suscriptores
- **Resend**: $20/mes por 50,000 emails
- **Brevo**: $25/mes sin límites de envío

## Testing Rápido

Para probar rápidamente, puedes usar EmailJS:
```env
EMAILJS_SERVICE_ID=tu_service_id
EMAILJS_TEMPLATE_ID=tu_template_id
EMAILJS_PUBLIC_KEY=tu_public_key
```
