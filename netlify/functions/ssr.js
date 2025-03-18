const { builder } = require('@netlify/functions');
const { createRequestHandler } = require('@netlify/angular-runtime');

/**
 * This function creates an Angular SSR handler for Netlify Functions.
 */
async function handler(event, context) {
  // Create a request handler for Angular
  const ssr = createRequestHandler({
    enableProdMode: true,
    distFolder: 'dist/huzur-mostar/browser',
    indexFile: 'index.html',
    serverBundlePath: 'dist/huzur-mostar/server/main.js',
  });

  // Handle the request
  return ssr(event, context);
}

// Export the handler with settings
exports.handler = builder(handler); 