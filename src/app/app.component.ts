import { Component, OnInit, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { AnimationService } from './services/animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  constructor() {
    // Use afterNextRender to ensure animations initialize after hydration completes
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.animationService.initAnimations();
      }
    });
  }

  ngOnInit(): void {
    // Handle navigation end events
    if (isPlatformBrowser(this.platformId)) {
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