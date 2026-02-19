"use client";

interface CoefficientData {
  name: string;
  expB: number;
  expBCI95: [number, number];
}

interface OddsRatioChartProps {
  coefficients: CoefficientData[];
}

export function OddsRatioChart({ coefficients }: OddsRatioChartProps) {
  // Filter out intercept
  const predictors = coefficients.filter((c) => c.name !== "Intercept");
  if (predictors.length === 0) return null;

  const width = 400;
  const rowH = 28;
  const height = Math.max(140, predictors.length * rowH + 80);
  const pad = { top: 20, right: 30, bottom: 30, left: 100 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // Determine x range (log scale for OR)
  const allVals = predictors.flatMap((c) => [c.expBCI95[0], c.expBCI95[1], c.expB]);
  const minVal = Math.max(0.01, Math.min(...allVals) * 0.8);
  const maxVal = Math.min(100, Math.max(...allVals) * 1.2);

  const logMin = Math.log10(minVal);
  const logMax = Math.log10(maxVal);
  const xScale = (v: number) => {
    const logV = Math.log10(Math.max(0.01, v));
    return pad.left + ((logV - logMin) / (logMax - logMin)) * plotW;
  };

  const yStep = plotH / (predictors.length + 1);

  // X ticks (log scale)
  const xTicks = [0.1, 0.25, 0.5, 1, 2, 4, 10].filter(
    (t) => t >= minVal && t <= maxVal
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Odds ratio forest plot"
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
            {t}
          </text>
        </g>
      ))}

      {/* OR = 1 reference line */}
      <line
        x1={xScale(1)}
        y1={pad.top}
        x2={xScale(1)}
        y2={pad.top + plotH}
        stroke="#ef4444"
        strokeDasharray="4,3"
        strokeWidth={1}
      />

      {/* Axes */}
      <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="#d1d5db" />

      {/* Predictors */}
      {predictors.map((coef, i) => {
        const y = pad.top + (i + 1) * yStep;
        const ciLow = Math.max(minVal, coef.expBCI95[0]);
        const ciHigh = Math.min(maxVal, coef.expBCI95[1]);
        const isSignificant = coef.expBCI95[0] > 1 || coef.expBCI95[1] < 1;

        return (
          <g key={i}>
            {/* Label */}
            <text
              x={pad.left - 8}
              y={y + 4}
              textAnchor="end"
              fontSize={10}
              fill="#374151"
            >
              {coef.name.length > 12 ? coef.name.slice(0, 12) : coef.name}
            </text>
            {/* CI line */}
            <line
              x1={xScale(ciLow)}
              y1={y}
              x2={xScale(ciHigh)}
              y2={y}
              stroke={isSignificant ? "#3b82f6" : "#9ca3af"}
              strokeWidth={2}
            />
            {/* CI caps */}
            <line x1={xScale(ciLow)} y1={y - 4} x2={xScale(ciLow)} y2={y + 4} stroke={isSignificant ? "#3b82f6" : "#9ca3af"} strokeWidth={1.5} />
            <line x1={xScale(ciHigh)} y1={y - 4} x2={xScale(ciHigh)} y2={y + 4} stroke={isSignificant ? "#3b82f6" : "#9ca3af"} strokeWidth={1.5} />
            {/* Point estimate */}
            <circle
              cx={xScale(coef.expB)}
              cy={y}
              r={4}
              fill={isSignificant ? "#3b82f6" : "#9ca3af"}
            />
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
        Odds Ratio (log scale)
      </text>
    </svg>
  );
}
