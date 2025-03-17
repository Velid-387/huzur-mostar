import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
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
  isMenuOpen = false;
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Header component initialized');
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const checkbox = document.getElementById('checkbox') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = this.darkModeService.isDark();
        checkbox.addEventListener('change', () => {
          this.darkModeService.toggleDarkMode();
        });
      }
    }
  }

  toggleMenu(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu toggled, isMenuOpen:', this.isMenuOpen);
    
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    
    if (hamburgerMenu && mobileNavMenu) {
      if (this.isMenuOpen) {
        console.log('Adding open classes');
        hamburgerMenu.classList.add('open', 'active');
        mobileNavMenu.classList.add('open', 'active');
      } else {
        console.log('Removing open classes');
        hamburgerMenu.classList.remove('open', 'active');
        mobileNavMenu.classList.remove('open', 'active');
      }
    }
  }

  // Add this method to handle navigation clicks directly
  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToElementById(sectionId);
    
    if (isPlatformBrowser(this.platformId)) {
      // Close mobile menu if open
      this.isMenuOpen = false;
      const hamburgerMenu = document.getElementById('hamburgerMenu');
      const mobileNavMenu = document.getElementById('mobileNavMenu');
      if (hamburgerMenu && mobileNavMenu) {
        hamburgerMenu.classList.remove('active', 'open');
        mobileNavMenu.classList.remove('active', 'open');
      }
    }
  }
}