import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  private scrollService = inject(ScrollService);
  
  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToElementById(sectionId);
  }
}