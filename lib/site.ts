/**
 * Central clinic configuration — NAP (Name, Address, Phone) lives ONLY here so
 * it stays consistent across the header, footer, contact page and JSON-LD.
 *
 * TODO: Replace every value marked TODO with the clinic's real details.
 */
export const site = {
  // TODO: real clinic name & tagline
  name: "Lumina Dental Studio",
  shortName: "Lumina Dental",
  tagline: "Gentle, Modern Dentistry for the Whole Family",
  description:
    "Lumina Dental Studio is a modern dental clinic in Indiranagar, Bengaluru offering painless root canals, dental implants, clear aligners, teeth whitening, kids dentistry and 24/7 emergency dental care.",
  // TODO: production domain (also set NEXT_PUBLIC_SITE_URL in Vercel)
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.luminadental.example",
  locale: "en_IN",

  // TODO: real address
  address: {
    street: "2nd Floor, 482 100 Feet Road, HAL 2nd Stage",
    locality: "Indiranagar",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560038",
    country: "IN",
  },
  geo: { lat: 12.9719, lng: 77.6412 }, // TODO: exact coordinates

  // TODO: real phone numbers (display + E.164 for links)
  phone: { display: "+91 98765 43210", e164: "+919876543210" },
  whatsapp: { display: "+91 98765 43210", e164: "919876543210" },
  emergencyPhone: { display: "+91 98765 43211", e164: "+919876543211" },
  email: "hello@luminadental.example", // TODO

  // TODO: real hours. Day index: 0 = Sunday … 6 = Saturday
  hours: [
    { days: "Monday – Saturday", open: "10:00", close: "20:00" },
    { days: "Sunday", open: null, close: null },
  ],
  openDays: [1, 2, 3, 4, 5, 6],
  openingTime: "10:00",
  closingTime: "20:00",
  slotMinutes: 30,
  lunchBreak: { start: "13:30", end: "14:30" },

  // TODO: real Google Maps share link + Google review numbers
  mapsUrl: "https://maps.google.com/?q=Indiranagar+Bengaluru",
  mapsEmbedQuery: "Indiranagar, Bengaluru, Karnataka 560038",
  googleReviewsUrl: "https://g.page/r/your-google-review-link",
  rating: { value: 4.9, count: 1240 },

  stats: { yearsExperience: 15, happyPatients: 12000, procedures: 25000, rating: 4.9 },

  // TODO: real social links
  social: {
    instagram: "https://instagram.com/luminadental",
    facebook: "https://facebook.com/luminadental",
    youtube: "https://youtube.com/@luminadental",
  },

  /** Toggle the site-wide emergency banner. */
  emergencyBanner: {
    enabled: true,
    message: "Dental emergency? Severe pain, swelling or a knocked-out tooth — we see emergencies the same day.",
  },

  priceRange: "₹₹",
  foundedYear: 2010,
} as const;

export type Site = typeof site;

export const fullAddress = [
  site.address.street,
  site.address.locality,
  `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
].join(", ");

export const telLink = (e164: string = site.phone.e164) => `tel:${e164}`;

export const whatsappLink = (message = `Hi ${site.shortName}, I'd like to book an appointment.`) =>
  `https://wa.me/${site.whatsapp.e164}?text=${encodeURIComponent(message)}`;

export const directionsLink = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`;
