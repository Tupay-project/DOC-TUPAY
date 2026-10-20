// ============================================
// endpoint.model.ts
// Modelos para Endpoints de la API
// ============================================

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type ParameterType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date';

export type ParameterLocation = 'header' | 'path' | 'query' | 'body';

export interface Endpoint {
  id: string;
  name: string;
  /** Clave i18n del nombre; si existe, el template la traduce y `name` queda como fallback. */
  nameKey?: string;
  method: HttpMethod;
  path: string;
  baseUrl: string;
  description: string;
  /** Clave i18n de la descripción; si existe, el template la traduce y `description` queda como fallback. */
  descriptionKey?: string;
  category: 'payin' | 'payout';
  headers: Header[];
  pathParameters?: Parameter[];
  queryParameters?: Parameter[];
  requestBody?: RequestBody;
  responses: ApiResponse[];
  examples: CodeExample[];
  tags?: string[];
}

export interface Header {
  name: string;
  value: string;
  required: boolean;
  description?: string;
  /** Clave i18n; si existe, el template la traduce y `description` queda como fallback. */
  descriptionKey?: string;
}

export interface Parameter {
  name: string;
  type: ParameterType;
  required: boolean;
  description: string;
  example?: any;
  defaultValue?: any;
  enum?: string[];
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  location: ParameterLocation;
}

export interface RequestBodyField {
  name: string;
  type: string;
  example: string;
  description: string;
  /** Clave i18n; si existe, el template la traduce y `description` queda como fallback. */
  descriptionKey?: string;
  required: boolean;
}

export interface RequestBody {
  contentType: string;
  description?: string;
  /** Clave i18n; si existe, el template la traduce y `description` queda como fallback. */
  descriptionKey?: string;
  schema: any;
  example?: any;
  required: boolean;
  fields?: RequestBodyField[];
}

export interface ApiResponse {
  status: number;
  statusText: string;
  description: string;
  /** Clave i18n; si existe, el template la traduce y `description` queda como fallback. */
  descriptionKey?: string;
  body: any;
  headers?: Header[];
  isError: boolean;
}

export interface CodeExample {
  language: CodeLanguage;
  code: string;
  title?: string;
}

export type CodeLanguage = 'curl' | 'javascript' | 'python' | 'php' | 'java' | 'go' | 'ruby' | 'bash';

export interface EndpointGroup {
  name: string;
  /** Clave i18n del nombre; si existe, el template la traduce y `name` queda como fallback. */
  nameKey?: string;
  description: string;
  endpoints: Endpoint[];
  icon?: string;
}

// ============================================
// country.model.ts
// Configuración por País
// ============================================

export type CountryCode = 'GTM' | 'DOM' | 'COL';

/**
 * Documento de identidad que la API espera en `userIdentificationNumber`.
 * Varía por país, por eso se documenta junto al resto de la configuración.
 */
export interface CountryIdentification {
  /** Nombre local del documento (DPI, Cédula...) */
  label: string;
  /** Valor de ejemplo, con el mismo formato que acepta la API */
  example: string;
  /** Aclaración de formato que se muestra en las tablas de parámetros */
  hint: string;
}

/** Terminología bancaria local para el enum `userTypeAccount` de la API. */
export interface CountryAccountTypes {
  /** Nombre local de `savings` */
  savings: string;
  /** Nombre local de `checking` */
  checking: string;
}

/**
 * Método de pago disponible en un país. Estructura editable:
 * se pueden agregar, quitar o renombrar métodos sin tocar el código.
 * Refleja la forma que devuelve la API en `data.methods` de la respuesta PayIn.
 */
export interface CountryPaymentMethod {
  /** Slug del método; forma la URL del checkout: /checkout/{id}/{slug} */
  id: string;
  /** Nombre comercial que devuelve la API en `name_method` */
  name_method: string;
  /** Logo del método (URL) o null */
  logo: string | null;
  /** Descripción corta que se muestra en la documentación */
  description: string;
}

export interface Country {
  code: CountryCode;
  name: string;
  fullName: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  /** Código ISO 3166-1 alpha-2 en minúscula (ej. `gt`) para el asset `assets/images/flags/<flagCode>.svg` */
  flagCode: string;
  /** URL base de la API de producción */
  baseUrl: string;
  /** URL del dashboard del país */
  dashboardUrl: string;
  locale: string;
  timezone: string;
  /**
   * `false` mientras el ambiente del país no esté publicado.
   * La documentación se muestra igual, marcada como próximamente.
   */
  available: boolean;
  identification: CountryIdentification;
  accountTypes: CountryAccountTypes;
  /** Banco de ejemplo usado en los payloads de PayOut */
  exampleBank: string;
  /** Teléfono de ejemplo, sin prefijo de país */
  examplePhone: string;
  /** Métodos de pago disponibles en el país (editable) */
  methods: CountryPaymentMethod[];
}

