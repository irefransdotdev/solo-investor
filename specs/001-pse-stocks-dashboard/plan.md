# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a mobile-first PSE Stocks Dashboard that displays two columns: **Buy — Undervalued** (left) and **Sell — Overvalued** (right). The dashboard will use a top-30 PSE blue-chip dataset (MVP), compute a Valuation Score (default: 50% P/E percentile + 50% P/B percentile), and show ranked lists with columns: Ticker, Company, Current Price, Valuation Score, and % from fair value. UI implementation uses **shadcn** primitives + **Tailwind CSS** for layout, **Recharts** for lightweight charts (sparklines and distribution), and **tanstack/react-query** for data fetching/caching. Valuation computation is recommended to run server-side for performance and deterministic results; client-side compute is an acceptable fallback.

## Technical Context

**Language/Version**: TypeScript (Node 18+) / Next.js (13+ - app router)
**Primary Dependencies**: Next.js, React, Tailwind CSS, shadcn, tanstack/react-query, Context7 (docs), Recharts (charting - additional dependency, justification in `research.md`)
**Storage**: MVP uses a refreshed JSON snapshot (daily) pulled from PSE API; long-term: Postgres for historical queries (optional)
**Testing**: Unit testing with Jest + React Testing Library for non-trivial calculations (valuation) and component tests for critical interactive behavior (columns, error/fallback UI). Do not add tests for trivial components.
**Target Platform**: Web (mobile-first responsive, baseline 360px)
**Project Type**: Frontend feature in Next.js app (single project)
**Performance Goals**: Ensure top-5 recommendations are visible within 3-5s on a test dataset; fast initial paint via SSR/ISR and React Query caching
**Constraints**: Respect constitution: minimal dependencies (documented justification required for Recharts), accessibility (WCAG AA where practical), and small bundle size (measure Recharts impact)
**Scale/Scope**: MVP: 30 blue-chip stocks; future: scale to full exchange lists (NEEDS CLARIFICATION)

**Structure Decision**: Implement inside the existing Next.js app under:

```text
src/
└── features/
    └── dashboard/
        ├── components/      # shadcn + Tailwind components (lists, cards, error UI)
        ├── charts/          # Recharts-based small charts (sparklines)
        ├── hooks/           # react-query hooks (useBlueChips, useStockDetails)
        └── services/        # api client + server-side computation helpers
```

**Notes**: Recharts is an added dependency and requires maintainer approval; `research.md` contains bundle-impact analysis and accessibility considerations.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

The following constitution gates MUST be satisfied before Phase 0 completes:

- **Stack**: Projects MUST use Next.js (app router), React, Tailwind CSS, shadcn UI primitives, and tanstack/react-query. ✔️
- **Design**: Mobile-first responsive design is required (baseline 360px). Accessibility (WCAG AA) must be considered. ✔️
- **Testing**: Unit tests are REQUIRED for complex features and non-trivial calculations. Component/unit tests are
  REQUIRED for critical interactive behavior. End-to-end (E2E) tests are NOT used by default. ✔️ (scope defined)
- **Dependencies**: New external dependencies require a documented justification and maintainer approval. ⚠️
  - Note: This plan adds `recharts` for charts. Justification and bundle-impact analysis are documented in `research.md`. Approval required from a maintainer before merge.

Result: PASS for Phase 0 pending maintainer approval of the chart dependency and confirmation of PSE API rate limits/credentials.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: Implement the dashboard as a self-contained feature under `src/features/dashboard/`. Keep UI components small and composition-based; put data access and business logic behind `services/` and centralize react-query hooks in `hooks/` for reuse and testing.

## Phase 0: Research Summary ✅

- Resolved: choice of UI primitives (shadcn + Tailwind), data fetching/caching strategy (react-query), and a charting library candidate (Recharts). See `research.md` for rationale, tests to run, and follow-up tasks.
- Open clarifications: PSE API rate limits & credentials; confirm server-side computation for valuation (Product Owner / Backend).

## Phase 1: Design Outputs ✅

- `data-model.md` — entities, validation, and state transitions created.
- `contracts/openapi.yaml` — initial API surface for `GET /blue-chips`, `GET /stocks/{ticker}`, `GET /export`.
- `quickstart.md` — local development instructions and test hints.

## Complexity Tracking

| Violation                   | Why Needed                                             | Simpler Alternative Rejected Because                                                                                                           |
| --------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Additional chart dependency | Needed for sparklines and distribution charts in lists | Building custom chart primitives or adding D3 increases development time and bundle risk; `recharts` balances developer velocity and footprint |
