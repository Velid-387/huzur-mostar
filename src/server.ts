/**
 * This is a Netlify-compatible server file that works with the @netlify/angular-runtime package
 */
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// This is the standard export that Netlify's angular-runtime looks for
export default {
  bootstrap: [AppComponent],
  config: config
};
