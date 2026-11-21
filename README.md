# Dental Clinic Website

A production-ready, premium website for a private dental clinic — built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** and **Lucide** icons. Deploys to Vercel for free.

> The site ships with realistic placeholder content for a fictional clinic ("Lumina Dental Studio", Indiranagar, Bengaluru). Search the codebase for `TODO` to find everything you should replace.

## Features

- **14 page types** — Home, About, Services (+12 detail pages), Doctors (+profiles), Smile Gallery, Testimonials, Pricing, Blog (+articles), FAQs, Contact, Book Appointment, Privacy / Terms / Cookie policy, custom 404
- **Online booking** — inline calendar (past dates & Sundays disabled), live time slots, Zod validation on client **and** server, honeypot + rate limiting, email via Resend, "Send via WhatsApp" fallback, pre-fill from the home-page mini form
- **Conversion helpers** — sticky glass header with CTA, floating WhatsApp button, mobile bottom bar (Call | WhatsApp | Book), toggleable emergency banner, offers banner
- **Interactive** — before/after drag slider (mouse, touch & keyboard), cost estimator, searchable/filterable services and blog, testimonials carousel, animated counters, FAQ accordions
- **Polish** — dark mode, scroll-reveal animations, page transitions, loading skeletons, back-to-top, `prefers-reduced-motion` respected
- **SEO** — per-page metadata, canonical URLs, Open Graph/Twitter cards, generated OG image, `sitemap.xml`, `robots.txt`, JSON-LD (Dentist/MedicalClinic/LocalBusiness, Physician, MedicalProcedure, FAQPage, Review, BreadcrumbList, Article)
- **Accessibility** — WCAG 2.1 AA colours, skip link, visible focus rings, labelled forms with announced errors, keyboard-operable calendar/slider/modal, one H1 per page
- **Privacy-aware analytics** — Vercel Analytics (cookieless) + GA4 loaded only after cookie consent; events: `appointment_submitted`, `call_click`, `whatsapp_click`, `directions_click`, `newsletter_signup`, `contact_submitted`

Lighthouse (mobile, local production build): Performance 90–95, Accessibility 100, Best Practices 96–100, SEO 100.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional for local dev
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Project structure

```
app/                 Routes (App Router) — one folder per page, plus api/ routes
  api/appointment    POST: validates & emails booking requests
  api/contact        POST: contact form
  api/newsletter     POST: newsletter sign-up
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg
components/
  ui/                Design-system primitives: Button, Card, Badge, SectionHeading, Accordion, Modal, Input…
  layout/            Header, Footer, banners, floating actions, cookie consent, analytics
  sections/          Page sections (Hero, ServicesGrid, BeforeAfterSlider, CostEstimator…)
  forms/             AppointmentForm, DatePicker, MiniBookingForm, ContactForm, NewsletterForm
data/                ✏️  All editable content (typed)
lib/                 site config, SEO + schema helpers, validation, booking rules, email, i18n
```

## Editing content (no component changes needed)

| What | File |
| --- | --- |
| Clinic name, address, phones, WhatsApp, email, hours, map, socials, rating, stats, emergency banner on/off | `lib/site.ts` |
| Services (copy, steps, FAQs, prices) | `data/services.ts` |
| Doctors | `data/doctors.ts` |
| Testimonials | `data/testimonials.ts` |
| FAQs | `data/faqs.ts` |
| Blog posts | `data/blog.ts` |
| Before/after cases | `data/gallery.ts` |
| Why-choose-us, trust strip, offers, values, technology, sterilisation steps | `data/features.ts` |
| Navigation | `data/navigation.ts` |
| Images | `data/images.ts` |
| Colours | CSS variables at the top of `app/globals.css` |

**Images.** Placeholders are free Unsplash photos referenced in `data/images.ts`. Replace them with real clinic photography: drop files into `public/images/` and change the URLs to e.g. `/images/hero.webp`. If a remote image ever fails, a branded fallback is shown instead of a broken image.

**Before/after.** The gallery uses illustrated smiles so stock photos are never passed off as results. Add real, consented patient photos with `beforeImage` / `afterImage` in `data/gallery.ts`.

**Booking rules.** Open days, opening/closing time, slot length and lunch break live in `lib/site.ts`; the calendar, time slots and server validation all read from there.

**Blog posts.** Add an object to `data/blog.ts`. Content is a list of blocks (`p`, `h2`, `h3`, `ul`, `ol`, `quote`); reading time is calculated automatically.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel → **Add New Project** → import the repo (framework preset: Next.js, no build settings to change).
3. Add environment variables from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL`; add `RESEND_API_KEY`, `CLINIC_INBOX_EMAIL`, `EMAIL_FROM` to receive bookings by email).
4. Deploy. Then: **Analytics** tab → enable Web Analytics; add your custom domain under **Settings → Domains**.
5. Submit `https://your-domain/sitemap.xml` in Google Search Console and keep your Google Business Profile NAP identical to `lib/site.ts`.

### Email setup (Resend, free tier)

1. Create an account at resend.com and an API key.
2. Verify your domain (DNS records) so you can send from `bookings@your-domain`. Until then use `EMAIL_FROM="Clinic <onboarding@resend.dev>"` (can only deliver to your Resend account email).
3. Without `RESEND_API_KEY`, submissions are logged to the server console and the patient is still offered the WhatsApp option.

### Rate limiting

`lib/rate-limit.ts` is an in-memory limiter (5 requests / 10 min / IP per form). On serverless platforms each instance has its own memory; for stricter limits swap it for Upstash Redis (`@upstash/ratelimit`) — the function signature is designed to be a drop-in replacement.

## Adding a language

The UI strings are already centralised in `lib/i18n/dictionaries/` (English + a Hindi starter; Kannada falls back to English).

1. Add or complete a dictionary, e.g. `lib/i18n/dictionaries/kn.ts`, and register it in `lib/i18n/index.ts`.
2. Move routes under `app/[locale]/…`, read the locale from `params`, and call `getDictionary(locale)` instead of using the default `t` export.
3. Add `alternates.languages` to `buildMetadata` in `lib/seo.ts` for `hreflang`.
4. Translate long-form content by adding locale-keyed variants to the files in `data/`.

## Pre-launch checklist

- [ ] Replace every `TODO` (search the repo)
- [ ] Real photos, logo (`components/layout/Logo.tsx`, `app/icon.svg`) and doctor bios
- [ ] Real testimonials and before/after photos — with written patient consent
- [ ] Review prices and the pricing disclaimer
- [ ] Legal review of Privacy, Terms and Cookie pages
- [ ] Set env vars on Vercel and send a test booking
