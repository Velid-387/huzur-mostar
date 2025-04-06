import { Component, inject, OnInit, HostListener, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  
  showScrollIndicator: boolean = true;
  
  ngOnInit(): void {
    // Initialize with scroll indicator visible
    this.showScrollIndicator = true;
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
    this.scrollService.scrollToElementById(sectionId);
  }
}