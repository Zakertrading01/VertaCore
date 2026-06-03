"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function IntroductionSection() {
  return (
    <section className="relative overflow-hidden bg-[#050A14] py-12 md:py-16 border-b border-white/5" aria-label="Introduction">
      <style>{`
        @keyframes sonar-wave {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes data-drop {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(1000%); opacity: 0; }
        }
        @keyframes float-flare {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -20px) scale(1.1); }
        }
        @keyframes text-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes border-glow {
          0%, 100% { border-color: rgba(255,255,255,0.1); box-shadow: 0 0 10px rgba(250,204,21,0); }
          50% { border-color: rgba(250,204,21,0.4); box-shadow: 0 0 20px rgba(250,204,21,0.2); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(45deg); }
          100% { transform: rotate(405deg); }
        }
        @keyframes expand-line {
          0%, 100% { width: 4rem; opacity: 0.3; }
          50% { width: 10rem; opacity: 1; }
        }
        @keyframes float-panel {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-panel-alt {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(12px); }
        }
      `}</style>
      
      {/* Unique Advanced Engineering Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
        
        {/* Subtle Hexagonal Grid (Engineering motif) */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='103.92304845413264' viewBox='0 0 60 103.92304845413264' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 103.92304845413264L60 86.60254037844386L60 51.96152422706632L30 34.64101615137754L0 51.96152422706632L0 86.60254037844386Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Cpath d='M30 51.96152422706632L60 34.64101615137754L60 0L30 -17.32050807568877L0 0L0 34.64101615137754Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 69.28px',
          }}
        />

        {/* Concentric Sonar Rings (Global reach/Radar) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] flex items-center justify-center mix-blend-screen opacity-30">
          <div className="absolute w-[200px] h-[200px] border border-gold/40 rounded-full" style={{ animation: 'sonar-wave 12s linear infinite' }} />
          <div className="absolute w-[200px] h-[200px] border border-gold/40 rounded-full" style={{ animation: 'sonar-wave 12s linear infinite 4s' }} />
          <div className="absolute w-[200px] h-[200px] border border-gold/40 rounded-full" style={{ animation: 'sonar-wave 12s linear infinite 8s' }} />
        </div>

        {/* Vertical Data Streams */}
        <div className="absolute inset-0 flex justify-between px-20 opacity-20">
           <div className="w-[1px] h-full bg-white/5 relative overflow-hidden"><div className="absolute top-0 w-full h-[150px] bg-gradient-to-b from-transparent via-gold to-transparent" style={{ animation: 'data-drop 7s linear infinite' }} /></div>
           <div className="w-[1px] h-full bg-white/5 relative overflow-hidden"><div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-transparent via-blue-500 to-transparent" style={{ animation: 'data-drop 11s linear infinite 2s' }} /></div>
           <div className="w-[1px] h-full bg-white/5 relative overflow-hidden hidden md:block"><div className="absolute top-0 w-full h-[100px] bg-gradient-to-b from-transparent via-gold to-transparent" style={{ animation: 'data-drop 9s linear infinite 5s' }} /></div>
           <div className="w-[1px] h-full bg-white/5 relative overflow-hidden"><div className="absolute top-0 w-full h-[250px] bg-gradient-to-b from-transparent via-blue-400 to-transparent" style={{ animation: 'data-drop 13s linear infinite 1s' }} /></div>
           <div className="w-[1px] h-full bg-white/5 relative overflow-hidden hidden lg:block"><div className="absolute top-0 w-full h-[150px] bg-gradient-to-b from-transparent via-gold to-transparent" style={{ animation: 'data-drop 8s linear infinite 7s' }} /></div>
        </div>

        {/* Floating Ambient Flares for cinematic volume */}
        <div 
          className="absolute top-[-10%] left-[15%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] mix-blend-screen"
          style={{ animation: 'float-flare 15s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"
          style={{ animation: 'float-flare 18s ease-in-out infinite reverse' }}
        />

        {/* Top/Bottom gradient fades so text remains completely legible and blends into next sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-transparent to-[#050A14] pointer-events-none" />
      </div>

      <div className="container-base relative z-10 flex flex-col items-center text-center">
        <ScrollReveal>
          <div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm transition-all duration-700 relative"
            style={{ animation: 'border-glow 4s ease-in-out infinite' }}
          >
            {/* Pulsing indicator dot */}
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold shadow-[0_0_8px_rgba(250,204,21,1)]"></span>
            </div>
            <span className="text-xs font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-100 to-gold bg-[length:200%_auto] animate-[text-shimmer_3s_linear_infinite] uppercase">
              Who We Are
            </span>
          </div>
        </ScrollReveal>

        {/* Animated Holographic Panels */}
        <div className="w-full max-w-6xl mx-auto mt-12 relative z-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-left">
          
          {/* Panel 1: Industrial Supply (Gold Laser) */}
          <ScrollReveal delay={0.2}>
            <div 
              className="relative overflow-hidden rounded-[2.5rem] p-[2px] w-full shadow-[0_0_60px_-15px_rgba(250,204,21,0.3)] group"
              style={{ animation: 'float-panel 8s ease-in-out infinite' }}
            >
              {/* Spinning Laser Layer */}
              <div 
                className="absolute inset-[-150%] w-[400%] h-[400%] mx-auto my-auto animate-[spin_5s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(250,204,21,1) 80%, transparent 100%)' }} 
              />
              
              {/* Inner Card */}
              <div className="relative bg-[#050A14]/90 backdrop-blur-2xl h-full w-full rounded-[2.5rem] p-8 md:p-12 z-10 flex flex-col shadow-[inset_0_0_40px_rgba(250,204,21,0.05)] border border-white/5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.1),transparent_50%)] pointer-events-none" />
                
                <div className="absolute top-6 right-8 text-[100px] font-black text-gold/10 group-hover:text-gold/30 leading-none select-none transition-all duration-700 group-hover:scale-110">
                  01
                </div>
                
                <div className="w-16 h-[2px] bg-gold mb-8 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-widest relative z-10">
                  Industrial <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">Supply</span>
                </h3>
                
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-light relative z-10">
                  <span className="text-white font-medium">Verta Core</span> is a UAE-based industrial supply and solutions company serving the energy, oil & gas, infrastructure, fabrication, and construction sectors. We specialize in delivering dependable products, technical expertise, and responsive support for mission-critical operations across the region.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Panel 2: Enterprise Execution (Blue Laser) */}
          <ScrollReveal delay={0.4}>
            <div 
              className="relative overflow-hidden rounded-[2.5rem] p-[2px] w-full shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)] group"
              style={{ animation: 'float-panel-alt 9s ease-in-out infinite' }}
            >
              {/* Spinning Laser Layer */}
              <div 
                className="absolute inset-[-150%] w-[400%] h-[400%] mx-auto my-auto animate-[spin_6s_linear_infinite_reverse] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(59,130,246,1) 80%, transparent 100%)' }} 
              />
              
              {/* Inner Card */}
              <div className="relative bg-[#050A14]/90 backdrop-blur-2xl h-full w-full rounded-[2.5rem] p-8 md:p-12 z-10 flex flex-col shadow-[inset_0_0_40px_rgba(59,130,246,0.05)] border border-white/5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
                
                <div className="absolute bottom-6 right-8 text-[100px] font-black text-blue-500/10 group-hover:text-blue-500/30 leading-none select-none transition-all duration-700 group-hover:scale-110">
                  02
                </div>
                
                <div className="w-16 h-[2px] bg-blue-500 mb-8 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-widest relative z-10">
                  Enterprise <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200">Execution</span>
                </h3>
                
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-light relative z-10">
                  With a strong focus on quality, compliance, and operational efficiency, <span className="text-white font-medium">Verta Core</span> partners with EPC contractors, ADNOC projects, fabricators, and industrial clients to ensure seamless project execution from procurement to delivery.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
