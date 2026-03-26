import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { DecisionTreeWizard } from "./wizard";
import { FaqSchema, type FaqItem } from "@/components/faq-schema";

const BASE_URL = "https://statmate.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "wizard" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === "en" ? "/wizard" : `/${locale}/wizard`,
      languages: {
        en: "/wizard",
        ko: "/ko/wizard",
        ja: "/ja/wizard",
        "x-default": "/wizard",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      url: locale === "en" ? `${BASE_URL}/wizard` : `${BASE_URL}/${locale}/wizard`,
    },
  };
}

function getBreadcrumbSchema(locale: string) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return {
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
        name: locale === "ko" ? "통계 검정 선택 가이드" : locale === "ja" ? "統計検定選択ガイド" : "Statistical Test Selection Guide",
      },
    ],
  };
}

function getWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Which Statistical Test Should I Use? - StatMate",
    description:
      "Free interactive decision tree to help you choose the right statistical test. Answer 4 simple questions to get a recommendation from 20 tests including t-test, ANOVA, chi-square, correlation, and regression.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Interactive statistical test decision tree",
      "20 statistical tests covered",
      "Step-by-step guided selection",
      "Direct link to free calculator",
      "Supports parametric and non-parametric tests",
    ],
  };
}

function getFaqs(locale: string): FaqItem[] {
  if (locale === "ko") {
    return [
      {
        question: "어떤 통계 검정을 사용해야 하는지 어떻게 알 수 있나요?",
        answer: "통계 검정 선택은 연구 목적(차이 비교, 관계 분석, 기술통계), 집단 수, 데이터 유형(연속형/범주형), 정규성 여부에 따라 달라집니다. StatMate의 검정 선택 가이드에서 4가지 질문에 답하면 20개 검정 중 적합한 것을 추천합니다.",
      },
      {
        question: "두 집단을 비교할 때 어떤 검정을 사용하나요?",
        answer: "두 독립 집단의 평균 비교에는 독립표본 t-검정(정규분포)이나 Mann-Whitney U 검정(비정규)을 사용합니다. 같은 참가자를 두 번 측정한 경우에는 대응표본 t-검정이나 Wilcoxon 부호순위 검정을 사용합니다.",
      },
      {
        question: "t-검정과 ANOVA의 차이는 무엇인가요?",
        answer: "t-검정은 2개 집단의 평균을 비교하고, ANOVA(분산분석)는 3개 이상 집단의 평균을 비교합니다. 집단이 2개면 t-검정, 3개 이상이면 ANOVA를 사용하세요. ANOVA에서 유의한 결과가 나오면 사후검정으로 어떤 집단이 다른지 확인합니다.",
      },
      {
        question: "범주형 데이터에는 어떤 검정을 사용하나요?",
        answer: "범주형 데이터(빈도/개수)의 관련성 검정에는 카이제곱 검정을 사용합니다. 기대 빈도가 5 미만인 셀이 있으면 Fisher 정확 검정을, 대응 이진 데이터(전후 비교)에는 McNemar 검정을 사용합니다.",
      },
      {
        question: "모수 검정과 비모수 검정은 어떻게 선택하나요?",
        answer: "데이터가 정규분포를 따르고 표본이 충분히 크면(N > 30) 모수 검정(t-검정, ANOVA)을 사용합니다. 데이터가 비대칭이거나, 서열 척도이거나, 표본이 작으면 비모수 검정(Mann-Whitney, Kruskal-Wallis, Friedman 등)을 사용합니다.",
      },
      {
        question: "상관분석과 회귀분석의 차이는 무엇인가요?",
        answer: "상관분석은 두 변수 간 관계의 강도와 방향을 측정하고, 회귀분석은 한 변수로 다른 변수를 예측하는 모형을 만듭니다. 관계의 존재 여부만 알고 싶으면 상관분석을, 예측이 목적이면 회귀분석을 사용하세요.",
      },
    ];
  }
  if (locale === "ja") {
    return [
      {
        question: "どの統計検定を使うべきか、どうやって判断しますか？",
        answer: "統計検定の選択は、研究目的（群の比較、関係の分析、記述統計）、群の数、データの種類（連続変数/カテゴリ変数）、正規性の有無によって異なります。StatMateの検定選択ガイドで4つの質問に答えると、20種類の検定から適切なものを推薦します。",
      },
      {
        question: "2群を比較するときはどの検定を使いますか？",
        answer: "2つの独立群の平均比較には、対応のないt検定（正規分布の場合）またはマン・ホイットニーU検定（非正規の場合）を使用します。同じ参加者を2回測定した場合は、対応のあるt検定またはウィルコクソンの符号順位検定を使用します。",
      },
      {
        question: "t検定と分散分析（ANOVA）の違いは何ですか？",
        answer: "t検定は2群の平均を比較し、ANOVA（分散分析）は3群以上の平均を比較します。群が2つならt検定、3つ以上ならANOVAを使用してください。ANOVAで有意な結果が出たら、多重比較でどの群が異なるかを確認します。",
      },
      {
        question: "カテゴリデータにはどの検定を使いますか？",
        answer: "カテゴリデータ（度数/頻度）の関連性の検定にはカイ二乗検定を使用します。期待度数が5未満のセルがある場合はフィッシャーの正確検定を、対応のある二値データ（前後比較）にはマクネマー検定を使用します。",
      },
      {
        question: "パラメトリック検定とノンパラメトリック検定はどう選びますか？",
        answer: "データが正規分布に従い、標本が十分に大きい場合（N > 30）はパラメトリック検定（t検定、ANOVA）を使用します。データに歪みがある、順序尺度、または標本が小さい場合はノンパラメトリック検定（マン・ホイットニー、クラスカル・ウォリス、フリードマンなど）を使用します。",
      },
      {
        question: "相関分析と回帰分析の違いは何ですか？",
        answer: "相関分析は2つの変数間の関係の強さと方向を測定し、回帰分析は一方の変数から他方を予測するモデルを作成します。関係の有無だけを知りたい場合は相関分析を、予測が目的の場合は回帰分析を使用してください。",
      },
    ];
  }
  return [
    {
      question: "How do I know which statistical test to use?",
      answer: "Choosing the right statistical test depends on your research goal (comparing groups, examining relationships, or describing data), the number of groups, data type (continuous or categorical), and whether your data is normally distributed. StatMate's decision tree asks 4 simple questions to recommend the best test from 20 options.",
    },
    {
      question: "What statistical test should I use for two groups?",
      answer: "For comparing means of two independent groups, use an independent-samples t-test (if data is normal) or Mann-Whitney U test (if non-normal). For the same participants measured twice (e.g., pre/post), use a paired-samples t-test or Wilcoxon signed-rank test.",
    },
    {
      question: "What is the difference between a t-test and ANOVA?",
      answer: "A t-test compares means of 2 groups, while ANOVA (Analysis of Variance) compares means of 3 or more groups. Use a t-test for 2 groups and ANOVA for 3+. If ANOVA is significant, follow up with post-hoc tests to identify which groups differ.",
    },
    {
      question: "Which test should I use for categorical data?",
      answer: "For testing associations between categorical variables (counts/frequencies), use the chi-square test. If any expected cell count is below 5, use Fisher's exact test instead. For paired binary data (before/after), use the McNemar test.",
    },
    {
      question: "How do I choose between parametric and non-parametric tests?",
      answer: "Use parametric tests (t-test, ANOVA) when your data is approximately normally distributed and your sample is large enough (N > 30). Use non-parametric alternatives (Mann-Whitney, Kruskal-Wallis, Friedman) when data is skewed, ordinal, or your sample is small.",
    },
    {
      question: "What is the difference between correlation and regression?",
      answer: "Correlation measures the strength and direction of the relationship between two variables, while regression creates a predictive model from one variable to another. Use correlation to check if a relationship exists; use regression when you want to predict outcomes.",
    },
  ];
}

