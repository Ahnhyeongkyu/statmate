import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Wilcoxon Signed-Rank Test Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Wilcoxon Signed-Rank Calculator",
    "W",
    "Non-parametric test for paired/repeated measures data"
  );
}
