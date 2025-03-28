import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/landing/landing.component').then(c => c.LandingComponent) },
  { path: 'blog', loadComponent: () => import('./components/blog/blog.component').then(c => c.BlogComponent) },
  { path: 'blog/:id', loadComponent: () => import('./components/blog/blog-post/blog-post.component').then(c => c.BlogPostComponent) },
  // Add a wildcard route that redirects to the home page for any unknown routes
  { path: '**', redirectTo: '', pathMatch: 'full' }
];