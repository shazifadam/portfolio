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
      <section className="bg-semantic-surface-primary py-20 md:py-36">
        <Container>
          {/* Article column — narrow on desktop (520px) for a tight prose
              measure, full-width on mobile. */}
          <div className="mx-auto flex max-w-[520px] flex-col gap-10">
            <BlurReveal>
              <Link
                href="/journal"
                className="text-p3 text-semantic-text-secondary hover:text-brand-black transition-colors inline-flex items-center gap-2"
              >
                <BackArrowIcon />
                Back to Journal
              </Link>
            </BlurReveal>

            {/* Header: title → author block (headshot + byline + date).
                Both blocks centred — title text-centred, author container
                centred via mx-auto so the headshot + byline form a tight
                centred unit beneath the title. */}
            <BlurReveal>
              <div className="flex flex-col items-center gap-6 text-center">
                <h1 className="text-h2 text-semantic-text-primary">
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
                    <span className="text-p1 text-semantic-text-primary">
                      by Shazif Adam
                    </span>
                    {entry.publishedAt && (
                      <span className="text-journal-meta text-semantic-text-secondary">
                        Published on {formatJournalDate(entry.publishedAt)}
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

      {/* More from Offcuts — surfaces up to two other entries on a separate
          light-bg section. Hidden when there aren't any other entries. */}
      {moreEntries.length > 0 && (
        <section className="bg-semantic-surface-primary pb-20 md:pb-36">
          <Container>
            <div className="mx-auto flex max-w-[520px] flex-col gap-10 md:max-w-none md:items-center">
              <BlurReveal>
                <h2 className="text-h3 text-semantic-text-primary">
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

// Inline 24×24 left arrow for the breadcrumb — matches the case-study
// detail page's icon. Inline to avoid a one-off asset.
function BackArrowIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M19 12H5M5 12L11 6M5 12L11 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
