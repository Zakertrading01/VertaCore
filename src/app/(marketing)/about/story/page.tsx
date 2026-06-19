import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Award, ShieldCheck, Target } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";
import Image from "next/image";



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

      <header className="bg-navy-dark pt-16 lg:pt-32 pb-2">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Our Story</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-4xl tracking-tight">
            Built on reliability <span className="text-gold">and operational trust.</span>
          </h1>
        </div>
      </header>

      <section className="pt-2 pb-8 md:pt-6 md:pb-12 bg-navy-dark">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left Side Content */}
            <ScrollReveal>
            <div className="pl-6 md:pl-8 border-l-2 border-gold">
              <p className="text-xl md:text-2xl text-surface font-medium leading-relaxed mb-8">
                Every successful industrial project is built on a foundation of reliability, trust, and timely execution. Verta Core was established with a clear purpose: to bridge the gap between project requirements and dependable industrial supply solutions.
              </p>

              <ul className="space-y-6 text-base md:text-lg text-surface/80 leading-relaxed">
                <li className="flex items-start gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2.5 shadow-[0_0_8px_rgba(255,215,0,0.6)] group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="group-hover:text-surface transition-colors duration-300">
                    With decades of combined industry experience behind our leadership and operations, we recognized a growing need for a supply partner that understands the realities of modern industrial projects—tight schedules, stringent specifications, uncompromising safety standards, and the constant demand for operational efficiency.
                  </span>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2.5 shadow-[0_0_8px_rgba(255,215,0,0.6)] group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="group-hover:text-surface transition-colors duration-300">
                    Verta Core was founded to meet these challenges head-on. We set out to create a company that combines technical expertise, responsive service, and a customer-first approach, enabling clients to focus on delivering successful projects while we ensure the right products and solutions are available when they are needed most.
                  </span>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2.5 shadow-[0_0_8px_rgba(255,215,0,0.6)] group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="group-hover:text-surface transition-colors duration-300">
                    Today, we proudly support EPC contractors, oil &amp; gas operators, fabrication companies, infrastructure developers, and industrial facilities across the UAE. Our commitment extends beyond supplying products; we build lasting partnerships based on transparency, accountability, and consistent performance.
                  </span>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2.5 shadow-[0_0_8px_rgba(255,215,0,0.6)] group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="group-hover:text-surface transition-colors duration-300">
                    As industries continue to evolve, our focus remains unchanged—to deliver quality, reliability, and value that help our clients move forward with confidence.
                  </span>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2.5 shadow-[0_0_8px_rgba(255,215,0,0.6)] group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="group-hover:text-surface transition-colors duration-300">
                    At Verta Core, our story is driven by a simple belief: strong partnerships and dependable solutions create lasting success.
                  </span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

            {/* Right Side Container */}
            <div className="flex flex-col gap-8 md:gap-10 self-start">
              {/* Top Image */}
              <ScrollReveal delay={0.2} className="relative w-full h-auto rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/5 group bg-[#070e16]">
                {/* Premium overlay glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-dark/40 via-transparent to-gold/10 z-10 pointer-events-none group-hover:opacity-50 transition-opacity duration-500 mix-blend-overlay"></div>
                
                <Image 
                  src="/images/our-story.jpg" 
                  alt="Verta Core Operational Trust" 
                  width={1920}
                  height={1280}
                  className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700"
                  priority
                />
              </ScrollReveal>

              {/* Bottom Core Values Stack - Ultra Modern */}
              <div className="flex flex-col gap-3 w-full">
                {/* Item 1 */}
                <ScrollReveal delay={0.4} className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a121d] to-[#070e16] border border-white/5 shadow-lg p-5 flex items-center justify-between hover:border-gold/30 transition-colors duration-500 cursor-default">
                  {/* Sweep Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center border border-gold/10 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(255,215,0,0.05)] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                      <Award className="w-6 h-6 text-gold" />
                    </div>
                    <span className="text-surface/70 font-medium tracking-wide uppercase text-sm md:text-base group-hover:text-surface transition-colors">Built on</span>
                  </div>
                  <span className="relative z-10 font-black text-xl md:text-2xl text-white tracking-tight group-hover:text-gold transition-colors duration-300 [text-shadow:0_0_0px_rgba(255,215,0,0)] group-hover:[text-shadow:0_0_20px_rgba(255,215,0,0.4)]">
                    Experience
                  </span>
                </ScrollReveal>

                {/* Item 2 */}
                <ScrollReveal delay={0.5} className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a121d] to-[#070e16] border border-white/5 shadow-lg p-5 flex items-center justify-between hover:border-gold/30 transition-colors duration-500 cursor-default">
                  {/* Sweep Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out delay-75 pointer-events-none"></div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center border border-gold/10 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(255,215,0,0.05)] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                      <ShieldCheck className="w-6 h-6 text-gold" />
                    </div>
                    <span className="text-surface/70 font-medium tracking-wide uppercase text-sm md:text-base group-hover:text-surface transition-colors">Driven by</span>
                  </div>
                  <span className="relative z-10 font-black text-xl md:text-2xl text-white tracking-tight group-hover:text-gold transition-colors duration-300 [text-shadow:0_0_0px_rgba(255,215,0,0)] group-hover:[text-shadow:0_0_20px_rgba(255,215,0,0.4)]">
                    Reliability
                  </span>
                </ScrollReveal>

                {/* Item 3 */}
                <ScrollReveal delay={0.6} className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a121d] to-[#070e16] border border-white/5 shadow-lg p-5 flex items-center justify-between hover:border-gold/30 transition-colors duration-500 cursor-default">
                  {/* Sweep Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out delay-150 pointer-events-none"></div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center border border-gold/10 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(255,215,0,0.05)] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                      <Target className="w-6 h-6 text-gold" />
                    </div>
                    <span className="text-surface/70 font-medium tracking-wide uppercase text-sm md:text-base group-hover:text-surface transition-colors">Focused on</span>
                  </div>
                  <span className="relative z-10 font-black text-xl md:text-2xl text-white tracking-tight group-hover:text-gold transition-colors duration-300 [text-shadow:0_0_0px_rgba(255,215,0,0)] group-hover:[text-shadow:0_0_20px_rgba(255,215,0,0.4)]">
                    Your Success
                  </span>
                </ScrollReveal>
              </div>
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
            About VERTACORE
          </Link>
        </div>
      </div>
    </>
  );
}
