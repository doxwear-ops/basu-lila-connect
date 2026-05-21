import { existsSync } from 'fs';
import { logStartup, logError } from './errors.mjs';
import { resolveClientDir } from './paths.mjs';

export async function ensureProductionBuild() {
  let paths = resolveClientDir();

  logStartup(`root: ${paths.root}`);
  logStartup(`cwd: ${process.cwd()}`);
  logStartup(`source: ${paths.source}`);
  logStartup(`index: ${existsSync(paths.indexPath)}`);
  logStartup(`assets: ${existsSync(paths.assetsDir)}`);

  if (existsSync(paths.indexPath)) {
    return paths;
  }

  if (existsSync(paths.assetsDir)) {
    try {
      const { generateIndex } = await import('../generate-index.mjs');
      await generateIndex(paths.root);
      paths = resolveClientDir();
      if (existsSync(paths.indexPath)) {
        logStartup('Created index.html from assets');
        return paths;
      }
    } catch (error) {
      logError('generateIndex', error);
    }
  }

  logStartup('WARN: No site files in www/ or dist/client — run npm run build locally and push');
  return paths;
}
