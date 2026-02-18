import { createCalculatorOg, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Kruskal-Wallis H Calculator - StatMate";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return createCalculatorOg(
    "Kruskal-Wallis H Calculator",
    "H",
    "Non-parametric test for comparing three or more independent groups"
  );
}
