<!--
Sync Impact Report
- Version change: UNSET → 1.0.0
- Modified principles:
  - Clean Code (added)
  - Mobile-first & Responsive UI (added)
  - Simple UX & Minimal Dependencies (added)
  - Testing Policy (Unit-first, No E2E) (added)
  - Technology & Documentation Standards (added)
- Added sections: Additional Constraints (clarification), Development Workflow (clarification)
- Templates updated: .specify/templates/plan-template.md ✅, .specify/templates/spec-template.md ✅, .specify/templates/tasks-template.md ✅
- Follow-up TODOs: verify referenced command templates in `.specify/templates/commands/` (some references exist but files missing)
-->

# Solo Investor Constitution

## Core Principles

### Clean Code (NON-NEGOTIABLE)

- Code and UI components MUST be readable, well-factored, and small; prefer composition over inheritance.
- Use explicit typing (TypeScript), clear naming, single responsibility functions/components, and meaningful tests where needed.
- Enforce style with linting and formatting (ESLint + Prettier) and require passing tooling in CI for all PRs.
- Rationale: Maintainability and predictable change are primary goals for long-lived product projects.

### Mobile-first & Responsive UI

- Design and implement UI with a mobile-first approach: components MUST render correctly at small viewports
  (target baseline 360px width) and scale to larger screens with progressive enhancement.
- Use Tailwind CSS and shadcn primitives for consistent, responsive building blocks; every component MUST
  include responsive variants and accessible semantics (ARIA) where applicable.
- Rationale: The primary user experience must be functional on phones; responsiveness prevents late-stage rework.

### Simple UX & Minimal Dependencies

- Prioritize simplicity: UI flows MUST be minimal, predictable, and avoid unnecessary extra steps.
- Minimize external dependencies: allowed UI infra is limited to the mandated stack (Next.js, React,
  Tailwind, shadcn, tanstack/react-query). New dependencies require a documented justification and
  maintainer approval.
- Rationale: Smaller dependency surface reduces security, performance, and maintenance costs.

### Testing Policy (NON-NEGOTIABLE)

- Unit tests MUST be added for complex features and any non-trivial calculations or business logic.
- Component/unit tests are REQUIRED for interactive components where behavior is critical.
- End-to-end (E2E) testing is NOT used in this project by default. If a feature demonstrably requires
  E2E tests, a strong justification must be documented and approved by maintainers.
- All tests MUST run in CI and pass before merging.
- Rationale: Focus on high-value tests (unit + component) that run fast and provide clear guardrails.

### Technology & Documentation Standards

- The project MUST use: Next.js (app router), React, Tailwind CSS, shadcn UI primitives, and tanstack/react-query
  for data fetching and caching. These are REQUIRED core dependencies.
- Documentation and up-to-date library guidance MUST be sourced using Context7 for package docs and
  internal guidance to ensure native-language, curated references.
- Rationale: A small, well-chosen stack reduces context switching and enables consistent implementation.

## Additional Constraints

- Accessibility: UI components MUST meet WCAG AA where practical; keyboard navigation and focus states
  are required for interactive elements.
- Performance & Size: Aim to keep critical page bundles small; avoid adding large client-only libraries without
  tree-shaking benefit. Bundle size goals SHOULD be documented per feature.
- Security: Follow secure defaults; sanitize user input and follow Next.js best practices for data fetching and auth.

## Development Workflow

- Branching: Feature branches follow `feature/` prefix; PRs MUST reference the related spec and plan files.
- PR Requirements: Lint and type checks must pass, unit/component tests for relevant features must pass, and
  at least one approving review from a project maintainer is required before merge.
- Releases & Versioning: Governance follows semantic rules; constitution versioning is MAJOR.MINOR.PATCH.
  - MAJOR: Backwards-incompatible governance or principle removal/redefinition.
  - MINOR: Adding a new principle or materially expanding governance guidance.
  - PATCH: Clarifications, wording fixes, and non-semantic refinements.

## Governance

- Amendments: Propose changes via a PR that updates this file and includes a migration/impact note. Amendments
  require approval from at least one project maintainer and successful CI.
- Compliance: All PRs must include a short checklist referencing constitution gates relevant to the change.
- Versioning: The constitution file MUST include the version, ratification date, and last amended date in ISO format.

**Version**: 1.0.0 | **Ratified**: 2026-01-31 | **Last Amended**: 2026-01-31
