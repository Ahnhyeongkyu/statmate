import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Correlation Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Correlation Calculator",
    "r",
    "Pearson r and Spearman rho with scatter plot and APA-formatted results"
  );
}
