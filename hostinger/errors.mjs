/**
 * Shared error pages and logging for Hostinger Node.js runtime.
 */

export function formatError(error) {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}\n${error.stack ?? ''}`;
  }
  return String(error);
}

export function logStartup(message) {
  console.log(`[hostinger] ${message}`);
}

export function logError(label, error) {
  console.error(`[hostinger] ${label}:`, formatError(error));
}

export function renderDeployErrorPage(title, detail) {
  const safeTitle = escapeHtml(title);
  const safeDetail = escapeHtml(detail);
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle} — BASU LILA</title>
  <style>
    body { font-family: "Noto Sans JP", system-ui, sans-serif; background: #fafafa; color: #111; margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 1.5rem; }
    .card { max-width: 32rem; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,.06); }
    h1 { font-size: 1.25rem; margin: 0 0 0.75rem; }
    p { color: #4b5563; margin: 0 0 1rem; line-height: 1.6; }
    pre { text-align: left; font-size: 0.75rem; background: #f3f4f6; padding: 0.75rem; border-radius: 8px; overflow: auto; max-height: 8rem; color: #374151; }
    .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-top: 1.25rem; }
    a, button { padding: 0.5rem 1rem; border-radius: 8px; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid #d1d5db; background: #111; color: #fff; }
    .secondary { background: #fff; color: #111; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${safeTitle}</h1>
    <p>サイトを読み込めませんでした。しばらくしてからもう一度お試しください。</p>
    ${safeDetail ? `<pre>${safeDetail}</pre>` : ''}
    <div class="actions">
      <button type="button" onclick="location.reload()">再読み込み</button>
      <a class="secondary" href="/">ホームへ</a>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function registerProcessErrorHandlers() {
  process.on('uncaughtException', (error) => {
    logError('uncaughtException', error);
  });
  process.on('unhandledRejection', (reason) => {
    logError('unhandledRejection', reason);
  });
}
