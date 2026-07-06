import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ── Solutions ─────────────────────────────────────────────
  // Remove old slugs before upserting new ones
  await db.solution.deleteMany({
    where: {
      slug: {
        in: ["safety-systems", "welding-systems", "lifting-rigging", "abrasives", "industrial-tools"],
      },
    },
  });

  const solutions = [
    {
      slug: "industrial-supply",
      title: "Industrial Supply Solutions",
      subtitle: "Comprehensive sourcing across multiple industrial sectors",
      description:
        "VERTACORE supplies certified industrial products for project, maintenance, and operational requirements across Oil & Gas, Marine, Construction, and Manufacturing sectors. Every product meets international safety and quality standards with full documentation available on request.",
      icon: "Package",
      features: [
        "Project Supply",
        "MRO Procurement",
        "Multi-Sector Coverage",
        "Certified Products",
        "Operational Support",
        "Global Sourcing",
      ],
      order: 1,
      published: true,
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/industrial-supply-1.png",
    },
    {
      slug: "welding-fabrication",
      title: "Welding & Fabrication Solutions",
      subtitle: "Welding machines, consumables, and fabrication support",
      description:
        "Supply of welding machines, consumables, accessories, electrodes, cutting solutions, and fabrication support products designed for demanding industrial applications. SMAW, MIG/MAG, TIG, and SAW processes covered with products from internationally recognised manufacturers.",
      icon: "Flame",
      features: [
        "SMAW / Stick Welding",
        "MIG/MAG (GMAW) Systems",
        "TIG (GTAW) Equipment",
        "SAW (Submerged Arc)",
        "Welding Consumables",
        "Cutting Solutions",
      ],
      order: 2,
      published: true,
    },
    {
      slug: "safety-ppe",
      title: "Safety & PPE Solutions",
      subtitle: "PPE and workplace safety products for industrial environments",
      description:
        "Reliable personal protective equipment and workplace safety products that support compliance, workforce protection, and operational safety standards. CE, EN, and ANSI certified products for Oil & Gas, Marine, Construction, and Manufacturing environments.",
      icon: "Shield",
      features: [
        "Head & Face Protection",
        "Fall Protection Systems",
        "Respiratory Protection",
        "Hand & Foot Protection",
        "Hi-Visibility Clothing",
        "Fire-Resistant PPE",
      ],
      order: 3,
      published: true,
    },
    {
      slug: "lifting-handling",
      title: "Lifting & Material Handling",
      subtitle: "Certified lifting equipment and rigging accessories",
      description:
        "Supply solutions for lifting equipment, rigging accessories, material handling products, and industrial support equipment for safe operational handling. Products certified to ASME B30, EN 818, and EN 13414 for offshore, marine, construction and industrial applications.",
      icon: "Link2",
      features: [
        "Chain Hoists & Lever Blocks",
        "Wire Rope Slings",
        "Shackles & Swivels",
        "Lifting Beams & Spreaders",
        "Rigging Hardware",
        "Material Handling Equipment",
      ],
      order: 4,
      published: true,
    },
    {
      slug: "technical-procurement",
      title: "Technical Procurement Support",
      subtitle: "Specialized industrial sourcing through trusted networks",
      description:
        "Efficient sourcing support for specialized industrial requirements through an established network of trusted manufacturers and suppliers worldwide. ISO 9001:2015 certified procurement processes ensure quality, traceability, and compliance across all supply activities.",
      icon: "Cpu",
      features: [
        "Specialist Sourcing",
        "Global Manufacturer Network",
        "Technical Specification Support",
        "Compliance Documentation",
        "Quality Verification",
        "Cost Optimization",
      ],
      order: 5,
      published: true,
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/technical-procurement-1.png",
    },
    {
      slug: "project-logistics",
      title: "Project Supply & Logistics Coordination",
      subtitle: "Coordinated supply execution for shutdowns and projects",
      description:
        "Dedicated coordination and delivery support to ensure smooth supply execution for shutdowns, projects, and operational timelines. From procurement planning to final delivery, VERTACORE manages the full supply chain to meet your project schedule and budget requirements.",
      icon: "Truck",
      features: [
        "Shutdown Supply Support",
        "Project Coordination",
        "Delivery Management",
        "Inventory Planning",
        "Multi-Vendor Coordination",
        "Timeline Management",
      ],
      order: 6,
      published: true,
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/project-logistics-1.png",
    },
  ];

  for (const solution of solutions) {
    await db.solution.upsert({
      where: { slug: solution.slug },
      update: solution,
      create: solution,
    });
  }

  // ── Categories (shown on /solutions listing page) ─────────
  await db.category.deleteMany({});

  const categories = [
    {
      name: "Safety & PPE",
      slug: "safety-ppe",
      description: "Personal protective equipment and workplace safety products that support compliance, workforce protection, and operational safety standards.",
      icon: "🛡️",
      order: 1,
      published: true,
    },
    {
      name: "Welding & Fabrication",
      slug: "welding-fabrication",
      description: "Welding machines, consumables, accessories, electrodes, cutting solutions, and fabrication support products.",
      icon: "🔥",
      order: 2,
      published: true,
    },
    {
      name: "Lifting & Material Handling",
      slug: "lifting-handling",
      description: "Lifting equipment, rigging accessories, material handling products, and industrial support equipment.",
      icon: "⛓️",
      order: 3,
      published: true,
    },
    {
      name: "Industrial Supply",
      slug: "industrial-supply",
      description: "Comprehensive sourcing and supply of industrial products for project, maintenance, and operational requirements across multiple sectors.",
      icon: "📦",
      order: 4,
      published: true,
    },
    {
      name: "Technical Procurement",
      slug: "technical-procurement",
      description: "Specialist sourcing for industrial requirements through an established network of trusted manufacturers and suppliers.",
      icon: "🔧",
      order: 5,
      published: true,
    },
    {
      name: "Project Supply & Logistics",
      slug: "project-logistics",
      description: "Coordinated delivery support for shutdowns, projects, and operational timelines.",
      icon: "🚛",
      order: 6,
      published: true,
    },
  ];

  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
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
      name: "Marine & Offshore",
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
      name: "Petrochemical Facilities",
      description:
        "Certified MRO supply for petrochemical processing and refinement plants. Equipment and consumables meeting plant safety, hazardous-area and process compliance requirements.",
      icon: "🧪",
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
      name: "Fabrication & Manufacturing",
      description:
        "Welding systems, abrasives, industrial tools and MRO supply for fabrication shops, metalwork facilities and manufacturing plants — from structural fabrication through to production-line operations.",
      icon: "⚙",
      order: 6,
      published: true,
    },
    {
      slug: "power-energy",
      name: "Utilities & Industrial Operations",
      description:
        "Safety and MRO supply for power generation plants, utilities and essential industrial operations infrastructure. Electrical safety equipment and operational tools for critical facilities.",
      icon: "⚡",
      order: 7,
      published: true,
    },
    {
      slug: "civil-engineering",
      name: "EPC & Infrastructure Projects",
      description:
        "Certified MRO and project supply for large-scale engineering, procurement and construction (EPC) programmes. Lifting gear, safety systems and industrial tools for bridges, tunnels, dams and major infrastructure builds.",
      icon: "🏗",
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
      where: { slug: "industrial-supply" },
      data: {
        industries: {
          connect: [
            { id: oilGas.id },
            { id: marine.id },
            { id: construction.id },
            { id: manufacturing.id },
            { id: mining.id },
            { id: fabrication.id },
          ],
        },
      },
    });

    await db.solution.update({
      where: { slug: "welding-fabrication" },
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
      where: { slug: "safety-ppe" },
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
      where: { slug: "lifting-handling" },
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

    await db.solution.update({
      where: { slug: "technical-procurement" },
      data: {
        industries: {
          connect: [
            { id: oilGas.id },
            { id: marine.id },
            { id: construction.id },
            { id: manufacturing.id },
          ],
        },
      },
    });

    await db.solution.update({
      where: { slug: "project-logistics" },
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
  // Remove old placeholder items that were replaced
  await db.catalogueItem.deleteMany({
    where: {
      name: {
        in: [
          "3M SecureFit 400 Series Eyewear",
          "MSA V-Gard Safety Helmet",
          "Honeywell North 7700 Half Mask",
          "Kito CB Series Chain Block",
          "Crosby G-209 Screw Pin Shackle",
          "Lincoln Electric Idealarc DC-600",
          "ESAB Aristo 500ix",
          "Norton Quantum3 Grinding Wheels",
          "3M Cubitron II Flap Disc 967A",
          "RIGMAN Impact Protection Gloves",
          "RIGMAN Full Body Safety Harness",
          "RIGMAN R16S3 Safety Boots",
          "DeWalt DCD996 Hammer Drill",
          "Stanley FatMax Tape Measure",
        ],
      },
    },
  });

  const catalogueItems = [
    {
      name: "Standard Pallet Rack System",
      description: "Heavy-duty industrial shelving unit for palletized storage.",
      categoryGroup: "Industrial Supply",
      image: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/industrial-supply-1.png",
      certTags: ["ISO 9001", "EU Standards"],
      brandName: "IndustrialForce",
      published: true,
      order: 1,
    },
    {
      name: "Smart Inventory Tracker",
      description: "Automated RFID tracking system for industrial supply chains.",
      categoryGroup: "Industrial Supply",
      image: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/industrial-supply-2.png",
      certTags: ["CE", "FCC"],
      brandName: "TechLogix",
      published: true,
      order: 2,
    },
    {
      name: "Global Procurement Tablet",
      description: "Ruggedized tablet for managing technical sourcing and engineering specifications.",
      categoryGroup: "Technical Procurement",
      image: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/technical-procurement-1.png",
      certTags: ["IP67", "MIL-STD-810G"],
      brandName: "SourcingPro",
      published: true,
      order: 1,
    },
    {
      name: "Precision Milled Turbine Part",
      description: "Custom-engineered mechanical component for high-stress industrial applications.",
      categoryGroup: "Technical Procurement",
      image: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/technical-procurement-2.png",
      certTags: ["EN 10204", "AS9100"],
      brandName: "EngineeringHub",
      published: true,
      order: 2,
    },
    {
      name: "Intermodal Container Coordinator",
      description: "Advanced shipping container tracking and logistics management system.",
      categoryGroup: "Project Supply & Logistics",
      image: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/project-logistics-1.png",
      certTags: ["IMO", "ISO 14001"],
      brandName: "PortLink",
      published: true,
      order: 1,
    },
    {
      name: "Project Site Control Hub",
      description: "Centralized logistics command center for large-scale industrial projects.",
      categoryGroup: "Project Supply & Logistics",
      image: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/project-logistics-2.png",
      certTags: ["Safety Certified"],
      brandName: "ProjectSync",
      published: true,
      order: 2,
    },
  ];

  for (const item of catalogueItems) {
    await db.catalogueItem.create({
      data: item,
    });
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
      slug: "onshore-drilling-rig-supply",
      title: "Drilling",
      subtitle: "Rig-ready tooling and consumables supply for an active onshore drilling operation.",
      client: "Regional Drilling Contractor",
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/projects/1783347911794-drilling-rig-supply.png",
      scope: "Supply of drill string tooling, structural flex components, and rig-floor consumables across a continuous drilling programme.",
      outcome: "Zero tooling downtime maintained across a compressed mobilisation and drilling schedule.",
      featured: true,
      published: true,
      completedAt: new Date("2026-04-20"),
      industrySlug: "oil-gas",
    },
    {
      slug: "structural-steel-fabrication-supply",
      title: "Fabrication",
      subtitle: "Multi-brand welding, cutting, and PPE supply across a heavy fabrication yard.",
      client: "Regional Steel Fabricators",
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/projects/1783347911794-fabrication-yard-supply.png",
      scope: "Coordinated multi-brand supply of welding consumables, cutting and grinding equipment, and certified PPE across multiple production lines.",
      outcome: "Consolidated six vendor relationships into a single coordinated supply programme, cutting procurement lead time yard-wide.",
      featured: true,
      published: true,
      completedAt: new Date("2026-05-30"),
      industrySlug: "fabrication",
    },
    {
      slug: "offshore-platform-mro-supply",
      title: "Oil & Gas",
      subtitle: "Multi-brand safety, welding, and lifting equipment supply for an active offshore platform.",
      client: "Offshore Energy Operator",
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/projects/1783347911794-oil-gas-platform-supply.png",
      scope: "Coordinated supply of ATEX-rated safety gear, welding consumables, and lifting equipment for continuous platform operations.",
      outcome: "Sustained round-the-clock platform readiness with zero supply-related shutdowns.",
      featured: true,
      published: true,
      completedAt: new Date("2026-06-10"),
      industrySlug: "oil-gas",
    },
    {
      slug: "port-marine-equipment-supply",
      title: "Marine",
      subtitle: "Certified safety and lifting equipment supply for port and vessel operations.",
      client: "Regional Port Authority",
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/projects/1783347911794-marine-port-supply.png",
      scope: "Supply of marine-grade PPE, mooring and rigging equipment, and vessel maintenance consumables across port operations.",
      outcome: "Consistent stock availability across berths, cutting vessel turnaround delays tied to equipment shortages.",
      featured: true,
      published: true,
      completedAt: new Date("2026-06-25"),
      industrySlug: "marine",
    },
    {
      slug: "high-rise-construction-supply",
      title: "Construction",
      subtitle: "Multi-brand safety, lifting, and structural supply for an active high-rise build.",
      client: "Regional Construction Contractor",
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/projects/1783347911794-construction-site-supply.png",
      scope: "Supply of site-wide PPE, rebar and structural accessories, and lifting equipment coordinated across multiple build phases.",
      outcome: "Maintained on-schedule pour cycles with zero equipment-related site delays.",
      featured: true,
      published: true,
      completedAt: new Date("2026-07-05"),
      industrySlug: "construction",
    },
    {
      slug: "open-pit-mining-equipment-supply",
      title: "Mining",
      subtitle: "Rugged safety and operational equipment supply for a large-scale mining operation.",
      client: "Regional Mining Operator",
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/projects/1783347911794-mining-sector-supply.png",
      scope: "Supply of heavy-duty PPE, welding consumables, and site communication equipment for continuous open-pit operations.",
      outcome: "Sustained safety compliance across shifts with no supply-related production stoppages.",
      featured: true,
      published: true,
      completedAt: new Date("2026-07-20"),
      industrySlug: "mining",
    },
  ];

  for (const { industrySlug, ...project } of sampleProjects) {
    const ind = await db.industry.findFirst({ where: { slug: industrySlug ?? "oil-gas" } });
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
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/safety-ppe-1.png",
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
      coverImage: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/solutions/technical-procurement-1.png",
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
