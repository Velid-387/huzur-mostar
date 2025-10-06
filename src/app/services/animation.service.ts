import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  constructor() { }

  initAnimations(): void {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Clean up existing observer if any
    if (this.observer) {
      this.observer.disconnect();
    }

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      // Intersection Observer for scroll animations
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      }, { threshold: 0.1 });

      // Observe all animate-item elements
      const items = document.querySelectorAll('.animate-item');
      items.forEach(item => {
        if (this.observer) {
          this.observer.observe(item);
        }
      });
    });
  }
}