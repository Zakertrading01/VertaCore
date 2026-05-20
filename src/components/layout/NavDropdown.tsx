"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Shield, Flame, Link2, Disc, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
  {
    title: "Safety Systems",
    slug: "safety-systems",
    description: "PPE and certified safety equipment",
    icon: Shield,
  },
  {
    title: "Welding Systems",
    slug: "welding-systems",
    description: "SMAW, MIG/MAG, TIG, SAW",
    icon: Flame,
  },
  {
    title: "Lifting & Rigging",
    slug: "lifting-rigging",
    description: "Chain hoists, wire rope, shackles",
    icon: Link2,
  },
  {
    title: "Abrasives",
    slug: "abrasives",
    description: "Grinding, cutting, surface treatment",
    icon: Disc,
  },
  {
    title: "Industrial Tools",
    slug: "industrial-tools",
    description: "Hand tools, power tools, measurement",
    icon: Wrench,
  },
];

interface NavDropdownProps {
  isScrolled: boolean;
}

export function NavDropdown({ isScrolled }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors px-1 py-2",
          isScrolled ? "text-surface/80 hover:text-gold" : "text-surface/90 hover:text-gold",
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Solutions
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[480px] bg-graphite border border-steel/40 rounded-xl shadow-2xl overflow-hidden z-50"
          role="menu"
        >
          <div className="p-3 grid grid-cols-2 gap-1">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-navy-light/60 transition-colors group"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mt-0.5 p-2 rounded-md bg-navy-light/40 group-hover:bg-gold/10 transition-colors flex-shrink-0">
                    <Icon className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-surface group-hover:text-gold transition-colors">
                      {solution.title}
                    </div>
                    <div className="text-xs text-steel-muted mt-0.5">
                      {solution.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="border-t border-steel/30 px-3 py-2.5">
            <Link
              href="/solutions"
              className="text-xs text-gold hover:text-gold-muted font-medium flex items-center gap-1 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              View All Solutions →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
