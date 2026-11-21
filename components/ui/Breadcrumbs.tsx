import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items, invert }: { items: Crumb[]; invert?: boolean }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className={`flex flex-wrap items-center gap-1 text-sm ${invert ? "text-slate-300" : "text-muted"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className={invert ? "font-medium text-white" : "font-medium text-heading"}>{c.name}</span>
                ) : (
                  <>
                    <Link href={c.href} className={invert ? "hover:text-mint" : "hover:text-primary"}>{c.name}</Link>
                    <ChevronRight size={14} aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
