import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CatalogueItemCard } from "./CatalogueItemCard";
import type { CatalogueItemCard as CatalogueItemCardType } from "@/types/db";

const SOLUTION_LINKS: Record<string, string> = {
  "Safety & PPE": "/solutions/safety-ppe",
  "Welding & Fabrication": "/solutions/welding-fabrication",
  "Lifting & Material Handling": "/solutions/lifting-handling",
  "Industrial Supply": "/solutions/industrial-supply",
  "Technical Procurement": "/solutions/technical-procurement",
  "Project Supply & Logistics": "/solutions/project-logistics",
};

interface CatalogueGroupProps {
  categoryGroup: string;
  items: CatalogueItemCardType[];
}

export function CatalogueGroup({ categoryGroup, items }: CatalogueGroupProps) {
  const solutionLink = SOLUTION_LINKS[categoryGroup];

  return (
    <section aria-labelledby={`group-${categoryGroup.toLowerCase().replace(/\s+/g, "-")}`}>
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-8 bg-gold" />
          <h2
            id={`group-${categoryGroup.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-h3 font-bold text-surface"
          >
            {categoryGroup}
          </h2>
        </div>

        {solutionLink && (
          <Link
            href={solutionLink}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-muted transition-colors font-medium"
          >
            View Solution
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {items.map((item) => (
          <CatalogueItemCard key={item.id} {...item} />
        ))}
      </div>

      {/* Mobile solution link */}
      {solutionLink && (
        <div className="mt-5 sm:hidden">
          <Link
            href={solutionLink}
            className="inline-flex items-center gap-1.5 text-sm text-gold font-medium"
          >
            See all {categoryGroup} solutions
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
