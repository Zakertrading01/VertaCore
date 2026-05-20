"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const solutions = [
  { title: "Safety Systems", slug: "safety-systems" },
  { title: "Welding Systems", slug: "welding-systems" },
  { title: "Lifting & Rigging", slug: "lifting-rigging" },
  { title: "Abrasives", slug: "abrasives" },
  { title: "Industrial Tools", slug: "industrial-tools" },
];

const industries = [
  { name: "Oil & Gas", slug: "oil-gas" },
  { name: "Marine", slug: "marine" },
  { name: "Construction", slug: "construction" },
  { name: "Manufacturing", slug: "manufacturing" },
  { name: "Mining", slug: "mining" },
];

const company = [
  { label: "About VERTACORE", href: "/about" },
  { label: "Certifications", href: "/certifications" },
  { label: "Brands & Partners", href: "/brands" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-steel/30" role="contentinfo">
      {/* Main footer content */}
      <div className="container-base py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="h-7 w-7 rounded bg-gold flex items-center justify-center flex-shrink-0">
                <span className="text-navy font-black text-xs tracking-tighter">VC</span>
              </div>
              <span className="font-bold text-[15px] tracking-[0.12em] text-surface uppercase">
                VERTACORE
              </span>
            </Link>

            <p className="text-sm text-steel-muted leading-relaxed max-w-xs mt-3">
              Premium MRO industrial supply and procurement. Certified safety equipment,
              welding systems, lifting & rigging, and industrial consumables for
              demanding operations worldwide.
            </p>

            <div className="mt-5 space-y-2">
              <a
                href="mailto:sales@vertacore.com"
                className="flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors"
              >
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                sales@vertacore.com
              </a>
            </div>

            {/* ISO badge */}
            <div className="mt-6 inline-flex items-center gap-2 border border-gold/20 bg-gold/5 rounded-lg px-3 py-2">
              <div className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
              <span className="text-xs font-semibold text-gold tracking-wide">
                ISO 9001:2015 CERTIFIED
              </span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-surface/50 mb-4">
              Solutions
            </h3>
            <ul className="space-y-2.5">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="text-sm text-steel-muted hover:text-gold transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/catalogue"
                  className="text-sm text-gold/70 hover:text-gold transition-colors font-medium"
                >
                  View Catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-surface/50 mb-4">
              Industries
            </h3>
            <ul className="space-y-2.5">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="text-sm text-steel-muted hover:text-gold transition-colors"
                  >
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-surface/50 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-steel-muted hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-14 pt-10 border-t border-steel/20">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <p className="text-sm font-semibold text-surface/80">
                Industry Updates
              </p>
              <p className="text-xs text-steel-muted mt-1">
                Technical insights and procurement updates.
              </p>
            </div>
            <div className="flex-1 max-w-sm">
              <NewsletterForm compact />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-steel/20">
        <div className="container-base py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-steel-muted">
            © {new Date().getFullYear()} VERTACORE. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-steel-muted hover:text-surface/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-steel-muted hover:text-surface/60 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
