import { Component, ViewEncapsulation } from '@angular/core';

interface Rule {
  id: string;
  name: string;
  description: string;
  score: number;
}

interface RuleCategory {
  id: number;
  name: string;
  icon: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  rulesCount: number;
  rules: Rule[];
}

interface CompositeSignal {
  id: string;
  name: string;
  combination: string;
  score: number;
}

@Component({
  selector: 'app-security-rules',
  templateUrl: './security-rules.component.html',
  styleUrls: ['./security-rules.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SecurityRulesComponent {
  expandedCategory: number | null = null;

  categories: RuleCategory[] = [
    {
      id: 1,
      name: 'Pitufeo / Structuring',
      icon: '💰',
      priority: 'critical',
      rulesCount: 10,
      rules: [
        { id: 'STR-001', name: 'Multiples transacciones pequenas', description: '>10 transacciones en 1 hora', score: 30 },
        { id: 'STR-002', name: 'Mismo monto repetido', description: 'Mismo valor exacto >3 veces en 1h', score: 25 },
        { id: 'STR-003', name: 'Acumulado diario alto', description: 'Supera el 90% del limite diario', score: 20 },
        { id: 'STR-004', name: 'Fraccionamiento bajo limite', description: 'Transacciones justo debajo del threshold', score: 35 },
        { id: 'STR-005', name: 'Multiples cuentas → mismo beneficiario', description: 'Varias cuentas envian al mismo destino', score: 40 },
        { id: 'STR-006', name: 'Patron escalera (staircase)', description: 'Incremento progresivo del monto', score: 30 },
        { id: 'STR-007', name: 'Usuario → multiples destinos', description: 'Un usuario a >5 beneficiarios en 24h', score: 25 },
        { id: 'STR-008', name: 'Intervalos regulares', description: 'Transacciones cada X minutos exactos', score: 35 },
        { id: 'STR-009', name: 'Fraccionamiento cross-metodo', description: 'Divide entre tarjeta, PSE, efectivo', score: 30 },
        { id: 'STR-010', name: 'Fraccionamiento cross-moneda', description: 'Divide entre GTQ, USD, DOP', score: 35 }
      ]
    },
    {
      id: 2,
      name: 'Actividad Inusual / Comportamiento Anomalo',
      icon: '📊',
      priority: 'critical',
      rulesCount: 8,
      rules: [
        { id: 'ANO-001', name: 'Volumen subito vs historico', description: 'Aumento >300% vs promedio de 30 dias', score: 35 },
        { id: 'ANO-002', name: 'Horario atipico', description: 'Transacciones en madrugada (1am-5am)', score: 15 },
        { id: 'ANO-003', name: 'Usuario dormido reactivado', description: 'Inactivo >90 dias con actividad intensa', score: 30 },
        { id: 'ANO-004', name: 'Multiples paises en horas', description: 'Transacciones desde >2 paises en 4h', score: 40 },
        { id: 'ANO-005', name: 'Cambio brusco de patron', description: 'Desviacion >3σ del comportamiento usual', score: 25 },
        { id: 'ANO-006', name: 'Cambio frecuente de destino', description: '>3 beneficiarios nuevos en 24h', score: 20 },
        { id: 'ANO-007', name: 'Frecuencia inusual', description: '>200% de frecuencia normal', score: 25 },
        { id: 'ANO-008', name: 'Monto atipico', description: '>5x del monto promedio del usuario', score: 30 }
      ]
    },
    {
      id: 3,
      name: 'IP Sospechosa / Red',
      icon: '🌐',
      priority: 'high',
      rulesCount: 10,
      rules: [
        { id: 'IP-001', name: 'IP en lista negra', description: 'IP presente en blacklists conocidas', score: 50 },
        { id: 'IP-002', name: 'VPN detectada', description: 'Conexion a traves de VPN comercial', score: 20 },
        { id: 'IP-003', name: 'Proxy detectado', description: 'Uso de proxy anonimo', score: 25 },
        { id: 'IP-004', name: 'Red Tor', description: 'Exit node de Tor detectado', score: 40 },
        { id: 'IP-005', name: 'Geolocalizacion inconsistente', description: 'IP no coincide con pais del usuario', score: 20 },
        { id: 'IP-006', name: 'IP de data center', description: 'IP de hosting/cloud vs residencial', score: 25 },
        { id: 'IP-007', name: 'Multiples usuarios por IP', description: '>5 usuarios distintos desde misma IP', score: 30 },
        { id: 'IP-008', name: 'Cambio frecuente de IP', description: '>3 IPs diferentes en 1 hora', score: 25 },
        { id: 'IP-009', name: 'ASN de alto riesgo', description: 'Proveedor conocido por fraude', score: 35 },
        { id: 'IP-010', name: 'Historico de fraude', description: 'IP con fraudes previos confirmados', score: 60 }
      ]
    },
    {
      id: 4,
      name: 'Dispositivos y Huella Digital',
      icon: '📱',
      priority: 'high',
      rulesCount: 8,
      rules: [
        { id: 'DEV-001', name: 'Un dispositivo → multiples usuarios', description: '>3 usuarios desde mismo device', score: 35 },
        { id: 'DEV-002', name: 'Emulador detectado', description: 'Senales de emulador Android/iOS', score: 50 },
        { id: 'DEV-003', name: 'Dispositivo rooted/jailbroken', description: 'Device con privilegios elevados', score: 20 },
        { id: 'DEV-004', name: 'Device nuevo + monto alto', description: 'Primera vez del device con monto elevado', score: 25 },
        { id: 'DEV-005', name: 'Navegador automatizado', description: 'Selenium/Puppeteer detectado', score: 45 },
        { id: 'DEV-006', name: 'User-Agent inconsistente', description: 'UA no coincide con fingerprint', score: 30 },
        { id: 'DEV-007', name: 'Multiples devices nuevos', description: '>2 devices nuevos en 24h', score: 25 },
        { id: 'DEV-008', name: 'Cookies borradas frecuentemente', description: 'Sin persistencia de sesion', score: 15 }
      ]
    },
    {
      id: 5,
      name: 'Abuso de API / Automatizacion',
      icon: '🤖',
      priority: 'critical',
      rulesCount: 8,
      rules: [
        { id: 'API-001', name: 'Rate limit excedido', description: '>60 requests por minuto', score: 40 },
        { id: 'API-002', name: 'Firma invalida/repetida', description: 'Signature invalida o reutilizada', score: 50 },
        { id: 'API-003', name: 'Headers faltantes', description: 'Request sin headers obligatorios', score: 30 },
        { id: 'API-004', name: 'Replay attack', description: 'Reenvio de request anterior', score: 60 },
        { id: 'API-005', name: 'Endpoint probing', description: 'Exploracion de endpoints no autorizados', score: 45 },
        { id: 'API-006', name: 'Idempotency key mal usada', description: 'Key repetida con datos diferentes', score: 40 },
        { id: 'API-007', name: 'Payload manipulado', description: 'Alteracion de datos en transito', score: 55 },
        { id: 'API-008', name: 'Scraping detectado', description: 'Acceso masivo a estados de transaccion', score: 35 }
      ]
    },
    {
      id: 6,
      name: 'Manipulacion de Pagos',
      icon: '💳',
      priority: 'critical',
      rulesCount: 8,
      rules: [
        { id: 'PAY-001', name: 'Duplicacion de pago', description: 'Mismo idempotency key reutilizado', score: 50 },
        { id: 'PAY-002', name: 'Monto alterado en retry', description: 'Cambio de monto entre intentos', score: 60 },
        { id: 'PAY-003', name: 'Inconsistencia frontend/backend', description: 'Datos no coinciden entre capas', score: 55 },
        { id: 'PAY-004', name: 'Webhook falsificado', description: 'Callback con firma invalida', score: 70 },
        { id: 'PAY-005', name: 'Webhook IP no permitida', description: 'Origen no autorizado', score: 50 },
        { id: 'PAY-006', name: 'Webhooks fuera de secuencia', description: 'Orden incorrecto de estados', score: 35 },
        { id: 'PAY-007', name: 'Pago sin autorizacion previa', description: 'Cargo sin validacion inicial', score: 60 },
        { id: 'PAY-008', name: 'Cambio de moneda entre intentos', description: 'GTQ → USD en retry', score: 45 }
      ]
    },
    {
      id: 7,
      name: 'Cuentas Bancarias y Beneficiarios',
      icon: '🏦',
      priority: 'high',
      rulesCount: 8,
      rules: [
        { id: 'BEN-001', name: 'Beneficiario recien creado', description: 'Creado hace <24 horas', score: 20 },
        { id: 'BEN-002', name: 'Nombre generico', description: '"Test", "Usuario", "Prueba"', score: 30 },
        { id: 'BEN-003', name: 'Alta rotacion', description: '>5 beneficiarios nuevos en 7 dias', score: 35 },
        { id: 'BEN-004', name: 'Beneficiario compartido', description: 'Mismo destino desde >3 usuarios', score: 40 },
        { id: 'BEN-005', name: 'Datos incompletos', description: 'Faltan campos obligatorios', score: 25 },
        { id: 'BEN-006', name: 'Pais de alto riesgo', description: 'Beneficiario en pais sancionado', score: 50 },
        { id: 'BEN-007', name: 'Sin historial previo', description: 'Primera transaccion al beneficiario', score: 15 },
        { id: 'BEN-008', name: 'Cuenta solo receptora', description: 'Nunca ha enviado, solo recibe', score: 30 }
      ]
    },
    {
      id: 8,
      name: 'Fraude Interno / Abuso de Empleados',
      icon: '👤',
      priority: 'high',
      rulesCount: 8,
      rules: [
        { id: 'INT-001', name: 'Acceso fuera de horario', description: 'Login a consola en madrugada', score: 25 },
        { id: 'INT-002', name: 'Override de reglas frecuente', description: '>5 overrides por usuario/dia', score: 40 },
        { id: 'INT-003', name: 'Cambio manual sin ticket', description: 'Modificacion sin justificacion', score: 35 },
        { id: 'INT-004', name: 'Acceso a datos sensibles', description: 'Query masivo sin necesidad de negocio', score: 45 },
        { id: 'INT-005', name: 'Descarga masiva', description: 'Export de >1000 registros', score: 30 },
        { id: 'INT-006', name: 'Cambio de configuracion', description: 'Modificacion de thresholds', score: 35 },
        { id: 'INT-007', name: 'Cuenta admin operando pagos', description: 'Rol admin haciendo transacciones', score: 50 },
        { id: 'INT-008', name: 'Credenciales compartidas', description: 'Mismo login desde multiples IPs', score: 40 }
      ]
    },
    {
      id: 9,
      name: 'Identidad / KYC / KYB',
      icon: '🪪',
      priority: 'high',
      rulesCount: 9,
      rules: [
        { id: 'KYC-001', name: 'Documento duplicado', description: 'Mismo documento en multiples cuentas', score: 45 },
        { id: 'KYC-002', name: 'Selfie reutilizada', description: 'Misma foto en diferentes usuarios', score: 50 },
        { id: 'KYC-003', name: 'Datos inconsistentes', description: 'Nombre no coincide con documento', score: 40 },
        { id: 'KYC-004', name: 'Beneficiarios finales ocultos', description: 'UBO no declarado', score: 35 },
        { id: 'KYC-005', name: 'Empresa recien creada', description: '<6 meses con alto volumen', score: 30 },
        { id: 'KYC-006', name: 'Giro incoherente', description: 'Actividad no coincide con registro', score: 25 },
        { id: 'KYC-007', name: 'KYC incompleto', description: 'Documentacion pendiente con actividad', score: 35 },
        { id: 'KYC-008', name: 'Rechazos previos', description: 'Rechazado en otros proveedores', score: 40 },
        { id: 'KYC-009', name: 'Lista restrictiva', description: 'Match en PEP/OFAC/ONU', score: 70 }
      ]
    },
    {
      id: 10,
      name: 'Botnets y Ataques Automatizados',
      icon: '🕷️',
      priority: 'critical',
      rulesCount: 8,
      rules: [
        { id: 'BOT-001', name: 'Patron no humano', description: 'Timing perfecto entre requests', score: 40 },
        { id: 'BOT-002', name: 'Headers identicos', description: 'Mismo fingerprint en multiples usuarios', score: 45 },
        { id: 'BOT-003', name: 'Errores identicos', description: 'Mismo error repetido masivamente', score: 35 },
        { id: 'BOT-004', name: 'Creacion masiva de cuentas', description: '>10 cuentas/hora desde misma IP', score: 50 },
        { id: 'BOT-005', name: 'Credenciales filtradas', description: 'Email en breach databases', score: 40 },
        { id: 'BOT-006', name: 'Fuerza bruta', description: '>10 intentos fallidos de login', score: 55 },
        { id: 'BOT-007', name: 'Credential stuffing', description: 'Pares usuario/password conocidos', score: 60 },
        { id: 'BOT-008', name: 'Velocidad sobrehumana', description: 'Acciones mas rapidas que posible', score: 45 }
      ]
    },
    {
      id: 11,
      name: 'Abuso Promocional',
      icon: '🎁',
      priority: 'medium',
      rulesCount: 6,
      rules: [
        { id: 'PRO-001', name: 'Multiples cuentas mismo device', description: 'Abuso de bonos de bienvenida', score: 35 },
        { id: 'PRO-002', name: 'Referidos circulares', description: 'A refiere a B que refiere a A', score: 40 },
        { id: 'PRO-003', name: 'Promocion explotada', description: 'Uso anormal de codigo promocional', score: 30 },
        { id: 'PRO-004', name: 'Auto-referido', description: 'Mismo usuario en ambos lados', score: 45 },
        { id: 'PRO-005', name: 'Retiro inmediato post-bono', description: 'Retira bono sin actividad real', score: 35 },
        { id: 'PRO-006', name: 'Patron de granja', description: 'Multiples cuentas con patron similar', score: 50 }
      ]
    },
    {
      id: 12,
      name: 'Riesgo Geografico',
      icon: '🗺️',
      priority: 'medium',
      rulesCount: 6,
      rules: [
        { id: 'GEO-001', name: 'Pais sancionado', description: 'Origen en pais con sanciones OFAC', score: 70 },
        { id: 'GEO-002', name: 'Viaje imposible', description: 'Transacciones fisicamente imposibles', score: 50 },
        { id: 'GEO-003', name: 'Zona de alto riesgo', description: 'Region conocida por fraude', score: 25 },
        { id: 'GEO-004', name: 'Inconsistencia IP/telefono', description: 'Codigo de area no coincide con IP', score: 20 },
        { id: 'GEO-005', name: 'Multiples zonas horarias', description: 'Actividad en zonas incompatibles', score: 30 },
        { id: 'GEO-006', name: 'Frontera sospechosa', description: 'Actividad concentrada en fronteras', score: 25 }
      ]
    },
    {
      id: 13,
      name: 'Errores Operativos',
      icon: '⚠️',
      priority: 'medium',
      rulesCount: 6,
      rules: [
        { id: 'OPS-001', name: 'Race condition', description: 'Doble procesamiento detectado', score: 40 },
        { id: 'OPS-002', name: 'Timeout explotado', description: 'Retry antes de confirmacion', score: 35 },
        { id: 'OPS-003', name: 'Estado inconsistente', description: 'Transaccion en estado invalido', score: 30 },
        { id: 'OPS-004', name: 'Callback duplicado', description: 'Mismo webhook procesado dos veces', score: 25 },
        { id: 'OPS-005', name: 'Monto negativo', description: 'Intento de monto negativo', score: 50 },
        { id: 'OPS-006', name: 'Overflow detectado', description: 'Valores fuera de rango permitido', score: 45 }
      ]
    },
    {
      id: 14,
      name: 'Riesgo Reputacional',
      icon: '📉',
      priority: 'medium',
      rulesCount: 5,
      rules: [
        { id: 'REP-001', name: 'Alto ratio de chargebacks', description: '>1% de transacciones disputadas', score: 40 },
        { id: 'REP-002', name: 'Reclamos frecuentes', description: '>3 reclamos en 30 dias', score: 30 },
        { id: 'REP-003', name: 'Reviews negativos', description: 'Multiples quejas en redes', score: 20 },
        { id: 'REP-004', name: 'Comercio en watchlist', description: 'MCC de alto riesgo', score: 35 },
        { id: 'REP-005', name: 'Patron de disputa', description: 'Disputas sistematicas post-entrega', score: 45 }
      ]
    },
    {
      id: 15,
      name: 'Observabilidad',
      icon: '📡',
      priority: 'low',
      rulesCount: 5,
      rules: [
        { id: 'OBS-001', name: 'Logging deshabilitado', description: 'Comercio sin enviar logs', score: 15 },
        { id: 'OBS-002', name: 'Fingerprint faltante', description: 'Transaccion sin device fingerprint', score: 20 },
        { id: 'OBS-003', name: 'Metadata incompleta', description: 'Campos opcionales vacios sistematicamente', score: 10 },
        { id: 'OBS-004', name: 'SDK desactualizado', description: 'Version de SDK con vulnerabilidades', score: 25 },
        { id: 'OBS-005', name: 'Integracion atipica', description: 'Patron de uso no estandar', score: 15 }
      ]
    }
  ];

  compositeSignals: CompositeSignal[] = [
    { id: 'CMP-001', name: 'Nuevo usuario sospechoso', combination: 'VPN + Device nuevo + Monto alto + Usuario <7 dias', score: 60 },
    { id: 'CMP-002', name: 'Preparacion para fraude', combination: 'Beneficiario nuevo + Nombre generico + Alta rotacion', score: 50 },
    { id: 'CMP-003', name: 'Ataque automatizado', combination: 'Emulador + Rate alto + User-Agent inconsistente', score: 70 },
    { id: 'CMP-004', name: 'Pitufeo sofisticado', combination: 'Patron escalera + >5 tx/dia + Multiples beneficiarios', score: 70 },
    { id: 'CMP-005', name: 'Cuenta comprometida', combination: 'Ubicacion nueva + Device nuevo + Cambio beneficiario + Payout inmediato', score: 75 },
    { id: 'CMP-006', name: 'Money mule', combination: 'Cuenta nueva + Solo recibe + Retiro inmediato + Multiples origenes', score: 80 },
    { id: 'CMP-007', name: 'Takeover de cuenta', combination: 'IP nueva + Device nuevo + Cambio de email + Cambio de telefono', score: 75 },
    { id: 'CMP-008', name: 'Fraude de primera parte', combination: 'KYC ok + Alto volumen inicial + Disputas posteriores', score: 55 }
  ];

  toggleCategory(categoryId: number): void {
    this.expandedCategory = this.expandedCategory === categoryId ? null : categoryId;
  }

  getPriorityClass(priority: string): string {
    return `priority-badge--${priority}`;
  }

  getScoreClass(score: number): string {
    if (score >= 50) return 'score--high';
    if (score >= 30) return 'score--medium';
    return 'score--low';
  }
}
