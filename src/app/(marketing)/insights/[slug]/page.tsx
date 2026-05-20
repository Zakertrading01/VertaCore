import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, User } from "lucide-react";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CTASection } from "@/components/marketing/CTASection";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';




export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = await db.insight.findUnique({ where: { slug } });
  if (!insight) return {};

  return buildMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${slug}`,
    image: insight.coverImage ?? undefined,
    type: "article",
    keywords: insight.tags,
    publishedAt: insight.publishedAt?.toISOString(),
    author: insight.author,
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const insight = await db.insight.findUnique({
    where: { slug, published: true },
  });

  if (!insight) notFound();

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights" },
    { name: insight.title, href: `/insights/${slug}` },
  ];

  const jsonLd = [
    articleSchema({
      title: insight.title,
      excerpt: insight.excerpt,
      slug: insight.slug,
      coverImage: insight.coverImage ?? undefined,
      author: insight.author,
      publishedAt: insight.publishedAt?.toISOString() ?? insight.createdAt.toISOString(),
      updatedAt: insight.updatedAt.toISOString(),
    }),
    breadcrumbSchema(breadcrumb),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header */}
      <header className="bg-navy-dark pt-32 pb-12">
        <div className="container-base max-w-4xl">
          <Breadcrumb items={breadcrumb} className="mb-6" />

          {insight.tags.length > 0 && (
            <div className="flex gap-2 mb-5">
              {insight.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold uppercase tracking-wide text-gold/70 bg-gold/8 border border-gold/15 px-2.5 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-dlg font-bold text-surface leading-tight tracking-tight">
            {insight.title}
          </h1>

          <p className="mt-4 text-body text-surface/60 max-w-2xl leading-relaxed">
            {insight.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-steel-muted">
            <span className="flex items-center gap-2">
              <User className="h-3.5 w-3.5" />
              {insight.author}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              {insight.readTime} min read
            </span>
            {insight.publishedAt && (
              <span>{formatDate(insight.publishedAt)}</span>
            )}
          </div>
        </div>
      </header>

      {/* Cover image */}
      {insight.coverImage && (
        <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden">
          <Image
            src={insight.coverImage}
            alt={insight.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Article content */}
      <article className="section-padding bg-graphite-subtle">
        <div className="container-base max-w-3xl">
          <div
            className="prose prose-invert prose-sm md:prose-base max-w-none
              prose-headings:font-bold prose-headings:text-surface prose-headings:tracking-tight
              prose-p:text-surface/70 prose-p:leading-relaxed
              prose-a:text-gold prose-a:no-underline hover:prose-a:text-gold-muted
              prose-strong:text-surface prose-strong:font-semibold
              prose-code:text-gold prose-code:bg-navy-light/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-blockquote:border-gold prose-blockquote:text-surface/60
              prose-ul:text-surface/70 prose-ol:text-surface/70
              prose-li:marker:text-gold
              prose-table:border-steel/30
              prose-th:text-surface prose-th:font-semibold
              prose-td:text-surface/70"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(insight.content) }}
          />
        </div>
      </article>

      <CTASection />

      <div className="bg-navy-dark py-6">
        <div className="container-base">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Insights
          </Link>
        </div>
      </div>
    </>
  );
}

// Simple markdown → HTML converter for server-side rendering
function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|o|l])(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");
}
