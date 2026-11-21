import Link from "next/link";
import { ArrowLeft, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ToothIcon } from "@/components/ui/Icon";
import { services } from "@/data/services";

export default function NotFound() {
  return (
    <section className="section">
      <Container className="max-w-2xl text-center">
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] bg-surface text-primary dark:text-mint">
          <ToothIcon size={56} strokeWidth={1.5} />
          <span className="absolute -right-3 -top-3 rounded-full bg-coral px-3 py-1 font-display text-sm font-extrabold text-navy">404</span>
        </div>
        <h1 className="mt-8 text-4xl font-extrabold sm:text-5xl">Looks like this page has gone missing</h1>
        <p className="mt-4 text-lg text-muted">Like a lost tooth, it&apos;s not where it should be. Let&apos;s get you back to something healthier.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary"><ArrowLeft size={18} aria-hidden="true" /> Back to home</Button>
          <Button href="/book-appointment" variant="accent"><CalendarCheck size={18} aria-hidden="true" /> Book appointment</Button>
        </div>
        <div className="mt-12 text-left">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted">Popular treatments</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="block rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-heading hover:border-primary hover:text-primary">{s.title}</Link></li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
