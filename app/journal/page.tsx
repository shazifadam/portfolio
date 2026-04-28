import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Journal",
  robots: { index: false, follow: false },
};

// Shell only — nav link is disabled at launch (see CLAUDE.md §5.6).
export default function JournalPage() {
  return (
    <section className="bg-brand-lightest pt-24 pb-32">
      <Container className="flex flex-col gap-6">
        <SectionLabel>Journal</SectionLabel>
        <h1 className="text-h1">Coming soon.</h1>
        <p className="text-p2 text-semantic-text-secondary max-w-2xl">
          The journal will live here. Schema is built and ready in Sanity; the
          nav link is disabled until launch sign-off.
        </p>
      </Container>
    </section>
  );
}
