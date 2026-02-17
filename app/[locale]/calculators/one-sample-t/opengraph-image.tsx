import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "One-Sample T-Test Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "One-Sample T-Test Calculator",
    "t\u2081",
    "Compare sample mean against a known value with APA results"
  );
}
