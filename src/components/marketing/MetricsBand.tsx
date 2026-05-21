import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const metrics = [
  { end: 500, suffix: "+", label: "Products Supplied" },
  { end: 10, suffix: "+", label: "Industries Served" },
  { end: 30, suffix: "+", label: "Years Experience" },
  { end: 24, suffix: "hr", label: "Average Response Time" },
];

export function MetricsBand() {
  return (
    <section
      className="py-10 bg-gold"
      aria-label="Key metrics"
    >
      <div className="container-base">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
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
      </div>
    </section>
  );
}
