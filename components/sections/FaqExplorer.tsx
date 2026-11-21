"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

const cats = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

export function FaqExplorer() {
  const [cat, setCat] = useState("All");
  const list = faqs.filter((f) => cat === "All" || f.category === cat);
  return (
    <div>
      <div role="group" aria-label="Filter questions by topic" className="mb-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              cat === c ? "border-primary bg-primary text-white" : "border-line bg-card text-heading hover:border-primary/50")}>
            {c}
          </button>
        ))}
      </div>
      <Accordion key={cat} items={list} />
    </div>
  );
}
