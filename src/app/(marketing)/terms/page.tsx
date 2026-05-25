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
      <header className="bg-navy-dark pt-32 pb-8">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <SectionLabel className="mb-3">Legal</SectionLabel>
          <h1 className="text-dlg font-bold text-surface max-w-2xl tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-body text-surface/60 max-w-xl leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </header>

      <section className="pt-12 pb-24 md:pb-32 bg-graphite-subtle min-h-screen">
        <div className="container-base max-w-3xl">
          <ScrollReveal>
            <div className="space-y-6 text-body text-surface/80 leading-relaxed">
              <p>
                Welcome to VERTACORE. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use VERTACORE's website if you do not accept all of the terms and conditions stated on this page.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">2. Use License</h2>
              <p>
                Unless otherwise stated, VERTACORE and/or its licensors own the intellectual property rights for all material on VERTACORE. All intellectual property rights are reserved. You may view and/or print pages from https://www.vertacore.com for your own personal use subject to restrictions set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Republish material from this website.</li>
                <li>Sell, rent or sub-license material from this website.</li>
                <li>Reproduce, duplicate or copy material from this website.</li>
              </ul>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">3. Disclaimer</h2>
              <p>
                The materials on VERTACORE's website are provided on an 'as is' basis. VERTACORE makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h2 className="text-xl font-bold text-surface mt-10 mb-4">4. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
