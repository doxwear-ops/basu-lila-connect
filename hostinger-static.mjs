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
import { ensureProductionBuild, getDistPaths } from './hostinger/ensure-build.mjs';

registerProcessErrorHandlers();

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

let { clientDir, indexPath } = getDistPaths(__dirname);

const app = express();

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    alive: true,
    hasIndex: fs.existsSync(indexPath),
    hasAssets: fs.existsSync(join(clientDir, 'assets')),
    port,
    host,
    cwd: process.cwd(),
    clientDir,
  });
});

app.use(express.static(clientDir));

function sendSpaFallback(res) {
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res
    .status(200)
    .type('html')
    .send(
      renderDeployErrorPage(
        'サイトを準備中です',
        'デプロイ直後です。1分待ってから再読み込みしてください。',
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

// Listen immediately so Hostinger does not return 503
const server = app.listen(port, host, () => {
  logStartup(`Listening on http://${host}:${port} (PORT=${process.env.PORT ?? 'default'})`);
  logStartup(`Serving: ${clientDir}`);

  ensureProductionBuild()
    .then((paths) => {
      clientDir = paths.clientDir;
      indexPath = paths.indexPath;
      logStartup(`Ready — index: ${fs.existsSync(indexPath)}`);
    })
    .catch((error) => {
      logError('ensure-build', error);
    });
});

server.on('error', (error) => {
  logError('listen', error);
  process.exit(1);
});
