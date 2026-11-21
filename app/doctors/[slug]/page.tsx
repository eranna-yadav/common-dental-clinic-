import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award, CalendarCheck, CalendarDays, GraduationCap, Languages } from "lucide-react";
import { doctors, getDoctor } from "@/data/doctors";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SmartImage } from "@/components/ui/SmartImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { physicianSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDoctor((await params).slug);
  if (!d) return {};
  return buildMetadata({
    title: `${d.name}, ${d.qualifications} — ${d.title.split("—").pop()?.trim()}`,
    description: `${d.shortBio} ${d.experienceYears}+ years' experience. Consulting at ${site.name}, ${site.address.locality}, ${site.address.city}.`,
    path: `/doctors/${d.slug}`,
    image: d.image,
  });
}

export default async function DoctorPage({ params }: Props) {
  const d = getDoctor((await params).slug);
  if (!d) notFound();
  const others = doctors.filter((x) => x.slug !== d.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={physicianSchema(d)} />
      <section className="relative overflow-hidden bg-surface pb-16 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ name: "Doctors", href: "/doctors" }, { name: d.name, href: `/doctors/${d.slug}` }]} />
          <div className="grid gap-10 lg:grid-cols-[400px_1fr] lg:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-card shadow-lift lg:max-w-none">
              <SmartImage src={d.image} alt={d.imageAlt} fill priority sizes="(min-width: 1024px) 400px, 92vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-widest text-primary dark:text-mint">{d.experienceYears}+ years of experience</p>
              <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">{d.name}</h1>
              <p className="mt-2 text-lg font-semibold text-link">{d.qualifications}</p>
              <p className="mt-1 text-muted">{d.title}</p>
              <div className="mt-6 space-y-4 leading-relaxed">{d.bio.map((p) => <p key={p}>{p}</p>)}</div>
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3 rounded-2xl bg-card p-4">
                  <CalendarDays className="shrink-0 text-primary dark:text-mint" size={20} aria-hidden="true" />
                  <div><dt className="text-xs font-semibold uppercase text-muted">Available</dt><dd className="font-semibold text-heading">{d.availability}</dd></div>
                </div>
                <div className="flex gap-3 rounded-2xl bg-card p-4">
                  <Languages className="shrink-0 text-primary dark:text-mint" size={20} aria-hidden="true" />
                  <div><dt className="text-xs font-semibold uppercase text-muted">Languages</dt><dd className="font-semibold text-heading">{d.languages.join(", ")}</dd></div>
                </div>
              </dl>
              <div className="mt-8">
                <Button href="/book-appointment" variant="accent" size="lg">
                  <CalendarCheck size={18} aria-hidden="true" /> Book with {d.name.split(" ").slice(0, 2).join(" ")}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-bold"><Award size={20} className="text-primary dark:text-mint" aria-hidden="true" /> Areas of expertise</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {d.expertise.map((e) => <li key={e} className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-heading">{e}</li>)}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-bold"><GraduationCap size={20} className="text-primary dark:text-mint" aria-hidden="true" /> Education</h2>
            <ul className="mt-5 space-y-4">
              {d.education.map((e) => (
                <li key={e.degree}>
                  <p className="font-semibold text-heading">{e.degree}</p>
                  <p className="text-sm text-muted">{e.institution} · {e.year}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
            <h2 className="text-xl font-bold">Professional memberships</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-primary">
              {d.memberships.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section bg-surface" aria-labelledby="team-title">
        <Container>
          <h2 id="team-title" className="mb-8 text-2xl font-bold sm:text-3xl">Meet the rest of the team</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => <li key={o.slug}><DoctorCard doctor={o} /></li>)}
          </ul>
        </Container>
      </section>
    </>
  );
}
