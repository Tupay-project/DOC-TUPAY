import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationPageComponent {
  exampleHeader = `curl -X POST "https://api-guatemala.tupay.finance/api/payin/register" \\
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
  'https://api-guatemala.tupay.finance/api/payin/register',
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
    'https://api-guatemala.tupay.finance/api/payin/register',
    json=request_data,
    headers=headers
)`;

  errorExample = `{
  "success": false,
  "message": "Invalid API key or missing authentication",
  "code": 401,
  "error": "Unauthorized"
}`;
}
