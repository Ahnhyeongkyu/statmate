import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Friedman Test Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Friedman Test Calculator",
    "\u03C7\u00B2r",
    "Non-parametric test for comparing three or more related groups"
  );
}
