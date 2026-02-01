import type { Stock } from "@/features/dashboard/models/stock";

function percentile(value: number, arr: number[]) {
  if (!arr.length) return null;
  const sorted = arr.slice().sort((a, b) => a - b);
  const idx = sorted.findIndex((v) => v >= value);
  if (idx === -1) return 100;
  if (sorted.length === 1) return 100;
  return (idx / (sorted.length - 1)) * 100;
}

export function computeValuation(
  stocks: Stock[],
  weights: { pe: number; pb: number } = { pe: 0.5, pb: 0.5 },
) {
  const peSeries = stocks
    .filter((s) => typeof s.pe_ratio === "number")
    .map((s) => s.pe_ratio as number);
  const pbSeries = stocks
    .filter((s) => typeof s.pb_ratio === "number")
    .map((s) => s.pb_ratio as number);

  return stocks.map((s) => {
    const pePercentile =
      typeof s.pe_ratio === "number" ? percentile(s.pe_ratio, peSeries) : null;
    const pbPercentile =
      typeof s.pb_ratio === "number" ? percentile(s.pb_ratio, pbSeries) : null;
    const canRank = pePercentile !== null && pbPercentile !== null;
    const score = canRank
      ? weights.pe * (pePercentile as number) +
        weights.pb * (pbPercentile as number)
      : null;

    return {
      ...s,
      valuationScore: score,
      valuationComponents: {
        pe_percentile: pePercentile,
        pb_percentile: pbPercentile,
      },
    } as const;
  });
}

// Comparison used for ranking: lower `valuationScore` is better (more undervalued).
// Tie-breaker: larger market_cap wins.
export function compareValuation(a: any, b: any) {
  if (a.valuationScore === null && b.valuationScore === null) return 0;
  if (a.valuationScore === null) return 1;
  if (b.valuationScore === null) return -1;
  if (a.valuationScore !== b.valuationScore) {
    return a.valuationScore - b.valuationScore;
  }
  const ma = typeof a.market_cap === "number" ? a.market_cap : 0;
  const mb = typeof b.market_cap === "number" ? b.market_cap : 0;
  return mb - ma; // larger market cap first
}
