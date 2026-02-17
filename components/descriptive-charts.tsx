"use client";

import { useTranslations } from "next-intl";
import type { DescriptiveResult } from "@/lib/statistics/descriptive";

const CHART_WIDTH = 400;
const CHART_HEIGHT = 200;
const PADDING = { top: 20, right: 20, bottom: 30, left: 50 };

function computeBins(data: number[], binCount = 10) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const binWidth = range / binCount;
  const bins: { x0: number; x1: number; count: number }[] = [];
  for (let i = 0; i < binCount; i++) {
    bins.push({
      x0: min + i * binWidth,
      x1: min + (i + 1) * binWidth,
      count: 0,
    });
  }
  for (const val of data) {
    let idx = Math.floor((val - min) / binWidth);
    if (idx >= binCount) idx = binCount - 1;
    bins[idx].count++;
  }
  return bins;
}

export function Histogram({ data }: { data: number[] }) {
  const td = useTranslations("descriptive");
  const binCount = Math.min(Math.max(Math.ceil(Math.sqrt(data.length)), 5), 20);
  const bins = computeBins(data, binCount);
  const maxCount = Math.max(...bins.map((b) => b.count), 1);

  const plotW = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotH = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const barW = plotW / bins.length;

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-700">
        {td("histogram")}
      </p>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="w-full rounded-md border bg-white"
        role="img"
        aria-label="Histogram"
      >
        {/* Y-axis */}
        <line
          x1={PADDING.left}
          y1={PADDING.top}
          x2={PADDING.left}
          y2={PADDING.top + plotH}
          stroke="#9ca3af"
          strokeWidth={1}
        />
        {/* X-axis */}
        <line
          x1={PADDING.left}
          y1={PADDING.top + plotH}
          x2={PADDING.left + plotW}
          y2={PADDING.top + plotH}
          stroke="#9ca3af"
          strokeWidth={1}
        />

        {/* Bars */}
        {bins.map((bin, i) => {
          const barH = (bin.count / maxCount) * plotH;
          return (
            <rect
              key={i}
              x={PADDING.left + i * barW + 1}
              y={PADDING.top + plotH - barH}
              width={barW - 2}
              height={barH}
              fill="#3b82f6"
              opacity={0.8}
            />
          );
        })}

        {/* Y-axis labels */}
        {[0, Math.round(maxCount / 2), maxCount].map((val, i) => {
          const y = PADDING.top + plotH - (val / maxCount) * plotH;
          return (
            <text
              key={i}
              x={PADDING.left - 5}
              y={y + 4}
              textAnchor="end"
              className="fill-gray-500"
              fontSize={10}
            >
              {val}
            </text>
          );
        })}

        {/* X-axis labels (first, middle, last bin) */}
        {[0, Math.floor(bins.length / 2), bins.length - 1].map((idx) => (
          <text
            key={idx}
            x={PADDING.left + idx * barW + barW / 2}
            y={PADDING.top + plotH + 15}
            textAnchor="middle"
            className="fill-gray-500"
            fontSize={10}
          >
            {bins[idx].x0.toFixed(1)}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function Boxplot({
  data,
  result,
}: {
  data: number[];
  result: DescriptiveResult;
}) {
  const td = useTranslations("descriptive");
  const { min, max, q1, q3, median, iqr } = result;
  const range = max - min || 1;

  const plotW = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotH = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const midY = PADDING.top + plotH / 2;
  const boxH = plotH * 0.5;

  // Scale value to x position
  function scaleX(val: number) {
    return PADDING.left + ((val - min) / range) * plotW;
  }

  // Outlier bounds (1.5 * IQR)
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const whiskerLow = Math.max(min, lowerFence);
  const whiskerHigh = Math.min(max, upperFence);
  const outliers = data.filter((v) => v < lowerFence || v > upperFence);

  // Actual whisker endpoints (closest data point within fences)
  const inFence = data.filter((v) => v >= lowerFence && v <= upperFence);
  const whiskerMin = inFence.length > 0 ? Math.min(...inFence) : min;
  const whiskerMax = inFence.length > 0 ? Math.max(...inFence) : max;

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-700">
        {td("boxplot")}
      </p>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="w-full rounded-md border bg-white"
        role="img"
        aria-label="Box plot"
      >
        {/* Lower whisker line */}
        <line
          x1={scaleX(whiskerMin)}
          y1={midY}
          x2={scaleX(q1)}
          y2={midY}
          stroke="#6b7280"
          strokeWidth={1.5}
        />
        {/* Lower whisker cap */}
        <line
          x1={scaleX(whiskerMin)}
          y1={midY - boxH / 4}
          x2={scaleX(whiskerMin)}
          y2={midY + boxH / 4}
          stroke="#6b7280"
          strokeWidth={1.5}
        />

        {/* Box (Q1 to Q3) */}
        <rect
          x={scaleX(q1)}
          y={midY - boxH / 2}
          width={scaleX(q3) - scaleX(q1)}
          height={boxH}
          fill="#dbeafe"
          stroke="#3b82f6"
          strokeWidth={1.5}
        />

        {/* Median line */}
        <line
          x1={scaleX(median)}
          y1={midY - boxH / 2}
          x2={scaleX(median)}
          y2={midY + boxH / 2}
          stroke="#1d4ed8"
          strokeWidth={2}
        />

        {/* Upper whisker line */}
        <line
          x1={scaleX(q3)}
          y1={midY}
          x2={scaleX(whiskerMax)}
          y2={midY}
          stroke="#6b7280"
          strokeWidth={1.5}
        />
        {/* Upper whisker cap */}
        <line
          x1={scaleX(whiskerMax)}
          y1={midY - boxH / 4}
          x2={scaleX(whiskerMax)}
          y2={midY + boxH / 4}
          stroke="#6b7280"
          strokeWidth={1.5}
        />

        {/* Outliers */}
        {outliers.map((val, i) => (
          <circle
            key={i}
            cx={scaleX(val)}
            cy={midY}
            r={3}
            fill="none"
            stroke="#ef4444"
            strokeWidth={1.5}
          />
        ))}

        {/* Labels */}
        <text
          x={scaleX(whiskerMin)}
          y={midY + boxH / 2 + 15}
          textAnchor="middle"
          className="fill-gray-500"
          fontSize={10}
        >
          {whiskerMin.toFixed(1)}
        </text>
        <text
          x={scaleX(q1)}
          y={midY - boxH / 2 - 5}
          textAnchor="middle"
          className="fill-gray-500"
          fontSize={10}
        >
          Q1: {q1.toFixed(1)}
        </text>
        <text
          x={scaleX(median)}
          y={midY + boxH / 2 + 15}
          textAnchor="middle"
          className="fill-blue-700"
          fontSize={10}
          fontWeight="bold"
        >
          Mdn: {median.toFixed(1)}
        </text>
        <text
          x={scaleX(q3)}
          y={midY - boxH / 2 - 5}
          textAnchor="middle"
          className="fill-gray-500"
          fontSize={10}
        >
          Q3: {q3.toFixed(1)}
        </text>
        <text
          x={scaleX(whiskerMax)}
          y={midY + boxH / 2 + 15}
          textAnchor="middle"
          className="fill-gray-500"
          fontSize={10}
        >
          {whiskerMax.toFixed(1)}
        </text>
      </svg>
    </div>
  );
}
