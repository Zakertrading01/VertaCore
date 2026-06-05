import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | VERTACORE",
  description: "Privacy Policy for VERTACORE. Learn how we collect, use, and protect your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <>
      <header className="bg-navy-dark pt-16 lg:pt-32 pb-2">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Legal</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            Effective Date: June 1, 2025
          </p>
        </div>
      </header>

      <section className="pt-12 pb-8 md:pb-12 bg-graphite-subtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="container-base max-w-4xl relative z-10">
          <ScrollReveal>
            <div className="bg-navy-dark/40 backdrop-blur-md border border-surface/10 rounded-3xl p-8 md:p-12 shadow-xl">
              <p className="text-lg text-surface/90 leading-relaxed mb-12 border-l-4 border-gold pl-6 font-medium">
                At VERTACORE, we are committed to protecting your privacy and handling your personal data responsibly. This Privacy Policy explains what information we collect, how we use it, who we share it with, and your rights under applicable law — including the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL).
              </p>

              <div className="space-y-12">

                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">01.</span> Who We Are
                  </h2>
                  <p className="text-surface/70 leading-relaxed pl-[3.25rem]">
                    VERTACORE is an industrial supply and trading company registered in the United Arab Emirates. Our registered office is at Office No. 44, 11th Floor, Dar Al Salam Building, Liwa Street, Corniche, Abu Dhabi, UAE. For privacy-related matters, you can contact us at{" "}
                    <a href="mailto:info@vertacore.ae" className="text-gold hover:underline">info@vertacore.ae</a>.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">02.</span> Information We Collect
                  </h2>
                  <div className="pl-[3.25rem] space-y-4 text-surface/70 leading-relaxed">
                    <p>We collect personal information in the following ways:</p>
                    <p className="font-semibold text-surface/90">Information you provide directly:</p>
                    <ul className="space-y-2">
                      {[
                        "Name, job title, and company name",
                        "Email address and phone number",
                        "Mailing or delivery address",
                        "Details submitted via RFQ forms, contact forms, or newsletter sign-up",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="font-semibold text-surface/90">Information collected automatically:</p>
                    <ul className="space-y-2">
                      {[
                        "IP address and browser type",
                        "Pages visited and time spent on the website",
                        "Referring URLs and device information",
                        "Cookies and similar tracking technologies (see Section 7)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">03.</span> How We Use Your Information
                  </h2>
                  <div className="pl-[3.25rem] space-y-3 text-surface/70 leading-relaxed">
                    <p>We use your personal data for the following purposes:</p>
                    <ul className="space-y-2">
                      {[
                        "To respond to RFQ submissions, enquiries, and support requests",
                        "To process and manage procurement transactions and supply orders",
                        "To send transactional communications related to your enquiries or orders",
                        "To send our newsletter or industry updates (only with your consent)",
                        "To improve our website, services, and product catalogue",
                        "To comply with our legal and regulatory obligations under UAE law",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">04.</span> Sharing Your Information
                  </h2>
                  <div className="pl-[3.25rem] space-y-3 text-surface/70 leading-relaxed">
                    <p>We do not sell your personal data. We may share it with:</p>
                    <ul className="space-y-2">
                      {[
                        "Trusted service providers who assist us in operating our website and business (e.g. hosting, email delivery, analytics) — bound by confidentiality obligations",
                        "Our brand and supplier partners, only to the extent required to fulfil your enquiry or order",
                        "Regulatory or government authorities where required by UAE law",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">05.</span> Data Retention
                  </h2>
                  <p className="text-surface/70 leading-relaxed pl-[3.25rem]">
                    We retain your personal data only for as long as necessary to fulfil the purposes described in this policy, or as required by applicable UAE law. RFQ and enquiry data is typically retained for up to 3 years. Newsletter subscriber data is retained until you unsubscribe. You may request deletion of your data at any time (see Section 8).
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">06.</span> Data Security
                  </h2>
                  <p className="text-surface/70 leading-relaxed pl-[3.25rem]">
                    We implement appropriate technical and organisational security measures to protect your personal data against unauthorised access, loss, alteration, or disclosure. Our website is served over HTTPS and data is stored on secure, access-controlled infrastructure. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security but we take reasonable steps to protect your information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">07.</span> Cookies
                  </h2>
                  <p className="text-surface/70 leading-relaxed pl-[3.25rem]">
                    Our website uses cookies and similar technologies to improve your browsing experience and analyse website traffic. These include essential cookies (required for the site to function) and analytics cookies (e.g. to understand page visits). You can control cookie preferences through your browser settings. Disabling cookies may affect the functionality of certain parts of our website.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">08.</span> Your Rights
                  </h2>
                  <div className="pl-[3.25rem] space-y-3 text-surface/70 leading-relaxed">
                    <p>Under the UAE Personal Data Protection Law (PDPL) and applicable regulations, you have the right to:</p>
                    <ul className="space-y-2">
                      {[
                        "Access the personal data we hold about you",
                        "Request correction of inaccurate or incomplete data",
                        "Request deletion of your personal data (subject to legal retention obligations)",
                        "Withdraw consent for marketing communications at any time",
                        "Object to processing of your data in certain circumstances",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>To exercise any of these rights, contact us at <a href="mailto:info@vertacore.ae" className="text-gold hover:underline">info@vertacore.ae</a>.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">09.</span> Children&apos;s Privacy
                  </h2>
                  <p className="text-surface/70 leading-relaxed pl-[3.25rem]">
                    Our website and services are intended for business and professional use. We do not knowingly collect personal data from individuals under the age of 18. If you believe a minor has submitted data to us, please contact us and we will delete it promptly.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">10.</span> Changes to This Policy
                  </h2>
                  <p className="text-surface/70 leading-relaxed pl-[3.25rem]">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. The effective date at the top of this page will be updated accordingly. We encourage you to review this policy periodically.
                  </p>
                </div>

                <div className="bg-surface/5 rounded-2xl p-8 border border-surface/10 mt-12 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h2 className="text-xl font-bold text-surface mb-3">
                      Questions about our policy?
                    </h2>
                    <p className="text-surface/70 leading-relaxed mb-6">
                      If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us. We aim to respond within 5 business days.
                    </p>
                    <a href="mailto:info@vertacore.ae" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-[#e6c200] transition-colors duration-300 shadow-lg shadow-gold/20">
                      info@vertacore.ae
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
