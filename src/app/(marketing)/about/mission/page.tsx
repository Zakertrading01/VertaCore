import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Target, Shield, Handshake, Globe } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";

export const dynamic = 'force-dynamic';


export const metadata: Metadata = buildMetadata({
  title: "Mission & Values",
  description:
    "VERTACORE's mission and operating values — quality assurance, compliance-first, enterprise partnership, and reliable global sourcing.",
  path: "/about/mission",
});

const values = [
  {
    icon: Shield,
    title: "1. Quality Assurance",
    content:
      "Every product VERTACORE supplies carries verified certification documentation. We do not substitute unverified products. Our ISO 9001:2015 certification governs every step of the supply chain — from sourcing to delivery.",
  },
  {
    icon: Target,
    title: "2. Compliance-First",
    content:
      "Industrial buyers need products that comply with applicable safety standards for their specific environment. We ensure every item we supply is certified to the relevant EN, CE, ANSI, ASME or sector-specific standard for its intended use.",
  },
  {
    icon: Handshake,
    title: "3. Enterprise Partnership",
    content:
      "We treat every client relationship as a long-term partnership. That means investing time to understand procurement processes, maintaining responsiveness, and providing technical consultation — not just fulfilling orders.",
  },
  {
    icon: Globe,
    title: "4. Global Sourcing Reliability",
    content:
      "Our sourcing network gives clients access to internationally recognised manufacturers. When standard catalogue items do not meet specialist requirements, we source to specification — maintaining documentation standards throughout.",
  },
];

export default function MissionPage() {
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Mission & Values", href: "/about/mission" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      <header className="bg-navy-dark pt-16 lg:pt-32 pb-16">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Mission &amp; Values</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            How we operate.
            <br />
            <span className="text-gold">What we stand for.</span>
          </h1>
        </div>
      </header>

      {/* Mission statement */}
      <section className="section-padding bg-navy">
        <div className="container-base max-w-4xl">
          <ScrollReveal>
            <SectionLabel className="mb-4">Our Mission</SectionLabel>
            <blockquote className="text-h1 font-bold text-surface leading-snug border-l-4 border-gold pl-8">
              To be the most reliable MRO procurement partner for industrial
              operations worldwide — supplying certified equipment, responding
              with speed, and building lasting supply relationships built on
              trust and transparency.
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-graphite-subtle">
        <div className="container-base max-w-4xl">
          <ScrollReveal>
            <SectionLabel className="mb-4">Operating Values</SectionLabel>
            <h2 className="text-dmd font-bold text-surface mb-10 tracking-tight">
              The principles behind every decision.
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} delay={i * 0.08}>
                  <div className="card-base flex gap-5 p-6">
                    <div className="p-3 rounded-xl bg-gold/10 flex-shrink-0 h-fit">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-surface mb-2">{value.title}</h3>
                      <p className="text-body text-surface/65 leading-relaxed">{value.content}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
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
