import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "T-Test Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "T-Test Calculator",
    "T",
    "Independent & Paired samples with APA results, Cohen's d, and 95% CI"
  );
}
