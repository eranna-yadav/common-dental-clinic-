import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Counters } from "@/components/sections/Counters";
import { DoctorsPreview } from "@/components/sections/DoctorsPreview";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { OffersBanner } from "@/components/sections/OffersBanner";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { FaqSection } from "@/components/sections/FaqSection";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { LocationSection } from "@/components/sections/LocationSection";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name} | Best Dentist in ${site.address.locality}, ${site.address.city}`,
    description: `Painless, specialist-led dental care in ${site.address.locality}, ${site.address.city}. Root canals, implants, clear aligners, whitening & kids dentistry. ${site.rating.value}★ from ${site.rating.count}+ patients. Book your free consultation.`,
    path: "/",
  }),
  title: { absolute: `${site.name} | Best Dentist in ${site.address.locality}, ${site.address.city}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <WhyChooseUs />
      <Counters />
      <DoctorsPreview />
      <BeforeAfterSection />
      <ProcessTimeline />
      <TestimonialsCarousel />
      <OffersBanner />
      <BlogPreview />
      <FaqSection />
      <AppointmentCta />
      <LocationSection />
    </>
  );
}
