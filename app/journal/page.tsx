import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { CardReveal } from "@/components/motion/CardReveal";
import { formatJournalDate, getJournalEntries } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes, observations, and short essays from the studio — design process, illustration, tools, and short takes.",
};

export const revalidate = 60;

export default async function JournalPage() {
  const entries = await getJournalEntries();

  return (
    <section className="bg-semantic-surface-primary py-20 md:py-36">
      <Container>
        <div className="flex flex-col gap-12">
          {/* Hero block — same rhythm used on /work and /contact:
              SectionLabel, H1, full-width rule. */}
          <BlurReveal>
            <div className="flex flex-col gap-8">
              <SectionLabel>Journal</SectionLabel>
              <h1 className="text-h1 max-w-4xl text-semantic-text-primary">
                Notes from the studio.
              </h1>
              <HorizontalRule />
            </div>
          </BlurReveal>

          {entries.length === 0 ? (
            <BlurReveal>
              <p className="text-p2 text-semantic-text-secondary max-w-2xl">
                No entries yet. Check back soon — I&apos;ll be writing as I
                build.
              </p>
            </BlurReveal>
          ) : (
            // Two-column grid on desktop, single on mobile. CardReveal applies
            // a column-based stagger so the right column reveals first per row,
            // matching the home/work asymmetric pattern.
            <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
              {entries.map((entry, i) => (
                <CardReveal key={entry._id} columnIndex={(i % 2) as 0 | 1}>
                  <Link
                    href={`/journal/${entry.slug}`}
                    className="group flex flex-col gap-6"
                  >
                    {entry.coverImageUrl && (
                      <div className="relative aspect-[600/489] w-full overflow-hidden rounded-sm bg-semantic-border-light">
                        <Image
                          src={entry.coverImageUrl}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      {entry.publishedAt && (
                        <p className="text-journal-meta text-semantic-text-secondary">
                          {formatJournalDate(entry.publishedAt)}
                        </p>
                      )}
                      <h2 className="text-h3 text-semantic-text-primary">
                        {entry.title}
                      </h2>
                      {entry.summary && (
                        <p className="text-p2 text-semantic-text-secondary">
                          {entry.summary}
                        </p>
                      )}
                    </div>
                  </Link>
                </CardReveal>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
