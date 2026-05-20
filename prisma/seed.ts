import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ── Solutions ─────────────────────────────────────────────
  const solutions = [
    {
      slug: "safety-systems",
      title: "Safety Systems",
      subtitle: "Certified PPE for industrial environments",
      description:
        "VERTACORE supplies a complete range of certified safety equipment trusted by Oil & Gas operators, marine contractors, and construction firms worldwide. Every product is verified against applicable EN, CE, and ANSI safety standards with full documentation available.",
      icon: "Shield",
      features: [
        "Head & Face Protection",
        "Fall Protection Systems",
        "Respiratory Protection",
        "Hand & Foot Protection",
        "Hi-Visibility Clothing",
        "Fire-Resistant PPE",
      ],
      order: 1,
      published: true,
    },
    {
      slug: "welding-systems",
      title: "Welding Systems",
      subtitle: "Complete welding equipment and consumables",
      description:
        "SMAW, MIG/MAG, TIG and SAW welding machines and consumables from internationally recognised manufacturers. Suitable for structural fabrication, pipeline welding, maintenance and offshore operations.",
      icon: "Flame",
      features: [
        "SMAW / Stick Welding",
        "MIG/MAG (GMAW) Systems",
        "TIG (GTAW) Equipment",
        "SAW (Submerged Arc)",
        "Welding Consumables",
        "Protective Equipment",
      ],
      order: 2,
      published: true,
    },
    {
      slug: "lifting-rigging",
      title: "Lifting & Rigging",
      subtitle: "Certified lifting equipment for critical operations",
      description:
        "Chain hoists, lever blocks, wire rope slings, shackles, lifting beams and rigging accessories certified to ASME B30, EN 818 and EN 13414. Suitable for offshore, marine, construction and industrial lifting operations.",
      icon: "Link2",
      features: [
        "Chain Hoists & Lever Blocks",
        "Wire Rope Slings",
        "Round Slings",
        "Shackles & Swivels",
        "Lifting Beams & Spreaders",
        "Rigging Hardware",
      ],
      order: 3,
      published: true,
    },
    {
      slug: "abrasives",
      title: "Abrasives",
      subtitle: "Surface preparation and finishing products",
      description:
        "Grinding discs, cutting wheels, flap discs and surface treatment products for fabrication shops, maintenance operations and site work. oSa and MPA certified products from internationally recognised manufacturers.",
      icon: "Disc",
      features: [
        "Grinding Discs",
        "Cutting Wheels",
        "Flap Discs",
        "Fibre Discs",
        "Wire Brushes",
        "Surface Conditioning",
      ],
      order: 4,
      published: true,
    },
    {
      slug: "industrial-tools",
      title: "Industrial Tools",
      subtitle: "Hand tools, power tools and measurement equipment",
      description:
        "Professional-grade hand tools, power tools, torque equipment and precision measurement instruments for industrial maintenance, fabrication and operations teams across all industrial sectors.",
      icon: "Wrench",
      features: [
        "Hand Tools",
        "Power Tools",
        "Torque Equipment",
        "Measurement Instruments",
        "Test & Inspection",
        "Workshop Equipment",
      ],
      order: 5,
      published: true,
    },
  ];

  for (const solution of solutions) {
    await db.solution.upsert({
      where: { slug: solution.slug },
      update: solution,
      create: solution,
    });
  }

  // ── Industries ────────────────────────────────────────────
  const industries = [
    {
      slug: "oil-gas",
      name: "Oil & Gas",
      description:
        "Certified MRO supply for upstream, midstream and downstream oil and gas operations. ATEX-rated equipment and sector-specific compliance documentation available.",
      icon: "🛢",
      order: 1,
      published: true,
    },
    {
      slug: "marine",
      name: "Marine",
      description:
        "Safety and operational equipment for offshore platforms, vessels, shipyards and marine construction. Marine-grade certified products available.",
      icon: "⚓",
      order: 2,
      published: true,
    },
    {
      slug: "construction",
      name: "Construction",
      description:
        "Site safety equipment, lifting gear and industrial tools for civil, structural and infrastructure construction projects.",
      icon: "🏗",
      order: 3,
      published: true,
    },
    {
      slug: "manufacturing",
      name: "Manufacturing",
      description:
        "MRO supply for plant operations, production facilities and manufacturing environments. Covering safety, welding, abrasives and industrial tools.",
      icon: "🏭",
      order: 4,
      published: true,
    },
    {
      slug: "mining",
      name: "Mining",
      description:
        "Safety and operational equipment for surface and underground mining operations. Robust, certified equipment for demanding mining environments.",
      icon: "⛏",
      order: 5,
      published: true,
    },
    {
      slug: "fabrication",
      name: "Fabrication",
      description:
        "Welding systems, abrasives and industrial tools for steel fabrication shops, metalwork facilities and structural fabrication projects.",
      icon: "⚙",
      order: 6,
      published: true,
    },
    {
      slug: "power-energy",
      name: "Power & Energy",
      description:
        "Safety and MRO supply for power generation plants, energy infrastructure and utilities. Electrical safety equipment and operational tools.",
      icon: "⚡",
      order: 7,
      published: true,
    },
    {
      slug: "civil-engineering",
      name: "Civil Engineering",
      description:
        "Equipment for bridges, tunnels, dams and major civil works. Lifting gear, safety systems and industrial tools for large-scale civil projects.",
      icon: "🌉",
      order: 8,
      published: true,
    },
  ];

  for (const industry of industries) {
    await db.industry.upsert({
      where: { slug: industry.slug },
      update: industry,
      create: industry,
    });
  }

  // ── Link solutions to industries ─────────────────────────
  const oilGas = await db.industry.findUnique({ where: { slug: "oil-gas" } });
  const marine = await db.industry.findUnique({ where: { slug: "marine" } });
  const construction = await db.industry.findUnique({ where: { slug: "construction" } });
  const manufacturing = await db.industry.findUnique({ where: { slug: "manufacturing" } });
  const mining = await db.industry.findUnique({ where: { slug: "mining" } });
  const fabrication = await db.industry.findUnique({ where: { slug: "fabrication" } });

  if (oilGas && marine && construction && manufacturing && mining && fabrication) {
    await db.solution.update({
      where: { slug: "safety-systems" },
      data: {
        industries: {
          connect: [
            { id: oilGas.id },
            { id: marine.id },
            { id: construction.id },
            { id: manufacturing.id },
            { id: mining.id },
          ],
        },
      },
    });

    await db.solution.update({
      where: { slug: "welding-systems" },
      data: {
        industries: {
          connect: [
            { id: oilGas.id },
            { id: marine.id },
            { id: fabrication.id },
            { id: manufacturing.id },
          ],
        },
      },
    });

    await db.solution.update({
      where: { slug: "lifting-rigging" },
      data: {
        industries: {
          connect: [
            { id: oilGas.id },
            { id: marine.id },
            { id: construction.id },
            { id: mining.id },
          ],
        },
      },
    });
  }

  // ── AI Questions ──────────────────────────────────────────
  const questions = [
    {
      text: "What certifications do your products carry?",
      answer:
        "VERTACORE supplies products certified to CE, EN 361, EN 397, ANSI Z359, ISO 9001:2015 and other internationally recognised standards. Full documentation available on request.",
      sortOrder: 1,
    },
    {
      text: "How do I request a quote?",
      answer:
        "Click \"Request a Quote\" in the navigation or on any product item. Fill in your company details and what you need — our team responds within 24 hours.",
      sortOrder: 2,
    },
    {
      text: "What lead time can I expect for orders?",
      answer:
        "Lead times vary by product and quantity. Submit an RFQ with your requirements and our team will confirm availability and delivery timeframes within 24 hours.",
      sortOrder: 3,
    },
    {
      text: "Do you provide product documentation and compliance certificates?",
      answer:
        "Yes. Datasheets, compliance certificates, and test reports are available for all products. Request via RFQ or contact our team directly.",
      sortOrder: 4,
    },
    {
      text: "Do you offer bulk or contract pricing?",
      answer: null,
      sortOrder: 5,
    },
    {
      text: "Can you source industry-specific PPE for oil & gas or offshore?",
      answer: null,
      sortOrder: 6,
    },
  ];

  for (const q of questions) {
    const existing = await db.aIQuestion.findFirst({ where: { text: q.text } });
    if (!existing) {
      await db.aIQuestion.create({ data: q });
    }
  }

  console.log("Seed completed.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
