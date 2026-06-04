import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const metrics = [
  { end: 1500, suffix: "+", label: "Products Supplied" },
  { end: 10, suffix: "+", label: "Industries Served" },
  { end: 30, suffix: "+", label: "Years Experience" },
  { end: 24, suffix: "hr", label: "Average Response Time" },
];

export function MetricsBand() {
  return (
    <section
      className="py-10 bg-gold relative overflow-hidden"
      aria-label="Key metrics"
    >
      <style>{`
        @keyframes metrics-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Fading Edges to hide scrolling elements */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gold to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gold to-transparent z-10 pointer-events-none" />

      <div 
        className="flex w-max items-center"
        style={{ animation: 'metrics-marquee 30s linear infinite' }}
      >
        {/* We repeat the metrics multiple times to ensure the marquee fills even ultra-wide screens seamlessly */}
        {[...metrics, ...metrics, ...metrics, ...metrics].map((metric, index) => (
          <div key={`${metric.label}-${index}`} className="text-center w-[250px] md:w-[350px] flex-shrink-0">
            <div className="text-dmd font-bold text-navy leading-none">
              <AnimatedCounter
                end={metric.end}
                suffix={metric.suffix}
                label={metric.label}
                className="[&>div:first-child]:text-navy [&>div:last-child]:text-navy/60"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
