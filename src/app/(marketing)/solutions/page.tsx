import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Flame, Link2, Disc, Wrench } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";

export const dynamic = 'force-dynamic';



export const metadata: Metadata = buildMetadata({
  title: "Industrial MRO Solutions",
  description:
    "Five core MRO supply capability areas: safety systems, welding, lifting & rigging, abrasives and industrial tools. ISO 9001:2015 certified.",
  path: "/solutions",
  keywords: ["MRO solutions", "industrial supply", "safety systems", "welding supplier"],
});

const solutions = [
  {
    icon: Shield,
    title: "Safety Systems",
    slug: "safety-systems",
    subtitle: "Certified PPE for industrial environments",
    description:
      "A comprehensive range of personal protective equipment and safety systems for Oil & Gas, Marine, Construction and Manufacturing operations. Every product certified to internationally recognised safety standards.",
    features: [
      "Head & Face Protection",
      "Fall Protection Systems",
      "Respiratory Protection",
      "Hand & Foot Protection",
      "Hi-Visibility Clothing",
      "Fire-Resistant PPE",
    ],
    certifications: ["CE Mark", "EN 361", "EN 397", "ANSI Z359"],
  },
  {
    icon: Flame,
    title: "Welding Systems",
    slug: "welding-systems",
    subtitle: "Complete welding equipment and consumables",
    description:
      "SMAW, MIG/MAG, TIG and SAW welding machines and consumables from internationally recognised manufacturers. Suitable for structural fabrication, pipeline welding and maintenance operations.",
    features: [
      "SMAW / Stick Welding",
      "MIG/MAG (GMAW) Systems",
      "TIG (GTAW) Equipment",
      "SAW (Submerged Arc)",
      "Welding Consumables",
      "Protective Equipment",
    ],
    certifications: ["AWS D1.1", "EN 499", "ISO 14341", "CE"],
  },
  {
    icon: Link2,
    title: "Lifting & Rigging",
    slug: "lifting-rigging",
    subtitle: "Certified lifting equipment for critical operations",
    description:
      "Chain hoists, lever blocks, wire rope slings, shackles, lifting beams and rigging accessories for offshore, marine, construction and industrial lifting operations.",
    features: [
      "Chain Hoists & Lever Blocks",
      "Wire Rope Slings",
      "Round Slings",
      "Shackles & Swivels",
      "Lifting Beams & Spreaders",
      "Rigging Hardware",
    ],
    certifications: ["ASME B30", "EN 818", "EN 13414", "BS 3551"],
  },
  {
    icon: Disc,
    title: "Abrasives",
    slug: "abrasives",
    subtitle: "Surface preparation and finishing products",
    description:
      "Grinding discs, cutting wheels, flap discs and surface treatment products for fabrication shops, maintenance operations and site work. oSa and MPA certified.",
    features: [
      "Grinding Discs",
      "Cutting Wheels",
      "Flap Discs",
      "Fibre Discs",
      "Wire Brushes",
      "Surface Conditioning",
    ],
    certifications: ["EN 12413", "oSa", "MPA", "CE"],
  },
  {
    icon: Wrench,
    title: "Industrial Tools",
    slug: "industrial-tools",
    subtitle: "Hand tools, power tools and measurement equipment",
    description:
      "Professional-grade hand tools, power tools, torque equipment and precision measurement instruments for industrial maintenance, fabrication and operations teams.",
    features: [
      "Hand Tools",
      "Power Tools",
      "Torque Equipment",
      "Measurement Instruments",
      "Test & Inspection",
      "Workshop Equipment",
    ],
    certifications: ["ISO 9001", "CE", "Calibrated"],
  },
];

export default function SolutionsPage() {
  const breadcrumb = [{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      {/* Page header */}
      <header className="bg-navy-dark pt-32 pb-8">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">MRO Supply Capabilities</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Five core industrial
            <br />
            <span className="text-gold">supply capabilities.</span>
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            VERTACORE supplies certified MRO equipment across five capability areas.
            Every product meets international safety and quality standards.
          </p>
        </div>
      </header>

      {/* Solutions list */}
      <section className="pt-10 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base">
          <div className="flex flex-wrap justify-center gap-6">
            {solutions.map((solution, i) => {
              const Icon = solution.icon;
              return (
                <ScrollReveal
                  key={solution.slug}
                  delay={i * 0.06}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="card-base flex flex-col p-6 md:p-8 h-full">
                    {/* Header: Icon + View Button */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 rounded-xl bg-navy-light/40 flex-shrink-0">
                        <Icon className="h-6 w-6 text-gold" />
                      </div>
                      <Link
                        href={`/solutions/${solution.slug}`}
                        className="p-2.5 rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                        aria-label={`View ${solution.title}`}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <h2 className="text-h2 font-bold text-surface">{solution.title}</h2>
                      <p className="text-sm text-gold mt-1">{solution.subtitle}</p>
                    </div>

                    <p className="text-sm text-surface/60 leading-relaxed mb-6 flex-1">
                      {solution.description}
                    </p>

                    {/* Features list - compact */}
                    <div className="space-y-2 mb-6">
                      {solution.features.slice(0, 4).map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-xs text-surface/70"
                        >
                          <span className="h-1 w-1 rounded-full bg-gold flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Certifications - compact */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-steel/20">
                      {solution.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border border-gold/10 text-gold/60 bg-gold/5"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
