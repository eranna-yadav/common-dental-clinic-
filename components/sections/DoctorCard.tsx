import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Doctor } from "@/data/doctors";
import { SmartImage } from "@/components/ui/SmartImage";

export function DoctorCard({ doctor, headingLevel: H = "h3" }: { doctor: Doctor; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <SmartImage src={doctor.image} alt={doctor.imageAlt} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-card/95 px-3 py-1 text-xs font-bold text-heading shadow-soft backdrop-blur">
          {doctor.experienceYears}+ yrs experience
        </span>
      </div>
      <div className="p-5">
        <H className="text-lg font-bold">
          <Link href={`/doctors/${doctor.slug}`} className="after:absolute after:inset-0">
            {doctor.name}
          </Link>
        </H>
        <p className="mt-1 text-sm font-medium text-link">{doctor.qualifications}</p>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{doctor.title}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-heading">
          View profile <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
