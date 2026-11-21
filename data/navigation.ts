import { t } from "@/lib/i18n";

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: t.nav.about, href: "/about" },
  { label: t.nav.services, href: "/services" },
  { label: t.nav.doctors, href: "/doctors" },
  { label: t.nav.gallery, href: "/smile-gallery" },
  { label: t.nav.pricing, href: "/pricing" },
  { label: t.nav.blog, href: "/blog" },
  { label: t.nav.contact, href: "/contact" },
];

export const footerLinks: NavItem[] = [
  { label: t.nav.about, href: "/about" },
  { label: t.nav.doctors, href: "/doctors" },
  { label: t.nav.gallery, href: "/smile-gallery" },
  { label: t.nav.testimonials, href: "/testimonials" },
  { label: t.nav.pricing, href: "/pricing" },
  { label: t.nav.blog, href: "/blog" },
  { label: t.nav.faqs, href: "/faqs" },
  { label: t.nav.contact, href: "/contact" },
  { label: "Book Appointment", href: "/book-appointment" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];
