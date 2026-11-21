import { cn } from "@/lib/utils";

export function Card({ className, interactive, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-line bg-card p-6 shadow-soft",
        interactive && "transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
