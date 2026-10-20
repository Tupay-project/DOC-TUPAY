import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from '@core/services/endpoint.service';
import { COUNTRIES, CountryCode } from '@core/models/api.models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  
  exampleCode = `const response = await fetch("https://api-gt-v2.tupay.finance/api/payin/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
  },
  body: JSON.stringify({
    currency: "GTQ",
    amount: "100",
    userName: "John Doe",
    userEmail: "john@example.com",
    userPhone: "51234567",
    userIdentificationNumber: "1234567890101",
    dueDate: "2027/12/31"
  })
});

const data = await response.json();
console.log(data);`;

  features = [
    {
      icon: 'zap',
      title: 'home.features.fastTitle',
      description: 'home.features.fastDesc'
    },
    {
      icon: 'globe',
      title: 'home.features.coverageTitle',
      description: 'home.features.coverageDesc'
    },
    {
      icon: 'code',
      title: 'home.features.integrationTitle',
      description: 'home.features.integrationDesc'
    },
    {
      icon: 'shield',
      title: 'home.features.secureTitle',
      description: 'home.features.secureDesc'
    }
  ];

  quickStartSteps = [
    {
      step: 1,
      title: 'home.steps.keyTitle',
      description: 'home.steps.keyDesc'
    },
    {
      step: 2,
      title: 'home.steps.configTitle',
      description: 'home.steps.configDesc'
    },
    {
      step: 3,
      title: 'home.steps.callTitle',
      description: 'home.steps.callDesc'
    }
  ];

  constructor(
    private router: Router,
    private endpointService: EndpointService
  ) {}

  ngOnInit(): void {}

  navigateToCountryDocs(countryCode: CountryCode): void {
    this.endpointService.setCurrentCountry(countryCode);
    this.router.navigate([countryCode.toLowerCase(), 'api']);
  }

  navigateToDocs(): void {
    this.router.navigate(['/gateway']);
  }
}
