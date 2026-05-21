import { existsSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const indexHtml = join(root, 'dist', 'client', 'index.html');
const assetsDir = join(root, 'dist', 'client', 'assets');

const missing = [];
if (!existsSync(indexHtml)) missing.push('dist/client/index.html');
if (!existsSync(assetsDir)) missing.push('dist/client/assets/');

if (missing.length > 0) {
  console.error('[hostinger] Build verification FAILED. Missing:');
  for (const path of missing) console.error(`  - ${path}`);
  console.error('[hostinger] Run: npm run build');
  process.exit(1);
}

console.log('[hostinger] Build verification OK');
console.log(`[hostinger]   index: ${indexHtml}`);
console.log(`[hostinger]   assets: ${assetsDir}`);
