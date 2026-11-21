import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Info } from "lucide-react";
import { services } from "@/data/services";
import { offers, paymentPartners } from "@/data/features";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/sections/PageHero";
import { CostEstimator } from "@/components/sections/CostEstimator";
import { FaqSection } from "@/components/sections/FaqSection";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { faqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: `Dental Treatment Cost Guide ${new Date().getFullYear()} — ${site.address.city}`,
  description: `Transparent starting prices for root canals, implants, braces, aligners, whitening, crowns and more at ${site.name}, ${site.address.city}. 0% EMI available.`,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Treatment cost guide for {site.address.city}</>}
        description="Honest, upfront pricing. These are starting prices — you'll always receive a written estimate before any treatment begins."
        crumbs={[{ name: "Pricing", href: "/pricing" }]}
      />

      <section className="section" aria-labelledby="estimator-title">
        <Container><CostEstimator /></Container>
      </section>

      <section className="section bg-surface" aria-labelledby="price-table-title">
        <Container>
          <h2 id="price-table-title" className="mb-8 text-2xl font-extrabold sm:text-3xl">Starting prices by treatment</h2>
          <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-soft">
            <table className="w-full text-left text-sm sm:text-base">
              <caption className="sr-only">Dental treatment prices in Indian Rupees</caption>
              <thead className="bg-navy text-white">
                <tr>
                  <th scope="col" className="px-4 py-4 font-semibold sm:px-6">Treatment</th>
                  <th scope="col" className="hidden px-4 py-4 font-semibold md:table-cell sm:px-6">Typical range</th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold sm:px-6">From</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {services.map((s) => (
                  <tr key={s.slug} className="transition-colors hover:bg-surface/60">
                    <th scope="row" className="px-4 py-4 font-normal sm:px-6">
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-3 font-semibold text-heading hover:text-primary">
                        <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-primary sm:flex dark:text-mint"><Icon name={s.icon} size={18} /></span>
                        <span>{s.title}{s.priceUnit && <span className="block text-xs font-normal text-muted">{s.priceUnit}</span>}</span>
                      </Link>
                    </th>
                    <td className="hidden px-4 py-4 text-muted md:table-cell sm:px-6">{formatINR(s.priceFrom)} – {formatINR(s.priceTo)}</td>
                    <td className="px-4 py-4 text-right font-display text-base font-bold text-heading sm:px-6">{formatINR(s.priceFrom)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-card p-5 text-sm text-muted">
            <Info size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <strong className="text-heading">Disclaimer:</strong> Prices are indicative starting prices in Indian Rupees (₹), inclusive of applicable taxes, and are
              provided for general guidance only. The final cost depends on clinical findings, materials chosen and treatment complexity, and will be
              confirmed in a written treatment plan after your consultation. Prices may change without notice. {/* TODO: review prices with the clinic */}
            </span>
          </p>
        </Container>
      </section>

      <section className="section" aria-labelledby="payment-title">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="payment-title" className="text-2xl font-extrabold sm:text-3xl">Flexible ways to pay</h2>
            <p className="mt-3 text-muted">We accept UPI, all major cards, net banking and cash. Insurance claims are supported where dental cover applies, and 0% EMI is available on treatments above ₹15,000.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {paymentPartners.map((p) => (
                <li key={p} className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-heading">
                  <CreditCard size={14} className="text-primary dark:text-mint" aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-4">
            {offers.map((o) => (
              <li key={o.title} className="flex items-start gap-4 rounded-2xl border border-line bg-card p-5">
                <span className="rounded-full bg-coral px-2.5 py-0.5 text-xs font-bold text-navy">{o.badge}</span>
                <div>
                  <h3 className="font-sans text-base font-bold">{o.title}</h3>
                  <p className="mt-1 text-sm text-muted">{o.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FaqSection faqs={faqs.filter((f) => f.category === "Payments" || f.category === "General").slice(0, 5)} withSchema={false} />
      <AppointmentCta />
    </>
  );
}
