import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  inject,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OptimizedImageComponent } from '../shared/optimized-image/optimized-image.component';

interface Product {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
}

interface CarouselState {
  products: any[];
  originalProducts: Product[];
  activeIndex: number;
  realActiveIndex: number;
  translateX: number;
  carouselInterval: any;
  timerAnimation: any;
  timerProgress: number;
  isTransitioning: boolean;
  cardWidth: number;
  containerWidth: number;
  skipTransition: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, OptimizedImageComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  // Product categories
  driedFlowers: Product[] = [
    {
      imgSrc: 'assets/img/products/magnets/magnet-1.jpg',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Magnetić Lila',
      description: '...kao snaga, kao radost...',
    },
    {
      imgSrc: 'assets/img/products/dry-flowers/suhi-aranzman-1.jpg',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Suhi aranžman Lola',
      description: '...kao jesen, kao sjeta...',
    },
    {
      imgSrc: 'assets/img/products/magnets/magnet-2.jpg',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Magnetić Mila',
      description: '...kao ljubav, kao snaga...',
    },
    {
      imgSrc: 'assets/img/products/magnets/magnet-3.jpg',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Magnetić Mavi',
      description: '...kao odanost, kao hrabrost...',
    },
    {
      imgSrc: 'assets/img/products/dry-flowers/suhi-aranzman-2.jpg',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Suhi aranžman Saraj',
      description: '...kao toplina, kao nježnost...',
    },
    {
      imgSrc: 'assets/img/products/magnets/magnet-4.jpg',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Magnetić Sana',
      description: '...kao radost, kao čežnja...',
    },
    {
      imgSrc: 'assets/img/products/magnets/magnet-5.jpg',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Mini buketić Farah',
      description: '...kao slatkoća, kao med...',
    },
    {
      imgSrc: 'assets/img/products/dry-flowers/suhi-aranzman-3.jpg',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Suhi aranžman Đula',
      description: '...kao trag u vremenu...',
    },
  ];

  freshFlowers: Product[] = [
    {
      imgSrc: 'assets/img/products/bouquets/buket-1.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Amna',
      description:
        'Roza boja cvijeća u buketu simbolizira romantiku, dok ljubičasti detalji prenose dašak neovisnosti i kreativnosti. Rozo pakovanje upotpunjava ženstvenu poruku koju šalje buket Amna.',
    },
    {
      imgSrc: 'assets/img/products/bouquets/buket-2.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Ajla',
      description:
        'Tulipani kao simbol preporoda i dobročinstva. Kombinacija bilo kojih boja prenosi poruku duboke ljubavi. Prirodno smeđe pakovanje upotpunjava veselu poruku koju šalje buket Ajla.',
    },
    {
      imgSrc: 'assets/img/products/bouquets/buket-3.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Sara',
      description:
        'Buket koji zrači nježnošću i na fotografiji. Simbolika čistoće bijelog cvijeća i umirujuća zelena boja pakovanja prenose umirujuću poruku koju šalje buket Sara.',
    },
    {
      imgSrc: 'assets/img/products/bouquets/buket-4.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Dalila',
      description:
        'Žuto cvijeće simbolizira radost, sreću i pozitivnu energiju. Nosi poruke veselja i radosti. Prirodno smeđe pakovanje zaokružuje vedru poruku koju šalje buket Dalila.',
    },
    {
      imgSrc: 'assets/img/products/bouquets/buket-5.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Nur',
      description:
        'Pastelne nijanse cvjetova obogaćene elegancijom i toplinom eukaliptusa nose poruke topline, sigurnosti i harmonije. Bijelo pakovanje upotpunjava čistoću poruka koje šalje buket Nur.',
    },
    {
      imgSrc: 'assets/img/products/bouquets/buket-6.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Azure',
      description:
        'Dubinu i stabilnost boje neba i mora, plave boje, obogaćuje čistoća kombinacije bijelog cvijeća. Prirodno smeđe pakovanje harmonizira poruke koje šalje buket Azure.',
    },
    {
      imgSrc: 'assets/img/products/bouquets/buket-7.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Enesa',
      description:
        'Mix boja sezonskog cvijeća obgrljen prirodnim smeđim pakovanjem prenosi poruke radosti, ispunjenosti i sigurnosti koje šalje buket Enesa.',
    },
    {
      imgSrc: 'assets/img/products/bouquets/buket-8.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Esma',
      description:
        'Kombinacija nijansiranog rozog cvijeća odiše romantikom i poštovanjem dok bijelo cvijeće odiše nežnošću i čistoćom. Rozo pakovanje upotpunjava ljepotu poruke koju šalje buket Esma.',
    },
    {
      imgSrc: 'assets/img/products/bouquets/buket-9.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Amina',
      description:
        'Cvijeće ljubičastih tonova prenosi poruku raskoša i elegancije upotpunjenu nježnošću bjeline gipsofila. Ljubičasto pakovanje dodatno naglašava elegantnost poruke koju šalje buket Amina.',
    },
    {
      imgSrc: 'assets/img/products/bouquets/buket-10.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Lejla',
      description:
        'Crvene ruže kao simbol snage, hrabrosti i ljubavi šalju poruku osjećajnosti i odanosti. Crno pakovanje upotpunjava elegancijom i odanošću poruku koju šalje buket Lejla.',
    },
    {
      imgSrc: 'assets/img/products/bouquets/buket-11.jpg',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Buket Una',
      description:
        'Ranunkuli odišu nježnošću i njihove raznobojne latice šalju najromantičnije poruke obogaćene umirujućim zelenilom eukaliptusa. Prirodno smeđe pakovanje naglašava jednostavnost ljepote poruka koje šalje buket Una.',
    },
  ];

