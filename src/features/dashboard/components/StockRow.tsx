"use client";

import React from "react";
import type { Stock } from "@/features/dashboard/models";
import Sparkline from "./Sparkline";
import { formatCurrency } from "@/features/dashboard/utils/formatCurrency";

export default function StockRow({
  stock,
  variant,
}: {
  stock: Stock;
  variant?: "buy" | "sell";
}) {
  const scoreText =
    typeof stock.valuationScore === "number"
      ? `${stock.valuationScore.toFixed(1)}`
      : "—";
  const priceText = formatCurrency(stock.current_price);

  const scoreClass =
    variant === "buy"
      ? "text-emerald-600"
      : variant === "sell"
        ? "text-rose-600"
        : "text-indigo-600";
  const focusRing =
    variant === "buy"
      ? "focus-visible:ring-emerald-400"
      : variant === "sell"
        ? "focus-visible:ring-rose-400"
        : "focus-visible:ring-indigo-500";

  return (
    <div
      role="listitem"
      tabIndex={0}
      aria-label={`${stock.ticker} — ${stock.company_name}. Valuation score: ${scoreText}. Price: ${priceText}`}
      className={`p-3 border-b bg-white hover:bg-gray-50 focus:outline-none ${focusRing}`}
      data-variant={variant ?? "neutral"}
    >
      <div className="flex justify-between items-center gap-4">
        <div className="min-w-0">
          <div className="font-medium text-gray-900 truncate">
            {stock.ticker}
          </div>
          <div className="text-sm text-gray-600 truncate">
            {stock.company_name}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div
            className={`text-lg font-semibold ${scoreClass}`}
            aria-hidden={false}
            aria-label={`Valuation score ${scoreText}`}
          >
            {scoreText}
          </div>
          <div className="text-sm text-gray-600">{priceText}</div>
          <div className="mt-2">
            <Sparkline
              data={[stock.current_price]}
              width={80}
              height={24}
              ariaLabel={`Sparkline for ${stock.ticker}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
