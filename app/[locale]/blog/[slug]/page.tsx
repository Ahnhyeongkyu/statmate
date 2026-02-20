import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { getPost, getAllSlugs } from "@/lib/blog";
import { MdxContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter-signup";

export async function generateStaticParams() {
  const koSlugs = getAllSlugs("ko").map((slug) => ({ locale: "ko", slug }));
  const enSlugs = getAllSlugs("en").map((slug) => ({ locale: "en", slug }));
  return [...koSlugs, ...enSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "StatMate" },
    publisher: { "@type": "Organization", name: "StatMate" },
  };

  return (
    <div className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        {locale === "ko" ? "블로그 목록" : locale === "ja" ? "ブログ一覧" : "Back to Blog"}
      </Link>

      <header className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          {post.category && (
            <Badge variant="secondary">{post.category}</Badge>
          )}
          <span className="text-sm text-gray-400">{post.readingTime}</span>
          <span className="text-sm text-gray-400">{post.date}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {post.title}
        </h1>
        <p className="mt-2 text-lg text-gray-500">{post.description}</p>
      </header>

      <MdxContent source={post.content} />

      {/* Blog Post CTA */}
      <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white">
        <h3 className="text-xl font-bold">
          {locale === "ko"
            ? "지금 바로 계산해 보세요"
            : locale === "ja" ? "今すぐ計算してみましょう" : "Try It Now"}
        </h3>
        <p className="mt-2 text-sm text-blue-100">
          {locale === "ko"
            ? "StatMate의 무료 통계 계산기로 데이터를 분석하고 APA 형식 결과를 받아보세요."
            : locale === "ja" ? "StatMateの無料統計計算ツールでデータを分析し、APA形式の結果を取得しましょう。" : "Analyze your data with StatMate's free calculators and get APA-formatted results instantly."}
        </p>
        <Link
          href="/calculators/t-test"
          className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
        >
          {locale === "ko" ? "계산기 시작하기" : locale === "ja" ? "計算を始める" : "Start Calculating"}
        </Link>
      </div>

      {/* Newsletter */}
      <div className="mt-8">
        <NewsletterSignup />
      </div>
    </div>
  );
}
