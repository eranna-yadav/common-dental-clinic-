import "server-only";
import { Resend } from "resend";
import { site } from "./site";

type Mail = { subject: string; html: string; text: string; replyTo?: string };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Renders a simple, email-client-safe key/value table. */
export function renderTable(title: string, rows: [string, string | undefined][]) {
  const filtered = rows.filter(([, v]) => v);
  const html = `<div style="font-family:Arial,sans-serif;color:#334155">
  <h2 style="color:#0F766E;margin:0 0 16px">${escape(title)}</h2>
  <table cellpadding="8" style="border-collapse:collapse;border:1px solid #E2E8F0">
  ${filtered
    .map(([k, v]) => `<tr><td style="background:#EEF6F8;font-weight:bold;border:1px solid #E2E8F0">${escape(k)}</td><td style="border:1px solid #E2E8F0">${escape(v!)}</td></tr>`)
    .join("")}
  </table>
  <p style="color:#64748B;font-size:12px;margin-top:16px">Sent from ${escape(site.name)} website</p></div>`;
  const text = `${title}\n\n${filtered.map(([k, v]) => `${k}: ${v}`).join("\n")}`;
  return { html, text };
}

/**
 * Sends via Resend when RESEND_API_KEY is configured.
 * Without it (e.g. local dev) the email is logged and `delivered: false` is returned,
 * so the UI can nudge the patient towards the WhatsApp fallback.
 */
export async function sendClinicEmail(mail: Mail): Promise<{ delivered: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CLINIC_INBOX_EMAIL || site.email;
  const from = process.env.EMAIL_FROM || `${site.shortName} Website <onboarding@resend.dev>`;

  if (!key) {
    console.info("[email] RESEND_API_KEY not set — logging instead of sending:\n", mail.text);
    return { delivered: false };
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    ...(mail.replyTo && { replyTo: mail.replyTo }),
  });
  if (error) {
    console.error("[email] Resend error", error);
    throw new Error("Email delivery failed");
  }
  return { delivered: true };
}
