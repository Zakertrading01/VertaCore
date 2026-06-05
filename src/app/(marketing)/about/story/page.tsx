import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";



export const metadata: Metadata = buildMetadata({
  title: "Our Story",
  description:
    "The founding story of VERTACORE — how a commitment to quality and procurement reliability led to building a premium MRO industrial supply company.",
  path: "/about/story",
});

export default function StoryPage() {
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Story", href: "/about/story" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      <header className="bg-navy-dark pt-16 lg:pt-32 pb-8">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Our Story</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Built on reliability <span className="text-gold">and operational trust.</span>
          </h1>
        </div>
      </header>

      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-navy-dark">
        <div className="container-base max-w-3xl">
          <ScrollReveal>
            <div className="space-y-6 text-lg md:text-xl text-surface/80 leading-relaxed pl-6 border-l-2 border-gold">
              <p>
                VERTACORE was founded with a clear mandate: to provide industrial
                procurement teams with a supply partner they could rely on. One that
                understood the difference between a standard product and a certified one.
                One that treated a 24-hour response commitment as non-negotiable.
              </p>

              <p>
                Industrial operations cannot afford supply failures. Whether an offshore
                platform requires ATEX-certified equipment, a construction site needs
                fall protection to EN 361, or a shipyard requires lifting gear to ASME
                B30 — the specification matters. The certification matters. The supplier
                relationship matters.
              </p>

              <p>
                VERTACORE was built to deliver on all three. Our founders brought
                decades of operational experience in MRO procurement, understanding
                exactly what procurement managers, HSE teams and site engineers need
                from a supply partner: certainty.
              </p>

              <p>
                Today, VERTACORE supplies certified MRO equipment across five capability
                areas to clients in Oil &amp; Gas, Marine, Construction, Manufacturing,
                Mining and Fabrication. Every product meets applicable international
                standards. Every enquiry receives a response within 24 business hours.
              </p>

              <p>
                Operationally reliable. Built for industrial
                procurement teams that cannot compromise.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />

      <div className="bg-navy-dark py-6">
        <div className="container-base">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            About VERTACORE
          </Link>
        </div>
      </div>
    </>
  );
}
