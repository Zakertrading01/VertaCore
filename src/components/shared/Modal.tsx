"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
        >
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-navy-dark/60 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Content */}
            <div
                className={cn(
                    "relative w-full max-w-lg bg-navy-light/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100",
                    className
                )}
            >
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    {title ? (
                        <h3 className="text-lg font-bold text-surface">{title}</h3>
                    ) : (
                        <div />
                    )}
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/5 transition-colors text-surface/60 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>,
        document.body
    );
}
