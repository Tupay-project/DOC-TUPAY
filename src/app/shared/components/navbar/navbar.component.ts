import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@core/services/theme.service';
import { EndpointService } from '@core/services/endpoint.service';
import { TranslationService } from '@core/services/translation.service';
import { Country, COUNTRIES, CountryCode, Language, LANGUAGES, LanguageOption } from '@core/models/api.models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  @Output() searchFocus = new EventEmitter<void>();

  isDarkMode$: Observable<boolean>;
  currentCountry: Country = COUNTRIES.GTM;
  countries = Object.values(COUNTRIES).filter(c => c.available);
  showCountryDropdown = false;
  showLanguageDropdown = false;
  showMobileMenu = false;

  languages: LanguageOption[] = LANGUAGES;
  currentLanguage: Language = 'es';
  currentLanguageOption: LanguageOption = LANGUAGES[0];

  constructor(
    private themeService: ThemeService,
    private endpointService: EndpointService,
    private translationService: TranslationService
  ) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }

  ngOnInit(): void {
    this.endpointService.currentCountry$.subscribe(code => {
      this.currentCountry = COUNTRIES[code];
    });

    this.translationService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      this.currentLanguageOption = LANGUAGES.find(l => l.code === language) ?? LANGUAGES[0];
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  selectCountry(country: Country): void {
    this.currentCountry = country;
    this.endpointService.setCurrentCountry(country.code);
    this.showCountryDropdown = false;
  }

  toggleCountryDropdown(): void {
    this.showCountryDropdown = !this.showCountryDropdown;
    this.showLanguageDropdown = false;
  }

  toggleLanguageDropdown(): void {
    this.showLanguageDropdown = !this.showLanguageDropdown;
    this.showCountryDropdown = false;
  }

  selectLanguage(language: Language): void {
    this.translationService.setLanguage(language);
    this.showLanguageDropdown = false;
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    this.menuToggle.emit();
  }

  onSearchClick(): void {
    this.searchFocus.emit();
  }
}
