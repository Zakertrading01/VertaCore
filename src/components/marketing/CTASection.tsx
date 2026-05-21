import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function CTASection() {
  return (
    <section
      className="section-padding relative bg-[#FAF9F6] border-t border-navy/5 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Gold accent strip */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-40"
        aria-hidden="true"
      />

      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(ellipse, #E7C85A 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative container-base text-center">
        <ScrollReveal>
          <SectionLabel className="mb-4">Get Started</SectionLabel>
          <h2 className="text-dmd font-bold text-navy tracking-tight">
            Ready to source certified
            <br />
            <span className="text-gold">industrial equipment?</span>
          </h2>
          <p className="mt-4 text-body text-navy/60 max-w-xl mx-auto leading-relaxed">
            Speak with our technical team. Submit your enquiries and our specialists will respond within 24 business hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-10 py-4 rounded-lg hover:bg-gold-muted transition-colors text-[16px]"
            >
              <Download className="h-5 w-5" />
              Download Catalogue
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-navy/40">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              ISO 9001:2015 Certified
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              No obligation enquiry
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
