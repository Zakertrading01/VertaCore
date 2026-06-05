import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { TapLink } from "@/components/shared/TapLink";
import { Mail, Clock, Shield, MapPin, Phone } from "lucide-react";



export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the VERTACORE team for industrial equipment enquiries and technical support.",
  path: "/contact",
  keywords: ["contact VERTACORE", "industrial supply contact", "technical support"],
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
      <header className="bg-navy-dark pt-16 lg:pt-32 pb-8">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Get in Touch</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Contact <span className="text-gold">Our Technical Team.</span>
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            Whether you require industrial supply support, technical sourcing assistance, or project-related solutions, our team is ready to assist you.
          </p>

          {/* Contact signals */}
          <div className="flex flex-wrap gap-5 mt-8">
            <div className="flex items-center gap-2.5 text-sm text-steel-muted">
              <Clock className="h-4 w-4 text-gold" />
              Response within 24 hours
            </div>

            <div className="flex items-center gap-2.5 text-sm text-steel-muted">
              <Mail className="h-4 w-4 text-gold" />
              info@vertacore.com
            </div>
          </div>
        </div>
      </header>

      {/* Forms & Contact Info Grid */}
      <section className="pt-4 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="card-glass p-8 md:p-10 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                  
                  {/* Left Side: Contact Information */}
                  <div className="flex flex-col space-y-8 order-2 lg:order-1 pt-8 lg:pt-0 border-t border-steel/20 lg:border-t-0 lg:border-r lg:pr-12">
                    <div>
                      <h3 className="text-2xl font-bold text-surface mb-1">Verta Core</h3>
                      <p className="text-sm text-gold">Industrial Supply & Solutions</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-steel-muted mb-3">
                          Contact Information
                        </p>
                        <div className="space-y-3 text-sm text-surface/80">
                          <p className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                            <TapLink
                              href="https://maps.google.com/?q=Dar+Al+Salam+Building+Abu+Dhabi"
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={0}
                              className="leading-relaxed hover:text-gold focus:text-gold active:text-gold outline-none transition-colors duration-300"
                            >
                              Office No.44, 11th Floor<br />
                              Dar Al Salam Building<br />
                              Near Al Madina Supermarket, Liwa Street, Corniche,<br />
                              Abu Dhabi, United Arab Emirates
                            </TapLink>
                          </p>
                          <p className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                            <TapLink href="mailto:info@vertacore.com" tabIndex={0} className="hover:text-gold focus:text-gold active:text-gold outline-none transition-colors">
                              info@vertacore.com
                            </TapLink>
                          </p>
                          <p className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                            <TapLink href="tel:+971XXXXX" tabIndex={0} className="hover:text-gold focus:text-gold active:text-gold outline-none transition-colors">
                              +971 XX XXX XXXX
                            </TapLink>
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-steel-muted mb-3">
                          Business Hours
                        </p>
                        <div className="space-y-1.5 text-sm text-surface/80">
                          <p tabIndex={0} className="flex justify-between max-w-[260px] group hover:!text-gold focus:!text-gold active:!text-gold outline-none transition-colors duration-300 cursor-default">
                            <span>Monday – Friday</span>
                            <span className="text-surface/60 group-hover:!text-gold/80 group-focus:!text-gold/80 group-active:!text-gold/80 transition-colors duration-300">8:00 AM – 6:00 PM</span>
                          </p>
                          <p tabIndex={0} className="flex justify-between max-w-[260px] group hover:!text-gold focus:!text-gold active:!text-gold outline-none transition-colors duration-300 cursor-default">
                            <span>Saturday</span>
                            <span className="text-surface/60 group-hover:!text-gold/80 group-focus:!text-gold/80 group-active:!text-gold/80 transition-colors duration-300">8:00 AM – 12:30 PM</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div tabIndex={0} className="bg-navy-dark/30 p-6 rounded-lg border border-steel/10 flex flex-col justify-between mt-auto group hover:border-gold/30 focus:border-gold/30 active:border-gold/30 outline-none transition-colors duration-300 cursor-default">
                      <div>
                        <h3 className="text-lg font-bold text-surface mb-2 group-hover:!text-gold group-focus:!text-gold group-active:!text-gold transition-colors duration-300">Send Us Your Requirement</h3>
                        <p className="text-sm text-surface/70 leading-relaxed mb-4 group-hover:!text-gold/80 group-focus:!text-gold/80 group-active:!text-gold/80 transition-colors duration-300">
                          Our team will respond promptly to support your operational or project needs.
                        </p>

                        <ul className="space-y-2.5 text-sm text-surface/80">
                          <li className="flex items-start gap-3 group-hover:!text-gold/90 group-focus:!text-gold/90 group-active:!text-gold/90 transition-colors duration-300">
                            <div className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                            Industrial Product Inquiries
                          </li>
                          <li className="flex items-start gap-3 group-hover:!text-gold/90 group-focus:!text-gold/90 group-active:!text-gold/90 transition-colors duration-300">
                            <div className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                            EPC Project Support
                          </li>
                          <li className="flex items-start gap-3 group-hover:!text-gold/90 group-focus:!text-gold/90 group-active:!text-gold/90 transition-colors duration-300">
                            <div className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                            Technical Sourcing Requests
                          </li>
                          <li className="flex items-start gap-3 group-hover:!text-gold/90 group-focus:!text-gold/90 group-active:!text-gold/90 transition-colors duration-300">
                            <div className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                            Vendor & Partnership Opportunities
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4 mt-5 border-t border-steel/20">
                        <p className="text-xs font-medium italic text-gold leading-relaxed">
                          Verta Core — Delivering Reliability for Industrial Excellence.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Contact Form */}
                  <div className="order-1 lg:order-2 flex flex-col justify-start">
                    <SectionLabel className="mb-3">General Enquiry</SectionLabel>
                    <h2 className="text-h1 font-bold text-surface mb-2">Send a Message</h2>
                    <p className="text-sm text-surface/50 mb-8">
                      For product enquiries, technical support, or partnership discussions.
                    </p>
                    <ContactForm />
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
