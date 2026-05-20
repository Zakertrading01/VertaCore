# VERTACORE

**Premium MRO Industrial Supply & Procurement Platform**

> Certified safety equipment, welding systems, lifting & rigging, and industrial consumables for Oil & Gas, Marine, Construction, Manufacturing, and Mining operations worldwide.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Railway) |
| ORM | Prisma 6 |
| Asset Storage | Cloudflare R2 |
| Email | Resend |
| Deployment | Railway |

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL (local or Railway)

### Setup

```bash
# Install dependencies
npm install

# Copy env and fill in values
cp .env.example .env

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed the database
npm run db:seed

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/vertacore

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=vertacore-assets
R2_PUBLIC_URL=https://assets.vertacore.com

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://vertacore.com

# Email
RESEND_API_KEY=
EMAIL_FROM=noreply@vertacore.com
EMAIL_SALES=sales@vertacore.com

# ISR
REVALIDATE_SECRET=

# Ask AI
AI_ENCRYPTION_KEY=
AI_IP_SALT=
```

---

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

---

## Deploy on Railway

VERTACORE is deployed on [Railway](https://railway.app).

### Services

- **web** — Next.js application (this repo, `main` branch)
- **postgres** — Railway PostgreSQL 16

### Deploy Steps

1. Create a new Railway project
2. Add a PostgreSQL service
3. Connect this GitHub repo to a new web service
4. Set environment variables (see above)
5. Railway auto-deploys on every push to `main`

### Post-deploy

After first deploy, run migrations via Railway's shell:

```bash
npm run db:migrate
npm run db:seed
```

---

## Project Structure

```
src/
├── app/
│   ├── (marketing)/     # All public pages (Navbar + Footer)
│   └── api/             # API routes (RFQ, contact, chat, etc.)
├── components/
│   ├── layout/          # Navbar, Footer, MobileMenu
│   ├── marketing/       # Homepage sections
│   ├── catalogue/       # Catalogue item cards
│   ├── forms/           # RFQ, Contact, Newsletter forms
│   └── shared/          # ScrollReveal, Breadcrumb, PageHeader, etc.
├── lib/                 # db, r2, email, seo, schema, ai, security
├── hooks/               # useIntersection, useMediaQuery, useScrollProgress
└── types/               # TypeScript types
prisma/
├── schema.prisma        # Full database schema
└── seed.ts              # Seed data (solutions, industries, AI questions)
```

---

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the complete technical blueprint including database schema, SEO strategy, design system, component architecture, and scalability roadmap.
