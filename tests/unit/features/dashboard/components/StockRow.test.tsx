import React from "react";
import { render, screen } from "@testing-library/react";
import StockRow from "@/features/dashboard/components/StockRow";

const stock = {
  ticker: "BPI",
  company_name: "Bank of the Philippine Islands",
  current_price: 85.2,
  market_cap: 400000000000,
  pe_ratio: 12.1,
  pb_ratio: 1.4,
  valuationScore: 5,
};

describe("StockRow component", () => {
  test("renders ticker and company name and score", () => {
    render(<StockRow stock={stock as any} />);
    expect(screen.getByText("BPI")).toBeInTheDocument();
    expect(
      screen.getByText("Bank of the Philippine Islands"),
    ).toBeInTheDocument();
    expect(screen.getByText("5.0")).toBeInTheDocument(); // price should use currency formatter
    expect(screen.getByText("₱85.20")).toBeInTheDocument();
  });

  test("is focusable via tabIndex", () => {
    render(<StockRow stock={stock as any} />);
    const row = screen.getByRole("listitem");
    expect(row).toHaveAttribute("tabindex", "0");
  });
  test("shows buy variant color when variant=buy", () => {
    render(<StockRow stock={stock as any} variant="buy" />);
    const score = screen.getByText("5.0");
    expect(score.className).toMatch(/text-emerald-600/);
  });

  test("shows sell variant color when variant=sell", () => {
    render(<StockRow stock={stock as any} variant="sell" />);
    const score = screen.getByText("5.0");
    expect(score.className).toMatch(/text-rose-600/);
  });
});
