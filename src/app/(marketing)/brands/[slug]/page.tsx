import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CTASection } from "@/components/marketing/CTASection";

export const dynamic = 'force-dynamic';




export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug.includes('.')) return {};

  try {
    const brand = await db.brand.findUnique({ where: { slug } });
    if (!brand) return {};

    return buildMetadata({
      title: `${brand.name} — Industrial Equipment`,
      description: brand.description ?? `VERTACORE supplies ${brand.name} products.`,
      path: `/brands/${slug}`,
      image: brand.logo ?? undefined,
    });
  } catch (error) {
    console.error(`[Brands] DB Error in generateMetadata for slug ${slug}:`, error);
    return {};
  }
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug.includes('.')) notFound();

  let brand;
  try {
    brand = await db.brand.findUnique({ where: { slug } });
  } catch (error) {
    console.error(`[Brands] DB Error in BrandPage for slug ${slug}:`, error);
    notFound();
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

      <header className="bg-navy-dark pt-32 pb-16">
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

      <section className="section-padding bg-graphite-subtle">
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
