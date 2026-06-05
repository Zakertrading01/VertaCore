import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { CertTag } from "./CertTag";
import { DatasheetLink } from "./DatasheetLink";
import { resolveImageUrl } from "@/lib/image-utils";
import type { CatalogueItemCard as CatalogueItemCardType } from "@/types/db";

interface CatalogueItemCardProps extends CatalogueItemCardType {
  className?: string;
}

export function CatalogueItemCard({
  id,
  name,
  description,
  image,
  certTags,
  brandName,
  datasheetUrl,
}: CatalogueItemCardProps) {
  return (
    <article className="card-base flex flex-col overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-video bg-white overflow-hidden">
        {image ? (
          <Image
            src={resolveImageUrl(image) || image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="h-12 w-12 text-steel/40" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5">
        {brandName && (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gold/70 mb-0.5">
            {brandName}
          </p>
        )}

        <h3 className="text-[14px] font-semibold text-surface leading-snug mb-1 group-hover:!text-gold transition-colors duration-300">
          {name}
        </h3>

        {description && (
          <p className="text-xs text-steel-muted leading-relaxed mb-2 line-clamp-2 group-hover:!text-gold/80 transition-colors duration-300">
            {description}
          </p>
        )}

        {/* Cert tags */}
        {certTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3 mt-auto">
            {certTags.slice(0, 4).map((tag) => (
              <CertTag key={tag} tag={tag} />
            ))}
            {certTags.length > 4 && (
              <span className="text-[10px] text-steel-muted">
                +{certTags.length - 4} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-steel/20">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-steel-muted uppercase tracking-wider">
            <Package className="h-3 w-3" />
            Certified Supply
          </div>

          {datasheetUrl && <DatasheetLink url={datasheetUrl} />}
        </div>
      </div>
    </article>
  );
}
