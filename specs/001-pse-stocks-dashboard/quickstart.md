# Quickstart: PSE Stocks Dashboard (Phase 1)

## Local dev

1. Clone the repo and checkout the feature branch:
   ```bash
   git checkout -b feature/001-pse-stocks-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables (create `.env.local`):
   - `PSE_API_KEY` — (given by Product Owner) optional for local dev
   - `PSE_API_URL` — default uses a mocked snapshot if not provided
4. Start dev server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000/dashboard` to view the feature. This page is server-rendered and uses the local snapshot by default (no `PSE_API_KEY` required). Use the `?limit` & `?sector` query parameters on the API endpoint (`/api/blue-chips`) to change the returned lists for debugging and testing.

## Testing

- Run unit and component tests:
  ```bash
  npm test
  ```
- Scope tests: valuation computation, CSV export, and stock column rendering and error UI.

## Implementation Notes

- Feature uses shadcn UI primitives and Tailwind for layout.
- Use TanStack Query (`@tanstack/react-query`) for data fetching and caching.
- Charts use `recharts` for sparkline and distribution charts — request maintainer approval for the dependency.
- API default behavior: `GET /api/blue-chips` returns the top 30 items by default (use `?limit` to override; maximal allowed limit is 100).

## Feature Tips

- If `PSE_API_KEY` isn't set, the app will use a local snapshot for predictable development.
- To test error handling for columns, toggle the mock response to return a 500 for the `GET /api/blue-chips` endpoint.

---

Generated: 2026-02-01
