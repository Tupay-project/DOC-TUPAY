import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-security-integration',
  templateUrl: './security-integration.component.html',
  styleUrls: ['./security-integration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SecurityIntegrationComponent {
  fingerprintCode = `<!-- Incluir en la pagina de checkout -->
<script src="https://shield.tupay.finance/fingerprint.js"></script>
<script>
  Shield.init({ siteId: 'your_site_id' });
  Shield.getFingerprint().then(fp => {
    // Guardar fp.token para enviarlo en /validate
    console.log('Fingerprint:', fp.token);
  });
</script>`;

  nodeIntegration = `const express = require('express');
const axios = require('axios');

const SHIELD_API_KEY = process.env.SHIELD_API_KEY;
const SHIELD_URL = 'https://shield.tupay.finance/api/v1';

async function validateTransaction(transactionData, payerData, deviceData) {
  try {
    const response = await axios.post(\`\${SHIELD_URL}/validate\`, {
      transaction: transactionData,
      payer: payerData,
      device: deviceData
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': SHIELD_API_KEY
      }
    });

    return response.data;
  } catch (error) {
    console.error('Shield validation error:', error.response?.data);
    throw error;
  }
}

// Uso en el flujo de pago
app.post('/checkout', async (req, res) => {
  const { amount, currency, payer, fingerprint, ip } = req.body;

  // 1. Validar con Shield
  const shieldResult = await validateTransaction(
    { reference: \`TXN-\${Date.now()}\`, amount, currency },
    payer,
    { ipAddress: ip, fingerprint }
  );

  // 2. Actuar segun la decision
  switch (shieldResult.data.action) {
    case 'ALLOW':
      // Continuar con el procesador de pagos
      return processPayment(req, res);

    case 'STEP_UP':
      // Solicitar verificacion adicional
      return res.json({
        requiresVerification: true,
        method: shieldResult.data.stepUpMethod,
        validationId: shieldResult.data.id
      });

    case 'HOLD':
      // Transaccion en revision
      return res.json({
        status: 'pending_review',
        message: 'Tu transaccion esta siendo revisada',
        sla: shieldResult.data.sla
      });

    case 'BLOCK':
      // Rechazar transaccion
      return res.status(403).json({
        error: 'Transaction declined',
        reason: 'HIGH_RISK'
      });
  }
});`;

  webhookHandler = `// Configurar webhook para recibir notificaciones de Shield
app.post('/webhooks/shield', (req, res) => {
  const signature = req.headers['x-shield-signature'];

  // Verificar firma del webhook
  if (!verifySignature(req.body, signature)) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body;

  switch (event.type) {
    case 'validation.resolved':
      // Una transaccion HOLD fue resuelta
      console.log('Transaccion resuelta:', event.data.id);
      console.log('Decision:', event.data.action); // ALLOW o BLOCK
      // Actualizar estado en tu base de datos
      break;

    case 'rule.triggered':
      // Una regla importante fue activada
      console.log('Regla activada:', event.data.ruleId);
      break;

    case 'threshold.exceeded':
      // Un comercio excedio un threshold
      console.log('Threshold excedido:', event.data.metric);
      break;
  }

  res.status(200).send('OK');
});`;

  stepUpFlow = `// Manejar verificacion Step-Up
app.post('/verify-otp', async (req, res) => {
  const { validationId, code } = req.body;

  try {
    const response = await axios.post(\`\${SHIELD_URL}/verify\`, {
      id: validationId,
      verification: {
        method: 'OTP_SMS',
        code: code
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': SHIELD_API_KEY
      }
    });

    if (response.data.data.verified) {
      // OTP valido, continuar con el pago
      return processPayment(req, res);
    } else {
      // OTP invalido
      return res.status(400).json({
        error: 'Invalid OTP',
        attemptsRemaining: response.data.data.attemptsRemaining
      });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Verification failed' });
  }
});`;

  notifyResult = `// Notificar resultado final de la transaccion
async function notifyTransactionResult(validationId, status, authCode) {
  try {
    await axios.post(\`\${SHIELD_URL}/notify\`, {
      id: validationId,
      transaction: {
        status: { name: status }, // 'approved', 'declined', 'fraud'
        authorizationCode: authCode
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': SHIELD_API_KEY
      }
    });
  } catch (error) {
    console.error('Failed to notify Shield:', error);
  }
}

// Llamar despues de procesar el pago
app.post('/payment-callback', async (req, res) => {
  const { validationId, paymentStatus, authCode } = req.body;

  // Notificar a Shield el resultado
  await notifyTransactionResult(
    validationId,
    paymentStatus === 'success' ? 'approved' : 'declined',
    authCode
  );

  res.json({ received: true });
});`;
}
