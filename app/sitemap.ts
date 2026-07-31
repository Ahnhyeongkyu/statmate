import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

const BASE_URL = "https://statmate.org";

const locales = ["en", "ko", "ja"] as const;

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
    {
      path: "/tools/spss-to-apa",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/expert-review",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/university",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      path: "/compare",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/validation",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Add pSEO field-specific calculator pages (100 combinations)
  const pseoFields = ["psychology", "biology", "marketing", "education", "healthcare"];
  for (const calc of calculators) {
    for (const field of pseoFields) {
      pages.push({
        path: `/calculators/${calc}/for/${field}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
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
            ja: `${BASE_URL}/ja${page.path}`,
            "x-default": `${BASE_URL}${page.path}`,
          },
        },
      });
    }
  }

  // Blog posts are authored per locale, so they cannot ride the loop above: it
  // emits every path under all three prefixes. Previously the ko slugs were used
  // as the canonical set, which meant an English-only post never entered the
  // sitemap and a Korean-only post produced two 404 URLs. Emit each locale's own
  // files and restrict hreflang alternates to the locales that actually have one.
  const slugsByLocale = new Map(locales.map((l) => [l, new Set(getAllSlugs(l))]));
  for (const locale of locales) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    for (const slug of slugsByLocale.get(locale) ?? []) {
      const languages: Record<string, string> = {};
      for (const alt of locales) {
        if (!slugsByLocale.get(alt)?.has(slug)) continue;
        languages[alt] = `${BASE_URL}${alt === "en" ? "" : `/${alt}`}/blog/${slug}`;
      }
      if (languages.en) languages["x-default"] = languages.en;
      entries.push({
        url: `${BASE_URL}${prefix}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  // Embeddable widgets (English-market feature — EN canonical only)
  const widgetSlugs = ["t-test", "correlation", "chi-square", "descriptive", "sample-size"];
  entries.push({
    url: `${BASE_URL}/widgets`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  });
  for (const slug of widgetSlugs) {
    entries.push({
      url: `${BASE_URL}/widgets/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
