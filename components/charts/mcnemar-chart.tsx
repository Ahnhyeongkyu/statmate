"use client";

interface McNemarChartProps {
  observed: number[][];
  rowLabels: [string, string];
  colLabels: [string, string];
}

export function McNemarChart({ observed, rowLabels, colLabels }: McNemarChartProps) {
  const width = 400;
  const height = 200;
  const pad = { top: 30, right: 20, bottom: 40, left: 80 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // Row totals (pre-test categories)
  const rowTotals = observed.map((row) => row.reduce((a, b) => a + b, 0));
  const n = rowTotals.reduce((a, b) => a + b, 0);
  if (n === 0) return null;

  const barH = plotH / 3;
  const colors = ["#3b82f6", "#f59e0b"];

  const xScale = (v: number) => pad.left + (v / n) * plotW;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="McNemar test proportional bar chart"
    >
      {/* Legend */}
      {colLabels.map((label, j) => (
        <g key={j}>
          <rect x={pad.left + j * 120} y={6} width={12} height={12} fill={colors[j]} rx={2} />
          <text x={pad.left + j * 120 + 16} y={16} fontSize={10} fill="#374151">
            {label}
          </text>
        </g>
      ))}

      {/* Stacked bars for each row (pre-test category) */}
      {observed.map((row, i) => {
        const y = pad.top + i * (barH + 10);
        let cumX = 0;
        return (
          <g key={i}>
            {/* Row label */}
            <text
              x={pad.left - 8}
              y={y + barH / 2 + 4}
              textAnchor="end"
              fontSize={11}
              fill="#374151"
            >
              {rowLabels[i]}
            </text>
            {/* Stacked segments */}
            {row.map((val, j) => {
              const segW = (val / n) * plotW;
              const x = pad.left + cumX;
              cumX += segW;
              return (
                <g key={j}>
                  <rect
                    x={x}
                    y={y}
                    width={segW}
                    height={barH}
                    fill={colors[j]}
                    opacity={0.8}
                    stroke="white"
                    strokeWidth={1}
                    rx={j === 0 ? 3 : 0}
                  />
                  {segW > 30 && (
                    <text
                      x={x + segW / 2}
                      y={y + barH / 2 + 5}
                      textAnchor="middle"
                      fontSize={11}
                      fill="white"
                      fontWeight={600}
                    >
                      {val}
                    </text>
                  )}
                </g>
              );
            })}
            {/* Row total */}
            <text
              x={pad.left + cumX + 6}
              y={y + barH / 2 + 4}
              fontSize={10}
              fill="#6b7280"
            >
              n={rowTotals[i]}
            </text>
          </g>
        );
      })}

      {/* X axis ticks */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
        <text
          key={pct}
          x={xScale(pct * n)}
          y={pad.top + 2 * (barH + 10) + 14}
          textAnchor="middle"
          fontSize={10}
          fill="#6b7280"
        >
          {(pct * 100).toFixed(0)}%
        </text>
      ))}
    </svg>
  );
}
