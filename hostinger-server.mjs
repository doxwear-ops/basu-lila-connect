import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {
  logStartup,
  logError,
  registerProcessErrorHandlers,
  renderDeployErrorPage,
} from './hostinger/errors.mjs';

registerProcessErrorHandlers();

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = join(__dirname, 'dist', 'client');
const indexPath = join(clientDir, 'index.html');
const fallbackErrorPath = join(__dirname, 'public', 'hostinger-error.html');
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

const app = express();

let handler = null;
let handlerLoadError = null;

async function loadHandler() {
  if (handler) return handler;
  if (handlerLoadError) throw handlerLoadError;
  try {
    const mod = await import('./dist/server/index.js');
    handler = mod.default;
    if (!handler?.fetch) {
      throw new Error('dist/server/index.js default export has no fetch()');
    }
    logStartup('SSR handler loaded');
    return handler;
  } catch (error) {
    handlerLoadError = error;
    logError('SSR load', error);
    throw error;
  }
}

function sendSpaFallback(res, statusCode = 200) {
  if (fs.existsSync(indexPath)) {
    return res.status(statusCode).sendFile(indexPath);
  }
  if (fs.existsSync(fallbackErrorPath)) {
    return res.status(503).sendFile(fallbackErrorPath);
  }
  return res
    .status(503)
    .type('html')
    .send(renderDeployErrorPage('サイトを準備中です', 'Build output missing'));
}

app.get('/health', async (_req, res) => {
  let ssr = false;
  try {
    await loadHandler();
    ssr = true;
  } catch {
    ssr = false;
  }
  res.json({
    ok: true,
    mode: ssr ? 'ssr' : 'static-fallback',
    port,
    hasIndex: fs.existsSync(indexPath),
  });
});

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

    const webRes = await ssr.fetch(new Request(url.href, init));

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
    logError('SSR request', error);
    sendSpaFallback(res);
  }
});

app.use((err, _req, res, _next) => {
  logError('express', err);
  if (!res.headersSent) {
    sendSpaFallback(res, 500);
  }
});

const server = app.listen(port, host, () => {
  logStartup(`SSR server ready → http://${host}:${port}`);
  if (!fs.existsSync(indexPath)) {
    logStartup('WARNING: dist/client/index.html missing');
  }
  loadHandler().catch(() => {
    logStartup('SSR unavailable — using static SPA fallback');
  });
});

server.on('error', (error) => {
  logError('listen', error);
  process.exit(1);
});
