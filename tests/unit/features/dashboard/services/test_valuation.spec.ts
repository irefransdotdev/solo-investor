import {
  computeValuation,
  compareValuation,
} from "@/features/dashboard/services/valuation";

describe("computeValuation", () => {
  test("calculates percentiles and composite score correctly", () => {
    const stocks = [
      { ticker: "A", pe_ratio: 10, pb_ratio: 1 },
      { ticker: "B", pe_ratio: 20, pb_ratio: 2 },
      { ticker: "C", pe_ratio: 30, pb_ratio: 3 },
    ];

    const enriched = computeValuation(stocks as any);

    const a = enriched.find((s) => s.ticker === "A")!;
    const b = enriched.find((s) => s.ticker === "B")!;
    const c = enriched.find((s) => s.ticker === "C")!;

    // For pe: 10 -> 0, 20 -> 50, 30 -> 100 (same for pb)
    expect(a.valuationComponents.pe_percentile).toBe(0);
    expect(b.valuationComponents.pe_percentile).toBe(50);
    expect(c.valuationComponents.pe_percentile).toBe(100);

    // Composite is average of the two percentiles => same values
    expect(a.valuationScore).toBe(0);
    expect(b.valuationScore).toBe(50);
    expect(c.valuationScore).toBe(100);
  });

  test("tie-breaker prefers higher market cap", () => {
    const stocks = [
      { ticker: "X", pe_ratio: 10, pb_ratio: 1, market_cap: 100 },
      { ticker: "Y", pe_ratio: 10, pb_ratio: 1, market_cap: 200 },
    ];

    const enriched = computeValuation(stocks as any);
    const ranked = enriched
      .filter((e) => e.valuationScore !== null)
      .sort(compareValuation);

    expect(ranked[0].ticker).toBe("Y");
    expect(ranked[1].ticker).toBe("X");
  });

  test("stocks with missing ratios are given null score and sorted last", () => {
    const stocks = [
      { ticker: "S", pe_ratio: null, pb_ratio: null, market_cap: 100 },
      { ticker: "T", pe_ratio: 10, pb_ratio: 1, market_cap: 50 },
    ];

    const enriched = computeValuation(stocks as any);
    const ranked = enriched.sort(compareValuation);

    // T should come before S because S has no valuationScore
    expect(ranked[0].ticker).toBe("T");
    expect(ranked[ranked.length - 1].ticker).toBe("S");
  });
});
