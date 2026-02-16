import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = [
    "t-test",
    "anova",
    "chi-square",
    "correlation",
    "descriptive",
  ];

  const calculatorEntries: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${BASE_URL}/calculators/${calc}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...calculatorEntries,
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
