import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** TODO: replace with the clinic's real logo (SVG recommended). */
export function Logo({ invert, className }: { invert?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#14B8A6] text-white shadow-glow transition-transform group-hover:rotate-6">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5.5C10.5 4 8.6 3 6.8 3.3 4.4 3.7 3 5.9 3.2 8.6c.2 2.4 1.2 4 1.8 6.2.6 2.2.8 6.2 2.6 6.2 1.6 0 1.8-3 2.2-4.7.3-1.2.9-2.1 2.2-2.1s1.9.9 2.2 2.1c.4 1.7.6 4.7 2.2 4.7 1.8 0 2-4 2.6-6.2.6-2.2 1.6-3.8 1.8-6.2.2-2.7-1.2-4.9-3.6-5.3C15.4 3 13.5 4 12 5.5Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-lg font-extrabold tracking-tight", invert ? "text-white" : "text-heading")}>
          {site.shortName.split(" ")[0]}
          <span className={invert ? "text-mint" : "text-primary dark:text-mint"}> {site.shortName.split(" ").slice(1).join(" ")}</span>
        </span>
        <span className={cn("mt-1 whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.2em]", invert ? "text-slate-400" : "text-muted")}>
          Studio · {site.address.city}
        </span>
        <span className="sr-only"> — home</span>
      </span>
    </Link>
  );
}
