import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Descriptive Statistics Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Descriptive Statistics Calculator",
    "\u03BC",
    "Mean, median, SD, skewness, kurtosis, quartiles with APA results"
  );
}
