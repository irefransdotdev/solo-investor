# Data Model: PSE Stocks Dashboard (Phase 1)

## Entities

### Stock

- ticker: string (PK)
- company_name: string
- sector: string
- current_price: number
- market_cap: number
- pe_ratio: number | null
- pb_ratio: number | null
- dividend_yield: number | null
- last_trade_date: string (ISO 8601)
- delisted: boolean (default false)

Validation rules:

- `ticker`, `company_name`, `current_price`, `market_cap` are required
- `pe_ratio` and `pb_ratio` may be null; if either is null the stock is excluded from ranking and flagged as "insufficient data"

### ValuationScore

- stock_ticker: string (FK -> Stock.ticker)
- score: number (0..100 or normalized float)
- components: object {
  pe_percentile: number,
  pb_percentile: number
  }
- computed_at: string (ISO 8601)

Validation: `score` must be numeric; components must sum with weighting rules enforced server-side.

### BlueChipList

- source: string (e.g., "PSE official API" or "snapshot:2026-01-30")
- tickers: string[]
- last_updated: string (ISO 8601)

## State Transitions

- Stock data ingestion -> validate fields -> compute ValuationScore -> include in ranked lists
- Missing data -> mark `insufficient_data` and excluded from ranking
- Delisted -> mark `delisted=true` and excluded

## Storage & Ops

- For MVP: simple JSON snapshot + periodic job (daily) to refresh from PSE API.
- Long term: consider a small Postgres table for Stocks and ValuationScores for queryability and history.

---

Generated: 2026-02-01
