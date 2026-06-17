"use client";

import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";

export interface TapLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  children: React.ReactNode;
}

export const TapLink = forwardRef<HTMLAnchorElement, TapLinkProps>(
  ({ children, onClick, onTouchStart, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        {...props}
        onClick={onClick}
        // This instantly enables CSS :active and group-active pseudo-classes on iOS Safari
        onTouchStart={(e) => {
          if (onTouchStart) onTouchStart(e);
        }}
      >
        {children}
      </Link>
    );
  }
);

TapLink.displayName = "TapLink";
