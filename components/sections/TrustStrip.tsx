import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { paymentPartners, trustItems } from "@/data/features";

export function TrustStrip() {
  return (
    <section aria-label="Why patients trust us" className="border-y border-line bg-card py-8">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {trustItems.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-primary dark:text-mint">
                <Icon name={item.icon} size={20} />
              </span>
              <span className="text-sm font-semibold leading-tight text-heading">{item.label}</span>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line pt-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">Payment & insurance partners</span>
          {paymentPartners.map((p) => (
            <span key={p} className="font-display text-sm font-bold text-muted">{p}</span>
          ))}
        </div>
      </Container>
    </section>
  );
}
