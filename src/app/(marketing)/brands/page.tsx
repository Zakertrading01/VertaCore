import type { Metadata } from "next";
import Link from "next/link";
import { TapLink } from "@/components/shared/TapLink";
import Image from "next/image";
import { ArrowRight, ExternalLink, Globe, ShieldCheck, FileCheck, Layers, Zap, Cpu, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";
import { getBrands } from "@/lib/cached-queries";
import { ClickParticles } from "@/components/shared/ClickParticles";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: "Brands & Partners",
  description:
    "VERTACORE sources from internationally recognised industrial brands across safety, welding, lifting, and abrasives. Our vendor network signals the quality of our supply relationships.",
  path: "/brands",
  keywords: ["industrial brands", "safety equipment brands", "welding brands", "vertacore partners"],
});

export default async function BrandsPage() {
  const brands = await getBrands();

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      {/* Header */}
      <header className="bg-navy-dark pt-24 lg:pt-32 pb-8 relative overflow-hidden">
        <div className="container-base relative z-10">
          <Breadcrumb items={breadcrumb} className="mb-8" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Side: Title */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 text-surface">
                  Global Sourcing <br />
                  <span className="relative inline-block mt-2">
                    {/* Glowing animated backdrop */}
                    <span className="absolute inset-0 blur-lg text-[#FFD700] opacity-50 animate-pulse" aria-hidden="true">
                      Excellence.
                    </span>
                    {/* Sharp foreground text */}
                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#FFD700] drop-shadow-sm">
                      Excellence.
                    </span>
                  </span>
                </h1>
                <p className="text-base md:text-lg font-medium text-surface/90 leading-snug border-l-2 border-gold pl-4">
                  Delivering Quality Through a Trusted International Supply Network.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7">
              <div className="relative p-6 md:p-8 rounded-[2rem] bg-gradient-to-b from-surface/10 to-transparent border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden">
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                <div className="relative z-10 space-y-5">
                  <ScrollReveal delay={0.1}>
                    <p className="text-sm md:text-base font-medium text-surface leading-relaxed">
                      Verta Core partners with carefully selected manufacturers across key global markets to provide <span className="text-gold font-bold">reliable products &amp; solutions</span> for the energy, oil &amp; gas, infrastructure, fabrication, and industrial sectors.
                    </p>
                  </ScrollReveal>
                  
                  <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent opacity-50"></div>
                  
                  <ScrollReveal delay={0.2}>
                    <p className="text-sm md:text-base text-surface/70 leading-relaxed font-light">
                      Our sourcing philosophy is built on one principle: <strong className="font-medium text-surface">every product supplied must meet the standards of quality, performance, and reliability expected by mission-critical projects.</strong> Through a robust international network, we connect our clients with proven industrial solutions that support operational continuity and project success.
                    </p>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.3}>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:bg-white/10 transition-colors duration-300">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold"></div>
                      <p className="text-sm md:text-sm text-surface/80 leading-relaxed pl-2">
                        Whether supporting EPC contractors, ADNOC projects, fabrication facilities, or industrial operators, our focus remains the same—<span className="text-white font-medium">delivering dependable products backed by technical expertise and responsive service.</span> This positioning aligns with the company’s industrial supply focus and existing service offerings.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>



      {/* Why Our Sourcing Network Matters */}
      <section className="pt-8 pb-6 bg-navy border-t border-white/5 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container-base relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-surface mb-4 tracking-tight whitespace-nowrap">
                Why Our Sourcing <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">Network Matters</span>
              </h2>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {/* Card 1 */}
            <ScrollReveal delay={0.1}>
              <ClickParticles className="group bg-surface/5 border border-gold/20 p-4 rounded-2xl h-full shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_30px_rgba(255,215,0,0.25)] hover:bg-surface/10 hover:border-gold/40 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-surface mb-2 group-hover:text-gold transition-colors">Quality-Driven Selection</h3>
                <p className="text-white/80 leading-relaxed text-sm md:text-sm">
                  We work with manufacturers and suppliers that demonstrate consistent product quality, manufacturing excellence, and compliance with internationally recognized standards.
                </p>
              </ClickParticles>
            </ScrollReveal>
            
            {/* Card 2 */}
            <ScrollReveal delay={0.2}>
              <ClickParticles className="group bg-surface/5 border border-gold/20 p-4 rounded-2xl h-full shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_30px_rgba(255,215,0,0.25)] hover:bg-surface/10 hover:border-gold/40 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                  <Globe className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-surface mb-2 group-hover:text-gold transition-colors">Global Reach, Local Support</h3>
                <p className="text-white/80 leading-relaxed text-sm md:text-sm">
                  Our sourcing network spans multiple international markets, enabling us to identify the right solutions while providing local support, faster response times, and efficient project coordination.
                </p>
              </ClickParticles>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal delay={0.3}>
              <ClickParticles className="group bg-surface/5 border border-gold/20 p-4 rounded-2xl h-full shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_30px_rgba(255,215,0,0.25)] hover:bg-surface/10 hover:border-gold/40 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                  <FileCheck className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-surface mb-2 group-hover:text-gold transition-colors">Compliance &amp; Traceability</h3>
                <p className="text-white/80 leading-relaxed text-sm md:text-sm">
                  We understand the stringent requirements of industrial and energy-sector projects. Our procurement processes prioritize documentation, traceability, and adherence to project specifications.
                </p>
              </ClickParticles>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal delay={0.4}>
              <ClickParticles className="group bg-surface/5 border border-gold/20 p-4 rounded-2xl h-full shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_30px_rgba(255,215,0,0.25)] hover:bg-surface/10 hover:border-gold/40 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                  <Layers className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-surface mb-2 group-hover:text-gold transition-colors">Reliable Supply Continuity</h3>
                <p className="text-white/80 leading-relaxed text-sm md:text-sm">
                  By maintaining strong relationships across our supplier network, we help clients mitigate procurement risks, reduce delays, and maintain operational efficiency.
                </p>
              </ClickParticles>
            </ScrollReveal>
          </div>
        </div>
      </section>



      {/* Industries & Commitment */}
      <section className="pt-8 pb-4 md:pb-6 bg-navy-dark">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/5 border border-white/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(255,215,0,0.5)]"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-surface/80">Sectors</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-surface mb-8 tracking-tight">Industries We Support</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                {[
                  "Oil & Gas",
                  "Energy & Utilities",
                  "EPC & Infrastructure Projects",
                  "Fabrication & Manufacturing",
                  "Marine & Offshore",
                  "Petrochemical Facilities",
                  "Industrial Maintenance"
                ].map((item, idx) => (
                  <li key={idx} className="group flex items-center gap-4 bg-surface/5 px-5 py-4 rounded-xl border border-white/5 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                    <div className="w-2 h-2 rounded-full bg-gold/50 group-hover:bg-gold group-hover:scale-150 transition-all duration-300 flex-shrink-0 shadow-[0_0_5px_rgba(255,215,0,0.5)]" />
                    <span className="font-medium text-surface/90 text-sm md:text-base group-hover:text-gold transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/5 border border-white/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(255,215,0,0.5)]"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-surface/80">Philosophy</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-surface mb-8 tracking-tight">Our Commitment</h2>
              
              <div className="relative p-8 md:p-10 rounded-[2rem] bg-surface/5 border border-white/5 backdrop-blur-md shadow-2xl overflow-hidden group hover:border-gold/20 transition-all duration-500">
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-gold via-gold/50 to-transparent group-hover:w-2 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10 space-y-6 text-base md:text-lg text-surface/70 leading-relaxed pl-2 font-light">
                  <p className="text-white font-medium text-lg md:text-xl leading-snug">
                    At Verta Core, supplier selection is not based solely on availability—<span className="text-gold font-bold">it is based on trust, performance, and long-term reliability.</span>
                  </p>
                  <p>
                    Every sourcing decision is guided by our commitment to delivering products that contribute to safer operations, greater efficiency, and successful project outcomes.
                  </p>
                  <p>
                    We continuously strengthen our international supply network to ensure our clients have access to dependable industrial solutions whenever and wherever they are needed.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Custom Call To Action Section */}
      <section className="relative pt-4 md:pt-6 pb-6 md:pb-8 overflow-hidden bg-[#1C3256]">
        {/* Glowing Background Elements */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-gold/15 to-transparent rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Inner Glow Line at Top */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
        
        <div className="container-base relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 relative z-10">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-[1.1]">
                  Looking for a Reliable <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">Industrial Supply</span> Partner?
                </h2>
                
                <p className="text-base md:text-lg text-white/80 mb-6 max-w-2xl leading-relaxed font-light">
                  Whether you require project-specific procurement, technical sourcing support, or ongoing industrial supply solutions, our team is ready to assist.
                </p>
                
                <div className="flex flex-wrap gap-4 group">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 bg-gold text-navy-dark font-extrabold px-8 py-4 rounded-2xl hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(255,215,0,0.2)] hover:shadow-[0_15px_30px_rgba(255,215,0,0.4)]"
                  >
                    Discuss Your Requirement
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="lg:col-span-5 relative z-10">
              <ScrollReveal delay={0.2}>
                <div className="bg-surface/5 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden group/card hover:border-gold/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                  <ul className="space-y-6 relative z-10">
                    {[
                      "Technical Procurement Support",
                      "Project Supply Solutions",
                      "Fast Response & Quotations",
                      "UAE-Wide Delivery Support"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-white font-medium text-lg md:text-xl group/item">
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 group-hover/item:bg-gold transition-all duration-300 shadow-[0_0_10px_rgba(255,215,0,0.1)]">
                          <svg className="w-6 h-6 text-gold group-hover/item:text-navy-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="group-hover/item:translate-x-1 group-hover/item:text-gold transition-all duration-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Global Sourcing Network Map */}
      <section className="pt-6 md:pt-8 pb-0 bg-[#070E16] relative overflow-hidden border-t border-white/5">
        
        {/* --- PREMIUM MODERN BACKGROUND UI --- */}
        
        {/* 1. Core Ambient Gradient Base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d1d33] via-[#070E16] to-[#04080D] pointer-events-none z-0"></div>

        {/* 2. Technical Architectural Grid */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-40" 
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
          }}
        />

        {/* 3. Dynamic Light Leaks / Orbs */}
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-gold/10 blur-[130px] rounded-full pointer-events-none z-0 mix-blend-screen"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[500px] bg-blue-500/10 blur-[150px] rounded-[100%] pointer-events-none z-0 mix-blend-screen"></div>

        {/* 4. Elegant Top Edge Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-80 z-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[40px] bg-gold/5 blur-[20px] pointer-events-none z-10"></div>

        <div className="container-base relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-2 md:mb-4 relative z-20">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-2 relative inline-block">
                {/* Ambient glow behind the text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-gold/10 blur-[25px] rounded-[100%] pointer-events-none z-0"></div>
                
                <span className="relative z-10 text-white [text-shadow:0_0_20px_rgba(255,255,255,0.6),0_0_40px_rgba(255,255,255,0.2)]">Our Sourcing</span>{" "}
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#B8860B] [filter:drop-shadow(0_0_15px_rgba(255,215,0,0.6))]">Network</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Modern Sleek World Map Container with Gold Connection Lines */}
          <div className="relative w-full aspect-[2/1] mt-2 md:mt-4 mb-[-2%] md:mb-[-3%] lg:mb-[-5%] pointer-events-none">
            <style>{`
              @keyframes dash-flow {
                to { stroke-dashoffset: -20; }
              }
              .animate-dash {
                animation: dash-flow 1s linear infinite;
              }
            `}</style>
            
            <ScrollReveal className="w-full h-full relative pointer-events-auto">
              
              {/* Actual World Map Graphic (Gold Colored via CSS Mask) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-full h-full bg-gradient-to-br from-[#FFD700] via-[#D4AF37] to-[#B8860B] opacity-[0.25]"
                  style={{
                    maskImage: "url('/images/clean-world.svg')",
                    maskSize: '100% 100%',
                    maskPosition: 'center',
                    maskRepeat: 'no-repeat',
                    WebkitMaskImage: "url('/images/clean-world.svg')",
                    WebkitMaskSize: '100% 100%',
                    WebkitMaskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat'
                  }}
                />
              </div>

              {/* Gold Connection Lines (SVG Overlay) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 500" preserveAspectRatio="none">
                {/* Connecting outer regions to GCC (605, 180) */}
                {[
                  { x: 505, y: 120 }, // Europe
                  { x: 685, y: 185 }, // India
                  { x: 770, y: 145 }, // China
                  { x: 820, y: 140 }, // South Korea
                  { x: 845, y: 145 }, // Japan
                ].map((point, i) => (
                  <path 
                    key={i}
                    d={`M ${point.x} ${point.y} Q ${(point.x + 605) / 2} ${Math.min(point.y, 180) - 50} 605 180`}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    className="animate-[dash-flow_20s_linear_infinite] opacity-60"
                  />
                ))}
                
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#FFD700" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Animated Region Markers accurately placed over the continents */}
              {[
                { id: "Europe", top: "24%", left: "50.5%", align: "center" },
                { id: "GCC", top: "36%", left: "60.5%", align: "center" },
                { id: "India", top: "37%", left: "68.5%", align: "center" },
                { id: "China", top: "29%", left: "77%", align: "center" },
                { id: "South Korea", top: "28%", left: "82%", align: "center", yOffset: "mb-16 md:mb-[4.5rem]" },
                { id: "Japan", top: "29%", left: "84.5%", align: "right" }
              ].map((region, idx) => (
                <div 
                  key={idx} 
                  className="absolute group cursor-pointer z-20" 
                  style={{ top: region.top, left: region.left, transform: 'translate(-50%, -50%)' }}
                >
                  <ScrollReveal delay={0.5 + (idx * 0.15)}>
                    <div className="relative w-0 h-0 flex items-center justify-center">
                      {/* Shadow base (3D floor) */}
                      <div className="absolute w-3 h-1 md:w-5 md:h-1.5 bg-black/60 blur-[1px] rounded-[100%]"></div>
                      
                      {/* 3D Ripple Effect (tilted to match the floor) */}
                      <div className="absolute w-6 h-6 md:w-10 md:h-10 bg-gold rounded-full opacity-40 animate-ping" style={{ transform: 'rotateX(70deg)' }}></div>
                      
                      {/* 3D Pin Icon (bouncing) */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-8 md:w-8 md:h-10 origin-bottom hover:-translate-y-2 transition-transform duration-300 z-40">
                        <div className="w-full h-full animate-bounce" style={{ animationDuration: `${2 + (idx % 3) * 0.2}s` }}>
                          <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_8px_6px_rgba(0,0,0,0.5)]">
                            <defs>
                              <linearGradient id={`pinGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFF4D0" />
                                <stop offset="25%" stopColor="#E7C85A" />
                                <stop offset="70%" stopColor="#D4AF37" />
                                <stop offset="100%" stopColor="#8B6508" />
                              </linearGradient>
                              <linearGradient id={`innerGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1a3660" />
                                <stop offset="100%" stopColor="#0A1628" />
                              </linearGradient>
                            </defs>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 8.25 12 24 12 24s12-15.75 12-24c0-6.627-5.373-12-12-12z" fill={`url(#pinGrad-${idx})`} />
                            <circle cx="12" cy="12" r="5" fill={`url(#innerGrad-${idx})`} />
                            <circle cx="10" cy="10" r="1.5" fill="white" fillOpacity="0.8" />
                            <path d="M4 12c0-4.418 3.582-8 8-8 2.5 0 4.7 1.1 6.2 2.9C16.8 4.4 14.5 3 12 3 7.029 3 3 7.029 3 12c0 1.5.4 2.9 1 4.1C4 14.7 4 13.4 4 12z" fill="white" fillOpacity="0.4" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Tooltip / Label - Permanently visible */}
                      <div className={`absolute bottom-full ${region.yOffset || 'mb-10 md:mb-12'} ${region.align === 'left' ? 'right-1/2 mr-2 md:mr-3' : region.align === 'right' ? 'left-1/2 ml-2 md:ml-3' : 'left-1/2 -translate-x-1/2'} bg-[#0d1524]/95 backdrop-blur-md border border-gold/30 px-2 md:px-3 py-1 md:py-1.5 rounded shadow-[0_5px_15px_rgba(0,0,0,0.5)] opacity-100 -translate-y-2 group-hover:-translate-y-3 group-hover:border-gold/60 group-hover:shadow-[0_5px_20px_rgba(255,215,0,0.3)] transition-all duration-300 pointer-events-none whitespace-nowrap z-50 flex items-center gap-1.5 md:gap-2`}>
                        <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 text-gold" />
                        <span className="text-[9px] md:text-xs font-bold text-white tracking-widest uppercase">{region.id}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Brands Marquee Banner */}
      <div className="bg-navy-dark border-y border-white/5 py-4 md:py-6 relative z-20 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Unique Golden Ambient Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] md:w-[800px] h-[60px] md:h-[120px] bg-gold/10 blur-[40px] md:blur-[60px] rounded-[100%] pointer-events-none z-0"></div>
        
        {/* Center Edge Highlighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] md:w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent shadow-[0_0_15px_rgba(255,215,0,0.8)] z-20"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] md:w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent shadow-[0_0_15px_rgba(255,215,0,0.8)] z-20"></div>
        
        {/* Gradient fades for smooth entry/exit */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-navy-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-navy-dark to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex overflow-hidden group">
          {/* Container 1 */}
          <div className="flex animate-marquee shrink-0 items-center gap-12 md:gap-20 pr-12 md:pr-20 min-w-full">
            {[
              { name: 'Techweld', src: '/brands/techweld.jpeg' },
              { name: 'Weldman', src: '/brands/weldman.jpeg' },
              { name: 'Rigman', src: '/brands/rigman.png' },
              { name: 'Superon', src: '/brands/superon.jpeg' },
              { name: 'Gasiq', src: '/brands/gasiq.jpeg' },
              { name: 'Geotex', src: '/brands/geotex.jpeg' },
              { name: 'Sakura', src: '/brands/sakura.jpeg' },
              { name: 'Techweld', src: '/brands/techweld.jpeg' },
              { name: 'Weldman', src: '/brands/weldman.jpeg' },
              { name: 'Rigman', src: '/brands/rigman.png' },
              { name: 'Superon', src: '/brands/superon.jpeg' },
              { name: 'Gasiq', src: '/brands/gasiq.jpeg' },
              { name: 'Geotex', src: '/brands/geotex.jpeg' },
              { name: 'Sakura', src: '/brands/sakura.jpeg' },
            ].map((brand, idx) => (
              <div key={`c1-${idx}`} className="relative w-32 h-16 md:w-48 md:h-24 shrink-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300">
                <Image 
                  src={brand.src} 
                  alt={brand.name} 
                  fill 
                  className="object-contain" 
                />
              </div>
            ))}
          </div>
          
          {/* Container 2 (Perfect identical clone for seamless looping) */}
          <div className="flex animate-marquee shrink-0 items-center gap-12 md:gap-20 pr-12 md:pr-20 min-w-full">
            {[
              { name: 'Techweld', src: '/brands/techweld.jpeg' },
              { name: 'Weldman', src: '/brands/weldman.jpeg' },
              { name: 'Rigman', src: '/brands/rigman.png' },
              { name: 'Superon', src: '/brands/superon.jpeg' },
              { name: 'Gasiq', src: '/brands/gasiq.jpeg' },
              { name: 'Geotex', src: '/brands/geotex.jpeg' },
              { name: 'Sakura', src: '/brands/sakura.jpeg' },
              { name: 'Techweld', src: '/brands/techweld.jpeg' },
              { name: 'Weldman', src: '/brands/weldman.jpeg' },
              { name: 'Rigman', src: '/brands/rigman.png' },
              { name: 'Superon', src: '/brands/superon.jpeg' },
              { name: 'Gasiq', src: '/brands/gasiq.jpeg' },
              { name: 'Geotex', src: '/brands/geotex.jpeg' },
              { name: 'Sakura', src: '/brands/sakura.jpeg' },
            ].map((brand, idx) => (
              <div key={`c2-${idx}`} className="relative w-32 h-16 md:w-48 md:h-24 shrink-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300">
                <Image 
                  src={brand.src} 
                  alt={brand.name} 
                  fill 
                  className="object-contain" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Highlights Banner (Statistics Section) */}
      <div className="bg-gradient-to-r from-navy-dark via-[#0d1524] to-navy-dark border-y border-gold/10 py-6 relative z-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="container-base overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-row items-center justify-start lg:justify-between gap-6 min-w-max pb-2 md:pb-0">
            
            {/* Title (No yellow border, modern inline style) */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-2 h-6 bg-gold rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
              <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.15em] text-white whitespace-nowrap">
                Statistics <span className="text-gold font-light">Section</span>
              </h3>
            </div>

            {/* Separator */}
            <div className="w-px h-8 bg-white/20 mx-2 shrink-0"></div>

            {/* Items */}
            <div className="flex flex-row items-center flex-1 gap-x-6 lg:gap-x-12 shrink-0">
              {[
                "Global Supplier Network",
                "Multiple Product Categories",
                "UAE & GCC Coverage",
                "Dedicated Technical Support"
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 group cursor-default shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-gold shadow-sm group-hover:shadow-[0_0_8px_rgba(255,215,0,0.8)] group-hover:scale-150 transition-all duration-300 shrink-0" />
                  <span className="text-white font-bold tracking-[0.05em] uppercase text-xs md:text-sm group-hover:text-gold transition-colors duration-300 whitespace-nowrap">{stat}</span>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>

      {/* Core Values / Icon Cards Section */}
      <section className="py-8 md:py-10 bg-navy relative overflow-hidden border-t border-gold/10">
        {/* Modern tech background patterns */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>
        
        {/* Deep ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full bg-gradient-to-r from-blue-900/10 via-gold/5 to-blue-900/10 blur-3xl pointer-events-none"></div>
        
        <div className="container-base relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {[
              { title: "Quality Assurance", icon: ShieldCheck, iconColor: "text-blue-400 group-hover:text-white", bgColor: "bg-blue-500/10 group-hover:bg-blue-600", glowColor: "group-hover:shadow-[0_5px_15px_rgba(37,99,235,0.4)]", accent: "from-blue-400 to-blue-600" },
              { title: "Global Sourcing", icon: Globe, iconColor: "text-emerald-400 group-hover:text-white", bgColor: "bg-emerald-500/10 group-hover:bg-emerald-600", glowColor: "group-hover:shadow-[0_5px_15px_rgba(16,185,129,0.4)]", accent: "from-emerald-400 to-emerald-600" },
              { title: "Compliance", icon: FileCheck, iconColor: "text-purple-400 group-hover:text-white", bgColor: "bg-purple-500/10 group-hover:bg-purple-600", glowColor: "group-hover:shadow-[0_5px_15px_rgba(168,85,247,0.4)]", accent: "from-purple-400 to-purple-600" },
              { title: "Fast Delivery", icon: Zap, iconColor: "text-orange-400 group-hover:text-white", bgColor: "bg-orange-500/10 group-hover:bg-orange-500", glowColor: "group-hover:shadow-[0_5px_15px_rgba(249,115,22,0.4)]", accent: "from-orange-400 to-orange-600" },
              { title: "Technical Expertise", icon: Cpu, iconColor: "text-rose-400 group-hover:text-white", bgColor: "bg-rose-500/10 group-hover:bg-rose-600", glowColor: "group-hover:shadow-[0_5px_15px_rgba(244,63,94,0.4)]", accent: "from-rose-400 to-rose-600" },
              { title: "Supply Reliability", icon: Layers, iconColor: "text-cyan-400 group-hover:text-white", bgColor: "bg-cyan-500/10 group-hover:bg-cyan-600", glowColor: "group-hover:shadow-[0_5px_15px_rgba(6,182,212,0.4)]", accent: "from-cyan-400 to-cyan-600" }
            ].map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="group relative bg-white/[0.03] backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:bg-white/[0.06] hover:border-gold/30 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col items-center justify-center text-center gap-3 h-full">
                  
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className={`w-12 h-12 shrink-0 rounded-xl ${feature.bgColor} flex items-center justify-center transition-all duration-500 shadow-sm ${feature.glowColor}`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor} transition-colors duration-500`} strokeWidth={2} />
                  </div>
                  
                  <h3 className="text-[13px] md:text-[14px] lg:text-[15px] font-extrabold text-white/90 leading-snug group-hover:text-gold transition-colors duration-300 relative z-10">
                    {feature.title}
                  </h3>
                  
                  {/* Bottom Line Indicator */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.accent} w-0 group-hover:w-full transition-all duration-700 ease-out`}></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
