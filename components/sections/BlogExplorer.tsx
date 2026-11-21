"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { blogCategories, blogPosts } from "@/data/blog";
import { cn } from "@/lib/utils";
import { BlogCard } from "./BlogCard";

export function BlogExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return blogPosts.filter((p) => (cat === "All" || p.category === cat) && (!term || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(term)));
  }, [q, cat]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {["All", ...blogCategories].map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
              className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                cat === c ? "border-primary bg-primary text-white" : "border-line bg-card text-heading hover:border-primary/50")}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-xs">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input id="blog-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles"
            className="h-12 w-full rounded-full border border-line bg-card pl-11 pr-4 text-sm text-heading focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15" />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{list.length} articles found</p>
      {list.length ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <li key={p.slug}><BlogCard post={p} headingLevel="h2" /></li>)}
        </ul>
      ) : (
        <p className="rounded-3xl border border-dashed border-line p-12 text-center text-muted">No articles found. Try a different search.</p>
      )}
    </div>
  );
}
