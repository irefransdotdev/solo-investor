---
description: "Task list for 001-pse-stocks-dashboard feature"
---

# Tasks: PSE Stocks Dashboard (001-pse-stocks-dashboard)

**Input**: Design documents from `/specs/001-pse-stocks-dashboard/` ✅
**Prerequisites**: `plan.md`, `spec.md`; optional docs used: `research.md`, `data-model.md`, `contracts/openapi.yaml`, `quickstart.md`

---

## Phase 1: Setup (Shared Infrastructure) ⚙️

**Purpose**: Project initialization and basic structure

- [ ] T001 Create feature folders and base files: `src/features/dashboard/{components,charts,hooks,services,models}` and add an empty `src/features/dashboard/README.md`
- [ ] T002 Prepare dependency justification and approval: create `specs/001-pse-stocks-dashboard/DEPENDENCY_APPROVAL.md` documenting why `recharts` is required (link `research.md`) and open a PR/issue requesting maintainer approval. **Do NOT add or install `recharts` until approval (T030) is complete.** Add `@tanstack/react-query` installation step only (approved stack).
- [ ] T003 [P] Configure linting/formatting: update `eslint.config.mjs` and add (or update) `.prettierrc` to match repo standards
- [ ] T004 [P] Add environment and quickstart placeholders: create `.env.example` with `PSE_API_KEY` and update `specs/001-pse-stocks-dashboard/quickstart.md` with a short local dev note referencing the sample dataset

---

## Phase 2: Foundational (Blocking Prerequisites) 🔧

**Purpose**: Core infra required before implementing user stories

- [x] T005 [P] Create `Stock` model in `src/features/dashboard/models/stock.ts` reflecting fields from `specs/001-pse-stocks-dashboard/data-model.md` (Completed)
- [x] T006 [P] Create `ValuationScore` model in `src/features/dashboard/models/valuation.ts` (score, components, computed_at) (Completed)
- [x] T007 Implement server helper `computeValuation` in `src/features/dashboard/services/valuation.ts` (unit-testable; follows 50% P/E + 50% P/B weighting) (Completed)
- [x] T008 Implement local snapshot loader `src/features/dashboard/services/dataLoader.ts` and add sample snapshot `specs/001-pse-stocks-dashboard/data/blue-chips-snapshot.json` for offline/dev use (Completed)
- [x] T037 [P] Enforce default `topN = 30` in `src/app/api/blue-chips/route.ts` and in snapshot loader `dataLoader.ts`; add unit tests ensuring results are limited and documented in `quickstart.md`. (Completed)
- [ ] T009 Implement base API routes (foundational):
  - `src/app/api/blue-chips/route.ts` → GET `/api/blue-chips` (accepts `?limit`, `?sector`)
  - `src/app/api/export/route.ts` → GET `/api/export` (CSV stream)
  - `src/app/api/stocks/[ticker]/route.ts` → basic GET `/api/stocks/{ticker}` returning `Stock` summary (details to be extended by US2)
- [x] T010 Add React Query provider and basic configuration in `src/app/layout.tsx` (or `src/features/dashboard/hooks/QueryProvider.tsx` and integrate into `layout.tsx`) (Completed)
- [ ] T011 Create unit tests for valuation logic: `src/features/dashboard/services/valuation.test.ts` (cover percentile normalization, tie-breaker by market cap)
- [ ] T012 [P] Add environment config management and secrets docs: update `.env.example` and `README.md` with `PSE_API_KEY` usage and fallback to `specs/.../data` snapshot

---

## Phase 3: User Story 1 - View Buy / Sell Overview (Priority: P1) 🎯

**Goal**: Show two columns — **Buy — Undervalued** and **Sell — Overvalued** — each with ranked lists (Ticker, Company, Current Price, Valuation Score, % from fair value) and top 10 candidates.

**Independent Test**: Load dashboard with `specs/.../data/blue-chips-snapshot.json` and verify both columns show top 10 items; ordering must match expected ranking.

### Tests & Contracts

- [ ] T013 [P] [US1] Contract test for `GET /api/blue-chips` in `tests/contract/test_blue_chips.spec.ts`
- [ ] T013b [P] [US2] Contract test for `GET /api/stocks/{ticker}` in `tests/contract/test_stocks.spec.ts`
- [ ] T013c [P] [US3] Contract test for `GET /api/export` in `tests/contract/test_export.spec.ts`
- [ ] T014 [P] [US1] Component test for `BuySellColumns` verifying sort order and columns in `src/features/dashboard/components/__tests__/BuySellColumns.test.tsx`

### Implementation

- [ ] T015 [P] [US1] Implement `useBlueChips` hook in `src/features/dashboard/hooks/useBlueChips.ts` (uses React Query and calls `/api/blue-chips`)
- [x] T016 [US1] Create page `src/app/dashboard/page.tsx` (server component or client wrapper) that renders the dashboard and integrates `useBlueChips` (Completed)
- [ ] T017 [P] [US1] Implement components:
  - `src/features/dashboard/components/BuySellColumns.tsx` (layout for two columns)
  - `src/features/dashboard/components/StockRow.tsx` (single row with accessible markup)
  - `src/features/dashboard/charts/Sparkline.tsx` (small sparkline using Recharts)
- [x] T018 [US1] Ensure server-side rendering / ISR for initial page load: fetch precomputed top lists server-side in `page.tsx` (use `computeValuation` or call `/api/blue-chips` on the server) (Completed)
- [ ] T019 [US1] Implement accessibility: keyboard navigation and focus states for rows and controls, roles and `aria-label`s, textual summaries for charts. Add automated `jest-axe`/`axe-core` tests and define acceptance: **Key flows keyboard-navigable, no critical/serious axe violations**.
- [ ] T035 [US1] Display `list_source` and `last_updated` in `BuySellColumns` and page header; add component test verifying visible text and timestamp format.
- [ ] T020 [US1] Add component test for `StockRow` to ensure correct values and keyboard interactions `src/features/dashboard/components/__tests__/StockRow.test.tsx`

