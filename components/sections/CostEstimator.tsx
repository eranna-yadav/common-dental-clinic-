"use client";

import { Calculator, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Field, Select } from "@/components/ui/Input";
import { formatINR } from "@/lib/utils";

const perUnit = (unit?: string) => !!unit && /per (tooth|unit|implant)/.test(unit);

/** Interactive cost estimator: pick a treatment (and quantity) → see a price range. */
export function CostEstimator() {
  const [slug, setSlug] = useState(services[1].slug);
  const [qty, setQty] = useState(1);
  const s = services.find((x) => x.slug === slug)!;
  const multi = perUnit(s.priceUnit);
  const n = multi ? qty : 1;

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-line bg-card shadow-lift lg:grid-cols-2">
      <div className="p-6 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:text-mint"><Calculator size={22} aria-hidden="true" /></span>
        <h2 id="estimator-title" className="mt-4 text-2xl font-extrabold sm:text-3xl">Treatment cost estimator</h2>
        <p className="mt-2 text-muted">Get an instant ballpark. Your dentist will confirm the exact cost after examination.</p>
        <div className="mt-6 space-y-5">
          <Field id="est-service" label="Choose a treatment">
            <Select id="est-service" value={slug} onChange={(e) => { setSlug(e.target.value); setQty(1); }}>
              {services.map((x) => <option key={x.slug} value={x.slug}>{x.title}</option>)}
            </Select>
          </Field>
          {multi && (
            <div>
              <p id="qty-label" className="text-sm font-semibold text-heading">Number of teeth / units</p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-line p-1" role="group" aria-labelledby="qty-label">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface"><Minus size={16} aria-hidden="true" /></button>
                <output aria-live="polite" className="w-10 text-center font-display text-lg font-bold text-heading">{qty}</output>
                <button type="button" onClick={() => setQty((q) => Math.min(28, q + 1))} aria-label="Increase quantity" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface"><Plus size={16} aria-hidden="true" /></button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center bg-gradient-to-br from-primary to-navy p-6 text-white sm:p-10" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-widest text-mint">Estimated range</p>
        <p className="mt-2 font-display text-4xl font-extrabold text-white sm:text-5xl">
          {formatINR(s.priceFrom * n)} <span className="text-2xl text-white/70">–</span> {formatINR(s.priceTo * n)}
        </p>
        <p className="mt-2 text-sm text-white/80">{s.title}{s.priceUnit ? ` · ${s.priceUnit}` : ""}{multi && n > 1 ? ` × ${n}` : ""}</p>
        <ul className="mt-6 space-y-1.5 text-sm text-white/85">
          <li>• Duration: {s.duration}</li>
          <li>• Visits: {s.visits}</li>
          {s.priceFrom * n >= 15000 && <li>• 0% EMI from {formatINR(Math.round((s.priceFrom * n) / 12))}/month</li>}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/book-appointment?service=${s.slug}`} variant="accent">Book consultation</Button>
          <Button href={`/services/${s.slug}`} variant="outline-light">Treatment details</Button>
        </div>
      </div>
    </div>
  );
}
