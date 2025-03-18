import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
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
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupHamburgerMenu();
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

  setupHamburgerMenu(): void {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    
    if (hamburgerMenu && mobileNavMenu) {
      hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileNavMenu.classList.toggle('active');
      });
    }
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    if (isPlatformBrowser(this.platformId)) {
      const checkbox = document.getElementById('checkbox') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = this.darkModeService.isDark();
      }
    }
  }

  // Add this method to handle navigation clicks directly
  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToElementById(sectionId);
    
    // Close mobile menu if open
    if (isPlatformBrowser(this.platformId)) {
      const hamburgerMenu = document.getElementById('hamburgerMenu');
      const mobileNavMenu = document.getElementById('mobileNavMenu');
      if (hamburgerMenu && mobileNavMenu) {
        hamburgerMenu.classList.remove('active');
        mobileNavMenu.classList.remove('active');
      }
    }
  }
}