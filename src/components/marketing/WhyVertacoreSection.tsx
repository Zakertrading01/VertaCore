"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ShieldCheck, Truck, Wrench, Settings, BookOpen, FileCheck, Layers, Award, Users, Globe, CheckSquare } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";


const pillars = [
  {
    icon: FileCheck,
    title: "Quality Assurance",
    description:
      "Every product certified and verified before supply. Full documentation — datasheets, certificates, test reports — available on request.",
  },
  {
    icon: Users,
    title: "Sector Expertise",
    description:
      "Deep operational knowledge across Oil & Gas, Marine, Construction, Manufacturing, Mining and Fabrication. We understand your compliance requirements.",
  },
  {
    icon: CheckSquare,
    title: "Enterprise Partnership",
    description:
      "Not a transactional vendor — a long-term procurement partner. Dedicated account management, technical consultation, and 24-hour response time.",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    description:
      "International brand network with regional delivery and service capability. We source to specification for specialist requirements.",
  },
];

const services = [
  { name: "Global Procurement", icon: Globe },
  { name: "Logistics & Delivery", icon: Truck },
  { name: "Equipment Rental", icon: Layers },
  { name: "Technical Support", icon: Settings },
  { name: "Safety Training", icon: ShieldCheck },
  { name: "Calibration & Repair", icon: Wrench },
  { name: "Quality Inspections", icon: FileCheck },
  { name: "Online Catalog Mgmt", icon: BookOpen },
  { name: "Enterprise Accounts", icon: Users },
];

const testimonials = [
  {
    quote: "At our generating station with our previous vendor, we struggled to maintain inventory levels of critical compliance products. That changed immediately with VERTACORE. Their supply chain oversight and absolute compliance documentation has given us peace of mind.",
    client: "Will County Generating Station",
    position: "Maintenance Supervisor",
  },
  {
    quote: "We've been using VERTACORE for hard supplies and custom rigging systems. Their customer service is exceptional, enquiries are handled quickly, and the quality certificates are always perfect. They have saved us both time and money.",
    client: "Aaron Ozminkowski",
    position: "Production Manager, Coan Engineering",
  },
  {
    quote: "VERTACORE benefits our corporation on many levels. We not only receive quality certified products for use in our fabrication shop, but also reap the rewards of their technical consultation. Their team goes above and beyond.",
    client: "Adam Gromer",
    position: "QA Manager, Peddinghaus Corp",
  },
];

