import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | VERTACORE",
  description: "Terms of Service for VERTACORE. Read our terms and conditions.",
  path: "/terms",
});

export default function TermsPage() {
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <>
      <header className="bg-navy-dark pt-16 lg:pt-32 pb-2">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Legal</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            Effective Date: June 1, 2025
          </p>
        </div>
      </header>

      <section className="pt-4 pb-8 md:pb-12 bg-graphite-subtle">
        <div className="container-base max-w-3xl">
          <ScrollReveal>
            <div className="space-y-6 text-body text-surface/80 leading-relaxed">
              <p>
                Welcome to VERTACORE. These Terms of Service govern your access to and use of our website at{" "}
                <a href="https://www.vertacore.ae" className="text-gold hover:underline">https://www.vertacore.ae</a>{" "}
                and any related services provided by VERTACORE. By accessing or using our website, you agree to be bound by these terms in full.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing this website, you confirm that you accept these terms and conditions in full and that you agree to comply with them. If you do not agree to these terms, you must not use our website.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">2. About VERTACORE</h2>
              <p>
                VERTACORE is an industrial supply and trading company registered and operating in the United Arab Emirates. Our registered office is at Office No. 44, 11th Floor, Trustwell Properties Dar Al Salam Building, Liwa Street, Corniche, Abu Dhabi, UAE. We supply MRO products, safety equipment, welding consumables, lifting gear, and related industrial materials to commercial and industrial clients.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">3. Use License</h2>
              <p>
                Unless otherwise stated, VERTACORE and/or its licensors own all intellectual property rights for material published on this website. All rights are reserved. You may view and/or print pages from{" "}
                <a href="https://www.vertacore.ae" className="text-gold hover:underline">https://www.vertacore.ae</a>{" "}
                for your own personal or internal business reference, subject to the restrictions in these terms.
              </p>
              <p>You must not:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Republish, redistribute, or reproduce material from this website in any medium without prior written permission.</li>
                <li>Sell, rent, or sub-license material from this website.</li>
                <li>Use content from this website for any commercial purpose without authorisation.</li>
                <li>Scrape, crawl, or systematically extract data from this website.</li>
                <li>Use this website in any way that is unlawful or harmful to VERTACORE or any third party.</li>
              </ul>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">4. Requests for Quotation (RFQ)</h2>
              <p>
                Submitting an RFQ through our website constitutes an enquiry only and does not create a binding purchase order or contract. All quotations issued by VERTACORE are subject to separate written confirmation and acceptance. Pricing, availability, and lead times are subject to change without notice until a formal purchase order is accepted by VERTACORE in writing.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">5. Accuracy of Information</h2>
              <p>
                VERTACORE endeavours to ensure that information on this website is accurate and up to date. However, product specifications, brand availability, certifications, and pricing displayed on this website are for reference purposes only and may change without notice. We do not warrant the completeness or accuracy of any information provided on this website.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">6. Disclaimer of Warranties</h2>
              <p>
                The materials on VERTACORE&apos;s website are provided on an &apos;as is&apos; basis. VERTACORE makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property rights. VERTACORE does not warrant that the website will be available uninterrupted, error-free, or free of viruses or other harmful components.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable UAE law, VERTACORE shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, this website or its content. This includes, without limitation, loss of data, loss of profit, or business interruption, even if VERTACORE has been advised of the possibility of such damages.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">8. Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites. These links are provided for your convenience only. VERTACORE has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">9. Privacy</h2>
              <p>
                Your use of this website is also governed by our{" "}
                <a href="/privacy" className="text-gold hover:underline">Privacy Policy</a>,
                which is incorporated into these terms by reference. By using this website, you consent to the processing of your personal data as described in our Privacy Policy.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">10. Changes to Terms</h2>
              <p>
                VERTACORE reserves the right to revise these terms at any time. Revised terms will be posted on this page with an updated effective date. Your continued use of the website after any changes constitutes your acceptance of the new terms.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">11. Governing Law & Jurisdiction</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United Arab Emirates and the Emirate of Abu Dhabi. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Abu Dhabi, UAE.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">12. Contact</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:{" "}
                <a href="mailto:info@vertacore.ae" className="text-gold hover:underline">info@vertacore.ae</a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
