import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { FaqExplorer } from "@/components/sections/FaqExplorer";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: `Answers to common questions about treatments, pain, sterilisation, costs, insurance and emergencies at ${site.name}, ${site.address.city}.`,
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        description="Everything you might want to know before your visit. Still curious? We're only a call or message away."
        crumbs={[{ name: "FAQs", href: "/faqs" }]}
      />
      <section className="section">
        <Container className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <FaqExplorer />
          <aside className="h-fit rounded-3xl bg-navy p-6 text-white lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-white">Didn&apos;t find your answer?</h2>
            <p className="mt-2 text-sm text-slate-300">Our team replies within minutes during clinic hours.</p>
            <div className="mt-5 grid gap-3">
              <Button href={telLink()} variant="white">Call {site.phone.display}</Button>
              <Button href={whatsappLink("Hi, I have a question about…")} variant="outline-light">Ask on WhatsApp</Button>
            </div>
          </aside>
        </Container>
      </section>
      <AppointmentCta />
    </>
  );
}