  magnets: Product[] = [
    {
      imgSrc: 'assets/img/products/potted-plants/loncanica-1.jpg',
      imgAlt: 'Decorative Magnet',
      title: 'Fikus',
      description:
        'Biljka koja simboliše obilje, sreću i bogatstvo i pomaže u protoku dobre energije u okruženju.',
    },
    {
      imgSrc: 'assets/img/products/potted-plants/loncanica-2.jpg',
      imgAlt: 'Decorative Magnet',
      title: 'Calathea',
      description:
        'Biljka molitve čiji se listovi pomjeraju u toku dana svakodnevno nudeći dinamičnu sliku rasta ove zanimljive biljke',
    },
    {
      imgSrc: 'assets/img/products/potted-plants/loncanica-3.jpg',
      imgAlt: 'Decorative Magnet',
      title: 'Spatifilum',
      description:
        'Biljka poznata i kao mirni ljiljan ali i ženska sreća simbolozira mir, čistoću, nadu i blagostanje.',
    },
    {
      imgSrc: 'assets/img/products/potted-plants/loncanica-4.jpg',
      imgAlt: 'Decorative Magnet',
      title: 'Zamija',
      description:
        'Biljka novca i sreće koja unosi pozitivnu energiju i blagostanje  u okruženje.',
    },
    {
      imgSrc: 'assets/img/products/potted-plants/loncanica-5.jpg',
      imgAlt: 'Decorative Magnet',
      title: 'Dracena',
      description:
        'Biljka poznata i pod imenom ženski zmaj, jako učinkovita kao pročišćivač zraka u okruženju.',
    },
    {
      imgSrc: 'assets/img/products/potted-plants/loncanica-6.jpg',
      imgAlt: 'Decorative Magnet',
      title: 'Sansevieria',
      description:
        'Biljka za koju se vezuju različita imena od kojih su najpopularnija svekrvin jezik, zmijska biljka i sabljica. Njena sposobnost otpuštanja kisika noću razlikuje je od većine sobnog bilja.',
    },
    {
      imgSrc: 'assets/img/products/potted-plants/loncanica-7.jpg',
      imgAlt: 'Decorative Magnet',
      title: 'Šeflera',
      description:
        'Biljka kišobran ima sposobnost apsorbcije mnogih štetnih materija iz vazduha i sjajan je počišćivač.',
    },
  ];

