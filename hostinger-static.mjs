import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = join(__dirname, 'dist', 'client');
const indexPath = join(clientDir, 'index.html');
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

const app = express();

app.use(express.static(clientDir));

app.get('*', (_req, res) => {
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(500).send('Run npm run build before deploy');
});

app.listen(port, host, () => {
  console.log(`Static site on http://${host}:${port}`);
});
