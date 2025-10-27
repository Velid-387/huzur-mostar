import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);

  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToElementById(sectionId);
  }

  toggleImageOverlay(event: Event): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const target = event.currentTarget as HTMLElement;
    if (typeof window !== 'undefined' && window.innerWidth <= 768) { // Only for mobile devices
      target.classList.add('active');
      setTimeout(() => {
        target.classList.remove('active');
      }, 3000); // Remove effect after 3 seconds
    }
  }
}