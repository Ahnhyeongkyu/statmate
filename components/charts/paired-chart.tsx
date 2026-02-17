"use client";

export function PairedChart({
  pre,
  post,
  preLabel,
  postLabel,
}: {
  pre: number[];
  post: number[];
  preLabel: string;
  postLabel: string;
}) {
  const width = 350;
  const height = 220;
  const pad = { top: 20, right: 30, bottom: 35, left: 50 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const allValues = [...pre, ...post];
  const yMin = Math.min(...allValues);
  const yMax = Math.max(...allValues);
  const yRange = yMax - yMin || 1;
  const yPad = yRange * 0.1;
  const yLo = yMin - yPad;
  const yHi = yMax + yPad;
  const yR = yHi - yLo;

  const scaleY = (v: number) => pad.top + plotH - ((v - yLo) / yR) * plotH;

  const x1 = pad.left + plotW * 0.3;
  const x2 = pad.left + plotW * 0.7;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-sm">
      {/* Axes */}
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="#9ca3af" strokeWidth="1" />
      <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="#9ca3af" strokeWidth="1" />

      {/* Y-axis ticks */}
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
        const val = yLo + frac * yR;
        return (
          <text key={frac} x={pad.left - 6} y={scaleY(val) + 3} textAnchor="end" fontSize={9} className="fill-gray-500">
            {val.toFixed(val % 1 === 0 ? 0 : 1)}
          </text>
        );
      })}

      {/* Connecting lines (each pair) */}
      {pre.map((preVal, i) => {
        const postVal = post[i];
        const increased = postVal > preVal;
        return (
          <line
            key={i}
            x1={x1}
            y1={scaleY(preVal)}
            x2={x2}
            y2={scaleY(postVal)}
            stroke={increased ? "#10b981" : "#ef4444"}
            strokeWidth="1"
            opacity="0.4"
          />
        );
      })}

      {/* Pre dots */}
      {pre.map((val, i) => (
        <circle key={`pre-${i}`} cx={x1} cy={scaleY(val)} r="3.5" fill="#3b82f6" opacity="0.7" />
      ))}

      {/* Post dots */}
      {post.map((val, i) => (
        <circle key={`post-${i}`} cx={x2} cy={scaleY(val)} r="3.5" fill="#f59e0b" opacity="0.7" />
      ))}

      {/* Labels */}
      <text x={x1} y={pad.top + plotH + 18} textAnchor="middle" fontSize={11} className="fill-blue-600" fontWeight="600">
        {preLabel}
      </text>
      <text x={x2} y={pad.top + plotH + 18} textAnchor="middle" fontSize={11} className="fill-amber-600" fontWeight="600">
        {postLabel}
      </text>
    </svg>
  );
}
