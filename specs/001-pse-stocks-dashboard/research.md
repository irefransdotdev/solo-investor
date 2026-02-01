# Research: PSE Stocks Dashboard (Phase 0)

## Decisions

- Decision: Use **shadcn UI primitives + Tailwind CSS** for layout and interactive controls.
  - Rationale: Aligns with project constitution and maintains consistent responsive, accessible UI.
  - Alternatives: Custom CSS or component libraries (Material UI) — rejected due to larger surface area and inconsistent style.

- Decision: Use **Recharts** for charts (price sparkline + valuation distribution) with careful tree-shaking and only lightweight chart types.
  - Rationale: Recharts is React-first, easy to integrate with shadcn components, sufficient for MVP (sparklines, bar charts) and has smaller bundle impact than full D3 for simple charts.
  - Alternatives considered: Chart.js + react-chartjs-2 (more feature-rich but heavier), D3 (too low-level for MVP). If maintainers prefer, Chart.js can be used after approval.
  - Note: Adding a chart library is a dependency change and requires documented justification and maintainer approval (this doc serves as the justification).

- Decision: Use **tanstack/react-query (React Query)** for data fetching, caching, and background revalidation to make renders faster and resilient to slow APIs.
  - Rationale: Caching improves perceived performance (data available instantly on navigation), built-in retries and stale-while-revalidate patterns, and optimistic updates if needed.

- Decision: Compute **Valuation Score** on the server (recommended) and expose precomputed values via API responses.
  - Rationale: Keeps client rendering fast and deterministic, centralizes business logic, simplifies unit testing of core calculation.
  - Alternative: Compute in client (useMemo + tests) — acceptable fallback until server compute is available.

- Decision: Testing stack: **Jest + React Testing Library** for unit and component tests.
  - Rationale: Fast, well-integrated with Next.js and TypeScript; aligns with constitution testing policy.
  - Testing scope: Unit tests for valuation calculation, tie-breaker logic, and CSV export. Component tests for stock list columns and error/fallback UI behavior. Avoid tests for trivial components.

## Error Handling & UX

- If either column fails to render (data fetch error or render exception):
  - Show a clear inline error card inside the column with an explanation, an error code if available, and options: `Retry` (re-fetch), `Show stale data` (if cached snapshot available), and contact link.
  - Log the error to client-side telemetry (console + optional service) with context (endpoint, filters, user action).
  - Keep the other column operational (isolation of failures).

## Performance

- Use React Query's caching and staleTime (e.g., 5–60 minutes depending on freshness needs) and background refetch to keep UI snappy.
- Server-side computation of valuation and server-side rendering/ISR for initial page load (Next.js) to present top results quickly.
- Use memoization (useMemo) for client-side sorting/filtering; avoid unnecessary re-renders by isolating row components and using React.memo.
- Avoid heavy chart rendering on initial load; render sparklines lazily (IntersectionObserver) or on demand.

## Accessibility

- Charts must be accessible: provide aria-label, textual summaries, and a table fallback for critical data.
- Keyboard focus and proper roles for list items; provide skip links for screen readers.

## Needs Clarification (Action Items)

- PSE API rate limits and recommended usage pattern (Product Owner / PSE account holder to confirm).
- Confirm whether valuation scores must be computed server-side or client-side for MVP (Product Owner/Backend).
- Confirm export CSV size expectations (client-side blob download vs. server-side streaming) — affects implementation approach.

## Research Tasks

1. Research PSE API docs, gather rate limits and example responses (Assigned: Integration Engineer).
2. Evaluate Recharts bundle impact and produce a minimal pack-size measurement (Assigned: Frontend Engineer).
3. Prototype server-side valuation compute (small script) and evaluate performance (Assigned: Backend Engineer).

---

Generated: 2026-02-01
