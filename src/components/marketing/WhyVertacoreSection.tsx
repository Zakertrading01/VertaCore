"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ShieldCheck, Truck, Wrench, Settings, BookOpen, FileCheck, Layers, Award, Users, Globe, CheckSquare, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";


const pillars = [
  {
    icon: FileCheck,
    title: "Quality Assurance",
    description:
      "Every product certified and verified before supply. Full documentation — datasheets, certificates, test reports — available on request.",
  },
  {
    icon: Users,
    title: "Sector Expertise",
    description:
      "Deep operational knowledge across Oil & Gas, Marine, Construction, Manufacturing, Mining and Fabrication. We understand your compliance requirements.",
  },
  {
    icon: CheckSquare,
    title: "Enterprise Partnership",
    description:
      "Not a transactional vendor — a long-term procurement partner. Dedicated account management, technical consultation, and 24-hour response time.",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    description:
      "International brand network with regional delivery and service capability. We source to specification for specialist requirements.",
  },
];

const services = [
  { name: "Global Procurement", icon: Globe },
  { name: "Logistics & Delivery", icon: Truck },
  { name: "Equipment Rental", icon: Layers },
  { name: "Technical Support", icon: Settings },
  { name: "Safety Training", icon: ShieldCheck },
  { name: "Calibration & Repair", icon: Wrench },
  { name: "Quality Inspections", icon: FileCheck },
  { name: "Online Catalog Mgmt", icon: BookOpen },
  { name: "Enterprise Accounts", icon: Users },
];

const testimonials = [
  {
    quote: "At our generating station with our previous vendor, we struggled to maintain inventory levels of critical compliance products. That changed immediately with VERTACORE. Their supply chain oversight and absolute compliance documentation has given us peace of mind.",
    client: "Will County Generating Station",
    position: "Maintenance Supervisor",
  },
  {
    quote: "We've been using VERTACORE for hard supplies and custom rigging systems. Their customer service is exceptional, enquiries are handled quickly, and the quality certificates are always perfect. They have saved us both time and money.",
    client: "Aaron Ozminkowski",
    position: "Production Manager, Coan Engineering",
  },
  {
    quote: "VERTACORE benefits our corporation on many levels. We not only receive quality certified products for use in our fabrication shop, but also reap the rewards of their technical consultation. Their team goes above and beyond.",
    client: "Adam Gromer",
    position: "QA Manager, Peddinghaus Corp",
  },
];

