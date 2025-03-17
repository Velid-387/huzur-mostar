import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private platformId = inject(PLATFORM_ID);

  constructor() { }

  initAnimations(): void {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) return;

    // Check if IntersectionObserver is available in this browser
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver not available, animations disabled');
      
      // Make all elements visible immediately as fallback
      document.querySelectorAll('.animate-item').forEach(item => {
        item.classList.add('animated');
      });
      return;
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1 });

    // Observe all animate-item elements
    document.querySelectorAll('.animate-item').forEach(item => {
      observer.observe(item);
    });
  }
}