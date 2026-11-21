"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { serviceCategories, services } from "@/data/services";
import { cn } from "@/lib/utils";
import { ServiceCard } from "./ServiceCard";

/** Searchable + filterable services grid. */
export function ServicesExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return services.filter(
      (s) =>
        (cat === "All" || s.category === cat) &&
        (!term || [s.title, s.summary, s.category, ...s.keywords, ...s.whoFor].join(" ").toLowerCase().includes(term)),
    );
  }, [q, cat]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="service-search" className="sr-only">Search treatments</label>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="service-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search e.g. 'toothache', 'gap', 'kids'"
            className="h-12 w-full rounded-full border border-line bg-card pl-11 pr-10 text-sm text-heading shadow-soft focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-heading">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
        <div role="group" aria-label="Filter by category" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
          {["All", ...serviceCategories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                cat === c ? "border-primary bg-primary text-white" : "border-line bg-card text-heading hover:border-primary/50",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{results.length} treatments found</p>
      {results.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => (
            <li key={s.slug}><ServiceCard service={s} showPrice headingLevel="h2" /></li>
          ))}
        </ul>
      ) : (
        <div className="rounded-3xl border border-dashed border-line p-12 text-center">
          <p className="font-semibold text-heading">No treatments match &ldquo;{q}&rdquo;.</p>
          <p className="mt-1 text-sm text-muted">Try another word, or call us — we&apos;re happy to advise.</p>
        </div>
      )}
    </div>
  );
}
