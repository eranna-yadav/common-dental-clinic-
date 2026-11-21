"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { MAX_BOOKING_DAYS_AHEAD, isClinicOpenOn, parseISODate, toISODate } from "@/lib/booking";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Accessible inline calendar. Past dates, Sundays (closed days) and dates
 * beyond the booking window are disabled. Arrow keys move focus (roving tabindex).
 */
export function DatePicker({
  id,
  value,
  onChange,
  invalid,
  describedBy,
}: {
  id: string;
  value: string;
  onChange: (iso: string) => void;
  invalid?: boolean;
  describedBy?: string;
}) {
  const today = useMemo(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }, []);
  const maxDate = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate() + MAX_BOOKING_DAYS_AHEAD), [today]);
  const selected = value ? parseISODate(value) : null;

  const [view, setView] = useState(() => {
    const base = selected ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [focusISO, setFocusISO] = useState(() => toISODate(selected ?? today));
  const grid = useRef<HTMLDivElement>(null);

  const isDisabled = (d: Date) => d < today || d > maxDate || !isClinicOpenOn(d);

  const days = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = Array(first.getDay()).fill(null);
    for (let d = 1; d <= count; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    while (cells.length % 7) cells.push(null);
    return cells;
  }, [view]);

  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = new Date(view.getFullYear(), view.getMonth() + 1, 1) <= maxDate;

  const moveFocus = (deltaDays: number) => {
    const cur = parseISODate(focusISO);
    const next = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + deltaDays);
    if (next < today || next > maxDate) return;
    setFocusISO(toISODate(next));
    if (next.getMonth() !== view.getMonth() || next.getFullYear() !== view.getFullYear()) {
      setView(new Date(next.getFullYear(), next.getMonth(), 1));
    }
    requestAnimationFrame(() => grid.current?.querySelector<HTMLButtonElement>(`[data-date="${toISODate(next)}"]`)?.focus());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in map) {
      e.preventDefault();
      moveFocus(map[e.key]);
    }
  };

  // Ensure exactly one focusable cell in view
  const focusInView = days.some((d) => d && toISODate(d) === focusISO);
  const firstEnabled = days.find((d) => d && !isDisabled(d));

  return (
    <div
      id={id}
      role="group"
      aria-label="Choose appointment date"
      aria-describedby={describedBy}
      className={cn("rounded-2xl border bg-card p-4", invalid ? "border-error" : "border-line")}
    >
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} disabled={!canPrev}
          aria-label="Previous month" className="rounded-full p-2 text-heading hover:bg-surface disabled:opacity-30">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <p className="font-display font-bold text-heading" aria-live="polite">
          {view.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        </p>
        <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} disabled={!canNext}
          aria-label="Next month" className="rounded-full p-2 text-heading hover:bg-surface disabled:opacity-30">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted" aria-hidden="true">
        {WEEKDAYS.map((d) => <span key={d} className="py-1">{d}</span>)}
      </div>

      <div ref={grid} className="mt-1 grid grid-cols-7 gap-1" onKeyDown={onKeyDown}>
        {days.map((d, i) => {
          if (!d) return <span key={`e${i}`} />;
          const iso = toISODate(d);
          const disabled = isDisabled(d);
          const isSel = value === iso;
          const isToday = iso === toISODate(today);
          const focusable = focusInView ? iso === focusISO : d === firstEnabled;
          return (
            <button
              key={iso}
              type="button"
              data-date={iso}
              disabled={disabled}
              tabIndex={focusable ? 0 : -1}
              aria-pressed={isSel}
              aria-label={`${d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}${disabled ? (d.getDay() === 0 ? " — closed" : " — unavailable") : ""}`}
              onClick={() => { onChange(iso); setFocusISO(iso); }}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-xl text-sm font-semibold transition-colors",
                disabled && "cursor-not-allowed text-muted/50 line-through decoration-1",
                !disabled && !isSel && "text-heading hover:bg-primary/10",
                isSel && "bg-primary text-white shadow-glow",
                isToday && !isSel && "ring-1 ring-primary/40",
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">Closed on Sundays. Book up to {MAX_BOOKING_DAYS_AHEAD} days ahead.</p>
    </div>
  );
}
