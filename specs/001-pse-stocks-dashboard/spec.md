# Feature Specification: PSE Stocks Dashboard

**Feature Branch**: `001-pse-stocks-dashboard`  
**Created**: 2026-01-31  
**Status**: Draft  
**Input**: User description: "Initial page setup. The Dashboard. The dashboard must have two columns the left contain rankings of the stocks that is undervalued and must focus on PSE stocks of blue chip stocks and the right contains the over valued stocks. The goal is to have the user to have an overview of what they can buy and what they can sell."

## User Scenarios & Testing _(mandatory)_

**Testing policy**: Unit tests are REQUIRED for complex features and calculations. Component/unit tests are required for critical interactive behavior. End-to-end (E2E) tests are not used by default and require explicit approval.

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - View Buy / Sell Overview (Priority: P1)

As an investor I want to open the Dashboard and immediately see ranked lists of PSE blue-chip stocks that are **undervalued (Buy)** and **overvalued (Sell)** so I can quickly decide what to buy or sell.

**Why this priority**: This is the core value of the feature — a fast, at-a-glance decision aid for investors.

**Independent Test**: Load the dashboard with the test dataset and verify that the left column labeled "Buy — Undervalued" and the right column labeled "Sell — Overvalued" show ranked lists with at least the following columns: Ticker, Company, Current Price, Valuation Score, and % from "fair value".

**Acceptance Scenarios**:

1. **Given** the dashboard is opened with the test dataset loaded, **When** the page finishes loading, **Then** the left and right columns display top 10 candidates each, sorted by valuation score (most undervalued first on left; most overvalued first on right).
2. **Given** a stock appears in the list, **When** its valuation inputs (price, P/E, P/B) are changed in the test dataset, **Then** the ranking updates accordingly when refreshing the dashboard.

---

### User Story 2 - View Stock Details (Priority: P2)

As an investor I want to click a stock in either list to view a detail panel that shows price, recent price change, key valuation metrics (P/E, P/B, dividend yield), a short rationale, and a link to the data source so I can evaluate the recommendation.

**Why this priority**: Provides necessary context for acting on a recommendation.

**Independent Test**: Click a stock row and verify the detail panel opens with the required fields and the values match the test dataset.

**Acceptance Scenarios**:

1. **Given** a stock row is clicked, **When** the detail panel opens, **Then** it displays: Ticker, Company, Current Price, Market Cap, P/E, P/B, Dividend Yield, Valuation Score, and Source Link.

---

### User Story 3 - Filter, Search & Export (Priority: P3)

As an investor I want to filter the lists by sector, search by ticker or company name, and export the current view as CSV so I can do deeper analysis offline.

**Why this priority**: Useful productivity features that help users act on findings.

**Independent Test**: Apply a filter/search and verify results; export to CSV and verify file contains the currently visible rows.

**Acceptance Scenarios**:

1. **Given** a sector filter is applied, **When** the filter is active, **Then** both lists only include stocks from that sector.
2. **Given** the user clicks "Export CSV", **When** the export completes, **Then** the downloaded file contains the rows currently visible (same columns and order).

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- API/data source unavailable: system displays a clear message and stale data (if available) with a timestamp and a retry option.
- Missing valuation metrics for a stock: item is excluded from ranking and marked as "insufficient data" in the list.
- Tie in valuation score: tie-breaker = higher market capitalization ranks higher.
- Stocks delisted or suspended: exclude from lists and log an explanation in the detail view.

## Requirements _(mandatory)_

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The system MUST display a two-column dashboard: **Left** — "Buy — Undervalued" (ranked descending by undervaluation) and **Right** — "Sell — Overvalued" (ranked descending by overvaluation).
- **FR-002**: The system MUST use **only PSE blue-chip stocks** for the initial dataset, defined as the **top 30 companies by market capitalization on the PSE** for the MVP (configurable later).
- **FR-003**: The system MUST compute a **Valuation Score** for each stock and rank stocks by that score. For the MVP the score uses a default composite: **50% P/E percentile + 50% P/B percentile** (see Assumptions).
- **FR-004**: The system MUST show at least: Ticker, Company, Current Price, Valuation Score, and % from fair value in the list view.
- **FR-005**: The system MUST show a stock detail panel with key metrics (P/E, P/B, Dividend Yield, Market Cap) and a source link.
- **FR-006**: The system MUST provide filtering by sector and search by ticker/company name.
- **FR-007**: The system MUST allow exporting the currently visible list to CSV.
- **FR-008**: The system MUST show a "Last updated" timestamp and the data source for transparency.
- **FR-009**: The system MUST handle data/API errors gracefully and provide user-friendly messages.
- **FR-010**: The system MUST be responsive and keyboard accessible (basic a11y compliance).

### Key Entities _(include if feature involves data)_

- **Stock**: ticker, company_name, sector, current_price, market_cap, pe_ratio, pb_ratio, dividend_yield, last_trade_date
- **ValuationScore**: stock_ticker, score (numeric), components (e.g., pe_percentile, pb_percentile), computed_at
- **BlueChipList**: source (file or API), last_updated

## Success Criteria _(mandatory)_

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Users can identify the top 5 buy and top 5 sell candidates within 5 seconds of opening the dashboard (measured with a test dataset).
- **SC-002**: Dashboard displays the top 10 items in each column correctly for the test dataset, and the ranking matches expected results for a curated reference dataset (100% match for ranking order).
- **SC-003**: Filtering and search actions return correct results and complete within 2 seconds in a typical network environment.
- **SC-004**: Exported CSV contains the same rows and column order as the UI view and opens correctly in spreadsheet software.

## Assumptions

- Default "blue-chip" list will be the provided list from product owner or, if not provided, the top 30 companies by market cap on the PSE (configurable later).
- Default valuation metric (MVP): composite score using normalized P/E and P/B percentiles (50% weight P/E percentile + 50% weight P/B percentile). If data missing, that stock is excluded from ranking until data is available.
- Data refresh frequency for MVP: daily. Real-time updates are out of scope for initial implementation.

---

**Notes**: Clarifications resolved — Q1: Top 30 by market cap (blue-chip definition), Q2: Default valuation composite 50% P/E + 50% P/B. Spec updated accordingly.
