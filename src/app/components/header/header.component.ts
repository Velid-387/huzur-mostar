import { Component, OnInit, inject, PLATFORM_ID, HostListener, OnDestroy, afterNextRender } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode.service';
import { ScrollService } from '../../services/scroll.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private darkModeService = inject(DarkModeService);
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private routerSubscription: Subscription | null = null;
  
  activeSection: string = 'home';
  sections: string[] = ['home', 'about', 'products', 'faq', 'testimonials', 'contact'];
  mobileMenuOpen: boolean = false;
  isDarkMode: boolean = false;
  isProductsDropdownOpen: boolean = false;
  
  productSections = [
    { id: 'freshFlowers', name: 'Svježe cvijeće' },
    { id: 'driedFlowers', name: 'Suho cvijeće' },
    { id: 'magnets', name: 'Lončanice' }
  ];

  constructor() {
    // Use afterNextRender to ensure proper initialization after hydration
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        // Set dark mode state after render
        this.isDarkMode = this.darkModeService.isDark();
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Set Home as initial active section
      this.activeSection = 'home';

      // Then check which section should actually be active
      this.checkActiveSection();

      // Set dark mode state
      this.isDarkMode = this.darkModeService.isDark();

      // Subscribe to router events to handle page changes
      this.routerSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Reset activeSection on blog, terms, or privacy page
        if (this.isOnBlogPage() || this.isOnLegalPage()) {
          this.activeSection = '';
        } else {
          this.handleNavigationToHome();
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Cleanup subscriptions to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    
    // Remove mobile menu class when component is destroyed
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('mobile-menu-open');
    }
  }

  toggleMobileMenu(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      this.isProductsDropdownOpen = false;
      
      // Toggle body class to prevent scrolling
      if (this.mobileMenuOpen) {
        document.body.classList.add('mobile-menu-open');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      } else {
        document.body.classList.remove('mobile-menu-open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    }
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = this.darkModeService.isDark();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId) && !this.isOnBlogPage() && !this.isOnLegalPage()) {
      this.checkActiveSection();
    }
  }

  checkActiveSection(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.isOnBlogPage() || this.isOnLegalPage()) return; // Skip if on blog or legal page
    
    const scrollPosition = window.scrollY;
    let foundActiveSection = false; // Track if we found an active section
    
    // Check if we're at the top of the page - make Home active
    if (scrollPosition < 100) {
      this.activeSection = 'home';
      return;
    }
    
    // First check main sections in reverse order (to prioritize sections that appear first)
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = this.sections[i];
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop - 100; // Add some buffer to detect earlier
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = section;
          foundActiveSection = true;
          break;
        }
      }
    }
    
    // Then check product subsections if no main section was found active
    if (!foundActiveSection) {
      for (const section of this.productSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            this.activeSection = section.id;
            foundActiveSection = true;
            break;
          }
        }
      }
    }
    
    // If still no active section was found, use a simpler approach
    if (!foundActiveSection) {
      // Try to determine which section is closest to the current scroll position
      let closestSection = 'home';
      let minDistance = Number.MAX_VALUE;
      
      // Check main sections first
      for (const section of this.sections) {
        const element = document.getElementById(section);
        if (element) {
          const distance = Math.abs(scrollPosition - element.offsetTop);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        }
      }
      
      // Check product subsections
      for (const section of this.productSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const distance = Math.abs(scrollPosition - element.offsetTop);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section.id;
          }
        }
      }
      
      this.activeSection = closestSection;
    }
  }

  isOnBlogPage(): boolean {
    // Get the current URL directly from the router
    return this.router.url.startsWith('/blog');
  }

  isOnLegalPage(): boolean {
    // Check if on terms or privacy pages
    return this.router.url === '/terms' || this.router.url === '/privacy';
  }

  isActive(section: string): boolean {
    // If on blog or legal pages, no section should be active
    if (this.isOnBlogPage() || this.isOnLegalPage()) {
      return false;
    }
    
    // For regular pages
    if (section === 'products') {
      return this.activeSection === section || this.productSections.some(s => s.id === this.activeSection);
    }
    return this.activeSection === section;
  }

  toggleProductsDropdown(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      event.stopPropagation();
      this.isProductsDropdownOpen = !this.isProductsDropdownOpen;
    }
  }

  @HostListener('document:click')
  closeDropdown(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isProductsDropdownOpen = false;
    }
  }

  scrollToSection(sectionId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    // If on blog or legal page, navigate to home page first
    if (this.isOnBlogPage() || this.isOnLegalPage()) {
      this.activeSection = sectionId; // Set active section immediately for better UX
      this.router.navigateByUrl('/').then(() => {
        // After navigation, scroll to the section (with a small delay to ensure components are loaded)
        setTimeout(() => {
          this.scrollService.scrollToElementById(sectionId);
          // After scrolling, check active section again to ensure it's accurate
          setTimeout(() => {
            this.checkActiveSection();
          }, 100);
        }, 100);
      });
    } else {
      this.activeSection = sectionId;
      this.scrollService.scrollToElementById(sectionId);
    }

    if (isPlatformBrowser(this.platformId)) {
      if (this.mobileMenuOpen) {
        this.toggleMobileMenu();
      }
      this.isProductsDropdownOpen = false;
    }
  }

  // When the router navigates back to home route, manually trigger section check
  private handleNavigationToHome(): void {
    if (isPlatformBrowser(this.platformId) && this.router.url === '/') {
      // First determine which section should be active based on scroll position
      const scrollPosition = window.scrollY;
      
      // If at the top of the page, set Home as active
      if (scrollPosition < 300) {
        this.activeSection = 'home';
      } else {
        // Otherwise do a full check
        this.checkActiveSection();
      }
    }
  }
}