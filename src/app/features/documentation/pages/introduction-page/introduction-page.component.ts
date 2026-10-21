import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { COUNTRIES, COUNTRY_LIST, SANDBOX, Country } from '@core/models/api.models';
import { EndpointService } from '@core/services/endpoint.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** Quita el protocolo para mostrar solo el host en los enlaces. */
const host = (url: string) => url.replace(/^https?:\/\//, '');

/** Id de transacción de ejemplo usado en las respuestas. */
const EXAMPLE_TX_ID = '65baf429-9e41-44c5-bb16-5785aa087160';

@Component({
  selector: 'app-introduction-page',
  templateUrl: './introduction-page.component.html',
  styleUrls: ['./introduction-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntroductionPageComponent implements OnInit, OnDestroy {
  readonly countries = COUNTRY_LIST.map(country => ({
    ...country,
    dashboardHost: host(country.dashboardUrl)
  }));

  readonly sandbox = {
    ...SANDBOX,
    dashboardHost: host(SANDBOX.dashboardUrl)
  };

  /** País seleccionado en el selector (los ejemplos de esta página cambian con él). */
  selectedCountry: Country = COUNTRIES.COL;

  private destroy$ = new Subject<void>();

  constructor(private endpointService: EndpointService) {}

  ngOnInit(): void {
    this.endpointService.currentCountry$.pipe(takeUntil(this.destroy$)).subscribe(code => {
      this.selectedCountry = COUNTRIES[code] ?? COUNTRIES.COL;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get quickStartCode(): string {
    const c = this.selectedCountry;
    return `curl -X POST "${c.baseUrl}/api/payin/register" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "currency": "${c.currency}",
    "amount": "100",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "userPhone": "${c.examplePhone}",
    "userIdentificationNumber": "${c.identification.example}",
    "dueDate": "2027/12/31"
  }'`;
  }

  get responseExample(): string {
    const c = this.selectedCountry;
    const sample = {
      success: true,
      message: 'Transaction successfully created',
      code: 200,
      data: {
        id: EXAMPLE_TX_ID,
        status: 'pending',
        reference: '39001303',
        checkoutUrl: `${c.dashboardUrl}/checkout/${EXAMPLE_TX_ID}`,
        currency: c.currency,
        amount: '100.00',
        customId: '1',
        methods: c.methods.map(m => ({
          url: `${c.dashboardUrl}/checkout/${EXAMPLE_TX_ID}/${m.id}`,
          name_method: m.name_method,
          logo: m.logo
        }))
      }
    };
    return JSON.stringify(sample, null, 2);
  }
}
