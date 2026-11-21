"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUp, CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site, telLink, whatsappLink } from "@/lib/site";
import { t } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { TrackedLink } from "./TrackedLink";

/** Floating WhatsApp (desktop), back-to-top, and the sticky mobile bottom bar. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop/tablet floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 md:flex">
        <AnimatePresence>
          {showTop && (
            <m.button
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
              aria-label={t.common.backToTop}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-heading shadow-lift hover:text-primary"
            >
              <ArrowUp size={18} aria-hidden="true" />
            </m.button>
          )}
        </AnimatePresence>
        <TrackedLink
          href={whatsappLink()}
          event="whatsapp_click"
          params={{ location: "floating" }}
          aria-label={`Chat with us on WhatsApp (${site.whatsapp.display})`}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 motion-reduce:hidden" aria-hidden="true" />
          <WhatsAppIcon size={28} />
        </TrackedLink>
      </div>

      {/* Mobile sticky bottom bar */}
      <nav aria-label="Quick actions" className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 backdrop-blur md:hidden">
        <ul className="grid grid-cols-3">
          <li>
            <TrackedLink href={telLink()} event="call_click" params={{ location: "mobile_bar" }} className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-heading">
              <Phone size={20} className="text-primary dark:text-mint" aria-hidden="true" /> Call
            </TrackedLink>
          </li>
          <li>
            <TrackedLink href={whatsappLink()} event="whatsapp_click" params={{ location: "mobile_bar" }} className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-heading">
              <WhatsAppIcon size={20} className="text-[#1DA851]" /> WhatsApp
            </TrackedLink>
          </li>
          <li>
            <Link href="/book-appointment" className="m-1.5 flex flex-col items-center gap-1 rounded-2xl bg-coral py-1.5 text-xs font-bold text-navy">
              <CalendarCheck size={20} aria-hidden="true" /> Book
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
