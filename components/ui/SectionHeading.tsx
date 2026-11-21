import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  invert?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "center", as: H = "h2", invert, className, id }: Props) {
  return (
    <Reveal className={cn("mb-10 max-w-2xl sm:mb-14", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-sm font-bold uppercase tracking-[0.14em]", invert ? "text-mint" : "text-primary dark:text-mint")}>
          {eyebrow}
        </p>
      )}
      <H id={id} className={cn("text-balance text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]", invert && "text-white")}>
        {title}
      </H>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", invert ? "text-slate-300" : "text-muted")}>{description}</p>
      )}
    </Reveal>
  );
}
