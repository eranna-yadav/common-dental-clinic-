import Link from "next/link";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { footerLinks, legalLinks } from "@/data/navigation";
import { services } from "@/data/services";
import { directionsLink, fullAddress, site, telLink } from "@/lib/site";
import { formatTime12 } from "@/lib/utils";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";

const socials = [
  { href: site.social.instagram, label: "Instagram", Icon: Instagram },
  { href: site.social.facebook, label: "Facebook", Icon: Facebook },
  { href: site.social.youtube, label: "YouTube", Icon: Youtube },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy pb-24 text-slate-300 md:pb-0" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-content gap-6 px-4 py-10 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
          <div>
            <p className="font-display text-2xl font-bold text-white">Smile tips, straight to your inbox</p>
            <p className="mt-2 text-sm text-slate-400">One helpful email a month. No spam — unsubscribe anytime.</p>
          </div>
          <NewsletterForm invert />
        </div>
      </div>

      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Logo invert />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
            {site.tagline}. Specialist-led, painless dental care in {site.address.locality}, {site.address.city} since {site.foundedYear}.
          </p>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-mint hover:text-mint">
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Quick links" className="lg:col-span-2">
          <p className="font-display font-bold text-white">Quick links</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-mint">{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="lg:col-span-3">
          <p className="font-display font-bold text-white">Treatments</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {services.slice(0, 9).map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-mint">{s.title}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="font-display font-bold text-white">Visit us</p>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <TrackedLink href={directionsLink()} event="directions_click" params={{ location: "footer" }} className="flex gap-3 hover:text-mint">
              <MapPin size={18} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
              <span>{fullAddress}</span>
            </TrackedLink>
            <TrackedLink href={telLink()} event="call_click" params={{ location: "footer" }} className="flex gap-3 hover:text-mint">
              <Phone size={18} className="shrink-0 text-mint" aria-hidden="true" /> {site.phone.display}
            </TrackedLink>
            <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-mint">
              <Mail size={18} className="shrink-0 text-mint" aria-hidden="true" /> {site.email}
            </a>
            <div className="flex gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
              <ul>
                {site.hours.map((h) => (
                  <li key={h.days}>
                    {h.days}: {h.open ? `${formatTime12(h.open)} – ${formatTime12(h.close!)}` : <span className="text-coral">Closed</span>}
                  </li>
                ))}
              </ul>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-6 text-xs text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {year} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-mint">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
