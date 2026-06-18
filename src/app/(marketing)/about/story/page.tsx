import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";



export const metadata: Metadata = buildMetadata({
  title: "Our Story",
  description:
    "The founding story of VERTACORE — how a commitment to quality and procurement reliability led to building a premium MRO industrial supply company.",
  path: "/about/story",
});

export default function StoryPage() {
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Story", href: "/about/story" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      <header className="bg-navy-dark pt-16 lg:pt-32 pb-2">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Our Story</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-4xl tracking-tight">
            Built on reliability <span className="text-gold">and operational trust.</span>
          </h1>
        </div>
      </header>

      <section className="pt-2 pb-8 md:pt-6 md:pb-12 bg-navy-dark">
        <div className="container-base max-w-3xl">
          <ScrollReveal>
            <div className="space-y-6 text-lg md:text-xl text-surface leading-relaxed pl-6 border-l-2 border-gold">
              <p>
                Every successful industrial project is built on a foundation of reliability, trust, and timely execution. Verta Core was established with a clear purpose: to bridge the gap between project requirements and dependable industrial supply solutions.
              </p>

              <p>
                With decades of combined industry experience behind our leadership and operations, we recognized a growing need for a supply partner that understands the realities of modern industrial projects—tight schedules, stringent specifications, uncompromising safety standards, and the constant demand for operational efficiency.
              </p>

              <p>
                Verta Core was founded to meet these challenges head-on. We set out to create a company that combines technical expertise, responsive service, and a customer-first approach, enabling clients to focus on delivering successful projects while we ensure the right products and solutions are available when they are needed most.
              </p>

              <p>
                Today, we proudly support EPC contractors, oil &amp; gas operators, fabrication companies, infrastructure developers, and industrial facilities across the UAE. Our commitment extends beyond supplying products; we build lasting partnerships based on transparency, accountability, and consistent performance.
              </p>

              <p>
                As industries continue to evolve, our focus remains unchanged—to deliver quality, reliability, and value that help our clients move forward with confidence.
              </p>

              <p>
                At Verta Core, our story is driven by a simple belief: strong partnerships and dependable solutions create lasting success.
              </p>

              <p className="font-semibold text-gold mt-8">
                “Built on Experience. Driven by Reliability. Focused on Your Success.”
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />

      <div className="bg-navy-dark py-6">
        <div className="container-base">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            About VERTACORE
          </Link>
        </div>
      </div>
    </>
  );
}
