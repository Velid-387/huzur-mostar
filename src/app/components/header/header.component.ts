import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  
  ngOnInit(): void {
    this.setupHamburgerMenu();
  }

  ngAfterViewInit(): void {
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = this.darkModeService.isDark();
      checkbox.addEventListener('change', () => {
        this.darkModeService.toggleDarkMode();
      });
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

  // Add this method to handle navigation clicks directly
  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToElementById(sectionId);
    
    // Close mobile menu if open
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    if (hamburgerMenu && mobileNavMenu) {
      hamburgerMenu.classList.remove('active');
      mobileNavMenu.classList.remove('active');
    }
  }
}