import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'blog',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'blog/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return an array of objects with the 'id' parameter for all blog posts
      // This is a static approach since we can't access the service directly here
      return [
        { id: 'cvijece-za-prigode' },
        { id: 'suho-cvijece' }
        // Add all your other blog post IDs here
      ];
    }
  },
  {
    path: 'terms',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'privacy',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
