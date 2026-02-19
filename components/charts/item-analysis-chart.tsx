"use client";

interface ItemData {
  name: string;
  correctedItemTotalR: number;
  alphaIfDeleted: number;
}

interface ItemAnalysisChartProps {
  items: ItemData[];
  alpha: number;
}

export function ItemAnalysisChart({ items, alpha }: ItemAnalysisChartProps) {
  const width = 400;
  const height = 220;
  const pad = { top: 20, right: 20, bottom: 40, left: 50 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const maxVal = Math.max(
    1,
    ...items.map((i) => Math.abs(i.correctedItemTotalR))
  );
  const barW = Math.min(30, (plotW / items.length) * 0.7);
  const gap = plotW / items.length;

  const yScale = (v: number) => pad.top + plotH - (v / maxVal) * plotH;

  // Y ticks
  const yTicks = [0, 0.2, 0.4, 0.6, 0.8, 1.0].filter((t) => t <= maxVal);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Item-total correlation bar chart"
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

      {/* Axes */}
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="#d1d5db" />
      <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="#d1d5db" />

      {/* Alpha reference line */}
      <line
        x1={pad.left}
        y1={yScale(alpha)}
        x2={pad.left + plotW}
        y2={yScale(alpha)}
        stroke="#ef4444"
        strokeDasharray="4,3"
        strokeWidth={1}
      />
      <text
        x={pad.left + plotW + 2}
        y={yScale(alpha) + 4}
        fontSize={8}
        fill="#ef4444"
      >
        α
      </text>

      {/* Bars */}
      {items.map((item, i) => {
        const x = pad.left + i * gap + (gap - barW) / 2;
        const val = Math.max(0, item.correctedItemTotalR);
        const h = (val / maxVal) * plotH;
        const isWeak = val < 0.3;
        return (
          <g key={i}>
            <rect
              x={x}
              y={pad.top + plotH - h}
              width={barW}
              height={h}
              fill={isWeak ? "#fca5a5" : "#93c5fd"}
              stroke={isWeak ? "#ef4444" : "#3b82f6"}
              strokeWidth={1}
              rx={2}
            />
            <text
              x={x + barW / 2}
              y={pad.top + plotH + 12}
              textAnchor="middle"
              fontSize={items.length > 8 ? 7 : 9}
              fill="#6b7280"
            >
              {item.name.length > 6 ? item.name.slice(0, 6) : item.name}
            </text>
            <text
              x={x + barW / 2}
              y={pad.top + plotH - h - 4}
              textAnchor="middle"
              fontSize={8}
              fill="#374151"
            >
              {val.toFixed(2)}
            </text>
          </g>
        );
      })}

      {/* Y label */}
      <text
        x={12}
        y={pad.top + plotH / 2}
        textAnchor="middle"
        fontSize={10}
        fill="#374151"
        transform={`rotate(-90, 12, ${pad.top + plotH / 2})`}
      >
        Item-Total r
      </text>
    </svg>
  );
}
