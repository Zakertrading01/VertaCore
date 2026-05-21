"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
  { title: "Safety Systems", slug: "safety-systems" },
  { title: "Welding Systems", slug: "welding-systems" },
  { title: "Lifting & Rigging", slug: "lifting-rigging" },
  { title: "Abrasives", slug: "abrasives" },
  { title: "Industrial Tools", slug: "industrial-tools" },
];

const navItems = [
  { label: "Catalogue", href: "/catalogue" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Certifications", href: "/certifications" },
  { label: "Insights", href: "/insights" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-dark/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[320px] bg-graphite border-l border-steel/40 z-50 lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-steel/30">
          <span className="text-sm font-semibold text-surface/60 uppercase tracking-widest">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 text-surface/60 hover:text-gold transition-colors rounded-lg hover:bg-navy-light/30"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {/* Solutions accordion */}
          <div>
            <button
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-surface/80 hover:text-gold hover:bg-navy-light/30 transition-colors text-sm font-medium"
            >
              Solutions
              {solutionsOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {solutionsOpen && (
              <div className="ml-3 mt-1 space-y-0.5 border-l border-gold/20 pl-3">
                {solutions.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
                    className="block px-3 py-2.5 text-sm text-surface/70 hover:text-gold transition-colors rounded-md hover:bg-navy-light/20"
                    onClick={onClose}
                  >
                    {s.title}
                  </Link>
                ))}
                <Link
                  href="/solutions"
                  className="block px-3 py-2.5 text-xs text-gold font-medium hover:text-gold-muted transition-colors"
                  onClick={onClose}
                >
                  View All →
                </Link>
              </div>
            )}
          </div>

          {/* Other nav items */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-3 rounded-lg text-surface/80 hover:text-gold hover:bg-navy-light/30 transition-colors text-sm font-medium"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}

          {/* Ask AI (Mobile) */}
          <button
            onClick={() => {
              onClose();
              // We need a way to open the AI widget from here. 
              // Since Navbar handles the state, we might need a custom event or shared state.
              // For now, let's assume the user can click it in the navbar if they are on tablet+ 
              // or we provide a direct link/action if possible.
              window.dispatchEvent(new CustomEvent('open-ai-chat'));
            }}
            className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-gold hover:bg-gold/10 transition-colors text-sm font-medium"
          >
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              Ask AI Assistant
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </nav>

        <div className="p-4 mt-2">
          <Link
            href="/catalogue"
            className="flex items-center justify-center gap-2 w-full bg-gold text-navy font-semibold py-3 rounded-lg hover:bg-gold-muted transition-colors"
            onClick={onClose}
          >
            Browse Catalogue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
