import { Component, OnInit, inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  isScrollButtonVisible = false;
  scrollProgress = 0;
  /** Eight petals; each one opens over its own eighth of the scroll range. */
  private static readonly PETAL_COUNT = 8;
  petals: { angle: number; scale: number }[] = FooterComponent.buildPetals(0);
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScrollPosition();
    }
  }

  @HostListener('window:scroll', [])
  checkScrollPosition(): void {
    if (isPlatformBrowser(this.platformId)) {
      const homeSection = document.getElementById('home');
      const homeSectionHeight = homeSection ? homeSection.offsetHeight : 500;

      this.isScrollButtonVisible = window.scrollY > homeSectionHeight;

      // Calculate scroll progress (0 to 1)
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      this.petals = FooterComponent.buildPetals(this.scrollProgress);
    }
  }

  /** Petal i grows from 0 to 1 while progress crosses [i/8, (i+1)/8], so the flower fills clockwise. */
  private static buildPetals(progress: number): { angle: number; scale: number }[] {
    const n = FooterComponent.PETAL_COUNT;
    return Array.from({ length: n }, (_, i) => {
      const local = Math.min(1, Math.max(0, progress * n - i));
      const eased = 1 - Math.pow(1 - local, 3);
      return { angle: i * (360 / n), scale: Math.round(eased * 1000) / 1000 };
    });
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
  
  navigateWithScrollToTop(path: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Prevent default behavior
      event?.preventDefault();
      
      // Manually navigate and scroll
      this.router.navigateByUrl(path).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }
}