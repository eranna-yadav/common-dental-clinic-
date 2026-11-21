import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, Siren } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { LocationSection } from "@/components/sections/LocationSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { buildMetadata } from "@/lib/seo";
import { site, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Contact Us — Dentist in ${site.address.locality}, ${site.address.city}`,
  description: `Contact ${site.name}: call ${site.phone.display}, WhatsApp us or visit us at ${site.address.locality}, ${site.address.city}. Open Monday–Saturday.`,
  path: "/contact",
});

const channels = [
  { Icon: Phone, title: "Call us", value: site.phone.display, href: telLink(), event: "call_click" as const },
  { Icon: MessageCircle, title: "WhatsApp", value: site.whatsapp.display, href: whatsappLink(), event: "whatsapp_click" as const },
  { Icon: Siren, title: "Emergency line", value: site.emergencyPhone.display, href: telLink(site.emergencyPhone.e164), event: "call_click" as const },
  { Icon: Mail, title: "Email", value: site.email, href: `mailto:${site.email}`, event: undefined },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Questions about a treatment, costs or insurance? Reach us however suits you best — we usually reply within minutes during clinic hours."
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />
      <section className="section">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <ul className="grid gap-4 self-start sm:grid-cols-2 lg:grid-cols-1">
            {channels.map(({ Icon, title, value, href, event }) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:text-mint"><Icon size={22} aria-hidden="true" /></span>
                  <span>
                    <span className="block text-sm text-muted">{title}</span>
                    <span className="block break-all font-semibold text-heading">{value}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-4 rounded-3xl border border-line bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift";
              return (
                <li key={title}>
                  {event ? <TrackedLink href={href} event={event} params={{ location: "contact_page" }} className={cls}>{inner}</TrackedLink> : <a href={href} className={cls}>{inner}</a>}
                </li>
              );
            })}
          </ul>
          <div className="rounded-[2rem] border border-line bg-card p-6 shadow-soft sm:p-10">
            <h2 className="text-2xl font-extrabold">Send us a message</h2>
            <p className="mb-8 mt-2 text-muted">For appointments, the quickest way is our <a href="/book-appointment" className="link">online booking</a>.</p>
            <ContactForm />
          </div>
        </Container>
      </section>
      <LocationSection />
    </>
  );
}
