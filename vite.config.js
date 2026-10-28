import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { getInitialData, saveDataToFile, saveBase64Image } from './api-handlers.js';
import { hospitalConfig } from './src/config/hospitalConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function apiMiddlewarePlugin() {
  return {
    name: 'api-middleware-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Direct static serving of public folder assets (uploads, logo.svg, sitemap, etc.)
        const cleanUrl = req.url.split('?')[0];
        if (cleanUrl.startsWith('/uploads/') || cleanUrl === '/logo.svg' || cleanUrl === '/favicon.svg' || cleanUrl === '/sitemap.xml' || cleanUrl === '/robots.txt') {
          const filePath = path.join(__dirname, 'public', cleanUrl);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            let contentType = 'application/octet-stream';
            if (filePath.endsWith('.png')) contentType = 'image/png';
            else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
            else if (filePath.endsWith('.webp')) contentType = 'image/webp';
            else if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';
            else if (filePath.endsWith('.ico')) contentType = 'image/x-icon';
            else if (filePath.endsWith('.xml')) contentType = 'application/xml';
            else if (filePath.endsWith('.txt')) contentType = 'text/plain';
            res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            return fs.createReadStream(filePath).pipe(res);
          }
        }

        if (!req.url.startsWith('/api/')) {
          return next();
        }

        const parseBody = () => new Promise((resolve) => {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              resolve({});
            }
          });
        });

        if (req.url === '/api/hospital-data' && req.method === 'GET') {
          const data = getInitialData();
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify(data));
        }

        if (req.url === '/api/hospital-data' && req.method === 'POST') {
          const body = await parseBody();
          if (body && typeof body === 'object' && body.hospitalName) {
            saveDataToFile(body);
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, data: body }));
          }
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Invalid data' }));
        }

        if (req.url === '/api/upload' && req.method === 'POST') {
          try {
            const body = await parseBody();
            if (!body.image) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'No image provided' }));
            }
            const url = saveBase64Image(body.image, body.name || 'upload.jpg');
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, url }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: err.message || 'Upload failed' }));
          }
        }

        if (req.url === '/api/reset-defaults' && req.method === 'POST') {
          saveDataToFile(hospitalConfig);
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, data: hospitalConfig }));
        }

        if (req.url === '/api/admin/login' && req.method === 'POST') {
          const body = await parseBody();
          const cleanPin = (body.pin || '').trim().toLowerCase();
          if (cleanPin === '1234' || cleanPin === 'admin' || cleanPin === 'masaraddi') {
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, token: 'masaraddi_admin_session_valid' }));
          }
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Invalid PIN or password' }));
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiMiddlewarePlugin()],
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
