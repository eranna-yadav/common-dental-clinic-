import { processSteps } from "@/data/features";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessTimeline() {
  return (
    <section className="section bg-surface" aria-labelledby="process-title">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="Your journey"
          title="A clear, calm path from first visit to lasting smile"
          description="No surprises, no pressure — just four simple steps."
        />
        <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
          <div aria-hidden="true" className="absolute left-7 top-7 hidden h-0.5 w-[calc(100%-3.5rem)] bg-gradient-to-r from-primary via-mint to-primary/30 md:block" />
          <div aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-0.5 bg-gradient-to-b from-primary via-mint to-primary/30 md:hidden" />
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.1} className="relative flex gap-5 md:block">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary font-display text-xl font-extrabold text-white shadow-glow ring-8 ring-surface">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-6">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
