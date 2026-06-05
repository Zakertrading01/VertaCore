"use client";

import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, forwardRef, useState } from "react";

export interface TapLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  children: React.ReactNode;
}

export const TapLink = forwardRef<HTMLAnchorElement, TapLinkProps>(
  ({ children, onClick, ...props }, ref) => {
    const [tapped, setTapped] = useState(false);

    return (
      <Link
        ref={ref}
        {...props}
        onClick={(e) => {
          // On mobile/touch devices, require a double tap to navigate.
          // First tap triggers hover/focus styles, second tap navigates.
          if (
            typeof window !== "undefined" &&
            window.matchMedia("(hover: none) and (pointer: coarse)").matches
          ) {
            if (!tapped) {
              e.preventDefault();
              setTapped(true);
              // Reset tapped state after a delay if they don't tap again
              setTimeout(() => setTapped(false), 2000);
            }
          }
          
          if (onClick) {
            onClick(e);
          }
        }}
        onBlur={() => setTapped(false)}
      >
        {children}
      </Link>
    );
  }
);

TapLink.displayName = "TapLink";
