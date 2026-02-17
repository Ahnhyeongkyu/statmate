"use client";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

interface GoodnessChartProps {
  observed: number[];
  expected: number[];
}

export function GoodnessBarChart({ observed, expected }: GoodnessChartProps) {
  const width = 400;
  const height = 220;
  const pad = { top: 20, right: 20, bottom: 40, left: 50 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const k = observed.length;
  const maxVal = Math.max(...observed, ...expected) * 1.15;
  const groupW = plotW / k;
  const barW = groupW * 0.35;

  const yScale = (v: number) => pad.top + plotH - (v / maxVal) * plotH;

  const ticks = 5;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) =>
    Math.round((maxVal / ticks) * i)
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Observed vs Expected bar chart"
    >
      {/* Y axis */}
      <line
        x1={pad.left}
        y1={pad.top}
        x2={pad.left}
        y2={pad.top + plotH}
        stroke="#d1d5db"
      />
      {yTicks.map((t) => (
        <g key={t}>
          <line
            x1={pad.left - 4}
            y1={yScale(t)}
            x2={pad.left}
            y2={yScale(t)}
            stroke="#9ca3af"
          />
          <text
            x={pad.left - 8}
            y={yScale(t) + 4}
            textAnchor="end"
            fontSize={10}
            fill="#6b7280"
          >
            {t}
          </text>
          <line
            x1={pad.left}
            y1={yScale(t)}
            x2={pad.left + plotW}
            y2={yScale(t)}
            stroke="#f3f4f6"
          />
        </g>
      ))}

      {/* Bars */}
      {observed.map((obs, i) => {
        const cx = pad.left + groupW * i + groupW / 2;
        return (
          <g key={i}>
            {/* Observed */}
            <rect
              x={cx - barW - 1}
              y={yScale(obs)}
              width={barW}
              height={pad.top + plotH - yScale(obs)}
              fill="#3b82f6"
              rx={2}
            />
            {/* Expected */}
            <rect
              x={cx + 1}
              y={yScale(expected[i])}
              width={barW}
              height={pad.top + plotH - yScale(expected[i])}
              fill="#f59e0b"
              opacity={0.7}
              rx={2}
            />
            {/* Label */}
            <text
              x={cx}
              y={pad.top + plotH + 14}
              textAnchor="middle"
              fontSize={10}
              fill="#374151"
            >
              C{i + 1}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <rect x={pad.left + plotW - 110} y={pad.top} width={10} height={10} fill="#3b82f6" rx={2} />
      <text x={pad.left + plotW - 96} y={pad.top + 9} fontSize={10} fill="#374151">
        Observed
      </text>
      <rect x={pad.left + plotW - 110} y={pad.top + 16} width={10} height={10} fill="#f59e0b" opacity={0.7} rx={2} />
      <text x={pad.left + plotW - 96} y={pad.top + 25} fontSize={10} fill="#374151">
        Expected
      </text>
    </svg>
  );
}

interface IndependenceChartProps {
  observed: number[][];
}

export function IndependenceBarChart({ observed }: IndependenceChartProps) {
  const width = 400;
  const height = 220;
  const pad = { top: 20, right: 20, bottom: 40, left: 50 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const nRows = observed.length;
  const nCols = observed[0].length;
  const maxVal = Math.max(...observed.flat()) * 1.15;
  const groupW = plotW / nCols;
  const barW = (groupW * 0.7) / nRows;

  const yScale = (v: number) => pad.top + plotH - (v / maxVal) * plotH;

  const ticks = 5;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) =>
    Math.round((maxVal / ticks) * i)
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Chi-square contingency chart"
    >
      {/* Y axis */}
      <line
        x1={pad.left}
        y1={pad.top}
        x2={pad.left}
        y2={pad.top + plotH}
        stroke="#d1d5db"
      />
      {yTicks.map((t) => (
        <g key={t}>
          <line
            x1={pad.left - 4}
            y1={yScale(t)}
            x2={pad.left}
            y2={yScale(t)}
            stroke="#9ca3af"
          />
          <text
            x={pad.left - 8}
            y={yScale(t) + 4}
            textAnchor="end"
            fontSize={10}
            fill="#6b7280"
          >
            {t}
          </text>
          <line
            x1={pad.left}
            y1={yScale(t)}
            x2={pad.left + plotW}
            y2={yScale(t)}
            stroke="#f3f4f6"
          />
        </g>
      ))}

      {/* Grouped bars by column */}
      {Array.from({ length: nCols }, (_, j) => {
        const cx = pad.left + groupW * j + groupW / 2;
        const startX = cx - (nRows * barW) / 2;
        return (
          <g key={j}>
            {observed.map((row, i) => (
              <rect
                key={i}
                x={startX + i * barW}
                y={yScale(row[j])}
                width={barW - 1}
                height={pad.top + plotH - yScale(row[j])}
                fill={COLORS[i % COLORS.length]}
                rx={2}
              />
            ))}
            <text
              x={cx}
              y={pad.top + plotH + 14}
              textAnchor="middle"
              fontSize={10}
              fill="#374151"
            >
              Col {j + 1}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      {Array.from({ length: nRows }, (_, i) => (
        <g key={i}>
          <rect
            x={pad.left + plotW - 80}
            y={pad.top + i * 16}
            width={10}
            height={10}
            fill={COLORS[i % COLORS.length]}
            rx={2}
          />
          <text
            x={pad.left + plotW - 66}
            y={pad.top + i * 16 + 9}
            fontSize={10}
            fill="#374151"
          >
            Row {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}
