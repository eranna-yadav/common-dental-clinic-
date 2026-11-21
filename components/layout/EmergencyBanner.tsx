"use client";

import { Siren, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site, telLink } from "@/lib/site";
import { TrackedLink } from "./TrackedLink";

/** Toggle site-wide via `site.emergencyBanner.enabled`. Dismissal is remembered for the session. */
export function EmergencyBanner() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    try { setHidden(sessionStorage.getItem("emergency-dismissed") === "1"); } catch { setHidden(false); }
  }, []);
  if (!site.emergencyBanner.enabled || hidden) return null;

  return (
    <div className="relative bg-navy text-white">
      <div className="mx-auto flex max-w-content items-center gap-3 px-4 py-2 pr-12 text-sm sm:px-6 lg:px-8">
        <Siren size={16} className="hidden shrink-0 text-coral sm:block" aria-hidden="true" />
        <p className="flex-1 leading-snug">
          <span className="hidden md:inline">{site.emergencyBanner.message} </span>
          <span className="md:hidden">Dental emergency? Same-day care available. </span>
          <TrackedLink href={telLink(site.emergencyPhone.e164)} event="call_click" params={{ location: "emergency_banner" }} className="font-semibold text-mint underline underline-offset-4 hover:text-white">
            Call {site.emergencyPhone.display}
          </TrackedLink>
        </p>
        <button
          type="button"
          onClick={() => { setHidden(true); try { sessionStorage.setItem("emergency-dismissed", "1"); } catch {} }}
          aria-label="Dismiss emergency banner"
          className="absolute right-3 rounded-full p-1.5 text-slate-300 hover:bg-white/10 hover:text-white"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
