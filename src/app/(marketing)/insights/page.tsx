import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { formatDateShort } from "@/lib/utils";

export const dynamic = 'force-dynamic';



export const metadata: Metadata = buildMetadata({
  title: "Technical Insights",
  description:
    "Technical articles and procurement guides from VERTACORE — industrial safety, welding, lifting, certifications and MRO procurement best practices.",
  path: "/insights",
  keywords: ["industrial insights", "MRO procurement guide", "safety equipment articles"],
});

export default async function InsightsPage() {
  const insights = await db.insight.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      author: true,
      tags: true,
      readTime: true,
      publishedAt: true,
      featured: true,
    },
  });

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights" },
  ];

  const featured = insights.filter((i) => i.featured);
  const rest = insights.filter((i) => !i.featured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      <header className="bg-navy-dark pt-32 pb-8">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Technical Insights</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Industrial knowledge
            <br />
            <span className="text-gold">from your procurement partner.</span>
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            Technical articles on industrial safety, welding, lifting, and procurement
            for Oil &amp; Gas, Marine, Construction and Manufacturing professionals.
          </p>
        </div>
      </header>

      <section className="pt-4 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base">
          {insights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {insights.map((insight, i) => (
                <ScrollReveal key={insight.id} delay={i * 0.06}>
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="card-base flex flex-col overflow-hidden group h-full"
                  >
                    <div className="relative aspect-video bg-navy-light/30 overflow-hidden">
                      {insight.coverImage ? (
                        <Image
                          src={insight.coverImage}
                          alt={insight.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="h-10 w-10 text-steel/30" />
                        </div>
                      )}
                      {insight.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-semibold uppercase tracking-wide bg-gold text-navy px-2 py-0.5 rounded">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {insight.tags.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {insight.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold uppercase tracking-wide text-gold/70 bg-gold/8 border border-gold/15 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 className="text-[16px] font-bold text-surface mb-2 group-hover:text-gold transition-colors leading-snug flex-1">
                        {insight.title}
                      </h2>

                      <p className="text-sm text-steel-muted line-clamp-2 leading-relaxed mt-1">
                        {insight.excerpt}
                      </p>

                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-steel/20 text-xs text-steel-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {insight.readTime} min read
                        </span>
                        {insight.publishedAt && (
                          <span>{formatDateShort(insight.publishedAt)}</span>
                        )}
                        <span className="ml-auto flex items-center gap-1 text-gold">
                          Read
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-surface/40 text-body">
                Technical insights are being published. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
