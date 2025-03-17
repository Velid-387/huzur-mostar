import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private scrollService = inject(ScrollService);
  
  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToElementById(sectionId);
  }
}