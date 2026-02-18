import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

const BASE_URL = "https://statmate-red.vercel.app";

const locales = ["en", "ko"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = [
    "t-test",
    "anova",
    "chi-square",
    "correlation",
    "descriptive",
    "sample-size",
    "one-sample-t",
    "mann-whitney",
    "wilcoxon",
    "regression",
    "multiple-regression",
    "cronbach-alpha",
    "logistic-regression",
    "factor-analysis",
    "kruskal-wallis",
    "repeated-measures",
    "two-way-anova",
    "friedman",
    "fisher-exact",
    "mcnemar",
  ];

  const pages = [
    { path: "", changeFrequency: "monthly" as const, priority: 1 },
    ...calculators.map((calc) => ({
      path: `/calculators/${calc}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    { path: "/wizard", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/pricing", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  // Add blog post pages (use ko slugs as canonical set)
  const blogSlugs = getAllSlugs("ko");
  for (const slug of blogSlugs) {
    pages.push({
      path: `/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    });
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const prefix = locale === "en" ? "" : `/${locale}`;
      entries.push({
        url: `${BASE_URL}${prefix}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${BASE_URL}${page.path}`,
            ko: `${BASE_URL}/ko${page.path}`,
          },
        },
      });
    }
  }

  return entries;
}
