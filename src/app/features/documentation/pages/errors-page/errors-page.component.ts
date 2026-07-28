import { Component, ViewEncapsulation } from '@angular/core';

interface ErrorCode {
  code: number;
  name: string;
  description: string;
  causes: string[];
  solution: string;
  example?: string;
}

@Component({
  selector: 'app-errors-page',
  templateUrl: './errors-page.component.html',
  styleUrls: ['./errors-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorsPageComponent {
  errorCodes: ErrorCode[] = [
    {
      code: 400,
      name: 'Bad Request',
      description: 'La petición incumple una regla de negocio o incluye un campo no permitido.',
      causes: [
        'Transacción duplicada aún en revisión',
        'Campo no permitido en el body (la API solo acepta los campos documentados)',
        'JSON mal formado en el body',
        'Monto menor o igual a cero'
      ],
      solution: 'Envía únicamente los campos documentados del endpoint y revisa el mensaje devuelto.',
      example: `{
  "success": false,
  "message": "Ya tienes una transacción similar en revisión. Espera un momento mientras se valida, por favor.",
  "code": 400
}

// Campo no permitido en el body
{
  "errors": [
    {
      "msg": "Field not allowed: userBank",
      "param": "userBank"
    }
  ]
}`
    },
    {
      code: 401,
      name: 'Unauthorized',
      description: 'La API Key es inválida, está ausente o ha sido revocada.',
      causes: [
        'API Key incorrecta',
        'Header x-api-key faltante',
        'API Key deshabilitada',
        'API Key expirada'
      ],
      solution: 'Verifica que estés usando la API Key correcta del país al que apuntas, en el header x-api-key.',
      example: `{
  "success": false,
  "message": "API Key inválida o desactivada",
  "code": 401
}

// Si no se envía ninguna credencial
{
  "success": false,
  "message": "Authentication required. Please provide a valid token or API key",
  "code": 401
}`
    },
    {
      code: 403,
      name: 'Forbidden',
      description: 'Uno o más campos del body no pasaron la validación, o no tienes permisos sobre el recurso.',
      causes: [
        'Campo requerido faltante (userName, userPhone, userEmail, userIdentificationNumber, dueDate...)',
        'Formato inválido (por ejemplo, userEmail no es un correo válido)',
        'amount no numérico o menor o igual a cero',
        'API Key sin permisos sobre el recurso solicitado'
      ],
      solution: 'Revisa el arreglo errors: cada entrada indica el campo (path) y el motivo (msg).',
      example: `{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid value",
      "path": "amount",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Invalid value",
      "path": "userEmail",
      "location": "body"
    }
  ]
}`
    },
    {
      code: 404,
      name: 'Not Found',
      description: 'El recurso solicitado no existe.',
      causes: [
        'ID de transacción inexistente',
        'Endpoint incorrecto',
        'Recurso eliminado'
      ],
      solution: 'Verifica que el ID del recurso sea correcto y que el endpoint exista.',
      example: `{
  "success": false,
  "message": "Transaction not found",
  "code": 404,
  "error": "Not Found"
}`
    },
    {
      code: 429,
      name: 'Too Many Requests',
      description: 'Has excedido el límite de 10.000 peticiones por IP cada 15 minutos.',
      causes: [
        'Demasiadas peticiones en corto tiempo desde la misma IP',
        'Reintentos sin backoff tras un error',
        'Varios procesos compartiendo la misma IP de salida'
      ],
      solution: 'Implementa backoff exponencial y usa las cabeceras RateLimit-Remaining y RateLimit-Reset para regular tu consumo.',
      example: `HTTP/1.1 429 Too Many Requests
RateLimit-Limit: 10000
RateLimit-Remaining: 0
RateLimit-Reset: 842

Too many requests, please try again later.`
    },
    {
      code: 500,
      name: 'Internal Server Error',
      description: 'Error interno del servidor. El equipo de TuPay ha sido notificado.',
      causes: [
        'Error inesperado en el servidor',
        'Problema de base de datos',
        'Servicio temporal no disponible'
      ],
      solution: 'Reintenta la petición. Si persiste, contacta a soporte.',
      example: `{
  "success": false,
  "message": "Internal server error. Please try again later",
  "code": 500,
  "error": "Internal Server Error",
  "requestId": "req_abc123xyz"
}`
    },
    {
      code: 503,
      name: 'Service Unavailable',
      description: 'El servicio está temporalmente no disponible, generalmente por mantenimiento.',
      causes: [
        'Mantenimiento programado',
        'Sobrecarga del sistema',
        'Actualización en progreso'
      ],
      solution: 'Espera unos minutos y reintenta. Verifica el status en status.tupay.finance',
      example: `{
  "success": false,
  "message": "Service temporarily unavailable",
  "code": 503,
  "error": "Service Unavailable"
}`
    }
  ];

  retryExample = `const maxRetries = 3;
let retries = 0;

async function makeRequestWithRetry() {
  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || 60;
        await sleep(retryAfter * 1000);
        retries++;
        continue;
      }
      
      if (response.status >= 500) {
        const backoff = Math.pow(2, retries) * 1000; // Exponential backoff
        await sleep(backoff);
        retries++;
        continue;
      }
      
      return response;
    } catch (error) {
      retries++;
      if (retries >= maxRetries) throw error;
      await sleep(Math.pow(2, retries) * 1000);
    }
  }
  
  throw new Error('Max retries exceeded');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}`;

  getErrorClass(code: number): string {
    if (code >= 400 && code < 500) return 'client-error';
    if (code >= 500) return 'server-error';
    return '';
  }
}
