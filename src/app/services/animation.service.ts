import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;
  private observedElements = new WeakSet<Element>();

  initAnimations(): void {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Create a single persistent IntersectionObserver
    if (!this.observer) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      }, { threshold: 0.1 });
    }

    // Observe any new animate-item elements that haven't been observed yet
    document.querySelectorAll('.animate-item').forEach(item => {
      if (!this.observedElements.has(item)) {
        this.observedElements.add(item);
        this.observer!.observe(item);
      }
    });
  }
}