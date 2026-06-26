import type { Metadata } from "next";
import Link from "next/link";
import { TapLink } from "@/components/shared/TapLink";
import { ArrowRight, Award, Globe, Users, CheckCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";



export const metadata: Metadata = buildMetadata({
  title: "About VERTA CORE",
  description:
    "VERTA CORE is a premium MRO industrial supply and procurement company with deep expertise across Oil & Gas, Marine, Construction, and Manufacturing.",
  path: "/about",
  keywords: ["about VERTA CORE", "industrial supplier company", "MRO procurement company"],
});

const values = [
  {
    icon: Award,
    title: "Quality Without Compromise",
    description:
      "We supply only certified equipment that meets internationally recognised standards. This reflects a systematic commitment to quality in every transaction.",
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
          <SectionLabel className="mb-3">Company</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            About <span className="text-gold">Verta Core.</span>
          </h1>
        </div>
      </header>

      {/* Company overview & Industries */}
      <section className="pt-8 pb-4 md:pt-12 md:pb-8 bg-navy">
        <div className="container-base max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* Left: About Text */}
            <div className="lg:col-span-7 space-y-10">
              <ScrollReveal>
                <SectionLabel className="mb-4">Who We Are</SectionLabel>
                <h2 className="text-h1 font-bold text-surface mb-8 tracking-tight">
                  Industrial supply done professionally.
                </h2>
                <div className="flex flex-col w-full mt-4">
                  <div className="group relative pt-6 pb-8 border-t border-white/10 hover:border-gold/30 transition-colors duration-500 cursor-default">
                    {/* Animated Gold Sweep */}
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-gold group-hover:w-1/3 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                    <p className="text-lg md:text-xl text-surface/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Verta Core is a dynamic industrial supply and solutions company positioned in Abu Dhabi, established to support the evolving demands of the oil & gas, energy, construction, and industrial sectors.
                    </p>
                  </div>

                  <div className="group relative pt-6 pb-8 border-t border-white/10 hover:border-gold/30 transition-colors duration-500 cursor-default">
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-gold group-hover:w-1/3 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                    <p className="text-lg md:text-xl text-surface/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Built on the principles of integrity, reliability, and performance, we provide high-quality industrial products and tailored supply solutions that help clients maintain operational excellence and project continuity.
                    </p>
                  </div>

                  <div className="group relative pt-6 pb-8 border-t border-white/10 hover:border-gold/30 transition-colors duration-500 cursor-default">
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-gold group-hover:w-1/3 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                    <p className="text-lg md:text-xl text-surface/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Our approach combines technical understanding, responsive customer service, and a commitment to long-term partnerships. We work closely with EPC contractors, ADNOC-associated projects, fabricators, and industrial clients to deliver dependable support in highly demanding environments.
                    </p>
                  </div>

                  <div className="group relative pt-6 pb-2 border-t border-white/10 hover:border-gold/30 transition-colors duration-500 cursor-default border-b group-hover:border-b-white/10">
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-gold group-hover:w-1/3 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                    <div className="absolute bottom-[-1px] left-0 w-0 h-[2px] bg-gold group-hover:w-1/3 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                    <p className="text-lg md:text-xl text-surface/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      At Verta Core, we believe industrial supply is more than procurement — it is about building confidence, reducing operational risk, and ensuring every project receives the right solution at the right time.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Industries We Serve */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal delay={0.1}>
                <div className="card-glass p-8 md:p-10 border-t-4 border-t-gold shadow-2xl shadow-black/20">
                  <SectionLabel className="mb-4">Sectors</SectionLabel>
                  <h3 className="text-2xl md:text-3xl font-bold text-surface mb-8 tracking-tight">Industries We Serve</h3>
                  <div className="flex flex-col gap-3.5">
                    {[
                      "Oil & Gas",
                      "EPC & Infrastructure Projects",
                      "Petrochemical Facilities",
                      "Fabrication & Manufacturing",
                      "Marine & Offshore",
                      "Utilities & Industrial Operations",
                    ].map((industry) => (
                      <div key={industry} tabIndex={0} className="flex items-center gap-4 p-4 rounded-xl bg-surface/5 hover:bg-surface/10 focus:bg-surface/10 active:bg-surface/10 border border-surface/5 transition-colors group outline-none cursor-default">
                        <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 group-focus:bg-gold/20 group-active:bg-gold/20 transition-colors">
                          <CheckCircle className="h-4 w-4 text-gold" />
                        </div>
                        <span className="text-[17px] font-bold text-surface group-hover:text-gold group-focus:text-gold group-active:text-gold transition-colors">{industry}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>
        </div>
      </section>

      {/* Sub-page links */}
      <section className="pb-16 md:pb-24 pt-4 bg-navy">
        <div className="container-base max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Our Story Link */}
            <TapLink
              href="/about/story"
              tabIndex={0}
              className="group p-8 rounded-2xl bg-navy-dark border border-steel/10 hover:border-gold/30 focus:border-gold/30 active:border-gold/30 hover:-translate-y-1 focus:-translate-y-1 active:-translate-y-1 active:scale-95 transition-all duration-300 hover:shadow-2xl focus:shadow-2xl hover:shadow-gold/5 focus:shadow-gold/5 relative overflow-hidden outline-none"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 group-focus:scale-150 group-active:scale-150 duration-500" />

              {/* Hover Particles */}
              <div className="absolute top-10 right-14 w-1.5 h-1.5 bg-gold rounded-full opacity-0 group-hover:opacity-80 group-focus:opacity-80 group-active:opacity-80 transition-all duration-700 translate-y-8 group-hover:-translate-y-4 group-focus:-translate-y-4 group-active:-translate-y-4 shadow-[0_0_8px_rgba(255,191,0,0.8)]" />
              <div className="absolute bottom-12 right-8 w-2 h-2 bg-gold/60 rounded-full opacity-0 group-hover:opacity-60 group-focus:opacity-60 group-active:opacity-60 transition-all duration-1000 translate-x-4 group-hover:-translate-x-6 group-focus:-translate-x-6 group-active:-translate-x-6 group-hover:-translate-y-8 group-focus:-translate-y-8 group-active:-translate-y-8 blur-[1px]" />
              <div className="absolute top-1/2 right-5 w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-all duration-500 translate-y-4 group-hover:-translate-y-6 group-focus:-translate-y-6 group-active:-translate-y-6 shadow-[0_0_5px_rgba(255,191,0,1)]" />

              <h3 className="text-xl font-bold text-surface mb-3 group-hover:text-gold group-focus:text-gold group-active:text-gold transition-colors relative z-10">
                Our Story
              </h3>
              <p className="text-sm text-surface/60 leading-relaxed mb-6 relative z-10">How Verta Core was founded and built into an industry leader.</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-gold relative z-10">
                Read our story <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 group-focus:translate-x-1 group-active:translate-x-1 transition-transform" />
              </div>
            </TapLink>

            <TapLink
              href="/about/mission"
              tabIndex={0}
              className="group p-8 rounded-2xl bg-navy-dark border border-steel/10 hover:border-gold/30 focus:border-gold/30 active:border-gold/30 hover:-translate-y-1 focus:-translate-y-1 active:-translate-y-1 active:scale-95 transition-all duration-300 hover:shadow-2xl focus:shadow-2xl hover:shadow-gold/5 focus:shadow-gold/5 relative overflow-hidden outline-none"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 group-focus:scale-150 group-active:scale-150 duration-500" />

              {/* Hover Particles */}
              <div className="absolute top-10 right-14 w-1.5 h-1.5 bg-gold rounded-full opacity-0 group-hover:opacity-80 group-focus:opacity-80 group-active:opacity-80 transition-all duration-700 translate-y-8 group-hover:-translate-y-4 group-focus:-translate-y-4 group-active:-translate-y-4 shadow-[0_0_8px_rgba(255,191,0,0.8)]" />
              <div className="absolute bottom-12 right-8 w-2 h-2 bg-gold/60 rounded-full opacity-0 group-hover:opacity-60 group-focus:opacity-60 group-active:opacity-60 transition-all duration-1000 translate-x-4 group-hover:-translate-x-6 group-focus:-translate-x-6 group-active:-translate-x-6 group-hover:-translate-y-8 group-focus:-translate-y-8 group-active:-translate-y-8 blur-[1px]" />
              <div className="absolute top-1/2 right-5 w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-all duration-500 translate-y-4 group-hover:-translate-y-6 group-focus:-translate-y-6 group-active:-translate-y-6 shadow-[0_0_5px_rgba(255,191,0,1)]" />

              <h3 className="text-xl font-bold text-surface mb-3 group-hover:text-gold group-focus:text-gold group-active:text-gold transition-colors relative z-10">
                Mission &amp; Values
              </h3>
              <p className="text-sm text-surface/60 leading-relaxed mb-6 relative z-10">The principles that guide every decision and relationship.</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-gold relative z-10">
                Explore values <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 group-focus:translate-x-1 group-active:translate-x-1 transition-transform" />
              </div>
            </TapLink>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
