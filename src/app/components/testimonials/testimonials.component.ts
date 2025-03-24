import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  testimonials = [
    {
      content: 'Cvijeće koje sam dobila od Huzura bilo je prelijepo! Svježe, mirisno i predivno aranžirano. Svi su me pitali odakle je.',
      name: 'Amina H.',
      imagePath: 'assets/img/products/huzur-buket-6.jpg',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Naručila sam aranžman za rođendan svoje majke i bila sam oduševljena. Kvaliteta cvjetova je izvanredna, a isporuka je bila tačno na vrijeme.',
      name: 'Emina B.',
      imagePath: 'assets/img/products/huzur-buket-7.jpg',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Huzur je moj prvi izbor za sve cvjetne potrebe. Njihovi aranžmani su uvijek prekrasni i dugotrajni, a osoblje ljubazno i profesionalno.',
      name: 'Amir M.',
      imagePath: 'assets/img/products/huzur-buket-11.jpg',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Oduševljena sam uslugom i kreativnošću koju Huzur pruža. Svaki put kad naručim, dobivam nešto posebno što nadmašuje moja očekivanja.',
      name: 'Lejla S.',
      imagePath: 'assets/img/products/huzur-buket-9.jpg',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Naručio sam buket za godišnjicu braka i bio sam vrlo impresioniran kvalitetom i svježinom cvijeća. Definitivno ću ponovno koristiti njihove usluge.',
      name: 'Edin D.',
      imagePath: 'assets/img/products/huzur-buket-10.jpg',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Cvijeće za moje vjenčanje bilo je savršeno! Huzur je razumio točno što sam želio i isporučio čarobne aranžmane koji su oduševili sve goste.',
      name: 'Selma K.',
      imagePath: 'assets/img/products/huzur-buket-8.jpg',
      flipped: false,
      cardFlipping: false
    }
  ];
  
  ngOnInit(): void {
    // Add any initialization logic here if needed
  }

  toggleCardFlip(testimonial: any): void {
    if (isPlatformBrowser(this.platformId)) {
      if (testimonial.cardFlipping) return;

      testimonial.cardFlipping = true;
      
      testimonial.flipped = !testimonial.flipped;
      
      if (testimonial.flipped && this.isMobileDevice()) {
        setTimeout(() => {
          testimonial.flipped = false;
          
          setTimeout(() => {
            testimonial.cardFlipping = false;
          }, 600);
        }, 3000);
      } else {
        setTimeout(() => {
          testimonial.cardFlipping = false;
        }, 600);
      }
    }
  }
  
  private isMobileDevice(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    
    return window.innerWidth <= 768;
  }
}