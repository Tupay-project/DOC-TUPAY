import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-security-api',
  templateUrl: './security-api.component.html',
  styleUrls: ['./security-api.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SecurityApiComponent {
  validateRequest = `{
  "transaction": {
    "reference": "TXN-2025-001234",
    "amount": 15000000,
    "currency": "GTQ",
    "description": "Compra en linea"
  },
  "payer": {
    "document": "1234567890",
    "documentType": "DPI",
    "name": "Juan",
    "surname": "Perez",
    "email": "juan.perez@email.com",
    "mobile": "+50212345678"
  },
  "payment": {
    "instrument": {
      "card": {
        "number": "411111******1111",
        "expirationMonth": "12",
        "expirationYear": "2027"
      }
    }
  },
  "device": {
    "ipAddress": "181.52.123.45",
    "userAgent": "Mozilla/5.0...",
    "fingerprint": "fp_abc123xyz789"
  }
}`;

  validateResponseAllow = `{
  "status": {
    "status": "OK",
    "reason": "00",
    "message": "Transaccion validada exitosamente",
    "date": "2025-01-15T10:30:00-06:00"
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

  validateResponseStepup = `{
  "status": {
    "status": "OK",
    "reason": "21",
    "message": "Verificacion adicional requerida",
    "date": "2025-01-15T10:30:00-06:00"
  },
  "data": {
    "id": "val_b3cf59a9-cca4-22fb-c4ef-0353bd244",
    "action": "STEP_UP",
    "score": 38,
    "riskLevel": "MEDIUM",
    "stepUpMethod": "OTP_SMS",
    "triggeredRules": ["IP-002", "DEV-004"],
    "processingTime": 48
  }
}`;

  validateResponseHold = `{
  "status": {
    "status": "PENDING",
    "reason": "20",
    "message": "Transaccion en revision manual",
    "date": "2025-01-15T10:30:00-06:00"
  },
  "data": {
    "id": "val_c4dg60b0-ddb5-33gc-d5fg-0464ce355",
    "action": "HOLD",
    "score": 67,
    "riskLevel": "HIGH",
    "sla": "4h",
    "triggeredRules": ["STR-004", "ANO-003", "IP-007"],
    "processingTime": 52
  }
}`;

  validateResponseBlock = `{
  "status": {
    "status": "REJECTED",
    "reason": "10",
    "message": "Transaccion rechazada por alto riesgo",
    "date": "2025-01-15T10:30:00-06:00"
  },
  "data": {
    "id": "val_d5eh71c1-eec6-44hd-e6gh-0575df466",
    "action": "BLOCK",
    "score": 92,
    "riskLevel": "CRITICAL",
    "triggeredRules": ["IP-001", "BOT-007", "DEV-002"],
    "processingTime": 35
  }
}`;

  notifyRequest = `{
  "id": "val_a2ce48f8-bba3-11ea-b3de-0242ac133",
  "transaction": {
    "status": {
      "name": "approved"
    },
    "reference": "TXN-2025-001234",
    "authorizationCode": "ABC123"
  }
}`;

  verifyRequest = `{
  "id": "val_b3cf59a9-cca4-22fb-c4ef-0353bd244",
  "verification": {
    "method": "OTP_SMS",
    "code": "123456"
  }
}`;

  curlExample = `curl -X POST "https://shield.tupay.finance/api/v1/validate" \\
  -H "Content-Type: application/json" \\
  -H "Api-Key: sk_live_xxxxxxxxxxxxx" \\
  -d '{
    "transaction": {
      "reference": "TXN-2025-001234",
      "amount": 15000000,
      "currency": "GTQ"
    },
    "payer": {
      "document": "1234567890",
      "name": "Juan Perez",
      "email": "juan@email.com"
    },
    "device": {
      "ipAddress": "181.52.123.45",
      "fingerprint": "fp_abc123"
    }
  }'`;
}
