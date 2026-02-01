import { isValidStock } from "@/features/dashboard/models/stock";
import { isValidValuation } from "@/features/dashboard/models/valuation";

describe("Stock model validation", () => {
  test("valid stock passes", () => {
    const s = {
      ticker: "ABC",
      company_name: "ACME Corp",
      current_price: 100,
      market_cap: 1000000,
    };
    expect(isValidStock(s)).toBe(true);
  });

  test("missing required fields fails", () => {
    const s = { ticker: "ABC", current_price: 100 } as any;
    expect(isValidStock(s)).toBe(false);
  });
});

describe("Valuation model validation", () => {
  test("valid valuation passes", () => {
    const v = {
      stock_ticker: "ABC",
      score: 42,
      components: { pe_percentile: 40, pb_percentile: 44 },
    };
    expect(isValidValuation(v)).toBe(true);
  });

  test("null components are allowed", () => {
    const v = {
      stock_ticker: "XYZ",
      score: null,
      components: { pe_percentile: null, pb_percentile: null },
    };
    expect(isValidValuation(v)).toBe(true);
  });
});
