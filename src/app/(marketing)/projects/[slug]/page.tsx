import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CTASection } from "@/components/marketing/CTASection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { ProjectMetric } from "@/types/db";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';




export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.project.findUnique({ where: { slug } });
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.subtitle ?? project.scope,
    path: `/projects/${slug}`,
    image: project.coverImage ?? undefined,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await db.project.findUnique({
    where: { slug, published: true },
    include: { industry: true, solutions: true },
  });

  if (!project) notFound();

  const metrics = project.metrics as ProjectMetric[] | null;

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: project.title, href: `/projects/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      {/* Header */}
      <header className="relative bg-navy-dark pt-32 pb-16 overflow-hidden">
        {project.coverImage && (
          <>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/70 to-navy-dark" />
          </>
        )}
        <div className="relative container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          {project.industry && (
            <Link
              href={`/industries/${project.industry.slug}`}
              className="inline-block mb-4 text-[11px] font-semibold uppercase tracking-widest text-gold border border-gold/25 bg-gold/8 px-3 py-1 rounded"
            >
              {project.industry.name}
            </Link>
          )}
          <h1 className="text-dlg font-bold text-surface max-w-3xl tracking-tight">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mt-3 text-body text-surface/60 max-w-2xl">{project.subtitle}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-steel-muted">
            {project.client && <span>Client: {project.client}</span>}
            {project.completedAt && (
              <span>Completed: {formatDate(project.completedAt)}</span>
            )}
          </div>
        </div>
      </header>

      {/* Metrics */}
      {metrics && metrics.length > 0 && (
        <div className="bg-gold">
          <div className="container-base py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-dmd font-bold text-navy">{metric.value}</div>
                  <div className="text-xs text-navy/70 font-semibold uppercase tracking-wide mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scope & Outcome */}
      <section className="section-padding bg-graphite-subtle">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <ScrollReveal>
              <SectionLabel className="mb-4">Project Scope</SectionLabel>
              <p className="text-body text-surface/70 leading-relaxed">{project.scope}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionLabel className="mb-4">Outcome</SectionLabel>
              <p className="text-body text-surface/70 leading-relaxed">{project.outcome}</p>
            </ScrollReveal>
          </div>

          {/* Solutions used */}
          {project.solutions.length > 0 && (
            <div className="mt-12 pt-12 border-t border-steel/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-steel-muted mb-5">
                Solutions Supplied
              </p>
              <div className="flex flex-wrap gap-3">
                {project.solutions.map((solution) => (
                  <Link
                    key={solution.id}
                    href={`/solutions/${solution.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-surface/70 border border-steel/40 hover:border-gold/40 hover:text-gold px-4 py-2 rounded-lg transition-colors"
                  >
                    {solution.title}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />

      <div className="bg-navy-dark py-6">
        <div className="container-base">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Projects
          </Link>
        </div>
      </div>
    </>
  );
}
