"use client";

interface ScreePlotProps {
  eigenvalues: number[];
  nFactors: number;
}

export function ScreePlot({ eigenvalues, nFactors }: ScreePlotProps) {
  const width = 400;
  const height = 220;
  const pad = { top: 20, right: 30, bottom: 40, left: 50 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const n = eigenvalues.length;
  const maxEig = Math.max(...eigenvalues) * 1.1;

  const xScale = (i: number) => pad.left + ((i + 0.5) / n) * plotW;
  const yScale = (v: number) => pad.top + plotH - (v / maxEig) * plotH;

  // Path for line
  const pathD = eigenvalues
    .map((e, i) => `${i === 0 ? "M" : "L"}${xScale(i).toFixed(1)},${yScale(e).toFixed(1)}`)
    .join(" ");

  // Y ticks
  const yMax = Math.ceil(maxEig);
  const yTicks = Array.from({ length: yMax + 1 }, (_, i) => i).filter(
    (t) => t <= maxEig
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Scree plot showing eigenvalues by component"
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
            {t}
          </text>
        </g>
      ))}

      {/* Axes */}
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="#d1d5db" />
      <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="#d1d5db" />

      {/* Kaiser criterion line (eigenvalue = 1) */}
      {maxEig > 1 && (
        <>
          <line
            x1={pad.left}
            y1={yScale(1)}
            x2={pad.left + plotW}
            y2={yScale(1)}
            stroke="#ef4444"
            strokeDasharray="4,3"
            strokeWidth={1}
          />
          <text
            x={pad.left + plotW + 2}
            y={yScale(1) + 4}
            fontSize={8}
            fill="#ef4444"
          >
            λ=1
          </text>
        </>
      )}

      {/* Line */}
      <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth={2} />

      {/* Points */}
      {eigenvalues.map((e, i) => (
        <g key={i}>
          <circle
            cx={xScale(i)}
            cy={yScale(e)}
            r={i < nFactors ? 5 : 3}
            fill={i < nFactors ? "#3b82f6" : "#d1d5db"}
            stroke={i < nFactors ? "#1d4ed8" : "#9ca3af"}
            strokeWidth={1}
          />
          {/* X label */}
          <text
            x={xScale(i)}
            y={pad.top + plotH + 14}
            textAnchor="middle"
            fontSize={10}
            fill="#6b7280"
          >
            {i + 1}
          </text>
        </g>
      ))}

      {/* Axis labels */}
      <text
        x={pad.left + plotW / 2}
        y={height - 4}
        textAnchor="middle"
        fontSize={11}
        fill="#374151"
      >
        Component
      </text>
      <text
        x={14}
        y={pad.top + plotH / 2}
        textAnchor="middle"
        fontSize={11}
        fill="#374151"
        transform={`rotate(-90, 14, ${pad.top + plotH / 2})`}
      >
        Eigenvalue
      </text>
    </svg>
  );
}
