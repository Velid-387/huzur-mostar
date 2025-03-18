import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  private darkModeService = inject(DarkModeService);
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  
  activeSection: string = 'home';
  sections: string[] = ['home', 'about', 'products', 'faq', 'testimonials', 'contact'];
  mobileMenuOpen: boolean = false;
  isDarkMode: boolean = false;
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkActiveSection();
      this.isDarkMode = this.darkModeService.isDark();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // This will now be handled by Angular's property binding
    }
  }

  toggleMobileMenu(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    }
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = this.darkModeService.isDark();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkActiveSection();
    }
  }

  checkActiveSection(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const scrollPosition = window.scrollY + 200; // Adding offset for better UX
    
    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  // Add this method to handle navigation clicks directly
  scrollToSection(sectionId: string): void {
    this.activeSection = sectionId;
    this.scrollService.scrollToElementById(sectionId);
    
    // Close mobile menu if open
    if (isPlatformBrowser(this.platformId) && this.mobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }
}