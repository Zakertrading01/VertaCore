"use client";

import Link from "next/link";
import { Mail, Phone, Clock, MapPin, Facebook, Linkedin, Instagram, Youtube, Globe } from "lucide-react";


const popularCategories = [
  { title: "Industrial Supply Solutions", href: "/solutions/industrial-supply" },
  { title: "Welding & Fabrication Solutions", href: "/solutions/welding-fabrication" },
  { title: "Safety & PPE Solutions", href: "/solutions/safety-ppe" },
  { title: "Lifting & Material Handling", href: "/solutions/lifting-handling" },
  { title: "Technical Procurement Support", href: "/solutions/technical-procurement" },
  { title: "Project Supply & Logistics", href: "/solutions/project-logistics" },
];

const customerCare = [
  { label: "About VERTACORE", href: "/about" },
  // { label: "Certifications", href: "/certifications" },
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


export function Footer() {
  return (
    <footer id="footer" className="bg-navy-dark border-t border-steel/30" role="contentinfo">
      {/* Main footer content */}
      <div className="container-base pt-10 md:pt-12 pb-4 md:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center group mb-1">
              <img
                src="/image.png"
                alt="VERTACORE"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <div className="space-y-3 text-sm text-white/90">
              <a 
                href="https://maps.google.com/?q=Office+No.44,+11th+Floor,+Trustwell+Properties+Dar+Al+Salam+Building,+Liwa+Street,+Corniche,+Abu+Dhabi,+UAE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-gold transition-colors group/address"
              >
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5 group-hover/address:scale-110 transition-transform" />
                <span className="leading-relaxed">
                  Office No.44, 11th Floor<br />
                  Trustwell Properties Dar Al Salam Building<br />
                  Near Al Madina Supermarket, Liwa Street, Corniche,<br />
                  Abu Dhabi, United Arab Emirates
                </span>
              </a>
              <a href="mailto:info@vertacore.ae" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                info@vertacore.ae
              </a>
              <a href="https://www.vertacore.ae" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Globe className="h-4 w-4 text-gold flex-shrink-0" />
                www.vertacore.ae
              </a>
            </div>


          </div>

          {/* Column 2: Popular Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 pb-1 border-b border-steel/20">
              Popular Categories
            </h3>
            <ul className="space-y-2.5">
              {popularCategories.map((cat) => (
                <li key={cat.title}>
                  <Link href={cat.href} className="text-sm text-white/90 hover:text-gold transition-colors">
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          {/* Column 4: Customer Care */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 pb-1 border-b border-steel/20">
              Customer Care
            </h3>
            <ul className="space-y-2.5">
              {customerCare.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/90 hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Keep in Touch / Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 pb-1 border-b border-steel/20">
              Keep In Touch
            </h3>

            {/* Social Grid */}
            <div className="flex items-center gap-3.5 mb-4">
              {[
                { icon: Facebook, color: "#1877F2", label: "Facebook", href: "https://facebook.com" },
                { icon: Linkedin, color: "#0A66C2", label: "LinkedIn", href: "https://linkedin.com" },
                { icon: Instagram, color: "#E4405F", label: "Instagram", href: "https://instagram.com" },
                { icon: Youtube, color: "#FF0000", label: "YouTube", href: "https://youtube.com" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-gold transition-all duration-300 group/social"
                    style={{ color: social.color }}
                  >
                    <Icon className="h-4 w-4 transition-colors group-hover/social:!text-navy-dark" />
                  </a>
                );
              })}
            </div>


          </div>

        </div>


        {/* 3. Bottom Credits & Certifying Bodies */}
        <div className="border-t border-steel/20 py-2 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/90">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium hover:text-gold transition-colors cursor-pointer">© {new Date().getFullYear()} VERTACORE Company, Inc. All Rights Reserved.</span>
            <span className="hidden sm:inline">|</span>
            <Link href="/privacy" className="text-sm font-medium hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm font-medium hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
