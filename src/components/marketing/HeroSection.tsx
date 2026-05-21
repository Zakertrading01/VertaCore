import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-navy-dark overflow-hidden"
      aria-label="Hero"
    >
      {/* Background pattern — industrial grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(231,200,90,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(231,200,90,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark/90"
        aria-hidden="true"
      />

      {/* Right side accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #E7C85A 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative container-base w-full pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <SectionLabel>MRO Industrial Supply · ISO 9001:2015</SectionLabel>
          </div>

          {/* Headline */}
          <h1 className="text-dlg md:text-dxl font-bold text-surface leading-[1.06] tracking-[-0.03em]">
            Certified Industrial
            <br />
            <span className="text-gold">Supply</span> For Demanding
            <br />
            Operations.
          </h1>

          {/* Gold accent line */}
          <div className="accent-line mt-6 mb-6" aria-hidden="true" />

          {/* Sub-headline */}
          <p className="text-body text-surface/65 max-w-xl leading-relaxed">
            Safety equipment, welding systems, lifting &amp; rigging, and MRO
            supplies for Oil &amp; Gas, Marine, Construction and Manufacturing
            operations worldwide.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-8 py-4 rounded-lg hover:bg-gold-muted transition-colors text-[16px]"
            >
              <BookOpen className="h-5 w-5" />
              View Our Catalogue
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-steel/20">
            <div className="text-center">
              <div className="text-h2 font-bold text-gold">ISO 9001:2015</div>
              <div className="text-xs text-surface/50 mt-1 uppercase tracking-wide">Certified</div>
            </div>
            <div className="h-8 w-px bg-steel/30 hidden sm:block" />
            <div className="text-center">
              <div className="text-h2 font-bold text-gold">10+</div>
              <div className="text-xs text-surface/50 mt-1 uppercase tracking-wide">Industries Served</div>
            </div>
            <div className="h-8 w-px bg-steel/30 hidden sm:block" />
            <div className="text-center">
              <div className="text-h2 font-bold text-gold">500+</div>
              <div className="text-xs text-surface/50 mt-1 uppercase tracking-wide">Products Supplied</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="h-8 w-px bg-surface/40" />
        <span className="text-[10px] uppercase tracking-widest text-surface/60">Scroll</span>
      </div>
    </section>
  );
}
