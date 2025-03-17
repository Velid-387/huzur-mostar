import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkMode = false;
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  constructor() {
    // Only access localStorage in browser environments
    if (isPlatformBrowser(this.platformId)) {
      // Check for saved theme preference
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === 'enabled') {
        this.enableDarkMode();
      }
    }
  }

  toggleDarkMode(): void {
    if (this.isDarkMode) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode(): void {
    this.document.body.classList.add('dark-mode');
    
    // Only access localStorage in browser environments
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('darkMode', 'enabled');
    }
    
    this.isDarkMode = true;
  }

  disableDarkMode(): void {
    this.document.body.classList.remove('dark-mode');
    
    // Only access localStorage in browser environments
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('darkMode', 'disabled');
    }
    
    this.isDarkMode = false;
  }

  isDark(): boolean {
    return this.isDarkMode;
  }
}