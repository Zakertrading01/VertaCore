import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2 } from "lucide-react";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";

export const dynamic = 'force-dynamic';



export const metadata: Metadata = buildMetadata({
  title: "Project Portfolio & Case Studies",
  description:
    "VERTACORE has delivered certified industrial MRO supply to Oil & Gas, Marine, Construction and Manufacturing operations. View our project portfolio.",
  path: "/projects",
  keywords: ["industrial supply projects", "MRO project case studies"],
});

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { completedAt: "desc" }],
    include: { industry: true },
  });

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      <header className="bg-navy-dark pt-32 pb-8">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Proven Delivery</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Delivering at scale
            <br />
            <span className="text-gold">for demanding operations.</span>
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            Selected project references demonstrating VERTACORE&apos;s supply capability
            across industrial sectors.
          </p>
        </div>
      </header>

      <section className="pt-4 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {projects.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.07}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="card-base flex flex-col overflow-hidden group h-full"
                  >
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
                      {project.industry && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-semibold uppercase tracking-wide bg-navy-dark/80 text-gold border border-gold/20 px-2 py-0.5 rounded">
                            {project.industry.name}
                          </span>
                        </div>
                      )}
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="text-[10px] font-semibold uppercase tracking-wide bg-gold text-navy px-2 py-0.5 rounded">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="text-[16px] font-bold text-surface mb-2 group-hover:text-gold transition-colors leading-snug">
                        {project.title}
                      </h2>
                      {project.subtitle && (
                        <p className="text-sm text-steel-muted line-clamp-2 leading-relaxed flex-1">
                          {project.subtitle}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-steel/20">
                        {project.client && (
                          <span className="text-xs text-steel-muted truncate mr-2">
                            {project.client}
                          </span>
                        )}
                        <ArrowRight className="h-4 w-4 text-gold flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-surface/40 text-body">
                Project case studies are being prepared. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
