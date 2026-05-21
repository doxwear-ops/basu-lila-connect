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
import { ensureProductionBuild } from './hostinger/ensure-build.mjs';

registerProcessErrorHandlers();

const __dirname = dirname(fileURLToPath(import.meta.url));
const fallbackErrorPath = join(__dirname, 'public', 'hostinger-error.html');
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

let clientDir = join(__dirname, 'dist', 'client');
let indexPath = join(clientDir, 'index.html');

const app = express();

app.get('/health', (_req, res) => {
  res.json({
    ok: fs.existsSync(indexPath),
    mode: 'static',
    port,
    cwd: process.cwd(),
    clientDir,
    hasIndex: fs.existsSync(indexPath),
    hasAssets: fs.existsSync(join(clientDir, 'assets')),
  });
});

app.use(express.static(clientDir));

function sendSpaFallback(res, statusCode = 200) {
  if (fs.existsSync(indexPath)) {
    return res.status(statusCode).sendFile(indexPath);
  }
  return res
    .status(503)
    .type('html')
    .send(
      renderDeployErrorPage(
        'サイトを準備中です',
        `Missing: ${indexPath}`,
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

async function start() {
  const paths = await ensureProductionBuild();
  clientDir = paths.clientDir;
  indexPath = paths.indexPath;

  const server = app.listen(port, host, () => {
    logStartup(`Static server ready → http://${host}:${port}`);
    logStartup(`Serving: ${clientDir}`);
  });

  server.on('error', (error) => {
    logError('listen', error);
    process.exit(1);
  });
}

start().catch((error) => {
  logError('startup', error);
  process.exit(1);
});
