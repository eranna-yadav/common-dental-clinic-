import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesExplorer } from "@/components/sections/ServicesExplorer";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Dental Treatments & Services in ${site.address.locality}`,
  description: `Explore all dental treatments at ${site.name}, ${site.address.city}: root canals, implants, braces & aligners, whitening, veneers, kids dentistry, gum care and emergency dental care.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our treatments"
        title={<>Dental treatments in {site.address.locality}, {site.address.city}</>}
        description="Specialist-led care for every stage of life. Search or filter to find the treatment you need — every page includes what to expect, recovery and transparent starting prices."
        crumbs={[{ name: "Services", href: "/services" }]}
      />
      <section className="section">
        <Container>
          <ServicesExplorer />
        </Container>
      </section>
      <AppointmentCta />
    </>
  );
}
