import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "McNemar Test Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "McNemar Test Calculator",
    "\u03C7\u00B2",
    "Test for paired binary data comparing before and after conditions"
  );
}
