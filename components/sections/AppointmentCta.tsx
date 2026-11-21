import { CheckCircle2, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MiniBookingForm } from "@/components/forms/MiniBookingForm";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { site, telLink } from "@/lib/site";

export function AppointmentCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-24" aria-labelledby="cta-title">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-coral/15 blur-3xl" />
      </div>
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="text-white">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-mint">Book your visit</p>
          <h2 id="cta-title" className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Your healthiest smile starts with one simple step
          </h2>
          <p className="mt-4 max-w-lg text-lg text-slate-300">
            Tell us a little about yourself and pick a time that suits you. We&apos;ll call to confirm within 2 working hours.
          </p>
          <ul className="mt-8 space-y-3">
            {["Free first consultation", "Evening & Saturday appointments", "Same-day emergency care"].map((x) => (
              <li key={x} className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 size={20} className="text-mint" aria-hidden="true" /> {x}
              </li>
            ))}
          </ul>
          <TrackedLink href={telLink()} event="call_click" params={{ location: "cta_band" }} className="mt-8 inline-flex items-center gap-3 text-lg font-semibold text-white hover:text-mint">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10"><Phone size={20} aria-hidden="true" /></span>
            Prefer to talk? {site.phone.display}
          </TrackedLink>
        </div>
        <MiniBookingForm />
      </Container>
    </section>
  );
}
