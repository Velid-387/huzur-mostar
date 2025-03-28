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
      image: 'https://images.unsplash.com/photo-1531058240690-006c446962d8?q=80&w=3540&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1561334251-b306baba437a?q=80&w=3474&auto=format&fit=crop',
      slug: 'znacenja-razlicitog-cvijeca',
      fileName: 'simbolika-cvijeca.md'
    },
    {
      id: 4,
      title: 'Kreativni načini uređenja doma cvijećem',
      excerpt: 'Inspirirajte se kreativnim idejama kako unijeti prirodnu ljepotu u vaš dom pomoću cvjetnih aranžmana.',
      date: '10.03.2024',
      image: 'https://images.unsplash.com/photo-1491295005076-7840bcf778ec?w=900&auto=format&fit=crop',
      slug: 'kreativni-nacini-uredjenja-doma-cvijecem',
      fileName: 'uredjenje-doma-cvijecem.md'
    },
    {
      id: 5,
      title: 'Kako napraviti vlastiti terrarij',
      excerpt: 'Naučite kako stvoriti prekrasan minijaturni vrt u staklenoj posudi za jedinstvenu kućnu dekoraciju.',
      date: '05.03.2024',
      image: 'https://images.unsplash.com/photo-1483137646075-6f011a268012?q=80&w=3685&auto=format&fit=crop',
      slug: 'kako-napraviti-vlastiti-terrarij',
      fileName: 'terrarij.md'
    },
    {
      id: 6,
      title: 'Najbolje cvijeće za posebne prigode',
      excerpt: 'Koji cvijet odabrati za rođendan, godišnjicu, vjenčanje ili neku drugu važnu priliku?',
      date: '28.02.2024',
      image: 'https://images.unsplash.com/photo-1549229226-18bc891dea25?q=80&w=3540&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1626120101334-bae20ef1e78d?q=80&w=3024&auto=format&fit=crop',
      slug: 'kako-uzgojiti-lavandu-u-svom-vrtu',
      fileName: 'uzgoj-lavande.md'
    },
    {
      id: 9,
      title: 'Upoznajte egzotično cvijeće',
      excerpt: 'Zavirite u svijet neobičnih i rijetkih cvjetnih vrsta koje dolaze iz svih krajeva svijeta.',
      date: '10.02.2024',
      image: 'https://images.unsplash.com/photo-1488928741225-2aaf732c96cc?q=80&w=3540&auto=format&fit=crop',
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