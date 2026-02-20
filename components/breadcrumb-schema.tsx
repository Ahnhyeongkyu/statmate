const BASE_URL = "https://statmate-red.vercel.app";

interface BreadcrumbSchemaProps {
  locale: string;
  calculatorSlug: string;
  calculatorName: string;
}

export function BreadcrumbSchema({
  locale,
  calculatorSlug,
  calculatorName,
}: BreadcrumbSchemaProps) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "StatMate",
        item: `${BASE_URL}${prefix}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: `${BASE_URL}${prefix}/calculators/${calculatorSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: calculatorName,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
