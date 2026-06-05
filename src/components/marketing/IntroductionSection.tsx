"use client";

import { useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function IntroductionSection() {
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#020617] py-12 md:py-16 border-b border-white/5" aria-label="Introduction">
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
      
      {/* Canvas Particle Network Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1221] via-[#0F172A] to-[#020617] opacity-100" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020617_120%)]" />
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
              tabIndex={0}
              className="relative overflow-hidden rounded-[2.5rem] p-[2px] w-full shadow-[0_0_60px_-15px_rgba(250,204,21,0.3)] group outline-none cursor-pointer"
              style={{ animation: 'float-panel 8s ease-in-out infinite' }}
            >
              {/* Spinning Laser Layer */}
              <div 
                className="absolute inset-[-150%] w-[400%] h-[400%] mx-auto my-auto animate-[spin_5s_linear_infinite] opacity-70 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(250,204,21,1) 80%, transparent 100%)' }} 
              />
              
              {/* Inner Card */}
              <div className="relative bg-[#0b1b33]/90 backdrop-blur-2xl h-full w-full rounded-[2.5rem] p-8 md:p-12 z-10 flex flex-col shadow-[inset_0_0_40px_rgba(250,204,21,0.05)] border border-white/5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.1),transparent_50%)] pointer-events-none" />
                
                <div className="absolute top-6 right-8 text-[100px] font-black text-gold/25 group-hover:text-gold/50 group-focus:text-gold/50 group-active:text-gold/50 leading-none select-none transition-all duration-700 group-hover:scale-110 group-focus:scale-110 group-active:scale-110">
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
              tabIndex={0}
              className="relative overflow-hidden rounded-[2.5rem] p-[2px] w-full shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)] group outline-none cursor-pointer"
              style={{ animation: 'float-panel-alt 9s ease-in-out infinite' }}
            >
              {/* Spinning Laser Layer */}
              <div 
                className="absolute inset-[-150%] w-[400%] h-[400%] mx-auto my-auto animate-[spin_6s_linear_infinite_reverse] opacity-70 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(59,130,246,1) 80%, transparent 100%)' }} 
              />
              
              {/* Inner Card */}
              <div className="relative bg-[#0b1b33]/90 backdrop-blur-2xl h-full w-full rounded-[2.5rem] p-8 md:p-12 z-10 flex flex-col shadow-[inset_0_0_40px_rgba(59,130,246,0.05)] border border-white/5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
                
                <div className="absolute bottom-6 right-8 text-[100px] font-black text-blue-500/25 group-hover:text-blue-400/50 group-focus:text-blue-400/50 group-active:text-blue-400/50 leading-none select-none transition-all duration-700 group-hover:scale-110 group-focus:scale-110 group-active:scale-110">
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
