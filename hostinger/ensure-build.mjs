import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
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

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: true,
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} exited with ${code}`));
    });
  });
}

export async function ensureProductionBuild() {
  const { root, indexPath, assetsDir, clientDir } = getDistPaths();

  logStartup(`Project root: ${root}`);
  logStartup(`cwd: ${process.cwd()}`);
  logStartup(`index exists: ${existsSync(indexPath)}`);
  logStartup(`assets exists: ${existsSync(assetsDir)}`);

  if (existsSync(indexPath)) {
    return { root, clientDir, indexPath };
  }

  logStartup('index.html missing — recovering build output...');

  if (existsSync(assetsDir)) {
    const { generateIndex } = await import('../generate-index.mjs');
    await generateIndex(root);
    if (existsSync(indexPath)) {
      logStartup('Generated index.html from existing assets');
      return { root, clientDir, indexPath };
    }
  }

  logStartup('Running full npm run build...');
  await runCommand('npm', ['run', 'build'], root);

  if (!existsSync(indexPath)) {
    throw new Error(
      `Still missing ${indexPath} after build. Set Hostinger build command to: npm run build`,
    );
  }

  logStartup('Full build completed');
  return { root, clientDir, indexPath };
}
