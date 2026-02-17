import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Sample Size Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Sample Size Calculator",
    "N",
    "Power analysis for t-tests, ANOVA, correlation, chi-square & proportions"
  );
}
