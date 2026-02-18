import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Two-Way ANOVA Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Two-Way ANOVA Calculator",
    "F",
    "Factorial ANOVA for analyzing main effects and interactions"
  );
}
