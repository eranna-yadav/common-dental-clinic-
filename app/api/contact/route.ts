import { NextResponse } from "next/server";
import { renderTable, sendClinicEmail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { contactSchema, fieldErrors } from "@/lib/validation";

export async function POST(req: Request) {
  const limit = rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    if (errors.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ message: "Please check the highlighted fields.", errors }, { status: 422 });
  }
  const d = parsed.data;
  const { html, text } = renderTable("New website enquiry", [
    ["Name", d.name], ["Phone", d.phone], ["Email", d.email], ["Subject", d.subject], ["Message", d.message],
  ]);
  try {
    const { delivered } = await sendClinicEmail({ subject: `Enquiry: ${d.subject}`, html, text, replyTo: d.email });
    return NextResponse.json({ ok: true, delivered });
  } catch {
    return NextResponse.json({ message: "We couldn't send your message right now." }, { status: 502 });
  }
}
