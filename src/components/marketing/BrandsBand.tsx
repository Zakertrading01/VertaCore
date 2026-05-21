"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const brandDetails: Record<string, { name: string; content: string[] }> = {
  techweld: {
    name: "TECHWELD",
    content: [
      "Techweld industrial technologies limited is a leading manufacturer and supplier of professional welding accessories, tools and tackles. We are known for our research and innovation to develop quality and sustainable products. Our product range includes welding ovens, TIG & MIG torches, electrode holders, earth clamps, gas accessories, gas regulators, welding cable, welding gauges and consumables in compliance with European standards.",
      "Our application-based solutions cover the spectrum of process types, including MMA, SMAW, FCAW, GTAW, GMAW and SAW. Zaker Trading LLC is the authorized distributor and supplier of Techweld products in UAE and Middle East Countries.",
      "Product Range: Mig and tig consumables, mig torch and tig torch, hand cutting torch, gouging torch, gas cutting torch, gas regulators, oxygen regulator, single stage regulator, electrode, stainless steel electrode, gouging electrode, electrode holders and earth clamps, mig machine and tig machine, oven spares, anti-spatter, multipurpose cleaner, pickling paste, saw – stainless steel, zinc spray, copper phosphorus alloy, helmet safety, contact tips, nozzles, flash back arrestors, cable connectors, pipe cutting machine, beveling machine, welding spares, oven portable, oven big, quiver portable, holding oven, baking ovens are available in different voltages 110V, 220V, 380V, 415V, plate cutting machine, gas cutting, regulators – cutting, visor and head gear, welding gauges, pure tungsten, 2% thoriated tungsten rod, Lanthanated tungsten rod, red, yellow, green tip tungsten rod, gouging rods, carbon rods, paint marker.",
      "And Cutting attachment, torch handle, LPG regulator, propane regulator, CO2 regulator, Argon regulator, inspection mirror, dark glass, dark welding glass, solid mig wire, copper coated wire, flux cored wire, potentiometer, control pcb, fan motor, welding cable, double insulated welding cable, cutting tip, tip cleaner, cylinder key, taper gauge, gas diffuser, single flint lighter, 3 flint lighter, ground clamp, wire feeder, inter connecting cable, argon gas, oxygen gas, acetylene gas, propane gas, MMA welding machine, ARC welding machine, Tig welding machine, Mig welding machine, Plasma welding machine, stud welding machine, Zuper 6, Zuper 300, Maximus, Expat, Techarc 200, Techarc 400, Tech Mig 500, Tech Mig 400, Expat 2000i, Expat 4000, Migwel-k400, Tigwel-k300, Migwel-k500, Stickwel-k300, Desert 630 HD, Novastick 205, Everlast 1250i, Techmig, Techtig in various power range 200 Amps, 250 Amps, 300 Amps, 400 Amps, 500 Amps, 600 Amps, 280 Amps, 630 Amps.",
      "Standards: AWS (American Welding Standard), ABS (American Bureau of Shipping), welding bureau veritas approval (BV) 6013, 7018, 7018-1H4R, 6010, 7010, 8018, 9018, 10018D2, 7016, 308, 316, 309, 2209, 2594, 4043, 5356, E71T1, ER70S6."
    ]
  },
  geotex: {
    name: "GEOTEX",
    content: [
      "Geotex supplies its product according to the specifications of the European Standards. It is one of the leading industry supplier of welding curtains, welding blankets and welding pads to protect people, plants, and equipment from heat, sparks, and molten metal in the workplace from Netherlands. Zaker Trading LLC is the authorized distributor and supplier of Geotex products in UAE and Middle East Countries.",
      "The brand is well known for supplying fiber glass fabrics of various thickness (0.4mm to 2mm) and coatings, that can withstand service temperatures up to 550 deg c, 700 deg c, 900 deg c, 1100 deg c. and the products are in the name of G tarp, Gtarp, G-tarp, Geotex 3732, Geotex 3784, Geotex 3800, Geotex 3788, GTarp FR Tarpaulins, Geotex Silica 84, Geotex Silica88.",
      "Product Range: Fire resistant fabrics, welding blankets, cut fire blankets, flame retardant tarpaulin, pvc flame retardant tarpaulins range from 250gsm, 300gsm, 400gsm, 500gsm, welding curtain, temperature, neoprene, acrylic, polyurethane, welding umbrella, welding blanket, carbonized fiber, purging paper, purging film, purging tape toiles anti feu (de sauvetage), thermal insulation, molten metal splash, heat shielding, flame shielding, asbestos-free.",
      "Standards: Geotex products comply with many standards and approvals like UL 94, EN 1869, NFPA 2112, NFPA 701, ANSI FM 4950, EN 1598."
    ]
  },
  weldman: {
    name: "WELDMAN",
    content: [
      "Weldman is a manufacturer of welding products for various industries like oilfield, construction and marine with all relevant international standards.",
      "From past 10 years Weldman products are widely used by welding professionals in more than 76 countries. Zaker Trading LLC is the authorized distributor and supplier of weldman products in UAE and Middle East Countries.",
      "Product Range: Welding oven, quiver, portable oven, leather apron, leather hand sleeve, leather leg guard, face shield, welding helmet, welding face shield, welding hand shield, welding glass, polycarbonate glass, welding umbrella, welding cable, pvc gas hose, twin gas hose, oxygen hose, acetylene hose, argon hose, lpg gas hose, propane gas hose, earth clamp, ground clamp, electrode holder, tong, copper welding cable, aluminium welding cable, twin line welding hose, holding oven, baking oven, digital temperature oven, welding helmet with lens, welding helmet – spring type, face shield visor with bracket, welder dust cap, balaclava, welding goggle, polycarbonate lens, welding boots, welding shoes, leather jacket, leather welding gloves, arc welding gloves, tig welding gloves."
    ]
  },
  "electro-heat": {
    name: "ELECTROHEAT",
    content: [
      "Electroheat Industrial rebaking and holding ovens from Sweden. Zaker Trading LLC is a supplier and authorized distributor of Electroheat products.",
      "Electroheat Sweden AB is an innovative company based in Gothenburg, Sweden, and has been operating since 1975. The manufactures industrial furnaces and heat treatment equipment to industrial companies all over the world. ABB, Siemens and Volvo are just some of their customers who use this heat treatment equipment. Moreover, many of their products are exported to Europe and the Middle East.",
      "Zaker Trading LLC and Electroheat can jointly undertake many customized jobs industrial ovens and furnaces, air heating units, heat treatment equipment. Electroheat ovens and furnaces are used within a broad variety of industries like aerospace, automotive and manufacturing industry, all over the world. Electroheat industrial ovens and furnaces can be used for a variety of heating processes such as drying, curing and hardening of components, parts or final products. post weld heat treatment equipment like recorders, ceramic pad heaters, high temperature insulation material (super wool plus blanket with stainless steel wire mesh) can also be supplied."
    ]
  },
  gasiq: {
    name: "GASIQ",
    content: [
      "GasIQ is a Swedish manufacturer of equipment for gas welding, soldering, cutting and gas control for gas shielded welding. Zaker Trading LLC supplies these gas equipment across the emirates which includes Dubai, Abu dhabi, Sharjah, Fujairah and Ras Al Khaimah.",
      "Product Range: Oxygen gas regulator, acetylene gas regulator, argon gas regulator, LPG gas regulator, gas cutting torch, gas cutting tips, gas cutting kit, CO2 gas regulator."
    ]
  },
  superon: {
    name: "SUPERON",
    content: [
      "Stanvac-Superon group is one of the largest manufacturers and exporters of high-quality welding consumables, stainless steel wires, aerosol sprays, industrial protective Coatings, Lubricant products and industrial paints. It has technology partner with Kjellberg. Kjellberg Finsterwalde produces a wide range of special electrodes, e.g., for repair and surface welding.",
      "Zaker Trading LLC is a supplier of superon products in UAE and Middle East Countries.",
      "Superon application-based solutions cover the spectrum of process types, including MMA, SMAW, FCAW, GTAW, GMAW and SAW. Additionally, we offer a range of premium products such as mig and tig consumables. Super optimal, Super mig, MS and Alloy Superon supplies all products 6013, 7018, 7018-1H4R, 6010, 7010, 8018, 9018, 10018D2, 7016, 308, 316, 309, 2209, 2594, 4043, 5356, E71T1, ER70S6.",
      "Product Range: Carbon steel electrodes, stainless steel electrodes, stainless steel wires, stainless steel tig filler wire, stainless steel mig wire, stainless steel duplex electrodes, low alloy electrode, stainless steel electrode, nickel-copper alloy electrode, cast iron electrode, inconel electrode, hardfacing electrode, cutting/gouging electrodes, M and R electrodes (M&R), cladded weld plates, welding auxiliaries, zinc spray, anti spatter spray, WD40.",
      "Standards: Superon has all international standard welding approvals such as AWS (American Welding Standard), ABS (American Bureau of Shipping), welding bureau veritas approval (BV), TUV Rheinland, CE approval, CE certificate, LRS certificate, DB certificate, CWB Canadian welding bureau, LLoyds registrar."
    ]
  },
  tempindic: {
    name: "TEMPINDIC",
    content: [
      "VPL Chemicals Pvt. Ltd. (an ISO 9001:2008 certified company) is one of the pioneers in the manufacturing and distributing of Temperature Indicating Crayons / Labels / Sensors / Liquid and Metal Markers etc. VPL is also into the manufacturing of Bulk drugs and API.",
      "VPL temperature indicating crayons/chalks are sold in the market with Tempindic trade name. The Tempindic crayons are made available in 120 different temperature ratings systematically spaced between 40 Deg C to 1200 Deg C as per the customer needs. The Tempindic crayon length would be125mm and will be supplied in aluminium casing with an adjustable cap for holding of chalk/crayon."
    ]
  },
  victor: {
    name: "VICTOR",
    content: [
      "Victor is a leading manufacturer of gas equipment for more than a century. Zaker Trading LLC is a trader and supplier of Victor products.",
      "Victor designs for welding, cutting torches, gas regulators, victor oxy-acetylene welding equipment. Victor’s safety-oriented designs resulted in numerous patents and firsts including spiral mixers, gooseneck nozzles, and safety regulators.",
      "Victor’s tradition of unparalleled safety, performance and reliability remains a cornerstone of the brand.",
      "Product Range: Cutting, heating and welding outfits, handles, attachments, nozzles, tips, gas regulators, flow meters, oxygen gas regulator, acetylene gas regulator, argon gas regulator, CO2 gas regulator, portable cutting machines, plate cutting machines."
    ]
  },
  sincosald: {
    name: "SINCOSALD",
    content: [
      "Sincosald is production of components and equipment for welding and cutting from EU. Zaker Trading LLC is a supplier of sincosald welding machines in UAE and Middle East Countries.",
      "Sincosald was founded in 1950 in Italy. for more than 60 years sincosald has been manufacturing welding machines. sincosald is involved in Production of components and equipment for welding and cutting, manual or automated.",
      "Zaker Trading LLC is a distributor and supplier of sincosald welding machines of different categories like Arc welding machine, Tig welding machine, Mig / Mag Welding machines, Plasma welding machines, Mig torches, Tig Torches and involved in customized automation for industry need. Sincosald can also offer solutions for Positioners with rotating table or rolls and systems for rectilinear welding.",
      "Zaker Trading LLC and Sincosald can jointly conduct survey and studies for automatically plants studied for specific applications and welding robots.",
      "Product Range: Welding machines, welding torches, gas cutting torches, welding accessories and welding consumables under the name of Novoastick, Novatig, Novamig, Novamix."
    ]
  },
  sakura: {
    name: "SAKURA",
    content: [
      "Sakura (craypas), Japan is a leading pigment technology expert with their head office based in Osaka, Japan. Zaker Trading LLC is a supplier of SAKURA products in UAE and Middle East Countries.",
      "They have invented leading edge inspiring color products and Industrial products. Sakura manufactures smooth writing solid paint markers, Low chloride solid markers, make marking smooth, fast and easy. The markers are solid sticks of paint protected by unbreakable plastic case. They can be conveniently and cleanly carried in your pocket. The plastic case prevents the paint from drying out, so it always writes easily and smoothly.",
      "Tough Industrial Marker for high temperature. Working temperature range (-10°C ~ 200°C). Ideal for tough industrial marking on iron, steel, concrete, wood, rubber, paper, leather, glass, vinyl and so on. Sakura also manufactures Low halogen Solid Paint markers and low halogen felt tip paint markers which can be used on Stainless steel and alloy steel without contaminating the base metal. Low chloride solid markers and low chloride paint markers are available. The Sakura Feltip paint markers dispenses a fast -drying, clear paint for permanent marking, lettering, coding and numbering of both interior and exterior surfaces.",
      "Product Range: Solid paint markers, low chloride solid markers, low chloride solid markers, low chloride paint markers, low halogen solid paint markers, low halogen felt tip paint markers."
    ]
  },
  orkon: {
    name: "ORKON",
    content: [
      "Orkon is a leading manufacturer of power brushes and abrasives from Poland and Holland. Zaker Trading LLC is a supplier of Orkon products in UAE and Middle East Countries.",
      "Orkon offers a full line of abrasives products including bonded abrasives, coated abrasives, diamonds blades, cup brush, thin wheels, cutting wheels, polishing pads, wire brushes and wheels. We have a range of products that allows you to match the performance and durability you need for any abrasives project. The Company is committed to innovation, quality, consistency and durability as well as providing the best possible service to our customers. The certification of all operational procedures as well as the product quality achieved by Orkon.",
      "Products Range: Wooden wire brushes, plastic wire brushes, welding brushes, welder brushes, wire brushes for cleaning, steel wire brushes, diamond cutting blades, flap disc, emery disc, sanding disc, segmented diamond blade, turbo diamond blade, diamond blade for tile & ceramics, cutting wheel, cutting disc, cutting steel, cutting stainless steel, discs, wheels, acier, inox, pencil grinder tool, angle grinder tool or tools & equipment."
    ]
  },
  supraflex: {
    name: "SUPRAFLEX",
    content: [
      "Supraflex is a manufacturer of abrasive items like cutting & grinding discs are from India. Zaker Trading LLC, Dubai, UAE is a supplier and authorized distributor of Supraflex products.",
      "We develop and produce high quality grinding, cutting and polishing products for our customers, many of whom are global leaders in construction, engineering and commerce. Providing superior quality products and service at competitive prices has led to our rapid growth. Supraflex stocks over 50 different types of abrasive items.",
      "Product Range: Coated abrasives, surface conditioning products, resin bonded wheels and vitrified wheels.",
      "Standards: Supraflex products are comply with international standards like ISO 9001, OSHA, EN."
    ]
  }
};

