import Link from "next/link";

const allCalculators = [
  { name: "T-Test", href: "/calculators/t-test", description: "Compare means between two groups" },
  { name: "ANOVA", href: "/calculators/anova", description: "Compare means across 3+ groups" },
  { name: "Chi-Square", href: "/calculators/chi-square", description: "Test categorical associations" },
  { name: "Correlation", href: "/calculators/correlation", description: "Measure relationship strength" },
  { name: "Descriptive", href: "/calculators/descriptive", description: "Summarize your data" },
];

export function RelatedCalculators({ current }: { current: string }) {
  const others = allCalculators.filter((c) => c.href !== current);

  return (
    <section className="mt-16 rounded-lg border bg-gray-50 p-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        Try Other Calculators
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {others.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="rounded-lg border bg-white p-3 text-center transition-shadow hover:shadow-md"
          >
            <p className="font-medium text-gray-900">{calc.name}</p>
            <p className="mt-1 text-xs text-gray-500">{calc.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
