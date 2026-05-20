import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
  keywords: ["industrial brands", "safety equipment brands", "welding brands"],
});

export default async function BrandsPage() {
  const brands = await db.brand.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Brands & Partners", href: "/brands" },
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

      {/* Brands grid */}
      <section className="section-padding bg-graphite-subtle">
        <div className="container-base">
          {brands.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {brands.map((brand, i) => (
                <ScrollReveal key={brand.id} delay={i * 0.05}>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="card-base flex flex-col items-center p-6 text-center group"
                  >
                    {brand.logo ? (
                      <div className="relative h-16 w-full mb-4">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          className="object-contain"
                          sizes="200px"
                        />
                      </div>
                    ) : (
                      <div className="h-16 flex items-center justify-center mb-4">
                        <span className="text-xl font-bold text-surface/40">{brand.name}</span>
                      </div>
                    )}
                    <h2 className="text-[15px] font-bold text-surface group-hover:text-gold transition-colors">
                      {brand.name}
                    </h2>
                    {brand.country && (
                      <p className="text-xs text-steel-muted mt-1">{brand.country}</p>
                    )}
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Static placeholder */
            <div className="text-center py-16 max-w-xl mx-auto">
              <p className="text-body text-surface/40 mb-4">
                Our brand partner information is being updated.
              </p>
              <p className="text-sm text-surface/30">
                VERTACORE sources from 3M, Honeywell, MSA Safety, Lincoln Electric,
                ESAB, Miller, Kito, Yale, Norton, DeWalt, Stanley and other internationally
                recognised industrial brands.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 text-sm text-gold font-medium"
              >
                Enquire about a specific brand
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
