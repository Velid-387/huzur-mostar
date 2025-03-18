// This file is used by Netlify to render your Angular application
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Export a bootstrapping function for Netlify (browser-side)
export function bootstrap() {
  return bootstrapApplication(AppComponent, appConfig);
} 