import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { ServiceCard } from "./ServiceCard";

export function ServicesGrid() {
  return (
    <section className="section bg-surface" aria-labelledby="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="Our treatments"
          title={<>Complete dental care in {site.address.locality}, under one roof</>}
          description="From your child's first check-up to a full smile makeover — every treatment is planned by a specialist and delivered with a gentle touch."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 0.06}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Button href="/services" variant="secondary">
            Explore all treatments <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
