import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  testimonials = [
    {
      content: 'I was blown away by the quality of the arrangements I received from Bloom & Petal. The flowers were fresh, vibrant, and perfectly matched to my event. Highly recommended!',
      name: 'Jane Doe'
    },
    {
      content: 'I couldn\'t be happier with my purchase from Bloom & Petal. The bouquet was stunning, and the customer service was exceptional. I will definitely be back!',
      name: 'John Smith'
    },
    {
      content: 'Bloom & Petal exceeded my expectations in every way. The flowers were gorgeous, and the delivery was prompt and professional. I highly recommend them!',
      name: 'Emily Chen'
    },
    {
      content: 'I\'ve never been disappointed with a purchase from Bloom & Petal. Their flowers are always fresh and beautiful, and their customer service is top-notch.',
      name: 'David Lee'
    },
    {
      content: 'Bloom & Petal is my go-to florist for any occasion. Their arrangements are always stunning, and their prices are very reasonable.',
      name: 'Sophia Patel'
    },
    {
      content: 'I was impressed with the quality of the arrangements I received from Bloom & Petal. The flowers were fresh, vibrant, and perfectly matched to my event. Highly recommended!',
      name: 'Jane Doe'
    }
  ];
}