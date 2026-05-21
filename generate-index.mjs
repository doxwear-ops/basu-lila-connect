import { writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

async function generate() {
  console.log('Applying "Fake Server State" to fix Invariant error...');

  const distClientDir = join(process.cwd(), 'dist', 'client');
  const assetsDir = join(distClientDir, 'assets');
  
  if (!existsSync(assetsDir)) {
    console.error('❌ dist/client/assets folder not found.');
    return;
  }

  const files = readdirSync(assetsDir);
  const jsFiles = files
    .filter(f => f.startsWith('index-') && f.endsWith('.js'))
    .map(f => ({ name: f, size: statSync(join(assetsDir, f)).size }))
    .sort((a, b) => b.size - a.size);
    
  const mainJs = jsFiles[0]?.name;
  const mainCss = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));
  const secondCss = files.find(f => f.startsWith('index-') && f.endsWith('.css'));

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
      // FIX FOR "INVARIANT FAILED": Provide full mock state for TanStack Start
      // This tricks the client-side hydration into thinking the server already rendered the page.
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

      // ERROR CATCHER: If the website fails, it will tell us why on the screen
      window.onerror = function(msg, url, line, col, error) {
        var div = document.createElement('div');
        div.style.padding = '20px';
        div.style.color = 'red';
        div.style.background = '#fff';
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.zIndex = '9999';
        div.innerHTML = '<b>Website Error:</b> ' + msg + '<br><small>' + url + ' L:' + line + '</small>';
        document.body.appendChild(div);
      };
    </script>
</head>
<body style="margin: 0; padding: 0; background: white;">
    <div id="root">
        <div id="loading-indicator" style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; color: #666; background: white;">
            <div style="text-align: center;">
                <p>Loading Website...</p>
                <small>If this stays white, please check your internet connection.</small>
            </div>
        </div>
    </div>
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

  console.log('✅ Final fix applied to index.html');
}

generate();
