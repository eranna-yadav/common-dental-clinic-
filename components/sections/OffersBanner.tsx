import { ArrowRight, Gift } from "lucide-react";
import { offers } from "@/data/features";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function OffersBanner() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="offers-title">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-navy p-6 text-white shadow-lift sm:p-10 lg:p-12">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-mint/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-mint">
                <Gift size={16} aria-hidden="true" /> Current offers
              </p>
              <h2 id="offers-title" className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Quality care, honestly priced</h2>
              <p className="mt-3 text-white/85">Transparent starting prices, written estimates and 0% EMI — so cost is never a barrier to a healthy smile.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/book-appointment" variant="accent">Claim free consultation</Button>
                <Button href="/pricing" variant="outline-light">
                  View pricing <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {offers.map((o) => (
                <li key={o.title} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <span className="inline-block rounded-full bg-coral px-2.5 py-0.5 text-xs font-bold text-navy">{o.badge}</span>
                  <h3 className="mt-3 font-sans text-base font-bold text-white">{o.title}</h3>
                  <p className="mt-1.5 text-sm text-white/80">{o.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="relative mt-8 text-xs text-white/70">Offers valid for new patients. Terms apply. {/* TODO: update offers & validity */}</p>
        </Reveal>
      </Container>
    </section>
  );
}
