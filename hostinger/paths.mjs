import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Prefer www/ (committed for Hostinger) then dist/client (local build). */
export function resolveClientDir(root = projectRoot) {
  const candidates = [
    join(root, 'www'),
    join(root, 'dist', 'client'),
  ];

  for (const clientDir of candidates) {
    const indexPath = join(clientDir, 'index.html');
    const assetsDir = join(clientDir, 'assets');
    if (existsSync(indexPath) && existsSync(assetsDir)) {
      return { root, clientDir, indexPath, assetsDir, source: clientDir.includes('www') ? 'www' : 'dist' };
    }
  }

  for (const clientDir of candidates) {
    if (existsSync(join(clientDir, 'assets'))) {
      return {
        root,
        clientDir,
        indexPath: join(clientDir, 'index.html'),
        assetsDir: join(clientDir, 'assets'),
        source: clientDir.includes('www') ? 'www' : 'dist',
      };
    }
  }

  return {
    root,
    clientDir: join(root, 'www'),
    indexPath: join(root, 'www', 'index.html'),
    assetsDir: join(root, 'www', 'assets'),
    source: 'none',
  };
}
