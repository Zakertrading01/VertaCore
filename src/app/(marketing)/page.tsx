import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { getHomeProjects, getHomeInsights } from "@/lib/cached-queries";
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
import { MaintenancePage } from "@/components/marketing/MaintenancePage";
import { db } from "@/lib/db";

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

async function getSiteMode() {
  const setting = await db.siteSetting.findFirst();
  return setting?.maintenanceMode ?? true;
}

export default async function HomePage() {
  const [maintenanceMode, projects, insights] = await Promise.all([
    getSiteMode(),
    getHomeProjects(),
    getHomeInsights(),
  ]);

  const jsonLd = [organizationSchema(), websiteSchema()];

  if (maintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
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
    </>
  );
}
