import Link from "next/link";
import { ArrowRight, Shield, Flame, Link2, Disc, Wrench, BookOpen } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const solutions = [
  {
    icon: Shield,
    title: "Safety Systems",
    slug: "safety-systems",
    description: "Head, eye, hand and fall protection for the most demanding industrial environments.",
    tags: ["CE Certified", "EN 361", "ANSI Z359"],
  },
  {
    icon: Flame,
    title: "Welding Systems",
    slug: "welding-systems",
    description: "SMAW, MIG/MAG, TIG and SAW welding machines and consumables from leading manufacturers.",
    tags: ["AWS", "EN 499", "ISO 14341"],
  },
  {
    icon: Link2,
    title: "Lifting & Rigging",
    slug: "lifting-rigging",
    description: "Chain hoists, lever blocks, wire rope slings, shackles and lifting accessories.",
    tags: ["ASME B30", "EN 818", "BS 3551"],
  },
  {
    icon: Disc,
    title: "Abrasives",
    slug: "abrasives",
    description: "Grinding discs, cutting wheels, flap discs and surface treatment products for fabrication.",
    tags: ["EN 12413", "oSa", "MPA"],
  },
  {
    icon: Wrench,
    title: "Industrial Tools",
    slug: "industrial-tools",
    description: "Hand tools, power tools and precision measurement equipment for site and workshop.",
    tags: ["ISO 9001", "Calibrated"],
  },
];

export function SolutionsSection() {
  return (
    <section className="section-padding bg-graphite-subtle" aria-labelledby="solutions-heading">
      <div className="container-base">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <ScrollReveal>
            <SectionLabel className="mb-3">What We Supply</SectionLabel>
            <h2
              id="solutions-heading"
              className="text-dmd font-bold text-surface tracking-tight"
            >
              Precision-sourced equipment
              <br />
              <span className="text-gold">for demanding environments.</span>
            </h2>
            <p className="mt-4 text-body text-surface/60 leading-relaxed">
              Five core MRO capability areas. Every product certified, every supply traceable.
            </p>
          </ScrollReveal>
        </div>

        {/* Solutions grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <ScrollReveal key={solution.slug} delay={i * 0.08}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="card-base flex flex-col p-6 h-full group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-navy-light/40 group-hover:bg-gold/10 transition-colors">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-steel-muted group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="text-[17px] font-bold text-surface mb-2 group-hover:text-gold transition-colors">
                    {solution.title}
                  </h3>

                  <p className="text-sm text-steel-muted leading-relaxed mb-4 flex-1">
                    {solution.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {solution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border border-steel/30 text-steel-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}

          {/* Browse catalogue card */}
          <ScrollReveal delay={solutions.length * 0.08}>
            <Link
              href="/catalogue"
              className="card-glass flex flex-col items-center justify-center p-8 text-center h-full min-h-[200px] group border-gold/20 hover:border-gold/40 transition-colors"
            >
              <BookOpen className="h-8 w-8 text-gold mb-4" />
              <h3 className="text-[17px] font-bold text-surface mb-2">
                Browse Our Catalogue
              </h3>
              <p className="text-sm text-surface/50 mb-4">
                View the full range of products we supply.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold group-hover:text-gold-muted transition-colors">
                View Catalogue
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
