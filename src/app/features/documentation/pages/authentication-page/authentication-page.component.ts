import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationPageComponent {
  exampleHeader = `curl -X POST "https://api-gt-v2.tupay.finance/api/payin/register" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: abc123xyz456def789ghi012jkl345"`;

  nodeExample = `const axios = require('axios');

const config = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.TUPAY_API_KEY
  }
};

const response = await axios.post(
  'https://api-gt-v2.tupay.finance/api/payin/register',
  requestData,
  config
);`;

  pythonExample = `import os
import requests

headers = {
    'Content-Type': 'application/json',
    'x-api-key': os.environ.get('TUPAY_API_KEY')
}

response = requests.post(
    'https://api-gt-v2.tupay.finance/api/payin/register',
    json=request_data,
    headers=headers
)`;

  errorExample = `{
  "success": false,
  "message": "API Key inválida o desactivada",
  "code": 401
}`;

  // Webhook examples
  payInWebhookExample = `{
  "type": "pay-in",
  "transactionId": 1024,
  "userId": 42,
  "amount": "500.00",
  "status": "paid",
  "timestamp": "2026-01-15T10:30:00.000Z",
  "customId": "ORDER-001",
  "amountReceived": "500.00"
}`;

  payOutWebhookExample = `{
  "type": "pay-out",
  "transactionId": 2048,
  "userId": 42,
  "reference": "60001001",
  "amount": "300.00",
  "status": "completed",
  "timestamp": "2026-01-15T14:00:00.000Z",
  "customId": "PAYOUT-001",
  "observation": null
}`;

  payOutBulkWebhookExample = `{
  "type": "pay-outs",
  "userId": 42,
  "timestamp": "2026-01-15T18:00:00.000Z",
  "totalTransactions": 3,
  "transactions": [
    {
      "transactionId": 3001,
      "reference": "60001001",
      "amount": "100.00",
      "status": "paid",
      "customId": "PAYOUT-001",
      "observation": null
    },
    {
      "transactionId": 3002,
      "reference": "60001002",
      "amount": "250.00",
      "status": "approved",
      "customId": null,
      "observation": null
    },
    {
      "transactionId": 3003,
      "reference": "60001003",
      "amount": "150.00",
      "status": "rejected",
      "customId": null,
      "observation": "Cuenta destino inválida"
    }
  ]
}`;

  webhookVerifyNodeExample = `const crypto = require('crypto');

// La firma es un HMAC-SHA256 del cuerpo del webhook usando tu API Key como secreto
function verifyWebhookSignature(payload, signature, apiKey) {
  const expectedSignature = crypto
    .createHmac('sha256', apiKey)
    .update(JSON.stringify(payload))
    .digest('hex');

  return signature === expectedSignature;
}

// Uso en tu servidor
app.post('/su-ruta-webhook', (req, res) => {
  const signature = req.headers['x-tupay-signature'];
  const timestamp = req.headers['x-tupay-timestamp']; // ISO 8601, informativo

  if (verifyWebhookSignature(req.body, signature, process.env.TUPAY_API_KEY)) {
    // Procesar el webhook
    console.log('Webhook verificado:', req.body);
    res.status(200).json({ received: true });
  } else {
    res.status(401).json({ error: 'Firma no válida' });
  }
});`;

  webhookVerifyPythonExample = `import hmac
import hashlib
import json

# La firma es un HMAC-SHA256 del cuerpo del webhook usando tu API Key como secreto.
# Firma siempre sobre el cuerpo crudo (raw), sin volver a serializar el JSON.
def verify_webhook_signature(raw_body, signature, api_key):
    expected = hmac.new(
        api_key.encode(),
        raw_body,
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(signature, expected)

# Uso con Flask
@app.route('/su-ruta-webhook', methods=['POST'])
def webhook_handler():
    signature = request.headers.get('X-TuPay-Signature')
    timestamp = request.headers.get('X-TuPay-Timestamp')  # ISO 8601, informativo

    if verify_webhook_signature(request.get_data(), signature, api_key):
        # Procesar el webhook
        return jsonify({"received": True}), 200
    else:
        return jsonify({"error": "Firma no válida"}), 401`;

  webhookVerifyPhpExample = `<?php
// La firma es un HMAC-SHA256 del cuerpo crudo del webhook usando tu API Key como secreto
function verifyWebhookSignature($rawBody, $signature, $apiKey) {
    $expected = hash_hmac('sha256', $rawBody, $apiKey);

    return hash_equals($expected, $signature);
}

// Uso en tu servidor
$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody, true);
$signature = $_SERVER['HTTP_X_TUPAY_SIGNATURE'] ?? '';
$timestamp = $_SERVER['HTTP_X_TUPAY_TIMESTAMP'] ?? ''; // ISO 8601, informativo

if (verifyWebhookSignature($rawBody, $signature, $apiKey)) {
    // Procesar el webhook
    http_response_code(200);
    echo json_encode(["received" => true]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Firma no válida"]);
}`;
}
