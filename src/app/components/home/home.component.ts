import { Component, inject, OnInit, HostListener, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { ImageService } from '../../services/image.service';
import { FRESH_FLOWERS, DRIED_FLOWERS, POTTED_PLANTS } from '../../data/products.data';

interface PhotoFrame {
  /** Optimized URLs this frame cycles through. */
  images: string[];
  /** Original (unoptimized) paths, used as a fallback when the optimized file is missing. */
  originals: string[];
  index: number;
  alt: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  private imageService = inject(ImageService);

  showScrollIndicator: boolean = true;
  backgroundImages = [
    'assets/img/home/huzur-home-1.jpg',
    'assets/img/home/huzur-home-9.jpg',
    'assets/img/home/huzur-home-4.jpg',
    'assets/img/home/huzur-home-5.jpg',
    'assets/img/home/huzur-home-6.jpg',
    'assets/img/home/huzur-home-7.jpg',
    'assets/img/home/huzur-home-8.jpg'
  ];
  optimizedBackgroundImages: string[] = [];

  /** Three photo frames; each one cycles through its own share of the shop photos, staggered. */
  frames: PhotoFrame[] = [];
  private readonly frameCount = 3;
  private readonly frameAlts = [
    'Unutrašnjost cvjećare Huzur Mostar',
    'Buket iz ponude cvjećare',
    'Police sa cvijećem u radnji'
  ];
  /** Names that scroll under the hero, drawn from the real offer. */
  marqueeNames: string[] = [
    ...FRESH_FLOWERS.map((p) => p.title),
    ...DRIED_FLOWERS.map((p) => p.title),
    ...POTTED_PLANTS.map((p) => p.title)
  ];
  private slideInterval: any;
  private tick = 0;

  constructor() { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.optimizedBackgroundImages = this.backgroundImages.map(img =>
        this.imageService.getOptimizedImageUrl(img, 768)
      );
      this.buildFrames();
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.startSlideshow();
      }
      this.showScrollIndicator = true;
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.stopSlideshow();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50 && this.showScrollIndicator) {
        this.showScrollIndicator = false;
      } else if (scrollPosition <= 10 && !this.showScrollIndicator) {
        this.showScrollIndicator = true;
      }
    }
  }

  scrollToSection(sectionId: string, event?: Event): void {
    event?.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollToElementById(sectionId);
    }
  }

  /** Swap a frame image for its original when the optimized file is missing. */
  onFrameImageError(frame: PhotoFrame, slideIndex: number): void {
    const original = frame.originals[slideIndex];
    if (frame.images[slideIndex] !== original) {
      frame.images[slideIndex] = original;
    }
  }

  private buildFrames(): void {
    this.frames = Array.from({ length: this.frameCount }, (_, f) => ({
      images: this.optimizedBackgroundImages.filter((_, i) => i % this.frameCount === f),
      originals: this.backgroundImages.filter((_, i) => i % this.frameCount === f),
      index: 0,
      alt: this.frameAlts[f]
    }));
  }

  /** One frame advances every 2.5s, so each frame changes every 7.5s and never together with its neighbours. */
  private startSlideshow() {
    if (isPlatformBrowser(this.platformId)) {
      this.slideInterval = setInterval(() => {
        const frame = this.frames[this.tick % this.frameCount];
        if (frame && frame.images.length > 1) {
          frame.index = (frame.index + 1) % frame.images.length;
        }
        this.tick++;
      }, 2500);
    }
  }

  private stopSlideshow() {
    if (isPlatformBrowser(this.platformId) && this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}
