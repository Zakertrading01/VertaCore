import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";
import { getIndustries } from "@/lib/cached-queries";

export const dynamic = 'force-dynamic';



export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve",
  description:
    "VERTACORE supplies certified industrial equipment to Oil & Gas, Marine, Construction, Manufacturing, Mining and other critical industrial sectors worldwide.",
  path: "/industries",
  keywords: [
    "industrial equipment industries",
    "oil gas supplier",
    "marine equipment",
    "construction safety supply",
  ],
});

// Fallback static industries for when DB has no data
const fallbackIndustries = [
  { id: "1", slug: "oil-gas", name: "Oil & Gas", icon: "🛢", description: "Upstream, midstream and downstream operations", coverImage: null, published: true },
  { id: "2", slug: "marine", name: "Marine & Offshore", icon: "⚓", description: "Offshore platforms, vessels and shipyards", coverImage: null, published: true },
  { id: "3", slug: "construction", name: "Construction", icon: "🏗", description: "Civil, structural and infrastructure projects", coverImage: null, published: true },
  { id: "4", slug: "manufacturing", name: "Petrochemical Facilities", icon: "🧪", description: "Chemical processing and refinement plants", coverImage: null, published: true },
  { id: "5", slug: "mining", name: "Mining", icon: "⛏", description: "Surface and underground mining operations", coverImage: null, published: true },
  { id: "6", slug: "fabrication", name: "Fabrication & Manufacturing", icon: "⚙", description: "Heavy metalwork and industrial production", coverImage: null, published: true },
  { id: "7", slug: "power-energy", name: "Utilities & Industrial Operations", icon: "⚡", description: "Power generation and essential utility infrastructure", coverImage: null, published: true },
  { id: "8", slug: "civil-engineering", name: "EPC & Infrastructure Projects", icon: "🏗", description: "Large-scale engineering, procurement, and construction", coverImage: null, published: true },
];

export default async function IndustriesPage() {
  let industries = await getIndustries();

  if (industries.length === 0) industries = fallbackIndustries as typeof industries;

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      {/* Header */}
      <header className="bg-navy-dark pt-16 lg:pt-32 pb-8">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Sectors We Serve</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Industrial expertise across
            <br />
            <span className="text-gold">every major sector.</span>
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            VERTACORE understands the compliance requirements and operational environment
            of each industry we serve. Sector-specific supply from a knowledgeable partner.
          </p>
        </div>
      </header>

      {/* Industries grid */}
      <section className="pt-4 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {industries.map((industry, i) => (
              <ScrollReveal key={industry.id} delay={i * 0.06}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="card-base flex flex-col overflow-hidden group"
                >
                  {/* Cover image */}
                  {industry.coverImage ? (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={industry.coverImage}
                        alt={industry.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent" />
                    </div>
                  ) : (
                    <div className="bg-navy-light/20 px-5 pt-5 pb-2">
                      <span className="text-3xl">{industry.icon}</span>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col">
                    {!industry.coverImage && null}
                    <h2 className="text-[17px] font-bold text-surface mb-2 group-hover:text-gold transition-colors">
                      {industry.name}
                    </h2>
                    <p className="text-sm text-steel-muted leading-relaxed flex-1">
                      {industry.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-steel/20 text-sm font-medium text-gold group-hover:text-gold-muted transition-colors">
                      View sector
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
