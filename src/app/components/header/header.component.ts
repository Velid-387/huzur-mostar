import { Component, OnInit, inject, PLATFORM_ID, HostListener } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  private darkModeService = inject(DarkModeService);
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  
  activeSection: string = 'home';
  sections: string[] = ['home', 'about', 'products', 'faq', 'testimonials', 'contact'];
  mobileMenuOpen: boolean = false;
  isDarkMode: boolean = false;
  isProductsDropdownOpen: boolean = false;
  
  productSections = [
    { id: 'driedFlowers', name: 'Suho cvijeće' },
    { id: 'freshFlowers', name: 'Svježe cvijeće' },
    { id: 'magnets', name: 'Magneti' }
  ];
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkActiveSection();
      this.isDarkMode = this.darkModeService.isDark();
    }
  }

  toggleMobileMenu(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      this.isProductsDropdownOpen = false;

      const hamburgerMenu = document.getElementById('hamburgerMenu');
      if (hamburgerMenu) {
        hamburgerMenu.classList.toggle('active');
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
      this.checkActiveSection();
    }
  }

  checkActiveSection(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const scrollPosition = window.scrollY + 200;
    
    // First check product subsections
    for (const section of this.productSections) {
      const element = document.getElementById(section.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = section.id;
          return;
        }
      }
    }
    
    // Then check main sections
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
    
    this.activeSection = sectionId;
    this.scrollService.scrollToElementById(sectionId);

    if (isPlatformBrowser(this.platformId)) {
      if (this.mobileMenuOpen) {
        this.toggleMobileMenu();
      }
      this.isProductsDropdownOpen = false;
    }
  }
}