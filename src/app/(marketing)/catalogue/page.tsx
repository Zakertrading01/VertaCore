import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { catalogueItemListSchema, breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CatalogueGroup } from "@/components/catalogue/CatalogueGroup";
import { CTASection } from "@/components/marketing/CTASection";

export const dynamic = 'force-dynamic';



export const metadata: Metadata = buildMetadata({
  title: "Industrial Product Catalogue",
  description:
    "A representative selection of the industrial equipment we supply — safety PPE, welding systems, lifting & rigging, abrasives and industrial tools. All products certified.",
  path: "/catalogue",
  keywords: [
    "industrial equipment catalogue",
    "MRO products",
    "safety PPE catalogue",
    "welding equipment",
    "lifting rigging catalogue",
  ],
});

const CATEGORY_ORDER = [
  "Safety & PPE",
  "Welding",
  "Lifting & Rigging",
  "Abrasives",
  "Industrial Tools",
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Safety & PPE":
    "Personal protective equipment and safety systems certified to CE, EN, and ANSI standards for industrial and construction environments.",
  Welding:
    "SMAW, MIG/MAG, TIG and SAW welding machines and consumables suitable for structural fabrication, pipeline welding and maintenance.",
  "Lifting & Rigging":
    "Chain hoists, wire rope slings, shackles and rigging hardware certified to ASME B30, EN 818 and EN 13414 standards.",
  Abrasives:
    "Grinding discs, cutting wheels and flap discs from oSa and MPA certified manufacturers for surface preparation and finishing.",
  "Industrial Tools":
    "Professional hand tools, power tools and precision measurement equipment for industrial maintenance and fabrication.",
};

export default async function CataloguePage() {
  type Item = {
    id: string;
    name: string;
    description: string | null;
    categoryGroup: string;
    image: string | null;
    certTags: string[];
    brandName: string | null;
    datasheetUrl: string | null;
  };

  const items = (await db.catalogueItem.findMany({
    where: { published: true },
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
  }).catch((err) => {
    console.error("[Catalogue] DB Error fetching items:", err);
    return [];
  })) as Item[];


  // Group by category
  const grouped: Record<string, Item[]> = {};

  // Initialize known categories first to maintain order
  CATEGORY_ORDER.forEach((cat) => {
    grouped[cat] = items.filter((i) => i.categoryGroup === cat);
  });

  // Group any items with categories not in CATEGORY_ORDER
  const knownCategories = new Set(CATEGORY_ORDER);
  items.forEach((item) => {
    if (!knownCategories.has(item.categoryGroup)) {
      if (!grouped[item.categoryGroup]) {
        grouped[item.categoryGroup] = [];
      }
      grouped[item.categoryGroup].push(item);
    }
  });

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Catalogue", href: "/catalogue" },
  ];

  const jsonLd = [
    catalogueItemListSchema(items.map((item, i) => ({ name: item.name, position: i + 1 }))),
    breadcrumbSchema(breadcrumb),
  ];

  const cataloguePDF = await db.cataloguePDF.findFirst({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  }).catch((err) => {
    console.error("[Catalogue] DB Error fetching PDF:", err);
    return null;
  });

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
      <header className="bg-navy-dark pt-32 pb-4">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Our Product Range</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-dlg font-bold text-surface tracking-tight">
                Explore Our Catalogue
              </h1>
              <p className="mt-4 text-body text-surface/60 leading-relaxed">
                A representative selection of the certified industrial equipment we supply.
                Every item meets international quality and safety standards.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              {cataloguePDF && (
                <Link
                  href={`/api/catalogue?pdfId=${cataloguePDF.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-6 py-3 rounded-lg hover:bg-gold-muted transition-colors text-sm"
                >
                  <Download className="h-4 w-4" />
                  Download PDF Catalogue
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="pt-6 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base space-y-16 md:space-y-20">
          {Object.entries(grouped).map(([category, categoryItems]) => {
            if (categoryItems.length === 0) return null;
            return (
              <div key={category}>
                {/* Category description */}
                {CATEGORY_DESCRIPTIONS[category] && (
                  <p className="text-sm text-surface/50 mb-6 max-w-2xl leading-relaxed">
                    {CATEGORY_DESCRIPTIONS[category]}
                  </p>
                )}
                <CatalogueGroup categoryGroup={category} items={categoryItems} />
              </div>
            );
          })}

          {items.length === 0 && (
            <div className="text-center py-16">
              <p className="text-surface/40 text-body">
                Catalogue items are being added. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy border-t border-steel/20">
        <div className="container-base text-center">
          <h2 className="text-h2 font-bold text-surface mb-2">
            Professional Industrial Supply
          </h2>
          <p className="text-body text-surface/60 mb-6">
            All our products are certified and meet international quality standards.
          </p>
          <div className="flex items-center justify-center gap-2 text-gold font-semibold uppercase tracking-widest text-xs">
            <span className="h-2 w-2 rounded-full bg-gold" />
            ISO 9001:2015 Certified
          </div>
        </div>
      </section>
    </>
  );
}
