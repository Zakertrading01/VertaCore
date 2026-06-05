import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CatalogueDownloadButton } from "@/components/catalogue/CatalogueClient";

export function CTASection() {
  return (
    <section
      className="py-12 md:py-16 relative bg-[#0A101D] border-t border-white/[0.05] overflow-hidden"
      aria-label="Call to action"
    >
      <style>{`
        .hex-bg {
          background-color: #0A101D;
          background-image: 
            radial-gradient(circle at center, transparent 0%, #0A101D 100%),
            url("data:image/svg+xml,%3Csvg width='60' height='103.923' viewBox='0 0 60 103.923' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 103.923L0 86.603V51.962L30 34.641l30 17.321v34.641L30 103.923zM30 98.15l25-14.433V54.848L30 40.415 5 54.848v28.869L30 98.15z' fill='rgba(250, 204, 21, 0.2)' fill-rule='evenodd'/%3E%3C/svg%3E");
          background-size: 100% 100%, 60px 103.923px;
        }
        @keyframes hex-pan {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 0 0, 60px 103.923px; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>

      {/* Industrial Hexagon Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Hex Grid Layer */}
        <div 
          className="absolute inset-0 hex-bg opacity-100"
          style={{ animation: 'hex-pan 15s linear infinite' }}
        />

        {/* Bright Ambient Light Orbs */}
        <div className="absolute top-0 right-[10%] w-[50vw] h-[50vw] bg-gold/10 rounded-full blur-[100px] z-10 mix-blend-screen" style={{ animation: 'pulse-glow 6s ease-in-out infinite' }} />
        <div className="absolute bottom-0 left-[10%] w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[100px] z-10 mix-blend-screen" style={{ animation: 'pulse-glow 8s ease-in-out infinite 3s' }} />
        

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A101D_95%)] z-20" />
      </div>

      <div className="relative container-base text-center z-30">
        <ScrollReveal>
          {/* Cyber Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.05] mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(250,204,21,0.05)]">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>
            </div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">Get in Touch</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Ready to source premium
            <br className="hidden md:block" />
            <span className="relative inline-block mt-2 md:mt-4">
              <span className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/10 to-transparent blur-xl"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">industrial equipment?</span>
            </span>
          </h2>
          
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
            Speak with our technical team. Submit your enquiries and our specialists will respond within 24 business hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <CatalogueDownloadButton
              label="Download Catalogue"
              className="px-10 py-4 text-[16px] shadow-[0_0_30px_rgba(250,204,21,0.15)] hover:shadow-[0_0_40px_rgba(250,204,21,0.3)] transition-all duration-500"
            />
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm font-medium text-white/40 tracking-wide">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold/70 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
              NO OBLIGATION ENQUIRY
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500/70 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              EXPERT CONSULTATION
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
