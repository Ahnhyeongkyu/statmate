import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogInlineOffer } from "@/components/blog-inline-offer";

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-900" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-gray-600" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-600" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-600" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="mb-4 border-l-4 border-blue-200 bg-blue-50/50 py-2 pl-4 text-gray-700" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border-b-2 border-gray-900 py-2 text-left font-semibold" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b py-2" {...props} />
  ),
};

/**
 * Split the body at a top-level "## " heading near the middle so an offer can be
 * placed mid-article. Fenced code blocks are tracked because a "## " inside a
 * fence is a comment, not a heading — splitting there would leave an unclosed
 * fence and break the MDX parse.
 */
function splitAtMiddleHeading(source: string): [string, string] {
  const lines = source.split("\n");
  const offsets: number[] = [];
  let fenced = false;

  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) fenced = !fenced;
    else if (!fenced && /^## /.test(lines[i])) offsets.push(i);
  }

  // Needs at least one heading before and after the break to be worth splitting.
  if (offsets.length < 3) return [source, ""];

  const cut = offsets[Math.floor(offsets.length / 2)];
  return [lines.slice(0, cut).join("\n"), lines.slice(cut).join("\n")];
}

export function MdxContent({
  source,
  calculator,
}: {
  source: string;
  calculator?: string;
}) {
  const [head, tail] = calculator
    ? splitAtMiddleHeading(source)
    : [source, ""];

  return (
    <article className="prose-statmate">
      <MDXRemote source={head} components={components} />
      {calculator && tail && (
        <>
          <BlogInlineOffer calculator={calculator} />
          <MDXRemote source={tail} components={components} />
        </>
      )}
    </article>
  );
}