export default async function WizardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("wizard");
  const faqs = getFaqs(locale);

  return (
    <div className="mx-auto max-w-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebAppSchema()) }}
      />
      <FaqSchema faqs={faqs} />

      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-1.5 text-sm text-gray-500">
          <li>
            <a href={locale === "en" ? "/" : `/${locale}`} className="hover:text-gray-700">
              StatMate
            </a>
          </li>
          <li className="text-gray-300">/</li>
          <li className="font-medium text-gray-900">{t("breadcrumb")}</li>
        </ol>
      </nav>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {t("h1")}
        </h1>
        <p className="mt-2 text-gray-500">
          {t("subtitle")}
        </p>
      </div>
      <DecisionTreeWizard />

      {/* FAQ section for SEO */}
      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("faqHeading")}
        </h2>
        {faqs.map((faq, i) => (
          <details key={i} className="group rounded-lg border border-gray-200 p-4">
            <summary className="cursor-pointer font-medium text-gray-900 group-open:mb-2">
              {faq.question}
            </summary>
            <p className="text-sm leading-relaxed text-gray-600">
              {faq.answer}
            </p>
          </details>
        ))}
      </section>

      {/* SEO content section */}
      <section className="mt-12 space-y-6 text-gray-600">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("seoHeading")}
        </h2>
        <p className="leading-relaxed">{t("seoP1")}</p>
        <h3 className="text-xl font-semibold text-gray-900">{t("seoH3tests")}</h3>
        <p className="leading-relaxed">{t("seoP2")}</p>
        <h3 className="text-xl font-semibold text-gray-900">{t("seoH3how")}</h3>
        <p className="leading-relaxed">{t("seoP3")}</p>
      </section>
    </div>
  );
}
