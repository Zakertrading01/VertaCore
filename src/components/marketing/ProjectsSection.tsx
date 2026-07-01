import Link from "next/link";
import { TapLink } from "@/components/shared/TapLink";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { Project, Industry } from "@/types/db";

type ProjectWithIndustry = Project & { industry: Industry | null };

interface ProjectsSectionProps {
  projects: ProjectWithIndustry[];
}

const PROJECT_BRANDS: Record<string, string> = {
  "marine-fabrication-yard": "Rigman",
  "offshore-refinery-maintenance": "Toyolift",
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section
      className="py-8 md:py-12 bg-navy-dark"
      aria-labelledby="projects-heading"
    >
      <div className="container-base">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal className="max-w-xl">
            <SectionLabel className="mb-3">Proven Delivery</SectionLabel>
            <h2
              id="projects-heading"
              className="text-dmd font-bold text-white tracking-tight"
            >
              Delivering at scale
              <br />
              <span className="text-gold">across demanding sectors.</span>
            </h2>
          </ScrollReveal>

        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <TapLink
                href="/catalogue"
                tabIndex={0}
                className="card-base flex flex-col overflow-hidden group outline-none"
              >
                {/* Cover image */}
                <div className="relative aspect-video bg-navy-light/30 overflow-hidden">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building2 className="h-10 w-10 text-steel/30" />
                    </div>
                  )}

                  {PROJECT_BRANDS[project.slug] && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wide bg-navy-dark/80 text-gold border border-gold/20 px-2 py-0.5 rounded">
                        {PROJECT_BRANDS[project.slug]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col rounded-b-xl">
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-gold transition-colors leading-snug">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed flex-1">
                      {project.subtitle}
                    </p>
                  )}
                </div>
              </TapLink>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
