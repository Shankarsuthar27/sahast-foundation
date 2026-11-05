import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

// Middleware plugin to handle direct local asset uploads during development
// Prevents cross-origin CORS errors to Firebase Storage on localhost
function localUploadPlugin() {
  return {
    name: 'local-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-image', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => {
          try {
            const rawBody = Buffer.concat(chunks).toString('utf-8');
            const body = JSON.parse(rawBody);
            const { fileName, dataUrl } = body;

            if (!dataUrl) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing dataUrl' }));
              return;
            }

            const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid base64 format' }));
              return;
            }

            const buffer = Buffer.from(matches[2], 'base64');
            const cleanName = `${Date.now()}_${(fileName || 'image.jpg').replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const uploadDir = path.resolve(process.cwd(), 'public/home-page-image/uploads');

            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }

            const targetPath = path.join(uploadDir, cleanName);
            fs.writeFileSync(targetPath, buffer);

            const relativeUrl = `/home-page-image/uploads/${cleanName}`;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ url: relativeUrl, success: true }));
          } catch (err) {
            console.error('Error in local upload middleware:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localUploadPlugin()],
})
