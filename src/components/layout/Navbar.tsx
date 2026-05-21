"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import { Menu, Phone, MapPin, Mail, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const AskAIWidget = lazy(() =>
  import("@/components/shared/AskAIWidget").then((m) => ({ default: m.AskAIWidget })),
);

// Main nav links (logo row)
const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "Solutions", href: "/solutions" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "About", href: "/about" },
  { label: "Brands", href: "/brands" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);

  useEffect(() => {
    fetch("/api/chat/questions")
      .then((r) => r.json())
      .then((data) => setAiEnabled(data.enabled || data.questions?.length > 0))
      .catch(() => { });
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenAI = () => setAiOpen(true);
    window.addEventListener('open-ai-chat', handleOpenAI);
    return () => window.removeEventListener('open-ai-chat', handleOpenAI);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300 shadow-md",
          "bg-white" // The main bar is white
        )}
      >
        {/* Top Utility Bar (Dark Blue) */}
        <div className="bg-[#112240] text-[13px] py-1 px-4 md:px-8 hidden md:flex justify-between items-center text-white/90 border-b border-white/5">
          <div className="flex items-center gap-2 text-gold font-bold">
            <Phone className="w-4 h-4" />
            <span>Call Us: +1-855-VERTACORE</span>
          </div>
          <div className="flex items-center gap-5 text-[14px] font-medium">
            <Link href="/#locations" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <MapPin className="w-4 h-4" /> Locations
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/contact" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail className="w-4 h-4" /> Contact Us
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/contact" className="flex items-center gap-1.5 bg-[#1a365d] px-3 py-1 rounded text-gold hover:bg-[#234575] transition-colors font-bold text-xs">
              <span className="text-base leading-none">+</span> Special Offers
            </Link>
          </div>
        </div>

        {/* Main Navigation Bar (White Background) */}
        <div className="flex items-stretch h-[54px] md:h-[60px] px-0">

          {/* Logo Block (Dark Blue Background) */}
          <Link
            href="/"
            className="bg-[#0b1b33] flex items-center justify-center px-6 md:px-10 group"
            aria-label="VERTACORE — Home"
          >
            <img
              src="/image.png"
              alt="VERTACORE"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links (Stretch evenly across white space) */}
          <nav className="hidden lg:flex flex-1 items-stretch" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-1 items-center justify-center gap-2 text-[15px] md:text-[16px] font-bold text-navy hover:text-gold hover:bg-navy-dark active:bg-navy-dark transition-all duration-200 border-r border-gray-100 last:border-r-0"
              >
                {item.label}
                {item.label !== "Home" && (
                  <ChevronRight className="h-4 w-4 opacity-40" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions Block (Mobile Menu & Ask AI) */}
          <div className="flex items-center gap-4 px-6 border-l border-gray-100 bg-white">
            {/* Ask AI button */}
            {aiEnabled && (
              <button
                onClick={() => setAiOpen(true)}
                className="hidden md:flex items-center gap-2 border border-gold text-navy font-bold px-4 py-1.5 rounded-lg hover:bg-gold/10 transition-colors text-sm"
              >
                <Sparkles className="h-4 w-4 text-gold" />
                Ask AI
              </button>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-navy hover:text-gold transition-colors rounded-lg"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Suspense fallback={null}>
        <AskAIWidget isOpen={aiOpen} onClose={() => setAiOpen(false)} />
      </Suspense>
    </>
  );
}
