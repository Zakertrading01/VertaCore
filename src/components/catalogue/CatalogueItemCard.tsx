import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { CertTag } from "./CertTag";
import { DatasheetLink } from "./DatasheetLink";
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
      <div className="relative aspect-[4/3] bg-navy-light/30 overflow-hidden">
        {image ? (
          <Image
            src={image}
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
      <div className="flex flex-col flex-1 p-4">
        {brandName && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gold/70 mb-1">
            {brandName}
          </p>
        )}

        <h3 className="text-[15px] font-semibold text-surface leading-snug mb-1">
          {name}
        </h3>

        {description && (
          <p className="text-sm text-steel-muted leading-relaxed mb-3 line-clamp-2">
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

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-steel/20">
          <Link
            href={`/contact#rfq?item=${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-muted transition-colors"
          >
            Request a Quote
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {datasheetUrl && <DatasheetLink url={datasheetUrl} />}
        </div>
      </div>
    </article>
  );
}
