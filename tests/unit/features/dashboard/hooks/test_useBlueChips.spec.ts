import { fetchBlueChips } from "@/features/dashboard/hooks/useBlueChips";
import { QueryClient } from "@/lib/queryClient";

describe("fetchBlueChips", () => {
  const sample = {
    list_source: "snapshot:2026-01-31",
    last_updated: "2026-01-31T17:00:00Z",
    buy: [
      {
        ticker: "A",
        company_name: "A Co",
        current_price: 1,
        market_cap: 100,
        pe_ratio: 10,
        pb_ratio: 1,
      },
    ],
    sell: [
      {
        ticker: "B",
        company_name: "B Co",
        current_price: 2,
        market_cap: 200,
        pe_ratio: 30,
        pb_ratio: 3,
      },
    ],
  };

  beforeEach(() => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => sample,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("parses response correctly", async () => {
    const body = await fetchBlueChips();
    expect(body.list_source).toBe(sample.list_source);
    expect(Array.isArray(body.buy)).toBe(true);
  });

  test("respects limit and sector params in URL", async () => {
    await fetchBlueChips({ limit: 3, sector: "Financials" });
    expect((global as any).fetch).toHaveBeenCalledWith(
      "/api/blue-chips?limit=3&sector=Financials",
    );
  });

  test("works with QueryClient.fetchQuery semantics", async () => {
    const qc = new QueryClient();
    const result = await qc.fetchQuery({
      queryKey: ["blue-chips", { limit: 2 }],
      queryFn: () => fetchBlueChips({ limit: 2 }),
    });
    expect(result.list_source).toBe(sample.list_source);
  });
});
