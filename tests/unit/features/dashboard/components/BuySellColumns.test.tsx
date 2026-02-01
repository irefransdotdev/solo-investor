import React from "react";
import { render, screen } from "@testing-library/react";
import BuySellColumns from "@/features/dashboard/components/BuySellColumns";

const sample = {
  list_source: "snapshot:2026-01-31",
  last_updated: "2026-01-31T17:00:00Z",
  buy: [
    {
      ticker: "BDO",
      company_name: "BDO Unibank, Inc.",
      current_price: 120.75,
      market_cap: 800000000000,
      pe_ratio: 14.7,
      pb_ratio: 1.6,
      valuationScore: 10,
    },
  ],
  sell: [
    {
      ticker: "JFC",
      company_name: "Jollibee Foods Corporation",
      current_price: 250.5,
      market_cap: 450000000000,
      pe_ratio: 30.2,
      pb_ratio: 8.1,
      valuationScore: 90,
    },
  ],
};

describe("BuySellColumns component", () => {
  test("renders both columns and stock rows", () => {
    render(
      <BuySellColumns
        buy={sample.buy as any}
        sell={sample.sell as any}
        listSource={sample.list_source}
        lastUpdated={sample.last_updated}
      />,
    );
    expect(
      screen.getByRole("heading", { name: /Buy — Undervalued/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Sell — Overvalued/i }),
    ).toBeInTheDocument();
    // colored dots present
    const buyDot = document.querySelector("span.bg-emerald-500");
    const sellDot = document.querySelector("span.bg-rose-500");
    expect(buyDot).toBeTruthy();
    expect(sellDot).toBeTruthy();
    expect(screen.getByText("BDO")).toBeInTheDocument();
    expect(screen.getByText("JFC")).toBeInTheDocument();
  });
});
