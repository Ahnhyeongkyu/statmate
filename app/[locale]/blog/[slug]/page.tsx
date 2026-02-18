import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { getPost, getAllSlugs } from "@/lib/blog";
import { MdxContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

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
        {locale === "ko" ? "블로그 목록" : "Back to Blog"}
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
    </div>
  );
}
