import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Fisher's Exact Test Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Fisher's Exact Test Calculator",
    "p",
    "Exact test for 2x2 contingency tables with small samples"
  );
}