**Checkpoint**: US1 should be independently runnable and demonstrable with snapshot data

---

## Phase 4: User Story 2 - View Stock Details (Priority: P2)

**Goal**: Click a stock to view a detail panel with price, change, P/E, P/B, dividend yield, Valuation Score and a source link.

**Independent Test**: Click a row in the dashboard page and validate that the detail panel opens and displays the required fields matching the dataset.

- [ ] T021 [P] [US2] **Extend and verify** `src/app/api/stocks/[ticker]/route.ts` to include `ValuationScore`, rationale text, and any additional fields; add contract and unit tests validating response shape.
- [ ] T022 [US2] Create `src/features/dashboard/components/StockDetailPanel.tsx` (accessible, dismissible panel)
- [ ] T023 [US2] Add component/integration test: `src/features/dashboard/components/__tests__/StockDetailPanel.test.tsx` (open panel on click and verify displayed fields)
- [ ] T024 [US2] Add a short summary/reason text for each recommendation (derive from data where possible), and display source link in the panel

**Checkpoint**: US2 is independently testable using a snapshot dataset

---

## Phase 5: User Story 3 - Filter, Search & Export (Priority: P3)

**Goal**: Provide sector filter, search by ticker/company, and an export-to-CSV action for the current view.

**Independent Test**: Apply filter/search and verify lists update; click Export CSV and validate downloaded CSV contents and ordering match current view.

- [ ] T025 [P] [US3] Implement `src/features/dashboard/components/Filters.tsx` (search box + sector select + export button)
- [ ] T026 [US3] Implement CSV export endpoint at `src/app/api/export/route.ts` that accepts current filters and returns CSV; add client helper `src/features/dashboard/services/export.ts`
- [ ] T027 [US3] Add tests for export CSV content in `tests/unit/test_export.spec.ts` (validate headers, rows, and order)
- [ ] T028 [US3] Add UI tests for search/filter functionality in `src/features/dashboard/components/__tests__/Filters.test.tsx`

**Checkpoint**: US3 should be independently verifiable

---

## Phase N: Polish & Cross-Cutting Concerns ✨

**Purpose**: Accessibility, performance, docs, and final clean-up

- [ ] T029 [P] Update `specs/001-pse-stocks-dashboard/quickstart.md` with exact local dev steps and dataset usage
- [ ] T030 [P] Create `specs/001-pse-stocks-dashboard/DEPENDENCY_APPROVAL.md` and open an issue/PR requesting maintainer approval for adding `recharts` (reference `research.md` analysis)
- [ ] T039 [P] After `recharts` approval and install, run a bundle-size check (e.g., `webpack-bundle-analyzer` or `next build && analyze`) and record impact in `research.md`; include a threshold in `DEPENDENCY_APPROVAL.md`.
- [ ] T031 [P] Add lazy-loading for sparklines (IntersectionObserver) and memoization for `StockRow` components to improve initial paint
- [ ] T032 [P] Run accessibility audit and fix issues (WCAG AA): add an automated audit step using `axe-core`, document any WCAG AA exceptions, and add acceptance checklist to PR template.
- [ ] T038 [P] Add `jest-axe` accessibility tests for key components (`BuySellColumns`, `StockRow`, `StockDetailPanel`).
- [ ] T036 [P] Implement `ErrorCard` component and integrate with `BuySellColumns` and API hooks: show inline error message, `Retry`, and `Show stale data` options; add tests for error flows and telemetry logging.
- [ ] T033 [P] Add CI test job entry (if not present) to run unit and component tests for this feature, and add a README checklist for reviewers
- [ ] T034 [P] Final cleanup: run linter, format, and ensure all tests pass; prepare a PR description referencing spec and plan

---

## Dependencies & Execution Order 📌

- **Phase 1 (Setup)** must complete before **Phase 2 (Foundational)** begins.
- **Phase 2** must complete (foundation ready) before any **User Story** phase can start.
- **User Story phases** (US1, US2, US3) are independent and can proceed in parallel after the foundation is ready.

### Story Dependencies

- **US1 (P1)**: No dependency on other stories; can be implemented after Phase 2.
- **US2 (P2)**: Independent of US1 but integrates with same models/services; can proceed in parallel once Phase 2 is done.
- **US3 (P3)**: Independent; can proceed after Phase 2.

---

## Parallel Execution Examples ⚡

- While one developer implements `computeValuation` and API routes (T007, T009), another can implement frontend components and tests (T017, T020) since they operate on different files.
- `T005` and `T006` (model files) are [P] and can be created together.
- Tests for different stories can be written in parallel (e.g., `T013`, `T023`, `T027`).

---

## Implementation Strategy ✅

- **MVP First**: Complete Phase 1 + Phase 2 → Implement **User Story 1** (T013-T020) → STOP and validate (snapshot dataset) → Release MVP.
- After MVP: add **User Story 2** and **User Story 3** in parallel when possible.
- Prioritize deterministic server-side valuation computation; allow client-side fallback when server compute is unavailable.

---

## Checklist Validation & Notes

- All tasks follow the required checklist format: `- [ ] T### [P?] [US?] Description with file path`.
- Each user story contains independent test criteria and implementation tasks.

---

Generated by `/speckit.tasks` on `2026-02-01`
