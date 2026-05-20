import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatasheetLinkProps {
  url: string;
  className?: string;
}

export function DatasheetLink({ url, className }: DatasheetLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-steel-muted hover:text-gold transition-colors",
        className,
      )}
    >
      <FileText className="h-3.5 w-3.5" />
      Datasheet
    </a>
  );
}
