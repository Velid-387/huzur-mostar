import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OptimizedImageComponent } from '../shared/optimized-image/optimized-image.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, OptimizedImageComponent],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  testimonials = [
    {
      content: 'Hvala vama što ste nam ukrasili ovaj dan. Baš mi je bilo lagano komunicirati s vama, još jedna od mnogih dokaza u nizu da su žene sjajne u poslu!',
      name: '#huzurljudi',
      imagePath: 'assets/img/testimonials/recenzija-1.jpg',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Mali buket nam se baš, baš, baš svidio, očarane smo, i veliki nam se svidio, ali mali je posebnost, baš se prijateljica obradovala. Mašallah.',
      name: '#huzurljudi',
      imagePath: 'assets/img/testimonials/recenzija-2.jpg',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Želim vam se iskreno zahvaliti na predivnom buketu! Potpuno je nadmašio sva moja očekivanja. Kad sam rekla da želim da cvijeće priča, zaista ste to ostvarile! Svaka čast na vašoj kreativnosti i trudu. Vaš Huzur diplomant.',
      name: '#huzurljudi',
      imagePath: 'assets/img/testimonials/recenzija-3.jpg',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Pišem vam samo da vas pohvalim. Vaš trud i rad. Hvala vam što postojite, što svakodnevno svojim postojanjem i radom dijelite toliko ljepote i pozitivizma. Uživam gledati kako rastete. Allah vam bereket povećao.',
      name: '#huzurljudi',
      imagePath: 'assets/img/testimonials/recenzija-4.jpg',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Wow, koje ste vi osvježenje u ovom gradu.',
      name: '#huzurljudi',
      imagePath: 'assets/img/testimonials/recenzija-5.jpg',
      flipped: false,
      cardFlipping: false
    },
    {
      content: 'Tamo nećete kupiti samo cvijet, tamo ćete dotaknuti svoj svijet. Huzur mir i spokoj znači, a valjda cvijeće tako i zrači.',
      name: '#huzurljudi',
      imagePath: 'assets/img/testimonials/recenzija-6.jpg',
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