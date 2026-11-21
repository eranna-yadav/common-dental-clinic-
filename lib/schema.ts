/** JSON-LD structured data builders (schema.org). */
import { site } from "./site";
import { absoluteUrl } from "./seo";
import type { Doctor } from "@/data/doctors";
import type { Faq } from "@/data/faqs";
import type { BlogPost } from "@/data/blog";
import type { Service } from "@/data/services";
import type { Testimonial } from "@/data/testimonials";

const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const clinicId = absoluteUrl("/#clinic");

export function clinicSchema(reviews: Testimonial[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalClinic", "LocalBusiness"],
    "@id": clinicId,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    email: site.email,
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/icon.svg"),
    priceRange: site.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: `${site.address.locality}, ${site.address.city}`,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.openDays.map((d) => dayMap[d]),
        opens: site.openingTime,
        closes: site.closingTime,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    ...(reviews.length && {
      review: reviews.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
        reviewBody: r.quote,
      })),
    }),
    sameAs: Object.values(site.social),
    medicalSpecialty: "Dentistry",
  };
}

export function physicianSchema(d: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: d.name,
    url: absoluteUrl(`/doctors/${d.slug}`),
    image: d.image,
    description: d.shortBio,
    medicalSpecialty: "Dentistry",
    knowsAbout: d.expertise,
    hasCredential: d.education.map((e) => ({ "@type": "EducationalOccupationalCredential", name: e.degree })),
    worksFor: { "@id": clinicId },
    address: { "@type": "PostalAddress", addressLocality: site.address.city, addressCountry: site.address.country },
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: s.title,
    description: s.summary,
    url: absoluteUrl(`/services/${s.slug}`),
    howPerformed: s.steps.map((x) => x.title).join(" → "),
    offers: { "@type": "Offer", priceCurrency: "INR", price: s.priceFrom, availability: "https://schema.org/InStock" },
    provider: { "@id": clinicId },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.href),
    })),
  };
}

export function articleSchema(p: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    image: p.image,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    author: { "@type": "Person", name: p.author },
    publisher: { "@id": clinicId },
    mainEntityOfPage: absoluteUrl(`/blog/${p.slug}`),
  };
}
