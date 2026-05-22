import Link from "next/link";
import { ArrowRight, Award, CheckCircle } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const certifications = [
  {
    name: "ISO 9001:2015",
    body: "International Organization for Standardization",
    description: "Quality management system certification for consistent supply chain excellence.",
  },
  {
    name: "CE Marking",
    body: "European Conformity",
    description: "European safety, health and environmental protection standards compliance.",
  },
  {
    name: "EN Standards",
    body: "European Standards",
    description: "EN 361, EN 397, EN 818 and applicable European safety norms.",
  },
  {
    name: "ANSI Standards",
    body: "American National Standards Institute",
    description: "ANSI Z359 fall protection and related North American safety standards.",
  },
];

export function QualitySection() {
  return (
    <section
      className="py-8 relative overflow-hidden bg-white"
      aria-labelledby="quality-heading"
    >
      <style>{`
        @keyframes subtle-float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>

      {/* Animated Light Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Pulsing blurred orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px]" style={{ animation: 'pulse-glow 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px]" style={{ animation: 'pulse-glow 12s ease-in-out infinite 3s' }} />
        
        {/* Subtle geometric floating shape */}
        <div 
          className="absolute top-1/4 right-1/3 w-64 h-64 border-[40px] border-navy/[0.02] rounded-full blur-[2px]" 
          style={{ animation: 'subtle-float 15s ease-in-out infinite' }} 
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-40 h-40 border-[20px] border-gold/[0.03] rounded-full blur-[1px]" 
          style={{ animation: 'subtle-float 20s ease-in-out infinite reverse' }} 
        />

        {/* Very faint dotted grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#0A1224 2px, transparent 2px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-base relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — content */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border border-navy/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="text-xs font-bold tracking-widest text-navy uppercase">Certified. Compliant. Trusted.</span>
              </div>
              <h2
                id="quality-heading"
                className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight mt-3"
              >
                Every product meets
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-blue-600">
                  international standards.
                </span>
              </h2>
              <p className="mt-6 text-lg text-navy/70 leading-relaxed max-w-lg">
                VERTACORE is ISO 9001:2015 certified. Every item we supply is verified
                against internationally recognised quality and safety standards, with full
                documentation available on request.
              </p>

              <Link
                href="/certifications"
                className="group inline-flex items-center gap-3 mt-8 px-6 py-3 bg-navy hover:bg-gold text-white hover:text-navy font-semibold rounded-xl transition-all duration-300"
              >
                View Our Certifications
                <ArrowRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right — cert cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.name} delay={0.1 + i * 0.08}>
                <div className="group bg-navy border border-navy/10 shadow-lg rounded-2xl p-6 h-full hover:bg-gold hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-white/10 group-hover:bg-navy/10 flex-shrink-0 transition-colors duration-300">
                      <Award className="h-5 w-5 text-gold group-hover:text-navy transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white group-hover:text-navy transition-colors duration-300">{cert.name}</div>
                      <div className="text-xs font-medium text-gold/80 group-hover:text-navy/70 mt-1 transition-colors duration-300">{cert.body}</div>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 group-hover:text-navy/80 leading-relaxed transition-colors duration-300">
                    {cert.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
