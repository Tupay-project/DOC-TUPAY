import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Endpoint, CodeLanguage } from '@core/models/api.models';
import { EndpointService } from '@core/services/endpoint.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-endpoint-detail-page',
  templateUrl: './endpoint-detail-page.component.html',
  styleUrls: ['./endpoint-detail-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EndpointDetailPageComponent implements OnInit, OnDestroy {
  endpoint?: Endpoint;
  selectedLanguage: CodeLanguage = 'curl';
  selectedResponseStatus: number = 200;
  loading = true;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private endpointService: EndpointService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const endpointId = params['endpointId'];
      this.loadEndpoint(endpointId);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadEndpoint(id: string): void {
    this.loading = true;
    this.endpointService.getEndpointById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(endpoint => {
      this.endpoint = endpoint;
      this.loading = false;
      
      if (endpoint?.responses && endpoint.responses.length > 0) {
        this.selectedResponseStatus = endpoint.responses[0].status;
      }
    });
  }

  selectLanguage(language: CodeLanguage): void {
    this.selectedLanguage = language;
  }

  selectResponseStatus(status: number): void {
    this.selectedResponseStatus = status;
  }

  getSelectedExample() {
    return this.endpoint?.examples.find(ex => ex.language === this.selectedLanguage);
  }

  getSelectedResponse() {
    return this.endpoint?.responses.find(r => r.status === this.selectedResponseStatus);
  }

  getFullUrl(): string {
    if (!this.endpoint) return '';
    return `${this.endpoint.baseUrl}${this.endpoint.path}`;
  }

  copyUrl(): void {
    const url = this.getFullUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.toastService.success('URL copiada', url);
      }).catch(() => {
        this.toastService.error('Error al copiar', 'No se pudo copiar la URL');
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.toastService.success('URL copiada', url);
    }
  }
}
