"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@/hooks/useIntersection";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersection<HTMLDivElement>({ once: true });
  // ref is RefObject<HTMLDivElement | null> — safe to use as div ref
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(end);
    };

    requestAnimationFrame(tick);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="text-dmd font-bold text-gold leading-none">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm text-surface/60 font-medium uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}
