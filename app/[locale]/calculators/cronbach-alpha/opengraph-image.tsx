import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Cronbach's Alpha Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Cronbach's Alpha",
    "\u03B1",
    "Reliability analysis with item statistics"
  );
}
