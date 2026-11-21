import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Button";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { directionsLink, fullAddress, site, telLink } from "@/lib/site";
import { formatTime12 } from "@/lib/utils";
import { MapEmbed } from "./MapEmbed";

export function LocationSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section className="section" aria-labelledby="location-title">
      <Container>
        <SectionHeading
          id="location-title"
          as={headingLevel}
          eyebrow="Visit us"
          title={<>Find us in {site.address.locality}, {site.address.city}</>}
          description="Conveniently located with easy parking and a short walk from the metro station."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4 rounded-3xl border border-line bg-card p-6 shadow-soft sm:p-8">
            <h3 className="text-xl font-bold">{site.name}</h3>
            <address className="space-y-5 not-italic">
              <p className="flex gap-4">
                <MapPin className="mt-0.5 shrink-0 text-primary dark:text-mint" size={20} aria-hidden="true" />
                <span>{fullAddress}</span>
              </p>
              <p className="flex gap-4">
                <Phone className="shrink-0 text-primary dark:text-mint" size={20} aria-hidden="true" />
                <TrackedLink href={telLink()} event="call_click" params={{ location: "location" }} className="link">{site.phone.display}</TrackedLink>
              </p>
              <p className="flex gap-4">
                <Mail className="shrink-0 text-primary dark:text-mint" size={20} aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="link">{site.email}</a>
              </p>
            </address>
            <div className="flex gap-4 border-t border-line pt-5">
              <Clock className="mt-0.5 shrink-0 text-primary dark:text-mint" size={20} aria-hidden="true" />
              <table className="w-full text-sm">
                <caption className="sr-only">Opening hours</caption>
                <tbody>
                  {site.hours.map((h) => (
                    <tr key={h.days}>
                      <th scope="row" className="py-1 text-left font-medium text-heading">{h.days}</th>
                      <td className="py-1 text-right">{h.open ? `${formatTime12(h.open)} – ${formatTime12(h.close!)}` : <span className="font-semibold text-error">Closed</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TrackedLink href={directionsLink()} event="directions_click" params={{ location: "location" }} className={buttonClass("primary", "md", "mt-2 w-full")}>
              <Navigation size={18} aria-hidden="true" /> Get directions
            </TrackedLink>
          </div>
          <MapEmbed className="min-h-[340px] lg:min-h-full" />
        </div>
      </Container>
    </section>
  );
}
