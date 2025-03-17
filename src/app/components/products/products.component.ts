import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [
    {
      imgSrc: 'assets/img/huzur-buket-5.png',
      imgAlt: 'Spring Bouquet',
      title: 'Spring Delight',
      description: 'A vibrant mix of seasonal spring flowers including tulips, daffodils, and hyacinths.',
      price: '45.99 KM'
    },
    {
      imgSrc: 'assets/img/huzur-buket-2.png',
      imgAlt: 'Rose Arrangement',
      title: 'Classic Romance',
      description: 'Elegant arrangement of premium red roses, perfect for expressing love and appreciation.',
      price: '59.99 KM'
    },
    {
      imgSrc: 'assets/img/huzur-cvijece-1.png',
      imgAlt: 'Succulent Garden',
      title: 'Succulent Garden',
      description: 'Low-maintenance succulent arrangement in a stylish container, perfect for home or office.',
      price: '39.99 KM'
    },
    {
      imgSrc: 'assets/img/huzur-box-1.png',
      imgAlt: 'Box',
      title: 'Box',
      description: 'Exotic arrangement featuring bird of paradise, orchids, and tropical foliage.',
      price: '65.99 KM'
    },
    {
      imgSrc: 'assets/img/huzur-buket-3.png',
      imgAlt: 'Bouquet',
      title: 'Bouquet',
      description: 'Exotic arrangement featuring bird of paradise, orchids, and tropical foliage.',
      price: '29.99 KM'
    },
    {
      imgSrc: 'assets/img/huzur-kucno-cvijece-1.png',
      imgAlt: 'For Home',
      title: 'For Home',
      description: 'Exotic arrangement featuring bird of paradise, orchids, and tropical foliage.',
      price: '10.99 KM'
    }
  ];
}