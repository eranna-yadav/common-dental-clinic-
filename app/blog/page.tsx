import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { BlogExplorer } from "@/components/sections/BlogExplorer";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Dental Tips & Oral Health Blog",
  description: `Practical dental advice from the specialists at ${site.name}, ${site.address.city}: root canals, braces vs aligners, kids' teeth and more.`,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Dental tips"
        title="Advice from our dentists"
        description="Clear, practical guidance to help you and your family keep healthy smiles — written by our specialists."
        crumbs={[{ name: "Dental Tips", href: "/blog" }]}
      />
      <section className="section">
        <Container><BlogExplorer /></Container>
      </section>
    </>
  );
}
