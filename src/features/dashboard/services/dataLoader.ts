import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(
  process.cwd(),
  "specs",
  "001-pse-stocks-dashboard",
  "data",
  "blue-chips-snapshot.json",
);

export const DEFAULT_TOP_N = 30;

function percentile(value: number, arr: number[]) {
  if (!arr.length) return null;
  const sorted = arr.slice().sort((a, b) => a - b);
  const idx = sorted.findIndex((v) => v >= value);
  if (idx === -1) return 100;
  if (sorted.length === 1) return 100;
  return (idx / (sorted.length - 1)) * 100;
}

export async function loadBlueChips(options?: {
  limit?: number;
  sector?: string;
}) {
  const limitParam = options?.limit;
  const sector = options?.sector;

  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const data = JSON.parse(raw as string);
  let stocks = Array.isArray(data.stocks) ? data.stocks.slice() : [];

  if (sector) {
    stocks = stocks.filter(
      (s: any) => s.sector && s.sector.toLowerCase() === sector.toLowerCase(),
    );
  }

  // Use computeValuation helper for percentile and scoring logic
  const { computeValuation, compareValuation } = await import("./valuation");

  const enriched = computeValuation(stocks as any);

  const ranked = enriched
    .filter((e: any) => e.valuationScore !== null)
    .sort(compareValuation);

  const limit =
    typeof limitParam === "number"
      ? Math.max(1, Math.min(100, Math.floor(limitParam)))
      : DEFAULT_TOP_N;

  const buy = ranked.slice(0, limit);
  const sell = [...ranked].reverse().slice(0, limit);

  return {
    list_source: data.list_source,
    last_updated: data.last_updated,
    buy,
    sell,
  } as const;
}
