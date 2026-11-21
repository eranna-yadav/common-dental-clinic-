"use client";

import { MoveHorizontal } from "lucide-react";
import { useId, useState } from "react";
import type { SmileCase } from "@/data/gallery";
import { SmartImage } from "@/components/ui/SmartImage";
import { SmileIllustration } from "@/components/ui/SmileIllustration";
import { cn } from "@/lib/utils";

function Layer({ item, which }: { item: SmileCase; which: "before" | "after" }) {
  const img = which === "before" ? item.beforeImage : item.afterImage;
  const label = `${which === "before" ? "Before" : "After"} ${item.treatment.toLowerCase()}: ${item.title}`;
  return img ? (
    <SmartImage src={img} alt={label} fill sizes="(min-width: 1024px) 600px, 92vw" className="object-cover" />
  ) : (
    <SmileIllustration variant={which === "before" ? item.before : item.after} title={label} uid={`${item.id}-${which}`} className="h-full w-full" />
  );
}

/**
 * Drag-to-compare slider. A full-size, transparent native range input sits on
 * top, giving mouse, touch AND keyboard (arrow keys) support for free.
 */
export function BeforeAfterSlider({ item, className }: { item: SmileCase; className?: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <figure className={cn("overflow-hidden rounded-3xl border border-line bg-card shadow-soft", className)}>
      <div className="relative aspect-[5/3] select-none overflow-hidden bg-surface">
        <div className="absolute inset-0"><Layer item={item} which="after" /></div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Layer item={item} which="before" />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">After</span>

        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgb(0_0_0/0.35)]" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-lift">
            <MoveHorizontal size={20} />
          </span>
        </div>

        <label htmlFor={id} className="sr-only">Drag to compare before and after: {item.title}</label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-valuetext={`${pos}% before image shown`}
          className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <div className="pointer-events-none absolute inset-0 rounded-t-3xl ring-inset peer-focus-visible:ring-4 peer-focus-visible:ring-mint" aria-hidden="true" />
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 p-5">
        <div>
          <p className="font-display font-bold text-heading">{item.title}</p>
          <p className="text-sm text-muted">{item.treatment} · {item.duration}</p>
        </div>
      </figcaption>
    </figure>
  );
}
