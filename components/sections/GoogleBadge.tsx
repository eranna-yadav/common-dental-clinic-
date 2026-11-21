import { site } from "@/lib/site";
import { StarRating } from "@/components/ui/StarRating";

export function GoogleBadge() {
  return (
    <a
      href={site.googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-4 rounded-2xl border border-line bg-card px-5 py-3 shadow-soft transition-shadow hover:shadow-lift"
      aria-label={`Rated ${site.rating.value} out of 5 from ${site.rating.count} Google reviews — read reviews on Google`}
    >
      <svg width="28" height="28" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
        <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
      </svg>
      <span>
        <span className="flex items-center gap-2">
          <span className="font-display text-xl font-extrabold text-heading">{site.rating.value}</span>
          <StarRating value={site.rating.value} size={15} />
        </span>
        <span className="block text-xs text-muted">{site.rating.count.toLocaleString("en-IN")}+ reviews on Google</span>
      </span>
    </a>
  );
}
