"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowRight, Phone, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const [clickedHref, setClickedHref] = useState<string | null>(null);
  const [touchingHref, setTouchingHref] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

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
      const particleCount = Math.floor(w / 35);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.0,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1.5
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
        ctx.fillStyle = 'rgba(56, 189, 248, 1)';
        ctx.fill();

        let dxMouse = p.x - mouse.x;
        let dyMouse = p.y - mouse.y;
        let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(231, 200, 90, ${0.9 - distMouse / 150})`;
          ctx.lineWidth = 2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          p.x += dxMouse * 0.01;
          p.y += dyMouse * 0.01;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', init);
    // Use window instead of canvas for mobile touch/mouse events so it tracks everywhere in the menu
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleEsc);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

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
        {/* Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-100"
        />

        {/* Content wrapper to stay above canvas */}
        <div className="relative z-10">
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
          {/* Mobile Top Utility Bar */}
          <div className="p-4 border-b border-steel/20 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gold font-bold">
              <Phone className="w-4 h-4" />
              <span>Call Us: +971 02 886 4430</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="https://maps.google.com/?q=Office+No.44,+11th+Floor,+Dar+Al+Salam+Building,+Liwa+Street,+Corniche,+Abu+Dhabi,+UAE"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-1.5 transition-colors",
                  (touchingHref === "location" || clickedHref === "location") ? "text-gold bg-navy-light/30" : "hover:text-gold hover:bg-navy-light/30"
                )}
                onTouchStart={() => setTouchingHref("location")}
                onTouchEnd={() => setTouchingHref(null)}
                onTouchCancel={() => setTouchingHref(null)}
                onClick={(e) => {
                  setClickedHref("location");
                  setTimeout(() => setClickedHref(null), 300);
                }}
              >
                <MapPin className="w-4 h-4" /> Location
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "flex items-center gap-1 text-sm font-semibold text-navy py-1 px-2 rounded transition-colors",
                  (touchingHref === "/contact-btn" || clickedHref === "/contact-btn") ? "bg-gold/90" : "bg-gold"
                )}
                onTouchStart={() => setTouchingHref("/contact-btn")}
                onTouchEnd={() => setTouchingHref(null)}
                onTouchCancel={() => setTouchingHref(null)}
                onClick={() => {
                  setClickedHref("/contact-btn");
                  setTimeout(() => {
                    onClose();
                    setClickedHref(null);
                  }, 200);
                }}
              >
                Enquire Now
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>

          {/* Nav */}
          <nav className="p-4 space-y-1">
            {/* Main nav items */}
            {navItems.map((item) => {
              const isActive = item.label === "Home" ? pathname === "/" : pathname.startsWith(item.href);
              const isInteracting = touchingHref === item.href || clickedHref === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative block px-4 py-4 rounded-lg overflow-hidden transition-all duration-300 border-b border-steel/10 last:border-b-0",
                    isActive || isInteracting ? "text-gold bg-white/5" : "text-surface/80 hover:bg-white/5"
                  )}
                  onTouchStart={() => setTouchingHref(item.href)}
                  onTouchEnd={() => setTouchingHref(null)}
                  onTouchCancel={() => setTouchingHref(null)}
                  onClick={() => {
                    setClickedHref(item.href);
                    setTimeout(() => {
                      onClose();
                      setClickedHref(null);
                    }, 300);
                  }}
                >
                  {/* Click Flash Effect */}
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className={cn(
                      "absolute w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(255,215,0,0.3)_0%,transparent_70%)] opacity-0 scale-50 transition-all duration-300 ease-out",
                      isInteracting ? "opacity-100 scale-100" : ""
                    )} />
                  </span>

                  {/* Background animation on touch/hover */}
                  <span className={cn(
                    "absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] transition-transform duration-700 ease-in-out",
                    isInteracting ? "translate-x-[100%]" : ""
                  )} />

                  <span className={cn(
                    "relative z-10 flex items-center justify-between transition-all duration-300",
                    isInteracting ? "scale-[1.02] px-2" : ""
                  )}>
                    <span className="flex items-center gap-2 font-bold text-[15px]">
                      {item.label}
                    </span>
                    {item.label !== "Home" && (
                      <ChevronRight className={cn(
                        "h-5 w-5 transition-all duration-300",
                        isInteracting ? "translate-x-1 scale-110 text-gold" : "opacity-40"
                      )} />
                    )}
                  </span>

                  {/* Bottom line animation */}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full origin-center transition-all duration-300 ease-out",
                    isActive || isInteracting
                      ? "h-[3px] bg-gold scale-x-100 shadow-[0_0_10px_rgba(255,215,0,0.5)]" 
                      : "h-[2px] bg-gold/50 scale-x-0"
                  )} />
                </Link>
              )
            })}

            <button
              onTouchStart={() => setTouchingHref("ai-assistant")}
              onTouchEnd={() => setTouchingHref(null)}
              onTouchCancel={() => setTouchingHref(null)}
              onClick={() => {
                setClickedHref("ai-assistant");
                setTimeout(() => {
                  onClose();
                  setClickedHref(null);
                  window.dispatchEvent(new CustomEvent('open-ai-chat'));
                }, 200);
              }}
              className={cn(
                "flex items-center justify-between w-full px-3 py-3 rounded-lg text-gold transition-colors text-sm font-medium mt-4",
                (touchingHref === "ai-assistant" || clickedHref === "ai-assistant") ? "bg-gold/10" : ""
              )}
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
              className={cn(
                "flex items-center justify-center gap-2 w-full text-navy font-semibold py-3 rounded-lg transition-colors",
                (touchingHref === "/catalogue-btn" || clickedHref === "/catalogue-btn") ? "bg-gold-muted" : "bg-gold"
              )}
              onTouchStart={() => setTouchingHref("/catalogue-btn")}
              onTouchEnd={() => setTouchingHref(null)}
              onTouchCancel={() => setTouchingHref(null)}
              onClick={() => {
                setClickedHref("/catalogue-btn");
                setTimeout(() => {
                  onClose();
                  setClickedHref(null);
                }, 200);
              }}
            >
              Browse Catalogue
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