const categories = [
  { label: "Welding", key: "welding" },
  { label: "Abrasives", key: "abrasives" },
  { label: "Lifting", key: "lifting" },
  { label: "Safety", key: "safety" },
];

const brandsByCategory: Record<string, string[]> = {
  welding: [
    "techweld", 
    "geotex", 
    "weldman", 
    "electro-heat", 
    "gasiq", 
    "superon", 
    "tempindic", 
    "victor",
    "sincosald",
    "sakura"
  ],
  abrasives: ["orkon", "supraflex"],
  lifting: ["yale", "kito", "norton", "miller"],
  safety: ["honeywell", "msa-safety", "petzfall", "msa-safety-2"],
};

export function BrandsBand() {
  const [selectedBrand, setSelectedBrand] = useState<{ id: string, category: string } | null>(null);

  return (
    <section
      id="brands"
      className="border-y border-steel/20 bg-white py-10 overflow-hidden"
      aria-label="Our brand partners"
    >
      <div className="w-full mb-4">
        {/* Prominent title above categories */}
        <h3 className="text-h2 md:text-dlg font-bold text-navy text-center mb-10">Our Brands</h3>

        {/* All categories stacked vertically */}
        <div className="w-full flex flex-col gap-8">
          {categories.map((cat, index) => (
            <div key={cat.key} className="flex flex-col items-center w-full">
              {/* Category Title Box (Above) */}
              <div className="w-full bg-[#0d1f38] py-3">
                <h4 className="text-3xl md:text-4xl font-bold text-gold uppercase tracking-widest text-center">
                  {cat.label}
                </h4>
              </div>

              {/* Brand Images for this Category (Below) */}
              <div className="w-full flex flex-wrap justify-center gap-8 md:gap-16 py-8 px-4 max-w-6xl mx-auto">
                {(brandsByCategory[cat.key] || []).map((b) => (
                  <div 
                    key={b} 
                    onClick={() => setSelectedBrand({ id: b, category: cat.label })}
                    className="flex items-center justify-center w-[150px] sm:w-[220px] p-4 hover:bg-black/5 transition-colors cursor-pointer rounded-xl"
                  >
                    <img src={`/brands/${b}.png`} alt={b} className="max-h-28 w-full object-contain hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over Drawer for Brand Details */}
      {selectedBrand && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-50 transition-opacity"
            onClick={() => setSelectedBrand(null)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-start justify-between p-6 bg-[#0d1f38] text-white">
              <div>
                <p className="text-gold text-sm font-bold tracking-widest uppercase mb-1">
                  {selectedBrand.category}
                </p>
                <h2 className="text-2xl font-bold uppercase">
                  {brandDetails[selectedBrand.id]?.name || selectedBrand.id.replace(/[-_]/g, " ")}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedBrand(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close panel"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="flex justify-center items-center p-8 bg-surface rounded-xl border border-steel/20 mb-8">
                <img 
                  src={`/brands/${selectedBrand.id}.png`} 
                  alt={selectedBrand.id}
                  className="max-h-40 w-full object-contain"
                />
              </div>
              <div className="max-w-none">
                {brandDetails[selectedBrand.id]?.content ? (
                  brandDetails[selectedBrand.id].content.map((paragraph, i) => (
                    <p key={i} className="mb-4 leading-relaxed text-justify text-navy">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-center text-navy italic py-10">
                    Detailed content for {selectedBrand.id.replace(/[-_]/g, " ")} will be available soon.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
