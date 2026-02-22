"use client";

import type { RegressionResult } from "@/lib/statistics/regression";

const WIDTH = 350;
const HEIGHT = 200;
const PAD = { top: 20, right: 20, bottom: 30, left: 50 };

export function ResidualPlot({
  result,
}: {
  result: RegressionResult;
}) {
  const plotW = WIDTH - PAD.left - PAD.right;
  const plotH = HEIGHT - PAD.top - PAD.bottom;

  const residuals = result.residuals;
  const predicted = result.predicted;

  const xMin = Math.min(...predicted);
  const xMax = Math.max(...predicted);
  const yMin = Math.min(...residuals);
  const yMax = Math.max(...residuals);
  const xRange = xMax - xMin || 1;
  const yRange = Math.max(Math.abs(yMin), Math.abs(yMax)) || 1;

  const scaleX = (v: number) => PAD.left + ((v - xMin) / xRange) * plotW;
  const scaleY = (v: number) => PAD.top + plotH / 2 - (v / yRange) * (plotH / 2);

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full max-w-sm">
      {/* Axes */}
      <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + plotH} stroke="#9ca3af" strokeWidth="1" />
      <line x1={PAD.left} y1={PAD.top + plotH} x2={PAD.left + plotW} y2={PAD.top + plotH} stroke="#9ca3af" strokeWidth="1" />
      {/* Zero line */}
      <line
        x1={PAD.left}
        y1={scaleY(0)}
        x2={PAD.left + plotW}
        y2={scaleY(0)}
        stroke="#9ca3af"
        strokeWidth="1"
        strokeDasharray="4"
      />
      {/* Points */}
      {predicted.map((pred, i) => (
        <circle
          key={i}
          cx={scaleX(pred)}
          cy={scaleY(residuals[i])}
          r="3.5"
          fill={residuals[i] >= 0 ? "#3b82f6" : "#ef4444"}
          opacity="0.7"
        />
      ))}
      {/* Labels */}
      <text x={WIDTH / 2} y={HEIGHT - 3} textAnchor="middle" fontSize={10} className="fill-gray-500">
        Predicted
      </text>
      <text x={8} y={HEIGHT / 2} textAnchor="middle" transform={`rotate(-90, 8, ${HEIGHT / 2})`} fontSize={10} className="fill-gray-500">
        Residual
      </text>
    </svg>
  );
}

export function QQPlot({
  result,
}: {
  result: RegressionResult;
}) {
  const plotW = WIDTH - PAD.left - PAD.right;
  const plotH = HEIGHT - PAD.top - PAD.bottom;

  const residuals = [...result.residuals].sort((a, b) => a - b);
  const n = residuals.length;

  // Theoretical quantiles (approximation using normal inverse)
  function normalQuantile(p: number): number {
    // Rational approximation for probit
    const a = [
      -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
      1.383577518672690e2, -3.066479806614716e1, 2.506628277459239e0,
    ];
    const b = [
      -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
      6.680131188771972e1, -1.328068155288572e1,
    ];
    const c = [
      -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838e0,
      -2.549732539343734e0, 4.374664141464968e0, 2.938163982698783e0,
    ];
    const d = [
      7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996e0,
      3.754408661907416e0,
    ];

    const pLow = 0.02425;
    const pHigh = 1 - pLow;

    let q: number;
    if (p < pLow) {
      const qq = Math.sqrt(-2 * Math.log(p));
      q =
        (((((c[0] * qq + c[1]) * qq + c[2]) * qq + c[3]) * qq + c[4]) * qq + c[5]) /
        ((((d[0] * qq + d[1]) * qq + d[2]) * qq + d[3]) * qq + 1);
    } else if (p <= pHigh) {
      const qq = p - 0.5;
      const r = qq * qq;
      q =
        ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * qq) /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    } else {
      const qq = Math.sqrt(-2 * Math.log(1 - p));
      q =
        -(((((c[0] * qq + c[1]) * qq + c[2]) * qq + c[3]) * qq + c[4]) * qq + c[5]) /
        ((((d[0] * qq + d[1]) * qq + d[2]) * qq + d[3]) * qq + 1);
    }
    return q;
  }

  const theoretical = residuals.map((_, i) => normalQuantile((i + 0.5) / n));

  const xMin = Math.min(...theoretical);
  const xMax = Math.max(...theoretical);
  const yMin = Math.min(...residuals);
  const yMax = Math.max(...residuals);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;

  const scaleX = (v: number) => PAD.left + ((v - xMin) / xRange) * plotW;
  const scaleY = (v: number) => PAD.top + plotH - ((v - yMin) / yRange) * plotH;

  // Reference line (diagonal)
  const _lineXMin = Math.max(xMin, yMin);
  const _lineXMax = Math.min(xMax, yMax);

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full max-w-sm">
      {/* Axes */}
      <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + plotH} stroke="#9ca3af" strokeWidth="1" />
      <line x1={PAD.left} y1={PAD.top + plotH} x2={PAD.left + plotW} y2={PAD.top + plotH} stroke="#9ca3af" strokeWidth="1" />
      {/* Reference line */}
      <line
        x1={scaleX(xMin)}
        y1={scaleY(xMin * (yRange / xRange) + yMin - xMin * (yRange / xRange))}
        x2={scaleX(xMax)}
        y2={scaleY(xMax * (yRange / xRange) + yMin - xMin * (yRange / xRange))}
        stroke="#ef4444"
        strokeWidth="1.5"
        strokeDasharray="4"
      />
      {/* Points */}
      {theoretical.map((th, i) => (
        <circle
          key={i}
          cx={scaleX(th)}
          cy={scaleY(residuals[i])}
          r="3.5"
          fill="#3b82f6"
          opacity="0.7"
        />
      ))}
      {/* Labels */}
      <text x={WIDTH / 2} y={HEIGHT - 3} textAnchor="middle" fontSize={10} className="fill-gray-500">
        Theoretical Quantiles
      </text>
      <text x={8} y={HEIGHT / 2} textAnchor="middle" transform={`rotate(-90, 8, ${HEIGHT / 2})`} fontSize={10} className="fill-gray-500">
        Sample Quantiles
      </text>
    </svg>
  );
}
