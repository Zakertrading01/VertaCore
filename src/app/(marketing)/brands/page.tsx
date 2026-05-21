import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Globe } from "lucide-react";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: "Brands & Partners",
  description:
    "VERTACORE sources from internationally recognised industrial brands across safety, welding, lifting, and abrasives. Our vendor network signals the quality of our supply relationships.",
  path: "/brands",
  keywords: ["industrial brands", "safety equipment brands", "welding brands", "vertacore partners"],
});

export default async function BrandsPage() {
  const brands = await db.brand.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      {/* Header */}
      <header className="bg-navy-dark pt-32 pb-16">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Our Brand Network</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Sourced from
            <br />
            <span className="text-gold">recognised global brands.</span>
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            VERTACORE sources from manufacturers recognised for quality, compliance
            and reliability. Our brand network is a direct signal of our sourcing standards.
          </p>
        </div>
      </header>

      {/* Brands List/Grid */}
      <section className="section-padding bg-graphite-subtle">
        <div className="container-base">
          {brands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand, i) => (
                <ScrollReveal key={brand.id} delay={i * 0.05}>
                  <div className="card-base flex flex-col h-full group">
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        {brand.logo ? (
                          <div className="relative h-12 w-32">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              fill
                              className="object-contain object-left"
                              sizes="128px"
                            />
                          </div>
                        ) : (
                          <span className="text-xl font-bold text-surface/40">{brand.name}</span>
                        )}
                        {brand.website && (
                          <a
                            href={brand.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-navy-light/10 text-steel-muted hover:text-gold transition-colors"
                            aria-label={`${brand.name} website`}
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      <h2 className="text-h3 font-bold text-surface mb-3 group-hover:text-gold transition-colors">
                        {brand.name}
                      </h2>

                      {brand.description ? (
                        <p className="text-sm text-steel-muted leading-relaxed mb-6 flex-1 line-clamp-3">
                          {brand.description}
                        </p>
                      ) : (
                        <div className="flex-1 mb-6" />
                      )}

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-steel/10">
                        {brand.country && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60 bg-gold/5 px-2 py-1 rounded">
                            {brand.country}
                          </span>
                        )}
                        <Link
                          href={`/brands/${brand.slug}`}
                          className="flex items-center gap-1.5 text-xs font-bold text-surface/60 hover:text-gold transition-colors"
                        >
                          View Details
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Static Managed Fallback if DB is empty */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "TECHWELD", description: "Leading manufacturer and supplier of professional welding accessories, tools and tackles.", country: "United Kingdom", slug: "techweld" },
                { name: "GEOTEX", description: "European standards welding curtains, blankets and protection systems.", country: "Netherlands", slug: "geotex" },
                { name: "WELDMAN", description: "Welding products for oilfield, construction and marine industries.", country: "Global", slug: "weldman" },
                { name: "SUPERON", description: "High-quality welding consumables and protective coatings.", country: "Global", slug: "superon" },
                { name: "GASIQ", description: "Swedish manufacturer of equipment for gas welding and control.", country: "Sweden", slug: "gasiq" },
                { name: "SAKURA", description: "Japanese pigment technology and tough industrial markers.", country: "Japan", slug: "sakura" },
              ].map((brand, i) => (
                <ScrollReveal key={brand.slug} delay={i * 0.05}>
                  <div className="card-base p-6 flex flex-col h-full group">
                    <h2 className="text-h3 font-bold text-surface mb-2 group-hover:text-gold transition-colors">{brand.name}</h2>
                    <p className="text-sm text-steel-muted leading-relaxed mb-6 flex-1">{brand.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-steel/10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60 bg-gold/5 px-2 py-1 rounded">
                        {brand.country}
                      </span>
                      <Link
                        href={`/brands/${brand.slug}`}
                        className="flex items-center gap-1.5 text-xs font-bold text-surface/60 hover:text-gold transition-colors"
                      >
                        View Details
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
