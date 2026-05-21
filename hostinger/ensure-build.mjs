import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { logStartup, logError } from './errors.mjs';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

export function getDistPaths(root = projectRoot) {
  return {
    root,
    clientDir: join(root, 'dist', 'client'),
    indexPath: join(root, 'dist', 'client', 'index.html'),
    assetsDir: join(root, 'dist', 'client', 'assets'),
  };
}

/**
 * Fast recovery only — never runs npm run build here (too slow; Hostinger returns 503).
 */
export async function ensureProductionBuild() {
  const paths = getDistPaths();

  logStartup(`root: ${paths.root}`);
  logStartup(`cwd: ${process.cwd()}`);
  logStartup(`index: ${existsSync(paths.indexPath)}`);
  logStartup(`assets: ${existsSync(paths.assetsDir)}`);

  if (existsSync(paths.indexPath)) {
    return paths;
  }

  if (existsSync(paths.assetsDir)) {
    try {
      const { generateIndex } = await import('../generate-index.mjs');
      await generateIndex(paths.root);
      if (existsSync(paths.indexPath)) {
        logStartup('Created index.html from assets');
        return paths;
      }
    } catch (error) {
      logError('generateIndex', error);
    }
  }

  logStartup(
    'WARN: dist/client not ready — set Hostinger build command to: npm run build',
  );
  return paths;
}
