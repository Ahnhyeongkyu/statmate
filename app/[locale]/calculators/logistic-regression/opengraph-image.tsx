import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Logistic Regression Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Logistic Regression",
    "OR",
    "Odds ratios, Wald test, classification table"
  );
}
