"use client";

import { useState } from "react";
import { FileText, ArrowUpRight } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { CatalogueRequestForm } from "@/components/forms/CatalogueRequestForm";

interface PdfCardProps {
  url: string;
  label?: string;
  image?: string;
}

export function PdfCard({ url, label = "View Full Catalogue" }: PdfCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    // Close the modal after the success message timeout finishes (configured to 5s in form)
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex flex-col items-center justify-center w-full h-full min-h-[300px] rounded-xl border border-dashed border-steel/30 hover:border-gold/40 transition-colors duration-300 bg-transparent text-left focus:outline-none"
      >
        <div className="flex flex-col items-center gap-3 text-center px-6 mx-auto">
          <span className="relative flex h-10 w-10 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            <FileText className="relative h-5 w-5 text-gold" />
          </span>
          <span className="text-sm font-semibold text-surface/60 group-hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-gold/30 group-hover:decoration-gold">
            {label}
          </span>
          <ArrowUpRight className="h-4 w-4 text-gold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
        </div>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Catalogue Access Request"
      >
        <div className="mb-6">
          <p className="text-sm text-white/80 leading-relaxed">
            Please enter your details to view/download the industrial catalogue PDF.
          </p>
        </div>
        <CatalogueRequestForm onSuccess={handleSuccess} pdfUrl={url} />
      </Modal>
    </>
  );
}
