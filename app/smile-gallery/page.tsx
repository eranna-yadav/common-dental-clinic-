import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import { smileCases } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Smile Gallery — Before & After Results",
  description: `Before and after results for teeth whitening, clear aligners, veneers, crowns and implants at ${site.name}, ${site.address.city}.`,
  path: "/smile-gallery",
});

export default function SmileGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Smile gallery"
        title="Before & after: smiles we've transformed"
        description="Drag each slider (or use your arrow keys) to compare. Every treatment was planned digitally with the patient before we began."
        crumbs={[{ name: "Smile Gallery", href: "/smile-gallery" }]}
      />
      <section className="section">
        <Container>
          <ul className="grid gap-8 md:grid-cols-2">
            {smileCases.map((c, i) => (
              <Reveal as="li" key={c.id} delay={(i % 2) * 0.08}>
                <BeforeAfterSlider item={c} />
                <p className="mt-3 px-1 text-sm text-muted">
                  {c.description}{" "}
                  <Link href={`/services/${c.serviceSlug}`} className="link">About {c.treatment.toLowerCase()}</Link>
                </p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-12 flex items-start gap-3 rounded-2xl bg-surface p-5 text-sm text-muted">
            <Info size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            Illustrations shown for representation. Individual results vary depending on each patient&apos;s condition. Real patient photographs are shared during consultation with written consent.
          </p>
        </Container>
      </section>
      <AppointmentCta />
    </>
  );
}
