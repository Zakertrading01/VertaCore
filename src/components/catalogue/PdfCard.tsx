"use client";

import { FileText, ArrowUpRight } from "lucide-react";

interface PdfCardProps {
  onClick?: () => void;
  label?: string;
}

export function PdfCard({ onClick, label = "View Full Catalogue" }: PdfCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center justify-center w-full h-full min-h-[300px] rounded-xl border border-dashed border-steel/30 hover:border-gold/40 transition-colors duration-300 bg-transparent text-left focus:outline-none cursor-pointer"
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
  );
}
