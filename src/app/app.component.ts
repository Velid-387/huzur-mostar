import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { FaqComponent } from './components/faq/faq.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

import { AnimationService } from './services/animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    FaqComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  
  ngOnInit(): void {
    // Initialize animations after view is loaded, but only in browser
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.animationService.initAnimations();
      }, 100);
      
      // Handle navigation end events
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Re-initialize animations on navigation
        setTimeout(() => {
          this.animationService.initAnimations();
        }, 100);
      });
    }
  }
}