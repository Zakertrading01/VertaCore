import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CTASection } from "@/components/marketing/CTASection";
import { getBrand } from "@/lib/cached-queries";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug.includes('.')) return {};

  const brand = await getBrand(slug);
  if (!brand) return {};

  return buildMetadata({
    title: `${brand.name} — Industrial Equipment`,
    description: brand.description ?? `VERTACORE supplies ${brand.name} products.`,
    path: `/brands/${slug}`,
    image: brand.logo ?? undefined,
  });
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug.includes('.')) notFound();

  let brand = await getBrand(slug);

  // Fallback for key brands if not in DB
  if (!brand) {
    const fallbacks: Record<string, any> = {
      techweld: { name: "TECHWELD", description: "Techweld industrial technologies limited is a leading manufacturer and supplier of professional welding accessories, tools and tackles.", country: "United Kingdom", logo: "/brands/techweld.png" },
      geotex: { name: "GEOTEX", description: "One of the leading industry supplier of welding curtains, welding blankets and welding pads to protect people, plants, and equipment.", country: "Netherlands", logo: "/brands/geotex.png" },
      weldman: { name: "WELDMAN", description: "Manufacturer of welding products for various industries like oilfield, construction and marine with all relevant international standards.", country: "Global", logo: "/brands/weldman.png" },
      superon: { name: "SUPERON", description: "One of the largest manufacturers of high-quality welding consumables, stainless steel wires, and industrial coatings.", country: "Global", logo: "/brands/superon.png" },
      gasiq: { name: "GASIQ", description: "Swedish manufacturer of equipment for gas welding, soldering, cutting and gas control for gas shielded welding.", country: "Sweden", logo: "/brands/gasiq.png" },
      sakura: { name: "SAKURA", description: "Leading pigment technology expert. Sakura manufactures smooth writing solid paint markers and industrial markers.", country: "Japan", logo: "/brands/sakura.png" },
    };
    brand = fallbacks[slug];
  }

  if (!brand) notFound();

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: brand.name, href: `/brands/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      <header className="bg-navy-dark pt-16 lg:pt-32 pb-0">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-8" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {brand.logo && (
              <div className="relative h-20 w-40 bg-white/5 rounded-lg p-3 flex-shrink-0">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain p-2"
                  sizes="160px"
                />
              </div>
            )}
            <div>
              <SectionLabel className="mb-2">Brand Partner</SectionLabel>
              <h1 className="text-dmd font-bold text-surface">{brand.name}</h1>
              {brand.country && (
                <p className="text-sm text-steel-muted mt-1">{brand.country}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="pt-10 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base max-w-3xl">
          {brand.description && (
            <p className="text-body text-surface/70 leading-relaxed mb-8">
              {brand.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-navy font-semibold px-6 py-3 rounded-lg hover:bg-gold-muted transition-colors text-sm"
            >
              Request Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-steel/40 text-surface/70 font-medium px-6 py-3 rounded-lg hover:border-gold/40 transition-colors text-sm"
              >
                <Globe className="h-4 w-4" />
                Brand Website
              </a>
            )}
          </div>
        </div>
      </section>

      <CTASection />

      <div className="bg-navy-dark py-6">
        <div className="container-base">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Brands
          </Link>
        </div>
      </div>
    </>
  );
}
