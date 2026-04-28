import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HorizontalRule } from "@/components/ui/HorizontalRule";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="bg-semantic-surface-dark text-brand-lightest pt-24 pb-16">
        <Container className="flex flex-col gap-8">
          <SectionLabel className="text-brand-gray">About Me</SectionLabel>
          <h1 className="text-h1 max-w-4xl">
            I design digital products, brand systems, and websites. Then I build them.
          </h1>
          <HorizontalRule className="bg-brand-dark-gray/40" />
        </Container>
      </section>

      {/* Phase 3: bio (2-col), illustration strip, testimonials.
          See CLAUDE.md §5.4. */}
    </>
  );
}
