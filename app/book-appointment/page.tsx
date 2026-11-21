import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckCircle2, Clock, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageHero } from "@/components/sections/PageHero";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { buildMetadata } from "@/lib/seo";
import { site, telLink } from "@/lib/site";
import { formatTime12 } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Book a Dental Appointment Online",
  description: `Book your dental appointment at ${site.name}, ${site.address.locality}, ${site.address.city} in under a minute. Free first consultation. Evening & Saturday slots.`,
  path: "/book-appointment",
});

function FormSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading booking form">
      <div className="grid gap-5 sm:grid-cols-2">{Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-[74px]" />)}</div>
      <div className="grid gap-5 lg:grid-cols-2"><Skeleton className="h-80" /><Skeleton className="h-80" /></div>
      <Skeleton className="h-28" />
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Book online"
        title="Book your appointment"
        description="Choose a date and time that suits you. We'll call to confirm within 2 working hours — or send your request straight to us on WhatsApp."
        crumbs={[{ name: "Book Appointment", href: "/book-appointment" }]}
      />
      <section className="section">
        <Container className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[2rem] border border-line bg-card p-5 shadow-soft sm:p-10">
            <Suspense fallback={<FormSkeleton />}>
              <AppointmentForm />
            </Suspense>
          </div>
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-surface p-6">
              <h2 className="text-lg font-bold">What to expect</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {["Free first consultation & examination", "Written treatment plan with costs", "No pressure — decide in your own time", "Evening & Saturday appointments"].map((x) => (
                  <li key={x} className="flex gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary dark:text-mint" aria-hidden="true" />{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-line bg-card p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold"><Clock size={18} className="text-primary dark:text-mint" aria-hidden="true" /> Clinic hours</h2>
              <ul className="mt-3 space-y-1 text-sm">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-3"><span>{h.days}</span><span className="font-semibold text-heading">{h.open ? `${formatTime12(h.open)} – ${formatTime12(h.close!)}` : "Closed"}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-navy p-6 text-white">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white"><ShieldCheck size={18} className="text-mint" aria-hidden="true" /> In pain right now?</h2>
              <p className="mt-2 text-sm text-slate-300">Don&apos;t wait for a slot — call our emergency line for same-day care.</p>
              <TrackedLink href={telLink(site.emergencyPhone.e164)} event="call_click" params={{ location: "booking_sidebar" }} className="mt-4 inline-flex items-center gap-2 font-semibold text-mint hover:text-white">
                <Phone size={16} aria-hidden="true" /> {site.emergencyPhone.display}
              </TrackedLink>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
