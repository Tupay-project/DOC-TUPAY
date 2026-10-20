import { Component, OnInit, HostListener } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { EndpointService } from './core/services/endpoint.service';
import { SearchModalService } from './core/services/search-modal.service';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><app-toast></app-toast>',
  styles: []
})
export class AppComponent implements OnInit {
  
  constructor(
    private themeService: ThemeService,
    private endpointService: EndpointService,
    private searchModalService: SearchModalService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.translationService.getCurrentLanguage();
    this.themeService.setTheme(this.themeService.getCurrentTheme());
    this.endpointService.setCurrentCountry('GTM');
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.searchModalService.open();
    }
  }
}
