import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-security-scoring',
  templateUrl: './security-scoring.component.html',
  styleUrls: ['./security-scoring.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SecurityScoringComponent {
  calculationExample = `Transaccion: TXN-2025-001234
─────────────────────────────────────────
IP-002   │ VPN detectada (1.0x)      │ +20
DEV-004  │ Device nuevo + alto (1.0x)│ +25
ANO-003  │ Usuario dormido (1.2x)    │ +36
ML       │ Historico positivo        │ -15
─────────────────────────────────────────
TOTAL    │                           │  66
─────────────────────────────────────────
Accion: HOLD (revision manual)`;
}
