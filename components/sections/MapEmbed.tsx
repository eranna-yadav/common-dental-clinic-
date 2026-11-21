"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/** Google Map iframe that only loads when scrolled near — keeps initial page load fast. No API key required. */
export function MapEmbed({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setLoad(true), io.disconnect()), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsEmbedQuery)}&z=15&output=embed`;

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-3xl border border-line bg-surface ${className ?? ""}`}>
      {load ? (
        <iframe
          src={src}
          title={`Map showing ${site.name} in ${site.address.locality}, ${site.address.city}`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted">
          <MapPin size={32} className="text-primary" aria-hidden="true" />
          <span className="text-sm">Loading map…</span>
        </div>
      )}
    </div>
  );
}
