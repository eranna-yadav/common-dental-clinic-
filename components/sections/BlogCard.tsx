import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPostWithMeta } from "@/data/blog";
import { Badge } from "@/components/ui/Badge";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post, headingLevel: H = "h3" }: { post: BlogPostWithMeta; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <SmartImage src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-muted">
          <Badge>{post.category}</Badge>
          <span className="flex items-center gap-1"><Clock size={13} aria-hidden="true" /> {post.readingTime} min read</span>
        </div>
        <H className="mt-4 text-lg font-bold leading-snug">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-primary dark:group-hover:text-mint">
            {post.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <p className="mt-5 text-xs text-muted">
          {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </div>
    </article>
  );
}
