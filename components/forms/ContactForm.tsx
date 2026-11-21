"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { contactSchema, fieldErrors, type ContactInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, Input, Textarea } from "@/components/ui/Input";

const empty: ContactInput = { name: "", phone: "", email: "", subject: "", message: "", website: "" };

export function ContactForm() {
  const [v, setV] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  const set = (k: keyof ContactInput, val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(v);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      document.getElementById(`contact-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || "Something went wrong.");
      }
      setStatus("sent");
      trackEvent("contact_submitted");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-success/30 bg-card p-8 text-center">
        <CheckCircle2 size={40} className="mx-auto text-success" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">Thank you, {v.name.split(" ")[0]}!</h2>
        <p className="mt-2 text-muted">We&apos;ve received your message and will reply within one working day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot value={v.website ?? ""} onChange={(x) => set("website", x)} />
      <Field id="contact-name" label="Full name" required error={errors.name}>
        <Input id="contact-name" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
      </Field>
      <Field id="contact-phone" label="Mobile number" required error={errors.phone}>
        <Input id="contact-phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} />
      </Field>
      <Field id="contact-email" label="Email" required error={errors.email}>
        <Input id="contact-email" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
      </Field>
      <Field id="contact-subject" label="Subject" required error={errors.subject}>
        <Input id="contact-subject" value={v.subject} onChange={(e) => set("subject", e.target.value)} error={errors.subject} />
      </Field>
      <Field id="contact-message" label="Message" required error={errors.message} className="sm:col-span-2">
        <Textarea id="contact-message" rows={5} value={v.message} onChange={(e) => set("message", e.target.value)} error={errors.message} />
      </Field>
      {status === "error" && <p role="alert" className="text-sm font-medium text-error sm:col-span-2">{msg}</p>}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
