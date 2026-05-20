import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Breadcrumb } from "./Breadcrumb";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface PageHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  breadcrumb?: BreadcrumbItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function PageHeader({
  label,
  title,
  subtitle,
  coverImage,
  breadcrumb,
  ctaLabel,
  ctaHref,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-navy-dark min-h-[400px] flex items-end">
      {/* Background image */}
      {coverImage && (
        <>
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-dark/70" />
        </>
      )}

      {/* Gradient overlay always present */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/60 to-transparent" />

      {/* Content */}
      <div className="relative container-base w-full py-16 md:py-20 lg:py-24">
        {breadcrumb && breadcrumb.length > 0 && (
          <Breadcrumb items={breadcrumb} className="mb-6" />
        )}

        {label && (
          <div className="mb-4">
            <SectionLabel>{label}</SectionLabel>
          </div>
        )}

        <h1 className="text-dmd md:text-dlg font-bold text-surface max-w-3xl leading-tight tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-body text-surface/70 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {ctaLabel && ctaHref && (
          <div className="mt-8">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-gold text-navy font-semibold px-6 py-3 rounded-lg hover:bg-gold-muted transition-colors"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
