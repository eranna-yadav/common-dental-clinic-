"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fmt = (v: number) => v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (reduce) {
      el.textContent = fmt(to);
      return;
    }
    const controls = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => (el.textContent = fmt(v)) });
    return () => controls.stop();
  }, [inView, to, decimals, suffix]);

  // Final value is rendered on the server so crawlers / no-JS users see real numbers.
  return (
    <span ref={ref} className="tabular-nums">
      {to.toLocaleString("en-IN", { minimumFractionDigits: decimals }) + suffix}
    </span>
  );
}

const stats = [
  { to: site.stats.happyPatients, suffix: "+", label: "Patients treated" },
  { to: site.stats.yearsExperience, suffix: "+", label: "Years of care" },
  { to: site.stats.procedures, suffix: "+", label: "Procedures performed" },
  { to: site.stats.rating, decimals: 1, suffix: "★", label: "Average Google rating" },
];

export function Counters() {
  return (
    <section aria-label="Clinic in numbers" className="relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(15_118_110/0.5),transparent_60%)]" />
      <Container className="relative">
        <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-2 text-sm font-medium text-mint">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
