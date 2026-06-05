import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { catalogueItemListSchema, breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import { CatalogueGroup } from "@/components/catalogue/CatalogueGroup";
import { CatalogueDownloadButton } from "@/components/catalogue/CatalogueClient";
import { CTASection } from "@/components/marketing/CTASection";
import { getCatalogueItems } from "@/lib/cached-queries";

export const revalidate = 3600; // Cache for 1 hour

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

  // Group by category more efficiently in a single pass
  const grouped: Record<string, Item[]> = {};

  // Initialize categories in specific order
  CATEGORY_ORDER.forEach(cat => {
    grouped[cat] = [];
  });

  items.forEach(item => {
    if (!grouped[item.categoryGroup]) {
      grouped[item.categoryGroup] = [];
    }
    grouped[item.categoryGroup].push(item);
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
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header */}
        <header className="bg-navy-dark pt-16 lg:pt-32 pb-0 overflow-hidden relative">
          <style>{`
            @keyframes sweep {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes grid-pan {
              0% { transform: translateY(0); }
              100% { transform: translateY(40px); }
            }
            @keyframes float-dust {
              0% { transform: translateY(0) scale(1); opacity: 0; }
              20% { opacity: 0.8; }
              80% { opacity: 0.8; }
              100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
            }
            @keyframes pulse-glow {
              0%, 100% { opacity: 0.2; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(1.2); }
            }
          `}</style>
          
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Animated Gradient Sweep */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-navy-dark via-[#0d2242] to-navy-dark bg-[length:200%_200%]"
              style={{ animation: 'sweep 15s ease-in-out infinite' }}
            />
            
            {/* Animated Tech Grid */}
            <div 
              className="absolute -top-[40px] left-0 right-0 bottom-0 opacity-[0.08]"
              style={{
                backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                animation: 'grid-pan 15s linear infinite',
              }}
            />
            
            {/* Glowing Orbs */}
            <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[80px]" style={{ animation: 'pulse-glow 6s ease-in-out infinite' }} />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" style={{ animation: 'pulse-glow 8s ease-in-out infinite 2s' }} />

            {/* Interactive Particle Network */}
            <ParticleBackground className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen pointer-events-auto" />
          </div>

          <div className="absolute inset-y-0 left-0 w-1.5 bg-gold animate-pulse shadow-[0_0_15px_rgba(250,204,21,0.8)] z-10"></div>
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

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <CatalogueDownloadButton />
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

        </div>
      </section>
    </>
  );
}
