"use client";

import { useState } from "react";
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

  return (
    <>
    <section
      className="relative overflow-hidden bg-slate-50 border-t border-navy/5"
      aria-labelledby="why-vertacore-heading"
    >
      <style>{`
        @keyframes float-slow {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-30px, -20px) rotate(5deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        @keyframes float-slower {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(20px, 30px) scale(1.1); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>

      {/* Subtle Animated Modern Light Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px]" 
          style={{ animation: 'float-slow 20s ease-in-out infinite' }} 
        />
        <div 
          className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px]" 
          style={{ animation: 'float-slower 25s ease-in-out infinite' }} 
        />
        <div 
          className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-indigo-50/50 rounded-full blur-[100px]" 
          style={{ animation: 'float-slow 22s ease-in-out infinite reverse' }} 
        />
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#020617 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* 1. What We Do & Portal Registration (Side-by-Side) */}
      <div className="container-base pt-6 pb-10 md:pt-10 md:pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: What We Do */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border border-navy/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-navy uppercase">Company Overview</span>
              </div>
              <h2
                id="why-vertacore-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight leading-tight mb-6"
              >
                What <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-blue-600">We Do</span>
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-gold to-yellow-200 rounded-full mb-8" />
              
              <div className="space-y-6 text-lg text-navy/70 leading-relaxed max-w-2xl">
                <p>
                  Since our founding, VERTACORE has been supplying demanding sectors with an extensive range of certified MRO supplies, welding machinery, safety equipment, and industrial consumables. 
                </p>
                <p>
                  Whether you are a local engineering lead or a global procurement manager, we are committed to delivering the highest quality products and technical support to keep your operations running safely and efficiently.
                </p>
                <p className="text-base text-navy/50">
                  Our experience and continuous technical training ensure that clients get the service, compliance standards, and up-to-date documentation that help improve their operational efficiency and bottom line.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 bg-white border border-navy/10 hover:border-gold/30 hover:shadow-lg text-navy font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                >
                  About Us
                  <ArrowRight className="w-4 h-4 text-navy/50 group-hover:text-gold transition-colors" />
                </Link>
                <Link
                  href="/solutions"
                  className="group inline-flex items-center gap-2 bg-navy hover:bg-gold text-white hover:text-navy font-semibold px-8 py-4 rounded-xl shadow-lg shadow-navy/20 transition-all duration-300"
                >
                  Our Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Register for Enterprise Account */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal delay={0.15}>
              <div className="absolute -inset-1 bg-gradient-to-r from-gold via-yellow-200 to-gold rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white/80 backdrop-blur-xl p-8 md:p-10 border border-white/40 shadow-2xl rounded-2xl overflow-hidden">
                {/* Decorative corner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none" />

                <h3 className="text-2xl font-bold text-navy mb-3">
                  Enterprise Portal
                </h3>
                <p className="text-sm text-navy/60 mb-8 leading-relaxed">
                  Gain exclusive access to contract pricing, fast technical support, and comprehensive digital documentation management.
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    "Contract & Discounted Pricing",
                    "Dedicated Account Management",
                    "Fast 24-Hour Technical Response",
                    "Digital compliance & SDS library",
                    "Customized reordering lists",
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-navy/80">
                      <div className="mt-0.5 p-1 rounded-full bg-gold/10">
                        <CheckCircle className="h-4 w-4 text-gold flex-shrink-0" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="group flex items-center justify-between w-full bg-navy text-white font-bold px-6 py-4 rounded-xl hover:bg-gold hover:text-navy transition-colors duration-300 shadow-md"
                >
                  <span>Request Portal Access</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-navy/10 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div> {/* End container-base */}

      {/* 2. Horizontal Services Marquee (Full Width Navy Theme) */}
      <div className="w-full bg-navy py-10 border-y border-white/5 relative overflow-hidden z-10 shadow-2xl">
        {/* Fading Edges for Dark Theme */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />
        
        <style>{`
          @keyframes slide-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        
        <div 
          className="flex w-max items-center" 
          style={{ animation: 'slide-marquee 40s linear infinite' }}
        >
          {/* Render the array twice to create a seamless infinite loop effect */}
          {[...services, ...services].map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-center p-2 w-[140px] md:w-[180px] hover:bg-white/5 transition-all group flex-shrink-0 rounded-xl cursor-pointer">
                <div className="p-3 rounded-xl bg-white/5 shadow-sm border border-white/10 group-hover:bg-gold/20 group-hover:-translate-y-1 transition-all duration-300 mb-3">
                  <Icon className="h-5 w-5 text-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-[11px] md:text-sm font-semibold text-white/80 group-hover:text-gold transition-colors text-center leading-tight px-2">
                  {srv.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Three Core Focus Columns */}
      <div className="relative pt-8 pb-12 md:pt-10 md:pb-16 border-b border-navy/5">
        <div className="container-base relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.05}>
              <div className="group flex flex-col h-full p-8 bg-white/70 backdrop-blur-xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 rounded-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-yellow-200 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="p-4 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 w-fit mb-6 group-hover:scale-110 transition-transform duration-500 border border-gold/10">
                  <Award className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-blue-600 transition-colors">
                  Nuclear & High-Integrity QA
                </h3>
                <p className="text-[15px] text-navy/70 leading-relaxed">
                  VERTACORE’s rigorous quality auditing and material certification pipeline allow us to service critical military, power, and high-pressure manufacturing operations globally.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="group flex flex-col h-full p-8 bg-white/70 backdrop-blur-xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 rounded-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-yellow-200 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="p-4 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 w-fit mb-6 group-hover:scale-110 transition-transform duration-500 border border-gold/10">
                  <Globe className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-blue-600 transition-colors">
                  Global Sourcing Network
                </h3>
                <p className="text-[15px] text-navy/70 leading-relaxed">
                  We maintain a robust network of premium international manufacturers to procure specialized, standard-compliant MRO supplies that others cannot find.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="group flex flex-col h-full p-8 bg-white/70 backdrop-blur-xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 rounded-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-yellow-200 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="p-4 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 w-fit mb-6 group-hover:scale-110 transition-transform duration-500 border border-gold/10">
                  <Users className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-blue-600 transition-colors">
                  Agile, Independent Partner
                </h3>
                <p className="text-[15px] text-navy/70 leading-relaxed">
                  We are scaled to handle procurement workflows for multinational corporations, yet remain nimble and independent to make rapid, custom delivery decisions when you need them.
                </p>
              </div>
            </ScrollReveal>
          </div>
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
