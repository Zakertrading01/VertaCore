import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Award, ShieldCheck, Target, Quote } from "lucide-react";
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
      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-50vw) skewX(-25deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(120vw) skewX(-25deg); opacity: 0; }
        }
        .animate-sweep {
          animation: sweep 12s ease-in-out infinite;
        }
        @keyframes float-grid {
          0% { background-position: 0px 0px; }
          100% { background-position: 32px 32px; }
        }
        .animate-float-grid {
          animation: float-grid 4s linear infinite;
        }
        @keyframes autoFillText {
          0%, 5% { opacity: 0; }
          15%, 28% { opacity: 1; }
          33%, 100% { opacity: 0; }
        }
        @keyframes autoLineGrow {
          0%, 5% { width: 2rem; opacity: 0.6; }
          15%, 28% { width: 4rem; opacity: 1; background-color: white; }
          33%, 100% { width: 2rem; opacity: 0.6; }
        }
        .animate-auto-fill {
          animation: autoFillText 9s ease-in-out infinite;
        }
        .animate-auto-line {
          animation: autoLineGrow 9s ease-in-out infinite;
        }
        @keyframes particle-float {
          0% { transform: translateY(50px) scale(0); opacity: 0; }
          20% { opacity: 0.8; transform: translateY(0) scale(1); }
          80% { opacity: 0.8; transform: translateY(-200px) scale(1); }
          100% { transform: translateY(-250px) scale(0); opacity: 0; }
        }
        @keyframes word-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-word-zoom {
          animation: word-zoom 4s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes float-quote {
          0%, 100% { transform: translateY(0) rotate(-10deg); }
          50% { transform: translateY(-20px) rotate(-15deg); }
        }
        .animate-float-quote {
          animation: float-quote 8s ease-in-out infinite;
        }
        @keyframes float-quote-reverse {
          0%, 100% { transform: translateY(0) rotate(10deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        .animate-float-quote-reverse {
          animation: float-quote-reverse 8s ease-in-out infinite;
        }
        @keyframes laser-shoot {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-laser-shoot {
          animation: laser-shoot 3s ease-in-out infinite;
        }
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-subtle-bounce {
          animation: subtle-bounce 4s ease-in-out infinite;
        }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      <div className="relative bg-navy-dark overflow-hidden">
        {/* Global Page Glow - Stronger */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/30 via-gold/5 to-transparent pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/30 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s', animationDuration: '7s' }}></div>
        
        <header className="relative pt-16 lg:pt-32 pb-2 z-10">
          <div className="container-base">
            <Breadcrumb items={breadcrumb} className="mb-6" />
            <SectionLabel className="mb-3">Our Story</SectionLabel>
            <h1 className="text-dlg font-bold text-surface max-w-4xl tracking-tight">
              Built on reliability <span className="text-gold">and operational trust.</span>
            </h1>
          </div>
        </header>

        <section className="relative pt-2 pb-8 md:pt-6 md:pb-12 z-10">
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
                  src="/images/our-story-v2.png" 
                  alt="Verta Core Operational Trust" 
                  width={1920}
                  height={1280}
                  className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700"
                  priority
                />
              </ScrollReveal>

              {/* Orbital Core Visualization - Unique Non-Card Design */}
              <ScrollReveal delay={0.4} className="relative w-full h-[350px] md:h-[420px] flex items-center justify-center overflow-hidden group">
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                {/* Orbital System Container */}
                <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] flex items-center justify-center">
                  
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]">
                    {/* Orbiting Node 1 */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] md:text-xs uppercase tracking-widest text-blue-400 font-bold whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'spin 20s linear infinite reverse' }}>Global Network</div>
                    </div>
                    {/* Orbiting Node 2 */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <div className="w-3 h-3 rounded-full bg-white/50 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/50 font-bold whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'spin 20s linear infinite reverse' }}>Dependability</div>
                    </div>
                  </div>

                  {/* Middle Ring */}
                  <div className="absolute inset-[40px] md:inset-[50px] rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]">
                    {/* Orbiting Node 3 */}
                    <div className="absolute top-1/2 -left-2 -translate-y-1/2">
                      <div className="w-4 h-4 rounded-full bg-gold shadow-[0_0_20px_rgba(255,215,0,0.8)]"></div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs uppercase tracking-widest text-gold font-bold whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'spin 15s linear infinite' }}>Timely Execution</div>
                    </div>
                  </div>

                  {/* Inner Ring */}
                  <div className="absolute inset-[80px] md:inset-[100px] rounded-full border border-gold/20 animate-[spin_8s_linear_infinite]">
                     {/* Orbiting Node 4 */}
                     <div className="absolute top-[15%] right-[15%]">
                       <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
                     </div>
                     {/* Orbiting Node 5 */}
                     <div className="absolute bottom-[15%] left-[15%]">
                       <div className="w-2 h-2 rounded-full bg-gold/50 shadow-[0_0_10px_rgba(255,215,0,0.5)] animate-pulse"></div>
                     </div>
                  </div>

                  {/* Center Core */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#0a121d] to-[#04080e] border border-gold/30 shadow-[0_0_40px_rgba(255,215,0,0.15)] flex items-center justify-center z-10 group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(255,215,0,0.3)] transition-all duration-700">
                    <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-2 rounded-full border border-blue-500/20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                    <span className="text-gold font-black text-[10px] md:text-xs tracking-[0.2em] uppercase text-center leading-tight drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">Verta<br/>Core</span>
                  </div>

                  {/* Radiating Connectors (Appear on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent -translate-y-1/2"></div>
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent -translate-y-1/2 rotate-45"></div>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent -translate-y-1/2 -rotate-45"></div>
                  </div>

                </div>
              </ScrollReveal>

            </div>
          </div>
        </div>
        </section>
      </div>

      {/* Modern Dynamic Animated Quotes Section */}
      <section className="relative overflow-hidden border-t border-white/5 bg-[#0A101D]">
        
        {/* Visible Floating Orbs Animation Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-blue-600/40 blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-[40vw] h-[40vw] bg-gold/30 blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
          <div className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] bg-indigo-500/30 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
          
          {/* Glowing Particles System */}
          <div className="absolute inset-0 overflow-hidden z-10">
            <div className="absolute w-1 h-1 rounded-full bg-gold shadow-[0_0_8px_rgba(250,204,21,1)] left-[10%] top-[80%] opacity-0" style={{ animation: 'particle-float 8s linear infinite 1s' }} />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,1)] left-[25%] top-[60%] opacity-0" style={{ animation: 'particle-float 12s linear infinite 3s' }} />
            <div className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] left-[40%] top-[90%] opacity-0" style={{ animation: 'particle-float 9s linear infinite 0s' }} />
            <div className="absolute w-2 h-2 rounded-full bg-gold/50 shadow-[0_0_12px_rgba(250,204,21,0.8)] left-[55%] top-[70%] opacity-0" style={{ animation: 'particle-float 15s linear infinite 4s' }} />
            <div className="absolute w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)] left-[70%] top-[85%] opacity-0" style={{ animation: 'particle-float 10s linear infinite 2s' }} />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)] left-[85%] top-[50%] opacity-0" style={{ animation: 'particle-float 14s linear infinite 6s' }} />
            <div className="absolute w-1 h-1 rounded-full bg-gold shadow-[0_0_8px_rgba(250,204,21,1)] left-[15%] top-[30%] opacity-0" style={{ animation: 'particle-float 11s linear infinite 5s' }} />
            <div className="absolute w-2 h-2 rounded-full bg-blue-400/50 shadow-[0_0_12px_rgba(59,130,246,0.8)] left-[35%] top-[40%] opacity-0" style={{ animation: 'particle-float 13s linear infinite 1.5s' }} />
            <div className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] left-[65%] top-[20%] opacity-0" style={{ animation: 'particle-float 8s linear infinite 3.5s' }} />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(250,204,21,1)] left-[80%] top-[10%] opacity-0" style={{ animation: 'particle-float 16s linear infinite 2.5s' }} />
            <div className="absolute w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)] left-[5%] top-[55%] opacity-0" style={{ animation: 'particle-float 9.5s linear infinite 0.5s' }} />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)] left-[95%] top-[75%] opacity-0" style={{ animation: 'particle-float 11.5s linear infinite 4.5s' }} />
          </div>

          <div className="absolute inset-0 bg-[#0A101D]/40 backdrop-blur-md z-20"></div>
          {/* Subtle noise for premium texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay z-30"></div>
        </div>
        
        <div className="px-6 md:px-12 relative z-40 w-full">
          <ScrollReveal delay={0.2} className="w-full">
            {/* Highly Unique Animated Typography Layout */}
            <div className="relative w-full flex flex-col items-center justify-center py-4 md:py-6 px-2 md:px-4 bg-transparent">
              
              {/* Deep Aurora Background with enhanced pulse */}
              <div className="absolute top-[-20%] left-[10%] w-[60%] h-[140%] bg-blue-600/30 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>
              <div className="absolute bottom-[-20%] right-[10%] w-[50%] h-[120%] bg-gold/20 blur-[130px] rounded-full pointer-events-none z-0 animate-pulse" style={{ animationDelay: '2s', animationDuration: '7s' }}></div>
              
              {/* Massive Floating Background Typographic Quotes */}
              <div className="absolute left-[2%] md:left-[10%] top-[10%] md:top-[15%] text-[25vw] md:text-[18vw] leading-none text-gold/10 font-[family-name:var(--font-cinzel)] drop-shadow-[0_0_30px_rgba(255,215,0,0.3)] animate-float-quote pointer-events-none z-0 select-none">
                &ldquo;
              </div>
              <div className="absolute right-[2%] md:right-[10%] bottom-[10%] md:bottom-[5%] text-[25vw] md:text-[18vw] leading-none text-gold/10 font-[family-name:var(--font-cinzel)] drop-shadow-[0_0_30px_rgba(255,215,0,0.3)] animate-float-quote-reverse pointer-events-none z-0 select-none">
                &rdquo;
              </div>

              {/* Pure Text Layout (No Boxes) */}
              <div className="relative z-10 flex flex-nowrap items-center justify-center gap-2 md:gap-8 w-full max-w-[100vw] mx-auto cursor-default text-center px-2">
                 
                 {/* Bouncing Inline Quote */}
                 <Quote className="w-4 h-4 sm:w-6 sm:h-6 md:w-12 md:h-12 lg:w-16 lg:h-16 text-gold drop-shadow-[0_0_25px_rgba(255,215,0,0.9)] animate-subtle-bounce shrink-0" strokeWidth={1.5} fill="currentColor" />
                 
                 <h2 className="relative z-10 text-[4vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.8vw] font-light font-[family-name:var(--font-montserrat)] text-white tracking-widest italic flex flex-nowrap justify-center items-center whitespace-nowrap">
                    Built on{" "}
                    <span className="font-bold font-[family-name:var(--font-cinzel)] text-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] animate-word-zoom mx-1 md:mx-2" style={{ animationDelay: '0s' }}>
                      Experience
                    </span>
                    , driven by{" "}
                    <span className="font-bold font-[family-name:var(--font-cinzel)] text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] animate-word-zoom mx-1 md:mx-2" style={{ animationDelay: '1.3s' }}>
                      Reliability
                    </span>
                    , and focused on{" "}
                    <span className="font-bold font-[family-name:var(--font-cinzel)] text-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] animate-word-zoom mx-1 md:mx-2" style={{ animationDelay: '2.6s' }}>
                      Success
                    </span>
                    .
                 </h2>

                 <Quote className="w-4 h-4 sm:w-6 sm:h-6 md:w-12 md:h-12 lg:w-16 lg:h-16 text-gold drop-shadow-[0_0_25px_rgba(255,215,0,0.9)] animate-subtle-bounce rotate-180 shrink-0" style={{ animationDelay: '2s' }} strokeWidth={1.5} fill="currentColor" />

              </div>

              {/* The Floating Laser Reveal Line - moved below text */}
              <div className="absolute bottom-[10%] md:bottom-[20%] left-[10%] md:left-[20%] w-[80%] md:w-[60%] h-[1px] bg-gold/10 z-0">
                 <div className="w-[30%] h-full bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_20px_rgba(255,215,0,1)] animate-laser-shoot"></div>
              </div>
              
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
