import { Component, inject, OnInit, HostListener, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

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
  
  showScrollIndicator: boolean = true;
  backgroundImages = [
    'assets/img/home/huzur-home.png',
    'assets/img/home/huzur-home-1.png',
    'assets/img/home/huzur-home-2.png',
    'assets/img/home/huzur-home-3.png',
    'assets/img/home/huzur-home-4.png',
    'assets/img/home/huzur-home-5.png'
  ];
  currentImageIndex = 0;
  private slideInterval: any;
  
  constructor() { }
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startSlideshow();
      // Initialize with scroll indicator visible
      this.showScrollIndicator = true;
    }
  }
  
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.stopSlideshow();
    }
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY;
      
      // Hide scroll indicator after scrolling down a bit
      if (scrollPosition > 50 && this.showScrollIndicator) {
        this.showScrollIndicator = false;
      } else if (scrollPosition <= 10 && !this.showScrollIndicator) {
        // Show it again if user scrolls back to top
        this.showScrollIndicator = true;
      }
    }
  }
  
  scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollToElementById(sectionId);
    }
  }

  private startSlideshow() {
    if (isPlatformBrowser(this.platformId)) {
      this.slideInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
      }, 5000);
    }
  }

  private stopSlideshow() {
    if (isPlatformBrowser(this.platformId) && this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}