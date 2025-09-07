# Newsletter System Documentation

## Descripción
Sistema completo de newsletter para el blog TechFinance que incluye:
- API para suscripciones con validación y rate limiting
- Integración con servicios de email marketing populares
- Prevención de emails duplicados
- Manejo robusto de errores

## Configuración

### 1. Variables de Entorno
Copia `.env.example` a `.env.local` y configura las variables según el servicio que quieras usar:

```bash
cp .env.example .env.local
```

### 2. Servicios de Email Marketing Soportados

#### Mailchimp
```env
MAILCHIMP_API_KEY=tu_api_key_de_mailchimp
MAILCHIMP_LIST_ID=tu_list_id
```

#### ConvertKit
```env
CONVERTKIT_API_KEY=tu_api_key_de_convertkit
CONVERTKIT_FORM_ID=tu_form_id
```

#### Resend
```env
RESEND_API_KEY=tu_api_key_de_resend
```

## Uso

### API Endpoints

#### POST /api/newsletter
Suscribe un email al newsletter.

**Request:**
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Response (Éxito):**
```json
{
  "message": "¡Gracias por suscribirte! 🎉 Te enviaremos las mejores noticias de tecnología y finanzas.",
  "success": true,
  "subscriberId": "sub_1234567890_abc123"
}
```

**Response (Error):**
```json
{
  "error": "Este email ya está suscrito a nuestro newsletter",
  "code": "ALREADY_SUBSCRIBED"
}
```

#### GET /api/newsletter?action=stats
Obtiene estadísticas de suscriptores (para administradores).

**Response:**
```json
{
  "totalSubscribers": 150,
  "recentSubscribers": [
    {
      "id": "sub_123",
      "email": "us***@ejemplo.com",
      "subscribedAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

## Características

### Rate Limiting
- Máximo 5 solicitudes por IP cada 15 minutos
- Previene spam y abuso del endpoint

### Validación de Email
- Regex para formato válido
- Normalización (lowercase, trim)
- Verificación de duplicados

### Manejo de Errores
Códigos de error específicos:
- `EMAIL_REQUIRED`: Email no proporcionado
- `INVALID_EMAIL`: Formato de email inválido
- `ALREADY_SUBSCRIBED`: Email ya suscrito
- `RATE_LIMIT_EXCEEDED`: Demasiadas solicitudes
- `INTERNAL_ERROR`: Error del servidor

### Integración con Servicios Externos
El sistema detecta automáticamente qué servicio tienes configurado y lo usa:
1. Verifica variables de entorno
2. Crea instancia del servicio apropiado
3. Suscribe el email al servicio externo
4. Maneja errores gracefully

## Desarrollo

### Estructura de Archivos
```
src/
├── app/api/newsletter/route.ts    # API endpoint principal
├── lib/emailServices.ts           # Integraciones con servicios
└── components/NewsletterForm.tsx  # Componente del formulario
```

### Agregar Nuevo Servicio de Email
1. Implementa la interfaz `EmailService` en `emailServices.ts`
2. Agrega la lógica en `createEmailService()`
3. Configura las variables de entorno necesarias

### Testing
Puedes probar el endpoint usando curl:

```bash
# Suscribir email
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ejemplo.com"}'

# Ver estadísticas
curl http://localhost:3000/api/newsletter?action=stats
```

## Producción

### Base de Datos
En producción, reemplaza el array en memoria por una base de datos real:
- PostgreSQL con Prisma
- MongoDB con Mongoose
- Supabase
- PlanetScale

### Escalabilidad
- Usa Redis para rate limiting distribuido
- Implementa queues para procesamiento asíncrono
- Considera usar CDN para el endpoint

### Seguridad
- Implementa autenticación para endpoint de stats
- Usa HTTPS en producción
- Valida CORS apropiadamente
- Implementa honeypot para prevenir bots

## Métricas y Analytics
Considera agregar:
- Tracking de conversion rates
- A/B testing del formulario
- Analytics de engagement
- Métricas de email delivery
