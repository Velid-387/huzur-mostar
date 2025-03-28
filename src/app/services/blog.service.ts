import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, forkJoin } from 'rxjs';
import { marked } from 'marked';

export interface BlogPostMetadata {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
  fileName: string;
}

export interface BlogPost extends BlogPostMetadata {
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  
  private blogPostsMetadata: BlogPostMetadata[] = [
    {
      id: 1,
      title: 'Kako pravilno njegovati suho cvijeće',
      excerpt: 'Otkrijte kako da vaši aranžmani od suhog cvijeća traju duže i zadrže svoj lijep izgled.',
      date: '25.03.2024',
      image: 'https://images.unsplash.com/photo-1602928883548-1a283157a2fd?q=80&w=1200&auto=format&fit=crop',
      slug: 'kako-pravilno-njegovati-suho-cvijece',
      fileName: 'suho-cvijece.md'
    },
    {
      id: 2,
      title: 'Najbolje biljke za vaš dom',
      excerpt: 'Vodič za izbor idealnih sobnih biljaka prema prostoru i uvjetima u vašem domu.',
      date: '20.03.2024',
      image: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?q=80&w=1200&auto=format&fit=crop',
      slug: 'najbolje-biljke-za-vas-dom',
      fileName: 'sobne-biljke.md'
    },
    {
      id: 3,
      title: 'Značenja različitog cvijeća',
      excerpt: 'Saznajte što različite vrste cvijeća simboliziraju kada ih poklanjate nekome.',
      date: '15.03.2024',
      image: 'https://images.unsplash.com/photo-1494336934272-f0efcedfc8d7?q=80&w=1200&auto=format&fit=crop',
      slug: 'znacenja-razlicitog-cvijeca',
      fileName: 'simbolika-cvijeca.md'
    },
    {
      id: 4,
      title: 'Kreativni načini uređenja doma cvijećem',
      excerpt: 'Inspirirajte se kreativnim idejama kako unijeti prirodnu ljepotu u vaš dom pomoću cvjetnih aranžmana.',
      date: '10.03.2024',
      image: 'https://images.unsplash.com/photo-1484900536541-c5dca93c3533?q=80&w=1200&auto=format&fit=crop',
      slug: 'kreativni-nacini-uredjenja-doma-cvijecem',
      fileName: 'uredjenje-doma-cvijecem.md'
    },
    {
      id: 5,
      title: 'Kako napraviti vlastiti terrarij',
      excerpt: 'Naučite kako stvoriti prekrasan minijaturni vrt u staklenoj posudi za jedinstvenu kućnu dekoraciju.',
      date: '05.03.2024',
      image: 'https://images.unsplash.com/photo-1508988545998-68303d3fdb85?q=80&w=1200&auto=format&fit=crop',
      slug: 'kako-napraviti-vlastiti-terrarij',
      fileName: 'terrarij.md'
    },
    {
      id: 6,
      title: 'Najbolje cvijeće za posebne prigode',
      excerpt: 'Koji cvijet odabrati za rođendan, godišnjicu, vjenčanje ili neku drugu važnu priliku?',
      date: '28.02.2024',
      image: 'https://images.unsplash.com/photo-1496861083958-175bb1bd5702?q=80&w=1200&auto=format&fit=crop',
      slug: 'najbolje-cvijece-za-posebne-prigode',
      fileName: 'cvijece-za-prigode.md'
    },
    {
      id: 7,
      title: 'Cvijeće koje cvjeta zimi',
      excerpt: 'Upoznajte biljke koje donose boju i život u vaš dom i tijekom najhladnijih mjeseci.',
      date: '22.02.2024',
      image: 'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?q=80&w=1200&auto=format&fit=crop',
      slug: 'cvijece-koje-cvjeta-zimi',
      fileName: 'zimsko-cvijece.md'
    },
    {
      id: 8,
      title: 'Kako uzgojiti lavandu u svom vrtu',
      excerpt: 'Savjeti za uzgoj mirisne i lijepog lavande koja će privući pčele i druge korisne insekte.',
      date: '15.02.2024',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop',
      slug: 'kako-uzgojiti-lavandu-u-svom-vrtu',
      fileName: 'uzgoj-lavande.md'
    },
    {
      id: 9,
      title: 'Upoznajte egzotično cvijeće',
      excerpt: 'Zavirite u svijet neobičnih i rijetkih cvjetnih vrsta koje dolaze iz svih krajeva svijeta.',
      date: '10.02.2024',
      image: 'https://images.unsplash.com/photo-1561848055-8dfe6e241082?q=80&w=1200&auto=format&fit=crop',
      slug: 'upoznajte-egzoticno-cvijece',
      fileName: 'egzoticno-cvijece.md'
    }
  ];

  constructor() {
    // Initialize the Markdown parser
    marked.setOptions({
      breaks: true, // Convert \n to <br>
      gfm: true     // Enable GitHub flavored markdown
    });
  }

  /**
   * Get all blog post metadata (without content)
   */
  getAllPostsMetadata(): Observable<BlogPostMetadata[]> {
    // Return the metadata array sorted by date (newest first)
    return of([...this.blogPostsMetadata].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }));
  }

  /**
   * Get a single blog post by ID
   */
  getPostById(id: number): Observable<BlogPost | null> {
    const metadata = this.blogPostsMetadata.find(post => post.id === id);
    
    if (!metadata) {
      return of(null);
    }
    
    return this.loadMarkdownContent(metadata.fileName).pipe(
      map(content => ({
        ...metadata,
        content: this.parseMarkdown(content)
      })),
      catchError(error => {
        console.error(`Error loading blog post ${id}:`, error);
        return of(null);
      })
    );
  }
  
  /**
   * Get a single blog post by slug
   */
  getPostBySlug(slug: string): Observable<BlogPost | null> {
    const metadata = this.blogPostsMetadata.find(post => post.slug === slug);
    
    if (!metadata) {
      return of(null);
    }
    
    return this.loadMarkdownContent(metadata.fileName).pipe(
      map(content => ({
        ...metadata,
        content: this.parseMarkdown(content)
      })),
      catchError(error => {
        console.error(`Error loading blog post with slug ${slug}:`, error);
        return of(null);
      })
    );
  }
  
  /**
   * Load posts for a specific page
   */
  getPostsForPage(page: number, postsPerPage: number): Observable<BlogPostMetadata[]> {
    return this.getAllPostsMetadata().pipe(
      map(posts => {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        return posts.slice(startIndex, endIndex);
      })
    );
  }
  
  /**
   * Get the total number of pages
   */
  getTotalPages(postsPerPage: number): Observable<number> {
    return this.getAllPostsMetadata().pipe(
      map(posts => Math.ceil(posts.length / postsPerPage))
    );
  }

  /**
   * Load the Markdown content from a file
   */
  private loadMarkdownContent(fileName: string): Observable<string> {
    return this.http.get(`assets/blog-posts/${fileName}`, { responseType: 'text' });
  }
  
  /**
   * Parse Markdown content to HTML
   */
  private parseMarkdown(markdown: string): string {
    return marked.parse(markdown) as string;
  }
} 