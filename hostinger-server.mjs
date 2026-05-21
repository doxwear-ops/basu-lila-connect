import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import the built server handler
import handler from './dist/server/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static assets first
app.use('/assets', express.static(join(__dirname, 'dist', 'client', 'assets'), {
  immutable: true,
  maxAge: '1y'
}));

app.use(express.static(join(__dirname, 'dist', 'client'), { index: false }));

// SSR Handler
app.all('*', async (req, res) => {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);

    const webReq = new Request(url.href, {
      method: req.method,
      headers: new Headers(req.headers),
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined,
      duplex: 'half'
    });

    const webRes = await handler.fetch(webReq);

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
    console.error('SSR Error:', error);
    const indexPath = join(__dirname, 'dist', 'client', 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
