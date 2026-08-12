/* Tiny zero-dependency static server for previewing the built site.
 * Usage:  node serve.js   ->  http://localhost:4173
 * The site itself has no runtime dependencies; this is only for local preview.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'site');
const PORT = process.env.PORT || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.json': 'application/json',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json'
};

http.createServer((req, res) => {
  let rel = decodeURI(req.url.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';
  let file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT)) { res.statusCode = 403; return res.end('forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return fs.readFile(path.join(ROOT, '404.html'),
        (e, d) => res.end(e ? 'Not found' : d));
    }
    res.setHeader('Content-Type', TYPES[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
}).listen(PORT, () => console.log(`Issue 01 served → http://localhost:${PORT}`));
