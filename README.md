# lesson-session

## Deploy to Railway

1. Install the [Railway CLI](https://docs.railway.com/guides/cli) (optional) or use the [Railway dashboard](https://railway.app).
2. Create a new project and connect this repo (GitHub/GitLab or `railway link`).
3. One service is enough: the app serves the built frontend and the quiz WebSocket on the same port.
4. Build and start are set in `railway.json`:
   - **Build:** `npm run build` (Vite → `dist/`)
   - **Start:** `npm run start` (Node server serves `dist/` and `/ws`)
5. Deploy. Railway sets `PORT`; the server listens on it. No extra env vars needed for the quiz (frontend and WebSocket share the same origin).
