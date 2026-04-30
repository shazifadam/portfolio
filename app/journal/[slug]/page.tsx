import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { CardReveal } from "@/components/motion/CardReveal";
import { JournalBody } from "@/components/journal/JournalBody";
import {
  formatJournalDate,
  getAllJournalSlugs,
  getJournalEntries,
  getJournalEntry,
} from "@/lib/journal";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllJournalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const entry = await getJournalEntry(params.slug);
  if (!entry) return { title: "Journal" };
  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function JournalEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const [entry, allEntries] = await Promise.all([
    getJournalEntry(params.slug),
    getJournalEntries(),
  ]);
  if (!entry) notFound();

  // "More from Offcuts" — up to two other entries, excluding the current
  // one. Falls back gracefully when the dataset has fewer entries.
  const moreEntries = allEntries.filter((e) => e.slug !== params.slug).slice(0, 2);

  return (
    <article>
      <section className="bg-brand-white py-20 md:py-36">
        <Container>
          {/* Article column — 770px on desktop, full-width on mobile. */}
          <div className="mx-auto flex max-w-[770px] flex-col gap-10">
            {/* Header: title → author block. Title and author row are both
                centred horizontally; byline + date stay left-aligned within
                the row so the two text lines align flush against the
                headshot's right edge. `text-balance` evens out the
                multi-line title for a tighter visual block. */}
            <BlurReveal>
              <div className="flex flex-col items-center gap-10 text-center">
                <h1 className="text-h2 text-balance text-semantic-text-primary">
                  {entry.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-semantic-border-light">
                    <Image
                      src="/images/headshot-1.png"
                      alt="Shazif Adam"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-p2 text-semantic-text-primary">
                      by Shazif Adam
                    </span>
                    {entry.publishedAt && (
                      <span className="text-journal-meta text-semantic-text-secondary">
                        On {formatJournalDate(entry.publishedAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </BlurReveal>

            <BlurReveal>
              <JournalBody value={entry.body} />
            </BlurReveal>
          </div>
        </Container>
      </section>

      {/* More from Offcuts — surfaces up to two other entries on its own
          primary-bg section so the colour shift signals "you're done with
          the article, here's more". Hidden when there aren't any other
          entries. Heading and grid are left-aligned by default; the
          wrapper drops its mobile max-width on desktop so the grid spans
          the full container. */}
      {moreEntries.length > 0 && (
        <section className="bg-semantic-surface-primary py-20 md:py-36">
          <Container>
            <div className="mx-auto flex max-w-[520px] flex-col gap-10 md:max-w-none">
              <BlurReveal>
                <h2 className="text-h2 text-semantic-text-primary">
                  More from Offcuts
                </h2>
              </BlurReveal>

              <div className="grid w-full grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
                {moreEntries.map((other, i) => (
                  <CardReveal
                    key={other._id}
                    columnIndex={(i % 2) as 0 | 1}
                  >
                    <Link
                      href={`/journal/${other.slug}`}
                      className="group flex flex-col gap-6"
                    >
                      {other.coverImageUrl && (
                        <div className="relative aspect-[10/7] w-full overflow-hidden rounded-sm bg-semantic-border-light">
                          <Image
                            src={other.coverImageUrl}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-3">
                        {other.publishedAt && (
                          <p className="text-journal-meta text-semantic-text-secondary">
                            {formatJournalDate(other.publishedAt)}
                          </p>
                        )}
                        <h3 className="text-h3 text-semantic-text-primary">
                          {other.title}
                        </h3>
                        {other.summary && (
                          <p className="text-p2 text-semantic-text-secondary">
                            {other.summary}
                          </p>
                        )}
                      </div>
                    </Link>
                  </CardReveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}

