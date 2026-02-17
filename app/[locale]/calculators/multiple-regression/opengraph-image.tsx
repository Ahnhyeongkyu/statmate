import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Multiple Regression Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Multiple Regression",
    "\u0177",
    "R\u00B2, coefficients, VIF, ANOVA table"
  );
}
