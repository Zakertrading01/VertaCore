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

  // ── Catalogue Items ──────────────────────────────────────
  const catalogueItems = [
    // Safety & PPE
    {
      name: "3M SecureFit 400 Series Eyewear",
      description: "Anti-scratch and anti-fog safety glasses with pressure diffusion temple technology.",
      categoryGroup: "Safety & PPE",
      brandName: "3M",
      image: "/images/catalogue/3m-glasses.png",
      certTags: ["EN 166:2001", "CE"],
      order: 1,
    },
    {
      name: "MSA V-Gard Safety Helmet",
      description: "Industry-leading protective helmet with Fas-Trac III suspension for superior comfort.",
      categoryGroup: "Safety & PPE",
      brandName: "MSA Safety",
      image: "/images/catalogue/msa-helmet.png",
      certTags: ["EN 397", "ANSI/ISEA Z89.1"],
      order: 2,
    },
    {
      name: "Honeywell North 7700 Half Mask",
      description: "Premium silicone half mask respirator for ultimate comfort and protection in industrial environments.",
      categoryGroup: "Safety & PPE",
      brandName: "Honeywell",
      image: "/images/catalogue/honeywell-mask.png",
      certTags: ["NIOSH", "EN 140"],
      order: 3,
    },
    // Welding
    {
      name: "Lincoln Electric Idealarc DC-600",
      description: "Rugged industrial DC multi-process welding power source for heavy fabrication and construction.",
      categoryGroup: "Welding",
      brandName: "Lincoln Electric",
      image: "/images/catalogue/lincoln-dc600.png",
      certTags: ["CSA", "NEMA", "CE"],
      order: 4,
    },
    {
      name: "ESAB Aristo 500ix",
      description: "Heavy-duty pulsed secondary switched power source for high-quality MIG/MAG and TIG welding.",
      categoryGroup: "Welding",
      brandName: "ESAB",
      image: "/images/catalogue/esab-aristo.png",
      certTags: ["ISO 9001", "CE"],
      order: 5,
    },
    // Lifting & Rigging
    {
      name: "Kito CB Series Chain Block",
      description: "Robust hand chain hoist with shock-resistant gear casing and high-precision gears.",
      categoryGroup: "Lifting & Rigging",
      brandName: "Kito",
      image: "/images/catalogue/kito-hoist.png",
      certTags: ["ASME B30.16", "ISO 9001"],
      order: 6,
    },
    {
      name: "Crosby G-209 Screw Pin Shackle",
      description: "Forged, quenched and tempered screw pin anchor shackle for critical lifting operations.",
      categoryGroup: "Lifting & Rigging",
      brandName: "Crosby",
      image: "/images/catalogue/crosby-shackle.png",
      certTags: ["RR-C-271F", "CE"],
      order: 7,
    },
    // Abrasives
    {
      name: "Norton Quantum3 Grinding Wheels",
      description: "High-performance ceramic alumina grinding wheels for faster metal removal and longer life.",
      categoryGroup: "Abrasives",
      brandName: "Norton",
      image: "/images/catalogue/norton-wheel.png",
      certTags: ["oSa", "EN 12413"],
      order: 8,
    },
    {
      name: "3M Cubitron II Flap Disc 967A",
      description: "Engineered to cut faster and last longer than traditional ceramic abrasives.",
      categoryGroup: "Abrasives",
      brandName: "3M",
      image: "/images/catalogue/cubitron-disc.png",
      certTags: ["oSa", "ISO 9001"],
      order: 9,
    },
    // Industrial Tools
    {
      name: "DeWalt DCD996 Hammer Drill",
      description: "High-power, high-efficiency brushless motor delivers up to 75% more runtime vs. brushed.",
      categoryGroup: "Industrial Tools",
      brandName: "DeWalt",
      image: "/images/catalogue/dewalt-drill.png",
      certTags: ["UL", "CE"],
      order: 10,
    },
    {
      name: "Stanley FatMax Tape Measure",
      description: "Heavy-duty 8m/26ft tape measure with 3.3m standout and Mylar coated blade.",
      categoryGroup: "Industrial Tools",
      brandName: "Stanley",
      image: "/images/catalogue/stanley-tape.png",
      certTags: ["Class II"],
      order: 11,
    },
  ];

  for (const item of catalogueItems) {
    const existing = await db.catalogueItem.findFirst({ where: { name: item.name } });
    if (existing) {
      await db.catalogueItem.update({ where: { id: existing.id }, data: { ...item, published: true } });
    } else {
      await db.catalogueItem.create({ data: { ...item, published: true } });
    }
  }

  // ── Certifications ────────────────────────────────────────
  const certifications = [
    {
      slug: "iso-9001-2015",
      name: "ISO 9001:2015",
      body: "Lloyd's Register Quality Assurance",
      description: "International standard for quality management systems ensuring consistent high-quality supply chain and procurement operations.",
      featured: true,
      order: 1,
    },
    {
      slug: "ce-marking",
      name: "CE Marking",
      body: "European Conformity",
      description: "Conformity with health, safety, and environmental protection standards for products sold within the European Economic Area.",
      featured: true,
      order: 2,
    },
  ];

  for (const cert of certifications) {
    await db.certification.upsert({
      where: { slug: cert.slug },
      update: cert,
      create: cert,
    });
  }

  // ── Projects ──────────────────────────────────────────────
  const sampleProjects = [
    {
      slug: "offshore-refinery-maintenance",
      title: "Offshore Refinery MRO Support",
      subtitle: "Comprehensive maintenance supply overhaul for a major offshore facility.",
      client: "Global PetroMarine",
      coverImage: "/images/projects/offshore-refinery.png",
      scope: "Supply of multi-discipline safety gear, specialized welding consumables, and heavy-duty lifting equipment.",
      outcome: "Zero downtime during maintenance window and 100% compliance with rig safety standards.",
      featured: true,
      published: true,
      completedAt: new Date("2025-11-15"),
    },
    {
      slug: "marine-fabrication-yard",
      title: "Vessel Fabrication Supply Chain",
      subtitle: "Long-term supply partnership for complex vessel construction projects.",
      client: "NavalTech Yards",
      coverImage: "/images/projects/vessel-fabrication.png",
      scope: "Provision of welding systems, automated cutting tables, and site-wide PPE management.",
      outcome: "Improved procurement efficiency by 22% through standardized MRO supply protocols.",
      featured: true,
      published: true,
      completedAt: new Date("2026-02-10"),
    },
  ];

  for (const project of sampleProjects) {
    const ind = await db.industry.findFirst({ where: { slug: "oil-gas" } });
    await db.project.upsert({
      where: { slug: project.slug },
      update: { ...project, industryId: ind?.id },
      create: { ...project, industryId: ind?.id },
    });
  }

  // ── Insights ──────────────────────────────────────────────
  const sampleInsights = [
    {
      slug: "industrial-safety-trends-2026",
      title: "Industrial Safety Trends 2026",
      excerpt: "Exploring the evolution of PPE and automated safety systems in heavy industrial environments.",
      content: "Detailed analysis of how smart PPE and real-time monitoring are reshaping safety standards in the Oil & Gas sector...",
      coverImage: "/images/insights/safety-trends.png",
      tags: ["Safety", "Innovation", "2026"],
      featured: true,
      published: true,
      publishedAt: new Date(),
    },
    {
      slug: "optimizing-mro-procurement",
      title: "Optimizing MRO Procurement",
      excerpt: "Efficiency strategies for industrial procurement managers in a volatile supply landscape.",
      content: "Framework for building resilient supply chains and reducing total cost of ownership for industrial equipment...",
      coverImage: "/images/insights/procurement-optimization.png",
      tags: ["Procurement", "Supply Chain", "Efficiency"],
      featured: true,
      published: true,
      publishedAt: new Date(),
    },
  ];

  for (const insight of sampleInsights) {
    await db.insight.upsert({
      where: { slug: insight.slug },
      update: insight,
      create: insight,
    });
  }

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
