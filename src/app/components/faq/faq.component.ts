import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  faqItems = [
    {
      question: 'Šta znači riječ Huzur?',
      answer: 'Jednom riječju znači mir. Huzur predstavlja mir u svim dimenzijama života. Huzur kao ravnoteža duše, osjećanja, ravnoteža želja i stvarnosti, mašte i realnosti.'
    },
    {
      question: 'Kada je pravo vrijeme za narudžbu buketa?',
      answer: 'Svaki dan je divan dan za obradovati dragu osobu. Ali ukoliko u životu postoji prilika za koju je datum poznat i već postoji jasna želja kakav se cvijetni aranžman planira pokloniti onda je preiod od 5-7 dana unaprijed najbolji za narudžbu aranžamana. U slučajevima kada se radi o bidermajeru, onda je to poželjno uraditi 10-15 dana ranije. U svakom slučaju na stanju uvijek ima svježeg cvijeća od kojeg se može pripremiti lijep cvijetni aranžman.'
    },
    {
      question: 'Kako se kreću cijene buketa?',
      answer: 'Cijene buketa variraju od želje kupaca. | Buketi veličine S 15-25KM | Buketi veličine M 30-45KM | Buketi veličine L 50-70KM | Buketi veličine XL 75-95KM | Buketi veličine XXL <100KM'
    },
    {
      question: 'Koji su načini plaćanja?',
      answer: 'Dostupne opcije plaćanja su gotovinsko i elektronsko/žiralno plaćanje.'
    },
    {
      question: 'Da li u ponudi imate dostavu?',
      answer: 'Trenutno u našoj ponudi još uvijek nemamo dostavu na kućnu adresu.'
    }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupFaqToggle();
    }
  }

  setupFaqToggle(): void {
    // This will be executed after Angular has rendered the template
    setTimeout(() => {
      const faqQuestions = document.querySelectorAll('.faq-question');
      faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
          const parent = question.parentElement;
          if (parent) {
            parent.classList.toggle('active');
          }
        });
      });
    }, 0);
  }
  
  toggleFaq(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      const target = event.currentTarget as HTMLElement;
      const parent = target.parentElement;
      if (parent) {
        parent.classList.toggle('active');
      }
    }
  }
}