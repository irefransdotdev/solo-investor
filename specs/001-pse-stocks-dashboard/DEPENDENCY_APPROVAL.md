# Dependency Approval: recharts

**Requested by:** feature `001-pse-stocks-dashboard`
**Date:** 2026-02-01
**Dependency:** `recharts`

## Summary

This document requests maintainer approval to add `recharts` as a charting dependency for the PSE Stocks Dashboard feature. `recharts` will be used for lightweight charts: sparklines and a small distribution chart inside list rows and a detail panel.

## Justification 🔧

- Developer productivity: `recharts` is React-first, easy to integrate with shadcn primitives, and requires minimal custom code for sparklines and simple bar/area charts.
- Fit for MVP: Only small, well-scoped chart types are needed (sparklines & distribution); `recharts` provides these with minimal boilerplate.
- Accessibility & testability: Charts will include textual summaries and table fallbacks; `recharts` components are testable in unit/component tests.

## Alternatives Considered

- **Chart.js (+ react-chartjs-2):** More feature-rich, but slightly heavier and more configuration for React integrations.
- **D3:** Too low-level for MVP; higher implementation cost and maintenance burden.
- **Build custom sparklines:** Possible but duplicates well-tested libraries and increases development time.

## Bundle Impact & Measurement Plan 📦

- Action: After approval, we will add `recharts` in a feature branch and run a bundle analysis using `next build` + `webpack-bundle-analyzer` (or similar). Results will be recorded in `research.md` with the size delta and provider/treeshaking notes.
- Acceptance criterion: Bundle size increase for the critical dashboard page must be justified (< X KB increase — propose 20KB as soft threshold to discuss) and documented. If impact is too large, we will consider lazy-loading charts or replacing with a lighter library.

## Security & Maintenance

- `recharts` is widely used and actively maintained. We will track dependencies via Dependabot/renovate and add it to the project's dependency review checklist.

## Implementation Notes

- Charts will be tree-shaken and only the necessary chart types imported.
- Sparklines will be lazy-loaded (IntersectionObserver) on list rows to avoid initial paint cost.
- Provide textual summaries and table fallbacks for accessibility (WCAG AA) and add `jest-axe` tests for components containing charts.

## Test & Validation Plan

- Unit tests: render the sparkline component with sample data and assert that textual summaries are present.
- Bundle test: run analyzer and attach results to this approval request.
- Accessibility tests: `jest-axe` on components containing charts; no critical/serious violations allowed.

## Request

- Please review this justification and indicate approval by commenting and approving the associated PR (or rejecting with rationale). If approved, we will proceed to add the dependency in a feature branch and run the bundle-size analysis (T039).

**Maintainer approval:**

- [ ] Approved — Maintainer: ********\_\_******** Date: **\_\_\_**
- [ ] Rejected — Reason: **********\_\_\_\_********** Date: **\_\_\_**

---

Generated: 2026-02-01
