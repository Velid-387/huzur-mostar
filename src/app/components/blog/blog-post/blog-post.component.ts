import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AnimationService } from '../../../services/animation.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private animationService = inject(AnimationService);
  
  postId: number = 0;
  post: any = null;
  
  // Sample blog posts data - in a real app this would come from a service
  blogPosts = [
    {
      id: 1,
      title: 'Kako pravilno njegovati suho cvijeće',
      excerpt: 'Otkrijte kako da vaši aranžmani od suhog cvijeća traju duže i zadrže svoj lijep izgled.',
      date: '25.03.2024',
      image: 'assets/img/blog/blog-post-1.jpg',
      content: `<p>Suho cvijeće je savršen način da unesete prirodnu ljepotu u svoj dom koja može trajati mjesecima, pa čak i godinama. Međutim, da bi vaši aranžmani od suhog cvijeća zadržali svoj lijep izgled tijekom vremena, potrebno je pravilno održavanje.</p>
                <h3>Izbjegavajte direktnu sunčevu svjetlost</h3>
                <p>Jedan od najvećih neprijatelja suhog cvijeća je intenzivna sunčeva svjetlost. UV zrake mogu izblijediti boje cvjetova i učiniti ih krhkima. Držite svoje aranžmane dalje od prozora s direktnim suncem ili koristite zavjese koje raspršuju svjetlost.</p>
                <h3>Kontrolirajte vlagu</h3>
                <p>Suho cvijeće, kao što i samo ime kaže, najbolje se čuva u suhim uvjetima. Visoka vlažnost može uzrokovati plijesan i propadanje cvjetova. Izbjegavajte postavljanje aranžmana u kupaonicu ili kuhinju gdje je razina vlage obično visoka.</p>
                <h3>Redovito čišćenje prašine</h3>
                <p>Prašina se s vremenom nakuplja na suhom cvijeću i može mu dati zapušten izgled. Za nježno čišćenje, koristite sušilo za kosu na najnižoj postavci hladnog zraka i držite ga na sigurnoj udaljenosti od aranžmana. Možete koristiti i vrlo meku četku za prašinu s dugim dlakama.</p>
                <h3>Pazite pri premještanju</h3>
                <p>Suho cvijeće je vrlo krhko. Kad premještate aranžman, držite ga za bazu ili posudu, a ne za same cvjetove ili stabljike koje se lako mogu slomiti.</p>
                <h3>Osvježavanje izgleda</h3>
                <p>S vremenom, neki cvjetovi mogu izgubiti svoj sjaj. Osvježite izgled dodavanjem novih elemenata u postojeći aranžman ili reorganizacijom cvjetova za novi izgled.</p>
                <p>Uz ovu jednostavnu njegu, vaši aranžmani od suhog cvijeća mogu zadržati svoju ljepotu godinama, pružajući vam dugotrajnu prirodnu dekoraciju za vaš dom.</p>`
    },
    {
      id: 2,
      title: 'Najbolje biljke za vaš dom',
      excerpt: 'Vodič za izbor idealnih sobnih biljaka prema prostoru i uvjetima u vašem domu.',
      date: '20.03.2024',
      image: 'assets/img/blog/blog-post-2.jpg',
      content: `<p>Sobne biljke unose život i svježinu u svaki prostor, pročišćavaju zrak i stvaraju ugodniju atmosferu. Međutim, izbor prave biljke za određeni prostor može biti izazovan. Evo našeg vodiča za izbor idealnih sobnih biljaka prema uvjetima u vašem domu.</p>
                <h3>Za prostore s malo svjetla</h3>
                <p>Mnogi stanovi nemaju dovoljno prirodne svjetlosti, što može ograničiti izbor biljaka. Srećom, postoje vrste koje uspijevaju i u slabijim svjetlosnim uvjetima:</p>
                <ul>
                    <li><strong>Zamiokulkas (ZZ biljka)</strong> - Gotovo neuništiva biljka koja podnosi neredovito zalijevanje i slabo osvjetljenje.</li>
                    <li><strong>Sanseverija (Zmijin jezik)</strong> - Izuzetno otporna biljka koja filtrira toksine iz zraka i rijetko zahtijeva zalijevanje.</li>
                    <li><strong>Pothos (Epipremnum)</strong> - Penjačica koja brzo raste i podnosi različite uvjete, uključujući i slabo osvjetljenje.</li>
                </ul>
                <h3>Za svijetle prostore</h3>
                <p>Ako imate prostor s puno prirodne svjetlosti, možete uzgajati širok spektar biljaka:</p>
                <ul>
                    <li><strong>Monstera Deliciosa</strong> - Popularna biljka s karakterističnim probušenim listovima koja voli svijetla mjesta bez direktnog sunca.</li>
                    <li><strong>Fikus Lyrata (Fiddle Leaf Fig)</strong> - Efektna biljka s velikim listovima koja voli stabilne uvjete i dosta svijetla.</li>
                    <li><strong>Strelicija (Bird of Paradise)</strong> - Impresivna biljka koja može narasti do stropa i ima velike, egzotične listove.</li>
                </ul>
                <h3>Za kupaonice</h3>
                <p>Kupaonice često imaju povećanu vlažnost i manje svjetla, što odgovara određenim biljkama:</p>
                <ul>
                    <li><strong>Paprat Boston</strong> - Voli vlažnu atmosferu i filtrira zrak.</li>
                    <li><strong>Filodendron</strong> - Različite vrste filodendrona dobro uspijevaju u vlažnim uvjetima.</li>
                    <li><strong>Aloe Vera</strong> - Osim što voli vlagu, ima i ljekovita svojstva.</li>
                </ul>
                <p>Bez obzira na uvjete u vašem domu, postoji savršena biljka za vas. Počnite s nekoliko lakših za održavanje i postupno proširujte svoju kolekciju kako stječete iskustvo.</p>`
    },
    {
      id: 3,
      title: 'Značenja različitog cvijeća',
      excerpt: 'Saznajte što različite vrste cvijeća simboliziraju kada ih poklanjate nekome.',
      date: '15.03.2024',
      image: 'assets/img/blog/blog-post-3.jpg',
      content: `<p>Cvijeće nije samo lijepo za gledanje – svaka vrsta nosi svoje simbolično značenje. Kada poklanjate cvijeće, vi zapravo šaljete poruku, pa je korisno znati što različite vrste simboliziraju.</p>
                <h3>Ruže</h3>
                <p>Najpoznatije cvijeće kada je riječ o simbolici, ruže imaju različita značenja ovisno o boji:</p>
                <ul>
                    <li><strong>Crvene ruže</strong> - Simboliziraju strastvenu ljubav i poštovanje.</li>
                    <li><strong>Ružičaste ruže</strong> - Predstavljaju zahvalnost, divljenje i nježnu ljubav.</li>
                    <li><strong>Bijele ruže</strong> - Simboliziraju čistoću, nevinost i nove početke.</li>
                    <li><strong>Žute ruže</strong> - Tradicionalno simboliziraju prijateljstvo i radost.</li>
                </ul>
                <h3>Tulipani</h3>
                <p>Općenito, tulipani predstavljaju savršenu ljubav. No, različite boje nose različita značenja:</p>
                <ul>
                    <li><strong>Crveni tulipani</strong> - Deklaracija ljubavi.</li>
                    <li><strong>Ružičasti tulipani</strong> - Sreća i samopouzdanje.</li>
                    <li><strong>Bijeli tulipani</strong> - Traženje oprosta.</li>
                    <li><strong>Žuti tulipani</strong> - Beznadna ljubav ili vesele misli.</li>
                </ul>
                <h3>Ljiljani</h3>
                <p>Ljiljani su povezani s čistoćom i plemenitošću:</p>
                <ul>
                    <li><strong>Bijeli ljiljani</strong> - Čistoća i nevinost.</li>
                    <li><strong>Ružičasti ljiljani</strong> - Prosperitet i obilje.</li>
                    <li><strong>Žuti ljiljani</strong> - Zahvalnost i veselje.</li>
                </ul>
                <h3>Gerberi</h3>
                <p>Ove vesele daisy-like cvjetovi simboliziraju nevinost, čistoću i veselje. Savršeni su za uveseliti nekoga.</p>
                <h3>Orhideje</h3>
                <p>Orhideje predstavljaju ljubav, luksuz i snagu. Često se poklanjaju za pokazivanje dubokog poštovanja.</p>
                <h3>Suncokret</h3>
                <p>Simbolizira odanost i dugovječnost. Savršen je za pokazivanje odanosti i divljenja.</p>
                <p>Sada kada znate značenja različitog cvijeća, možete odabrati savršeni buket za svaku prigodu i poslati točno onu poruku koju želite.</p>`
    }
  ];
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Scroll to top when the page loads
      window.scrollTo(0, 0);
      
      // Get the post ID from the route parameter
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.postId = +id;
          this.findPost();
        } else {
          // If no ID is provided, redirect to the blog listing page
          this.router.navigate(['/blog']);
        }
      });
      
      // Initialize animations
      setTimeout(() => {
        this.animationService.initAnimations();
      }, 100);
    }
  }
  
  findPost(): void {
    // Find the post with the matching ID
    const post = this.blogPosts.find(p => p.id === this.postId);
    
    if (post) {
      this.post = post;
      document.title = `${post.title} - Huzur Mostar Blog`;
    } else {
      // If no post is found, redirect to the blog listing page
      this.router.navigate(['/blog']);
    }
  }
  
  goBack(): void {
    this.router.navigate(['/blog']);
  }
} 