import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1.5 flex-wrap", className)}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <ChevronRight
              className="h-3.5 w-3.5 text-steel-muted flex-shrink-0"
              aria-hidden="true"
            />
          )}
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-[13px] text-steel-muted hover:text-surface/80 transition-colors"
            >
              {item.name}
            </Link>
          ) : (
            <span
              className="text-[13px] text-surface/50"
              aria-current={i === items.length - 1 ? "page" : undefined}
            >
              {item.name}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
