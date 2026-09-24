import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const host = '0.0.0.0';

app.use(express.json());

// Health check endpoint for Cloud Run and container probes
app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const distDir = path.resolve(__dirname, 'dist');

// Serve static assets from the build directory
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));

  // SPA fallback: any route not matched by static assets serves index.html
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  // If dist does not exist yet (e.g. running directly before build)
  app.get('*', (_req, res) => {
    res.status(503).send('Application is building or dist directory not found. Please run npm run build first.');
  });
}

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
