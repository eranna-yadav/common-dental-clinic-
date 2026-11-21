import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, CheckCircle2, Clock, HeartPulse, IndianRupee, Repeat } from "lucide-react";
import { getService, services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatINR } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({
    title: `${s.title} in ${site.address.locality}, ${site.address.city}`,
    description: `${s.summary} Starting from ${formatINR(s.priceFrom)}. Book at ${site.name}.`,
    path: `/services/${s.slug}`,
    image: s.image,
  });
}

const specialistFor: Record<string, string> = {
  "root-canal-treatment": "dr-karthik-menon",
  "braces-clear-aligners": "dr-meera-iyer",
  "kids-dentistry": "dr-rohan-shetty",
};

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const doctor = doctors.find((d) => d.slug === (specialistFor[s.slug] ?? "dr-ananya-rao"))!;
  const related = services.filter((x) => x.slug !== s.slug && (x.category === s.category || x.category === "General")).slice(0, 3);
  const facts = [
    { Icon: Clock, label: "Duration", value: s.duration },
    { Icon: Repeat, label: "Visits", value: s.visits },
    { Icon: HeartPulse, label: "Speciality", value: s.category },
    { Icon: IndianRupee, label: "Starting from", value: `${formatINR(s.priceFrom)}${s.priceUnit ? ` ${s.priceUnit}` : ""}` },
  ];

  return (
    <>
      <JsonLd data={[serviceSchema(s), faqSchema(s.faqs.map((f) => ({ ...f, category: "Treatment" as const })))]} />
      <PageHero
        eyebrow={s.category}
        title={<>{s.title} in {site.address.locality}, {site.address.city}</>}
        description={s.summary}
        crumbs={[{ name: "Services", href: "/services" }, { name: s.title, href: `/services/${s.slug}` }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={`/book-appointment?service=${s.slug}`} variant="accent" size="lg">
            <CalendarCheck size={18} aria-hidden="true" /> Book {s.title.split(" ")[0] === "General" ? "a check-up" : "a consultation"}
          </Button>
          <Button href="/pricing" variant="outline-light" size="lg">View pricing</Button>
        </div>
      </PageHero>

      <section className="section">
        <Container className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <article className="min-w-0">
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-surface shadow-soft">
              <SmartImage src={s.image} alt={s.imageAlt} fill priority sizes="(min-width: 1024px) 760px, 92vw" className="object-cover" />
            </div>

            <dl className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {facts.map(({ Icon: I, label, value }) => (
                <div key={label} className="rounded-2xl border border-line bg-card p-4">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    <I size={14} className="text-primary dark:text-mint" aria-hidden="true" /> {label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-heading">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="prose-clinic">
              <h2>What is {s.title.toLowerCase()}?</h2>
              {s.intro.map((p) => <p key={p}>{p}</p>)}
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-surface p-6 sm:p-8">
                <h2 className="text-xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {s.whoFor.map((w) => (
                    <li key={w} className="flex gap-3 text-[0.9375rem]"><CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary dark:text-mint" aria-hidden="true" />{w}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
                <h2 className="text-xl font-bold">Benefits</h2>
                <ul className="mt-4 space-y-3">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-[0.9375rem]"><span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint/40"><span className="h-1.5 w-1.5 rounded-full bg-primary" /></span>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="mt-14 text-2xl font-bold sm:text-3xl">The procedure, step by step</h2>
            <ol className="mt-6 space-y-4">
              {s.steps.map((st, i) => (
                <Reveal as="li" key={st.title} delay={i * 0.05} className="flex gap-5 rounded-3xl border border-line bg-card p-5 sm:p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary font-display font-extrabold text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-bold">{st.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-muted">{st.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="mt-14 rounded-3xl border-l-4 border-primary bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-bold">Recovery &amp; aftercare</h2>
              <p className="mt-3 leading-relaxed">{s.recovery}</p>
            </div>

            <h2 className="mb-6 mt-14 text-2xl font-bold sm:text-3xl">{s.title}: frequently asked questions</h2>
            <Accordion items={s.faqs} />
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start" aria-label="Book this treatment">
            <div className="rounded-3xl bg-navy p-6 text-white shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-mint"><Icon name={s.icon} size={24} /></span>
              <p className="mt-4 text-sm text-slate-300">{s.title} starts from</p>
              <p className="font-display text-4xl font-extrabold text-white">{formatINR(s.priceFrom)}</p>
              <p className="mt-1 text-sm text-slate-300">Typical range {formatINR(s.priceFrom)} – {formatINR(s.priceTo)}{s.priceUnit ? ` ${s.priceUnit}` : ""}</p>
              <Button href={`/book-appointment?service=${s.slug}`} variant="accent" className="mt-6 w-full">
                <CalendarCheck size={18} aria-hidden="true" /> Book appointment
              </Button>
              <p className="mt-4 text-xs text-slate-400">Final cost depends on your diagnosis. You&apos;ll get a written estimate first. 0% EMI available.</p>
            </div>
            <div className="rounded-3xl border border-line bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-muted">Your specialist</p>
              <Link href={`/doctors/${doctor.slug}`} className="group mt-3 flex items-center gap-4">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-surface">
                  <SmartImage src={doctor.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span>
                  <span className="block font-bold text-heading group-hover:text-primary">{doctor.name}</span>
                  <span className="block text-sm text-muted">{doctor.qualifications}</span>
                </span>
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      <section className="section bg-surface" aria-labelledby="related-title">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="related-title" className="text-2xl font-bold sm:text-3xl">Related treatments</h2>
            <Button href="/services" variant="ghost" size="sm">All services <ArrowRight size={16} aria-hidden="true" /></Button>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {related.map((r) => <li key={r.slug}><ServiceCard service={r} showPrice /></li>)}
          </ul>
        </Container>
      </section>
      <AppointmentCta />
    </>
  );
}
