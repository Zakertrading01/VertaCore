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
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </header>

      <section className="pt-12 pb-8 md:pb-12 bg-graphite-subtle relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="container-base max-w-4xl relative z-10">
          <ScrollReveal>
            <div className="bg-navy-dark/40 backdrop-blur-md border border-surface/10 rounded-3xl p-8 md:p-12 shadow-xl">
              <p className="text-lg text-surface/90 leading-relaxed mb-12 border-l-4 border-gold pl-6 font-medium">
                At VERTACORE, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you interact with our services.
              </p>

              <div className="space-y-12">
                {/* Section 1 */}
                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">01.</span> Information We Collect
                  </h2>
                  <p className="text-surface/70 leading-relaxed pl-[3.25rem]">
                    We may collect personal information that you provide to us directly, such as your name, email address, phone number, and company details when you request a quote, subscribe to our newsletter, or contact our support team.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">02.</span> How We Use Your Information
                  </h2>
                  <div className="pl-[3.25rem] space-y-5">
                    <p className="text-surface/70 leading-relaxed">
                      The information we collect is used to:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Process and fulfill your orders for industrial supplies and equipment.",
                        "Provide customer support and respond to your inquiries.",
                        "Send important updates regarding your account or orders.",
                        "Improve our website, services, and product offerings."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-surface/70 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-2xl font-bold text-surface mb-4 flex items-center gap-3">
                    <span className="text-gold text-lg font-mono tracking-wider">03.</span> Data Security
                  </h2>
                  <p className="text-surface/70 leading-relaxed pl-[3.25rem]">
                    We implement robust security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
                  </p>
                </div>

                {/* Contact Section */}
                <div className="bg-surface/5 rounded-2xl p-8 border border-surface/10 mt-12 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h2 className="text-xl font-bold text-surface mb-3">
                      Questions about our policy?
                    </h2>
                    <p className="text-surface/70 leading-relaxed mb-6">
                      If you have any questions or concerns about this Privacy Policy, please contact our privacy team. We're here to help.
                    </p>
                    <a href="mailto:privacy@vertacore.com" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-[#e6c200] transition-colors duration-300 shadow-lg shadow-gold/20">
                      privacy@vertacore.com
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
