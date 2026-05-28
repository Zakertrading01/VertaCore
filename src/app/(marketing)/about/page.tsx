import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Globe, Users, CheckCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";

export const dynamic = 'force-dynamic';


export const metadata: Metadata = buildMetadata({
  title: "About VERTACORE",
  description:
    "VERTACORE is a premium MRO industrial supply and procurement company. ISO 9001:2015 certified with deep expertise across Oil & Gas, Marine, Construction, and Manufacturing.",
  path: "/about",
  keywords: ["about VERTACORE", "industrial supplier company", "MRO procurement company"],
});

const values = [
  {
    icon: Award,
    title: "Quality Without Compromise",
    description:
      "We supply only certified equipment that meets internationally recognised standards. Our ISO 9001:2015 certification reflects a systematic commitment to quality in every transaction.",
  },
  {
    icon: CheckCircle,
    title: "Compliance-First",
    description:
      "Industrial operations depend on certified equipment. We ensure every product we supply carries the required certification for the application and sector it is intended for.",
  },
  {
    icon: Users,
    title: "Partnership Over Transaction",
    description:
      "We build long-term supply relationships. Our team invests time to understand your operational requirements and procurement processes — not just your current order.",
  },
  {
    icon: Globe,
    title: "Reliable Global Sourcing",
    description:
      "Our supply network spans internationally recognised manufacturers. We source to specification and can fulfil requirements beyond our standard catalogue range.",
  },
];

export default function AboutPage() {
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
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
          <SectionLabel className="mb-3">About VERTACORE</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            A reliable procurement
            <br />
            <span className="text-gold">partner for industrial operations.</span>
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            VERTACORE is a premium MRO industrial supply and procurement company.
            We deliver certified safety equipment, welding systems, lifting &amp;
            rigging, and industrial consumables to enterprise clients worldwide.
          </p>
        </div>
      </header>

      {/* Company overview */}
      <section className="pt-4 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <ScrollReveal>
              <SectionLabel className="mb-4">Who We Are</SectionLabel>
              <h2 className="text-h1 font-bold text-surface mb-5">
                Industrial supply done professionally.
              </h2>
              <div className="space-y-4 text-body text-surface/65 leading-relaxed">
                <p>
                  VERTACORE is a Maintenance, Repair &amp; Operations (MRO) supply and
                  procurement company specialising in certified industrial equipment for
                  demanding operational environments.
                </p>
                <p>
                  Our supply range covers five core capability areas — Safety &amp; PPE,
                  Welding Systems, Lifting &amp; Rigging, Abrasives, and Industrial Tools —
                  serving Oil &amp; Gas, Marine, Construction, Manufacturing, Mining and
                  Fabrication operations worldwide.
                </p>
                <p>
                  VERTACORE operates as a trusted procurement partner rather than a
                  transactional supplier. We work closely with procurement managers,
                  HSE teams and site engineers to ensure the right certified products
                  reach operations on time.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-2.5 border border-gold/25 bg-gold/5 rounded-lg px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
                <span className="text-sm font-semibold text-gold">
                  ISO 9001:2015 Quality Management System Certified
                </span>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "500+", desc: "Products in supply range" },
                { label: "10+", desc: "Industry sectors served" },
                { label: "30+", desc: "Years of industrial expertise" },
                { label: "24hr", desc: "Fast Technical Response" },
              ].map((stat, i) => (
                <ScrollReveal key={stat.label} delay={0.1 + i * 0.08}>
                  <div className="card-base p-5 text-center">
                    <div className="text-dmd font-bold text-gold">{stat.label}</div>
                    <div className="text-sm text-steel-muted mt-2">{stat.desc}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-navy">
        <div className="container-base max-w-4xl">
          <ScrollReveal>
            <SectionLabel className="mb-4">Our Mission</SectionLabel>
            <blockquote className="text-h1 font-bold text-surface leading-snug border-l-4 border-gold pl-8">
              To be the most reliable MRO procurement partner for industrial
              operations worldwide — supplying certified equipment, responding
              with speed, and building lasting supply relationships built on
              trust.
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-graphite-subtle">
        <div className="container-base">
          <ScrollReveal>
            <SectionLabel className="mb-3">Our Values</SectionLabel>
            <h2 className="text-dmd font-bold text-surface mb-10 tracking-tight">
              How we operate.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} delay={i * 0.08}>
                  <div className="card-base flex flex-col p-6 h-full">
                    <div className="p-3 rounded-xl bg-gold/10 w-fit mb-4">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="text-[17px] font-bold text-surface mb-2">{value.title}</h3>
                    <p className="text-sm text-steel-muted leading-relaxed">{value.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sub-page links */}
      <section className="py-12 bg-navy border-t border-steel/20">
        <div className="container-base flex flex-col sm:flex-row gap-4">
          <Link
            href="/about/story"
            className="flex-1 card-base p-6 group hover:border-gold/30 transition-colors"
          >
            <h3 className="text-[16px] font-bold text-surface mb-2 group-hover:text-gold transition-colors">
              Our Story
            </h3>
            <p className="text-sm text-steel-muted">How VERTACORE was founded and built.</p>
            <div className="flex items-center gap-1.5 mt-4 text-sm text-gold">
              Read <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
          <Link
            href="/about/mission"
            className="flex-1 card-base p-6 group hover:border-gold/30 transition-colors"
          >
            <h3 className="text-[16px] font-bold text-surface mb-2 group-hover:text-gold transition-colors">
              Mission &amp; Values
            </h3>
            <p className="text-sm text-steel-muted">The principles that guide every decision.</p>
            <div className="flex items-center gap-1.5 mt-4 text-sm text-gold">
              Read <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
          <Link
            href="/certifications"
            className="flex-1 card-base p-6 group hover:border-gold/30 transition-colors"
          >
            <h3 className="text-[16px] font-bold text-surface mb-2 group-hover:text-gold transition-colors">
              Certifications
            </h3>
            <p className="text-sm text-steel-muted">ISO 9001:2015 and product standards.</p>
            <div className="flex items-center gap-1.5 mt-4 text-sm text-gold">
              View <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
