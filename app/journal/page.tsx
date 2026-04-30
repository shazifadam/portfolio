import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { CardReveal } from "@/components/motion/CardReveal";
import {
  formatJournalDate,
  getJournalEntries,
  type JournalListEntry,
} from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes, observations, and short essays from the studio — design process, illustration, tools, and short takes.",
};

export const revalidate = 60;

export default async function JournalPage() {
  const entries = await getJournalEntries();

  // Desktop layout: latest 2 on top in a 2-column grid, the rest below in
  // a 3-column grid that flows downward. Mobile collapses both to a single
  // stacked column so the visual order ends up "latest first" naturally.
  const featuredEntries = entries.slice(0, 2);
  const remainingEntries = entries.slice(2);

  return (
    <section className="bg-semantic-surface-primary py-20 md:py-36">
      <Container>
        <div className="flex flex-col gap-16 md:gap-20">
          <BlurReveal>
            <div className="flex flex-col gap-8">
              <SectionLabel>Journal</SectionLabel>
              <h1 className="text-h1 max-w-4xl text-semantic-text-primary">
                The Offcut
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
            <>
              {/* Latest 2 — 2-col on desktop, 1-col on mobile. CardReveal's
                  columnIndex applies the right-first row stagger only on
                  desktop. */}
              <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
                {featuredEntries.map((entry, i) => (
                  <CardReveal
                    key={entry._id}
                    columnIndex={(i % 2) as 0 | 1}
                  >
                    <JournalCard entry={entry} />
                  </CardReveal>
                ))}
              </div>

              {/* Rest — 3-col on desktop, 1-col on mobile. Each card uses
                  BlurReveal so it animates in independently as it scrolls
                  into view (the 3-col grid doesn't fit CardReveal's 0|1
                  column model). */}
              {remainingEntries.length > 0 && (
                <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3 md:gap-y-20">
                  {remainingEntries.map((entry) => (
                    <BlurReveal key={entry._id}>
                      <JournalCard entry={entry} />
                    </BlurReveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

// Single card — image, title, summary, "PUBLISHED ON {date}". Used in
// both the top 2-col grid and the bottom 3-col grid; the wrapping grid
// owns the column width so the card always fills its slot.
function JournalCard({ entry }: { entry: JournalListEntry }) {
  return (
    <Link
      href={`/journal/${entry.slug}`}
      className="group flex flex-col gap-6"
    >
      {entry.coverImageUrl && (
        <div className="relative aspect-[10/7] w-full overflow-hidden rounded-sm bg-semantic-border-light">
          <Image
            src={entry.coverImageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <h2 className="text-h3 text-semantic-text-primary">{entry.title}</h2>
        {entry.summary && (
          <p className="text-journal-body text-semantic-text-secondary">
            {entry.summary}
          </p>
        )}
        {entry.publishedAt && (
          <p className="text-journal-meta text-semantic-text-secondary">
            Published on {formatJournalDate(entry.publishedAt)}
          </p>
        )}
      </div>
    </Link>
  );
}
