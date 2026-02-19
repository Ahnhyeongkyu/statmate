"use client";

interface CoefficientData {
  name: string;
  beta: number;
  p: number;
}

interface CoefficientChartProps {
  coefficients: CoefficientData[];
}

export function CoefficientChart({ coefficients }: CoefficientChartProps) {
  // Filter out intercept
  const predictors = coefficients.filter((c) => c.name !== "Intercept");
  if (predictors.length === 0) return null;

  const width = 400;
  const height = 220;
  const pad = { top: 20, right: 20, bottom: 40, left: 90 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const maxAbs = Math.max(0.1, ...predictors.map((c) => Math.abs(c.beta))) * 1.2;
  const barH = Math.min(22, (plotH / predictors.length) * 0.7);
  const gap = plotH / predictors.length;

  const xScale = (v: number) => pad.left + ((v + maxAbs) / (2 * maxAbs)) * plotW;

  // X ticks
  const xTicks = [-maxAbs, -maxAbs / 2, 0, maxAbs / 2, maxAbs].map(
    (t) => Math.round(t * 100) / 100
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Standardized coefficient bar chart"
    >
      {/* Grid */}
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
            {t.toFixed(2)}
          </text>
        </g>
      ))}

      {/* Zero reference line */}
      <line
        x1={xScale(0)}
        y1={pad.top}
        x2={xScale(0)}
        y2={pad.top + plotH}
        stroke="#d1d5db"
        strokeWidth={1}
      />

      {/* Axes */}
      <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="#d1d5db" />

      {/* Bars */}
      {predictors.map((coef, i) => {
        const y = pad.top + i * gap + (gap - barH) / 2;
        const x0 = xScale(0);
        const x1 = xScale(coef.beta);
        const barX = Math.min(x0, x1);
        const barWidth = Math.abs(x1 - x0);
        const isSig = coef.p < 0.05;

        return (
          <g key={i}>
            {/* Label */}
            <text
              x={pad.left - 6}
              y={y + barH / 2 + 4}
              textAnchor="end"
              fontSize={10}
              fill="#374151"
            >
              {coef.name.length > 10 ? coef.name.slice(0, 10) : coef.name}
            </text>
            {/* Bar */}
            <rect
              x={barX}
              y={y}
              width={barWidth}
              height={barH}
              fill={isSig ? (coef.beta >= 0 ? "#93c5fd" : "#fca5a5") : "#e5e7eb"}
              stroke={isSig ? (coef.beta >= 0 ? "#3b82f6" : "#ef4444") : "#9ca3af"}
              strokeWidth={1}
              rx={2}
            />
            {/* Value label */}
            <text
              x={x1 + (coef.beta >= 0 ? 4 : -4)}
              y={y + barH / 2 + 4}
              textAnchor={coef.beta >= 0 ? "start" : "end"}
              fontSize={9}
              fill="#374151"
            >
              {coef.beta.toFixed(3)}
            </text>
          </g>
        );
      })}

      {/* X label */}
      <text
        x={pad.left + plotW / 2}
        y={height - 4}
        textAnchor="middle"
        fontSize={11}
        fill="#374151"
      >
        Standardized β
      </text>
    </svg>
  );
}
