import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

/** Shared hero for inner pages — always renders the page's single H1. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-10 text-white sm:pb-20 sm:pt-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-mint/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.06)_1px,transparent_0)] [background-size:24px_24px]" />
      </div>
      <Container className="relative">
        <Breadcrumbs items={crumbs} invert />
        {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-mint">{eyebrow}</p>}
        <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-tight text-white sm:text-5xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
