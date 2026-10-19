import { Component, OnInit, HostListener } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { EndpointService } from './core/services/endpoint.service';
import { SearchModalService } from './core/services/search-modal.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><app-toast></app-toast>',
  styles: []
})
export class AppComponent implements OnInit {
  
  constructor(
    private themeService: ThemeService,
    private endpointService: EndpointService,
    private searchModalService: SearchModalService
  ) {}

  ngOnInit(): void {
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
