import { Component, ViewEncapsulation } from '@angular/core';
import { TRANSLATIONS } from '@core/i18n';
import { COUNTRIES } from '@core/models/api.models';
import { TranslationService } from '@core/services/translation.service';

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
  /** País por defecto de los enlaces a la referencia de la API. */
  readonly defaultCountry = COUNTRIES.COL;

  constructor(private translationService: TranslationService) {}

  /** Ejemplos de respuesta de la API (datos de ejemplo, no se traducen). */
  private static readonly ERROR_EXAMPLES: Record<number, string> = {
    400: `{
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
}`,
    401: `{
  "success": false,
  "message": "API Key inválida o desactivada",
  "code": 401
}

// Si no se envía ninguna credencial
{
  "success": false,
  "message": "Authentication required. Please provide a valid token or API key",
  "code": 401
}`,
    403: `{
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
}`,
    404: `{
  "success": false,
  "message": "Transaction not found",
  "code": 404,
  "error": "Not Found"
}`,
    429: `HTTP/1.1 429 Too Many Requests
RateLimit-Limit: 10000
RateLimit-Remaining: 0
RateLimit-Reset: 842

Too many requests, please try again later.`,
    500: `{
  "success": false,
  "message": "Internal server error. Please try again later",
  "code": 500,
  "error": "Internal Server Error",
  "requestId": "req_abc123xyz"
}`,
    503: `{
  "success": false,
  "message": "Service temporarily unavailable",
  "code": 503,
  "error": "Service Unavailable"
}`
  };

  /** Lista de códigos resuelta desde el diccionario del idioma activo. */
  get errorCodes(): ErrorCode[] {
    const codes = TRANSLATIONS[this.translationService.getCurrentLanguage()].errors.codes;
    const order = [400, 401, 403, 404, 422, 429, 500, 503];
    return order.map(code => {
      const entry = (codes as Record<string, {
        name: string;
        description: string;
        causes: string[];
        solution: string;
      }>)[String(code)];
      return {
        code,
        name: entry.name,
        description: entry.description,
        causes: [...entry.causes],
        solution: entry.solution,
        example: ErrorsPageComponent.ERROR_EXAMPLES[code]
      };
    });
  }

  /** Ejemplo de estructura de error, traducido en cada ciclo de detección de cambios. */
  get errorFormatExample(): string {
    const t = (key: string) => this.translationService.translate(key);
    return `{
  "success": false,
  "message": "${t('errors.formatExampleMessage')}",
  "code": 400,
  "error": "${t('errors.formatExampleError')}",
  "errors": [...] // ${t('errors.fErrors')}
}`;
  }

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
