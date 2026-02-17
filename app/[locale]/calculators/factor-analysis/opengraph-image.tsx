import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Factor Analysis Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Factor Analysis",
    "\u039B",
    "EFA \u00B7 KMO \u00B7 Loadings"
  );
}
