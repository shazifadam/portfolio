import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { TagPill } from "@/components/ui/TagPill";
import { client } from "@/sanity/lib/client";
import {
  caseStudyBySlugQuery,
  allCaseStudySlugsQuery,
} from "@/sanity/lib/queries";
import type { TagValue } from "@/lib/tags";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(allCaseStudySlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

type CaseStudyDoc = {
  _id: string;
  slug: string;
  titleStart: string;
  titleStartColor?: string;
  titleEnd?: string;
  tags?: TagValue[];
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
    return {
      title: doc.titleStart,
      description: doc.titleEnd,
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

  return (
    <article>
      <section className="bg-brand-lightest pt-16 pb-12">
        <Container className="flex flex-col gap-6">
          <p className="text-p3 text-semantic-text-secondary">
            <Link href="/work">Work</Link> / {doc.titleStart}
          </p>
          <h1 className="text-h1">
            <span style={{ color: doc.titleStartColor ?? "inherit" }}>
              {doc.titleStart}
            </span>
            {doc.titleEnd && (
              <>
                {" "}
                <span className="text-semantic-text-primary">
                  — {doc.titleEnd}
                </span>
              </>
            )}
          </h1>
          {doc.tags && doc.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {doc.tags.map((t) => (
                <TagPill key={t} tag={t} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Phase 3: cover image, overview, contentBlocks, challenges/objectives/approach,
          post-launch, similar studies. See CLAUDE.md §5.3. */}
    </article>
  );
}
