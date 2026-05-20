"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold mb-4">
          Error
        </p>
        <h1 className="text-dlg font-bold text-surface mb-4 tracking-tight">
          Something went wrong.
        </h1>
        <p className="text-body text-surface/50 mb-8 leading-relaxed">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-6 py-3 rounded-lg hover:bg-gold-muted transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-steel/40 text-surface/70 font-medium px-6 py-3 rounded-lg hover:border-gold/40 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
