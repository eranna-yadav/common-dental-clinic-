import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "white" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap select-none";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white shadow-glow hover:bg-primary-dark hover:-translate-y-0.5",
  // Navy text on coral keeps AA contrast (white on coral would fail)
  accent: "bg-coral text-navy shadow-[0_10px_30px_-10px_rgb(255_122_89/0.6)] hover:bg-coral-dark hover:-translate-y-0.5",
  secondary: "border border-primary/30 bg-card text-primary hover:border-primary hover:bg-primary/5 dark:text-mint dark:border-mint/30 dark:hover:border-mint",
  ghost: "text-link hover:bg-primary/10",
  white: "bg-white text-navy hover:bg-mint/90 shadow-soft",
  "outline-light": "border border-white/30 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

type ButtonAsButton = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant, size, className, children, ...rest } = props;
  const cls = buttonClass(variant, size, className);
  if (typeof rest.href === "string") {
    const { href, ...anchor } = rest as ButtonAsLink;
    const external = /^(https?:|tel:|mailto:)/.test(href);
    if (external) {
      const newTab = href.startsWith("http");
      return (
        <a href={href} className={cls} {...(newTab && { target: "_blank", rel: "noopener noreferrer" })} {...anchor}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...anchor}>
        {children}
      </Link>
    );
  }
  const { type = "button", ...btn } = rest as ButtonAsButton;
  return (
    <button type={type} className={cls} {...btn}>
      {children}
    </button>
  );
}
