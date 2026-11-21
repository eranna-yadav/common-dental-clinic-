"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function NewsletterForm({ invert }: { invert?: boolean }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors?.email || data.message || "Something went wrong");
      setStatus("success");
      trackEvent("newsletter_signup");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className={cn("flex items-center gap-2 text-sm font-medium", invert ? "text-mint" : "text-success")}>
        <CheckCircle2 size={18} aria-hidden="true" /> You&apos;re subscribed — expect monthly smile tips!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative min-w-0">
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input tabIndex={-1} autoComplete="off" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <div className={cn("flex rounded-full border p-1 focus-within:ring-2 focus-within:ring-mint", invert ? "border-white/15 bg-white/5" : "border-line bg-card")}>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === "error" || undefined}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          className={cn("min-w-0 flex-1 bg-transparent px-4 text-sm focus:outline-none", invert ? "text-white placeholder:text-slate-400" : "text-heading placeholder:text-muted")}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex h-10 items-center gap-2 rounded-full bg-mint px-4 text-sm font-bold text-navy transition-colors hover:bg-white disabled:opacity-60"
        >
          {status === "loading" ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
          <span>Subscribe</span>
        </button>
      </div>
      {status === "error" && (
        <p id="newsletter-error" role="alert" className={cn("mt-2 text-sm", invert ? "text-coral" : "text-error")}>{error}</p>
      )}
    </form>
  );
}
