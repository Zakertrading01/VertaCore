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
    <section className="section-padding bg-[#FAF9F6]" aria-labelledby="solutions-heading">
      <div className="container-base">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <ScrollReveal>
            <SectionLabel className="mb-3">What We Supply</SectionLabel>
            <h2
              id="solutions-heading"
              className="text-dmd font-bold text-navy tracking-tight"
            >
              Precision-sourced equipment
              <br />
              <span className="text-gold">for demanding environments.</span>
            </h2>
            <p className="mt-4 text-body text-navy/60 leading-relaxed">
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
                  className="bg-white border border-navy/5 shadow-sm rounded-2xl flex flex-col p-6 h-full group hover:border-gold/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gold/5 group-hover:bg-gold/15 transition-colors">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-navy/20 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="text-[17px] font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                    {solution.title}
                  </h3>

                  <p className="text-sm text-navy/60 leading-relaxed mb-4 flex-1">
                    {solution.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {solution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border border-navy/10 text-navy/40"
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
              className="bg-navy border border-navy/5 shadow-lg flex flex-col items-center justify-center p-8 text-center h-full min-h-[200px] group hover:bg-navy-dark transition-all rounded-2xl"
            >
              <BookOpen className="h-8 w-8 text-gold mb-4" />
              <h3 className="text-[17px] font-bold text-white mb-2">
                Browse Our Catalogue
              </h3>
              <p className="text-sm text-white/50 mb-4">
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
