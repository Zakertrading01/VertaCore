import type {
  Solution,
  Industry,
  CatalogueItem,
  Project,
  Certification,
  Brand,
  Insight,
  RFQ,
  ContactInquiry,
  RFQStatus,
  RFQPriority,
} from "@prisma/client";

export type {
  Solution,
  Industry,
  CatalogueItem,
  Project,
  Certification,
  Brand,
  Insight,
  RFQ,
  ContactInquiry,
  RFQStatus,
  RFQPriority,
};

export type SolutionWithIndustries = Solution & {
  industries: Industry[];
};

export type ProjectWithRelations = Project & {
  industry: Industry | null;
  solutions: Solution[];
};

export type InsightWithSlug = Pick<
  Insight,
  "id" | "slug" | "title" | "excerpt" | "coverImage" | "author" | "tags" | "readTime" | "publishedAt"
>;

export type CatalogueItemCard = Pick<
  CatalogueItem,
  "id" | "name" | "description" | "categoryGroup" | "image" | "certTags" | "brandName" | "datasheetUrl"
>;

export type ProjectMetric = {
  label: string;
  value: string;
};
