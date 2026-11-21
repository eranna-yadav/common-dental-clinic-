import type { Metadata } from "next";
import { doctors } from "@/data/doctors";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Our Dentists — Specialist Team in ${site.address.city}`,
  description: `Meet the specialist dentists at ${site.name}: implantologists, endodontists, orthodontists and paediatric dentists in ${site.address.locality}, ${site.address.city}.`,
  path: "/doctors",
});

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Specialist dentists who put you at ease"
        description="Every dentist on our team holds a master's degree (MDS) in their speciality and shares one philosophy: unhurried, honest, gentle care."
        crumbs={[{ name: "Doctors", href: "/doctors" }]}
      />
      <section className="section">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d, i) => (
              <Reveal as="li" key={d.slug} delay={i * 0.06}>
                <DoctorCard doctor={d} headingLevel="h2" />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <AppointmentCta />
    </>
  );
}
