import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { catalogueItemListSchema, breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CatalogueGroup } from "@/components/catalogue/CatalogueGroup";
import { CTASection } from "@/components/marketing/CTASection";
import { getCatalogueItems } from "@/lib/cached-queries";
import { ScrollToHash } from "@/components/shared/ScrollToHash";

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
  "Welding & Fabrication",
  "Lifting & Material Handling",
  "Industrial Supply",
  "Technical Procurement",
  "Project Supply & Logistics",
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Safety & PPE":
    "Personal protective equipment and workplace safety products certified to CE, EN, and ANSI standards for industrial and construction environments.",
  "Welding & Fabrication":
    "Welding machines, consumables, electrodes, cutting solutions, and abrasives for structural fabrication, pipeline welding, and maintenance operations.",
  "Lifting & Material Handling":
    "Lifting equipment, rigging accessories, and material handling products certified to ASME B30, EN 818, and EN 13414 for safe industrial operations.",
  "Industrial Supply":
    "Comprehensive MRO products and industrial supplies sourced from trusted manufacturers for project, maintenance, and operational requirements.",
  "Technical Procurement":
    "Specialist tools, measurement equipment, and technical products sourced through our global manufacturer network.",
  "Project Supply & Logistics":
    "Coordinated supply solutions for shutdowns, projects, and operational timelines with dedicated logistics support.",
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

  const items = (await getCatalogueItems()) as Item[];


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


  return (
    <>
      <ScrollToHash />
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header */}
      <header className="bg-navy-dark pt-16 lg:pt-32 pb-6 relative">
          <div className="container-base relative z-10">
            <Breadcrumb items={breadcrumb} className="mb-2" />
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

          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="pt-2 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base space-y-8 md:space-y-10">
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

      <section className="py-8 bg-navy border-t border-steel/20">
        <div className="container-base text-center">
          <h2 className="text-h2 font-bold text-surface mb-2">
            Professional Industrial Supply
          </h2>
          <p className="text-body text-surface/60">
            All our products are certified and meet international quality standards.
          </p>
        </div>
      </section>
    </>
  );
}