export function WhyVertacoreSection() {
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(40)].map(() => ({
        size: Math.random() * 4 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100 + 20,
        duration: Math.random() * 15 + 15,
        delay: Math.random() * -30,
        opacity: Math.random() * 0.6 + 0.3,
        pulseDuration: Math.random() * 3 + 2
      }))
    );
  }, []);

  return (
    <>
    <section
      className="relative overflow-hidden bg-[#050A14] border-t border-white/5"
      aria-labelledby="why-vertacore-heading"
    >
      <style>{`
        @keyframes gold-float {
          0% { transform: translateY(100px) scale(0); opacity: 0; }
          20% { transform: translateY(0px) scale(1); opacity: var(--p-opacity, 0.8); }
          80% { transform: translateY(-400px) scale(1); opacity: var(--p-opacity, 0.8); }
          100% { transform: translateY(-500px) scale(0); opacity: 0; }
        }
        @keyframes gold-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.5); box-shadow: 0 0 15px 4px rgba(250,204,21,0.6); }
        }
      `}</style>

      {/* Gold Particles Modern Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#020617]">
        
        {/* Soft background lighting */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        
        {/* Particles */}
        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold shadow-[0_0_8px_1px_rgba(250,204,21,0.5)]"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                ['--p-opacity' as any]: p.opacity,
                animation: `
                  gold-float ${p.duration}s linear infinite,
                  gold-pulse ${p.pulseDuration}s ease-in-out infinite
                `,
                animationDelay: `${p.delay}s, ${p.delay}s`
              }}
            />
          ))}
        </div>

        {/* Ambient bottom glow grounding the particles */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-gold/10 to-transparent blur-[80px]" />

        {/* Shadow overlay to ground the edges */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_100px_#020617]" />
      </div>

      {/* Why Verta Core Content */}
      <div className="container-base pt-10 pb-12 md:pt-16 md:pb-16 relative z-10">
        <div className="max-w-4xl mb-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_2px_rgba(250,204,21,0.6)]" />
              <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase">Why Verta Core</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-[1.05] mb-6">
              Supporting <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">Industrial Growth</span> <br className="hidden md:block"/>
              Across the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-yellow-500 drop-shadow-lg">UAE</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/60 leading-snug font-medium tracking-tight max-w-3xl">
              From shutdown requirements to large-scale EPC projects, Verta Core is committed to delivering value-driven industrial solutions that support productivity, safety, and project success.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Trusted Industrial Partner */}
          <ScrollReveal delay={0.1}>
            <div className="group flex flex-col h-full p-6 bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/40 hover:bg-white/10 hover:-translate-y-1.5 rounded-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-yellow-200 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="p-3 rounded-xl bg-gold/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-300 border border-gold/20">
                <ShieldCheck className="h-5 w-5 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors leading-snug">
                Trusted Industrial Partner
              </h3>
              <p className="text-[14px] text-white/70 leading-relaxed">
                We understand the demands of high-specification industrial projects and deliver solutions aligned with international standards and project requirements.
              </p>
            </div>
          </ScrollReveal>

          {/* 2. Responsive Supply Chain */}
          <ScrollReveal delay={0.2}>
            <div className="group flex flex-col h-full p-6 bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/40 hover:bg-white/10 hover:-translate-y-1.5 rounded-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-yellow-200 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="p-3 rounded-xl bg-gold/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-300 border border-gold/20">
                <Truck className="h-5 w-5 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors leading-snug">
                Responsive Supply Chain
              </h3>
              <p className="text-[14px] text-white/70 leading-relaxed">
                Our agile sourcing network and operational efficiency enable timely delivery and dependable project support.
              </p>
            </div>
          </ScrollReveal>

          {/* 3. Quality & Compliance Focused */}
          <ScrollReveal delay={0.3}>
            <div className="group flex flex-col h-full p-6 bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/40 hover:bg-white/10 hover:-translate-y-1.5 rounded-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-yellow-200 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="p-3 rounded-xl bg-gold/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-300 border border-gold/20">
                <FileCheck className="h-5 w-5 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors leading-snug">
                Quality & Compliance
              </h3>
              <p className="text-[14px] text-white/70 leading-relaxed">
                We work with trusted manufacturers and globally recognized brands to ensure reliability, durability, and compliance.
              </p>
            </div>
          </ScrollReveal>

          {/* 4. Industry-Focused Expertise */}
          <ScrollReveal delay={0.4}>
            <div className="group flex flex-col h-full p-6 bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/40 hover:bg-white/10 hover:-translate-y-1.5 rounded-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-yellow-200 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="p-3 rounded-xl bg-gold/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-300 border border-gold/20">
                <Settings className="h-5 w-5 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors leading-snug">
                Industry Expertise
              </h3>
              <p className="text-[14px] text-white/70 leading-relaxed">
                Our team brings practical market knowledge tailored to oil & gas, fabrication, construction, and industrial operations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* 4. Customer Testimonials (Dark Navy Neat Theme) */}
    <section className="bg-navy relative overflow-hidden pt-10 pb-16 md:pt-12 md:pb-20">
      {/* Neat, Modern Static Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#132242] via-navy to-[#050A14]" />
        
        {/* Very subtle static glowing accent, purely aesthetic and neat */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-base relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-gold uppercase">Proven Performance</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              What Our Clients Say
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-gold to-yellow-200 rounded-full mx-auto mt-8" />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => {
            const isExpanded = expandedTestimonial === index;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-[#0f172a]/70 backdrop-blur-xl p-8 rounded-2xl border border-white/10 flex flex-col justify-between h-full relative group hover:border-gold/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-tr-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
                  
                  <div className="relative z-10">
                    <span className="text-gold/20 font-serif text-8xl absolute -top-8 -left-2 pointer-events-none group-hover:text-gold/40 transition-colors duration-500">“</span>
                    <p className={`text-[15px] text-white/80 leading-relaxed italic relative z-10 pt-8 ${!isExpanded ? "line-clamp-4" : ""}`}>
                      {test.quote}
                    </p>
                    <button
                      onClick={() => setExpandedTestimonial(isExpanded ? null : index)}
                      className="text-xs font-bold text-gold mt-5 hover:text-gold-muted transition-colors flex items-center gap-1 relative z-20"
                    >
                      {isExpanded ? "[ read less - ]" : "[ read more + ]"}
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col relative z-10">
                    <span className="text-[17px] font-bold text-white group-hover:text-gold transition-colors duration-300">
                      {test.client}
                    </span>
                    <span className="text-[13px] font-medium text-white/50 mt-1 uppercase tracking-wider">
                      {test.position}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