  // Carousel states for each category
  carouselStates: { [key: string]: CarouselState } = {
    driedFlowers: this.initializeCarouselState(this.driedFlowers),
    freshFlowers: this.initializeCarouselState(this.freshFlowers),
    magnets: this.initializeCarouselState(this.magnets),
  };

  numberOfClones: number = 2;
  isMobile: boolean = false;
  autoScrollDelay: number = 5000;
  animationTimestep: number = 50;

  private initializeCarouselState(products: Product[]): CarouselState {
    return {
      products: [],
      originalProducts: products,
      activeIndex: 0,
      realActiveIndex: 0,
      translateX: 0,
      carouselInterval: null,
      timerAnimation: null,
      timerProgress: 88,
      isTransitioning: false,
      cardWidth: 0,
      containerWidth: 0,
      skipTransition: false,
    };
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Object.keys(this.carouselStates).forEach((key) => {
        const state = this.carouselStates[key];
        this.createExtendedProductsArray(state);
        state.activeIndex = this.numberOfClones;
        state.realActiveIndex = 0;
      });

      this.checkScreenSize();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        Object.keys(this.carouselStates).forEach((key) => {
          this.calculateDimensions(key);
          this.updateTranslateX(key);
          this.startAutoScroll(key);
        });
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      Object.keys(this.carouselStates).forEach((key) => {
        this.stopAutoScroll(key);
        this.stopTimerAnimation(key);
      });
    }
  }

  createExtendedProductsArray(state: CarouselState): void {
    state.products = [];

    // Add clones from end
    for (let i = 0; i < this.numberOfClones; i++) {
      const index = state.originalProducts.length - this.numberOfClones + i;
      if (index >= 0) {
        state.products.push({
          ...state.originalProducts[index],
          isClone: true,
          originalIndex: index,
        });
      }
    }

    // Add original products
    state.originalProducts.forEach((product, index) => {
      state.products.push({ ...product, isClone: false, originalIndex: index });
    });

    // Add clones from start
    for (let i = 0; i < this.numberOfClones; i++) {
      state.products.push({
        ...state.originalProducts[i],
        isClone: true,
        originalIndex: i,
      });
    }
  }

  @HostListener('window:resize')
  checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      Object.keys(this.carouselStates).forEach((key) => {
        this.calculateDimensions(key);
        this.updateTranslateX(key, true);
      });
    }
  }

  calculateDimensions(category: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const container = document.querySelector(
      `#${category} .carousel-container`
    ) as HTMLElement;
    if (!container) return;

    const state = this.carouselStates[category];
    state.containerWidth = container.offsetWidth;

    if (this.isMobile) {
      state.cardWidth = state.containerWidth;
    } else {
      state.cardWidth = state.containerWidth / 3;
    }
  }

  startAutoScroll(category: string): void {
    const state = this.carouselStates[category];
    this.stopAutoScroll(category);
    this.startTimerAnimation(category);
    state.carouselInterval = setInterval(() => {
      this.nextProduct(category);
    }, this.autoScrollDelay);
  }

  stopAutoScroll(category: string): void {
    const state = this.carouselStates[category];
    if (state.carouselInterval) {
      clearInterval(state.carouselInterval);
    }
    this.stopTimerAnimation(category);
  }

  resetAutoScroll(category: string): void {
    this.stopAutoScroll(category);
    this.resetTimerProgress(category);
    this.startAutoScroll(category);
  }

  startTimerAnimation(category: string): void {
    const state = this.carouselStates[category];
    this.stopTimerAnimation(category);
    this.resetTimerProgress(category);

    let elapsed = 0;
    state.timerAnimation = setInterval(() => {
      elapsed += this.animationTimestep;
      const progress = elapsed / this.autoScrollDelay;
      state.timerProgress = 88 * (1 - progress);

      if (elapsed >= this.autoScrollDelay) {
        this.resetTimerProgress(category);
      }
    }, this.animationTimestep);
  }

  stopTimerAnimation(category: string): void {
    const state = this.carouselStates[category];
    if (state.timerAnimation) {
      clearInterval(state.timerAnimation);
    }
  }

  resetTimerProgress(category: string): void {
    this.carouselStates[category].timerProgress = 88;
  }

  handleInfiniteLoop(category: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const state = this.carouselStates[category];
    if (
      state.activeIndex >=
      state.originalProducts.length + this.numberOfClones
    ) {
      const newIndex =
        this.numberOfClones +
        (state.activeIndex -
          (state.originalProducts.length + this.numberOfClones));

      state.skipTransition = true;
      state.activeIndex = newIndex;
      state.realActiveIndex = newIndex - this.numberOfClones;
      this.updateTranslateX(category, true);

      setTimeout(() => {
        state.skipTransition = false;
      }, 50);
    } else if (state.activeIndex < this.numberOfClones) {
      const newIndex = state.originalProducts.length + state.activeIndex;

      state.skipTransition = true;
      state.activeIndex = newIndex;
      state.realActiveIndex = newIndex - this.numberOfClones;
      this.updateTranslateX(category, true);

      setTimeout(() => {
        state.skipTransition = false;
      }, 50);
    }
  }

  nextProduct(category: string): void {
    const state = this.carouselStates[category];
    if (state.isTransitioning) return;

    state.isTransitioning = true;
    state.activeIndex++;
    state.realActiveIndex =
      (state.activeIndex -
        this.numberOfClones +
        state.originalProducts.length) %
      state.originalProducts.length;
    this.updateTranslateX(category);
    this.resetAutoScroll(category);

    setTimeout(() => {
      this.handleInfiniteLoop(category);
      state.isTransitioning = false;
    }, 500);
  }

  prevProduct(category: string): void {
    const state = this.carouselStates[category];
    if (state.isTransitioning) return;

    state.isTransitioning = true;
    state.activeIndex--;
    state.realActiveIndex =
      (state.activeIndex -
        this.numberOfClones +
        state.originalProducts.length) %
      state.originalProducts.length;
    this.updateTranslateX(category);
    this.resetAutoScroll(category);

    setTimeout(() => {
      this.handleInfiniteLoop(category);
      state.isTransitioning = false;
    }, 500);
  }

  goToProduct(category: string, index: number): void {
    const state = this.carouselStates[category];
    if (state.isTransitioning || index === state.realActiveIndex) return;

    state.isTransitioning = true;
    state.activeIndex = index + this.numberOfClones;
    state.realActiveIndex = index;
    this.updateTranslateX(category);
    this.resetAutoScroll(category);

    setTimeout(() => {
      state.isTransitioning = false;
    }, 500);
  }

  updateTranslateX(category: string, skipAnimation: boolean = false): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const state = this.carouselStates[category];
    if (this.isMobile) {
      state.translateX = -state.activeIndex * state.cardWidth;
    } else {
      state.translateX =
        -state.activeIndex * state.cardWidth +
        (state.containerWidth / 2 - state.cardWidth / 2);
    }
  }

  isLeftProduct(category: string, index: number): boolean {
    if (this.isMobile) return false;
    const state = this.carouselStates[category];
    return index === state.activeIndex - 1;
  }

  isRightProduct(category: string, index: number): boolean {
    if (this.isMobile) return false;
    const state = this.carouselStates[category];
    return index === state.activeIndex + 1;
  }

  isActive(category: string, index: number): boolean {
    return index === this.carouselStates[category].activeIndex;
  }

  getCarouselWrapperClass(category: string): string {
    return this.carouselStates[category].skipTransition ? 'no-transition' : '';
  }

  showTimer(category: string, index: number): boolean {
    const state = this.carouselStates[category];
    return index === state.activeIndex;
  }
}
