import express from 'express';
import fs from 'fs';
import { join } from 'path';
import {
  logStartup,
  logError,
  registerProcessErrorHandlers,
  renderDeployErrorPage,
} from './hostinger/errors.mjs';
import { ensureProductionBuild } from './hostinger/ensure-build.mjs';
import { resolveClientDir } from './hostinger/paths.mjs';

registerProcessErrorHandlers();

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

let { clientDir, indexPath } = resolveClientDir();

const app = express();

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: fs.existsSync(indexPath),
    alive: true,
    hasIndex: fs.existsSync(indexPath),
    hasAssets: fs.existsSync(join(clientDir, 'assets')),
    port,
    clientDir,
    source: resolveClientDir().source,
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
        'www フォルダがありません。開発者に npm run build を実行して push してください。',
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
  logStartup(`Listening on http://${host}:${port}`);
  logStartup(`Serving: ${clientDir}`);

  ensureProductionBuild()
    .then((paths) => {
      clientDir = paths.clientDir;
      indexPath = paths.indexPath;
      logStartup(`Ready — index: ${fs.existsSync(indexPath)} (${paths.source})`);
    })
    .catch((error) => logError('ensure-build', error));
});

server.on('error', (error) => {
  logError('listen', error);
  process.exit(1);
});
