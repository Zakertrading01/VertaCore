import { cn } from "@/lib/utils";

interface CertTagProps {
  tag: string;
  className?: string;
}

export function CertTag({ tag, className }: CertTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border",
        "bg-gold/8 border-gold/25 text-gold",
        className,
      )}
    >
      {tag}
    </span>
  );
}
