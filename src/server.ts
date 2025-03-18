import { AngularNodeAppEngine } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(__dirname, '../browser');
const indexHtml = join(browserDistFolder, 'index.html');

// Create Express server
const app = express();

// Create Angular SSR Engine
const angularEngine = new AngularNodeAppEngine();

// Serve static files from browser folder
app.get('*.*', express.static(browserDistFolder, {
  maxAge: '1y'
}));

// All regular routes use the Angular engine
app.get('*', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;
  const url = `${protocol}://${headers.host}${originalUrl}`;

  angularEngine.render({
    url,
    document: indexHtml,
    publicPath: browserDistFolder
  })
  .then(html => {
    res.send(html);
  })
  .catch(err => {
    console.error(err);
    // Fall back to index.html for 404 or server errors
    res.sendFile(indexHtml);
  });
});

// Export Netlify compatible handler
export const handler = async (event, context) => {
  const { path, httpMethod, headers, body, isBase64Encoded } = event;
  
  const req = {
    path,
    method: httpMethod,
    headers,
    body: isBase64Encoded ? Buffer.from(body, 'base64').toString() : body,
    url: path,
    originalUrl: path,
    baseUrl: '',
    protocol: headers['x-forwarded-proto'] || 'https',
    get: (name) => headers[name.toLowerCase()]
  };
  
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    set: (name, value) => { res.headers[name.toLowerCase()] = value; },
    status: (code) => { res.statusCode = code; return res; },
    send: (data) => { res.body = data; },
    sendFile: (file) => {
      // Simplified - in a real implementation you would read the file
      res.body = indexHtml;
    }
  };
  
  try {
    await new Promise((resolve, reject) => {
      app(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    return {
      statusCode: res.statusCode,
      headers: { ...res.headers, 'content-type': 'text/html' },
      body: res.body
    };
  } catch (error) {
    console.error('Server error:', error);
    return {
      statusCode: 500,
      headers: { 'content-type': 'text/html' },
      body: 'Internal Server Error'
    };
  }
};

// Only start server if run directly (not when imported by Netlify function)
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
