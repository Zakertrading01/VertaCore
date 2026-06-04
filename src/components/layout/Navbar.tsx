"use client";

import { useState, useEffect, lazy, Suspense, useRef } from "react";
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
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, vx: number, vy: number, size: number }[] = [];
    let animationFrameId: number;
    let w = 0;
    let h = 0;
    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      if (!canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
      particles = [];
      // For a thin navbar, use a low density so it's not cluttered ("rombaniraya varuthu")
      const particleCount = Math.floor(w / 35);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.0, // Moderate movement
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1.5 // Slightly larger for visibility
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 1)'; // Sky Blue particles (Dots)
        ctx.fill();

        let dxMouse = p.x - mouse.x;
        let dyMouse = p.y - mouse.y;
        let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(231, 200, 90, ${0.9 - distMouse / 150})`; // Bright Gold connections to mouse
          ctx.lineWidth = 2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          p.x += dxMouse * 0.01;
          p.y += dyMouse * 0.01;
        }

        // Removed particle-to-particle connecting lines as user requested "only dots matum"
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 shadow-md overflow-hidden",
          isScrolled
            ? "bg-[#0b1b33]/80 backdrop-blur-xl border-b border-white/10"
            : "bg-white/10 backdrop-blur-md border-b border-white/20"
        )}
      >
        {/* Particle Network Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[-1] opacity-100"
        />
        {/* Top Utility Bar (Dark Blue) */}
        <div className="bg-[#112240] text-[13px] py-1 px-4 md:px-8 hidden md:flex justify-between items-center text-white/90 border-b border-white/5">
          <div className="flex items-center gap-2 text-gold font-bold">
            <Phone className="w-4 h-4" />
            <span>Call Us: +971 XX XXX XXXX</span>
          </div>
          <div className="flex items-center gap-5 text-[14px] font-medium">
            <Link href="#footer" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <MapPin className="w-4 h-4" /> Locations
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/contact" className="flex items-center gap-1.5 bg-[#1a365d] px-3 py-1 rounded text-gold hover:bg-[#234575] transition-colors font-bold text-xs">
              <span className="text-base leading-none">+</span> Enquire Now
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
              className="h-9 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links (Stretch evenly across white space) */}
          <nav className="hidden lg:flex flex-1 items-stretch" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex flex-1 items-center justify-center gap-2 text-[15px] md:text-[16px] font-bold transition-all duration-300 border-r last:border-r-0 overflow-hidden",
                  "active:bg-white/5 active:duration-100", // Fast background response on click
                  isScrolled ? "text-white hover:text-gold border-white/10 hover:bg-white/5" : "text-white hover:text-gold border-white/20 hover:bg-white/10"
                )}
              >
                {/* Click Flash Effect */}
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(255,215,0,0.3)_0%,transparent_70%)] opacity-0 group-active:opacity-100 scale-50 group-active:scale-100 transition-all duration-300 ease-out" />
                </span>

                {/* Background animation on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                <span className="relative z-10 flex items-center gap-2 group-hover:scale-110 group-active:scale-90 group-active:text-white transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)">
                  {item.label}
                  {item.label !== "Home" && (
                    <ChevronRight className={cn(
                      "h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-active:translate-x-3 group-active:scale-125 group-active:text-gold",
                      isScrolled ? "opacity-40" : "opacity-60"
                    )} />
                  )}
                </span>

                {/* Bottom line animation */}
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gold scale-x-0 group-hover:scale-x-100 origin-center transition-all duration-300 ease-out group-active:bg-white group-active:shadow-[0_0_15px_rgba(255,255,255,1)] group-active:h-[6px]" />
              </Link>
            ))}
          </nav>

          {/* Right Actions Block (Mobile Menu & Ask AI) */}
          <div className={cn(
            "flex items-center gap-4 px-6 border-l transition-colors duration-500 ml-auto",
            isScrolled ? "border-white/10 bg-transparent" : "border-white/20 bg-transparent"
          )}>
            {/* Ask AI button */}
            {aiEnabled && (
              <button
                onClick={() => setAiOpen(true)}
                className="hidden md:flex items-center gap-2 border border-gold text-white font-bold px-4 py-1.5 rounded-lg hover:bg-gold/20 transition-all duration-300 text-sm group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gold/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <Sparkles className="h-4 w-4 text-gold relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Ask AI</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-white hover:text-gold hover:bg-white/10 transition-all duration-300 rounded-lg group"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
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
