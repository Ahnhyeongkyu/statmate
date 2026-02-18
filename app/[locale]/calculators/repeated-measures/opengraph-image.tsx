import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Repeated Measures ANOVA Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Repeated Measures ANOVA Calculator",
    "F",
    "Within-subjects ANOVA for comparing related group means"
  );
}
