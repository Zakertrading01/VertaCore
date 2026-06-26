import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTASection } from "@/components/marketing/CTASection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getIndustry } from "@/lib/cached-queries";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) return {};

  return buildMetadata({
    title: `${industry.name} Industrial Equipment Supply`,
    description: industry.description,
    path: `/industries/${slug}`,
    image: industry.coverImage ?? undefined,
    keywords: [`${industry.name} equipment supplier`, `industrial supply ${industry.name}`],
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const industry = await getIndustry(slug);

  if (!industry) notFound();

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries" },
    { name: industry.name, href: `/industries/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      <PageHeader
        label="Industrial Sectors"
        title={`${industry.name} Supply`}
        subtitle={industry.description}
        coverImage={industry.coverImage ?? undefined}
        breadcrumb={breadcrumb}
        ctaLabel="View Catalogue"
        ctaHref="/catalogue"
      />

      {/* Overview */}
      <section className="section-padding bg-graphite-subtle">
        <div className="container-base max-w-4xl">
          <ScrollReveal>
            <SectionLabel className="mb-4">Sector Overview</SectionLabel>
            <p className="text-body text-surface/70 leading-relaxed">
              VERTA CORE understands the operational requirements and compliance environment
              of the {industry.name} sector. We supply certified MRO equipment that meets
              the specific standards and regulatory requirements of your operations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Relevant solutions */}
      {industry.solutions.length > 0 && (
        <section className="section-padding bg-navy">
          <div className="container-base">
            <ScrollReveal>
              <SectionLabel className="mb-3">Supply Capabilities</SectionLabel>
              <h2 className="text-h1 font-bold text-surface mb-8">
                What VERTA CORE supplies for {industry.name}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {industry.solutions.map((solution, i) => (
                <ScrollReveal key={solution.id} delay={i * 0.08}>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="card-base flex flex-col p-5 group"
                  >
                    <h3 className="text-[16px] font-bold text-surface mb-2 group-hover:text-gold transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-steel-muted leading-relaxed flex-1">
                      {solution.subtitle}
                    </p>
                    <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-steel/20 text-sm font-medium text-gold">
                      View Solution
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {industry.projects.length > 0 && (
        <section className="section-padding bg-graphite-subtle">
          <div className="container-base">
            <ScrollReveal>
              <SectionLabel className="mb-3">Project References</SectionLabel>
              <h2 className="text-h1 font-bold text-surface mb-8">
                Delivered in {industry.name}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {industry.projects.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.1}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="card-base flex flex-col p-6 group"
                  >
                    <h3 className="text-[16px] font-bold text-surface mb-2 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-sm text-steel-muted leading-relaxed mb-4">
                        {project.subtitle}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-auto pt-4 border-t border-steel/20 text-sm font-medium text-gold">
                      View Project
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      <div className="bg-navy-dark py-6">
        <div className="container-base">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Industries
          </Link>
        </div>
      </div>
    </>
  );
}
