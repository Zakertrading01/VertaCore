import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Target, Shield, Handshake, Globe } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";



export const metadata: Metadata = buildMetadata({
  title: "Mission & Values",
  description:
    "VERTA CORE's mission and operating values — quality assurance, compliance-first, enterprise partnership, and reliable global sourcing.",
  path: "/about/mission",
});

const coreValues = [
  "Integrity",
  "Reliability",
  "Quality",
  "Accountability",
  "Customer Commitment",
  "Operational Excellence",
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

      <header className="bg-navy-dark pt-16 lg:pt-32 pb-8">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Company</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Mission <span className="text-gold">Statement.</span>
          </h1>
        </div>
      </header>

      {/* Unified Mission, Vision & Values Section */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-20 bg-navy">
        <div className="container-base max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
            
            {/* Left Column: Mission & Vision */}
            <div className="lg:col-span-7 space-y-12 md:space-y-16">
              {/* Mission Statement */}
              <ScrollReveal>
                <div>
                  <SectionLabel className="mb-6">Our Mission</SectionLabel>
                  <div className="space-y-6 text-lg md:text-xl text-surface/90 leading-relaxed border-l-2 border-gold pl-6">
                    <p>
                      To be a trusted industrial solutions partner delivering quality, reliability, and operational value to the energy, industrial, and infrastructure sectors.
                    </p>
                    <p>
                      We are committed to supporting our clients through dependable products, responsive service, technical expertise, and long-term partnerships built on integrity and performance.
                    </p>
                    <p>
                      Our mission is to contribute to safer, more efficient, and more productive industrial operations by consistently delivering solutions that meet the highest standards of quality and professionalism.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Vision Statement */}
              <ScrollReveal delay={0.1}>
                <div className="bg-navy-dark p-8 md:p-10 rounded-2xl border border-steel/10 relative overflow-hidden shadow-2xl shadow-black/20">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/50 to-gold/10" />
                  <SectionLabel className="mb-5">Our Vision</SectionLabel>
                  <blockquote className="text-2xl md:text-3xl lg:text-[32px] font-bold text-surface leading-snug tracking-tight">
                    "To become a recognized regional leader in industrial supply and project support solutions, known for excellence, trust, and customer commitment."
                  </blockquote>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Core Values */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.2} className="h-full">
                <div className="card-glass p-8 md:p-10 h-full flex flex-col border-t-4 border-t-gold shadow-2xl shadow-black/20">
                  <SectionLabel className="mb-4">Our Core Values</SectionLabel>
                  <h2 className="text-2xl md:text-3xl font-bold text-surface mb-8 tracking-tight">
                    The principles behind every decision.
                  </h2>
                  
                  <div className="flex flex-col gap-4 mt-auto">
                    {coreValues.map((value, i) => (
                      <div 
                        key={value} 
                        className="flex items-center gap-5 p-4 md:p-5 rounded-xl bg-surface/5 hover:bg-surface/10 transition-colors border border-surface/5 group"
                      >
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                          <div className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-gold shadow-[0_0_10px_rgba(255,191,0,0.5)]" />
                        </div>
                        <h3 className="text-lg md:text-[19px] font-bold text-surface group-hover:text-gold transition-colors">{value}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

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
            About VERTA CORE
          </Link>
        </div>
      </div>
    </>
  );
}
