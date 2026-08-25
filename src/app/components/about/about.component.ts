import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { BotanicalComponent } from '../shared/botanical/botanical.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, BotanicalComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  private scrollService = inject(ScrollService);

  scrollToSection(sectionId: string, event?: Event): void {
    event?.preventDefault();
    this.scrollService.scrollToElementById(sectionId);
  }
}
