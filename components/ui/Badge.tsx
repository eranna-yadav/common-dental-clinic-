import { cn } from "@/lib/utils";

type Tone = "primary" | "coral" | "mint" | "neutral" | "dark";
const tones: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary dark:bg-mint/10 dark:text-mint",
  coral: "bg-coral text-navy",
  mint: "bg-mint/25 text-navy dark:text-mint",
  neutral: "bg-surface text-ink border border-line",
  dark: "bg-navy text-white",
};

export function Badge({ tone = "primary", className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide", tones[tone], className)}>
      {children}
    </span>
  );
}
