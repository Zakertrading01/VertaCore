"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/#hero" },
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
      if(e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
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

          {/* Nav */}
          <nav className="p-4 space-y-1">
            {/* Main nav items */}
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
                window.dispatchEvent(new CustomEvent('open-ai-chat'));
              }}
              className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-gold hover:bg-gold/10 transition-colors text-sm font-medium mt-4"
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
      </div>
    </>
  );
}


