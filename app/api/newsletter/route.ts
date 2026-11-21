import { NextResponse } from "next/server";
import { renderTable, sendClinicEmail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { fieldErrors, newsletterSchema } from "@/lib/validation";

/**
 * Newsletter sign-up. By default the clinic inbox is notified.
 * If RESEND_AUDIENCE_ID is set, the contact is also added to that Resend audience.
 */
export async function POST(req: Request) {
  const limit = rateLimit(`nl:${clientIp(req)}`, 3, 10 * 60 * 1000);
  if (!limit.ok) return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    if (errors.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ message: errors.email ?? "Invalid email", errors }, { status: 422 });
  }

  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (process.env.RESEND_API_KEY && audienceId) {
      const { Resend } = await import("resend");
      await new Resend(process.env.RESEND_API_KEY).contacts.create({ email: parsed.data.email, audienceId, unsubscribed: false });
    } else {
      const { html, text } = renderTable("New newsletter subscriber", [["Email", parsed.data.email]]);
      await sendClinicEmail({ subject: "New newsletter subscriber", html, text });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Subscription failed. Please try again." }, { status: 502 });
  }
}
