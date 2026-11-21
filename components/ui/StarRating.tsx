import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ value, size = 16, className }: { value: number; size?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} role="img" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          aria-hidden="true"
          className={i < Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-line text-line"}
        />
      ))}
    </div>
  );
}
