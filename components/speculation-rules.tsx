export function SpeculationRules() {
  const rules = {
    prefetch: [
      {
        source: "document",
        where: {
          and: [
            { href_matches: "/*" },
            { not: { href_matches: "/api/*" } },
            { not: { href_matches: "/logout" } },
            { not: { selector_matches: "[rel~=external]" } },
          ],
        },
        eagerness: "moderate",
      },
      {
        source: "list",
        urls: ["/compare", "/pricing", "/en/compare", "/en/pricing", "/ko/compare", "/ko/pricing", "/ja/compare", "/ja/pricing"],
        eagerness: "eager",
      },
    ],
  };

  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rules) }}
    />
  );
}
