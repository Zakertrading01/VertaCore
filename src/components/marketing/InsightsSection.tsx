import Link from "next/link";
import { TapLink } from "@/components/shared/TapLink";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { formatDateShort } from "@/lib/utils";

interface InsightSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  author: string;
  tags: string[];
  readTime: number;
  publishedAt: Date | null;
}

interface InsightsSectionProps {
  insights: InsightSummary[];
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  if (insights.length === 0) return null;

  return (
    <section
      className="pt-6 pb-12 md:pt-10 md:pb-20 lg:pt-12 lg:pb-24 bg-navy-dark"
      aria-labelledby="insights-heading"
    >
      <div className="container-base">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal className="max-w-xl">
            <SectionLabel className="mb-3">Technical Insights</SectionLabel>
            <h2
              id="insights-heading"
              className="text-dmd font-bold text-surface tracking-tight"
            >
              Industrial knowledge
              <br />
              <span className="text-gold">from your procurement partner.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-muted transition-colors font-medium"
            >
              View All Insights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Insights grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {insights.map((insight, i) => (
            <ScrollReveal key={insight.id} delay={i * 0.1}>
              <TapLink
                href={`/insights/${insight.slug}`}
                tabIndex={0}
                className="card-base flex flex-col overflow-hidden group h-full outline-none"
              >
                {/* Cover image */}
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
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Tags */}
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

                  <h3 className="text-[16px] font-bold text-surface mb-2 group-hover:text-gold transition-colors leading-snug flex-1">
                    {insight.title}
                  </h3>

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
                  </div>
                </div>
              </TapLink>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
