import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-introduction-page',
  templateUrl: './introduction-page.component.html',
  styleUrls: ['./introduction-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntroductionPageComponent {
  quickStartCode = `curl -X POST "https://api-guatemala.tupay.finance/api/payin/register" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "currency": "GTQ",
    "amount": "100",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "userPhone": "12345678",
    "userIdentificationNumber": "123456789",
    "dueDate": "2025/12/31"
  }'`;

  responseExample = `{
  "success": true,
  "message": "Transaction successfully created",
  "code": 200,
  "data": {
    "id": "65baf429-9e41-44c5-bb16-5785aa087160",
    "status": "pending",
    "reference": "39001303",
    "checkoutUrl": "https://guatemala.tupay.finance/checkout/65baf429...",
    "currency": "GTQ",
    "amount": "100.00",
    "customId": "1"
  }
}`;

  nodeExample = `const TuPay = require('@tupay/sdk');

const tupay = new TuPay({
  apiKey: process.env.TUPAY_API_KEY,
  country: 'GTM' // o 'DOM' para Rep. Dominicana
});

// Crear un PayIn
const payin = await tupay.payin.create({
  amount: 100,
  currency: 'GTQ',
  userName: 'John Doe',
  userEmail: 'john@example.com',
  userPhone: '12345678',
  userIdentificationNumber: '123456789',
  dueDate: '2025/12/31'
});

console.log(payin.checkoutUrl);`;

  pythonExample = `from tupay import TuPay

tupay = TuPay(
    api_key=os.environ.get('TUPAY_API_KEY'),
    country='GTM'  # o 'DOM' para Rep. Dominicana
)

# Crear un PayIn
payin = tupay.payin.create(
    amount=100,
    currency='GTQ',
    user_name='John Doe',
    user_email='john@example.com',
    user_phone='12345678',
    user_identification_number='123456789',
    due_date='2025/12/31'
)

print(payin.checkout_url)`;

  phpExample = `<?php
use TuPay\\TuPayClient;

$tupay = new TuPayClient([
    'api_key' => getenv('TUPAY_API_KEY'),
    'country' => 'GTM' // o 'DOM' para Rep. Dominicana
]);

// Crear un PayIn
$payin = $tupay->payin->create([
    'amount' => 100,
    'currency' => 'GTQ',
    'userName' => 'John Doe',
    'userEmail' => 'john@example.com',
    'userPhone' => '12345678',
    'userIdentificationNumber' => '123456789',
    'dueDate' => '2025/12/31'
]);

echo $payin->checkoutUrl;`;

  webhookExample = `// Configurar webhook para recibir notificaciones
app.post('/webhook/tupay', (req, res) => {
  const event = req.body;

  switch(event.type) {
    case 'payin.completed':
      console.log('Pago completado:', event.data.id);
      // Actualizar estado en tu base de datos
      break;
    case 'payin.failed':
      console.log('Pago fallido:', event.data.id);
      break;
    case 'payout.completed':
      console.log('Transferencia completada:', event.data.id);
      break;
  }

  res.status(200).send('OK');
});`;
}
