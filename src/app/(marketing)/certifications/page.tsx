import type { Metadata } from "next";
import Link from "next/link";
import { Download, Award, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';



export const metadata: Metadata = buildMetadata({
  title: "Certifications & Quality Standards",
  description:
    "VERTACORE is ISO 9001:2015 certified. Every product we supply meets internationally recognised safety and quality standards including CE, EN, and ANSI.",
  path: "/certifications",
  keywords: [
    "ISO 9001 certified supplier",
    "CE certified industrial equipment",
    "EN standards supplier",
    "industrial quality certifications",
  ],
});

const faqs = [
  {
    question: "Is VERTACORE ISO 9001:2015 certified?",
    answer:
      "Yes. VERTACORE holds ISO 9001:2015 certification from an internationally accredited certification body. Our quality management system governs sourcing, supply chain management, and customer service processes.",
  },
  {
    question: "Can I download certificates for products VERTACORE supplies?",
    answer:
      "Yes. Product compliance certificates, test reports, and material documentation are available on request. Contact our team directly.",
  },
  {
    question: "What standards do VERTACORE products meet?",
    answer:
      "Products supplied by VERTACORE meet applicable international standards including CE marking, EN (European Norm), ANSI (American National Standards Institute), ASME, and other sector-specific standards relevant to Oil & Gas, Marine, and Construction operations.",
  },
  {
    question: "How does VERTACORE verify product compliance?",
    answer:
      "All products are sourced from manufacturers with verified certification documentation. VERTACORE maintains records of product compliance and can provide supporting documentation — datasheets, test certificates, and conformity declarations — on request.",
  },
];

export default async function CertificationsPage() {
  const certifications = await db.certification.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Certifications", href: "/certifications" },
  ];

  const jsonLd = [breadcrumbSchema(breadcrumb), faqSchema(faqs)];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header */}
      <header className="bg-navy-dark pt-32 pb-8">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Quality & Compliance</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Certified to international
            <br />
            <span className="text-gold">safety and quality standards.</span>
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            Every item VERTACORE supplies is certified to internationally recognised
            standards. Full documentation available on request.
          </p>
        </div>
      </header>

      {/* Certification cards */}
      <section className="pt-4 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base">
          {certifications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {certifications.map((cert, i) => (
                <ScrollReveal key={cert.id} delay={i * 0.07}>
                  <div className="card-base flex flex-col p-6 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gold/10 flex-shrink-0">
                        <Award className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h2 className="text-[17px] font-bold text-surface">{cert.name}</h2>
                        <p className="text-xs text-gold/70 mt-0.5">{cert.body}</p>
                      </div>
                    </div>

                    {cert.description && (
                      <p className="text-sm text-steel-muted leading-relaxed flex-1 mb-4">
                        {cert.description}
                      </p>
                    )}

                    {cert.validUntil && (
                      <p className="text-xs text-steel-muted mb-3">
                        Valid until:{" "}
                        <span className="text-surface/60">{formatDate(cert.validUntil)}</span>
                      </p>
                    )}

                    {cert.documentUrl && (
                      <a
                        href={cert.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-muted transition-colors mt-auto"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download Certificate
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Static placeholder certifications when DB empty */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  name: "ISO 9001:2015",
                  body: "International Organization for Standardization",
                  description:
                    "Quality management system certification ensuring consistent service and supply chain excellence across all operations.",
                },
                {
                  name: "CE Marking",
                  body: "European Conformity",
                  description:
                    "All applicable products conform to European health, safety and environmental protection requirements.",
                },
                {
                  name: "EN Standards",
                  body: "European Standards",
                  description:
                    "Products supplied meet relevant EN norms including EN 361 (harnesses), EN 397 (helmets), EN 818 (lifting chains) and others.",
                },
                {
                  name: "ANSI Standards",
                  body: "American National Standards Institute",
                  description:
                    "Applicable products comply with ANSI Z359 fall protection, ANSI/ASME B30 lifting equipment and related North American standards.",
                },
                {
                  name: "oSa / MPA Certified",
                  body: "Organisation for the Safety of Abrasives",
                  description:
                    "Abrasive products supplied by VERTACORE carry oSa or MPA certification ensuring grinding and cutting wheel safety.",
                },
                {
                  name: "ATEX Compliant",
                  body: "Atmosphere Explosibles",
                  description:
                    "Selected products for explosive atmosphere environments (ATEX Zone 1/2) available on request for Oil & Gas and Marine applications.",
                },
              ].map((cert, i) => (
                <ScrollReveal key={cert.name} delay={i * 0.07}>
                  <div className="card-base flex flex-col p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gold/10 flex-shrink-0">
                        <Award className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h2 className="text-[17px] font-bold text-surface">{cert.name}</h2>
                        <p className="text-xs text-gold/70 mt-0.5">{cert.body}</p>
                      </div>
                    </div>
                    <p className="text-sm text-steel-muted leading-relaxed">{cert.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-navy">
        <div className="container-base max-w-3xl">
          <ScrollReveal>
            <SectionLabel className="mb-4">Common Questions</SectionLabel>
            <h2 className="text-h1 font-bold text-surface mb-8">
              Certification FAQ
            </h2>
            <dl className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="card-base p-5 cursor-pointer"
                >
                  <summary className="text-[15px] font-semibold text-surface list-none flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <span className="text-gold flex-shrink-0 text-lg leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-surface/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
