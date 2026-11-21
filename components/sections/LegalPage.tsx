import { Container } from "@/components/ui/Container";
import { PageHero } from "./PageHero";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero title={title} crumbs={[{ name: title, href: path }]} description={`Last updated: ${updated}`} />
      <section className="section">
        <Container className="max-w-3xl">
          {/* TODO: Have these policies reviewed by a legal professional before launch. */}
          <div className="prose-clinic">{children}</div>
        </Container>
      </section>
    </>
  );
}
