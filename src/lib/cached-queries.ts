import { unstable_cache } from 'next/cache';
import { db } from './db';

// --- Catalogue ---
export const getCatalogueItems = unstable_cache(
  () =>
    db.catalogueItem.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        categoryGroup: true,
        image: true,
        certTags: true,
        brandName: true,
        datasheetUrl: true,
      },
    }).catch(() => []),
  ['catalogue-items'],
  { revalidate: 3600, tags: ['catalogue'] }
);

// --- Solutions (category list) ---
export const getSolutionCategories = unstable_cache(
  () =>
    db.category.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    }).catch(() => []),
  ['solution-categories'],
  { revalidate: 3600, tags: ['solutions'] }
);

// --- Solution detail page ---
export const getSolution = (slug: string) =>
  unstable_cache(
    () =>
      db.solution.findUnique({
        where: { slug, published: true },
        include: { industries: true },
      }).catch(() => null),
    [`solution-${slug}`],
    { revalidate: 3600, tags: ['solution-pages', `solution-${slug}`] }
  )();

export const getSolutionCatalogueItems = (categoryGroup: string) =>
  unstable_cache(
    () =>
      db.catalogueItem.findMany({
        where: { published: true, categoryGroup },
        take: 6,
        orderBy: { order: 'asc' },
        select: {
          id: true,
          name: true,
          description: true,
          categoryGroup: true,
          image: true,
          certTags: true,
          brandName: true,
          datasheetUrl: true,
        },
      }).catch(() => []),
    [`solution-catalogue-${categoryGroup}`],
    { revalidate: 3600, tags: ['catalogue', `solution-catalogue-${categoryGroup}`] }
  )();

// --- Brands ---
export const getBrands = unstable_cache(
  () =>
    db.brand.findMany({
      orderBy: [{ featured: 'desc' }, { order: 'asc' }],
    }).catch(() => []),
  ['brands'],
  { revalidate: 3600, tags: ['brands'] }
);

export const getBrand = (slug: string) =>
  unstable_cache(
    () => db.brand.findUnique({ where: { slug } }).catch(() => null),
    [`brand-${slug}`],
    { revalidate: 3600, tags: ['brands', `brand-${slug}`] }
  )();

// --- Industries ---
export const getIndustries = unstable_cache(
  () =>
    db.industry.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    }).catch(() => []),
  ['industries'],
  { revalidate: 3600, tags: ['industries'] }
);

export const getIndustry = (slug: string) =>
  unstable_cache(
    () =>
      db.industry.findUnique({
        where: { slug, published: true },
        include: {
          solutions: { where: { published: true } },
          projects: { where: { published: true }, take: 2 },
        },
      }).catch(() => null),
    [`industry-${slug}`],
    { revalidate: 3600, tags: ['industries', `industry-${slug}`] }
  )();

// --- Insights ---
export const getInsights = unstable_cache(
  () =>
    db.insight.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        author: true,
        tags: true,
        readTime: true,
        publishedAt: true,
        featured: true,
      },
    }).catch(() => []),
  ['insights'],
  { revalidate: 3600, tags: ['insights'] }
);

export const getInsight = (slug: string) =>
  unstable_cache(
    () =>
      db.insight.findUnique({ where: { slug, published: true } }).catch(() => null),
    [`insight-${slug}`],
    { revalidate: 3600, tags: ['insights', `insight-${slug}`] }
  )();

// --- Projects ---
export const getProjects = unstable_cache(
  () =>
    db.project.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { completedAt: 'desc' }],
      include: { industry: true },
    }).catch(() => []),
  ['projects'],
  { revalidate: 3600, tags: ['projects'] }
);

export const getProject = (slug: string) =>
  unstable_cache(
    () =>
      db.project.findUnique({
        where: { slug, published: true },
        include: { industry: true, solutions: true },
      }).catch(() => null),
    [`project-${slug}`],
    { revalidate: 3600, tags: ['projects', `project-${slug}`] }
  )();

// --- Home ---
export const getHomeProjects = unstable_cache(
  () =>
    db.project.findMany({
      where: { published: true, featured: true },
      take: 3,
      orderBy: { completedAt: 'desc' },
      include: { industry: true },
    }).catch(() => []),
  ['home-projects'],
  { revalidate: 3600, tags: ['projects'] }
);

export const getHomeInsights = unstable_cache(
  () =>
    db.insight.findMany({
      where: { published: true },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        author: true,
        tags: true,
        readTime: true,
        publishedAt: true,
      },
    }).catch(() => []),
  ['home-insights'],
  { revalidate: 3600, tags: ['insights'] }
);
