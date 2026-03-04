import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "APA Statistics Guides & How-To Articles | StatMate Blog",
    ko: "APA 통계 가이드 & 분석 방법 블로그 | StatMate",
    ja: "APA統計ガイド & 分析方法ブログ | StatMate",
  };
  const descriptions: Record<string, string> = {
    en: "Free statistics guides: APA reporting, t-test, ANOVA, chi-square, regression, and more. Step-by-step tutorials with examples for researchers and students.",
    ko: "무료 통계 가이드: APA 보고법, t-test, ANOVA, 카이제곱, 회귀분석 등. 연구자와 학생을 위한 단계별 튜토리얼.",
    ja: "無料統計ガイド：APA報告法、t検定、ANOVA、カイ二乗、回帰分析など。研究者と学生のためのステップバイステップチュートリアル。",
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: locale === "en" ? "/blog" : `/${locale}/blog`,
      languages: {
        en: "/blog",
        ko: "/ko/blog",
        ja: "/ja/blog",
        "x-default": "/blog",
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("blog");
  const posts = getAllPosts(locale);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {t("title")}
        </h1>
        <p className="mt-2 text-gray-500">{t("description")}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">{t("noPosts")}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    {post.category && (
                      <Badge variant="secondary">{post.category}</Badge>
                    )}
                    <span className="text-sm text-gray-400">{post.readingTime}</span>
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {post.description}
                  </p>
                  <p className="mt-4 text-xs text-gray-400">{post.date}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
