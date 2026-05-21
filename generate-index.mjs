import { writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const defaultRoot = join(dirname(fileURLToPath(import.meta.url)));

export async function generateIndex(projectRoot = defaultRoot) {
  console.log('[generate-index] Creating dist/client/index.html...');

  const distClientDir = join(projectRoot, 'dist', 'client');
  const assetsDir = join(distClientDir, 'assets');

  if (!existsSync(assetsDir)) {
    console.error(`[generate-index] Missing: ${assetsDir}`);
    return false;
  }

  const files = readdirSync(assetsDir);
  const jsFiles = files
    .filter((f) => f.startsWith('index-') && f.endsWith('.js'))
    .map((f) => ({ name: f, size: statSync(join(assetsDir, f)).size }))
    .sort((a, b) => b.size - a.size);

  const mainJs = jsFiles[0]?.name;
  if (!mainJs) {
    console.error('[generate-index] No index-*.js bundle in assets');
    return false;
  }

  const mainCss = files.find((f) => f.startsWith('styles-') && f.endsWith('.css'));
  const secondCss = files.find((f) => f.startsWith('index-') && f.endsWith('.css'));

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>合同会社 BASU LILA — 安心・信頼・つながり</title>
    <meta name="description" content="BASU LILA LLC は食品販売・飲食店運営・通訳翻訳・外国人支援・留学生サポートを通じて地域社会に貢献する大阪の企業です。">
    
    ${mainCss ? `<link rel="stylesheet" href="./assets/${mainCss}">` : ''}
    ${secondCss ? `<link rel="stylesheet" href="./assets/${secondCss}">` : ''}
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@400;500;600&display=swap" rel="stylesheet">
    
    <script>
      window.__TSR_DEHYDRATED__ = { 
        data: [], 
        manifest: { 
          routes: { 
            "__root__": { assets: [] },
            "/": { assets: [] }
          } 
        } 
      };
      
      window.$R = window.$R || {
        tsr: [{
          manifest: { 
            routes: { 
              "__root__": { assets: [] },
              "/": { assets: [] }
            } 
          },
          matches: [
            { i: "__root__", s: "success", ssr: true },
            { i: "/", s: "success", ssr: true }
          ],
          lastMatchId: ""
        }]
      };
    </script>
</head>
<body style="margin: 0; padding: 0; background: white;">
    <div id="root"></div>
    <script type="module" src="./assets/${mainJs}"></script>
</body>
</html>`;

  writeFileSync(join(distClientDir, 'index.html'), html);
  writeFileSync(join(distClientDir, '404.html'), html);

  const htaccess = `
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
`;
  writeFileSync(join(distClientDir, '.htaccess'), htaccess);

  console.log('[generate-index] OK → dist/client/index.html');
  return true;
}

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  generateIndex().then((ok) => {
    if (!ok) process.exit(1);
  });
}
