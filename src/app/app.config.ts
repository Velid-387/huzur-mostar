import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { OnSameUrlNavigation } from '@angular/router';

// Define router options
const routerOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64], // Adjust based on your header height
  onSameUrlNavigation: 'reload' as OnSameUrlNavigation
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, 
      withComponentInputBinding(),
      withRouterConfig(routerOptions)
    ),
    provideHttpClient(),
    provideAnimations()
  ]
};