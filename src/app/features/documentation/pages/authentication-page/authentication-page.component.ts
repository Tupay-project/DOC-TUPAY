import { Component, ViewEncapsulation } from '@angular/core';
import { COUNTRIES, COUNTRY_LIST, SANDBOX } from '@core/models/api.models';

/** Quita el protocolo para mostrar solo el host en los enlaces. */
const host = (url: string) => url.replace(/^https?:\/\//, '');

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationPageComponent {
  readonly countries = COUNTRY_LIST.map(country => ({
    ...country,
    dashboardHost: host(country.dashboardUrl)
  }));

  readonly sandbox = {
    ...SANDBOX,
    dashboardHost: host(SANDBOX.dashboardUrl)
  };

  /** País por defecto de los enlaces a la referencia de la API. */
  readonly defaultCountry = COUNTRIES.COL;

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

  // Webhooks capturados en Sandbox; la firma está recalculada con la API Key de ejemplo
  signaturePayInCaptureExample = `POST /su-ruta-webhook HTTP/1.1
Content-Type: application/json
Content-Length: 170
X-TuPay-Signature: e4ab80bc3cc0dfcbce19ccc3f687541936c6cc6ddc1fc1358ec50c8863c13de6
X-TuPay-Timestamp: 2026-09-16T15:36:48.411Z

{"type":"pay-in","transactionId":149,"userId":42,"amount":"120.00","status":"paid","timestamp":"2026-09-16T15:36:48.411Z","customId":"20260917","amountReceived":"120.00"}`;

  signaturePayOutCaptureExample = `POST /su-ruta-webhook HTTP/1.1
Content-Type: application/json
Content-Length: 169
X-TuPay-Signature: 6fde6bdb39ae2cb0f7848c1fd311312b55ba6559fe4d56474fd3931ce3f78f05
X-TuPay-Timestamp: 2026-09-16T15:29:08.774Z

{"type":"pay-out","transactionId":148,"userId":42,"reference":"REF-002","amount":"15.00","status":"pending","timestamp":"2026-09-16T15:29:08.774Z","customId":"20260916"}`;

  signatureOpensslExample = `API_KEY='3f9a1c7e5b2d48a6f1e4d9c7b5a2e8d3c6f1b0a4d7e2c9f5b3a8d1e6c4f7b0a3d9'

# PayIn -> e4ab80bc3cc0dfcbce19ccc3f687541936c6cc6ddc1fc1358ec50c8863c13de6
printf '%s' '{"type":"pay-in","transactionId":149,"userId":42,"amount":"120.00","status":"paid","timestamp":"2026-09-16T15:36:48.411Z","customId":"20260917","amountReceived":"120.00"}' \\
  | openssl dgst -sha256 -hmac "$API_KEY"

# PayOut -> 6fde6bdb39ae2cb0f7848c1fd311312b55ba6559fe4d56474fd3931ce3f78f05
printf '%s' '{"type":"pay-out","transactionId":148,"userId":42,"reference":"REF-002","amount":"15.00","status":"pending","timestamp":"2026-09-16T15:29:08.774Z","customId":"20260916"}' \\
  | openssl dgst -sha256 -hmac "$API_KEY"`;

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
