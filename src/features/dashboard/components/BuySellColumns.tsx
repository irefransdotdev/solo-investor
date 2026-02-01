"use client";

import React from "react";
import StockRow from "./StockRow";
import type { Stock } from "@/features/dashboard/models";
import { formatDateIso } from "@/features/dashboard/utils/formatDate";

export default function BuySellColumns({
  buy,
  sell,
  listSource,
  lastUpdated,
}: {
  buy: Stock[];
  sell: Stock[];
  listSource?: string;
  lastUpdated?: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section aria-label="Buy — Undervalued">
        <header className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-3 h-3 rounded-full bg-emerald-500"
              aria-hidden="true"
            ></span>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Buy — Undervalued
              </h2>
            </div>
          </div>
        </header>
        <div
          role="list"
          className="bg-white rounded shadow divide-y divide-gray-100"
        >
          {buy.map((s) => (
            <StockRow key={s.ticker} stock={s} variant="buy" />
          ))}
        </div>
      </section>

      <section aria-label="Sell — Overvalued">
        <header className="mb-2 flex items-center gap-3">
          <span
            className="inline-block w-3 h-3 rounded-full bg-rose-500"
            aria-hidden="true"
          ></span>
          <h2 className="text-lg font-semibold text-white">
            Sell — Overvalued
          </h2>
        </header>
        <div
          role="list"
          className="bg-white rounded shadow divide-y divide-gray-100"
        >
          {sell.map((s) => (
            <StockRow key={s.ticker} stock={s} variant="sell" />
          ))}
        </div>
      </section>
    </div>
  );
}
