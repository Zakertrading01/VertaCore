"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useIntersection<T extends Element>(
  options: UseIntersectionOptions = {},
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isIntersecting];
}
