import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-security-overview',
  templateUrl: './security-overview.component.html',
  styleUrls: ['./security-overview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SecurityOverviewComponent {
  validateRequestExample = `curl -X POST "https://shield.tupay.finance/api/v1/validate" \\
  -H "Content-Type: application/json" \\
  -H "Api-Key: sk_live_xxxxxxxxxxxxx" \\
  -d '{
    "transaction": {
      "reference": "TXN-2025-001234",
      "amount": 15000,
      "currency": "GTQ"
    },
    "payer": {
      "document": "1234567890",
      "name": "Juan Perez",
      "email": "juan@email.com"
    },
    "device": {
      "ipAddress": "181.52.123.45",
      "fingerprint": "fp_abc123xyz789"
    }
  }'`;

  validateResponseExample = `{
  "status": {
    "status": "OK",
    "reason": "00",
    "message": "Transaccion validada exitosamente",
    "date": "2025-01-15T10:30:00-05:00"
  },
  "data": {
    "id": "val_a2ce48f8-bba3-11ea-b3de-0242ac133",
    "action": "ALLOW",
    "score": 15,
    "riskLevel": "LOW",
    "triggeredRules": [],
    "processingTime": 42
  }
}`;
}
