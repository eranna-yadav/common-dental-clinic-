"use client";

import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent } from "./CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Vercel Analytics (cookieless) always; GA4 only after cookie consent. */
export function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(readConsent() === "accepted");
    const onChange = (e: Event) => setConsented((e as CustomEvent).detail === "accepted");
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return (
    <>
      {/* Only on Vercel deployments (the script 404s elsewhere) */}
      {process.env.NEXT_PUBLIC_VERCEL_ENV && <VercelAnalytics />}
      {GA_ID && consented && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
