import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Linear Regression Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Linear Regression Calculator",
    "ŷ",
    "Simple linear regression with R², F-test, and coefficient analysis"
  );
}
