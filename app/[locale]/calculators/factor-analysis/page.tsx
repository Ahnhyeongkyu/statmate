import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { FactorAnalysisCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { SeoContentKo } from "./seo-ko";
import { FaqSchema, type FaqItem } from "@/components/faq-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "factorAnalysis" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/factor-analysis" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Factor Analysis Calculator - StatMate",
  description:
    "Free online Factor Analysis calculator. KMO test, Bartlett's test, PCA/PAF extraction, Varimax/Promax rotation, eigenvalues, factor loadings, communalities, variance explained, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "KMO test",
    "Bartlett's test of sphericity",
    "PCA extraction",
    "PAF extraction",
    "Varimax rotation",
    "Promax rotation",
    "Eigenvalues",
    "Factor loadings",
    "Communalities",
    "Variance explained",
    "APA 7th edition formatted results",
  ],
};

export default async function FactorAnalysisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("factorAnalysis");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "탐색적 요인분석이란?", answer: "탐색적 요인분석(EFA)은 다수의 관측 변수들 간의 상관 패턴을 분석하여 소수의 잠재 요인(factor)을 발견하는 다변량 통계 기법입니다. 설문지 개발, 구성타당도 검증, 데이터 축소에 널리 사용됩니다. StatMate에서 KMO 검정, 요인 적재량, 공통성 등을 간편하게 계산할 수 있습니다." },
        { question: "요인 수는 어떻게 결정하나요?", answer: "주로 카이저 기준(고유값 > 1), 스크리 도표의 꺾이는 점(elbow), 그리고 병렬 분석(parallel analysis)을 함께 사용하여 결정합니다. 카이저 기준만 사용하면 요인을 과다 추출할 수 있으므로, 여러 기준을 종합적으로 판단하는 것이 권장됩니다." },
        { question: "KMO 검정이란?", answer: "KMO(Kaiser-Meyer-Olkin) 검정은 요인분석에 대한 자료의 적합성을 평가하는 지표로, 0에서 1 사이의 값을 가집니다. .60 이상이면 수용 가능하고, .80 이상이면 우수합니다. KMO가 .50 미만이면 요인분석을 실시하기에 부적합한 자료입니다." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "APA 7판에서는 추출 방법, 회전 방법, KMO 값, Bartlett 검정 결과, 추출된 요인 수, 설명된 분산 비율, 요인 적재량을 보고합니다. StatMate는 APA 형식의 요인분석 결과를 자동으로 생성하여 논문 작성 시 바로 활용할 수 있습니다." },
      ]
    : [
        { question: "What is exploratory factor analysis?", answer: "Exploratory Factor Analysis (EFA) is a multivariate statistical technique that examines correlation patterns among observed variables to discover a smaller set of latent factors explaining shared variance. It is widely used for survey development, construct validation, and data reduction. StatMate provides KMO tests, factor loadings, communalities, and variance explained in one click." },
        { question: "How do I determine the number of factors?", answer: "Use multiple criteria together: the Kaiser criterion (eigenvalues > 1), the scree plot elbow point, and parallel analysis (comparing actual eigenvalues to random data). Relying on the Kaiser criterion alone tends to over-extract factors, especially with many variables." },
        { question: "What is the KMO test?", answer: "The Kaiser-Meyer-Olkin (KMO) test measures sampling adequacy for factor analysis, ranging from 0 to 1. Values >= .60 are acceptable and >= .80 are meritorious. A KMO below .50 indicates that the correlation patterns are inadequate for factor extraction and the analysis should not proceed." },
        { question: "How do I report factor analysis results in APA format?", answer: "APA 7th edition requires reporting the extraction method, rotation method, KMO value, Bartlett's test result, number of factors retained, total variance explained, and factor loadings. StatMate automatically generates APA-formatted factor analysis results that you can copy directly into your research manuscript." },
      ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqSchema faqs={faqs} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-2 text-gray-500">{t("description")}</p>
      </div>

      <FactorAnalysisCalculator />

      <AdUnit slot="factor-analysis-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is Factor Analysis?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Factor Analysis is a multivariate statistical technique that examines
          correlation patterns among observed variables to identify a smaller
          number of latent variables&mdash;called <strong>factors</strong>&mdash;that
          explain the shared variance in the data. It is widely used in
          psychology, education, marketing, and the social sciences for survey
          development, construct validation, and data reduction.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The technique originated in 1904 when <strong>Charles Spearman</strong>{" "}
          proposed a general intelligence factor (<em>g</em>) to explain positive
          correlations among mental tests. In the 1930s,{" "}
          <strong>Louis L. Thurstone</strong> advanced multiple factor analysis by
          introducing simple structure and rotation methods, laying the foundation
          for modern factor analysis. This calculator performs{" "}
          <strong>Exploratory Factor Analysis (EFA)</strong>, which discovers
          latent structure without prior hypotheses, as opposed to Confirmatory
          Factor Analysis (CFA), which tests a pre-specified factor model.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Suitability Tests: KMO and Bartlett&apos;s Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Before extracting factors, verify that your data is suitable. The{" "}
          <strong>Kaiser-Meyer-Olkin (KMO)</strong> measure of sampling adequacy
          ranges from 0 to 1, with values &ge; .60 considered acceptable and
          &ge; .80 meritorious. <strong>Bartlett&apos;s test of sphericity</strong>{" "}
          tests whether the correlation matrix differs significantly from an
          identity matrix using a chi-square test. A significant result
          (<em>p</em> &lt; .05) confirms that meaningful correlations exist among
          variables.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Extraction: PCA vs PAF
        </h3>
        <p className="text-gray-600 leading-relaxed">
          <strong>Principal Component Analysis (PCA)</strong> extracts components
          that explain <em>total</em> variance and is best for data reduction.{" "}
          <strong>Principal Axis Factoring (PAF)</strong> extracts factors
          explaining only <em>shared</em> variance and is preferred when seeking
          underlying latent constructs. PCA places 1.0 on the diagonal of the
          correlation matrix; PAF uses communality estimates instead.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Determining the Number of Factors
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The <strong>Kaiser criterion</strong> retains factors with eigenvalues
          &gt; 1. The <strong>scree plot</strong> identifies the &quot;elbow&quot;
          where eigenvalues level off. <strong>Parallel analysis</strong> compares
          actual eigenvalues to those from random data and is considered the most
          accurate method. Using multiple criteria together is recommended.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Rotation: Varimax vs Promax
        </h3>
        <p className="text-gray-600 leading-relaxed">
          <strong>Varimax</strong> (orthogonal) assumes uncorrelated factors and
          produces a single loading matrix&mdash;simple to interpret.{" "}
          <strong>Promax</strong> (oblique) allows factors to correlate and
          produces both a pattern matrix (unique contributions) and a structure
          matrix (total correlations). Use Varimax when factors are theoretically
          independent; use Promax when factor correlations are expected (common in
          social science). A factor inter-correlation &ge; .32 suggests oblique
          rotation is appropriate.
        </p>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: 8-Item Personality Survey
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A researcher administers 8 Likert-scale personality items to 30
            students, designed to measure Extraversion (Q1&ndash;Q3),
            Conscientiousness (Q4&ndash;Q6), and Openness (Q7&ndash;Q8).
            KMO = .69, Bartlett&apos;s <em>&chi;&sup2;</em>(28) = 112.45,{" "}
            <em>p</em> &lt; .001. Three factors are extracted (eigenvalues 2.85,
            2.12, 1.38), explaining 79.38% of total variance. All items load
            cleanly (&ge; .75) on their intended factor with no cross-loadings.
            Communalities range from .62 to .74, indicating adequate explanation
            by the extracted factors.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          Interpreting Factor Analysis Results
        </h3>
        <p className="text-gray-600 leading-relaxed">
          <strong>Factor loadings</strong> represent the correlation between each
          variable and a factor; values &ge; .40 are meaningful and &ge; .70 are
          strong. <strong>Cross-loadings</strong> occur when a variable loads
          &ge; .32 on multiple factors, complicating interpretation&mdash;consider
          removing such items. <strong>Communalities</strong> indicate the
          proportion of each variable&apos;s variance explained by the retained
          factors; values below .20 suggest the variable does not fit the factor
          structure.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Reporting in APA Format
        </h3>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm italic text-gray-600">
            An exploratory factor analysis was conducted on 8 personality items
            using principal component analysis with Varimax rotation. The KMO
            measure verified sampling adequacy, KMO = .69, and Bartlett&apos;s
            test of sphericity was significant, <em>&chi;&sup2;</em>(28) =
            112.45, <em>p</em> &lt; .001. Three factors were retained based on
            the Kaiser criterion (eigenvalue &gt; 1), explaining 79.38% of the
            total variance. All items loaded strongly (&ge; .75) on their
            intended factors with no cross-loadings observed.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Insufficient sample size:</strong> A minimum of 5&ndash;10
            observations per variable (<em>N</em>/<em>p</em> &ge; 5) or at least
            100 total cases is recommended. Small samples produce unstable
            loadings.
          </li>
          <li>
            <strong>Using EFA when CFA is appropriate:</strong> If you have a
            theoretically established factor structure to confirm, use CFA
            (structural equation modeling), not EFA.
          </li>
          <li>
            <strong>Over-extracting factors:</strong> Relying solely on the
            Kaiser criterion can over-extract factors when many variables are
            present. Supplement with scree plot and parallel analysis.
          </li>
          <li>
            <strong>Ignoring cross-loadings:</strong> Variables loading &ge; .32
            on multiple factors compromise the clarity of the solution. Consider
            item removal or rewording.
          </li>
          <li>
            <strong>Skipping KMO before analysis:</strong> A KMO below .50 means
            the correlation patterns are inadequate for factor extraction.
            Always check KMO and Bartlett&apos;s test first.
          </li>
        </ul>

        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s factor analysis calculations have been validated
            against R&apos;s{" "}
            <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">psych::fa()</code>{" "}
            and{" "}
            <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">psych::principal()</code>{" "}
            functions, as well as SPSS Factor Analysis output. KMO values,
            Bartlett&apos;s chi-square, eigenvalues, factor loadings,
            communalities, and variance explained all match R and SPSS output
            to at least 4 decimal places. Varimax rotation uses Kaiser
            normalization; Promax uses kappa = 4 by default.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/factor-analysis" />
    </div>
  );
}
