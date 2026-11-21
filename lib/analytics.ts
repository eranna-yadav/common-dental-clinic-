"use client";

import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | "appointment_submitted"
  | "call_click"
  | "whatsapp_click"
  | "directions_click"
  | "newsletter_signup"
  | "contact_submitted";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends an event to Vercel Analytics and GA4 (if loaded & consented). */
export function trackEvent(name: AnalyticsEvent, params: Record<string, string | number | boolean> = {}) {
  try {
    track(name, params);
    window.gtag?.("event", name, params);
  } catch {
    /* analytics must never break the UI */
  }
}
