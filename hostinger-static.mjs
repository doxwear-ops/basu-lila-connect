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

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    mode: 'static',
    port,
    hasIndex: fs.existsSync(indexPath),
  });
});

app.use(express.static(clientDir));

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
    .send(
      renderDeployErrorPage(
        'サイトを準備中です',
        'dist/client/index.html が見つかりません。npm run build を実行してください。',
      ),
    );
}

app.get('*', (_req, res) => {
  sendSpaFallback(res);
});

app.use((err, _req, res, _next) => {
  logError('express', err);
  if (!res.headersSent) {
    res.status(500).type('html').send(renderDeployErrorPage('サーバーエラー', err.message));
  }
});

const server = app.listen(port, host, () => {
  logStartup(`Static server ready → http://${host}:${port}`);
  logStartup(`Serving: ${clientDir}`);
  if (!fs.existsSync(indexPath)) {
    logStartup('WARNING: index.html missing — run npm run build');
  }
});

server.on('error', (error) => {
  logError('listen', error);
  process.exit(1);
});
