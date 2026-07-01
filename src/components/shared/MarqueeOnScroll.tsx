"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MarqueeOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function MarqueeOnScroll({ children, className }: MarqueeOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When it comes into view for the first time, start the animation
        if (entry.isIntersecting) {
          setHasScrolledIn(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0,
        rootMargin: "-100px 0px"
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // Add animate-marquee dynamically so it starts exactly when seen
      className={cn(
        className,
        hasScrolledIn ? "animate-marquee" : "translate-x-0"
      )}
    >
      {children}
    </div>
  );
}
