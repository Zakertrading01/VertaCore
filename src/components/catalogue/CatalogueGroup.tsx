"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CatalogueItemCard } from "./CatalogueItemCard";
import { Modal } from "@/components/shared/Modal";
import { CatalogueRequestForm } from "@/components/forms/CatalogueRequestForm";
import type { CatalogueItemCard as CatalogueItemCardType } from "@/types/db";

interface CatalogueGroupProps {
  categoryGroup: string;
  items: CatalogueItemCardType[];
  pdfUrl?: string;
  pdfImage?: string;
  pdfLabel?: string;
}

export function CatalogueGroup({ categoryGroup, items, pdfUrl, pdfImage, pdfLabel }: CatalogueGroupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <section aria-labelledby={`group-${categoryGroup.toLowerCase().replace(/\s+/g, "-")}`}>
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-8 bg-gold" />
          <h2
            id={`group-${categoryGroup.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-h3 font-bold text-surface scroll-mt-24 md:scroll-mt-32"
          >
            {categoryGroup}
          </h2>
        </div>

        {pdfUrl && (
          <button
            onClick={() => setIsOpen(true)}
            className="group hidden sm:inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-muted transition-colors font-medium bg-transparent border-none cursor-pointer focus:outline-none underline underline-offset-4 decoration-gold/30 hover:decoration-gold"
          >
            View Full Catalogue
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {items.map((item) => (
          <CatalogueItemCard key={item.id} {...item} />
        ))}
      </div>

      {/* Mobile view catalogue link */}
      {pdfUrl && (
        <div className="mt-5 sm:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="group inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-muted transition-colors font-medium bg-transparent border-none cursor-pointer focus:outline-none underline underline-offset-4 decoration-gold/30 hover:decoration-gold"
          >
            View Full Catalogue
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Catalogue Access Request"
      >
        <div className="mb-6">
          <p className="text-sm text-white/80 leading-relaxed">
            Please enter your details to request access to the **{categoryGroup}** catalogue PDF.
          </p>
        </div>
        <CatalogueRequestForm onSuccess={handleSuccess} pdfUrl={pdfUrl} />
      </Modal>
    </section>
  );
}
