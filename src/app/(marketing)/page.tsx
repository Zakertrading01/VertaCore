import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { HeroSection } from "@/components/marketing/HeroSection";

import { IntroductionSection } from "@/components/marketing/IntroductionSection";
import { SolutionsSection } from "@/components/marketing/SolutionsSection";
import { IndustriesSection } from "@/components/marketing/IndustriesSection";
import { QualitySection } from "@/components/marketing/QualitySection";
import { WhyVertacoreSection } from "@/components/marketing/WhyVertacoreSection";
import { MetricsBand } from "@/components/marketing/MetricsBand";
import { ProjectsSection } from "@/components/marketing/ProjectsSection";
import { InsightsSection } from "@/components/marketing/InsightsSection";
import { CTASection } from "@/components/marketing/CTASection";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: "VERTACORE — Certified Industrial MRO Supply",
  description:
    "Premium MRO industrial supply and procurement company delivering certified safety equipment, welding systems, lifting & rigging, and industrial consumables to enterprise clients worldwide.",
  path: "/",
  keywords: [
    "industrial equipment supplier",
    "MRO supply company",
    "safety equipment supplier",
    "welding systems supplier",
    "lifting rigging equipment",
    "ISO 9001 industrial supply",
    "industrial procurement",
  ],
});

async function getHomeData() {
  const [projects, insights] = await Promise.all([
    db.project.findMany({
      where: { published: true, featured: true },
      take: 3,
      orderBy: { completedAt: "desc" },
      include: { industry: true },
    }).catch(() => []),
    db.insight.findMany({
      where: { published: true },
      take: 3,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        author: true,
        tags: true,
        readTime: true,
        publishedAt: true,
      },
    }).catch(() => []),
  ]);

  return { projects, insights };
}

import { MaintenancePage } from "@/components/marketing/MaintenancePage";

export default async function HomePage() {
  const jsonLd = [organizationSchema(), websiteSchema()];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <MaintenancePage />

      {/* 
      <HeroSection />

      <IntroductionSection />
      <WhyVertacoreSection />
      <SolutionsSection />
      <IndustriesSection />
      {/* <QualitySection /> */}
      <MetricsBand />
      <ProjectsSection projects={projects} />
      <InsightsSection insights={insights} />
      <CTASection />
      */}
    </>
  );
}
