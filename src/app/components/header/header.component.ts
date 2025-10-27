import { Component, OnInit, inject, PLATFORM_ID, HostListener, OnDestroy } from '@angular/core';
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

  // Cache for section positions to prevent forced reflows
  private sectionPositions: Map<string, { top: number; height: number }> = new Map();
  private rafId: number | null = null;
  private lastScrollCheck: number = 0;
  private readonly scrollThrottle = 100; // ms

  activeSection: string = 'home';
  sections: string[] = ['home', 'about', 'products', 'faq', 'testimonials', 'contact'];
  mobileMenuOpen: boolean = false;
  isDarkMode: boolean = false;
  isProductsDropdownOpen: boolean = false;
  isScrolled: boolean = false;

  productSections = [
    { id: 'freshFlowers', name: 'Svježe cvijeće' },
    { id: 'driedFlowers', name: 'Suho cvijeće' },
    { id: 'magnets', name: 'Lončanice' }
  ];
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Set Home as initial active section
      this.activeSection = 'home';

      // Cache section positions after a brief delay to ensure DOM is ready
      setTimeout(() => this.cacheSectionPositions(), 100);

      // Recache positions on window resize
      window.addEventListener('resize', () => {
        clearTimeout(this.rafId || undefined);
        this.rafId = window.setTimeout(() => this.cacheSectionPositions(), 200);
      });

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
        // Recache positions after navigation
        setTimeout(() => this.cacheSectionPositions(), 100);
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
    if (isPlatformBrowser(this.platformId)) {
      // Update scroll state for navbar styling
      this.isScrolled = window.scrollY > 20;

      // Check active section only if not on blog or legal pages
      // Use throttling to prevent excessive checks
      const now = Date.now();
      if (!this.isOnBlogPage() && !this.isOnLegalPage() && (now - this.lastScrollCheck > this.scrollThrottle)) {
        this.lastScrollCheck = now;
        this.checkActiveSection();
      }
    }
  }

  // Cache section positions to avoid forced reflows during scroll
  private cacheSectionPositions(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.sectionPositions.clear();

    // Cache main sections
    this.sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        this.sectionPositions.set(section, {
          top: element.offsetTop,
          height: element.offsetHeight
        });
      }
    });

    // Cache product subsections
    this.productSections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        this.sectionPositions.set(section.id, {
          top: element.offsetTop,
          height: element.offsetHeight
        });
      }
    });
  }

  checkActiveSection(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.isOnBlogPage() || this.isOnLegalPage()) return;

    const scrollPosition = window.scrollY;
    let foundActiveSection = false;

    // Check if we're at the top of the page - make Home active
    if (scrollPosition < 100) {
      this.activeSection = 'home';
      return;
    }

    // Use cached positions if available, otherwise fall back to DOM reads
    if (this.sectionPositions.size > 0) {
      // Check main sections in reverse order using cached positions
      for (let i = this.sections.length - 1; i >= 0; i--) {
        const section = this.sections[i];
        const pos = this.sectionPositions.get(section);
        if (pos) {
          const offsetTop = pos.top - 100;
          const offsetHeight = pos.height;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            this.activeSection = section;
            foundActiveSection = true;
            break;
          }
        }
      }

      // Check product subsections if no main section was found
      if (!foundActiveSection) {
        for (const section of this.productSections) {
          const pos = this.sectionPositions.get(section.id);
          if (pos) {
            const offsetTop = pos.top - 100;
            const offsetHeight = pos.height;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              this.activeSection = section.id;
              foundActiveSection = true;
              break;
            }
          }
        }
      }

      // Find closest section if still not found
      if (!foundActiveSection) {
        let closestSection = 'home';
        let minDistance = Number.MAX_VALUE;

        this.sectionPositions.forEach((pos, sectionId) => {
          const distance = Math.abs(scrollPosition - pos.top);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = sectionId;
          }
        });

        this.activeSection = closestSection;
      }
    } else {
      // Fallback: recache positions if cache is empty
      this.cacheSectionPositions();
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