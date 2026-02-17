"use client";

import jStat from "jstat";

interface PowerCurveProps {
  effectSize: number;
  alpha: number;
  power: number;
  nPerGroup: number;
  testType: string;
}

function computePower(
  n: number,
  effectSize: number,
  alpha: number,
  testType: string
): number {
  const zAlpha = jStat.normal.inv(1 - alpha / 2, 0, 1);

  // Normal approximation for power (works well for most cases)
  let lambda: number;
  switch (testType) {
    case "two-sample-t":
      lambda = effectSize * Math.sqrt(n / 2);
      break;
    case "paired-t":
    case "one-sample-t":
      lambda = effectSize * Math.sqrt(n);
      break;
    case "correlation": {
      if (n <= 3) return 0;
      const z = 0.5 * Math.log((1 + effectSize) / (1 - effectSize));
      const se = 1 / Math.sqrt(n - 3);
      return 1 - jStat.normal.cdf(zAlpha - z / se, 0, 1) +
        jStat.normal.cdf(-zAlpha - z / se, 0, 1);
    }
    default:
      lambda = effectSize * Math.sqrt(n);
      break;
  }

  // Two-sided power via normal approximation
  return 1 - jStat.normal.cdf(zAlpha - lambda, 0, 1) +
    jStat.normal.cdf(-zAlpha - lambda, 0, 1);
}

export function PowerCurve({ effectSize, alpha, power, nPerGroup, testType }: PowerCurveProps) {
  const width = 400;
  const height = 220;
  const pad = { top: 20, right: 30, bottom: 40, left: 50 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // Generate power curve points
  const maxN = Math.max(Math.ceil(nPerGroup * 2.5), 20);
  const minN = 3;
  const steps = 50;
  const points: { n: number; p: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const n = Math.round(minN + ((maxN - minN) * i) / steps);
    const pw = Math.min(1, Math.max(0, computePower(n, effectSize, alpha, testType)));
    points.push({ n, p: pw });
  }

  const xScale = (n: number) => pad.left + ((n - minN) / (maxN - minN)) * plotW;
  const yScale = (p: number) => pad.top + plotH - p * plotH;

  const pathD = points
    .map((pt, i) => `${i === 0 ? "M" : "L"}${xScale(pt.n).toFixed(1)},${yScale(pt.p).toFixed(1)}`)
    .join(" ");

  // Y ticks
  const yTicks = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
  // X ticks
  const xTickCount = 5;
  const xTicks = Array.from({ length: xTickCount + 1 }, (_, i) =>
    Math.round(minN + ((maxN - minN) * i) / xTickCount)
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Power curve showing statistical power vs sample size"
    >
      {/* Grid */}
      {yTicks.map((t) => (
        <g key={t}>
          <line
            x1={pad.left}
            y1={yScale(t)}
            x2={pad.left + plotW}
            y2={yScale(t)}
            stroke="#f3f4f6"
          />
          <text
            x={pad.left - 8}
            y={yScale(t) + 4}
            textAnchor="end"
            fontSize={10}
            fill="#6b7280"
          >
            {t.toFixed(1)}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <g key={t}>
          <line
            x1={xScale(t)}
            y1={pad.top}
            x2={xScale(t)}
            y2={pad.top + plotH}
            stroke="#f3f4f6"
          />
          <text
            x={xScale(t)}
            y={pad.top + plotH + 14}
            textAnchor="middle"
            fontSize={10}
            fill="#6b7280"
          >
            {t}
          </text>
        </g>
      ))}

      {/* Axes */}
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="#d1d5db" />
      <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="#d1d5db" />

      {/* Target power line */}
      <line
        x1={pad.left}
        y1={yScale(power)}
        x2={pad.left + plotW}
        y2={yScale(power)}
        stroke="#ef4444"
        strokeDasharray="4,3"
        strokeWidth={1}
      />
      <text
        x={pad.left + plotW + 4}
        y={yScale(power) + 4}
        fontSize={9}
        fill="#ef4444"
      >
        {power}
      </text>

      {/* Power curve */}
      <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth={2} />

      {/* Selected point */}
      <circle cx={xScale(nPerGroup)} cy={yScale(power)} r={4} fill="#3b82f6" />
      <text
        x={xScale(nPerGroup)}
        y={yScale(power) - 10}
        textAnchor="middle"
        fontSize={10}
        fontWeight={600}
        fill="#1d4ed8"
      >
        N={nPerGroup}
      </text>

      {/* Axis labels */}
      <text
        x={pad.left + plotW / 2}
        y={height - 4}
        textAnchor="middle"
        fontSize={11}
        fill="#374151"
      >
        Sample Size (per group)
      </text>
      <text
        x={14}
        y={pad.top + plotH / 2}
        textAnchor="middle"
        fontSize={11}
        fill="#374151"
        transform={`rotate(-90, 14, ${pad.top + plotH / 2})`}
      >
        Power
      </text>
    </svg>
  );
}
