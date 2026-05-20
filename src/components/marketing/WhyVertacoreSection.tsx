import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CheckSquare, Globe, Users, FileCheck } from "lucide-react";

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
      "Not a transactional vendor — a long-term procurement partner. Dedicated account management, technical consultation, and 24-hour RFQ response.",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    description:
      "International brand network with regional delivery and service capability. We source to specification for specialist requirements.",
  },
];

export function WhyVertacoreSection() {
  return (
    <section
      className="section-padding bg-navy-dark"
      aria-labelledby="why-vertacore-heading"
    >
      <div className="container-base">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <ScrollReveal>
            <SectionLabel className="mb-3">Why VERTACORE</SectionLabel>
            <h2
              id="why-vertacore-heading"
              className="text-dmd font-bold text-surface tracking-tight"
            >
              A procurement partner
              <br />
              <span className="text-gold">you can rely on.</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={i * 0.1}>
                <div className="flex flex-col items-start p-6 card-glass h-full">
                  <div className="p-3 rounded-xl bg-gold/10 mb-5">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="text-[16px] font-bold text-surface mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-steel-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
