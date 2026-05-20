const brandNames = [
  "3M", "Honeywell", "MSA Safety", "Petzfall", "Stanley", "DeWalt",
  "Lincoln Electric", "Miller", "ESAB", "Kito", "Yale", "Norton",
];

export function BrandsBand() {
  return (
    <section
      className="border-y border-steel/20 bg-navy py-6 overflow-hidden"
      aria-label="Our brand partners"
    >
      <div className="container-base mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-steel-muted text-center">
          Sourced from internationally recognised brands
        </p>
      </div>

      {/* Infinite scroll marquee — animations defined in globals.css */}
      <div className="relative flex overflow-x-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap py-2">
          {[...brandNames, ...brandNames].map((brand, i) => (
            <span
              key={i}
              className="text-sm font-semibold text-steel-muted/60 hover:text-steel-muted transition-colors flex-shrink-0"
            >
              {brand}
            </span>
          ))}
        </div>
        <div
          className="absolute top-0 flex gap-12 animate-marquee2 whitespace-nowrap py-2"
          aria-hidden="true"
        >
          {[...brandNames, ...brandNames].map((brand, i) => (
            <span
              key={i}
              className="text-sm font-semibold text-steel-muted/60 flex-shrink-0"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
