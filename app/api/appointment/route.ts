import { NextResponse } from "next/server";
import { services } from "@/data/services";
import { parseISODate } from "@/lib/booking";
import { renderTable, sendClinicEmail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { formatTime12 } from "@/lib/utils";
import { appointmentSchema, fieldErrors } from "@/lib/validation";

export async function POST(req: Request) {
  const limit = rateLimit(`appt:${clientIp(req)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many requests. Please try again in a few minutes or call us directly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    // Honeypot tripped: pretend success so bots learn nothing.
    if (errors.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ message: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const d = parsed.data;
  const service = d.service === "consultation" ? "General consultation" : services.find((s) => s.slug === d.service)?.title;
  if (!service) {
    return NextResponse.json({ message: "Please select a valid treatment.", errors: { service: "Please select a valid treatment" } }, { status: 422 });
  }

  const when = `${parseISODate(d.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} at ${formatTime12(d.time)}`;
  const { html, text } = renderTable("New appointment request", [
    ["Name", d.name],
    ["Phone", d.phone],
    ["Email", d.email || undefined],
    ["Treatment", service],
    ["Preferred slot", when],
    ["Message", d.message || undefined],
  ]);

  try {
    const { delivered } = await sendClinicEmail({ subject: `Appointment request: ${d.name} — ${when}`, html, text, replyTo: d.email || undefined });
    return NextResponse.json({ ok: true, delivered });
  } catch {
    return NextResponse.json({ message: "We couldn't send your request right now." }, { status: 502 });
  }
}
