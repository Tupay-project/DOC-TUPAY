import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DocsLayoutComponent } from './layouts/docs-layout/docs-layout.component';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { EndpointDetailPageComponent } from './features/api-reference/pages/endpoint-detail-page/endpoint-detail-page.component';
import { IntroductionPageComponent } from './features/documentation/pages/introduction-page/introduction-page.component';
import { AuthenticationPageComponent } from './features/documentation/pages/authentication-page/authentication-page.component';
import { ErrorsPageComponent } from './features/documentation/pages/errors-page/errors-page.component';

// Security Pages
import { SecurityOverviewComponent } from './features/security/pages/security-overview/security-overview.component';
import { SecurityRulesComponent } from './features/security/pages/security-rules/security-rules.component';
import { SecurityScoringComponent } from './features/security/pages/security-scoring/security-scoring.component';
import { SecurityApiComponent } from './features/security/pages/security-api/security-api.component';
import { SecurityIntegrationComponent } from './features/security/pages/security-integration/security-integration.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      }
    ]
  },
  {
    path: 'gateway',
    component: DocsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full'
      },
      {
        path: 'introduction',
        component: IntroductionPageComponent
      },
      {
        path: 'authentication',
        component: AuthenticationPageComponent
      },
      {
        path: 'errors',
        component: ErrorsPageComponent
      }
    ]
  },
  {
    path: ':country/api',
    component: DocsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/gateway/introduction',
        pathMatch: 'full'
      },
      {
        path: ':category/:endpointId',
        component: EndpointDetailPageComponent
      }
    ]
  },
  {
    path: 'security',
    component: DocsLayoutComponent,
    children: [
      {
        path: '',
        component: SecurityOverviewComponent
      },
      {
        path: 'rules',
        component: SecurityRulesComponent
      },
      {
        path: 'scoring',
        component: SecurityScoringComponent
      },
      {
        path: 'api',
        component: SecurityApiComponent
      },
      {
        path: 'integration',
        component: SecurityIntegrationComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
