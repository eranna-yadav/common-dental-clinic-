"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { site, telLink, whatsappLink } from "@/lib/site";
import { t } from "@/lib/i18n";
import { cn, formatTime12 } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { TrackedLink } from "./TrackedLink";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={cn("sticky top-0 z-50 transition-all duration-300", scrolled ? "glass shadow-soft" : "bg-bg/0")}>
      <div className="mx-auto flex h-[72px] max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap rounded-full px-2.5 py-2 text-[0.9rem] font-medium transition-colors xl:px-3",
                    isActive(item.href) ? "bg-primary/10 text-primary dark:bg-mint/10 dark:text-mint" : "text-heading hover:text-primary dark:hover:text-mint",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <TrackedLink
            href={telLink()}
            event="call_click"
            params={{ location: "header" }}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-heading hover:text-primary 2xl:flex dark:hover:text-mint"
          >
            <Phone size={16} className="text-primary dark:text-mint" aria-hidden="true" />
            {site.phone.display}
          </TrackedLink>
          <ThemeToggle />
          <Button href="/book-appointment" variant="accent" size="sm" className="hidden sm:inline-flex">
            <CalendarCheck size={16} aria-hidden="true" />
            {t.cta.book}
          </Button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-heading hover:bg-primary/10 lg:hidden"
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-bg lg:hidden"
          >
            <nav aria-label="Mobile" className="flex min-h-full flex-col px-6 pb-28 pt-6">
              <ul className="space-y-1">
                {[{ label: t.nav.home, href: "/" }, ...mainNav, { label: t.nav.testimonials, href: "/testimonials" }, { label: t.nav.faqs, href: "/faqs" }].map((item, i) => (
                  <m.li key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "block rounded-2xl px-4 py-3 font-display text-xl font-bold",
                        pathname === item.href ? "bg-primary/10 text-primary dark:text-mint" : "text-heading hover:bg-surface",
                      )}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3">
                <Button href="/book-appointment" variant="accent" size="lg">
                  <CalendarCheck size={18} aria-hidden="true" /> {t.cta.book}
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button href={telLink()} variant="secondary">
                    <Phone size={16} aria-hidden="true" /> {t.cta.call}
                  </Button>
                  <Button href={whatsappLink()} variant="secondary">{t.cta.whatsapp}</Button>
                </div>
                <p className="mt-2 text-center text-sm text-muted">{site.hours[0].days}: {formatTime12(site.openingTime)} – {formatTime12(site.closingTime)}</p>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
