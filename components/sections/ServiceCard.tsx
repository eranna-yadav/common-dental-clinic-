import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import { Icon } from "@/components/ui/Icon";
import { formatINR } from "@/lib/utils";

export function ServiceCard({ service, showPrice = false, headingLevel: H = "h3" }: { service: Service; showPrice?: boolean; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mint/30 to-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 dark:text-mint">
        <Icon name={service.icon} size={26} />
      </span>
      <H className="mt-5 text-lg font-bold">
        <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none">
          {service.title}
        </Link>
      </H>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{service.summary}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-link">
          Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
        {showPrice && <span className="text-sm text-muted">from <strong className="text-heading">{formatINR(service.priceFrom)}</strong></span>}
      </div>
    </article>
  );
}
