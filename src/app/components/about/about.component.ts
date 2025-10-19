import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { OptimizedImageComponent } from '../shared/optimized-image/optimized-image.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, OptimizedImageComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  private scrollService = inject(ScrollService);
  
  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToElementById(sectionId);
  }

  toggleImageOverlay(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    if (window.innerWidth <= 768) { // Only for mobile devices
      target.classList.add('active');
      setTimeout(() => {
        target.classList.remove('active');
      }, 3000); // Remove effect after 3 seconds
    }
  }
}