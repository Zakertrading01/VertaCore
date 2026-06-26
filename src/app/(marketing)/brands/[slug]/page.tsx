import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CTASection } from "@/components/marketing/CTASection";
import { getBrand } from "@/lib/cached-queries";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug.includes('.')) return {};

  const brand = await getBrand(slug);
  if (!brand) return {};

  return buildMetadata({
    title: `${brand.name} — Industrial Equipment`,
    description: brand.description ?? `VERTA CORE supplies ${brand.name} products.`,
    path: `/brands/${slug}`,
    image: brand.logo ?? undefined,
  });
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug.includes('.')) notFound();

  let brand = await getBrand(slug);

  // Fallback for key brands if not in DB
  if (!brand) {
    const fallbacks: Record<string, any> = {
      techweld: { name: "TECHWELD", description: "Techweld industrial technologies limited is a leading manufacturer and supplier of professional welding accessories, tools and tackles.", country: "United Kingdom", logo: "/brands/techweld.jpeg" },
      geotex: { name: "GEOTEX", description: "One of the leading industry supplier of welding curtains, welding blankets and welding pads to protect people, plants, and equipment.", country: "Netherlands", logo: "/brands/geotex.jpeg" },
      weldman: { name: "WELDMAN", description: "Manufacturer of welding products for various industries like oilfield, construction and marine with all relevant international standards.", country: "Global", logo: "/brands/weldman.jpeg" },
      superon: { name: "SUPERON", description: "One of the largest manufacturers of high-quality welding consumables, stainless steel wires, and industrial coatings.", country: "Global", logo: "/brands/superon.jpeg" },
      gasiq: { name: "GASIQ", description: "Swedish manufacturer of equipment for gas welding, soldering, cutting and gas control for gas shielded welding.", country: "Sweden", logo: "/brands/gasiq.jpeg" },
      sakura: { name: "SAKURA", description: "Leading pigment technology expert. Sakura manufactures smooth writing solid paint markers and industrial markers.", country: "Japan", logo: "/brands/sakura.jpeg" },
    };
    brand = fallbacks[slug];
  }

  if (!brand) notFound();

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: brand.name, href: `/brands/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumb)) }}
      />

      <header className="bg-navy-dark pt-16 lg:pt-24 pb-4">
        <div className="container-base">
          <Breadcrumb items={breadcrumb} className="mb-6" />
          <div>
            <SectionLabel className="mb-2">Brand Partner</SectionLabel>
            <h1 className="text-dmd font-bold text-surface">{brand.name}</h1>
            {brand.country && (
              <p className="text-sm text-steel-muted mt-1">{brand.country}</p>
            )}
          </div>
        </div>
      </header>

      <section className="pt-2 pb-16 md:pb-24 bg-graphite-subtle">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-6">
            {/* Left Content Area */}
            <div className="lg:col-span-8 lg:pr-8">
              {brand.description && (
                <p className="text-body text-surface leading-relaxed mb-6">
                  {brand.description}
                </p>
              )}

              {slug === 'sakura' && (
                <div className="text-surface text-body leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <p className="mb-4">
                    SAKURA offers industrial marking solutions designed for various operating conditions and applications. Its product range includes solid markers, paint markers, crayon markers.
                  </p>
                  <p>
                    The brand offers different types of markers designed for specific environments such as high temperature, low temperature, corrosion-sensitive areas, metal fabrication, forestry, road maintenance, and temporary marking applications.
                  </p>
                </div>
              )}

              {slug === 'geotex' && (
                <div className="text-surface text-body leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <p className="mb-4">
                    GEOTEX is a manufacturer specializing in welding protection, fire safety, and industrial protection solutions. The brand offers products designed to protect workers, equipment, and work areas from heat, sparks, flames, molten metal splashes, ultraviolet radiation, and harsh environmental conditions.
                  </p>
                  <p>
                    GEOTEX products are widely used in fabrication, welding, thermal insulation, metal processing, and industrial maintenance applications. Their product range includes fire blankets, welding curtains, screens, flame-retardant tarpaulins, and protective accessories that help improve workplace safety and comply with international standards.
                  </p>
                </div>
              )}

              {slug === 'weldman' && (
                <div className="text-surface text-body leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <p className="mb-4">
                    Weldman is a global supplier of leading welding products, serving key industries such as oilfield, construction, and marine. For over 30 years, welding professionals in more than 76 countries have relied on Weldman for dependable, high quality equipment and accessories.
                  </p>
                  <p>
                    We take pride in understanding our customers’ welding needs thoroughly, enabling us to deliver exceptional service and reliable solutions. Weldman stands for being accountable, reachable, and accessible—whenever you need us, we are there.
                  </p>
                </div>
              )}

              {slug === 'techweld' && (
                <div className="text-surface text-body leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <p className="mb-4">
                    Techweld is a manufacturer and supplier of professional welding machines, welding accessories, tools, and welding solutions. The brand focuses on delivering reliable, energy-efficient, and heavy-duty equipment for industrial welding applications. Techweld products are designed with advanced IGBT inverter technology, providing stable arc performance, high efficiency, and ease of use.
                  </p>
                  <p>
                    Techweld specializes in industrial welding equipment and inverter welding machines, offering reliable and energy-efficient solutions for fabrication, maintenance, construction, petrochemical, and heavy-duty industrial applications.
                  </p>
                </div>
              )}
            </div>

            {/* Right Side: Logo Display */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end items-start mt-8 lg:mt-0">
              {brand.logo && (
                <div className="w-full max-w-[380px] h-[260px] flex items-center justify-center lg:-mt-24 relative z-10">
                  <div className="relative w-full h-full">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 768px) 400px, 500px"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full Width Components */}
          {slug === 'sakura' && (
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div className="bg-navy-light/30 border border-steel/20 rounded-xl p-6 md:p-8">
                <h3 className="text-surface font-bold text-lg mb-6 flex items-center gap-3">
                  <span className="h-4 w-1 bg-gold rounded-full"></span>
                  SAKURA Product Range Summary
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                  {[
                    "Solid Marker™ – High Temperature",
                    "Solid Marker™ – Low Halogens (Low Chlorides)",
                    "Paint Marker™ – Low Halogens (Low Chlorides)",
                    "Solid Marker™ – Low Temperature",
                    "Valve Action Xylene-Based Paint Marker",
                    "Industrial Crayon Marker",
                    "Water Soluble Marker"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0 mt-2" />
                      <span className="font-medium text-surface">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {slug === 'geotex' && (
            <div className="mb-10 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div className="bg-navy-light/30 border border-steel/20 rounded-xl p-6 md:p-8">
                <h3 className="text-surface font-bold text-lg mb-6 flex items-center gap-3">
                  <span className="h-4 w-1 bg-gold rounded-full"></span>
                  Key Product Categories
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                  {[
                    "Standard Temperature Fire Blankets (550°C–700°C) – For fabrication and welding applications.",
                    "Cut Fire Blankets (Lifesaving) – Emergency fire protection and escape safety.",
                    "High Temperature Fire Blankets (800°C–1100°C) – Thermal insulation and molten metal splash protection.",
                    "Mica Coated Fire Blankets (2000°C) – Protection against extreme heat and welding slag.",
                    "Flame Retardant Tarpaulins – Enclosed work areas and weather protection.",
                    "Welding Umbrellas (Heavy Duty) – Protection from wind, rain, and sunlight during outdoor welding.",
                    "Welding Curtains and Screens – Shielding against UV radiation, sparks, smoke, and debris."
                  ].map((item, idx) => {
                    const [title, desc] = item.split(' – ');
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0 mt-2" />
                        <div>
                          <span className="font-medium text-surface block">{title}</span>
                          {desc && <span className="text-surface/70 text-sm mt-0.5 block">{desc}</span>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="bg-navy-light/30 border border-steel/20 rounded-xl p-6 md:p-8">
                <h3 className="text-surface font-bold text-lg mb-6 flex items-center gap-3">
                  <span className="h-4 w-1 bg-gold rounded-full"></span>
                  Industries Served
                </h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    "Fabrication Industry",
                    "Welding Industry",
                    "Metal Processing",
                    "Thermal Insulation Applications",
                    "Heavy Industrial Maintenance",
                    "Outdoor Work Sites",
                    "Fire Protection Applications"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 bg-navy/50 px-4 py-3 rounded-lg border border-steel/10 hover:border-gold/30 transition-colors">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span className="font-medium text-surface text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {slug === 'weldman' && (
            <div className="mb-10 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div className="bg-navy-light/30 border border-steel/20 rounded-xl p-6 md:p-8">
                <h3 className="text-surface font-bold text-lg mb-6 flex items-center gap-3">
                  <span className="h-4 w-1 bg-gold rounded-full"></span>
                  Why Weldman?
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    "Complete range of welding safety products and accessories",
                    "Premier product lines at outstanding prices",
                    "Trusted worldwide by welding professionals",
                    "All products comply with relevant international standards"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0 mt-2" />
                      <span className="font-medium text-surface">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-navy-light/30 border border-steel/20 rounded-xl p-6 md:p-8">
                <h3 className="text-surface font-bold text-lg mb-6 flex items-center gap-3">
                  <span className="h-4 w-1 bg-gold rounded-full"></span>
                  Product Range
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                  {[
                    "Double Insulated Welding Cable",
                    "Portable Electrode Oven",
                    "Electrode Holders, Earth Clamps",
                    "Cable Connectors",
                    "Argon Hose",
                    "Welding Leather Jacket, Apron, Hand Sleeve, Leg Guard",
                    "Leather Welding Gloves, TIG Gloves, ARC Gloves",
                    "Welding Helmet with Safety Helmet",
                    "Welding Boots & Welder Shoes",
                    "Welding Umbrella"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0 mt-2" />
                      <span className="font-medium text-surface">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {slug === 'techweld' && (
            <div className="mb-10 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div className="bg-navy-light/30 border border-steel/20 rounded-xl p-6 md:p-8">
                <h3 className="text-surface font-bold text-lg mb-6 flex items-center gap-3">
                  <span className="h-4 w-1 bg-gold rounded-full"></span>
                  Main Product Categories
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
                  {[
                    "MMA / Stick Welding Inverter",
                    "ARC 200EX",
                    "TECHARC 200i",
                    "STICKWEL K300HD",
                    "ZUPER 300 / ZUPER 300S",
                    "TECHARC 400i",
                    "TECHARC 400E",
                    "DESERT 630 HD"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-navy/50 px-4 py-3 rounded-lg border border-steel/10 hover:border-gold/30 transition-colors">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0 mt-2" />
                      <span className="font-medium text-surface text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-navy-light/30 border border-steel/20 rounded-xl p-6 md:p-8">
                  <h3 className="text-surface font-bold text-lg mb-6 flex items-center gap-3">
                    <span className="h-4 w-1 bg-gold rounded-full"></span>
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {[
                      "Advanced IGBT inverter technology",
                      "High efficiency and power saving",
                      "Smooth arc control",
                      "Hot Start and Arc Force functions",
                      "Anti-stick function",
                      "Digital display",
                      "Heavy-duty industrial design",
                      "Generator friendly",
                      "Suitable for wide range of electrodes",
                      "Lift TIG functionality (selected models)",
                      "Remote control option (selected models)",
                      "Multi-voltage capability"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0 mt-2" />
                        <span className="font-medium text-surface text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-navy-light/30 border border-steel/20 rounded-xl p-6 md:p-8">
                  <h3 className="text-surface font-bold text-lg mb-6 flex items-center gap-3">
                    <span className="h-4 w-1 bg-gold rounded-full"></span>
                    Applications
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "MMA (Stick) Welding",
                      "Lift TIG Welding",
                      "Gouging Applications",
                      "General Fabrication",
                      "Pipe Works",
                      "Construction",
                      "Maintenance and Repair",
                      "Petrochemical Industries",
                      "Shipbuilding",
                      "Industrial Welding",
                      "Carbon Steel, Stainless Steel, Aluminium"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 bg-navy/50 px-3 py-2 rounded-lg border border-steel/10 hover:border-gold/30 transition-colors">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                        <span className="font-medium text-surface text-xs">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-navy-light/30 border border-steel/20 rounded-xl p-6 md:p-8">
                <h3 className="text-surface font-bold text-lg mb-6 flex items-center gap-3">
                  <span className="h-4 w-1 bg-gold rounded-full"></span>
                  Standard Equipment & Accessories
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Power source with MMA kit",
                    "Power source with cable connector",
                    "TIG Torch (AWP26V)",
                    "Argon Regulator",
                    "Cable Connector",
                    "Electrode Holder",
                    "Welding Cable",
                    "Gouging Torch (T4000, 1000A)"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 bg-navy/50 px-4 py-3 rounded-lg border border-steel/10 hover:border-gold/30 transition-colors">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span className="font-medium text-surface text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-navy font-semibold px-6 py-3 rounded-lg hover:bg-gold-muted transition-colors text-sm"
            >
              Request Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-steel/40 text-surface/70 font-medium px-6 py-3 rounded-lg hover:border-gold/40 transition-colors text-sm"
              >
                <Globe className="h-4 w-4" />
                Brand Website
              </a>
            )}
          </div>
        </div>
      </section>

      <CTASection />

      <div className="bg-navy-dark py-6">
        <div className="container-base">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-sm text-steel-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Brands
          </Link>
        </div>
      </div>
    </>
  );
}
