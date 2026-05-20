export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold mb-4">
          404
        </p>
        <h1 className="text-dlg font-bold text-surface mb-4 tracking-tight">
          Page not found.
        </h1>
        <p className="text-body text-surface/50 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-6 py-3 rounded-lg hover:bg-gold-muted transition-colors"
          >
            Go Home
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-steel/40 text-surface/70 font-medium px-6 py-3 rounded-lg hover:border-gold/40 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
