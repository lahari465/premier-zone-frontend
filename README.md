# PremierZone — Frontend

React (Create React App) frontend for browsing, filtering, and managing Premier League player statistics — built against the [PremierZone backend](https://github.com/lahari465/premier-zonefoot).

🔗 **Backend repo:** [premier-zonefoot](https://github.com/lahari465/premier-zonefoot) <!-- update if it's a separate repo -->
🌐 **Live site:** `https://your-frontend.vercel.app` <!-- fill in your real Vercel URL -->
🌐 **Live API it talks to:** `https://your-backend.onrender.com/api/lah/player` <!-- fill in your real Render URL -->

## Tech stack

- React 18 (Create React App)
- React Router
- Axios
- lucide-react (icons)

## Features

- Home page with a hero section and crest
- Player roster table: filter by name, team, position, nation
- Add / edit / delete players (wired directly to the backend's REST API)

## Running locally

```bash
npm install
npm start
```

Opens at `http://localhost:3000`. Talks to the backend URL set in `.env`:

```
REACT_APP_API_URL=http://localhost:8080/api/lah/player
```

Make sure the backend (see the [backend repo](https://github.com/lahari465/premier-zonefoot)) is running locally too, or point this at the live Render URL instead.

## Deployment

Deployed on [Vercel](https://vercel.com). Production API URL is set via the `REACT_APP_API_URL` environment variable in the Vercel project settings (not committed to the repo). `vercel.json` includes a rewrite rule so client-side routes like `/players` don't 404 on refresh.

## License

MIT — see [LICENSE](./LICENSE).
