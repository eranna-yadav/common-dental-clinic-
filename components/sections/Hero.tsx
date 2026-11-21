import { CalendarCheck, Phone, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { buttonClass } from "@/components/ui/Button";
import { images } from "@/data/images";
import { site, telLink } from "@/lib/site";
import { t } from "@/lib/i18n";

export function Hero() {
  const badges = [
    { value: `${site.stats.yearsExperience}+`, label: "Years of experience" },
    { value: `${(site.stats.happyPatients / 1000).toFixed(0)}k+`, label: "Happy patients" },
    { value: `${site.rating.value}★`, label: `Google rating (${site.rating.count.toLocaleString("en-IN")}+)` },
  ];

  return (
    <section className="relative overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-12 lg:pt-16" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-mint/25 blur-3xl dark:bg-primary/20" />
        <div className="absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-surface blur-3xl dark:bg-navy" />
      </div>

      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1.5 text-sm font-semibold text-primary shadow-soft dark:text-mint">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Now accepting new patients in {site.address.locality}
          </p>

          <h1 id="hero-title" className="mt-6 text-balance text-[2.5rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
            Gentle, modern dentistry for{" "}
            <span className="relative whitespace-nowrap text-primary dark:text-mint">
              the whole family
              <svg aria-hidden="true" viewBox="0 0 300 12" className="absolute -bottom-2 left-0 w-full text-mint" preserveAspectRatio="none">
                <path d="M2 9c60-6 120-8 296-4" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">
            Specialist-led, truly painless dental care in {site.address.locality}, {site.address.city} — from routine check-ups
            and kids&apos; dentistry to implants, clear aligners and complete smile makeovers.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/book-appointment" variant="accent" size="lg">
              <CalendarCheck size={18} aria-hidden="true" /> {t.cta.book}
            </Button>
            <TrackedLink href={telLink()} event="call_click" params={{ location: "hero" }} className={buttonClass("secondary", "lg")}>
              <Phone size={18} aria-hidden="true" /> {t.cta.call}: {site.phone.display}
            </TrackedLink>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
            {badges.map((b) => (
              <div key={b.label}>
                <dt className="sr-only">{b.label}</dt>
                <dd className="font-display text-2xl font-extrabold text-heading sm:text-3xl">{b.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{b.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface shadow-lift sm:aspect-[5/6]">
            <SmartImage
              src={images.hero}
              alt="Smiling patient in a bright, modern dental treatment room at Lumina Dental Studio"
              fill
              priority
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 448px, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" aria-hidden="true" />
          </div>

          {/* Floating stat cards */}
          <div className="absolute -left-3 top-8 animate-float-y rounded-2xl border border-line bg-card/95 p-3.5 shadow-lift backdrop-blur sm:-left-8 sm:p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-500 dark:bg-amber-400/15">
                <Star size={20} className="fill-current" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold leading-none text-heading">{site.rating.value}/5</p>
                <p className="mt-1 text-xs text-muted">{site.rating.count.toLocaleString("en-IN")}+ Google reviews</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-3 bottom-24 animate-float-y rounded-2xl border border-line bg-card/95 p-3.5 shadow-lift backdrop-blur [animation-delay:1.5s] sm:-right-6 sm:p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:text-mint">
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-heading">Painless care</p>
                <p className="text-xs text-muted">Hospital-grade sterilisation</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-navy p-4 text-white shadow-lift sm:left-10 sm:right-auto sm:w-72">
            <p className="text-xs font-semibold uppercase tracking-widest text-mint">This week</p>
            <p className="mt-1 text-sm font-semibold">Free first consultation &amp; smile assessment</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
