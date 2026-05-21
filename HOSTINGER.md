# Hostinger Node.js deploy

## hPanel settings

| Setting | Value |
|---------|--------|
| Repository | `doxwear-ops/basu-lila-connect` |
| Branch | `main` |
| Node.js | **22.x** |
| Install | `npm install` |
| Build | `npm run build` |
| Start | `npm start` |
| Entry file | `hostinger-server.js` or `index.js` |
| Output directory | *(leave empty)* |

## Health check

After deploy: `https://your-domain.com/health`

## Scripts

- `npm start` — static Node server (recommended)
- `npm run start:ssr` — SSR server with static fallback

## Logs

hPanel → **Runtime logs** if deploy fails.
