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
      content: 'Cvijeće koje sam dobila od Huzura bilo je prelijepo! Svježe, mirisno i predivno aranžirano. Svi su me pitali odakle je.',
      name: 'Amina H.'
    },
    {
      content: 'Naručila sam aranžman za rođendan svoje majke i bila sam oduševljena. Kvaliteta cvjetova je izvanredna, a isporuka je bila točno na vrijeme.',
      name: 'Emina B.'
    },
    {
      content: 'Huzur je moj prvi izbor za sve cvjetne potrebe. Njihovi aranžmani su uvijek prekrasni i dugotrajni, a osoblje ljubazno i profesionalno.',
      name: 'Amir M.'
    },
    {
      content: 'Oduševljena sam uslugom i kreativnošću koju Huzur pruža. Svaki put kad naručim, dobivam nešto posebno što nadmašuje moja očekivanja.',
      name: 'Lejla S.'
    },
    {
      content: 'Naručio sam buket za godišnjicu braka i bio sam vrlo impresioniran kvalitetom i svježinom cvijeća. Definitivno ću ponovno koristiti njihove usluge.',
      name: 'Edin D.'
    },
    {
      content: 'Cvijeće za moje vjenčanje bilo je savršeno! Huzur je razumio točno što sam želio i isporučio čarobne aranžmane koji su oduševili sve goste.',
      name: 'Selma K.'
    }
  ];
}