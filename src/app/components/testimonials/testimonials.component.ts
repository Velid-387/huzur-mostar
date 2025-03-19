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
      imagePath: 'assets/img/products/huzur-buket-5.png',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Naručila sam aranžman za rođendan svoje majke i bila sam oduševljena. Kvaliteta cvjetova je izvanredna, a isporuka je bila točno na vrijeme.',
      name: 'Emina B.',
      imagePath: 'assets/img/products/huzur-buket-2.png',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Huzur je moj prvi izbor za sve cvjetne potrebe. Njihovi aranžmani su uvijek prekrasni i dugotrajni, a osoblje ljubazno i profesionalno.',
      name: 'Amir M.',
      imagePath: 'assets/img/products/huzur-cvijece-1.png',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Oduševljena sam uslugom i kreativnošću koju Huzur pruža. Svaki put kad naručim, dobivam nešto posebno što nadmašuje moja očekivanja.',
      name: 'Lejla S.',
      imagePath: 'assets/img/products/huzur-buket-3.png',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Naručio sam buket za godišnjicu braka i bio sam vrlo impresioniran kvalitetom i svježinom cvijeća. Definitivno ću ponovno koristiti njihove usluge.',
      name: 'Edin D.',
      imagePath: 'assets/img/products/huzur-box-1.png',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Cvijeće za moje vjenčanje bilo je savršeno! Huzur je razumio točno što sam želio i isporučio čarobne aranžmane koji su oduševili sve goste.',
      name: 'Selma K.',
      imagePath: 'assets/img/products/huzur-kucno-cvijece-1.png',
      flipped: false,
      cardFlipping: false
    }
  ];
  
  ngOnInit(): void {
    // Add any initialization logic here if needed
  }

  toggleCardFlip(testimonial: any): void {
    if (isPlatformBrowser(this.platformId)) {
      // If we're already in the middle of flipping, don't do anything
      if (testimonial.cardFlipping) return;
      
      // Set the cardFlipping state to prevent multiple clicks
      testimonial.cardFlipping = true;
      
      // Toggle the flipped state for this specific testimonial
      testimonial.flipped = !testimonial.flipped;
      
      // If card is flipped to show the back side and we're on mobile, set timer to flip back
      if (testimonial.flipped && this.isMobileDevice()) {
        setTimeout(() => {
          testimonial.flipped = false;
          
          // Allow a small delay after flip-back animation completes before enabling clicks again
          setTimeout(() => {
            testimonial.cardFlipping = false;
          }, 600); // Match the transition time in CSS
        }, 3000);
      } else {
        // For desktop or when flipping back manually, re-enable clicks after animation completes
        setTimeout(() => {
          testimonial.cardFlipping = false;
        }, 600); // Match the transition time in CSS
      }
    }
  }
  
  // Helper method to detect if the current device is mobile
  private isMobileDevice(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    
    // Check window width to determine if it's a mobile device
    return window.innerWidth <= 768;
  }
}