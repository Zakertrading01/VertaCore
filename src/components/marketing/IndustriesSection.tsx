import Link from "next/link";
import { TapLink } from "@/components/shared/TapLink";
import { 
  ArrowRight, 
  Droplets, 
  Anchor, 
  Factory, 
  Settings2, 
  Zap, 
  Building2 
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const industries = [
  {
    name: "Oil & Gas",
    slug: "oil-gas",
    icon: Droplets,
    description: "Upstream, midstream and downstream operations",
  },
  {
    name: "EPC & Infrastructure Projects",
    slug: "civil-engineering",
    icon: Building2,
    description: "Large-scale engineering, procurement, and construction",
  },
  {
    name: "Petrochemical Facilities",
    slug: "manufacturing",
    icon: Factory,
    description: "Chemical processing and refinement plants",
  },
  {
    name: "Fabrication & Manufacturing",
    slug: "fabrication",
    icon: Settings2,
    description: "Heavy metalwork and industrial production",
  },
  {
    name: "Marine & Offshore",
    slug: "marine",
    icon: Anchor,
    description: "Offshore platforms, shipyards, and vessels",
  },
  {
    name: "Utilities & Industrial Operations",
    slug: "power-energy",
    icon: Zap,
    description: "Power generation and essential utility infrastructure",
  },
];

export function IndustriesSection() {
  return (
    <section
      className="pt-8 pb-10 relative overflow-hidden bg-[#061022]"
      aria-labelledby="industries-heading"
    >
      <style>{`
        @keyframes blob-float {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 40px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes sweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes grid-pan {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        @keyframes beam-sweep {
          0% { transform: translateX(-100%) rotate(35deg); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateX(200%) rotate(35deg); opacity: 0; }
        }
        @keyframes float-dust {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-150px) scale(0.5); opacity: 0; }
        }
      `}</style>

      {/* Animated Deep Tech Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#061022] via-[#0b1b33] to-[#061022] bg-[length:200%_200%] opacity-90"
          style={{ animation: 'sweep 20s ease-in-out infinite' }}
        />
        
        {/* Animated Tech Grid */}
        <div 
          className="absolute -top-[40px] left-0 right-0 bottom-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'grid-pan 10s linear infinite',
          }}
        />

        {/* Diagonal Light Beams */}
        <div 
          className="absolute -top-1/2 bottom-[-50%] w-[150px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-md"
          style={{ animation: 'beam-sweep 15s linear infinite' }}
        />
        <div 
          className="absolute -top-1/2 bottom-[-50%] w-[300px] bg-gradient-to-r from-transparent via-gold/5 to-transparent blur-xl"
          style={{ animation: 'beam-sweep 22s linear infinite 5s' }}
        />

        {/* Floating Glowing Orbs */}
        <div 
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[130px]" 
          style={{ animation: 'blob-float 25s ease-in-out infinite' }} 
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[130px]" 
          style={{ animation: 'blob-float 20s ease-in-out infinite reverse' }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px]" 
          style={{ animation: 'blob-float 35s ease-in-out infinite alternate' }} 
        />

        {/* Floating Ember Particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" style={{ animation: 'float-dust 8s ease-in infinite' }} />
        <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_15px_#e7c85a]" style={{ animation: 'float-dust 12s ease-in infinite 2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_12px_#38bdf8]" style={{ animation: 'float-dust 10s ease-in infinite 5s' }} />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" style={{ animation: 'float-dust 14s ease-in infinite 1s' }} />
        <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-gold/80 rounded-full shadow-[0_0_15px_#e7c85a]" style={{ animation: 'float-dust 11s ease-in infinite 7s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-300 rounded-full shadow-[0_0_10px_#38bdf8]" style={{ animation: 'float-dust 15s ease-in infinite 3s' }} />
      </div>

      <div className="container-base relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-gold uppercase">Sectors We Serve</span>
            </div>
            <h2
              id="industries-heading"
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            >
              Specialized supply for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">
                critical industrial sectors.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/industries"
              className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold/30 rounded-xl transition-all duration-300"
            >
              <span className="text-sm font-semibold text-white group-hover:text-gold transition-colors">
                View All Industries
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <ArrowRight className="h-4 w-4 text-white group-hover:text-gold transition-colors" />
              </div>
            </Link>
          </ScrollReveal>
        </div>

        {/* Industries grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <ScrollReveal key={industry.slug} delay={i * 0.05}>
                <TapLink
                  href={`/industries/${industry.slug}`}
                  tabIndex={0}
                  className="group relative flex flex-col p-6 md:p-8 bg-white/5 hover:bg-white/10 focus:bg-white/10 active:bg-white/10 border border-white/5 hover:border-gold/30 focus:border-gold/30 active:border-gold/30 rounded-2xl transition-all duration-500 overflow-hidden h-full outline-none"
                >
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-focus:scale-110 group-active:scale-110 group-hover:bg-gold/20 group-focus:bg-gold/20 group-active:bg-gold/20 transition-all duration-500">
                      <Icon className="w-7 h-7 text-white/70 group-hover:text-gold group-focus:text-gold group-active:text-gold transition-colors duration-500" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold group-focus:text-gold group-active:text-gold transition-colors duration-300">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 group-focus:text-white/70 group-active:text-white/70 transition-colors duration-300 flex-1">
                      {industry.description}
                    </p>
                    
                    {/* Subtle arrow indicator */}
                    <div className="mt-6 flex items-center opacity-0 -translate-x-4 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 group-hover:translate-x-0 group-focus:translate-x-0 group-active:translate-x-0 transition-all duration-500">
                      <span className="text-xs font-bold text-gold tracking-widest uppercase mr-2">Explore</span>
                      <ArrowRight className="w-4 h-4 text-gold" />
                    </div>
                  </div>
                </TapLink>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
