"use client";

import Link from "next/link";
import { Mail, Phone, Clock, MapPin, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const popularCategories = [
  { title: "Safety Systems", href: "/solutions/safety-systems" },
  { title: "Welding Systems", href: "/solutions/welding-systems" },
  { title: "Lifting & Rigging", href: "/solutions/lifting-rigging" },
  { title: "Abrasives", href: "/solutions/abrasives" },
  { title: "Industrial Tools", href: "/solutions/industrial-tools" },
];

const customerCare = [
  { label: "About VERTACORE", href: "/about" },
  { label: "Certifications", href: "/certifications" },
  { label: "Brands & Partners", href: "/brands" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const myAccount = [
  { label: "Online Registration", href: "/contact" },
  { label: "Go Paperless", href: "/contact" },
  { label: "Credit Application", href: "/contact" },
  { label: "Customer Service", href: "/contact" },
];

const branches = [
  { name: "Houston, TX (HQ)", hours: "Mon - Fri: 7:30am - 4:30pm (CST)", phone: "713-555-0190" },
  { name: "Chicago, IL", hours: "Mon - Fri: 7:30am - 4:30pm (CST)", phone: "312-555-0145" },
  { name: "Rotterdam, NL", hours: "Mon - Fri: 8:00am - 5:00pm (CET)", phone: "+31 10 555 0122" },
  { name: "Singapore", hours: "Mon - Fri: 8:00am - 5:00pm (SST)", phone: "+65 6777 0199" },
  { name: "Aberdeen, UK", hours: "Mon - Fri: 8:00am - 5:00pm (GMT)", phone: "+44 1224 555190" },
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
              <span className="font-bold text-[15px] tracking-[0.12em] text-gold uppercase">
                VERTACORE
              </span>
            </Link>
            <p className="text-sm text-steel-muted leading-relaxed max-w-xs">
              Premium MRO industrial supply and procurement. Certified safety equipment, welding systems, lifting & rigging, and industrial consumables for demanding operations worldwide.
            </p>
            <div className="space-y-2 pt-2">
              <a href="mailto:sales@vertacore.com" className="flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                sales@vertacore.com
              </a>
              <a href="tel:18559984875" className="flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                +1-855-VERTACORE (Support)
              </a>
            </div>

            {/* Cert Badge */}
            <div className="inline-flex items-center gap-2 border border-gold/20 bg-gold/5 rounded-lg px-3 py-1.5 mt-2">
              <div className="h-2 w-2 rounded-full bg-gold animate-pulse flex-shrink-0" />
              <span className="text-[10px] font-bold text-gold tracking-wider uppercase">
                ISO 9001:2015 CERTIFIED
              </span>
            </div>
          </div>

          {/* Column 2: Popular Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-surface/50 mb-4 pb-1 border-b border-steel/20">
              Popular Categories
            </h3>
            <ul className="space-y-2.5">
              {popularCategories.map((cat) => (
                <li key={cat.title}>
                  <Link href={cat.href} className="text-sm text-steel-muted hover:text-gold transition-colors">
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: My Account */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-surface/50 mb-4 pb-1 border-b border-steel/20">
              My Account
            </h3>
            <ul className="space-y-2.5">
              {myAccount.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-steel-muted hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Care */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-surface/50 mb-4 pb-1 border-b border-steel/20">
              Customer Care
            </h3>
            <ul className="space-y-2.5">
              {customerCare.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-steel-muted hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Keep in Touch / Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-surface/50 mb-4 pb-1 border-b border-steel/20">
              Keep In Touch
            </h3>

            {/* Social Grid */}
            <div className="flex items-center gap-3.5 mb-4">
              <a href="#" aria-label="Facebook" className="p-2 bg-navy-light/45 rounded-lg border border-steel/30 text-steel-muted hover:text-gold hover:border-gold/30 transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 bg-navy-light/45 rounded-lg border border-steel/30 text-steel-muted hover:text-gold hover:border-gold/30 transition-all">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 bg-navy-light/45 rounded-lg border border-steel/30 text-steel-muted hover:text-gold hover:border-gold/30 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 bg-navy-light/45 rounded-lg border border-steel/30 text-steel-muted hover:text-gold hover:border-gold/30 transition-all">
                <Youtube className="h-4 w-4" />
              </a>
            </div>

            <div className="pt-2">
              <span className="block text-xs font-semibold text-surface/80">Newsletter</span>
              <p className="text-[11px] text-steel-muted mt-1 mb-3">Stay up to date with MRO supply news.</p>
              <NewsletterForm compact />
            </div>
          </div>

        </div>

        {/* 2. Branch Locations List (Weldstar Style) */}
        <div id="locations" className="border-t border-steel/20 py-10 scroll-mt-24">
          <h3 className="text-xs font-bold uppercase tracking-widest text-surface/50 mb-6">
            VERTACORE Branch Locations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {branches.map((b) => (
              <div key={b.name} className="p-4 rounded-lg bg-navy-light/20 border border-steel/30 hover:border-gold/15 transition-all">
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                  <span className="text-[13px] font-bold text-surface">{b.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-steel-muted mb-1.5">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  <span>{b.hours}</span>
                </div>
                <a href={`tel:${b.phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-1.5 text-xs text-gold/80 hover:text-gold transition-colors font-medium">
                  <Phone className="h-3 w-3 flex-shrink-0" />
                  <span>{b.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Bottom Credits & Certifying Bodies */}
        <div className="border-t border-steel/20 py-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel-muted">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} VERTACORE Company, Inc. All Rights Reserved.</span>
            <span className="hidden sm:inline">|</span>
            <Link href="/privacy" className="hover:text-surface transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-surface transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-4 text-[10px] tracking-wider uppercase font-semibold text-steel-muted/65">
            <span>ASME Boiler Code</span>
            <span>AWS Member</span>
            <span>ANSI Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
