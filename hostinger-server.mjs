import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';
const clientDir = join(__dirname, 'dist', 'client');
const indexPath = join(clientDir, 'index.html');

let handler = null;
let handlerLoadError = null;

async function loadHandler() {
  if (handler) return handler;
  if (handlerLoadError) throw handlerLoadError;
  try {
    const mod = await import('./dist/server/index.js');
    handler = mod.default;
    if (!handler?.fetch) {
      throw new Error('dist/server/index.js has no default.fetch');
    }
    console.log('SSR handler loaded');
    return handler;
  } catch (error) {
    handlerLoadError = error;
    console.error('SSR handler failed to load (static-only mode):', error);
    throw error;
  }
}

function sendIndex(res) {
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res
    .status(500)
    .send('Build missing dist/client/index.html — run: npm run build');
}

app.use(
  '/assets',
  express.static(join(clientDir, 'assets'), {
    immutable: true,
    maxAge: '1y',
  }),
);

app.use(express.static(clientDir, { index: false }));

app.all('*', async (req, res) => {
  try {
    const ssr = await loadHandler();
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const hostHeader = req.headers.host || 'localhost';
    const url = new URL(req.url, `${protocol}://${hostHeader}`);

    const init = {
      method: req.method,
      headers: new Headers(req.headers),
    };
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      init.body = req;
      init.duplex = 'half';
    }

    const webReq = new Request(url.href, init);
    const webRes = await ssr.fetch(webReq);

    webRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.status(webRes.status);

    if (webRes.body) {
      const reader = webRes.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error('SSR request error:', error);
    sendIndex(res);
  }
});

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
  if (!fs.existsSync(indexPath)) {
    console.warn('Warning: dist/client/index.html not found — run npm run build');
  }
  loadHandler().catch(() => {
    console.warn('Running in static fallback mode until SSR loads');
  });
});
