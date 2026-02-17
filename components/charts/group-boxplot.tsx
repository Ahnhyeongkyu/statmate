"use client";

interface GroupData {
  label: string;
  values: number[];
}

function quartiles(sorted: number[]) {
  const n = sorted.length;
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  const lower = sorted.slice(0, Math.floor(n / 2));
  const upper = sorted.slice(Math.ceil(n / 2));
  const q1 = lower.length % 2 === 0
    ? (lower[lower.length / 2 - 1] + lower[lower.length / 2]) / 2
    : lower[Math.floor(lower.length / 2)];
  const q3 = upper.length % 2 === 0
    ? (upper[upper.length / 2 - 1] + upper[upper.length / 2]) / 2
    : upper[Math.floor(upper.length / 2)];
  return { q1, median, q3, iqr: q3 - q1 };
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export function GroupBoxplot({ groups }: { groups: GroupData[] }) {
  const width = 400;
  const height = 220;
  const pad = { top: 20, right: 20, bottom: 35, left: 50 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // Global min/max for y-axis
  const allValues = groups.flatMap((g) => g.values);
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);
  const range = globalMax - globalMin || 1;
  const yPad = range * 0.1;
  const yMin = globalMin - yPad;
  const yMax = globalMax + yPad;
  const yRange = yMax - yMin;

  const scaleY = (v: number) => pad.top + plotH - ((v - yMin) / yRange) * plotH;

  const groupWidth = plotW / groups.length;
  const boxWidth = Math.min(groupWidth * 0.6, 60);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md">
      {/* Y-axis */}
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="#9ca3af" strokeWidth="1" />
      {/* X-axis */}
      <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="#9ca3af" strokeWidth="1" />

      {/* Y-axis ticks */}
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
        const val = yMin + frac * yRange;
        const y = scaleY(val);
        return (
          <g key={frac}>
            <line x1={pad.left - 3} y1={y} x2={pad.left} y2={y} stroke="#9ca3af" strokeWidth="1" />
            <text x={pad.left - 6} y={y + 3} textAnchor="end" fontSize={9} className="fill-gray-500">
              {val.toFixed(val % 1 === 0 ? 0 : 1)}
            </text>
          </g>
        );
      })}

      {/* Boxplots */}
      {groups.map((group, i) => {
        const sorted = [...group.values].sort((a, b) => a - b);
        const { q1, median, q3, iqr } = quartiles(sorted);
        const lowerFence = q1 - 1.5 * iqr;
        const upperFence = q3 + 1.5 * iqr;
        const inFence = sorted.filter((v) => v >= lowerFence && v <= upperFence);
        const whiskerMin = inFence.length > 0 ? Math.min(...inFence) : sorted[0];
        const whiskerMax = inFence.length > 0 ? Math.max(...inFence) : sorted[sorted.length - 1];
        const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);
        const cx = pad.left + i * groupWidth + groupWidth / 2;
        const color = COLORS[i % COLORS.length];

        return (
          <g key={i}>
            {/* Whisker */}
            <line x1={cx} y1={scaleY(whiskerMin)} x2={cx} y2={scaleY(q1)} stroke="#6b7280" strokeWidth="1" />
            <line x1={cx} y1={scaleY(q3)} x2={cx} y2={scaleY(whiskerMax)} stroke="#6b7280" strokeWidth="1" />
            {/* Whisker caps */}
            <line x1={cx - boxWidth / 4} y1={scaleY(whiskerMin)} x2={cx + boxWidth / 4} y2={scaleY(whiskerMin)} stroke="#6b7280" strokeWidth="1" />
            <line x1={cx - boxWidth / 4} y1={scaleY(whiskerMax)} x2={cx + boxWidth / 4} y2={scaleY(whiskerMax)} stroke="#6b7280" strokeWidth="1" />
            {/* Box */}
            <rect
              x={cx - boxWidth / 2}
              y={scaleY(q3)}
              width={boxWidth}
              height={scaleY(q1) - scaleY(q3)}
              fill={color}
              fillOpacity="0.2"
              stroke={color}
              strokeWidth="1.5"
            />
            {/* Median */}
            <line
              x1={cx - boxWidth / 2}
              y1={scaleY(median)}
              x2={cx + boxWidth / 2}
              y2={scaleY(median)}
              stroke={color}
              strokeWidth="2"
            />
            {/* Outliers */}
            {outliers.map((val, j) => (
              <circle key={j} cx={cx} cy={scaleY(val)} r={2.5} fill="none" stroke="#ef4444" strokeWidth="1.5" />
            ))}
            {/* Label */}
            <text x={cx} y={pad.top + plotH + 14} textAnchor="middle" fontSize={10} className="fill-gray-700">
              {group.label.length > 8 ? group.label.slice(0, 8) + "..." : group.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
