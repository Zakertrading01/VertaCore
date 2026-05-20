# VERTACORE — Enterprise Industrial Architecture Blueprint v4.0

> MRO Industrial Supply & Procurement Company  
> Sector: Industrials / B2B Trading  
> Industry: Industrial Equipment & Safety Supplies Distribution  
> Segment: MRO (Maintenance, Repair & Operations) Supplies  
> Stack: Next.js 15 · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Cloudflare R2 · Railway  
> Prepared: 2026-05-19

---

## TABLE OF CONTENTS

1.  [Business Positioning](#1-business-positioning)
2.  [Website Architecture](#2-website-architecture)
3.  [Enterprise Frontend Architecture](#3-enterprise-frontend-architecture)
4.  [Railway Deployment Architecture](#4-railway-deployment-architecture)
5.  [PostgreSQL Architecture](#5-postgresql-architecture)
6.  [Admin Panel Architecture](#6-admin-panel-architecture)
7.  [Product & Content Management](#7-product--content-management)
8.  [SEO + GEO + AEO Architecture](#8-seo--geo--aeo-architecture)
9.  [Homepage Wireframe](#9-homepage-wireframe)
10. [Product Page Structure](#10-product-page-structure)
11. [Industrial Enterprise UX Strategy](#11-industrial-enterprise-ux-strategy)
12. [Enterprise Conversion Strategy](#12-enterprise-conversion-strategy)
13. [Design System](#13-design-system)
14. [Folder Structure](#14-folder-structure)
15. [Component Architecture](#15-component-architecture)
16. [Performance Strategy](#16-performance-strategy)
17. [Security Strategy](#17-security-strategy)
18. [Scalability Roadmap](#18-scalability-roadmap)
19. [Ask AI Architecture](#19-ask-ai-architecture)

---

## 1. BUSINESS POSITIONING

### Classification

| Level    | Classification                                        |
|---------|-------------------------------------------------------|
| Sector   | Industrials / B2B Trading                             |
| Industry | Industrial Equipment & Safety Supplies Distribution   |
| Segment  | MRO (Maintenance, Repair & Operations) Supplies       |

### What MRO Means for VERTACORE

MRO = **Maintenance, Repair & Operations** — the category of industrial supplies that keep operations running. This includes safety equipment, welding consumables, lifting gear, abrasives, industrial tools, and operational supplies. Every product VERTACORE supplies falls within this category.

This is the same business model as Zaker Trading LLC (Dubai, UAE) and thousands of industrial distributors worldwide. The difference is VERTACORE's brand execution: the quality and professionalism of a world-class enterprise brand, applied to an industrial MRO business.

### Positioning Statement

```
VERTACORE is a premium MRO industrial supply and procurement company —
delivering certified safety equipment, welding systems, lifting & rigging,
and industrial consumables to enterprise clients across Oil & Gas, Marine,
Construction, Manufacturing, and Mining.
```

### What VERTACORE Is NOT

| ❌ Wrong                      | ✅ Correct                              |
|------------------------------|-----------------------------------------|
| SaaS / software company      | MRO supply & distribution company      |
| AI startup                   | Industrial procurement partner          |
| E-commerce marketplace       | B2B enterprise supply brand             |
| Futuristic technology brand  | Premium industrial enterprise brand     |
| Startup with fancy animations| Operationally reliable MRO supplier     |

### Website Priority Weights

These weights govern every design, content, and architecture decision:

| Priority Area            | Weight      | What This Means                                    |
|-------------------------|-------------|----------------------------------------------------|
| Enterprise Trust         | VERY HIGH   | Certifications, standards, company credibility     |
| Procurement Capability   | VERY HIGH   | RFQ system, sourcing breadth, vendor network       |
| Certifications & Standards | VERY HIGH | ISO, CE, EN, ANSI — proof of compliance            |
| RFQ Conversion           | VERY HIGH   | Every page leads to an enquiry                     |
| Product / Catalogue Showcase | MEDIUM  | Curated, quality-first — not exhaustive catalog    |
| Technical Content / Blog | MEDIUM      | Positions VERTACORE as a knowledgeable partner     |
| Animations & Visual FX   | LOW         | Subtle quality signals — never distracting         |
| Startup / SaaS Branding  | NONE        | Completely absent from all touchpoints             |

### Brand Voice

| Dimension    | Direction                                                       |
|-------------|------------------------------------------------------------------|
| Tone         | Authoritative. Precise. Trustworthy. Operationally confident.   |
| Language     | Industrial procurement language — specifications, compliance, supply |
| Claims       | Backed by certifications, project track record, standards compliance |
| Personality  | A reliable procurement partner, not a vendor or a tech company  |
| What to avoid | Startup superlatives ("revolutionary", "AI-powered", "platform") |

### Positioning Pillars

```
1. TRUST & COMPLIANCE
   ISO 9001:2015 certified. Every product meets internationally
   recognised safety and quality standards. Full documentation
   available: datasheets, certificates, compliance records.

2. MRO PROCUREMENT CAPABILITY
   Comprehensive range across safety, welding, lifting, abrasives
   and industrial consumables. Sourced globally, supplied reliably.
   Custom sourcing available for specialist requirements.

3. SECTOR EXPERTISE
   Deep operational knowledge across Oil & Gas, Marine, Construction,
   Manufacturing, Mining, and Fabrication. We understand the
   compliance requirements and operational context of each sector.

4. ENTERPRISE PARTNERSHIP
   Not a transactional supplier — a long-term procurement partner.
   Dedicated account management, technical consultation, and
   responsive RFQ handling within 24 hours.
```

### Buyer Personas

| Persona             | Title                           | Primary Need                                      |
|--------------------|----------------------------------|--------------------------------------------------|
| Procurement Manager | Supply Chain / Purchasing Mgr   | Reliable supply, competitive pricing, fast RFQ   |
| HSE Manager         | Health, Safety & Environment    | Certified products, traceability, compliance docs|
| Site Engineer       | Project / Site Engineer         | Correct spec, available stock, technical support |
| Operations Director | Plant / Operations Director     | Supply continuity, trusted vendor relationship   |
| C-Suite Buyer       | COO / VP Operations             | Strategic partner, total cost, vendor risk mgmt  |

---

## 2. WEBSITE ARCHITECTURE

### Page Map

```
vertacore.com/
├── /                          Home
├── /about                     About VERTACORE
│   ├── /about/story           Our Story
│   └── /about/mission         Mission & Values
├── /solutions                 Solutions overview (all capability areas)
│   └── /solutions/[slug]      Solution detail (e.g., /solutions/safety-systems)
├── /catalogue                 Static product showcase — curated by category, no drill-down
│                              (every item CTA → Request a Quote)
├── /industries                Industries We Serve
│   └── /industries/[slug]     Industry detail (e.g., /industries/oil-gas)
├── /certifications            Certifications & Quality Standards
├── /brands                    Brands & Partners
│   └── /brands/[slug]         Brand profile page
├── /projects                  Case Studies / Project Portfolio
│   └── /projects/[slug]       Project detail
├── /insights                  Blog / Technical Articles
│   └── /insights/[slug]       Article detail
└── /contact                   Contact & RFQ
```

### Navigation Structure

```
PRIMARY NAV:
[VERTACORE]  Solutions  Catalogue  Industries  About  Insights  [Request a Quote →]

SOLUTIONS DROPDOWN:
┌───────────────────────────────────────────────────────────────┐
│  Solutions                                                     │
│  ─────────────────────────────────────────────────────────── │
│  🛡 Safety Systems      ⚙ Welding Systems                     │
│  🔗 Lifting & Rigging   ◼ Abrasives & Surface Treatment       │
│  🔧 Industrial Tools    [View All Solutions →]                │
└───────────────────────────────────────────────────────────────┘

ABOUT DROPDOWN:
Our Story · Mission & Values · Certifications · Brands & Partners
```

### URL Strategy
- Clean, descriptive slugs: `/solutions/safety-systems`, `/industries/oil-gas`
- No product routes — no `/products/*` paths exist anywhere
- `/catalogue` is a single static page — no sub-routes, no query strings indexed
- `canonical` tag on all pages

---

## 3. ENTERPRISE FRONTEND ARCHITECTURE

### Rendering Strategy

| Route                | Strategy  | Rationale                                          |
|---------------------|-----------|----------------------------------------------------|
| `/`                 | ISR 3600s | Marketing, SEO-critical                            |
| `/solutions`        | ISR 3600s | Solutions overview, stable                         |
| `/solutions/[slug]` | ISR 3600s | Solution detail, stable content                    |
| `/catalogue`        | ISR 1800s | Static showcase — updates when admin adds items    |
| `/industries/[slug]`| ISR 3600s | Industry landing pages                             |
| `/certifications`   | Static    | Rarely changes                                     |
| `/brands`           | ISR 3600s | All brands overview                                |
| `/brands/[slug]`    | ISR 3600s | Brand detail page                                  |
| `/projects/[slug]`  | ISR 1800s | Project case studies                               |
| `/insights/[slug]`  | ISR 600s  | Blog freshness                                     |
| `/contact`          | Static    | No dynamic data                                    |
| `/api/*`            | Dynamic   | RFQ, contact, newsletter, upload                   |
| `/admin/*`          | Dynamic   | Always-fresh, no caching                           |

### Architecture Layers

```
┌──────────────────────────────────────────────────────────────────┐
│  BROWSER LAYER                                                    │
│  React 19 · Framer Motion · Tailwind CSS · shadcn/ui             │
│  Client Components only where interactivity is required          │
└──────────────────────────────┬───────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────┐
│  CLOUDFLARE EDGE                                                  │
│  DNS · CDN · WAF · DDoS Protection · Rate Limiting               │
│  Cache-Control headers respected at edge                         │
└──────────────────────────────┬───────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────┐
│  RAILWAY — PRIMARY HOST                                           │
│  Next.js 15 App (Node.js runtime, NOT edge runtime)              │
│                                                                   │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────┐    │
│  │  RSC Pages    │  │  API Routes   │  │  Next.js Middleware│    │
│  │  (ISR/Static) │  │  (RFQ, leads, │  │  (Auth guard,      │    │
│  │               │  │   upload,     │  │   redirects)       │    │
│  │               │  │   revalidate) │  │                   │    │
│  └───────────────┘  └───────┬───────┘  └───────────────────┘    │
└──────────────────────────────┬───────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
┌─────────────▼──────┐ ┌───────▼─────┐ ┌───────▼──────────┐
│   RAILWAY          │ │ CLOUDFLARE  │ │     RESEND       │
│   PostgreSQL       │ │     R2      │ │  (Email: RFQ     │
│   (Prisma ORM)     │ │  (Product   │ │   confirmations, │
│                    │ │   images,   │ │   lead alerts)   │
│                    │ │   PDFs,     │ │                  │
│                    │ │   datashts) │ │                  │
└────────────────────┘ └─────────────┘ └──────────────────┘
```

### React Server Component Strategy
- All data-fetching happens in Server Components — no `useEffect` API calls for page data
- Client Components (`"use client"`) used only for: forms, dropdowns, modals, animations, theme toggle
- Layouts (`layout.tsx`) are Server Components — no re-renders on navigation
- `<Suspense>` boundaries around all async data sections with skeleton fallbacks

---

## 4. RAILWAY DEPLOYMENT ARCHITECTURE

### Why Railway Over Vercel
- Hosts both the Next.js app AND PostgreSQL in one platform
- No vendor lock-in on edge functions
- Simpler pricing for full-stack apps with databases
- Full Node.js runtime (no edge runtime limitations)
- Custom domain support, env variable management, deploy hooks

### Railway Service Layout

```
RAILWAY PROJECT: vertacore-production
│
├── Service: web (Next.js App)
│   ├── Source: GitHub → main branch
│   ├── Build: `npm run build`
│   ├── Start: `npm run start`
│   ├── Port: 3000
│   ├── Healthcheck: GET /api/health
│   └── Auto-deploy on push to main
│
├── Service: postgres (Railway PostgreSQL)
│   ├── Version: PostgreSQL 16
│   ├── Plan: Shared/Pro based on traffic
│   └── Auto backups: daily, 7-day retention
│
└── Environment Variables (shared):
    DATABASE_URL=postgresql://...  (Railway injects automatically)
    DIRECT_URL=postgresql://...
    R2_ACCOUNT_ID=...
    R2_ACCESS_KEY_ID=...
    R2_SECRET_ACCESS_KEY=...
    R2_BUCKET_NAME=vertacore-assets
    R2_PUBLIC_URL=https://assets.vertacore.com
    ADMIN_SECRET=...
    RESEND_API_KEY=...
    NEXTAUTH_SECRET=...
    NEXTAUTH_URL=https://vertacore.com
    REVALIDATE_SECRET=...
```

### Environments

```
PRODUCTION:    main branch   → vertacore.com
STAGING:       develop branch → staging.vertacore.com (Railway staging service)
PREVIEW:       feature/* branches → PR previews (Railway preview environments)
```

### Custom Domain & Cloudflare Setup

```
vertacore.com
    │
    ├── Cloudflare DNS (proxied ☁)
    │   ├── A record → Railway app IP
    │   ├── CNAME assets → R2 custom domain
    │   └── Page rules: cache static assets aggressively
    │
    ├── Cloudflare WAF rules:
    │   ├── Block common attack patterns
    │   ├── Rate limit /api/contact (10 req/min per IP)
    │   ├── Rate limit /api/rfq (5 req/min per IP)
    │   └── Challenge suspicious countries (configurable)
    │
    └── Cloudflare Cache:
        ├── Cache static assets: 1 year
        └── Bypass cache for /admin/*, /api/*
```

### CI/CD Pipeline

```
Developer pushes to GitHub
        │
        ▼
GitHub Actions:
  1. Type check (tsc --noEmit)
  2. Lint (eslint --max-warnings 0)
  3. Unit tests (vitest)
  4. Build check (next build)
        │
        ├── Feature branch → Railway Preview Deploy
        └── main branch    → Railway Production Deploy
                                    │
                                    └── Post-deploy: /api/revalidate
                                        (flush ISR cache for updated content)
```

---

## 5. POSTGRESQL ARCHITECTURE

### Schema Design Principles

This is a **capability-driven content schema** — not an inventory management system.

- No `Product`, `Category`, `Subcategory`, `ProductImage`, `ProductDocument`, `ProductCertification` models
- `CatalogueItem` is a simple showcase card — one image, one optional datasheet, plain-string cert tags
- `Solution` describes a supply capability, not a product catalog entry
- `Industry` and `Solution` use Prisma implicit many-to-many — no explicit join tables
- `slug` fields are unique, URL-safe, lowercase-kebab-case
- `published` boolean gates all content — admin toggles only
- `order` integer for manual sort on all list pages
- No PageView analytics model — GA4 handles this externally

### Full Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── CAPABILITY CONTENT ───────────────────────────────────

// A Solution = one MRO capability area VERTACORE supplies
// e.g., "Safety Systems", "Welding Systems", "Lifting & Rigging"
model Solution {
  id          String     @id @default(cuid())
  slug        String     @unique  // "safety-systems"
  title       String              // "Safety Systems"
  subtitle    String              // "Certified PPE for industrial environments"
  description String              // Rich markdown body
  icon        String?             // Lucide icon name
  coverImage  String?             // R2 URL
  features    String[]            // ["Head Protection", "Fall Protection", ...]
  order       Int        @default(0)
  published   Boolean    @default(false)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  industries  Industry[]          // Implicit M2M — Prisma manages join table
  projects    Project[]           // Implicit M2M — which projects used this solution
}

// An Industry = sector VERTACORE serves
// e.g., "Oil & Gas", "Marine", "Construction"
model Industry {
  id          String     @id @default(cuid())
  slug        String     @unique  // "oil-gas"
  name        String              // "Oil & Gas"
  description String              // Sector overview text
  icon        String?
  coverImage  String?             // R2 URL
  order       Int        @default(0)
  published   Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  solutions   Solution[]          // Implicit M2M
  projects    Project[]           // Direct relation — project belongs to one industry
}

// ─── CATALOGUE SHOWCASE ───────────────────────────────────

// A CatalogueItem = one card on the /catalogue page
// Intentionally lightweight — no SKU, no relations, no document table
model CatalogueItem {
  id            String   @id @default(cuid())
  name          String              // "Full Body Safety Harness"
  description   String?             // 1–2 sentences max
  categoryGroup String              // "Safety & PPE" | "Welding" | "Lifting & Rigging"
                                    // | "Abrasives" | "Industrial Tools"
  image         String?             // Single R2 URL
  certTags      String[]            // ["CE", "EN 361", "ANSI Z359"] — plain strings
  brandName     String?             // "Brand Name" — plain string, no relation
  datasheetUrl  String?             // Single R2 URL to PDF (optional)
  order         Int      @default(0)
  published     Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// ─── PROJECTS / CASE STUDIES ──────────────────────────────

model Project {
  id          String    @id @default(cuid())
  slug        String    @unique
  title       String
  subtitle    String?
  client      String?             // "Major UAE Oil & Gas Operator" (anonymous ok)
  coverImage  String?             // R2 URL
  industry    Industry? @relation(fields: [industryId], references: [id])
  industryId  String?
  scope       String              // What VERTACORE supplied
  outcome     String              // What was achieved
  metrics     Json?               // [{ label: string, value: string }]
  featured    Boolean   @default(false)
  published   Boolean   @default(false)
  completedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  solutions   Solution[]          // Implicit M2M — which solutions were used
}

// ─── TRUST CONTENT ────────────────────────────────────────

model Certification {
  id          String    @id @default(cuid())
  slug        String    @unique     // "iso-9001-2015" — used in R2 paths + future /certifications/[slug]
  name        String                // "ISO 9001:2015"
  body        String                // "International Organization for Standardization"
  description String?
  logo        String?               // R2 URL: /certifications/[slug]-logo.webp
  documentUrl String?               // R2 URL: /certifications/[slug]-cert.pdf
  validUntil  DateTime?
  featured    Boolean   @default(false)
  order       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Brand {
  id          String    @id @default(cuid())
  slug        String    @unique
  name        String
  logo        String?             // R2 URL
  description String?
  country     String?
  website     String?
  featured    Boolean   @default(false)
  order       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// ─── INSIGHTS / BLOG ──────────────────────────────────────

model Insight {
  id          String    @id @default(cuid())
  slug        String    @unique
  title       String
  excerpt     String
  content     String              // Markdown
  coverImage  String?
  author      String    @default("VERTACORE Editorial")
  tags        String[]
  readTime    Int       @default(5)
  featured    Boolean   @default(false)
  published   Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([publishedAt])
}

// ─── RFQ & ENQUIRIES ──────────────────────────────────────

model RFQ {
  id          String      @id @default(cuid())
  rfqNumber   String      @unique  // "VC-2026-0001" — generated on create
  firstName   String
  lastName    String
  email       String
  phone       String?
  company     String
  jobTitle    String?
  country     String?
  industry    String?              // Free text — what sector they work in
  items       String               // Free text — what they need (not a JSON array)
  message     String?              // Additional notes
  status      RFQStatus   @default(NEW)
  priority    RFQPriority @default(NORMAL)
  internalNote String?             // Admin-only notes field
  source      String?              // "catalogue", "solutions-safety", "homepage"
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([status, createdAt])
}

enum RFQStatus {
  NEW
  REVIEWING
  QUOTED
  ACCEPTED
  DECLINED
}

enum RFQPriority {
  NORMAL
  HIGH
  URGENT
}

model ContactInquiry {
  id        String   @id @default(cuid())
  name      String
  email     String
  company   String?
  phone     String?
  subject   String
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  confirmed Boolean  @default(false)
  createdAt DateTime @default(now())
}

// ─── CATALOGUE PDF DOWNLOAD ───────────────────────────────

// The downloadable PDF catalogue (not the /catalogue page — that's content-driven)
model CataloguePDF {
  id          String   @id @default(cuid())
  title       String
  fileUrl     String              // R2 URL to PDF
  coverImage  String?
  fileSize    String?             // "4.2 MB" — display only
  version     String?             // "2026 Edition"
  downloads   Int      @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  pdfDownloads CataloguePDFDownload[]   // back-relation
}

model CataloguePDFDownload {
  id            String       @id @default(cuid())
  catPDF        CataloguePDF @relation(fields: [catPDFId], references: [id])
  catPDFId      String
  email         String
  company       String?
  createdAt     DateTime     @default(now())

  @@index([catPDFId])
}

// ─── ADMIN ────────────────────────────────────────────────

model AdminUser {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String
  role         AdminRole @default(EDITOR)
  lastLoginAt  DateTime?
  createdAt    DateTime  @default(now())
}

enum AdminRole {
  SUPER_ADMIN
  EDITOR
}

// ─── ASK AI ───────────────────────────────────────────────

// Singleton row — only one AISetting record exists at a time.
// Admin can enable/disable the widget, swap provider/model, rotate API key.
// API key stored AES-256-CBC encrypted — never exposed to browser.
model AISetting {
  id           String   @id @default(cuid())
  provider     String   @default("anthropic")  // "anthropic" | "openai"
  model        String   @default("claude-haiku-4-5-20251001")
  apiKeyEnc    String   @default("")            // AES-256-CBC encrypted
  systemPrompt String   @default("")            // Admin-editable context doc
  enabled      Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

// Suggested question chips shown in the widget before user types.
// Supports optional predefined answers (skips AI call if matched exactly).
model AIQuestion {
  id        String   @id @default(cuid())
  text      String   @db.VarChar(200)
  answer    String?                           // Optional predefined answer
  sortOrder Int      @default(0)
  enabled   Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([enabled, sortOrder])
}

// Append-only log of AI conversations. IP hashed (SHA-256) — no PII stored.
model AIChatLog {
  id        String   @id @default(cuid())
  ipHash    String   @db.VarChar(64)
  messages  String                            // JSON array of { role, content }
  provider  String   @db.VarChar(20)
  model     String   @db.VarChar(100)
  createdAt DateTime @default(now())

  @@index([createdAt])
  @@index([ipHash])
}
```

### What Was Deliberately Removed

| Removed               | Why                                                        |
|----------------------|------------------------------------------------------------|
| `Category`           | `categoryGroup` string on `CatalogueItem` is sufficient    |
| `Subcategory`        | Unnecessary depth — VERTACORE is not a product catalog     |
| `Product`            | Does not exist — replaced by `Solution` + `CatalogueItem` |
| `ProductImage`       | `CatalogueItem` has a single image — no gallery needed     |
| `ProductDocument`    | `CatalogueItem.datasheetUrl` is one field — no table       |
| `ProductCertification` | `CatalogueItem.certTags` is a plain string array         |
| `ProductIndustry`    | No `Product` model exists                                  |
| `SolutionIndustry`   | Replaced by Prisma implicit M2M (no boilerplate join table)|
| `PageView`           | GA4 handles analytics — no custom table needed             |
| `ConversionEvent`    | GA4 custom events handle this                              |
| `AdminRole.ADMIN`    | Two roles are enough: SUPER_ADMIN and EDITOR               |
| `RFQ.items` (JSON)   | Plain text field — buyers describe what they need in words |
| UTM fields on RFQ    | Use GA4 / URL parameters — no need to store in DB          |

---

## 6. ADMIN PANEL ARCHITECTURE

### Philosophy
A clean, minimal admin interface with exactly the screens the team needs. No bloat. Built as a protected route group inside the same Next.js app. No external CMS, no third-party admin framework.

### Admin URL Structure

```
/admin                       Dashboard (RFQ count, unread inquiries, quick links)
/admin/solutions             Solution pages list
/admin/solutions/new         Create solution
/admin/solutions/[id]        Edit solution
/admin/industries            Industry pages list + edit
/admin/catalogue             Catalogue items list
/admin/catalogue/new         Add catalogue item
/admin/catalogue/[id]        Edit catalogue item
/admin/projects              Project case studies list
/admin/projects/new          Add project
/admin/projects/[id]         Edit project
/admin/certifications        Certifications list + edit
/admin/brands                Brand list
/admin/brands/new            Add brand
/admin/brands/[id]           Edit brand
/admin/insights              Blog articles list
/admin/insights/new          Write article
/admin/insights/[id]         Edit article
/admin/rfq                   RFQ inbox (table with status filter)
/admin/rfq/[id]              RFQ detail + status + internal note
/admin/inquiries             Contact form inbox
/admin/media                 R2 file browser (upload, copy URL, delete)
/admin/ai                    Ask AI — configuration, quick questions, chat logs
/admin/settings              Admin users, site meta, catalogue PDF upload
```

### What Each Admin Screen Does

```
DASHBOARD
  New RFQ badge count (red dot)
  Unread contact inquiries count
  Quick links to: Add catalogue item / Add project / View RFQs

SOLUTIONS (5 at launch, expandable)
  Title, subtitle, cover image, markdown description
  Features list (tag-style input: add/remove strings)
  Industry tags (multi-select from Industry table)
  Published toggle + "Save & Refresh Page" button

INDUSTRIES
  Name, description, cover image, icon
  Published toggle

CATALOGUE ITEMS
  Name, description (short), category group (dropdown)
  Single image upload → R2
  Cert tags (tag input: "CE", "EN 361", etc.)
  Brand name (plain text)
  Datasheet upload → R2 (optional)
  Published toggle + sort order

PROJECTS
  Title, client (can be "Major Oil & Gas Operator"), cover image
  Industry (select), scope, outcome
  Metrics (key/value repeater: up to 4 rows)
  Solutions used (multi-select)
  Published / Featured toggles

CERTIFICATIONS
  Name (e.g., "ISO 9001:2015"), issuing body
  Logo upload, certificate PDF upload → R2
  Valid until date
  Order / Featured

BRANDS
  Name, logo upload, country, website, description
  Featured / order

INSIGHTS (blog)
  Title, excerpt, cover image, tags
  Markdown editor (full screen)
  Read time (auto-calculated or manual)
  Published toggle + publish date

RFQ INBOX
  Table: RFQ number | Company | Date | Status | Priority
  Filters: Status (New / Reviewing / Quoted / Accepted / Declined)
  Detail view: all submitted fields + internal note field + status dropdown
  "Mark as read" action, "Export CSV" button

MEDIA BROWSER
  Grid of files in R2 bucket
  Upload button (image or PDF)
  Click to copy URL
  Delete button

ASK AI
  Three-tab page: Configuration / Quick Questions / Chat Logs

  Configuration tab:
    Enable/disable toggle — show/hide the Ask AI button site-wide
    Provider selector: Anthropic (Claude) or OpenAI (GPT)
    Model selector: changes based on selected provider
    API key input: password field, stored AES-256 encrypted, masked on display
    System prompt textarea: editable context doc, "Reset to default" button
    Character counter (max 10,000)

  Quick Questions tab:
    Add question form: question text + optional predefined answer
    "Draft with AI" button — generates a one-sentence answer using live AI
    Questions list: reorder, enable/disable toggle, edit inline, delete
    Tip: use 5–8 questions covering certifications, RFQ, supply capability

  Chat Logs tab:
    Table: timestamp | provider/model | IP hash (first 12 chars) | message count
    Click to expand full conversation thread
    Pagination: 20 per page
    Privacy note: IP addresses hashed SHA-256 — no PII stored

SETTINGS
  Admin users: list, add new (email + password), deactivate
  Catalogue PDF: title, version, upload PDF → R2, published toggle
                 (Single section — only one PDF at a time, no separate route needed)
```

### Admin Tech Stack

```
UI Components:   shadcn/ui (Button, Input, Textarea, Select, Dialog, Toast, Table)
Forms:           react-hook-form + zod validation
Rich text:       @uiw/react-md-editor (markdown — simple, no Slate/TipTap complexity)
File upload:     react-dropzone → POST /api/admin/upload → R2
Data grids:      TanStack Table (RFQ inbox + catalogue list)
Auth:            next-auth v5 Credentials provider
                 bcryptjs (work factor 12)
                 httpOnly session cookie, sameSite: strict

File Upload Flow:
  Admin drags file onto dropzone
  → POST /api/admin/upload (multipart/form-data)
  → Server checks: MIME type (jpg/png/webp/pdf only), size (10MB max)
  → Server uploads to R2 via @aws-sdk/client-s3
  → Returns { url: "https://assets.vertacore.com/..." }
  → Admin sees URL auto-filled in the relevant form field
```

---

## 7. CONTENT MANAGEMENT MODEL

### Content Architecture Overview

```
PUBLIC PAGES                     ADMIN MANAGES VIA
─────────────────────────────────────────────────────
/solutions/[slug]          ←     /admin/solutions/[id]
/catalogue                 ←     /admin/catalogue (item list)
/industries/[slug]         ←     /admin/industries
/projects/[slug]           ←     /admin/projects/[id]
/certifications            ←     /admin/certifications
/brands + /brands/[slug]   ←     /admin/brands/[id]
/insights/[slug]           ←     /admin/insights/[id]
```

No content is hard-coded in source files. All editable content lives in PostgreSQL. Admin changes trigger `revalidatePath()` — no redeploy needed.

### What Lives Where

```
SOLUTION PAGE (/solutions/safety-systems)
  Admin controls:
  ├── Title, subtitle, cover image
  ├── Description (markdown — rendered as rich HTML)
  ├── Features list ("Head Protection", "Fall Protection", ...)
  ├── Linked industries (multi-select → shown as badges)
  └── Published toggle

  NOT admin-controlled (hardcoded in the page component):
  └── Layout, section structure, animation, CTA buttons

─────────────────────────────────────────────────────

CATALOGUE PAGE (/catalogue)
  The /catalogue page queries CatalogueItem where published=true,
  grouped by categoryGroup, ordered by `order` field.

  Admin controls per item:
  ├── Name, short description
  ├── Category group (dropdown: 5 options)
  ├── Single image → R2
  ├── Cert tags (plain strings: "CE", "EN 361", "ANSI")
  ├── Brand name (plain text)
  ├── Datasheet URL → R2 PDF (optional)
  └── Published + order

─────────────────────────────────────────────────────

CATALOGUE CATEGORY GROUPS (fixed — not admin-editable)
  These 5 groups are defined in code, not DB.
  Admin assigns items to one of these groups.

  1. Safety & PPE
  2. Welding
  3. Lifting & Rigging
  4. Abrasives
  5. Industrial Tools
```

### Content Publish Workflow

```
Admin edits content → Clicks "Save & Refresh"
    → PATCH /api/admin/[entity]/[id]    (saves to DB)
    → POST /api/revalidate              (with REVALIDATE_SECRET, entity, slug)
    → Toast: "Published. Page updated."

REVALIDATION RULES (lib/revalidate.ts):

  Solution updated (slug = "welding-systems"):
    revalidatePath(`/solutions/${slug}`)   // the edited page
    revalidatePath('/solutions')           // overview page
    revalidatePath('/')                    // homepage solutions section

  Industry updated (slug = "oil-gas"):
    revalidatePath(`/industries/${slug}`)
    revalidatePath('/industries')
    revalidatePath('/')

  CatalogueItem updated:
    revalidatePath('/catalogue')           // the only catalogue page
    revalidatePath('/')                    // homepage (if catalogue previewed)

  Project updated (slug = "offshore-rig-supply"):
    revalidatePath(`/projects/${slug}`)
    revalidatePath('/projects')
    revalidatePath('/')

  Certification / Brand updated:
    revalidatePath('/certifications')
    revalidatePath('/brands')

NEVER hardcode a specific slug in the revalidation logic.
Always derive the slug from the record being saved.
```

### Cloudflare R2 Asset Layout

Flat, predictable structure. One image per catalogue item (no gallery subfolders).

```
R2 BUCKET: vertacore-assets

/catalogue/             ← CatalogueItem images and datasheets
  [item-id].webp        ← single image (UUID filename)
  [item-id]-ds.pdf      ← datasheet (optional)

/solutions/             ← Solution cover images
  [slug].webp

/industries/            ← Industry cover images
  [slug].webp

/projects/              ← Project cover images
  [slug].webp

/insights/              ← Blog cover images
  [slug].webp

/brands/                ← Brand logos
  [slug].webp

/certifications/        ← Cert logos + downloadable cert PDFs
  [slug]-logo.webp      ← e.g. iso-9001-2015-logo.webp
  [slug]-cert.pdf       ← e.g. iso-9001-2015-cert.pdf

/pdf/                   ← Downloadable product catalogue PDF
  vertacore-catalogue-2026.pdf
```

---

## 8. SEO + GEO + AEO ARCHITECTURE

### Technical SEO Foundation

**Metadata Factory** (`lib/seo.ts`)
```typescript
export function buildMetadata(config: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'product'
  keywords?: string[]
}): Metadata {
  return {
    title: { default: config.title, template: '%s | VERTACORE' },
    description: config.description,
    keywords: config.keywords,
    metadataBase: new URL('https://vertacore.com'),
    alternates: { canonical: `https://vertacore.com${config.path}` },
    openGraph: { ...ogConfig },
    twitter:   { ...twitterConfig },
    robots: { index: true, follow: true }
  }
}
```

**Sitemap** — Auto-generated by Next.js `sitemap.ts`:
- Home, About, all Products, all Categories, all Industries
- All published Solutions, Projects, Insights
- `<lastmod>` from `updatedAt` DB field — accurate freshness signals

**robots.txt**:
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /*?*   (no query strings indexed)
Sitemap: https://vertacore.com/sitemap.xml
```

**`/llms.txt`** (GEO signal for AI crawlers):
```
# VERTACORE
> VERTACORE is a premium MRO industrial supply and procurement company.

## Classification
Sector: Industrials / B2B Trading
Industry: Industrial Equipment & Safety Supplies Distribution
Segment: MRO (Maintenance, Repair & Operations) Supplies

VERTACORE supplies certified MRO industrial products — including safety
equipment and PPE, welding equipment and consumables, lifting and rigging
gear, abrasives, and industrial tools — to enterprise clients across
demanding industrial sectors worldwide.

## Supply Range (MRO)
- Safety & PPE: helmets, harnesses, gloves, eye protection, respiratory, Hi-Vis
- Welding: SMAW, MIG/MAG, TIG, SAW machines and consumables
- Lifting & Rigging: chain hoists, lever blocks, wire rope slings, shackles
- Abrasives: grinding discs, cutting wheels, flap discs, surface treatment
- Industrial Tools: hand tools, power tools, measurement equipment

## Industries Served
Oil & Gas, Marine, Construction, Manufacturing, Mining, Fabrication,
Civil Engineering, Power & Energy, Logistics & Transportation

## Quality & Compliance
ISO 9001:2015 certified. All products certified to international standards
including CE, EN, ANSI, and applicable industry-specific standards.
Full documentation (datasheets, certificates) available on request.

## Business Model
B2B enterprise procurement. No public pricing. Enquiries via RFQ.
Response time: within 24 business hours.

## Contact
vertacore.com/contact | RFQ: vertacore.com/contact#rfq
```

### JSON-LD Schema Library (`lib/schema.ts`)

| Schema Type         | Used On                                               |
|--------------------|-------------------------------------------------------|
| `Organization`      | Every page (global)                                   |
| `LocalBusiness`     | Contact page                                          |
| `Service`           | `/solutions/[slug]` — each solution is a service      |
| `ItemList`          | `/catalogue` — list of catalogue items                |
| `Article`           | Insight/blog pages                                    |
| `FAQPage`           | Certifications page, solution pages                   |
| `BreadcrumbList`    | All nested routes                                     |
| `WebSite`           | Homepage (SearchAction for sitelinks search box)      |
| `CertificationInfo` | Certifications page                                   |

**Service Schema example** (`/solutions/safety-systems`):
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Industrial Safety Systems",
  "description": "Certified safety equipment and PPE for industrial environments including Oil & Gas, Marine, and Construction.",
  "provider": { "@type": "Organization", "name": "VERTACORE" },
  "serviceType": "Industrial Supply",
  "areaServed": "Global",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Safety & PPE Range",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Full Body Harness" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Safety Helmet" } }
    ]
  }
}
```

**ItemList Schema example** (`/catalogue`):
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "VERTACORE Industrial Product Catalogue",
  "description": "Certified industrial equipment including safety PPE, welding systems, lifting & rigging, and abrasives.",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Full Body Safety Harness", "url": "https://vertacore.com/catalogue" },
    { "@type": "ListItem", "position": 2, "name": "Chain Hoist 500kg", "url": "https://vertacore.com/catalogue" }
  ]
}
```

### AEO (Answer Engine Optimization)

Optimizes for Perplexity, ChatGPT Search, Gemini, Bing AI:
- Every solution page answers: "What is [solution area] used for in [industry]?"
- FAQ blocks on: all solution pages, certifications page, about page
- Concise definition in first paragraph of each solution: "Safety systems for industrial environments include..."
- Key specs shown as machine-readable HTML `<table>` or `<dl>` — never as an image
- Industry pages answer: "What industrial equipment does [Oil & Gas / Marine / etc.] require?"
- `/catalogue` page has descriptive text per category group — not just a visual grid

### GEO (Generative Engine Optimization)

Optimizes for inclusion in AI-generated answers:
- Semantic HTML: `<article>`, `<section aria-label="...">`, `<header>`, `<nav>`
- Brand name "VERTACORE" in first 100 characters of every page's main content
- Every stat and claim is specific: "ISO 9001:2015 certified since [year]"
- Entities clearly named: countries, certifying bodies, standards bodies
- Structured specs in `<dl>` definition lists and `<table>` elements
- `/llms.txt` as described above

### Keyword Strategy

| Page                          | Target Keyword                              | Intent        |
|------------------------------|---------------------------------------------|---------------|
| Home                          | "industrial equipment supplier"             | Commercial    |
| /solutions/safety-systems     | "industrial safety equipment supplier"      | Commercial    |
| /solutions/welding-systems    | "welding equipment supplier"                | Commercial    |
| /solutions/lifting-rigging    | "lifting and rigging equipment supplier"    | Commercial    |
| /catalogue                    | "industrial equipment catalogue"            | Commercial    |
| /industries/oil-gas           | "oil and gas equipment supplier"            | Commercial    |
| /industries/marine            | "marine safety equipment supplier"          | Commercial    |
| /certifications               | "ISO 9001 certified industrial supplier"    | Informational |
| /insights/*                   | Long-tail technical queries                 | Informational |

---

## 9. HOMEPAGE WIREFRAME

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NAVBAR  [VERTACORE]  Solutions  Catalogue  Industries  About  [Request a Quote →]
        (Transparent at hero top, glass bg on scroll.)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

╔═══════════════════════════════════════════════════════════╗
║                    HERO SECTION                           ║
║          (100vh, navy bg — industrial photography         ║
║           or high-quality dark cinematic visual.          ║
║           Minimal animation: subtle fade-in only.)        ║
║                                                           ║
║   [Section label: MRO INDUSTRIAL SUPPLY · ISO 9001:2015]  ║
║                                                           ║
║   Certified Industrial Supply                             ║
║   For Demanding Operations.                               ║
║   ──────────────────────────                              ║
║   Safety equipment, welding systems, lifting & rigging,   ║
║   and MRO supplies for Oil & Gas, Marine, Construction    ║
║   and Manufacturing operations worldwide.                 ║
║                                                           ║
║   [Request a Quote]      [View Catalogue]                 ║
║    ↑ Primary CTA           ↑ Secondary CTA                ║
║                                                           ║
║   ─────────────────────────────────────────────────────   ║
║   ISO 9001:2015    |   [X]+ Industries  |   [X]+ Years    ║
║   Certified               Served             Experience   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRANDS BAND (horizontal scroll, logos)
  Trusted supplier for leading global brands
  [Brand] [Brand] [Brand] [Brand] [Brand] [Brand] [Brand]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SOLUTIONS SECTION
  [Label: WHAT WE SUPPLY]
  Precision-sourced equipment for the world's toughest environments.
  Each card links to the full /solutions/[slug] page.

  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
  │  🛡 Safety     │  │  ⚙ Welding     │  │  🔗 Lifting    │
  │  Systems       │  │  Systems       │  │  & Rigging     │
  │                │  │                │  │                │
  │  Head, eye,    │  │  SMAW, MIG,    │  │  Chain hoists, │
  │  hand, fall    │  │  TIG, SAW      │  │  wire rope,    │
  │  protection    │  │  systems       │  │  shackles      │
  │                │  │                │  │                │
  │  [View →]      │  │  [View →]      │  │  [View →]      │
  └────────────────┘  └────────────────┘  └────────────────┘
  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
  │  ◼ Abrasives   │  │  🔧 Industrial │  │  [Browse Our   │
  │                │  │  Tools         │  │   Catalogue →] │
  │  Grinding,     │  │                │  │                │
  │  cutting,      │  │  Hand tools,   │  │  View full     │
  │  surface prep  │  │  power tools   │  │  /catalogue    │
  │                │  │                │  │                │
  │  [View →]      │  │  [View →]      │  │                │
  └────────────────┘  └────────────────┘  └────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INDUSTRIES SECTION  (dark navy bg)
  [Label: SECTORS WE SERVE]
  Specialized supply solutions for critical industrial sectors.

  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ 🛢 Oil & │ │ ⚓ Marine│ │ 🏗 Const │ │ 🏭 Mfg  │ │ ⛏ Mining│
  │   Gas    │ │          │ │  ruction  │ │          │ │          │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ 🏗 Fabri │ │ ⚡ Power  │ │ 🚚 Logis│ │ 🌊 Civil │ │  More +  │
  │  cation  │ │  & Energy │ │  tics    │ │  Engrng  │ │          │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

QUALITY ASSURANCE SECTION  (cinematic full-width)
  [Label: CERTIFIED. COMPLIANT. TRUSTED.]
  "Every product we supply meets internationally recognized
   quality and safety standards."

  ┌──────────────────────────────────────────────────────┐
  │  [Industrial visual — quality lab / certification]   │
  │                                                      │
  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │
  │  │ ISO 9001:2015│  │  CE Marked   │  │  EN/ANSI  │  │
  │  │  Certified   │  │              │  │  Standards │  │
  │  └──────────────┘  └──────────────┘  └───────────┘  │
  └──────────────────────────────────────────────────────┘
                  [View Our Certifications →]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHY VERTACORE SECTION (4-pillar)
  ┌────────────────────┐  ┌────────────────────┐
  │  ✓ Quality         │  │  ✓ Sector          │
  │    Assurance       │  │    Expertise       │
  │                    │  │                    │
  │  Every product     │  │  Deep operational  │
  │  certified and     │  │  knowledge across  │
  │  verified before   │  │  all major         │
  │  supply            │  │  industrial sectors│
  └────────────────────┘  └────────────────────┘
  ┌────────────────────┐  ┌────────────────────┐
  │  ✓ Enterprise      │  │  ✓ Global Sourcing │
  │    Partnership     │  │                    │
  │                    │  │  International     │
  │  Dedicated account │  │  brands, local     │
  │  management and    │  │  delivery and      │
  │  technical support │  │  regional service  │
  └────────────────────┘  └────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

METRICS BAND (animated counters)
  500+            10+             ISO 9001         30+
  Products        Industries      Certified        Years
  Supplied        Served                           Experience

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECTS / CASE STUDIES (3 featured)
  [Label: PROVEN DELIVERY]
  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
  │  [Cover Image]  │  │  [Cover Image]  │  │  [Cover Image]  │
  │  Oil & Gas      │  │  Offshore Marine│  │  Construction   │
  │  "Complete PPE  │  │  "Lifting gear  │  │  "Site safety   │
  │   supply for    │  │   for platform  │  │   equipment     │
  │   site of 600"  │  │   maintenance"  │  │   package"      │
  └─────────────────┘  └─────────────────┘  └─────────────────┘
                       [View All Projects →]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INSIGHTS (3 latest articles)
  [Label: TECHNICAL INSIGHTS]
  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
  │  [Cover]         │  │  [Cover]         │  │  [Cover]         │
  │  Safety          │  │  Welding         │  │  Lifting         │
  │  "Choosing the   │  │  "SMAW vs MIG:   │  │  "Rigging safety │
  │   right harness  │  │   when to use    │  │   checklist for  │
  │   for offshore"  │  │   each process"  │  │   offshore ops"  │
  └──────────────────┘  └──────────────────┘  └──────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CTA SECTION (full width, gold gradient accent)
  Ready to source certified industrial equipment?
  Speak with our technical team.

  [Request a Quote]      [Download Catalogue]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOOTER
  [VERTACORE]    Solutions         Industries      Company
                 Safety Systems    Oil & Gas       About
                 Welding Systems   Marine          Certifications
                 Lifting & Rigging Construction    Brands
                 Abrasives         Mining          Contact
                 [Catalogue]                       Insights

  Newsletter: [email input] [Subscribe]
  ISO 9001:2015 Certified | © 2026 VERTACORE | Privacy | Terms
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 10. CATALOGUE PAGE & SOLUTION PAGE STRUCTURE

### /catalogue — Static Showcase Page

No sub-routes. One page. Curated by admin. Every item funnels to RFQ.

```
BREADCRUMB: Home > Catalogue

HEADER:
  [Label: OUR PRODUCT RANGE]
  Explore Our Catalogue
  Certified equipment across safety, welding, lifting, abrasives and more.
  [Request a Quote]   [Download PDF Catalogue]

SECTION PER CATEGORY GROUP:
(Repeated for each: Safety & PPE / Welding / Lifting & Rigging / Abrasives / Tools)

  ── Safety & PPE ────────────────────────────────────────────

  ┌───────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐
  │  [Image]              │  │  [Image]              │  │  [Image]              │
  │  Brand name           │  │  Brand name           │  │  Brand name           │
  │  Full Body Harness    │  │  Safety Helmet        │  │  Cut-Resistant Gloves │
  │  Fall protection      │  │  Hard hat, Class E    │  │  Level D, EN 388      │
  │  [CE] [EN 361]        │  │  [ANSI] [EN 397]      │  │  [CE] [EN 388]        │
  │  [Request a Quote →]  │  │  [Request a Quote →]  │  │  [Request a Quote →]  │
  │  [Datasheet ↓]        │  │  [Datasheet ↓]        │  │  [Datasheet ↓]        │
  └───────────────────────┘  └───────────────────────┘  └───────────────────────┘

  (3 cols desktop, 2 tablet, 1 mobile. Each section has a "See all in Safety →"
   link pointing to /solutions/safety-systems for full solution context.)

SIDEBAR / TOP FILTER (optional at launch, Phase 2):
  Filter by: Category · Brand · Certification standard

BOTTOM CTA:
  Can't find what you need?
  Our team sources to specification.
  [Contact Our Team →]
```

### /solutions/[slug] — Solution Detail Page

```
BREADCRUMB: Home > Solutions > Safety Systems

HEADER SECTION (cinematic, full-width):
  [Label: INDUSTRIAL SOLUTIONS]
  Safety Systems
  Comprehensive personal protective equipment and safety solutions
  for the most demanding industrial environments.
  [Request a Quote]

OVERVIEW SECTION:
  Two-column: descriptive text left, key stats / capability badges right
  "VERTACORE supplies a complete range of certified safety equipment
   trusted by Oil & Gas operators, marine contractors, and construction
   firms worldwide."

CAPABILITY FEATURES (icon grid):
  ✓ Head & Face Protection    ✓ Fall Protection Systems
  ✓ Respiratory Protection    ✓ Hand & Foot Protection
  ✓ Hi-Visibility Clothing    ✓ Fire-Resistant PPE

FEATURED ITEMS FROM CATALOGUE (curated grid, 3–6 items):
  [Same card format as /catalogue but fewer items]
  Bottom: [Browse Full Catalogue →]  ← links to /catalogue

INDUSTRIES THIS SOLUTION SERVES:
  [Oil & Gas] [Marine] [Construction] [Mining] [Fabrication]
  Each badge links to the relevant /industries/[slug] page

CERTIFICATIONS RELEVANT TO THIS SOLUTION:
  [CE Mark] [EN 361] [EN 397] [ANSI Z359] ...
  [View All Certifications →]

RELATED PROJECTS:
  1–2 project cards that used this solution
  [View All Projects →]

BOTTOM CTA (full width):
  Ready to spec your safety requirements?
  [Request a Quote]   [Download Catalogue]
```

---

## 11. INDUSTRIAL ENTERPRISE UX STRATEGY

### Design Philosophy: Premium Industrial, Not Futuristic Startup

The VERTACORE website looks premium and modern. It does **not** look like a startup. The quality comes from:
- Exceptional typography and spacing (like Linear or Stripe)
- Professional photography and industrial imagery (not abstract gradients)
- Clean information hierarchy (not cluttered catalog pages)
- Subtle, purposeful transitions (not flashy animations)
- Evidence-first design (certifications, standards, metrics visible and credible)

Animations are used sparingly — only where they reinforce content clarity (e.g., counters, scroll reveals). Heavy visual effects, particle systems, and 3D elements are absent. The site should feel like a world-class procurement partner's website, not a product launch page.

### Core UX Principles (Ordered by Priority Weight)

**1. Trust-First Architecture [VERY HIGH PRIORITY]**

Trust is the primary conversion driver for MRO procurement. Every page must signal credibility before asking for action.

- ISO 9001:2015 badge visible in the hero, footer, and RFQ form
- Certification standards named specifically (EN 361, ANSI Z359, CE) — not just "certified"
- Downloadable certificates on the Certifications page — not just logos
- Project portfolio with named sectors and real-scale metrics ("Supplied 600-person offshore site")
- Company history and founding story on About — years in operation signal stability
- Brand partner logos visible — sourcing from recognised global brands builds confidence

**2. Procurement Capability Signals [VERY HIGH PRIORITY]**

Procurement managers need to know: can this supplier actually deliver what we need?

- Solutions pages communicate breadth: "We supply the complete range — not just one SKU"
- Catalogue page shows representative items per category — enough to establish range, not overwhelm
- "Custom sourcing available" message prominent — enterprise buyers often have specialist needs
- Industry pages confirm sector-specific supply capability: "We supply Oil & Gas sites"
- Vendor/brand list signals the quality of sourcing relationships

**3. RFQ as the Primary Action [VERY HIGH PRIORITY]**

No pricing is shown. Every page path leads to an RFQ enquiry.

- "Request a Quote" button in the fixed navbar — always visible
- Every catalogue item has an inline "Request a Quote" CTA
- RFQ form prefills the item or solution name when triggered from context
- RFQ form is short: 6 fields maximum — name, company, email, item(s), quantity, notes
- After submit: confirmation message with expected response time (24 hours)
- Admin receives immediate email notification via Resend

**4. Friction-Free Information Access [HIGH PRIORITY]**

Industrial buyers research before they enquire. Make research effortless.

- Datasheets downloadable from the catalogue page — no account required
- Specifications shown as clean HTML tables — not buried in PDFs
- Certifications page fully public — downloadable certificates
- No login walls anywhere on public-facing content

**5. Industry-First Navigation Path [HIGH PRIORITY]**

Buyers identify with their sector before their product category.

- Secondary navigation path: Industries → "Show me what VERTACORE supplies for Oil & Gas"
- Each industry page surfaces relevant solutions, sample catalogue items, and a project reference
- Industry badges appear on solution pages and catalogue items
- Buyers from different sectors should immediately feel "this company knows my world"

**6. Enterprise Navigation Patterns [MEDIUM PRIORITY]**

- Solutions dropdown in primary nav (not a mega-menu — keep it clean)
- Breadcrumbs on all nested routes — enterprise buyers share deep URLs internally
- Site search (Phase 2): searches solution names, catalogue items, industry pages
- No infinite scroll — paginated or fully-loaded sections with clear structure

### Page-Level UX Notes

**Certifications Page — highest trust page on the site:**
- Full-width, clean grid of certification cards
- Each card: standard name, issuing body, validity period, download certificate button
- Opening statement: "Every item VERTACORE supplies is certified to internationally recognised standards."
- Linked from footer, About page, and every solution page

**Catalogue Page — showcase, not a catalog:**
- Grouped by category (Safety / Welding / Lifting / Abrasives / Tools)
- Each item: image, name, brief description, certification badges, datasheet link, RFQ CTA
- No filters, no search, no pagination at launch — curated items only
- Opening statement: "A representative selection of the industrial equipment we supply."
- Clear message: "Don't see what you need? We source to specification. Contact us →"

**Industries Page — sector identity pages:**
- Each industry page = sector overview + relevant solutions listed + one featured project
- Tone: "We understand the compliance requirements and operational environment of [sector]"
- Relevant certifications called out (e.g., ATEX for Oil & Gas, marine-grade for Marine)

**About Page — the most important trust page:**
- Company founding story, years in operation, geographic reach
- Mission and values stated clearly — not in startup language
- ISO certification prominently placed
- Team section (if applicable)
- No "we're disrupting the industry" language

---

## 12. ENTERPRISE CONVERSION STRATEGY

### Conversion Architecture

```
AWARENESS
  Google organic search (MRO / industrial supply keywords)
  LinkedIn (procurement managers, HSE managers, site engineers)
  AI search surfaces (Perplexity, ChatGPT Search, Gemini)
  Direct referral (industry contacts, brand partners)
        │
        ▼
FIRST IMPRESSION — TRUST ESTABLISHED
  Homepage: ISO badge, years experience, industries served, project refs
  (Visitor decides within 8 seconds: "Is this a credible supplier?")
        │
        ▼
DISCOVERY — TWO PATHS

  PATH A: Solution-led (knows what they need)
    Solutions → /solutions/safety-systems
    → Reviews capability description, items, certifications
    → Clicks "Request a Quote"

  PATH B: Sector-led (browsing by their industry)
    Industries → /industries/oil-gas
    → Sees sector-specific supply capability + project reference
    → Clicks through to relevant solution or RFQ

  PATH C: Catalogue-led (browsing the range)
    Catalogue → /catalogue
    → Browses items by category, downloads datasheets
    → Clicks "Request a Quote" on specific item

  PATH D: Trust-verification (due diligence)
    Certifications + About + Projects
    → Verifies credibility
    → Proceeds to RFQ or Contact
        │
        ▼
CONVERSION EVENTS (ordered by intent)
  ① Request a Quote (HIGH — item/solution-specific RFQ form)
  ② Contact Form (MEDIUM — general enquiry or partnership)
  ③ Download Catalogue PDF (SOFT — email captured, brand exposure)
  ④ Download Datasheet (INTENT SIGNAL — no gate, tracked)
        │
        ▼
LEAD HANDLING
  RFQ → Admin inbox → Resend email alert to sales team
       → RFQ assigned status: NEW
       → Buyer receives auto-confirmation email (Resend)
       → Sales team responds within 24 hours
```

### CTA Hierarchy

| CTA                  | Style                          | Placement                                        |
|---------------------|--------------------------------|--------------------------------------------------|
| Request a Quote      | Gold bg, navy text — primary   | Fixed navbar, hero, every catalogue item, footer |
| Explore Solutions    | Ghost/outlined — secondary     | Hero, homepage solutions section                 |
| Download Catalogue   | Outlined with icon — tertiary  | Hero (second CTA), CTA section, footer           |
| Download Datasheet   | Text link with download icon   | Each catalogue item                              |
| Contact Us           | Text link                      | Footer, About page, Catalogue bottom             |

### RFQ Form Design (maximum conversion)

```
STEP 1 — Contact (3 fields)
  Your name | Company name | Work email

STEP 2 — Enquiry Details (2 fields)
  What you need (free text) | Quantity / Unit (optional)

[Submit Request for Quotation]

Below form:
  ✓ We respond within 24 hours
  ✓ ISO 9001:2015 Certified Supplier
  ✓ No obligation, no pressure
```

### Trust Signal Placement

```
Homepage hero area:  ISO badge · Years experience · Industries count
/catalogue page:     Certification badges per item · Datasheet downloads
/solutions/[slug]:   Relevant cert standards · Featured items · Project refs
RFQ form:            "24hr response" · "ISO Certified" · "Confidential"
Footer (always):     ISO 9001:2015 badge + year
```

---

## 13. DESIGN SYSTEM

### Design Philosophy: Premium Industrial Enterprise

The visual language communicates **industrial professionalism and operational reliability** — not technological disruption. Quality comes from precision, not spectacle.

```
✅ YES:
  Clean typographic hierarchy
  Large, intentional whitespace
  Industrial photography (real environments, not abstract renders)
  Subtle, purposeful transitions (fade-in, slide-up on scroll — 0.4s max)
  Certification and compliance badges — visible and credible
  Gold accents used sparingly — for CTAs and key emphasis only

❌ NO:
  Particle systems or floating orbs
  Gradient mesh backgrounds
  Heavy 3D or WebGL elements
  Typewriter / glitch text effects
  Auto-playing looping animations
  Startup-style "glow everything" aesthetics
  Neon accents or oversaturated colors
```

The animation budget is **deliberately low**. The goal is: a senior procurement manager at an Oil & Gas company opens this site and immediately thinks "credible, professional, capable" — not "startup trying to look cool."

### Color Tokens

```typescript
// tailwind.config.ts
colors: {
  navy:    { DEFAULT: '#102544', dark: '#0A1628', light: '#1a3660' },
  gold:    { DEFAULT: '#E7C85A', muted: '#c9a93c', subtle: 'rgba(231,200,90,0.12)' },
  graphite:{ DEFAULT: '#1F2937', light: '#374151', subtle: '#111827' },
  steel:   { DEFAULT: '#374151', light: '#4B5563', muted: '#6B7280' },
  surface: { DEFAULT: '#F8FAFC', muted: '#F1F5F9' },
  // Semantic
  success: '#22C55E',
  warning: '#F59E0B',
  error:   '#EF4444',
}
```

### Typography Scale

```typescript
fontSize: {
  // Display (hero headlines)
  'd2xl': ['88px', { lineHeight: '1.04', letterSpacing: '-0.04em', fontWeight: '700' }],
  'dxl':  ['68px', { lineHeight: '1.06', letterSpacing: '-0.03em', fontWeight: '700' }],
  'dlg':  ['52px', { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '600' }],
  'dmd':  ['42px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
  // Section headings
  'h1':   ['36px', { lineHeight: '1.2',  letterSpacing: '-0.015em' }],
  'h2':   ['28px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
  'h3':   ['22px', { lineHeight: '1.3',  letterSpacing: '-0.005em' }],
  // Body
  'body': ['16px', { lineHeight: '1.65' }],
  'sm':   ['14px', { lineHeight: '1.6'  }],
  // Labels (section labels, badges)
  'label':['11px', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '600' }],
}
```

### Spacing System
- Base unit: 4px (Tailwind default)
- Section vertical padding: `py-20 md:py-28 lg:py-36`
- Container: `max-w-7xl mx-auto px-5 sm:px-8 lg:px-12`
- Card gap: `gap-5 md:gap-6 lg:gap-8`
- Never use margins tighter than 16px between text blocks

### Component Visual Tokens

```css
/* Card — standard */
.card-base {
  background: theme('colors.graphite.DEFAULT');
  border: 1px solid rgba(55, 65, 81, 0.6);
  border-radius: 12px;
  transition: border-color 200ms, box-shadow 200ms, transform 200ms;
}
.card-base:hover {
  border-color: rgba(231, 200, 90, 0.3);
  box-shadow: 0 8px 40px rgba(0,0,0,0.35);
  transform: translateY(-2px);
}

/* Card — glass (used on dark section overlays) */
.card-glass {
  background: rgba(31, 41, 55, 0.55);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(231, 200, 90, 0.12);
  border-radius: 12px;
}

/* Section label (small uppercase above headings) */
.section-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  font-weight: 600;
  text-transform: uppercase;
  color: theme('colors.gold.DEFAULT');
}

/* Gold accent line (under hero headline) */
.accent-line {
  width: 48px;
  height: 2px;
  background: theme('colors.gold.DEFAULT');
  margin: 16px 0;
}
```

### Button System

```
Primary:   bg-gold text-navy font-semibold px-6 py-3 rounded-lg hover:bg-gold-muted
Secondary: border border-steel/50 text-surface bg-transparent hover:border-gold/40
Ghost:     text-surface/70 hover:text-surface underline-offset-4 hover:underline
Danger:    bg-error/10 text-error border border-error/20 hover:bg-error/20
```

### Dark / Light Mode
- Dark mode is primary and default (navy bg)
- Light mode: surface white bg, navy text, gold accents preserved
- `next-themes` handles persistence + SSR without flash
- `prefers-color-scheme` honoured on first visit

---

## 14. FOLDER STRUCTURE

```
vertacore/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts                     # Seed solutions, industries, sample items
├── public/
│   ├── fonts/                      # Self-hosted Geist
│   ├── icons/                      # Favicon, apple-touch-icon
│   ├── og/                         # Static OG fallback image
│   ├── robots.txt
│   └── llms.txt
├── src/
│   ├── app/
│   │   ├── (marketing)/            # All public pages
│   │   │   ├── layout.tsx          # Navbar + Footer
│   │   │   ├── page.tsx            # Home
│   │   │   ├── about/
│   │   │   │   ├── page.tsx        # About overview (static — hardcoded copy)
│   │   │   │   ├── story/page.tsx  # Our Story (static — hardcoded copy)
│   │   │   │   └── mission/page.tsx # Mission & Values (static — hardcoded copy)
│   │   │   │   # NOTE: About sub-pages are static at launch. No DB model needed.
│   │   │   │   # If editable copy is required later, add a SiteSettings DB model.
│   │   │   ├── solutions/
│   │   │   │   ├── page.tsx        # Solutions overview
│   │   │   │   └── [slug]/page.tsx # Solution detail
│   │   │   ├── catalogue/page.tsx  # Static showcase — no sub-routes
│   │   │   ├── industries/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── certifications/page.tsx
│   │   │   ├── brands/
│   │   │   │   ├── page.tsx        # All brands overview
│   │   │   │   └── [slug]/page.tsx # Brand detail page
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── insights/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── (admin)/                # Auth-protected admin area
│   │   │   ├── layout.tsx          # Admin shell (sidebar nav + header)
│   │   │   └── admin/
│   │   │       ├── page.tsx        # Dashboard
│   │   │       ├── solutions/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── new/page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── industries/page.tsx
│   │   │       ├── catalogue/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── new/page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── projects/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── new/page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── certifications/page.tsx
│   │   │       ├── brands/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── new/page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── insights/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── new/page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── rfq/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── inquiries/page.tsx
│   │   │       ├── media/page.tsx
│   │   │       ├── ai/page.tsx             # Ask AI: config + questions + logs (AISettingsClient)
│   │   │       └── settings/page.tsx
│   │   ├── api/
│   │   │   ├── health/route.ts     # GET  — Railway healthcheck (returns 200 + {status:'ok'})
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── rfq/route.ts        # POST — create RFQ, send email
│   │   │   ├── contact/route.ts    # POST — create ContactInquiry
│   │   │   ├── newsletter/route.ts # POST — subscribe
│   │   │   ├── catalogue/route.ts  # POST — PDF download email capture
│   │   │   ├── revalidate/route.ts # POST — ISR cache flush (secret-gated)
│   │   │   ├── chat/
│   │   │   │   ├── route.ts        # POST — AI chat (auth: AISetting.enabled + rate limit)
│   │   │   │   └── questions/
│   │   │   │       └── route.ts    # GET  — enabled questions + widget enabled flag (public)
│   │   │   └── admin/
│   │   │       ├── upload/route.ts # POST — R2 file upload
│   │   │       ├── ai-settings/
│   │   │       │   └── route.ts    # GET/PUT — AI provider config + encrypted API key
│   │   │       ├── ai-questions/
│   │   │       │   ├── route.ts    # GET/POST — quick question management
│   │   │       │   └── [id]/
│   │   │       │       └── route.ts # PUT/DELETE — edit/remove individual question
│   │   │       └── ai-logs/
│   │   │           └── route.ts    # GET — paginated chat log viewer
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   └── global.css
│   ├── components/
│   │   ├── ui/                     # shadcn/ui primitives (untouched)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavDropdown.tsx     # Solutions dropdown (not a mega-menu)
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── marketing/              # Homepage section components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── BrandsBand.tsx
│   │   │   ├── SolutionsSection.tsx
│   │   │   ├── IndustriesSection.tsx
│   │   │   ├── QualitySection.tsx
│   │   │   ├── WhyVertacoreSection.tsx
│   │   │   ├── MetricsBand.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── InsightsSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── catalogue/
│   │   │   ├── CatalogueItem.tsx      # Card: image, name, cert tags, RFQ + datasheet
│   │   │   ├── CatalogueGroup.tsx     # One category section (label + item grid)
│   │   │   ├── CatalogueLightbox.tsx  # Image zoom modal (dynamically imported)
│   │   │   ├── CertTag.tsx            # Small cert badge pill
│   │   │   └── DatasheetLink.tsx      # PDF download link with icon
│   │   ├── admin/                  # Admin-only UI components ("use client")
│   │   │   ├── DataTable.tsx       # TanStack Table wrapper (dynamically imported)
│   │   │   ├── AdminShell.tsx      # Sidebar + header layout for admin pages
│   │   │   ├── StatusBadge.tsx     # RFQ / inquiry status colour badge
│   │   │   ├── AISettingsClient.tsx # Ask AI: config + questions + logs tabs (dynamically imported)
│   │   │   └── MarkdownEditor.tsx  # @uiw/react-md-editor wrapper (dynamically imported)
│   │   ├── forms/
│   │   │   ├── RFQForm.tsx         # "use client" — main enquiry form
│   │   │   ├── ContactForm.tsx     # "use client"
│   │   │   └── NewsletterForm.tsx  # "use client"
│   │   ├── shared/
│   │   │   ├── SectionLabel.tsx    # Small gold uppercase label
│   │   │   ├── AnimatedCounter.tsx # Scroll-triggered count-up
│   │   │   ├── ScrollReveal.tsx    # Framer Motion in-view fade
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── PageHeader.tsx      # Reused cinematic page header
│   │   ├── shared/
│   │   │   ├── SectionLabel.tsx    # Small gold uppercase label
│   │   │   ├── AnimatedCounter.tsx # Scroll-triggered count-up
│   │   │   ├── ScrollReveal.tsx    # Framer Motion in-view fade
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── PageHeader.tsx      # Reused cinematic page header
│   │   │   └── AskAIWidget.tsx     # Ask AI slide-out panel ("use client", dynamic import)
│   │   └── providers/
│   │       ├── ThemeProvider.tsx
│   │       └── SessionProvider.tsx
│   ├── lib/
│   │   ├── db.ts                   # Prisma client singleton
│   │   ├── r2.ts                   # Cloudflare R2 (S3-compatible) client
│   │   ├── email.ts                # Resend email helpers
│   │   ├── seo.ts                  # Metadata factory
│   │   ├── schema.ts               # JSON-LD generators
│   │   ├── rfq.ts                  # RFQ number generation
│   │   ├── revalidate.ts           # ISR revalidation helpers
│   │   ├── security.ts             # CSRF check + sanitiseText (server-only)
│   │   ├── rateLimit.ts            # In-memory rate limiter (server-only)
│   │   ├── logger.ts               # Structured logger (server-only)
│   │   ├── ai.ts                   # AI provider abstraction — AES-256 key enc/dec, runChat()
│   │   ├── ai-config.ts            # AI constants (safe for client import)
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── useIntersection.ts
│   │   └── useMediaQuery.ts
│   └── types/
│       ├── db.ts                   # Prisma type re-exports
│       └── api.ts                  # API request/response types
├── middleware.ts                   # Auth guard for /admin/*
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
└── package.json
```

---

## 14B. MRO CONTENT STRATEGY

### Content Hierarchy (by priority weight)

```
TIER 1 — TRUST CONTENT [VERY HIGH PRIORITY]
  These pages exist to establish procurement credibility before a buyer enquires.
  Build these first, keep them meticulous.

  /certifications     Full certification register with downloadable certificates
  /about              Company history, ISO cert, mission, values
  /brands             Vendor/brand network — signals sourcing quality
  /projects           Proof of delivery at scale — named sector, real metrics

TIER 2 — DISCOVERY CONTENT [HIGH PRIORITY]
  These pages are where buyers find what VERTACORE can supply for their context.
  Primary traffic and RFQ entry points.

  /solutions/[slug]   Each MRO supply capability area — fully detailed
  /industries/[slug]  Sector-specific supply capability pages
  /catalogue          Visual showcase of representative range

TIER 3 — AUTHORITY CONTENT [MEDIUM PRIORITY]
  Positions VERTACORE as a knowledgeable partner, not just a vendor.
  Supports SEO and AEO (answer engine) visibility.
  Build after Tier 1 and 2 are complete.

  /insights/*         Technical articles, procurement guides, compliance overviews
```

### Content Voice Rules for MRO

```
✅ USE:
  "certified to EN 361:2002"              (specific standards)
  "suitable for offshore and onshore operations" (operational context)
  "sourced from internationally recognised brands"
  "compliant with [sector] regulations"
  "available for immediate enquiry"
  "our team will respond within 24 hours"

❌ AVOID:
  "revolutionary" / "cutting-edge" / "innovative"  (startup language)
  "platform" / "solution suite" / "ecosystem"       (SaaS language)
  "AI-powered" / "intelligent" / "smart"            (wrong identity)
  vague claims without specifics
  passive voice
```

### Initial Content Plan

| Page                          | Content Owner   | Priority | Status  |
|------------------------------|-----------------|----------|---------|
| Home                          | Marketing copy  | P0       | —       |
| /about                        | Company profile | P0       | —       |
| /certifications               | Cert register   | P0       | —       |
| /solutions/safety-systems     | Solution copy   | P0       | —       |
| /solutions/welding-systems    | Solution copy   | P0       | —       |
| /solutions/lifting-rigging    | Solution copy   | P0       | —       |
| /solutions/abrasives          | Solution copy   | P1       | —       |
| /solutions/industrial-tools   | Solution copy   | P1       | —       |
| /catalogue                    | Catalogue items | P0       | —       |
| /industries/oil-gas           | Industry copy   | P1       | —       |
| /industries/marine            | Industry copy   | P1       | —       |
| /industries/construction      | Industry copy   | P1       | —       |
| /industries/manufacturing     | Industry copy   | P2       | —       |
| /industries/mining            | Industry copy   | P2       | —       |
| /brands                       | Brand profiles  | P1       | —       |
| /projects (3 case studies)    | Project write-up| P1       | —       |
| /insights (4 articles)        | Technical copy  | P2       | —       |

### Insight Article Topics (MRO-Relevant)

```
1. "How to select the right fall protection harness for offshore operations"
   → Targets: "offshore fall protection harness" — HSE managers, site engineers

2. "MIG vs TIG welding: choosing the right process for fabrication projects"
   → Targets: "MIG TIG welding comparison" — welders, engineering teams

3. "ISO 9001 certified suppliers: why it matters for industrial procurement"
   → Targets: "ISO certified industrial supplier" — procurement managers

4. "Rigging safety checklist for construction and marine lifting operations"
   → Targets: "lifting rigging safety checklist" — operations, HSE

5. "Understanding EN and ANSI standards for industrial PPE"
   → Targets: "EN ANSI PPE standards" — compliance, HSE managers
```

---

## 15. COMPONENT ARCHITECTURE

### Server vs Client Component Rules

```
SERVER COMPONENTS (default — all data-fetching):
  - All page.tsx files
  - All layout.tsx files  
  - CatalogueGrid, CatalogueItem (display only)
  - HeroSection (static content)
  - All section components (display data fetched in parent page)

CLIENT COMPONENTS ("use client" — only when needed):
  - Navbar (scroll-triggered style change)
  - NavDropdown (Solutions dropdown interaction)
  - MobileMenu (open/close state)
  - RFQForm, ContactForm (form state + submission)
  - CatalogueItem image lightbox (zoom modal)
  - AnimatedCounter (scroll + counter animation)
  - ScrollReveal (Framer Motion in-view detection)
  - ThemeProvider, ThemeToggle
  - SearchBar (input state)
  - AskAIWidget (chat panel state, message list, API calls — dynamic import)
```

### Key Component Contracts

```typescript
// CatalogueItem.tsx — card used on /catalogue and /solutions/[slug]
// Field names match the CatalogueItem Prisma model exactly
interface CatalogueItemProps {
  id: string
  name: string
  description?: string           // matches: CatalogueItem.description
  categoryGroup: string          // matches: CatalogueItem.categoryGroup
  image?: string                 // matches: CatalogueItem.image (single R2 URL)
  certTags: string[]             // matches: CatalogueItem.certTags (plain string array)
  brandName?: string             // matches: CatalogueItem.brandName (plain string, no relation)
  datasheetUrl?: string          // matches: CatalogueItem.datasheetUrl (single PDF URL)
}

// RFQForm.tsx — prefills item name from catalogue context
interface RFQFormProps {
  prefillItem?: string           // pre-populated "Product(s) of interest" field
  source?: string                // e.g. "catalogue", "solutions-safety", "homepage"
}

// SectionLabel.tsx — reused above every section heading
interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

// AnimatedCounter.tsx — scroll-triggered count-up
interface AnimatedCounterProps {
  end: number
  suffix?: string    // "+", "%", "K"
  duration?: number  // ms
  label: string
}
```

---

## 16. PERFORMANCE STRATEGY

### Target Metrics

| Metric | Target  | Approach                                      |
|--------|---------|-----------------------------------------------|
| LCP    | < 2.0s  | Hero image `priority`, preload link in `<head>`|
| CLS    | < 0.05  | Explicit `width`/`height` on all images        |
| INP    | < 150ms | No heavy JS on main thread                    |
| TTFB   | < 500ms | Railway + Cloudflare CDN, ISR serves stale     |
| FCP    | < 1.4s  | No render-blocking CSS/JS                     |

### Image Strategy
```typescript
// Hero image: eager + priority
<Image src={url} alt="..." priority loading="eager" />

// Product images: lazy + blur placeholder
<Image src={url} alt="..." loading="lazy" placeholder="blur" blurDataURL={base64} />

// Sizes attributes always explicit:
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

// All images served from Cloudflare R2 via custom domain
// next.config.ts:
images: { remotePatterns: [{ hostname: 'assets.vertacore.com' }] }
// Format: AVIF + WebP via Next.js built-in optimization
```

### Code Splitting
```typescript
// Heavy admin components loaded dynamically
// Heavy admin components — loaded only when admin routes are visited
const DataTable      = dynamic(() => import('@/components/admin/DataTable'),      { ssr: false })
const MarkdownEditor = dynamic(() => import('@/components/admin/MarkdownEditor'), { ssr: false })

// Catalogue image lightbox (heavy) — dynamic on /catalogue page
const CatalogueLightbox = dynamic(() => import('@/components/catalogue/CatalogueLightbox'))
```

### Caching Headers
```typescript
// next.config.ts headers()
'/':                  's-maxage=3600, stale-while-revalidate=86400'
'/catalogue':         's-maxage=1800, stale-while-revalidate=3600'
'/_next/static/:path*': 'public, max-age=31536000, immutable'
'/fonts/:path*':      'public, max-age=31536000, immutable'
```

### Font Loading
```typescript
// Self-hosted Geist via next/font — zero layout shift, preloaded
import { GeistSans, GeistMono } from 'geist/font'
// Subset to latin only — reduces font file size
```

---

## 17. SECURITY STRATEGY

### Application Security

**Input Validation (all API routes):**
```typescript
// Every POST route validates with Zod before DB access

// POST /api/rfq
// items is plain text — matches RFQ.items String in Prisma schema
const rfqSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName:  z.string().min(1).max(100),
  email:     z.string().email(),
  company:   z.string().min(1).max(200),
  jobTitle:  z.string().max(100).optional(),
  phone:     z.string().max(30).optional(),
  country:   z.string().max(100).optional(),
  industry:  z.string().max(100).optional(),
  items:     z.string().min(5).max(2000),   // free text — matches RFQ.items String
  message:   z.string().max(2000).optional(),
  source:    z.string().max(100).optional(),
})

// POST /api/contact
const contactSchema = z.object({
  name:    z.string().min(1).max(100),
  email:   z.string().email(),
  company: z.string().max(200).optional(),
  phone:   z.string().max(30).optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(3000),
})
```

**Rate Limiting (Cloudflare WAF rules):**
- `/api/contact`: 10 requests/minute per IP
- `/api/rfq`: 5 requests/minute per IP
- `/api/newsletter`: 3 requests/minute per IP
- `/admin/login`: 5 attempts/minute per IP, lockout after 10 fails

**Security Headers (next.config.ts):**
```typescript
'X-Frame-Options': 'DENY'
'X-Content-Type-Options': 'nosniff'
'Referrer-Policy': 'strict-origin-when-cross-origin'
'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
'Content-Security-Policy': [
  "default-src 'self'",
  "script-src 'self' 'nonce-{NONCE}'",
  "style-src 'self' 'unsafe-inline'",  // Tailwind requires
  "img-src 'self' assets.vertacore.com data: blob:",
  "connect-src 'self'",
  "font-src 'self'",
  "frame-ancestors 'none'",
].join('; ')
```

**Admin Security:**
- bcryptjs with work factor 12 for password hashing
- httpOnly, sameSite: strict, secure cookies for sessions
- Session expiry: 8 hours (business hours only)
- All admin routes protected by middleware (server-side, not client)
- Admin user creation only via seeded super admin — no public signup

**File Upload Security (R2):**
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `application/pdf`
- Max file size: 10MB images, 25MB PDFs
- File name sanitized: slugify, remove special chars
- Virus scanning: ClamAV or Cloudflare's scan (Phase 2)
- Files served via R2 public domain — never proxied through app server

**Database Security:**
- Parameterized queries only via Prisma (no raw SQL unless absolutely needed)
- If raw SQL used: `prisma.$queryRaw` with `Prisma.sql` tagged template only
- DB credentials never in codebase — environment variables only
- DB user has minimum required permissions (no DROP TABLE privilege in app user)

**Environment:**
- `.env.local` in `.gitignore` — never committed
- `.env.example` committed — shows required vars, no values
- Railway injects env vars at runtime — not baked into build artifacts

**AI Security:**
- API keys (Anthropic/OpenAI) stored AES-256-CBC encrypted in `AISetting.apiKeyEnc`
- Encryption key: `AI_ENCRYPTION_KEY` env var — hashed via SHA-256 to produce 256-bit key
- IP hashing: `AI_IP_SALT` env var — all IPs hashed SHA-256 before `AIChatLog` insert
- Chat rate limit: 10 requests/60 seconds per IP (in-memory, reinforced by Cloudflare WAF)
- `/api/chat` validates message array: max 20 messages, 500 chars each, Zod schema enforced
- All user input sanitised (strip HTML) before DB write and before passing to AI provider
- CSRF check (`checkCsrf`) on all `/api/chat` and `/api/admin/ai-*` POST/PUT/DELETE routes
- AISetting.enabled = false means widget is hidden and `/api/chat` returns 503
- Predefined answers bypass AI call entirely (no API cost or latency for known questions)
- Admin API key field masked in GET response — only `apiKeyMasked` (first 4 + last 4) exposed

---

## 18. SCALABILITY ROADMAP

### Phase 1 — Launch (Months 1–2)
Priority order matches the MRO website priority weights: Trust first, then capability, then RFQ conversion.

- [ ] **TRUST FIRST**: About page — company profile, history, ISO certification
- [ ] **TRUST FIRST**: Certifications page — full register with downloadable certificates
- [ ] **TRUST FIRST**: Brands page — vendor/partner network
- [ ] Home page — hero, solutions grid, industries, quality section, metrics, projects, CTA
- [ ] Solutions pages (5): safety, welding, lifting & rigging, abrasives, industrial tools
- [ ] Catalogue page — curated showcase, categories, RFQ CTA on every item
- [ ] Industries pages (3 at launch): Oil & Gas, Marine, Construction
- [ ] Projects page + 2–3 initial project case studies
- [ ] Contact page + RFQ form with Resend email notification
- [ ] Admin panel: catalogue management, solutions, RFQ inbox
- [ ] Railway deployment + Cloudflare CDN/WAF + R2 assets
- [ ] SEO: metadata, sitemap.xml, robots.txt, /llms.txt, JSON-LD schemas
- [ ] Mobile responsive, dark/light mode

### Phase 2 — Content Depth (Months 3–4)
- [ ] Remaining industries: Manufacturing, Mining, Fabrication, Power & Energy
- [ ] 5 additional project case studies
- [ ] 4–5 Insights articles (MRO-relevant technical topics — see content plan)
- [ ] Catalogue PDF download (email capture gate)
- [ ] Newsletter signup + Resend welcome sequence
- [ ] Brand profile pages `/brands/[slug]`
- [ ] Dynamic OG image generation per solution and project page
- [ ] Site search (Pagefind — static, zero infra cost)

### Phase 3 — Engagement (Months 5–6)
- [ ] **Ask AI widget** — VERTACORE AI procurement assistant (see Section 19)
- [ ] WhatsApp Business API button (regional procurement contacts)
- [ ] Google Analytics 4 with RFQ conversion events
- [ ] Catalogue filters: by category, brand, certification standard
- [ ] Video support in project case studies
- [ ] Deeper industry pages with sector-specific compliance information
- [ ] A/B test on hero CTA copy

### Phase 4 — B2B Platform (Months 7–12)
- [ ] Client portal: authenticated, saved RFQ history, order tracking
- [ ] Saved products / wishlist (requires login)
- [ ] Bulk RFQ: upload CSV of required items
- [ ] Customer-specific pricing (private, role-based)
- [ ] Distributor / partner portal
- [ ] Multi-currency quote display (informational, not transactional)
- [ ] Multi-language: Arabic + English at minimum (i18n routing)

### Phase 5 — Ecosystem (Year 2)
- [ ] E-procurement integration (SAP Ariba, Oracle Procurement)
- [ ] API for enterprise client systems (ERP/procurement integration)
- [ ] Digital product configurator (specify requirements → system suggests products)
- [ ] Predictive reorder notifications for repeat clients
- [ ] Carbon footprint / sustainability data per product (ESG compliance)
- [ ] Regional expansion: multi-region Railway services

### Architecture Durability Decisions

| Decision                      | Rationale                                                  |
|------------------------------|------------------------------------------------------------|
| Next.js App Router            | RSC + streaming — scales to full platform                  |
| Prisma ORM                    | Type-safe, migration-friendly as schema grows              |
| PostgreSQL on Railway         | ACID, relational, no vendor lock-in                        |
| Cloudflare R2                 | Zero egress fees as product image volume grows             |
| Custom admin (not Sanity)     | Full control, no per-seat CMS pricing, can evolve to portal|
| ISR everywhere                | Static performance with content freshness                  |
| Zod validation                | Runtime + compile-time safety at API boundaries            |
| shadcn/ui (no full UI lib)    | Copy-paste components, zero runtime overhead, full control |

---

## 19. ASK AI ARCHITECTURE

### Overview

VERTACORE AI is a procurement assistant chat widget embedded in the site navbar. It helps procurement managers, HSE managers, and site engineers find the right MRO products, understand certifications, and navigate to the RFQ form. The widget is **fully admin-controlled**: enable/disable, configure the AI provider, manage suggested questions, and review chat logs — all from `/admin/ai`.

The feature is deliberately positioned as **optional infrastructure** — the site works perfectly without it. When enabled, it adds a conversion layer for buyers who prefer to ask questions before committing to an RFQ.

### Design

```
NAVBAR (when enabled):
  [VERTACORE]  Solutions  Catalogue  Industries  About  [✦ Ask AI]  [Request a Quote →]
                                                         ↑ gold-bordered button, nav-level
WIDGET PANEL (slide out from right, full height under navbar):
  ┌─────────────────────────────┐
  │  ✦ VERTACORE AI        [✕] │  ← header, navy bg
  │  Procurement assistant      │
  ├─────────────────────────────┤
  │                             │
  │  [AI bubble]:               │  ← welcome message
  │  Hi, I'm VERTACORE AI...    │
  │                             │
  │  SUGGESTED QUESTIONS        │
  │  ┌─────────────────────┐    │
  │  │ What certifications...│  │  ← question chips (admin-managed)
  │  └─────────────────────┘    │
  │  ┌─────────────────────┐    │
  │  │ How do I request a..│  │
  │  └─────────────────────┘    │
  │                             │
  ├─────────────────────────────┤
  │  [Ask a question...   ] [→] │  ← input + send
  │  VERTACORE AI can make...   │  ← disclaimer
  └─────────────────────────────┘
```

**Design tokens used:**
- Panel background: `bg-navy` (`#102544`) — dark industrial, not white
- Header: `bg-navy-dark` with gold sparkle icon
- User messages: `bg-gold text-navy` bubbles
- AI messages: `bg-graphite border-steel/40` bubbles
- Chips: `border-steel/40 text-surface/70 hover:border-gold/40 hover:text-gold`
- Send button: `bg-gold text-navy hover:bg-gold-muted`

### Data Flow

```
VISITOR OPENS WIDGET
        │
        ▼
GET /api/chat/questions
  → returns: { enabled: bool, questions: [{ id, text, answer? }] }
  → if enabled=false AND questions=[]: widget hidden entirely
        │
        ▼
VISITOR CLICKS CHIP OR TYPES QUESTION
        │
        ├── Chip matches predefined answer?
        │       └── YES → show answer directly (no API call, 600ms delay UX)
        │
        └── NO predefined answer or typed freely
                │
                ├── enabled=false → show "AI assistant is offline" error
                │
                └── enabled=true → POST /api/chat
                        → rate check (10 req/60s per IP)
                        → CSRF check
                        → Zod validate messages array
                        → sanitise all content
                        → load AISetting from DB
                        → build systemPrompt + live catalogue context
                        → call AI provider (Anthropic or OpenAI)
                        → log to AIChatLog (IP hashed, no PII)
                        → return { reply: string }
```

### System Prompt Context Injection

At query time, `/api/chat` appends live VERTACORE data to the system prompt:

```
[admin-edited system prompt]

## Current Solutions

**Safety Systems**
  - Full Body Safety Harness: Fall protection for offshore and onshore operations
  - Safety Helmet (Class E): Hard hat with electrical insulation, EN 397 certified
  ...

**Welding Systems**
  - MIG/MAG Welding Machine: Semi-automatic welding for fabrication and construction
  ...

## Current Catalogue Items (Safety & PPE)
  - [item name]: [description]
  ...
```

This ensures the AI always answers based on what VERTACORE actually supplies — no hallucinated products.

### API Routes

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/chat` | POST | Public (rate-limited) | Send message, get AI reply |
| `/api/chat/questions` | GET | Public | Get widget config + suggested questions |
| `/api/admin/ai-settings` | GET | Admin session | Get current AI config (masked key) |
| `/api/admin/ai-settings` | PUT | Admin session | Update provider, model, API key, system prompt, enabled |
| `/api/admin/ai-questions` | GET | Admin session | List all questions |
| `/api/admin/ai-questions` | POST | Admin session | Create question |
| `/api/admin/ai-questions/[id]` | PUT | Admin session | Update question text, answer, enabled, sort order |
| `/api/admin/ai-questions/[id]` | DELETE | Admin session | Remove question |
| `/api/admin/ai-logs` | GET | Admin session | Paginated chat log list |

### Key Implementation Files

| File | Purpose |
|---|---|
| `src/lib/ai.ts` | AES-256 encrypt/decrypt, `runChat()` for Anthropic + OpenAI, `hashIp()` |
| `src/lib/ai-config.ts` | `PROVIDER_MODELS` constant, `DEFAULT_SYSTEM_PROMPT` — safe for client import |
| `src/lib/security.ts` | `checkCsrf()`, `sanitiseText()` |
| `src/lib/rateLimit.ts` | In-memory rate limiter, `getClientIp()` |
| `src/lib/logger.ts` | Structured logger — JSON in prod, console in dev |
| `src/components/shared/AskAIWidget.tsx` | Full widget UI — "use client", dynamically imported in Navbar |
| `src/components/admin/AISettingsClient.tsx` | Admin UI — three tabs: config, questions, logs |

### Environment Variables (additional for Ask AI)

```bash
# Required when Ask AI is used
AI_ENCRYPTION_KEY=           # Long random string — used to derive AES-256 key for API key encryption
AI_IP_SALT=                  # Random string — mixed into SHA-256 IP hash for privacy
```

Add to `.env.example`:
```bash
AI_ENCRYPTION_KEY=your-secret-encryption-key-here
AI_IP_SALT=your-secret-ip-salt-here
```

### Widget Behaviour Rules

| Condition | Widget Behaviour |
|---|---|
| `AISetting` not found OR `enabled=false` AND no questions | Button hidden, widget never renders |
| `enabled=false` AND questions exist | Button visible, widget shows chips only, typed input disabled |
| `enabled=true`, API key set | Full chat with AI + chips |
| Predefined answer matched (exact, case-insensitive) | Shows pre-written answer instantly, no AI call |
| Rate limit exceeded | Shows error: "Too many requests. Please wait a moment." |
| AI provider error | Shows error: "The AI assistant encountered an error. Please try again." |

### Suggested Questions (initial seed)

These are seeded at first admin setup. Admin can edit, reorder, disable any:

```
1. What certifications do your products carry?
   → [predefined]: VERTACORE supplies products certified to CE, EN 361, EN 397,
     ANSI Z359, ISO 9001:2015 and other internationally recognised standards.
     Full documentation available on request.

2. How do I request a quote?
   → [predefined]: Click "Request a Quote" in the navigation or on any product
     item. Fill in your company details and what you need — our team responds
     within 24 hours.

3. Do you offer bulk or contract pricing?
   → [AI-answered]: no predefined — AI answers dynamically

4. Can you source industry-specific PPE (oil & gas, construction, marine)?
   → [AI-answered]: no predefined — AI answers dynamically

5. What is your lead time for orders?
   → [predefined]: Lead times vary by product and quantity. Submit an RFQ
     with your requirements and our team will confirm availability and
     delivery timeframes.

6. Do you provide product documentation and compliance certificates?
   → [predefined]: Yes. Datasheets, compliance certificates, and test
     reports are available for all products. Request via RFQ or contact
     our team directly.
```

---

## APPENDIX: QUICK START

```bash
# 1. Initialize project
mkdir vertacore && cd vertacore
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# 2. Install core dependencies
npm install prisma @prisma/client
npm install framer-motion
npm install next-auth@beta
npm install bcryptjs @types/bcryptjs
npm install zod react-hook-form @hookform/resolvers
npm install resend
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
npm install next-themes
npm install lucide-react
npm install sonner

# 3a. Install Ask AI dependencies
npm install @anthropic-ai/sdk   # Anthropic Claude support
npm install openai               # OpenAI GPT support (optional — only needed if using OpenAI)

# 3. shadcn/ui init
npx shadcn@latest init
npx shadcn@latest add button card badge input label textarea dialog sheet tabs

# 4. Prisma init
npx prisma init
# Edit schema.prisma (see Section 5)
npx prisma migrate dev --name init

# 5. Railway setup
railway login
railway init
railway add --database postgresql
railway up

# 6. Cloudflare R2
# Create bucket: vertacore-assets
# Create API token with R2:Object Read/Write
# Add custom domain: assets.vertacore.com

# 7. Environment
cp .env.example .env.local
# Fill in: DATABASE_URL, R2_*, NEXTAUTH_SECRET, RESEND_API_KEY
# For Ask AI: AI_ENCRYPTION_KEY, AI_IP_SALT, then set API key via /admin/ai
```

---

*VERTACORE Architecture v4.0 — MRO Industrial Supply & Procurement Company*  
*Update this document as decisions are made and the system evolves.*
