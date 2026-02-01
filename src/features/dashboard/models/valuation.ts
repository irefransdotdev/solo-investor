export type ValuationComponents = {
  pe_percentile: number | null;
  pb_percentile: number | null;
};

export type ValuationScore = {
  stock_ticker: string;
  score: number | null; // 0..100 or null
  components: ValuationComponents;
  computed_at?: string;
};

export function isValidValuation(v: any): v is ValuationScore {
  if (!v || typeof v !== "object") return false;
  if (typeof v.stock_ticker !== "string") return false;
  if (v.score !== null && typeof v.score !== "number") return false;
  if (!v.components || typeof v.components !== "object") return false;
  if (
    v.components.pe_percentile !== null &&
    typeof v.components.pe_percentile !== "number"
  )
    return false;
  if (
    v.components.pb_percentile !== null &&
    typeof v.components.pb_percentile !== "number"
  )
    return false;
  return true;
}
