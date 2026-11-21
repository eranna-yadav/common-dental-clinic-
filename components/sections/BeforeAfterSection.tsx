import { ArrowRight } from "lucide-react";
import { smileCases } from "@/data/gallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

export function BeforeAfterSection() {
  return (
    <section className="section" aria-labelledby="ba-title">
      <Container>
        <SectionHeading
          id="ba-title"
          eyebrow="Smile gallery"
          title="Real transformations, gently achieved"
          description="Drag the slider to see the difference. Every smile is planned digitally, so you know what to expect before we begin."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {smileCases.slice(0, 2).map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <BeforeAfterSlider item={c} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/smile-gallery" variant="secondary">
            View the smile gallery <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
