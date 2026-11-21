"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { services } from "@/data/services";
import { INDIAN_PHONE } from "@/lib/phone";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Input";

/** Quick-start form: captures the essentials, then continues on /book-appointment pre-filled. */
export function MiniBookingForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "Please enter your name";
    if (!INDIAN_PHONE.test(phone.trim())) errs.phone = "Enter a valid 10-digit mobile number";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const qs = new URLSearchParams({ name, phone, ...(service && { service }) });
    router.push(`/book-appointment?${qs.toString()}#booking-form`);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-3xl bg-card p-6 shadow-lift sm:p-7">
      <Field id="mini-name" label="Your name" required error={errors.name}>
        <Input id="mini-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} placeholder="Full name" />
      </Field>
      <Field id="mini-phone" label="Mobile number" required error={errors.phone}>
        <Input id="mini-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} placeholder="98765 43210" />
      </Field>
      <Field id="mini-service" label="Treatment">
        <Select id="mini-service" value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">Not sure — general consultation</option>
          {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
        </Select>
      </Field>
      <Button type="submit" variant="accent" size="lg" className="mt-1">
        Choose date &amp; time <ArrowRight size={18} aria-hidden="true" />
      </Button>
    </form>
  );
}
