import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "./BlogCard";

export function BlogPreview() {
  return (
    <section className="section bg-surface" aria-labelledby="blog-title">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading id="blog-title" align="left" eyebrow="Dental tips" title="Advice from our dentists" className="mb-0 sm:mb-0" />
          <Button href="/blog" variant="ghost">
            Read all articles <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.08}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
