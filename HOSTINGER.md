# Hostinger Node.js deploy

## hPanel settings

| Setting | Value |
|---------|--------|
| Repository | `doxwear-ops/basu-lila-connect` |
| Branch | `main` |
| Node.js | **22.x** |
| Install | `npm install` |
| Build command | `npm run build` **(required)** |
| Start command | `npm start` |
| Entry file | `server.js` |
| Output directory | *(leave empty — do NOT use dist/client)* |

**503 error?** Build did not run or app crashed before listen. Check Runtime logs. Never skip the build step.

## Health check

After deploy: `https://your-domain.com/health`

## Scripts

- `npm start` — static Node server (recommended)
- `npm run start:ssr` — SSR server with static fallback

## Logs

hPanel → **Runtime logs** if deploy fails.