export const COUNTRIES: Record<CountryCode, Country> = {
  GTM: {
    code: 'GTM',
    name: 'Guatemala',
    fullName: 'República de Guatemala',
    currency: 'GTQ',
    currencySymbol: 'Q',
    flag: '🇬🇹',
    flagCode: 'gt',
    baseUrl: 'https://api-gt-v2.tupay.finance',
    dashboardUrl: 'https://guatemala-v2.tupay.finance',
    locale: 'es-GT',
    timezone: 'America/Guatemala',
    available: false,
    identification: {
      label: 'DPI / NIT',
      example: '1234567890101',
      hint: 'DPI (CUI) de 13 dígitos o NIT, sin guiones'
    },
    accountTypes: {
      savings: 'country.accountTypes.savings',
      checking: 'country.accountTypes.checking'
    },
    exampleBank: 'Banco Industrial',
    examplePhone: '51234567',
    methods: [
      {
        id: 'transferencia',
        name_method: 'country.methods.transferencia.name',
        logo: null,
        description: 'country.methods.transferencia.description'
      },
      {
        id: 'efectivo',
        name_method: 'country.methods.efectivo.name',
        logo: null,
        description: 'country.methods.efectivo.description'
      }
    ]
  },
  DOM: {
    code: 'DOM',
    name: 'República Dominicana',
    fullName: 'República Dominicana',
    currency: 'DOP',
    currencySymbol: 'RD$',
    flag: '🇩🇴',
    flagCode: 'do',
    baseUrl: 'https://api-rd-v2.tupay.finance',
    dashboardUrl: 'https://rd-v2.tupay.finance',
    locale: 'es-DO',
    timezone: 'America/Santo_Domingo',
    available: true,
    identification: {
      label: 'Cédula',
      example: '00112345678',
      hint: 'Cédula de 11 dígitos, sin guiones'
    },
    accountTypes: {
      savings: 'country.accountTypes.savings',
      checking: 'country.accountTypes.checking'
    },
    exampleBank: 'Banco Popular Dominicano',
    examplePhone: '8091234567',
    methods: [
      {
        id: 'transferencia',
        name_method: 'country.methods.transferencia.name',
        logo: null,
        description: 'country.methods.transferencia.description'
      },
      {
        id: 'efectivo',
        name_method: 'country.methods.efectivo.name',
        logo: null,
        description: 'country.methods.efectivo.description'
      }
    ]
  },
  COL: {
    code: 'COL',
    name: 'Colombia',
    fullName: 'Colombia',
    currency: 'COP',
    currencySymbol: '$',
    flag: '🇨🇴',
    flagCode: 'co',
    baseUrl: 'https://api-co.tupay.finance',
    dashboardUrl: 'https://colombia.tupay.finance',
    locale: 'es-CO',
    timezone: 'America/Bogota',
    available: true,
    identification: {
      label: 'Cédula',
      example: '1234567890',
      hint: 'Cédula de ciudadanía, sin puntos ni espacios'
    },
    accountTypes: {
      savings: 'country.accountTypes.savings',
      checking: 'country.accountTypes.checking'
    },
    exampleBank: 'Bancolombia',
    examplePhone: '3001234567',
    methods: [
      {
        id: 'transferencia',
        name_method: 'country.methods.transferencia.name',
        logo: null,
        description: 'country.methods.transferencia.description'
      },
      {
        id: 'pse',
        name_method: 'country.methods.pse.name',
        logo: null,
        description: 'country.methods.pse.description'
      }
    ]
  }
};

/**
 * Ambiente compartido de Sandbox / Staging. Es único para todos los países.
 */
export const SANDBOX = {
  name: 'Sandbox V2',
  dashboardUrl: 'https://staging-v2.tupay.finance',
  baseUrl: 'https://apitupay-dev.up.railway.app'
};

/** Países listados en el orden en que se muestran en la documentación. */
export const COUNTRY_LIST: Country[] = [
  COUNTRIES.GTM,
  COUNTRIES.DOM,
  COUNTRIES.COL
];

