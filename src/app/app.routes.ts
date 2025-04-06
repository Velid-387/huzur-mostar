import { Routes } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/landing/landing.component').then(c => c.LandingComponent) },
  { path: 'blog', loadComponent: () => import('./components/blog/blog.component').then(c => c.BlogComponent) },
  { path: 'blog/:id', loadComponent: () => import('./components/blog/blog-post/blog-post.component').then(c => c.BlogPostComponent) },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'form-success', loadComponent: () => import('./components/form-success/form-success.component').then(c => c.FormSuccessComponent) },
  // Add a wildcard route that redirects to the home page for any unknown routes
  { path: '**', redirectTo: '', pathMatch: 'full' }
];