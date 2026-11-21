import { Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { SmartImage } from "@/components/ui/SmartImage";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/utils";

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure className={cn("relative flex h-full flex-col rounded-3xl border border-line bg-card p-6 shadow-soft sm:p-7", className)}>
      <Quote size={36} className="absolute right-6 top-6 text-mint/60" aria-hidden="true" />
      <StarRating value={t.rating} />
      <blockquote className="mt-4 flex-1 text-[0.9875rem] leading-relaxed text-ink">
        <p>&ldquo;{t.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface">
          <SmartImage src={t.image} alt="" fill sizes="48px" className="object-cover" />
        </span>
        <span>
          <span className="block font-semibold text-heading">{t.name}</span>
          <span className="block text-sm text-muted">{t.treatment} · {t.location}</span>
        </span>
      </figcaption>
    </figure>
  );
}
