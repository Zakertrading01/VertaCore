import type { Metadata } from "next";
import Link from "next/link";
import { TapLink } from "@/components/shared/TapLink";
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
    "Five core MRO supply capability areas: safety systems, welding, lifting & rigging, abrasives and industrial tools.",
  path: "/solutions",
  keywords: ["MRO solutions", "industrial supply", "safety systems", "welding supplier"],
});

import { getSolutionCategories } from "@/lib/cached-queries";

export default async function SolutionsPage() {
  const breadcrumb = [{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }];

  const solutions = await getSolutionCategories();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      {/* Page header */}
      <header className="bg-navy-dark pt-16 lg:pt-32 pb-8">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Our Services</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Industrial supply solutions
            <br />
            <span className="text-gold">built around your operations.</span>
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            Six dedicated service areas covering MRO supply, welding, safety, lifting,
            specialist procurement, and project logistics coordination.
          </p>
        </div>
      </header>

      {/* Solutions list */}
      <section className="pt-10 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base">
          {solutions.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-surface/60">No solutions published yet.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 justify-start">
              {solutions.map((solution, i) => {
                return (
                  <ScrollReveal
                    key={solution.slug}
                    delay={i * 0.06}
                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    <TapLink
                      href={`/catalogue?category=${encodeURIComponent(solution.name)}`}
                      className="card-base block flex-col p-6 md:p-8 h-full group transition-all duration-300 hover:-translate-y-1 focus:-translate-y-1 active:-translate-y-1 hover:border-gold/30 focus:border-gold/30 active:border-gold/30 outline-none relative overflow-hidden"
                      tabIndex={0}
                    >
                      {/* Premium Hover Effects */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent group-hover:w-full group-focus:w-full group-active:w-full transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100" />
                      
                      {/* Header: Icon + View Button */}
                      <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="p-3.5 rounded-xl bg-navy-light/40 flex-shrink-0 flex items-center justify-center w-12 h-12 group-hover:scale-110 group-focus:scale-110 group-active:scale-110 group-hover:bg-gold/20 group-focus:bg-gold/20 group-active:bg-gold/20 transition-all duration-500">
                          {solution.icon ? (
                            <span className="text-2xl group-hover:text-gold group-focus:text-gold group-active:text-gold transition-colors duration-500">{solution.icon}</span>
                          ) : (
                            <span className="text-2xl group-hover:text-gold group-focus:text-gold group-active:text-gold transition-colors duration-500">📦</span>
                          )}
                        </div>
                        <div
                          className="p-2.5 rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy group-focus:bg-gold group-focus:text-navy group-active:bg-gold group-active:text-navy transition-all duration-300"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <div className="mb-4 relative z-10">
                        <h2 className="text-h2 font-bold text-surface group-hover:!text-gold group-focus:!text-gold group-active:!text-gold transition-colors duration-300">{solution.name}</h2>
                      </div>

                      <p className="text-sm text-surface/60 leading-relaxed mb-6 flex-1 group-hover:!text-gold/80 group-focus:!text-gold/80 group-active:!text-gold/80 transition-colors duration-300 relative z-10">
                        {solution.description || "Explore our certified industrial solutions."}
                      </p>
                    </TapLink>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
