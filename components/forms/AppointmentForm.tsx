"use client";

import { AnimatePresence, m } from "framer-motion";
import { CalendarCheck, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { services } from "@/data/services";
import { availableSlots, parseISODate } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";
import { site, whatsappLink } from "@/lib/site";
import { appointmentSchema, fieldErrors, type AppointmentInput } from "@/lib/validation";
import { cn, formatTime12 } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, Input, Select, Textarea } from "@/components/ui/Input";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { DatePicker } from "./DatePicker";

type Status = "idle" | "submitting" | "success" | "error";

const empty: AppointmentInput = { name: "", phone: "", email: "", date: "", time: "", service: "", message: "", website: "" };

function whatsappMessage(v: AppointmentInput) {
  const svc = services.find((s) => s.slug === v.service)?.title ?? (v.service || "Consultation");
  const when = v.date ? `${parseISODate(v.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}${v.time ? ` at ${formatTime12(v.time)}` : ""}` : "your earliest available slot";
  return [
    `Hello ${site.shortName}, I'd like to book an appointment.`,
    `Name: ${v.name || "-"}`,
    `Phone: ${v.phone || "-"}`,
    `Treatment: ${svc}`,
    `Preferred: ${when}`,
    v.message ? `Note: ${v.message}` : "",
  ].filter(Boolean).join("\n");
}

export function AppointmentForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<AppointmentInput>(() => ({
    ...empty,
    name: params.get("name") ?? "",
    phone: params.get("phone") ?? "",
    service: services.some((s) => s.slug === params.get("service")) || params.get("service") === "consultation" ? params.get("service")! : "",
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  const slots = useMemo(() => (values.date ? availableSlots(values.date) : []), [values.date]);

  const set = <K extends keyof AppointmentInput>(k: K, v: AppointmentInput[K]) => {
    setValues((prev) => ({ ...prev, [k]: v, ...(k === "date" && { time: "" }) }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = appointmentSchema.safeParse(values);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`appt-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerMsg("");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || "We couldn't send your request.");
      }
      setStatus("success");
      trackEvent("appointment_submitted", { service: values.service });
      window.scrollTo({ top: (document.getElementById("booking-form")?.offsetTop ?? 200) - 120, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setServerMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <m.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} role="status" aria-live="polite" className="rounded-3xl border border-success/30 bg-card p-8 text-center shadow-soft">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 size={34} aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-extrabold">Request received, {values.name.split(" ")[0]}!</h2>
        <p className="mx-auto mt-3 max-w-md text-ink">
          We&apos;ve noted your preferred slot on{" "}
          <strong>{parseISODate(values.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} at {formatTime12(values.time)}</strong>.
          Our team will call you within 2 working hours to confirm.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={whatsappLink(whatsappMessage(values))} variant="secondary" onClick={() => trackEvent("whatsapp_click", { location: "booking_success" })}>
            <WhatsAppIcon size={18} /> Also send on WhatsApp
          </Button>
          <Button variant="ghost" onClick={() => { setValues(empty); setStatus("idle"); }}>
            <RotateCcw size={16} aria-hidden="true" /> Book another
          </Button>
        </div>
      </m.div>
    );
  }

  return (
    <form id="booking-form" onSubmit={onSubmit} noValidate className="relative space-y-6" aria-describedby="booking-required-note">
      <p id="booking-required-note" className="text-sm text-muted">Fields marked <span className="text-error">*</span> are required.</p>
      <Honeypot value={values.website ?? ""} onChange={(v) => set("website", v)} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="appt-name" label="Full name" required error={errors.name}>
          <Input id="appt-name" name="name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} error={errors.name} placeholder="e.g. Priya Sharma" />
        </Field>
        <Field id="appt-phone" label="Mobile number" required error={errors.phone} hint="10-digit Indian mobile number">
          <Input id="appt-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} hint="10-digit Indian mobile number" placeholder="98765 43210" />
        </Field>
        <Field id="appt-email" label="Email (optional)" error={errors.email}>
          <Input id="appt-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} placeholder="you@example.com" />
        </Field>
        <Field id="appt-service" label="Treatment" required error={errors.service}>
          <Select id="appt-service" name="service" value={values.service} onChange={(e) => set("service", e.target.value)} error={errors.service}>
            <option value="">Select a treatment…</option>
            <option value="consultation">General consultation / not sure</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </Select>
        </Field>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-1.5">
          <p className="text-sm font-semibold text-heading" id="appt-date-label">Preferred date <span className="text-error" aria-hidden="true">*</span></p>
          <DatePicker id="appt-date" value={values.date} onChange={(v) => set("date", v)} invalid={!!errors.date} describedBy={errors.date ? "appt-date-error" : undefined} />
          {errors.date && <p id="appt-date-error" role="alert" className="text-sm font-medium text-error">{errors.date}</p>}
        </div>

        <fieldset className="space-y-1.5" aria-describedby={errors.time ? "appt-time-error" : undefined}>
          <legend className="text-sm font-semibold text-heading">Preferred time <span className="text-error" aria-hidden="true">*</span></legend>
          {!values.date ? (
            <p className="rounded-2xl border border-dashed border-line bg-surface/50 p-6 text-center text-sm text-muted">Pick a date to see available times.</p>
          ) : slots.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted">No slots left today — please choose another date.</p>
          ) : (
            <div id="appt-time" tabIndex={-1} className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
              {slots.map((s) => (
                <label key={s} className={cn(
                  "cursor-pointer rounded-xl border px-2 py-2.5 text-center text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary",
                  values.time === s ? "border-primary bg-primary text-white" : "border-line bg-card text-heading hover:border-primary/50",
                )}>
                  <input type="radio" name="time" value={s} checked={values.time === s} onChange={() => set("time", s)} className="sr-only" />
                  {formatTime12(s)}
                </label>
              ))}
            </div>
          )}
          {errors.time && <p id="appt-time-error" role="alert" className="text-sm font-medium text-error">{errors.time}</p>}
        </fieldset>
      </div>

      <Field id="appt-message" label="Anything we should know? (optional)" error={errors.message}>
        <Textarea id="appt-message" name="message" value={values.message} onChange={(e) => set("message", e.target.value)} error={errors.message} placeholder="e.g. pain in lower right tooth since 3 days, nervous patient…" />
      </Field>

      <AnimatePresence>
        {status === "error" && (
          <m.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="rounded-2xl border border-error/30 bg-error/5 p-4 text-sm text-heading">
            <strong className="text-error">{serverMsg}</strong> Please try again, call us on {site.phone.display}, or send your request on WhatsApp below.
          </m.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="accent" size="lg" disabled={status === "submitting"} className="sm:flex-1">
          {status === "submitting" ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <CalendarCheck size={18} aria-hidden="true" />}
          {status === "submitting" ? "Sending…" : "Request appointment"}
        </Button>
        <Button
          href={whatsappLink(whatsappMessage(values))}
          variant="secondary"
          size="lg"
          onClick={() => trackEvent("whatsapp_click", { location: "booking_form" })}
        >
          <WhatsAppIcon size={18} /> Send via WhatsApp
        </Button>
      </div>
      <p className="text-xs text-muted">
        By submitting, you agree to be contacted about your appointment. We never share your details. See our <a href="/privacy-policy" className="link">privacy policy</a>.
      </p>
    </form>
  );
}
