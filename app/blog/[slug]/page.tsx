import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck, Clock } from "lucide-react";
import { blogPosts, getPost, type Block } from "@/data/blog";
import { getDoctor } from "@/data/doctors";
import { getService } from "@/data/services";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SmartImage } from "@/components/ui/SmartImage";
import { BlogCard } from "@/components/sections/BlogCard";
import { articleSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, image: p.image, type: "article", publishedTime: p.date });
}

function RenderBlock({ b }: { b: Block }) {
  switch (b.type) {
    case "h2": return <h2>{b.text}</h2>;
    case "h3": return <h3>{b.text}</h3>;
    case "ul": return <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
    case "ol": return <ol>{b.items.map((i) => <li key={i}>{i}</li>)}</ol>;
    case "quote": return <blockquote>{b.text}</blockquote>;
    default: return <p>{b.text}</p>;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const author = getDoctor(p.authorSlug);
  const service = p.relatedService ? getService(p.relatedService) : undefined;
  const more = blogPosts.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema(p)} />
      <article>
        <header className="bg-surface pb-12 pt-10 sm:pt-14">
          <Container className="max-w-3xl">
            <Breadcrumbs items={[{ name: "Dental Tips", href: "/blog" }, { name: p.title, href: `/blog/${p.slug}` }]} />
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <Badge>{p.category}</Badge>
              <span className="flex items-center gap-1"><Clock size={14} aria-hidden="true" /> {p.readingTime} min read</span>
            </div>
            <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-5xl">{p.title}</h1>
            <p className="mt-4 text-lg text-muted">{p.excerpt}</p>
            <div className="mt-6 flex items-center gap-3">
              {author && (
                <span className="relative h-11 w-11 overflow-hidden rounded-full bg-card">
                  <SmartImage src={author.image} alt="" fill sizes="44px" className="object-cover" />
                </span>
              )}
              <div className="text-sm">
                {author ? <Link href={`/doctors/${author.slug}`} className="font-semibold text-heading hover:text-primary">{p.author}</Link> : <span className="font-semibold">{p.author}</span>}
                <p className="text-muted">Published <time dateTime={p.date}>{formatDate(p.date)}</time></p>
              </div>
            </div>
          </Container>
        </header>

        <Container className="max-w-3xl">
          <div className="relative mb-10 mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-surface shadow-soft">
            <SmartImage src={p.image} alt={p.imageAlt} fill priority sizes="(min-width: 768px) 720px, 92vw" className="object-cover" />
          </div>
          <div className="prose-clinic">
            {p.content.map((b, i) => <RenderBlock key={i} b={b} />)}
          </div>

          {service && (
            <aside className="my-12 flex flex-col items-start gap-4 rounded-3xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-sm font-semibold text-mint">Related treatment</p>
                <p className="mt-1 font-display text-xl font-bold text-white">{service.title}</p>
              </div>
              <Button href={`/book-appointment?service=${service.slug}`} variant="accent">
                <CalendarCheck size={18} aria-hidden="true" /> Book a consultation
              </Button>
            </aside>
          )}

          <p className="mb-6 rounded-2xl bg-surface p-4 text-xs text-muted">
            This article is for general information only and isn&apos;t a substitute for a personal dental examination.
          </p>
          <Link href="/blog" className="link inline-flex items-center gap-2"><ArrowLeft size={16} aria-hidden="true" /> All articles</Link>
        </Container>
      </article>

      <section className="section mt-12 bg-surface" aria-labelledby="more-title">
        <Container>
          <h2 id="more-title" className="mb-8 text-2xl font-bold">Keep reading</h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {more.map((m) => <li key={m.slug}><BlogCard post={m} /></li>)}
          </ul>
        </Container>
      </section>
    </>
  );
}