export function WhyVertacoreSection() {
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);

  return (
    <section
      className="bg-[#FAF9F6] border-t border-navy/5"
      aria-labelledby="why-vertacore-heading"
    >
      {/* 1. What We Do & Portal Registration (Side-by-Side) */}
      <div className="container-base py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: What We Do */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <SectionLabel className="mb-4">Company Overview</SectionLabel>
              <h2
                id="why-vertacore-heading"
                className="text-dmd font-bold text-navy tracking-tight"
              >
                What We Do
              </h2>
              <div className="accent-line bg-gold my-5" />
              <p className="text-body text-navy/75 leading-relaxed">
                Since our founding, VERTACORE has been supplying demanding sectors with an extensive range of certified MRO supplies, welding machinery, safety equipment, and industrial consumables. Whether you are a local engineering lead or a global procurement manager, we are committed to delivering the highest quality products and technical support to keep your operations running safely and efficiently.
              </p>
              <p className="text-sm text-navy/50 leading-relaxed mt-4">
                Our highly trained representatives are committed to providing clients with the best resources in the industry. Our experience and continuous technical training ensure that clients get the service, compliance standards, and up-to-date documentation that help improve their operational efficiency and bottom line.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 bg-steel/20 border border-steel/50 hover:border-gold/30 hover:bg-steel/30 text-surface/90 hover:text-gold text-sm font-semibold px-5.5 py-2.5 rounded-lg transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-1.5 bg-gold text-navy hover:bg-gold-muted text-sm font-semibold px-5.5 py-2.5 rounded-lg transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Register for Enterprise Account */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.15}>
              <div className="card-glass p-7 md:p-8 border border-navy/10 bg-white shadow-xl relative overflow-hidden">
                {/* Visual border accent */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gold" />

                <h3 className="text-[19px] font-bold text-navy mb-2">
                  Register for Enterprise Portal
                </h3>
                <p className="text-xs text-navy/60 mb-6">
                  Get access to contract pricing, fast technical support, and full digital documentation.
                </p>

                <ul className="space-y-3.5 mb-7">
                  {[
                    "Contract & Discounted Pricing",
                    "Dedicated Account Portal",
                    "Fast 24-Hour Response",
                    "Cylinder tracking & gas management",
                    "Digital compliance certificates & SDS",
                    "Manage custom lists and order history",
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-navy/85">
                      <CheckCircle className="h-4.5 w-4.5 text-gold flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full bg-gold text-navy font-bold py-3.5 rounded-lg hover:bg-gold-muted transition-colors text-[15px]"
                >
                  Request Portal Access
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 2. Horizontal Services Grid List */}
        <div className="mt-12 pt-10 border-t border-navy/10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4 text-center">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <ScrollReveal key={srv.name} delay={idx * 0.05}>
                  <div className="flex flex-col items-center p-3 rounded-lg hover:bg-gold/5 transition-all group">
                    <div className="p-2.5 rounded-lg bg-white shadow-sm border border-navy/5 group-hover:bg-gold/10 transition-colors mb-2">
                      <Icon className="h-4.5 w-4.5 text-gold" />
                    </div>
                    <span className="text-xs font-semibold text-navy/80 group-hover:text-gold transition-colors leading-tight">
                      {srv.name}
                    </span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Three Core Focus Columns */}
      <div className="bg-[#f0ede6] border-t border-b border-navy/5 py-10 md:py-16">
        <div className="container-base">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.05}>
              <div className="flex flex-col h-full p-6 bg-white border border-navy/5 shadow-sm rounded-xl">
                <div className="p-3 rounded-lg bg-gold/10 w-fit mb-4">
                  <Award className="h-5.5 w-5.5 text-gold" />
                </div>
                <h3 className="text-[17px] font-bold text-navy mb-2">
                  Nuclear & High-Integrity QA
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed">
                  VERTACORE’s rigorous quality auditing and material certification pipeline allow us to service critical military, power, and high-pressure manufacturing operations globally.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="flex flex-col h-full p-6 bg-white border border-navy/5 shadow-sm rounded-xl">
                <div className="p-3 rounded-lg bg-gold/10 w-fit mb-4">
                  <Globe className="h-5.5 w-5.5 text-gold" />
                </div>
                <h3 className="text-[17px] font-bold text-navy mb-2">
                  Global Sourcing Network
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed">
                  We maintain a robust network of premium international manufacturers to procure specialized, standard-compliant MRO supplies that others cannot find.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="flex flex-col h-full p-6 bg-white border border-navy/5 shadow-sm rounded-xl">
                <div className="p-3 rounded-lg bg-gold/10 w-fit mb-4">
                  <Users className="h-5.5 w-5.5 text-gold" />
                </div>
                <h3 className="text-[17px] font-bold text-navy mb-2">
                  Agile, Independent Partner
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed">
                  We are scaled to handle procurement workflows for multinational corporations, yet remain nimble and independent to make rapid, custom delivery decisions when you need them.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* 4. Customer Testimonials (Weldstar Style) */}
      <div className="container-base py-10 md:py-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <ScrollReveal>
            <SectionLabel className="mb-3">Proven Performance</SectionLabel>
            <h2 className="text-dmd font-bold text-navy tracking-tight">
              What Our Clients Say
            </h2>
            <div className="accent-line bg-gold mx-auto my-4" />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, index) => {
            const isExpanded = expandedTestimonial === index;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white p-6 rounded-xl border border-navy/10 flex flex-col justify-between h-full relative group hover:border-gold/30 hover:shadow-lg transition-all">
                  <div>
                    <span className="text-gold font-serif text-5xl absolute top-3 left-4 opacity-25 pointer-events-none">“</span>
                    <p className={`text-sm text-navy/80 leading-relaxed italic relative z-10 ${!isExpanded ? "line-clamp-4" : ""
                      }`}>
                      {test.quote}
                    </p>
                    <button
                      onClick={() => setExpandedTestimonial(isExpanded ? null : index)}
                      className="text-xs font-semibold text-gold mt-3 hover:text-gold-muted transition-colors flex items-center gap-1 z-15 relative"
                    >
                      {isExpanded ? "[ read less - ]" : "[ read more + ]"}
                    </button>
                  </div>

                  <div className="mt-6 pt-4 border-t border-navy/5 flex flex-col">
                    <span className="text-[14px] font-bold text-navy">
                      {test.client}
                    </span>
                    <span className="text-xs text-navy/50 mt-0.5">
                      {test.position}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
