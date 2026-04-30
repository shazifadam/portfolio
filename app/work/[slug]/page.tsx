import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/layout/Container";
import { TagPill } from "@/components/ui/TagPill";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { SectionBlock } from "@/components/case-study/SectionBlock";
import { PortableBody } from "@/components/case-study/PortableBody";
import {
  ContentBlock,
  type ContentBlockData,
} from "@/components/case-study/ContentBlock";
import { WorkGrid } from "@/components/case-study/WorkGrid";
import { mapSanityCard, type SanityCaseStudyCard } from "@/lib/case-studies";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  caseStudyBySlugQuery,
  allCaseStudySlugsQuery,
} from "@/sanity/lib/queries";
import type { TagValue } from "@/lib/tags";
import type { SanityImageSource } from "@sanity/image-url";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(allCaseStudySlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

type PostLaunchBlock = {
  _key: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
};

type CaseStudyDoc = SanityCaseStudyCard & {
  publishedAt?: string;
  showOverview?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overviewBody?: any[];
  showChallenges?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  challengesBody?: any[];
  showObjectives?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objectivesBody?: any[];
  showApproach?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  approachBody?: any[];
  contentBlocks?: ContentBlockData[];
  showPostLaunch?: boolean;
  postLaunchBlocks?: PostLaunchBlock[];
  similarStudies?: SanityCaseStudyCard[];
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const doc = await client.fetch<CaseStudyDoc | null>(caseStudyBySlugQuery, {
      slug: params.slug,
    });
    if (!doc) return { title: "Case Study" };

    // OG description follows Shazif's spec — title-with-byline, identical
    // for every shared case-study link, distinct from the body description
    // search engines crawl. Cover image (1200×630 crop) is generated via
    // Sanity's URL builder; if there's no cover, fall back to the default
    // /og/case-studies.svg from the /work listing.
    const description = `${doc.titleStart} — Shazif Adam`;
    const ogImage = doc.coverImage
      ? urlFor(doc.coverImage as SanityImageSource)
          .width(1200)
          .height(630)
          .quality(85)
          .url()
      : "/og/case-studies.svg";

    return {
      title: doc.titleStart,
      description,
      openGraph: {
        title: `${doc.titleStart} — Shazif Adam`,
        description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${doc.titleStart} — Shazif Adam`,
          },
        ],
      },
      twitter: {
        title: `${doc.titleStart} — Shazif Adam`,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return { title: "Case Study" };
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  let doc: CaseStudyDoc | null = null;
  try {
    doc = await client.fetch(caseStudyBySlugQuery, { slug: params.slug });
  } catch {
    doc = null;
  }
  if (!doc) notFound();

  const coverUrl = doc.coverImage
    ? urlFor(doc.coverImage as SanityImageSource).width(2400).quality(85).url()
    : null;

  const hasPostLaunch =
    doc.showPostLaunch && (doc.postLaunchBlocks?.length ?? 0) > 0;
  const hasSimilar = (doc.similarStudies?.length ?? 0) > 0;

  return (
    <article>
      {/* ── White section: header + cover + sections + content blocks ─────
          Padding mirrors the Figma frame (pt-80 / pb-144 → py-20 / md:py-36).
          The WHOLE prose stack lives in this single section so backgrounds
          stay clean while bodies share the xl:pl-[350px] indent rhythm. */}
      <section className="bg-brand-white py-20 md:py-36">
        <Container>
          <div className="flex flex-col gap-10">
            {/* Title block */}
            <BlurReveal>
              <div className="flex flex-col gap-4">
                <Link
                  href="/work"
                  className="text-p3 text-semantic-text-secondary hover:text-brand-black transition-colors inline-flex items-center gap-2"
                >
                  <BackArrowIcon />
                  Back to Case Studies
                </Link>
                <h1 className="text-h1 text-brand-black">
                  <span
                    style={
                      doc.titleStartColor
                        ? { color: doc.titleStartColor }
                        : undefined
                    }
                  >
                    {doc.titleStart}
                  </span>
                  {doc.titleEnd && (
                    <>
                      {" "}
                      <span className="text-semantic-border-light">—</span>{" "}
                      {doc.titleEnd}
                    </>
                  )}
                </h1>
                {doc.tags && doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {doc.tags.map((t: TagValue) => (
                      <TagPill key={t} tag={t} />
                    ))}
                  </div>
                )}
              </div>
            </BlurReveal>

            {/* Cover */}
            {coverUrl && (
              <BlurReveal>
                <div className="relative aspect-[1232/720] w-full overflow-hidden rounded-sm bg-semantic-border-light">
                  <Image
                    src={coverUrl}
                    alt={doc.titleStart}
                    fill
                    sizes="(max-width: 768px) 100vw, 1232px"
                    className="object-cover"
                    priority
                  />
                </div>
              </BlurReveal>
            )}

            {/* Overview → Challenges → Objectives → Approach. Each gated by
                its own show* boolean. Order is fixed (matches Figma 183:3688). */}
            {doc.showOverview && doc.overviewBody && (
              <SectionBlock heading="Overview">
                <PortableBody value={doc.overviewBody} />
              </SectionBlock>
            )}
            {doc.showChallenges && doc.challengesBody && (
              <SectionBlock heading="Challenges">
                <PortableBody value={doc.challengesBody} />
              </SectionBlock>
            )}
            {doc.showObjectives && doc.objectivesBody && (
              <SectionBlock heading="Objectives">
                <PortableBody value={doc.objectivesBody} />
              </SectionBlock>
            )}
            {doc.showApproach && doc.approachBody && (
              <SectionBlock heading="Approach">
                <PortableBody value={doc.approachBody} />
              </SectionBlock>
            )}

            {/* Free-form content blocks (photoBlock + textBlock), in the
                order the editor arranged them. Renders after the four
                standard sections, before Post Launch. */}
            {doc.contentBlocks?.map((block) => (
              <ContentBlock key={block._key} block={block} />
            ))}

            {/* Post Launch Success */}
            {hasPostLaunch && (
              <SectionBlock heading="Post Launch Success" fullWidth>
                <div className="grid grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-2">
                  {doc.postLaunchBlocks!.map((b) => (
                    <div key={b._key} className="flex flex-col gap-1">
                      {b.title && (
                        <h3 className="text-p1 text-semantic-text-primary">
                          {b.title}
                        </h3>
                      )}
                      {b.body && (
                        <div className="text-p2 text-semantic-text-secondary flex flex-col gap-[1lh]">
                          <PortableText value={b.body} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SectionBlock>
            )}
          </div>
        </Container>
      </section>

      {/* ── Light-bg section: similar case studies ─────────────────────────
          Reuses the same WorkGrid masonry as home/work — 2 references max,
          enforced by the Sanity schema. Hidden entirely when none. */}
      {hasSimilar && (
        <section className="bg-semantic-surface-primary py-20 md:py-36">
          <Container>
            <SectionBlock heading="Similar Case Studies" fullWidth>
              <WorkGrid items={doc.similarStudies!.map(mapSanityCard)} />
            </SectionBlock>
          </Container>
        </section>
      )}
    </article>
  );
}

// Small inline 24×24 left arrow used for the breadcrumb. Inline to avoid
// adding a new svg asset for one icon.
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
