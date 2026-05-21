import { cpSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'dist', 'client');
const dest = join(root, 'www');

if (!existsSync(src)) {
  console.error('[copy-www] Missing dist/client — run: npm run build');
  process.exit(1);
}

if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true });
}

cpSync(src, dest, { recursive: true });
console.log(`[copy-www] Copied ${src} → ${dest}`);
