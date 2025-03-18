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
      question: 'How can I place an order?',
      answer: 'You can place an order by visiting our website and clicking on the "Order" button. Once you\'re logged in, you can select the desired products and proceed to checkout.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept various payment methods, including credit cards, debit cards, and PayPal. You can choose the preferred method during checkout.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 14-day return policy. If you receive a damaged or incorrect product, please contact our customer support team for assistance.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes, you can track your order by logging into your account and visiting your order history.'
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