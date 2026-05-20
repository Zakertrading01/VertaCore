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
      className="section-padding bg-graphite-subtle"
      aria-labelledby="quality-heading"
    >
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — content */}
          <div>
            <ScrollReveal>
              <SectionLabel className="mb-3">Certified. Compliant. Trusted.</SectionLabel>
              <h2
                id="quality-heading"
                className="text-dmd font-bold text-surface tracking-tight mt-3"
              >
                Every product meets
                <br />
                <span className="text-gold">international standards.</span>
              </h2>
              <p className="mt-4 text-body text-surface/60 leading-relaxed max-w-lg">
                VERTACORE is ISO 9001:2015 certified. Every item we supply is verified
                against internationally recognised quality and safety standards, with full
                documentation available on request.
              </p>

              <Link
                href="/certifications"
                className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-gold hover:text-gold-muted transition-colors"
              >
                View Our Certifications
                <ArrowRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right — cert cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.name} delay={0.1 + i * 0.08}>
                <div className="card-base p-5 h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gold/10 flex-shrink-0">
                      <Award className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-surface">{cert.name}</div>
                      <div className="text-xs text-gold/70 mt-0.5">{cert.body}</div>
                    </div>
                  </div>
                  <p className="text-xs text-steel-muted leading-relaxed">
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
