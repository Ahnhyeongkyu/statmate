import type { MetadataRoute } from "next";

const BASE_URL = "https://statmate-red.vercel.app";

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
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
