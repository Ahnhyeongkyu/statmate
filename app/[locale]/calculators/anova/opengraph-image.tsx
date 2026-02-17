import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "ANOVA Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "One-Way ANOVA Calculator",
    "F",
    "Compare means across 3+ groups with F-statistic, eta-squared, and Bonferroni post-hoc"
  );
}
