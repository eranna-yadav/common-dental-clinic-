import { ArrowRight } from "lucide-react";
import { faqs as allFaqs, type Faq } from "@/data/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqSchema } from "@/lib/schema";
import { site, telLink } from "@/lib/site";

export function FaqSection({ faqs = allFaqs, withSchema = true }: { faqs?: Faq[]; withSchema?: boolean }) {
  return (
    <section className="section" aria-labelledby="faq-title">
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow="FAQs"
            title="Questions? We've got answers."
            description="Can't find what you're looking for? Our team is happy to help — just call or WhatsApp us."
            className="mb-6"
          />
          <div className="flex flex-wrap gap-3">
            <Button href={telLink()} variant="secondary" size="sm">Call {site.phone.display}</Button>
            <Button href="/faqs" variant="ghost" size="sm">
              All FAQs <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
        <Accordion items={faqs} />
      </Container>
    </section>
  );
}
