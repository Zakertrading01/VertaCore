"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Flame, Link2, Package, Cpu, Truck, BookOpen } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const solutions = [
  {
    icon: Package,
    title: "Industrial Supply Solutions",
    slug: "industrial-supply",
    description: "Comprehensive sourcing and supply of industrial products for project, maintenance, and operational requirements across multiple sectors.",
    tags: ["MRO", "Multi-Sector", "Certified"],
  },
  {
    icon: Flame,
    title: "Welding & Fabrication Solutions",
    slug: "welding-fabrication",
    description: "Supply of welding machines, consumables, accessories, electrodes, cutting solutions, and fabrication support products designed for demanding industrial applications.",
    tags: ["SMAW", "MIG/MAG", "TIG/SAW"],
  },
  {
    icon: Shield,
    title: "Safety & PPE Solutions",
    slug: "safety-ppe",
    description: "Reliable personal protective equipment and workplace safety products that support compliance, workforce protection, and operational safety standards.",
    tags: ["CE Certified", "ANSI", "ISO 45001"],
  },
  {
    icon: Link2,
    title: "Lifting & Material Handling",
    slug: "lifting-handling",
    description: "Supply solutions for lifting equipment, rigging accessories, material handling products, and industrial support equipment for safe operational handling.",
    tags: ["ASME B30", "EN 818", "Rigging"],
  },
  {
    icon: Cpu,
    title: "Technical Procurement Support",
    slug: "technical-procurement",
    description: "Efficient sourcing support for specialized industrial requirements through an established network of trusted manufacturers and suppliers.",
    tags: ["ISO 9001", "Global Sourcing"],
  },
  {
    icon: Truck,
    title: "Project Supply & Logistics Coordination",
    slug: "project-logistics",
    description: "Dedicated coordination and delivery support to ensure smooth supply execution for shutdowns, projects, and operational timelines.",
    tags: ["Shutdown Projects", "On-Time Delivery"],
  },
];

export function SolutionsSection() {
  return (
    <section className="section-padding !pt-10 bg-white relative overflow-hidden" aria-labelledby="solutions-heading">
      
      <style>{`
        @keyframes stripes-move {
          0% { background-position: 0 0; }
          100% { background-position: 56.57px 56.57px; }
        }
        .animated-stripes {
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(11, 27, 51, 0.02),
            rgba(11, 27, 51, 0.02) 20px,
            transparent 20px,
            transparent 40px
          );
          background-size: 56.57px 56.57px;
          animation: stripes-move 6s linear infinite;
        }
      `}</style>

      {/* Modern Industrial Stripes Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-white">
        <div className="absolute inset-0 -m-[100px] w-[calc(100%+200px)] h-[calc(100%+200px)] animated-stripes" />
        {/* Soft radial fade out to make it subtle */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#ffffff_95%)]" />
      </div>

      <div className="container-base relative z-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <ScrollReveal>
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-navy shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">Our Services</span>
              </div>
            </div>
            <h2
              id="solutions-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy-dark tracking-tight leading-tight mb-6"
            >
              End-to-end industrial supply
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-500">for every operational need.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Six service areas covering the full scope of industrial supply — from sourcing and safety to lifting, welding, and project logistics.
            </p>
          </ScrollReveal>
        </div>

        {/* Solutions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <ScrollReveal key={solution.slug} delay={i * 0.1}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group flex flex-col p-8 h-full bg-[#0b1b33] rounded-2xl shadow-xl border border-white/5 hover:border-gold/30 hover:bg-[#081326] hover:shadow-[0_10px_40px_rgba(250,204,21,0.15)] hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-500 relative overflow-hidden"
                >
                  {/* Premium Hover Effects */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent group-hover:w-full transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.15),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.1),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none delay-100" />

                  {/* Corner Tech Particles */}
                  <div className="absolute top-4 right-4 w-16 h-16 opacity-0 group-hover:opacity-100 group-active:scale-[2.5] group-active:opacity-0 transition-all duration-500 pointer-events-none">
                    <div className="absolute top-0 right-2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_10px_#facc15] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <div className="absolute top-4 right-0 w-2 h-2 bg-gold rounded-full shadow-[0_0_12px_#facc15] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                    <div className="absolute top-2 right-6 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white] animate-[bounce_2s_infinite]" />
                  </div>
                  
                  <div className="absolute bottom-4 left-4 w-16 h-16 opacity-0 group-hover:opacity-100 group-active:scale-[2.5] group-active:opacity-0 transition-all duration-500 delay-75 pointer-events-none">
                    <div className="absolute bottom-0 left-2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_12px_#3b82f6] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                    <div className="absolute bottom-4 left-0 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <div className="absolute bottom-2 left-6 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6] animate-[bounce_2.5s_infinite]" />
                  </div>

                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-6 w-6 text-white/70 group-hover:text-gold transition-colors" />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
                      <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-gold group-hover:-rotate-45 transition-all duration-300" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors relative z-10">
                    {solution.title}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed mb-6 flex-1 relative z-10 group-hover:text-white transition-colors">
                    {solution.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {solution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 group-hover:border-gold/30 group-hover:text-gold transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
