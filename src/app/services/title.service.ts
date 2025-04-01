import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleService = inject(Title);
  private readonly baseTitle = 'Huzur Mostar';

  /**
   * Set the page title
   * @param title - The page specific title (optional)
   */
  setTitle(title?: string): void {
    if (title) {
      this.titleService.setTitle(`${title} - ${this.baseTitle}`);
    } else {
      this.titleService.setTitle(this.baseTitle);
    }
  }
} 