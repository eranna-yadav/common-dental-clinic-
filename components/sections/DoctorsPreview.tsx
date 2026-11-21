import { ArrowRight, CheckCircle2 } from "lucide-react";
import { doctors, leadDoctor } from "@/data/doctors";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { DoctorCard } from "./DoctorCard";

export function DoctorsPreview() {
  const others = doctors.filter((d) => d.slug !== leadDoctor.slug).slice(0, 3);
  return (
    <section className="section bg-surface" aria-labelledby="doctors-title">
      <Container>
        <SectionHeading
          id="doctors-title"
          eyebrow="Meet the team"
          title="Specialists who genuinely care"
          description="Every dentist on our team holds a master's degree in their speciality — so you're always in expert hands."
        />

        <Reveal className="mb-10 grid overflow-hidden rounded-[2rem] border border-line bg-card shadow-soft md:grid-cols-[2fr_3fr]">
          <div className="relative aspect-[4/3] bg-surface md:aspect-auto md:min-h-[380px]">
            <SmartImage src={leadDoctor.image} alt={leadDoctor.imageAlt} fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-primary dark:text-mint">Lead dentist</p>
            <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">{leadDoctor.name}</h3>
            <p className="mt-1 font-medium text-link">{leadDoctor.qualifications} · {leadDoctor.experienceYears}+ years</p>
            <p className="mt-4 leading-relaxed text-ink">{leadDoctor.bio[0]}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {leadDoctor.expertise.slice(0, 4).map((e) => (
                <li key={e} className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-heading">
                  <CheckCircle2 size={14} className="text-primary dark:text-mint" aria-hidden="true" /> {e}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href={`/doctors/${leadDoctor.slug}`} variant="secondary" size="sm">
                Read full profile <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={i * 0.08}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
