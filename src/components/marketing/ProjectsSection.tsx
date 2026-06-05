import Link from "next/link";
import { TapLink } from "@/components/shared/TapLink";
import Image from "next/image";
import { ArrowRight, Building2 } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { Project, Industry } from "@/types/db";

type ProjectWithIndustry = Project & { industry: Industry | null };

interface ProjectsSectionProps {
  projects: ProjectWithIndustry[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section
      className="section-padding bg-[#FAF9F6]"
      aria-labelledby="projects-heading"
    >
      <div className="container-base">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal className="max-w-xl">
            <SectionLabel className="mb-3">Proven Delivery</SectionLabel>
            <h2
              id="projects-heading"
              className="text-dmd font-bold text-navy tracking-tight"
            >
              Delivering at scale
              <br />
              <span className="text-gold">across demanding sectors.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-muted transition-colors font-medium"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <TapLink
                href={`/projects/${project.slug}`}
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

                  {/* Industry badge */}
                  {project.industry && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wide bg-navy-dark/80 text-gold border border-gold/20 px-2 py-0.5 rounded">
                        {project.industry.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col bg-white border border-navy/5 shadow-sm rounded-b-xl">
                  <h3 className="text-[16px] font-bold text-navy mb-2 group-hover:text-gold transition-colors leading-snug">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-sm text-navy/60 line-clamp-2 leading-relaxed flex-1">
                      {project.subtitle}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy/5">
                    {project.client && (
                      <span className="text-xs text-navy/40 truncate mr-2">
                        {project.client}
                      </span>
                    )}
                    <ArrowRight className="h-4 w-4 text-gold flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </TapLink>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
