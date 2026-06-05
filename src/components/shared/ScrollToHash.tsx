"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const cleanHash = hash.split('#').pop();
        if (cleanHash) {
          const element = document.getElementById(cleanHash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    // Run on initial load
    const timeout = setTimeout(handleScroll, 100);

    // Run on subsequent hash changes
    window.addEventListener("hashchange", handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [pathname]);

  return null;
}
