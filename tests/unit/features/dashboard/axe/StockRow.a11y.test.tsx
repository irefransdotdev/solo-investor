import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
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

test("StockRow has no detectable accessibility violations", async () => {
  // Wrap in a list container to satisfy ARIA requirements for listitem
  const { container } = render(
    <div role="list">
      <StockRow stock={stock as any} />
    </div>,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
