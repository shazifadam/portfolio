import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { JournalBody } from "@/components/journal/JournalBody";
import {
  formatJournalDate,
  getAllJournalSlugs,
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
  const entry = await getJournalEntry(params.slug);
  if (!entry) notFound();

  return (
    <article>
      <section className="bg-semantic-surface-primary py-20 md:py-36">
        <Container>
          {/* Article column — narrower than the rest of the site so prose
              measures comfortably. ~720px is a standard reader-friendly
              width for serif body text. */}
          <div className="mx-auto flex max-w-[720px] flex-col gap-10">
            {/* Breadcrumb back to the listing */}
            <BlurReveal>
              <Link
                href="/journal"
                className="text-p3 text-semantic-text-secondary hover:text-brand-black transition-colors inline-flex items-center gap-2"
              >
                <BackArrowIcon />
                Back to Journal
              </Link>
            </BlurReveal>

            {/* Header — date, title, byline. Order matches typical
                reader-first article layout. */}
            <BlurReveal>
              <div className="flex flex-col gap-4">
                {entry.publishedAt && (
                  <p className="text-journal-meta text-semantic-text-secondary">
                    Published on {formatJournalDate(entry.publishedAt)}
                  </p>
                )}
                <h1 className="text-h2 text-semantic-text-primary">
                  {entry.title}
                </h1>
                <p className="text-p1 text-semantic-text-secondary">
                  by Shazif Adam
                </p>
              </div>
            </BlurReveal>

            {/* Optional cover image */}
            {entry.coverImageUrl && (
              <BlurReveal>
                <div className="relative aspect-[1232/720] w-full overflow-hidden rounded-sm bg-semantic-border-light">
                  <Image
                    src={entry.coverImageUrl}
                    alt={entry.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover"
                    priority
                  />
                </div>
              </BlurReveal>
            )}

            {/* Body — Portable Text rendered with journal typography */}
            <BlurReveal>
              <JournalBody value={entry.body} />
            </BlurReveal>
          </div>
        </Container>
      </section>
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
