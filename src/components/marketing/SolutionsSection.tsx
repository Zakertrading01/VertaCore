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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {x: number, y: number, vx: number, vy: number, size: number}[] = [];
    let animationFrameId: number;
    let w = 0;
    let h = 0;
    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      if (!canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
      particles = [];
      const particleCount = Math.min(Math.floor((w * h) / 10000), 150);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(125, 211, 252, 0.6)';
        ctx.fill();

        let dxMouse = p.x - mouse.x;
        let dyMouse = p.y - mouse.y;
        let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(231, 200, 90, ${0.8 - distMouse / 225})`;
          ctx.lineWidth = 2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          p.x += dxMouse * 0.005;
          p.y += dyMouse * 0.005;
        }

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(125, 211, 252, ${0.3 - dist / 400})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="section-padding !pt-10 bg-gradient-to-b from-[#0F172A] to-[#020617] relative overflow-hidden" aria-labelledby="solutions-heading">
      {/* Canvas Particle Network Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1221] via-[#0F172A] to-[#020617] opacity-100" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020617_120%)]" />
      </div>

      <div className="container-base relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-gold/10 border border-gold/20">
              <SectionLabel className="!mb-0 text-gold">Our Services</SectionLabel>
            </div>
            <h2
              id="solutions-heading"
              className="text-dmd font-bold text-white tracking-tight leading-tight"
            >
              End-to-end industrial supply
              <br />
              <span className="text-gradient-gold">for every operational need.</span>
            </h2>
            <p className="mt-5 text-body text-white/70 leading-relaxed">
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
                  className="card-base group flex flex-col p-8 h-full bg-navy/50 backdrop-blur-sm border-white/5 hover:border-gold/40 hover:bg-navy/80 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

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

                  <p className="text-sm text-white/60 leading-relaxed mb-6 flex-1 relative z-10 group-hover:text-white/80 transition-colors">
                    {solution.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {solution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 group-hover:border-gold/20 group-hover:text-white/90 transition-all"
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
