"use client";

import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** Anchor that fires an analytics event on click (call / WhatsApp / directions). */
export function TrackedLink({
  event,
  params,
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { event: AnalyticsEvent; params?: Record<string, string>; href: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
      onClick={(e) => {
        trackEvent(event, params);
        props.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
