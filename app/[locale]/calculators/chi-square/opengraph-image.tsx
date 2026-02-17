import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Chi-Square Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Chi-Square Calculator",
    "\u03C7\u00B2",
    "Test of independence and goodness-of-fit with Cramer's V and APA results"
  );
}
