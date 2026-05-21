import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const industries = [
  {
    name: "Oil & Gas",
    slug: "oil-gas",
    icon: "🛢",
    description: "Upstream, midstream and downstream operations",
  },
  {
    name: "Marine",
    slug: "marine",
    icon: "⚓",
    description: "Offshore platforms, vessels and shipyards",
  },
  {
    name: "Construction",
    slug: "construction",
    icon: "🏗",
    description: "Civil, structural and infrastructure projects",
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    icon: "🏭",
    description: "Plant operations and production facilities",
  },
  {
    name: "Mining",
    slug: "mining",
    icon: "⛏",
    description: "Surface and underground mining operations",
  },
  {
    name: "Fabrication",
    slug: "fabrication",
    icon: "⚙",
    description: "Steel fabrication and metalwork shops",
  },
  {
    name: "Power & Energy",
    slug: "power-energy",
    icon: "⚡",
    description: "Power generation and energy infrastructure",
  },
  {
    name: "Civil Engineering",
    slug: "civil-engineering",
    icon: "🌉",
    description: "Bridges, tunnels and major civil works",
  },
];

export function IndustriesSection() {
  return (
    <section
      className="section-padding bg-navy"
      aria-labelledby="industries-heading"
    >
      <div className="container-base">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <ScrollReveal className="max-w-xl">
            <SectionLabel className="mb-3">Sectors We Serve</SectionLabel>
            <h2
              id="industries-heading"
              className="text-dmd font-bold text-surface tracking-tight"
            >
              Specialized supply for
              <br />
              <span className="text-gold">critical industrial sectors.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-muted transition-colors font-medium"
            >
              View All Industries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Industries grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {industries.map((industry, i) => (
            <ScrollReveal key={industry.slug} delay={i * 0.06}>
              <Link
                href={`/industries/${industry.slug}`}
                className="card-glass flex flex-col p-4 md:p-5 group hover:border-gold/30 transition-all duration-200"
              >
                <span className="text-2xl mb-3" aria-hidden="true">
                  {industry.icon}
                </span>
                <h3 className="text-sm font-bold text-surface mb-1 group-hover:text-gold transition-colors">
                  {industry.name}
                </h3>
                <p className="text-xs text-steel-muted leading-snug line-clamp-2">
                  {industry.description}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
