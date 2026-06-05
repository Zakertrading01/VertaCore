"use client";

import Link from "next/link";
import { TapLink } from "@/components/shared/TapLink";
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
              <TapLink 
                href="https://maps.google.com/?q=Office+No.44,+11th+Floor,+Dar+Al+Salam+Building,+Liwa+Street,+Corniche,+Abu+Dhabi,+UAE"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                className="flex items-start gap-2 hover:text-gold focus:text-gold active:text-gold transition-colors outline-none group/address"
              >
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5 group-hover/address:scale-110 transition-transform" />
                <span className="leading-relaxed">
                  Office No.44, 11th Floor<br />
                  Dar Al Salam Building<br />
                  Near Al Madina Supermarket, Liwa Street, Corniche,<br />
                  Abu Dhabi, United Arab Emirates
                </span>
              </TapLink>
              <TapLink href="mailto:info@vertacore.ae" tabIndex={0} className="flex items-center gap-2 hover:text-gold focus:text-gold active:text-gold transition-colors outline-none">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                info@vertacore.ae
              </TapLink>
              <TapLink href="https://www.vertacore.ae" target="_blank" rel="noopener noreferrer" tabIndex={0} className="flex items-center gap-2 hover:text-gold focus:text-gold active:text-gold transition-colors outline-none">
                <Globe className="h-4 w-4 text-gold flex-shrink-0" />
                www.vertacore.ae
              </TapLink>
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
                  <TapLink 
                    href={cat.href} 
                    tabIndex={0}
                    className="text-sm text-white/90 hover:text-gold focus:text-gold active:text-gold transition-colors outline-none"
                  >
                    {cat.title}
                  </TapLink>
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
                  <TapLink 
                    href={item.href} 
                    tabIndex={0}
                    className="text-sm text-white/90 hover:text-gold focus:text-gold active:text-gold transition-colors outline-none"
                  >
                    {item.label}
                  </TapLink>
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
                { icon: Facebook, bg: "bg-[#1877F2]", label: "Facebook", href: "https://facebook.com" },
                { icon: Linkedin, bg: "bg-[#0A66C2]", label: "LinkedIn", href: "https://linkedin.com" },
                { icon: Instagram, bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]", label: "Instagram", href: "https://instagram.com" },
                { icon: Youtube, bg: "bg-[#FF0000]", label: "YouTube", href: "https://youtube.com" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <TapLink
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    tabIndex={0}
                    className={`w-10 h-10 rounded-full ${social.bg} flex items-center justify-center shadow-lg hover:scale-110 hover:opacity-100 focus:scale-110 focus:opacity-100 active:scale-110 active:opacity-100 hover:ring-2 hover:ring-gold hover:ring-offset-2 hover:ring-offset-[#061022] hover:shadow-[0_0_20px_rgba(250,204,21,0.8)] focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-[#061022] focus:shadow-[0_0_20px_rgba(250,204,21,0.8)] active:ring-2 active:ring-gold active:ring-offset-2 active:ring-offset-[#061022] active:shadow-[0_0_20px_rgba(250,204,21,0.8)] outline-none transition-all duration-300`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </TapLink>
                );
              })}
            </div>


          </div>

        </div>


        {/* 3. Bottom Credits */}
        <div className="border-t border-steel/20 py-2 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/90">
          <div className="flex flex-wrap items-center gap-4">
            <span tabIndex={0} className="text-sm font-medium hover:text-gold focus:text-gold active:text-gold transition-colors cursor-pointer outline-none">© {new Date().getFullYear()} VERTACORE Company, Inc. All Rights Reserved.</span>
            <span className="hidden sm:inline">|</span>
            <TapLink href="/privacy" tabIndex={0} className="text-sm font-medium hover:text-gold focus:text-gold active:text-gold transition-colors outline-none">Privacy Policy</TapLink>
            <TapLink href="/terms" tabIndex={0} className="text-sm font-medium hover:text-gold focus:text-gold active:text-gold transition-colors outline-none">Terms of Service</TapLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
