"use client";

import { AnimatePresence, m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { question: string; answer: React.ReactNode };

export function Accordion({ items, defaultOpen = 0, className }: { items: Item[]; defaultOpen?: number | null; className?: string }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  return (
    <div className={cn("divide-y divide-line overflow-hidden rounded-3xl border border-line bg-card shadow-soft", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${id}-btn-${i}`;
        const panelId = `${id}-panel-${i}`;
        return (
          <div key={item.question}>
            <h3 className="font-sans text-base">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-heading transition-colors hover:bg-surface/60 sm:px-6"
              >
                <span>{item.question}</span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 dark:bg-mint/10 dark:text-mint",
                    isOpen && "rotate-180 bg-primary text-white dark:bg-mint dark:text-navy",
                  )}
                >
                  <ChevronDown size={18} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 leading-relaxed text-ink sm:px-6">{item.answer}</div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
