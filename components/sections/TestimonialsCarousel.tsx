"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { GoogleBadge } from "./GoogleBadge";
import { TestimonialCard } from "./TestimonialCard";

/** Scroll-snap carousel: native swipe on touch, buttons + dots for mouse/keyboard. No autoplay (WCAG 2.2.2). */
export function TestimonialsCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const el = track.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const w = (el.children[0] as HTMLElement)?.offsetWidth || 1;
      setIndex(Math.round(el.scrollLeft / (w + 24)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (d: number) => scrollTo(Math.max(0, Math.min(testimonials.length - 1, index + d)));

  return (
    <section className="section overflow-hidden" aria-labelledby="testimonials-title">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="testimonials-title"
            align="left"
            eyebrow="Patient stories"
            title="Loved by thousands of smiling patients"
            className="mb-0 sm:mb-0"
          />
          <GoogleBadge />
        </div>

        <div className="relative mt-10" role="region" aria-roledescription="carousel" aria-label="Patient testimonials">
          <ul ref={track} className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 sm:mx-0 sm:px-0">
            {testimonials.map((t, i) => (
              <li
                key={t.name}
                className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${testimonials.length}`}
              >
                <TestimonialCard t={t} />
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex gap-0.5" role="group" aria-label="Choose testimonial">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="flex h-6 min-w-6 items-center justify-center"
                >
                  <span className={cn("block h-2 rounded-full transition-all", i === index ? "w-7 bg-primary dark:bg-mint" : "w-2 bg-line hover:bg-muted")} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-heading transition-colors hover:border-primary hover:text-primary disabled:opacity-40">
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} disabled={index >= testimonials.length - 1} aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark disabled:opacity-40">
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
