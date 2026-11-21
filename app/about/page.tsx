import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { sterilisationSteps, technologies, values } from "@/data/features";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { PageHero } from "@/components/sections/PageHero";
import { Counters } from "@/components/sections/Counters";
import { DoctorsPreview } from "@/components/sections/DoctorsPreview";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `About Us — Our Story, Values & Technology`,
  description: `Since ${site.foundedYear}, ${site.name} has offered gentle, specialist-led dentistry in ${site.address.locality}, ${site.address.city}. Discover our story, values, technology and sterilisation standards.`,
  path: "/about",
});

const tour = [
  { src: images.clinicReception, alt: "Calm reception and waiting lounge with natural light", caption: "Reception lounge" },
  { src: images.clinicInterior, alt: "Treatment suite with modern dental chair and overhead light", caption: "Treatment suite" },
  { src: images.technology, alt: "Digital imaging and 3D scanning room", caption: "Digital imaging room" },
  { src: images.sterilisation, alt: "Dedicated sterilisation zone with autoclave", caption: "Sterilisation zone" },
  { src: images.kids, alt: "Child-friendly treatment area", caption: "Kids' corner" },
  { src: images.consultation, alt: "Private consultation room for treatment planning", caption: "Consultation room" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Caring for {site.address.city}&apos;s smiles since {site.foundedYear}</>}
        description="We started with a simple belief: a visit to the dentist should feel calm, honest and genuinely caring. Fifteen years and thousands of smiles later, that belief still guides everything we do."
        crumbs={[{ name: "About", href: "/about" }]}
      />

      <section className="section" aria-labelledby="story-title">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface shadow-lift">
            <SmartImage src={images.dentistAtWork} alt="Our founder discussing a treatment plan with a patient" fill sizes="(min-width: 1024px) 560px, 92vw" className="object-cover" />
          </Reveal>
          <div>
            <SectionHeading id="story-title" align="left" eyebrow="Our story" title="Built around patients, not procedures" className="mb-6" />
            <div className="space-y-4 leading-relaxed">
              {/* TODO: replace with the clinic's real story */}
              <p>{site.name} was founded in {site.foundedYear} by Dr. Ananya Rao after years of watching patients delay care out of fear or uncertainty about cost. She set out to build a clinic where people felt listened to, where treatment was explained honestly, and where comfort was never an afterthought.</p>
              <p>Today our team of specialists treats over a thousand patients every year — from toddlers having their first check-up to grandparents receiving implants. We&apos;ve grown, but our approach hasn&apos;t changed: take time, explain clearly, and do it right the first time.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-surface p-6">
                <h3 className="text-lg font-bold">Our mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">To deliver world-class, evidence-based dentistry with warmth and transparency — making every visit something to smile about.</p>
              </div>
              <div className="rounded-3xl bg-surface p-6">
                <h3 className="text-lg font-bold">Our vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">A community where no one avoids the dentist because of fear, cost confusion or past experiences.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-surface" aria-labelledby="values-title">
        <Container>
          <SectionHeading id="values-title" eyebrow="Our values" title="What we stand for" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.06} className="rounded-3xl border border-line bg-card p-6 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:text-mint"><Icon name={v.icon} size={22} /></span>
                <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section" aria-labelledby="tour-title">
        <Container>
          <SectionHeading id="tour-title" eyebrow="Clinic tour" title="Step inside our clinic" description="Designed to feel more like a calm boutique than a hospital — bright, spacious and spotless." />
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {tour.map((t, i) => (
              <Reveal as="li" key={t.caption} delay={(i % 3) * 0.06} className={i === 0 ? "col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
                <figure className="group relative h-full min-h-[160px] overflow-hidden rounded-3xl bg-surface sm:min-h-[220px]">
                  <SmartImage src={t.src} alt={t.alt} fill sizes="(min-width: 1024px) 400px, 46vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <figcaption className="absolute bottom-3 left-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-heading backdrop-blur">{t.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <Counters />

      <section className="section" aria-labelledby="tech-title">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="tech-title" align="left" eyebrow="Technology" title="Advanced tools for gentler, more precise care" className="mb-8" />
            <ul className="grid gap-4 sm:grid-cols-2">
              {technologies.map((t) => (
                <li key={t.title} className="rounded-2xl border border-line bg-card p-5">
                  <h3 className="font-sans text-base font-bold">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{t.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] bg-navy p-6 text-white sm:p-10" aria-labelledby="steril-title">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-mint"><ShieldCheck size={24} aria-hidden="true" /></span>
            <h2 id="steril-title" className="mt-5 text-2xl font-extrabold text-white sm:text-3xl">Our sterilisation standards</h2>
            <p className="mt-3 text-slate-300">Your safety is non-negotiable. We follow hospital-grade infection-control protocols aligned with IDA and international guidelines.</p>
            <ol className="mt-6 space-y-3">
              {sterilisationSteps.map((s) => (
                <li key={s} className="flex gap-3 text-sm text-slate-200">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" /> {s}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <DoctorsPreview />
      <AppointmentCta />
    </>
  );
}
