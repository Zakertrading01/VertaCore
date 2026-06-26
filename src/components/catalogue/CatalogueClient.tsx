"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/shared/Modal";
import { CatalogueRequestForm } from "@/components/forms/CatalogueRequestForm";

export function CatalogueDownloadButton({ className, label = "Download PDF Catalogue" }: { className?: string; label?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                }}
                className={cn(
                    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-gold to-amber-500 px-6 py-3.5 text-sm font-bold text-navy shadow-[0_0_40px_-10px_rgba(234,179,8,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_-15px_rgba(234,179,8,0.6)]",
                    className
                )}
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] translate-x-[-150%] skew-x-[-30deg] transition-transform duration-700 ease-out group-hover:translate-x-[150%]"></div>
                <Download className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:scale-110 group-hover:-translate-y-0.5" />
                <span className="relative z-10">{label}</span>
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Catalogue Access Request"
            >
                <div className="mb-6">
                    <p className="text-sm text-white leading-relaxed">
                        Please provide your details to receive the full **VERTA CORE Industrial Equipment Catalogue**. A download link will be sent to your email within 24 business hours.
                    </p>
                </div>
                <CatalogueRequestForm onSuccess={() => setIsOpen(false)} />
            </Modal>
        </>
    );
}
