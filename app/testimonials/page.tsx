import type { Metadata } from "next";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { PageHero } from "@/components/sections/PageHero";
import { GoogleBadge } from "@/components/sections/GoogleBadge";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { clinicSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Patient Testimonials & Reviews",
  description: `Read what patients say about ${site.name}. Rated ${site.rating.value}/5 from ${site.rating.count}+ Google reviews in ${site.address.city}.`,
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const avg = testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length;
  return (
    <>
      <JsonLd data={clinicSchema(testimonials)} />
      <PageHero
        eyebrow="Patient stories"
        title="Kind words from our patients"
        description="Nothing means more to us than the trust of our patients. Here are a few of their stories, in their own words."
        crumbs={[{ name: "Testimonials", href: "/testimonials" }]}
      />
      <section className="section">
        <Container>
          <div className="mb-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-card p-6 shadow-soft sm:flex-row sm:p-8">
            <div className="flex items-center gap-5">
              <p className="font-display text-5xl font-extrabold text-heading">{site.rating.value}</p>
              <div>
                <StarRating value={avg} size={20} />
                <p className="mt-1 text-sm text-muted">Average from {site.rating.count.toLocaleString("en-IN")}+ verified reviews</p>
              </div>
            </div>
            <GoogleBadge />
          </div>
          <ul className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>li]:mb-6 [&>li]:break-inside-avoid">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={t.name} delay={(i % 3) * 0.05}>
                <TestimonialCard t={t} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <AppointmentCta />
    </>
  );
}
