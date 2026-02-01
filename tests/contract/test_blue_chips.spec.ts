import { loadBlueChips } from "../../src/features/dashboard/services/dataLoader";

describe("loadBlueChips snapshot loader (contract-like)", () => {
  test("returns buy/sell with default limit", async () => {
    const body: any = await loadBlueChips();
    expect(body).toBeDefined();
    expect(body).toHaveProperty("list_source");
    expect(Array.isArray(body.buy)).toBe(true);
    expect(Array.isArray(body.sell)).toBe(true);
    // Default top-N should not exceed 30 (returns available count if less)
    expect(body.buy.length).toBeGreaterThan(0);
    expect(body.buy.length).toBeLessThanOrEqual(30);
    expect(body.sell.length).toBeLessThanOrEqual(30);
  });

  test("respects limit param", async () => {
    const body: any = await loadBlueChips({ limit: 3 });
    expect(body.buy.length).toBe(3);
    expect(body.sell.length).toBe(3);
  });

  test("filters by sector", async () => {
    const body: any = await loadBlueChips({ sector: "Financials" });
    expect(body.buy.every((s: any) => s.sector === "Financials")).toBe(true);
    expect(body.sell.every((s: any) => s.sector === "Financials")).toBe(true);
  });
});
