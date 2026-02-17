import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Mann-Whitney U Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Mann-Whitney U Calculator",
    "U",
    "Non-parametric test for comparing two independent groups"
  );
}
