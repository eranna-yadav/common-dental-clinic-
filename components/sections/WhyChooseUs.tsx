import { CheckCircle2 } from "lucide-react";
import { whyChooseUs } from "@/data/features";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

export function WhyChooseUs() {
  return (
    <section className="section" aria-labelledby="why-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-last lg:order-first">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface shadow-lift">
            <SmartImage src={images.clinicInterior} alt="Calm, light-filled treatment suite with a modern dental chair" fill sizes="(min-width: 1024px) 560px, 92vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-2 max-w-[260px] rounded-3xl bg-primary p-6 text-white shadow-lift sm:-right-6">
            <p className="font-display text-4xl font-extrabold">98%</p>
            <p className="mt-1 text-sm text-white/90">of patients say their treatment was more comfortable than expected*</p>
          </div>
          <ul className="absolute left-4 top-4 space-y-2">
            {["ISO-standard sterilisation", "Specialist dentists"].map((x) => (
              <li key={x} className="flex items-center gap-2 rounded-full bg-card/95 px-3 py-1.5 text-xs font-semibold text-heading shadow-soft backdrop-blur">
                <CheckCircle2 size={14} className="text-success" aria-hidden="true" /> {x}
              </li>
            ))}
          </ul>
        </Reveal>

        <div>
          <SectionHeading
            id="why-title"
            align="left"
            eyebrow="Why choose us"
            title="Dentistry that feels different — calmer, kinder, more precise"
            description="We designed every part of our clinic around one question: how can we make a dental visit something you don't dread?"
            className="mb-10"
          />
          <ul className="grid gap-6 sm:grid-cols-2">
            {whyChooseUs.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.05} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-primary dark:text-mint">
                  <Icon name={f.icon} size={22} />
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-xs text-muted">*Based on our post-treatment patient survey, 2025. {/* TODO: update with real survey data */}</p>
        </div>
      </Container>
    </section>
  );
}
