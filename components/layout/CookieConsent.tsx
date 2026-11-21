"use client";

import { AnimatePresence, m } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export type Consent = "accepted" | "rejected";
export const CONSENT_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent-change";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setVisible(readConsent() === null), 1200);
    return () => clearTimeout(id);
  }, []);

  const choose = (v: Consent) => {
    try { localStorage.setItem(CONSENT_KEY, v); } catch {}
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          role="region"
          aria-label="Cookie consent"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="fixed inset-x-3 bottom-20 z-[60] mx-auto max-w-xl rounded-3xl border border-line bg-card p-5 shadow-lift md:bottom-6 md:left-6 md:right-auto"
        >
          <div className="flex gap-4">
            <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex dark:text-mint">
              <Cookie size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="font-display font-bold text-heading">We value your privacy</p>
              <p className="mt-1 text-sm text-ink">
                We use essential cookies to run this site and, with your permission, analytics cookies to improve it.{" "}
                <Link href="/cookie-policy" className="link">Cookie policy</Link>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" onClick={() => choose("accepted")}>Accept all</Button>
                <Button size="sm" variant="secondary" onClick={() => choose("rejected")}>Essential only</Button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