// ============================================
// postman.model.ts
// Estructura de Postman Collection
// ============================================

export interface PostmanCollection {
  info: PostmanInfo;
  item: PostmanItem[];
  auth?: PostmanAuth;
  variable?: PostmanVariable[];
}

export interface PostmanInfo {
  _postman_id: string;
  name: string;
  description?: string;
  schema: string;
}

export interface PostmanItem {
  name: string;
  description?: string;
  item?: PostmanItem[];
  request?: PostmanRequest;
  response?: PostmanResponse[];
  event?: PostmanEvent[];
}

export interface PostmanRequest {
  method: string;
  header: PostmanHeader[];
  body?: PostmanBody;
  url: PostmanUrl | string;
  description?: string;
  auth?: PostmanAuth;
}

export interface PostmanHeader {
  key: string;
  value: string;
  type?: string;
  disabled?: boolean;
  description?: string;
}

export interface PostmanBody {
  mode: 'raw' | 'urlencoded' | 'formdata' | 'file' | 'graphql';
  raw?: string;
  options?: any;
  urlencoded?: Array<{ key: string; value: string; type?: string }>;
  formdata?: Array<{ key: string; value: string; type?: string }>;
}

export interface PostmanUrl {
  raw: string;
  protocol?: string;
  host?: string[];
  path?: string[];
  query?: Array<{ key: string; value: string }>;
  variable?: PostmanVariable[];
}

export interface PostmanResponse {
  name: string;
  originalRequest: PostmanRequest;
  status: string;
  code: number;
  _postman_previewlanguage: string;
  header: PostmanHeader[];
  cookie?: any[];
  body: string;
}

export interface PostmanAuth {
  type: string;
  apikey?: Array<{ key: string; value: string; type: string }>;
  bearer?: Array<{ key: string; value: string; type: string }>;
}

export interface PostmanVariable {
  key: string;
  value: string;
  type?: string;
}

export interface PostmanEvent {
  listen: string;
  script: {
    type: string;
    exec: string[];
  };
}

// ============================================
// search.model.ts
// Modelos para Búsqueda
// ============================================

export interface SearchResult {
  id: string;
  type: 'endpoint' | 'documentation' | 'example';
  title: string;
  description: string;
  path: string;
  category?: string;
  method?: HttpMethod;
  relevance: number;
  highlights?: SearchHighlight[];
}

export interface SearchHighlight {
  field: string;
  snippet: string;
  matchedText: string;
}

export interface SearchOptions {
  query: string;
  country?: CountryCode;
  category?: string;
  method?: HttpMethod;
  limit?: number;
}

// ============================================
// ui.model.ts
// Modelos de UI
// ============================================

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface Breadcrumb {
  label: string;
  path?: string;
  icon?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  badge?: string | number;
  expanded?: boolean;
  disabled?: boolean;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
}

export interface Modal {
  id: string;
  title: string;
  content: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  actions?: ModalAction[];
}

export interface ModalAction {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
}

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  mode: Theme;
  accentColor?: string;
  fontSize?: 'sm' | 'md' | 'lg';
}

// ============================================
// error.model.ts
// Modelos de Error
// ============================================

export interface ApiError {
  code: number;
  message: string;
  details?: string;
  timestamp?: string;
  path?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export const HTTP_STATUS_CODES: Record<number, string> = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable'
};

export const ERROR_CATEGORIES: Record<number, 'client' | 'server'> = {
  400: 'client',
  401: 'client',
  403: 'client',
  404: 'client',
  422: 'client',
  429: 'client',
  500: 'server',
  502: 'server',
  503: 'server'
};

// ============================================
// language.model.ts
// Idiomas soportados por la documentación
// ============================================

export type Language = 'es' | 'en' | 'zh';

/** Idioma usado cuando no se puede detectar otro. */
export const DEFAULT_LANGUAGE: Language = 'es';

export const SUPPORTED_LANGUAGES: Language[] = ['es', 'en', 'zh'];

export interface LanguageOption {
  code: Language;
  /** Nombre nativo del idioma (se muestra igual sin importar el idioma activo). */
  name: string;
  flag: string;
  /** Código ISO 3166-1 alpha-2 en minúscula del país asociado al idioma */
  flagCode: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Español', flag: '🇦', flagCode: 'ar' },
  { code: 'en', name: 'English', flag: '🇺🇸', flagCode: 'us' },
  { code: 'zh', name: '中文', flag: '🇨', flagCode: 'cn' }
];
