"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import { Menu, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavDropdown } from "./NavDropdown";
import { MobileMenu } from "./MobileMenu";

const AskAIWidget = lazy(() =>
  import("@/components/shared/AskAIWidget").then((m) => ({ default: m.AskAIWidget })),
);

const navLinks = [
  { label: "Catalogue", href: "/catalogue" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          isScrolled
            ? "bg-navy-dark/95 backdrop-blur-md border-b border-steel/30 shadow-lg"
            : "bg-transparent",
        )}
      >
        <nav
          className="container-base flex items-center justify-between h-16 md:h-18"
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="VERTACORE — Home"
          >
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-gold flex items-center justify-center flex-shrink-0">
                <span className="text-navy font-black text-xs tracking-tighter">VC</span>
              </div>
              <span className="font-bold text-[15px] tracking-[0.12em] text-surface group-hover:text-gold transition-colors uppercase">
                VERTACORE
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <NavDropdown isScrolled={isScrolled} />

            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors px-1 py-2",
                  isScrolled
                    ? "text-surface/80 hover:text-gold"
                    : "text-surface/90 hover:text-gold",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Ask AI button */}
            <button
              onClick={() => setAiOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 border border-gold/30 text-gold text-sm font-semibold px-3.5 py-2 rounded-lg hover:bg-gold/10 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ask AI
            </button>

            {/* RFQ CTA */}
            <Link
              href="/contact#rfq"
              className="hidden sm:inline-flex items-center gap-1.5 bg-gold text-navy text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gold-muted transition-colors"
            >
              Request a Quote
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-surface/80 hover:text-gold transition-colors rounded-lg hover:bg-navy-light/30"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Ask AI Widget */}
      {aiOpen && (
        <Suspense fallback={null}>
          <AskAIWidget isOpen={aiOpen} onClose={() => setAiOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
