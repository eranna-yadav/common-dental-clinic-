import { z } from "zod";
import { allSlots, isClinicOpenOn, isNotPast, parseISODate } from "./booking";

import { INDIAN_PHONE } from "./phone";

export { INDIAN_PHONE };

const name = z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long");
const phone = z.string().trim().regex(INDIAN_PHONE, "Enter a valid 10-digit Indian mobile number");
const email = z.string().trim().email("Enter a valid email address").max(120);
/** Honeypot — must stay empty. Real users never see this field. */
const honeypot = z.string().max(0, "Spam detected").optional().or(z.literal(""));

export const appointmentSchema = z.object({
  name,
  phone,
  email: email.optional().or(z.literal("")),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date")
    .refine((d) => isNotPast(parseISODate(d)), "Please choose a future date")
    .refine((d) => isClinicOpenOn(parseISODate(d)), "We're closed on Sundays — please choose another day"),
  time: z.string().refine((t) => allSlots().includes(t), "Please choose a time slot"),
  service: z.string().min(1, "Please select a treatment"),
  message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
  website: honeypot,
});
export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const contactSchema = z.object({
  name,
  phone,
  email,
  subject: z.string().trim().min(2, "Please add a subject").max(120),
  message: z.string().trim().min(10, "Please write at least a few words").max(2000),
  website: honeypot,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email,
  website: honeypot,
});

/** Flattens Zod errors into { field: firstMessage } */
export function fieldErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const k = String(issue.path[0] ?? "form");
    if (!out[k]) out[k] = issue.message;
  }
  return out;
}
