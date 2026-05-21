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
    <section className="section-padding bg-navy-dark relative overflow-hidden" aria-labelledby="solutions-heading">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-navy-light/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-base relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-gold/10 border border-gold/20">
              <SectionLabel className="!mb-0 text-gold">What We Supply</SectionLabel>
            </div>
            <h2
              id="solutions-heading"
              className="text-dmd font-bold text-white tracking-tight leading-tight"
            >
              Precision-sourced equipment
              <br />
              <span className="text-gradient-gold">for demanding environments.</span>
            </h2>
            <p className="mt-5 text-body text-white/70 leading-relaxed">
              Five core MRO capability areas. Every product certified, every supply traceable. Designed for maximum reliability and peak performance.
            </p>
          </ScrollReveal>
        </div>

        {/* Solutions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <ScrollReveal key={solution.slug} delay={i * 0.1}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="card-base group flex flex-col p-8 h-full bg-navy/50 backdrop-blur-sm border-white/5 hover:border-gold/40 hover:bg-navy/80 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-6 w-6 text-white/70 group-hover:text-gold transition-colors" />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
                      <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-gold group-hover:-rotate-45 transition-all duration-300" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors relative z-10">
                    {solution.title}
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed mb-6 flex-1 relative z-10 group-hover:text-white/80 transition-colors">
                    {solution.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {solution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 group-hover:border-gold/20 group-hover:text-white/90 transition-all"
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
          <ScrollReveal delay={solutions.length * 0.1}>
            <Link
              href="/catalogue"
              className="card-glass group flex flex-col items-center justify-center p-8 text-center h-full min-h-[280px] bg-gold/10 hover:bg-gold/20 border border-gold/20 hover:border-gold/40 transition-all duration-300 relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="p-4 rounded-full bg-gold/20 mb-5 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <BookOpen className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                Browse Full Catalogue
              </h3>
              <p className="text-sm text-white/70 mb-6 relative z-10 max-w-[200px]">
                Explore our complete range of certified industrial equipment.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:text-white transition-colors relative z-10 bg-white/5 px-5 py-2.5 rounded-full group-hover:bg-gold/20">
                View Catalogue
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
