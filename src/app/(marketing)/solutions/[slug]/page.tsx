import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageHeader } from "@/components/shared/PageHeader";
import { CatalogueItemCard } from "@/components/catalogue/CatalogueItemCard";
import { CTASection } from "@/components/marketing/CTASection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const dynamic = 'force-dynamic';




export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = await db.solution.findUnique({ where: { slug } });
  if (!solution) return {};

  return buildMetadata({
    title: `${solution.title} — Industrial Supply`,
    description: solution.subtitle,
    path: `/solutions/${slug}`,
    image: solution.coverImage ?? undefined,
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const solution = await db.solution.findUnique({
    where: { slug, published: true },
    include: { industries: true },
  });

  if (!solution) notFound();

  // Get catalogue items for this solution's category
  const categoryGroupMap: Record<string, string> = {
    "safety-systems": "Safety & PPE",
    "welding-systems": "Welding",
    "lifting-rigging": "Lifting & Rigging",
    abrasives: "Abrasives",
    "industrial-tools": "Industrial Tools",
  };

  const catalogueItems = await db.catalogueItem.findMany({
    where: {
      published: true,
      categoryGroup: categoryGroupMap[slug] ?? undefined,
    },
    take: 6,
    orderBy: { order: "asc" },
    select: {
      id: true,
      name: true,
      description: true,
      categoryGroup: true,
      image: true,
      certTags: true,
      brandName: true,
      datasheetUrl: true,
    },
  });

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: solution.title, href: `/solutions/${slug}` },
  ];

  const faqs = [
    {
      question: `What ${solution.title.toLowerCase()} does VERTACORE supply?`,
      answer: solution.description,
    },
    {
      question: `Which industries does VERTACORE supply ${solution.title.toLowerCase()} to?`,
      answer: solution.industries.length > 0
        ? `VERTACORE supplies ${solution.title.toLowerCase()} to ${solution.industries.map((i) => i.name).join(", ")} and other industrial sectors.`
        : `VERTACORE supplies ${solution.title.toLowerCase()} to Oil & Gas, Marine, Construction, Manufacturing and other major industrial sectors.`,
    },
    {
      question: `How do I source ${solution.title.toLowerCase()} from VERTACORE?`,
      answer:
        "Contact our technical team with your specific requirements. Provide names, quantities, and standards, and we will fulfill your order based on our global brand network.",
    },
  ];

  const jsonLd = [
    serviceSchema({
      name: solution.title,
      description: solution.subtitle,
      slug: solution.slug,
      features: solution.features,
    }),
    breadcrumbSchema(breadcrumb),
    faqSchema(faqs),
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

      <PageHeader
        label="Industrial Solutions"
        title={solution.title}
        subtitle={solution.subtitle}
        coverImage={solution.coverImage ?? undefined}
        breadcrumb={breadcrumb}
        ctaLabel="View Catalogue"
        ctaHref="/catalogue"
      />

      {/* Overview */}
      <section className="pt-4 pb-10 bg-graphite-subtle">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Description */}
            <ScrollReveal>
              <SectionLabel className="mb-4">Overview</SectionLabel>
              <div className="prose prose-invert prose-sm max-w-none text-surface/70 leading-relaxed">
                <p className="text-body leading-relaxed text-surface/70">
                  {solution.description}
                </p>
              </div>

              {/* Industries */}
              {solution.industries.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-steel-muted mb-3">
                    Industries Served
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {solution.industries.map((industry) => (
                      <Link
                        key={industry.id}
                        href={`/industries/${industry.slug}`}
                        className="text-sm font-medium text-surface/70 border border-steel/40 hover:border-gold/40 hover:text-gold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {industry.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </ScrollReveal>

            {/* Features */}
            {solution.features.length > 0 && (
              <ScrollReveal delay={0.1}>
                <p className="text-xs font-semibold uppercase tracking-widest text-steel-muted mb-4">
                  Capabilities
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {solution.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 p-3 rounded-lg bg-navy-light/20 border border-steel/20"
                    >
                      <CheckCircle className="h-4 w-4 text-gold flex-shrink-0" />
                      <span className="text-sm text-surface/80 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Featured catalogue items */}
      {catalogueItems.length > 0 && (
        <section className="pt-8 pb-16 bg-navy">
          <div className="container-base">
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <SectionLabel className="mb-3">Featured Products</SectionLabel>
                  <h2 className="text-h1 font-bold text-surface">
                    Items from our catalogue
                  </h2>
                </div>
                <Link
                  href="/catalogue"
                  className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-muted transition-colors font-medium"
                >
                  Browse Full Catalogue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {catalogueItems.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.06}>
                  <CatalogueItemCard {...item} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ section */}
      <section className="pt-8 pb-16 bg-graphite-subtle">
        <div className="container-base max-w-3xl">
          <ScrollReveal>
            <SectionLabel className="mb-4">Frequently Asked</SectionLabel>
            <h2 className="text-h1 font-bold text-surface mb-8">
              Common questions
            </h2>
            <dl className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="card-base p-5 group cursor-pointer"
                >
                  <summary className="text-[15px] font-semibold text-surface list-none flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <span className="text-gold flex-shrink-0 text-lg leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-surface/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />

      {/* Back link */}
      <div className="bg-navy-dark py-6">
        <div className="container-base">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Solutions
          </Link>
        </div>
      </div>
    </>
  );
}
