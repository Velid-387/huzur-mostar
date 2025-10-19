import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
  timeoutId?: any;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnDestroy {
  faqItems: FaqItem[] = [
    {
      question: 'Šta znači riječ Huzur?',
      answer: 'Jednom riječju znači mir. Huzur predstavlja mir u svim dimenzijama života. Huzur kao ravnoteža duše, osjećanja, ravnoteža želja i stvarnosti, mašte i realnosti.',
      isOpen: false
    },
    {
      question: 'Kada je pravo vrijeme za narudžbu buketa?',
      answer: 'Svaki dan je divan dan za obradovati dragu osobu. Ali ukoliko u životu postoji prilika za koju je datum poznat i već postoji jasna želja kakav se cvjetni aranžman planira pokloniti onda je preiod od 5-7 dana unaprijed najbolji za narudžbu aranžamana. U slučajevima kada se radi o bidermajeru, onda je to poželjno uraditi 10-15 dana ranije.',
      isOpen: false
    },
    {
      question: 'Kako se kreću cijene buketa?',
      answer: 'Cijene buketa variraju od želje kupaca:<ul><li>Buketi veličine S: 15-25KM</li><li>Buketi veličine M: 30-45KM</li><li>Buketi veličine L: 50-70KM</li><li>Buketi veličine XL: 75-95KM</li><li>Buketi veličine XXL: &gt;100KM</li></ul>',
      isOpen: false
    },
    {
      question: 'Koji su načini plaćanja?',
      answer: 'Dostupne opcije plaćanja su gotovinsko i elektronsko/žiralno plaćanje.',
      isOpen: false
    },
    {
      question: 'Da li u ponudi imate dostavu?',
      answer: 'Trenutno u našoj ponudi još uvijek nemamo dostavu na kućnu adresu.',
      isOpen: false
    }
  ];

  toggleFaq(index: number): void {
    const item = this.faqItems[index];

    // Clear any existing timeout for this item
    if (item.timeoutId) {
      clearTimeout(item.timeoutId);
      item.timeoutId = undefined;
    }

    // Toggle the open state
    item.isOpen = !item.isOpen;

    // If item is now open, set a timeout to close it after 7 seconds
    if (item.isOpen) {
      item.timeoutId = setTimeout(() => {
        item.isOpen = false;
        item.timeoutId = undefined;
      }, 7000);
    }
  }

  ngOnDestroy(): void {
    // Clear all timeouts when component is destroyed
    this.faqItems.forEach(item => {
      if (item.timeoutId) {
        clearTimeout(item.timeoutId);
      }
    });
  }
}