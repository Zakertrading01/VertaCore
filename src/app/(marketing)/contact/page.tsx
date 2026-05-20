import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { RFQForm } from "@/components/forms/RFQForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Mail, Clock, Shield } from "lucide-react";

export const dynamic = 'force-dynamic';


export const metadata: Metadata = buildMetadata({
  title: "Contact & Request a Quote",
  description:
    "Request a quotation for industrial equipment or get in touch with the VERTACORE team. ISO 9001:2015 certified. Response within 24 business hours.",
  path: "/contact",
  keywords: ["contact VERTACORE", "request quote industrial", "industrial RFQ"],
});

export default function ContactPage() {
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ];

  const jsonLd = [breadcrumbSchema(breadcrumb), localBusinessSchema()];

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
      <header className="bg-navy-dark pt-32 pb-16">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Get in Touch</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Request a Quote or
            <br />
            <span className="text-gold">Contact Our Team.</span>
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            Submit your requirements and our technical team will respond with
            a comprehensive quotation within 24 business hours.
          </p>

          {/* Contact signals */}
          <div className="flex flex-wrap gap-5 mt-8">
            <div className="flex items-center gap-2.5 text-sm text-steel-muted">
              <Clock className="h-4 w-4 text-gold" />
              Response within 24 hours
            </div>
            <div className="flex items-center gap-2.5 text-sm text-steel-muted">
              <Shield className="h-4 w-4 text-gold" />
              ISO 9001:2015 Certified
            </div>
            <div className="flex items-center gap-2.5 text-sm text-steel-muted">
              <Mail className="h-4 w-4 text-gold" />
              sales@vertacore.com
            </div>
          </div>
        </div>
      </header>

      {/* Forms */}
      <section className="section-padding bg-graphite-subtle">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* RFQ Form */}
            <ScrollReveal>
              <div>
                <SectionLabel className="mb-3">Request a Quote</SectionLabel>
                <h2 className="text-h1 font-bold text-surface mb-2">RFQ Form</h2>
                <p className="text-sm text-surface/50 mb-8">
                  Describe your requirements and we&apos;ll prepare a comprehensive quotation.
                </p>
                <RFQForm source="contact" />
              </div>
            </ScrollReveal>

            {/* Divider + Contact form */}
            <ScrollReveal delay={0.1}>
              <div>
                <SectionLabel className="mb-3">General Enquiry</SectionLabel>
                <h2 className="text-h1 font-bold text-surface mb-2">Send a Message</h2>
                <p className="text-sm text-surface/50 mb-8">
                  For general enquiries, partnership discussions, or non-RFQ questions.
                </p>
                <ContactForm />

                {/* Direct contact info */}
                <div className="mt-10 pt-8 border-t border-steel/20 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-steel-muted mb-2">
                      Email
                    </p>
                    <a
                      href="mailto:sales@vertacore.com"
                      className="text-body text-gold hover:text-gold-muted transition-colors"
                    >
                      sales@vertacore.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-steel-muted mb-2">
                      Response Time
                    </p>
                    <p className="text-sm text-surface/60">Within 24 business hours</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
