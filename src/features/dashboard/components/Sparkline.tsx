"use client";

import React from "react";

export default function Sparkline({
  data,
  width = 120,
  height = 32,
  ariaLabel,
}: {
  data: number[];
  width?: number;
  height?: number;
  ariaLabel?: string;
}) {
  if (!data || data.length === 0) {
    return (
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={ariaLabel || "sparkline"}
      >
        <rect width={width} height={height} fill="#f3f4f6" />
        <text x={6} y={height / 2} fontSize={10} fill="#9ca3af">
          no data
        </text>
      </svg>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = (() => {
    if (data.length === 1) {
      const v = data[0];
      const y = height - ((v - min) / range) * height;
      return [`0,${y}`, `${width},${y}`];
    }
    return data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    });
  })();

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={ariaLabel || "sparkline"}
    >
      <polyline
        fill="none"
        stroke="#3b82f6"
        strokeWidth={2}
        points={points.join(" ")}
      />
    </svg>
  );
}
