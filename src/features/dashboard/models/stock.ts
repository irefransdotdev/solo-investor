export type Stock = {
  ticker: string;
  company_name: string;
  sector?: string;
  current_price: number;
  market_cap: number;
  pe_ratio?: number | null;
  pb_ratio?: number | null;
  dividend_yield?: number | null;
  last_trade_date?: string;
  delisted?: boolean;
  [key: string]: any;
};

export function isValidStock(obj: any): obj is Stock {
  if (!obj || typeof obj !== "object") return false;
  if (typeof obj.ticker !== "string" || obj.ticker.trim() === "") return false;
  if (typeof obj.company_name !== "string" || obj.company_name.trim() === "")
    return false;
  if (typeof obj.current_price !== "number" || Number.isNaN(obj.current_price))
    return false;
  if (typeof obj.market_cap !== "number" || Number.isNaN(obj.market_cap))
    return false;
  return true;
}
