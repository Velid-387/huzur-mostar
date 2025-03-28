import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private animationService = inject(AnimationService);
  
  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  
  // Sample blog posts data - in a real app this would come from a service
  allBlogPosts = [
    {
      id: 1,
      title: 'Kako pravilno njegovati suho cvijeće',
      excerpt: 'Otkrijte kako da vaši aranžmani od suhog cvijeća traju duže i zadrže svoj lijep izgled.',
      date: '25.03.2024',
      image: 'assets/img/blog/blog-post-1.jpg'
    },
    {
      id: 2,
      title: 'Najbolje biljke za vaš dom',
      excerpt: 'Vodič za izbor idealnih sobnih biljaka prema prostoru i uvjetima u vašem domu.',
      date: '20.03.2024',
      image: 'assets/img/blog/blog-post-2.jpg'
    },
    {
      id: 3,
      title: 'Značenja različitog cvijeća',
      excerpt: 'Saznajte što različite vrste cvijeća simboliziraju kada ih poklanjate nekome.',
      date: '15.03.2024',
      image: 'assets/img/blog/blog-post-3.jpg'
    },
    {
      id: 4,
      title: 'Kreativni načini uređenja doma cvijećem',
      excerpt: 'Inspirirajte se kreativnim idejama kako unijeti prirodnu ljepotu u vaš dom pomoću cvjetnih aranžmana.',
      date: '10.03.2024',
      image: 'assets/img/blog/blog-post-4.jpg'
    },
    {
      id: 5,
      title: 'Kako napraviti vlastiti terrarij',
      excerpt: 'Naučite kako stvoriti prekrasan minijaturni vrt u staklenoj posudi za jedinstvenu kućnu dekoraciju.',
      date: '05.03.2024',
      image: 'assets/img/blog/blog-post-5.jpg'
    },
    {
      id: 6,
      title: 'Najbolje cvijeće za posebne prigode',
      excerpt: 'Koji cvijet odabrati za rođendan, godišnjicu, vjenčanje ili neku drugu važnu priliku?',
      date: '28.02.2024',
      image: 'assets/img/blog/blog-post-6.jpg'
    },
    {
      id: 7,
      title: 'Cvijeće koje cvjeta zimi',
      excerpt: 'Upoznajte biljke koje donose boju i život u vaš dom i tijekom najhladnijih mjeseci.',
      date: '22.02.2024',
      image: 'assets/img/blog/blog-post-7.jpg'
    },
    {
      id: 8,
      title: 'Kako uzgojiti lavandu u svom vrtu',
      excerpt: 'Savjeti za uzgoj mirisne i lijepog lavande koja će privući pčele i druge korisne insekte.',
      date: '15.02.2024',
      image: 'assets/img/blog/blog-post-8.jpg'
    },
    {
      id: 9,
      title: 'Upoznajte egzotično cvijeće',
      excerpt: 'Zavirite u svijet neobičnih i rijetkih cvjetnih vrsta koje dolaze iz svih krajeva svijeta.',
      date: '10.02.2024',
      image: 'assets/img/blog/blog-post-9.jpg'
    }
  ];
  
  // Posts to display on current page
  blogPosts: any[] = [];
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Scroll to top when blog page loads
      window.scrollTo(0, 0);
      
      // Set page title
      document.title = 'Blog - Huzur Mostar';
      
      // Calculate total pages
      this.totalPages = Math.ceil(this.allBlogPosts.length / this.itemsPerPage);
      
      // Load first page of posts
      this.loadPage(1);
      
      // Initialize animations
      setTimeout(() => {
        this.animationService.initAnimations();
      }, 100);
    }
  }
  
  loadPage(pageNumber: number): void {
    // Validate page number
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > this.totalPages) pageNumber = this.totalPages;
    
    // Update current page
    this.currentPage = pageNumber;
    
    // Calculate start and end indices
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.allBlogPosts.length);
    
    // Get posts for current page
    this.blogPosts = this.allBlogPosts.slice(startIndex, endIndex);
    
    // Scroll to top when changing pages
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }
  
  // Generate an array of page numbers for pagination
  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    const maxButtonsToShow = 5; // Show at most 5 page buttons
    
    if (this.totalPages <= maxButtonsToShow) {
      // If total pages is small, show all page numbers
      for (let i = 1; i <= this.totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Include current page and neighbors
      let startPage = Math.max(2, this.currentPage - 1);
      let endPage = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      // Adjust if at the beginning or end
      if (this.currentPage <= 2) {
        endPage = 3;
      } else if (this.currentPage >= this.totalPages - 1) {
        startPage = this.totalPages - 2;
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < this.totalPages - 1) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }
      
      // Always include last page
      if (this.totalPages > 1) {
        pageNumbers.push(this.totalPages);
      }
    }
    
    return pageNumbers;
  }
} 