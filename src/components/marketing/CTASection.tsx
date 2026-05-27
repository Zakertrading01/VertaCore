import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function CTASection() {
  return (
    <section
      className="py-10 md:py-14 relative bg-[#040A18] border-t border-white/5 overflow-hidden"
      aria-label="Call to action"
    >
      <style>{`
        @keyframes fluid-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.2); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        @keyframes particle-drift {
          0% { transform: translateY(100px) translateX(0) scale(0); opacity: 0; }
          20% { opacity: 0.8; transform: scale(1); }
          80% { opacity: 0.6; }
          100% { transform: translateY(-300px) translateX(100px) scale(0); opacity: 0; }
        }
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        @keyframes scanner-sweep {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { top: 110%; opacity: 0; }
        }
      `}</style>

      {/* Cinematic "Video-Like" Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0A1224] to-[#040A18] z-0" />
        
        {/* NEW: Rotating Tech Rings for modern industrial/trading HUD feel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full z-10" style={{ animation: 'spin-slow 40s linear infinite' }}>
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-gold/20 rounded-full blur-[2px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/[0.05] border-dashed rounded-full z-10" style={{ animation: 'spin-slow 60s linear infinite reverse' }} />

        {/* NEW: Horizontal Scanner Laser */}
        <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-10" style={{ animation: 'scanner-sweep 8s ease-in-out infinite' }} />

        {/* Fluid 3D-like Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[100px] z-10" style={{ animation: 'fluid-blob 15s ease-in-out infinite' }} />
        <div className="absolute bottom-[-30%] right-[-10%] w-[50vw] h-[50vw] bg-gold/10 rounded-full blur-[100px] z-10" style={{ animation: 'fluid-blob 18s ease-in-out infinite reverse' }} />
        <div className="absolute top-[20%] left-[40%] w-[30vw] h-[30vw] bg-indigo-500/10 rounded-full blur-[80px] z-10" style={{ animation: 'fluid-blob 12s ease-in-out infinite 2s' }} />

        {/* Video-like Sparks/Particles */}
        <div className="absolute inset-0 z-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_10px_2px_rgba(250,204,21,0.6)]"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 20}%`,
                animation: `particle-drift ${4 + Math.random() * 6}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container-base text-center z-30">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-gold uppercase">Get Started</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Ready to source certified
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">industrial equipment?</span>
          </h2>
          <p className="mt-6 text-[16px] text-white/70 max-w-xl mx-auto leading-relaxed">
            Speak with our technical team. Submit your enquiries and our specialists will respond within 24 business hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/api/catalogue"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-10 py-4 rounded-xl hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all duration-300 text-[16px]"
            >
              <Download className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
              Download Catalogue
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm font-medium text-white/50">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
              ISO 9001:2015 Certified
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
              No obligation enquiry
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
