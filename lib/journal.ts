import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  allJournalSlugsQuery,
  journalEntriesQuery,
  journalEntryBySlugQuery,
} from "@/sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";

export type JournalListEntry = {
  _id: string;
  slug: string;
  title: string;
  summary?: string;
  coverImageUrl?: string;
  publishedAt?: string;
  tags?: string[];
};

type SanityJournalListEntry = {
  _id: string;
  slug: string;
  title: string;
  summary?: string;
  coverImage?: SanityImageSource;
  publishedAt?: string;
  tags?: string[];
};

function mapListEntry(doc: SanityJournalListEntry): JournalListEntry {
  return {
    _id: doc._id,
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary,
    coverImageUrl: doc.coverImage
      ? urlFor(doc.coverImage).width(1200).quality(85).url()
      : undefined,
    publishedAt: doc.publishedAt,
    tags: doc.tags,
  };
}

export async function getJournalEntries(): Promise<JournalListEntry[]> {
  try {
    const docs = await client.fetch<SanityJournalListEntry[]>(journalEntriesQuery);
    return docs.map(mapListEntry);
  } catch (err) {
    console.warn("[sanity] journal entries fetch failed", err);
    return [];
  }
}

export async function getAllJournalSlugs(): Promise<string[]> {
  try {
    return await client.fetch<string[]>(allJournalSlugsQuery);
  } catch {
    return [];
  }
}

// Single-entry shape passed to the slug page. Body kept as opaque any[] —
// the PortableText renderer handles the per-block discriminator.
export type JournalEntry = {
  _id: string;
  slug: string;
  title: string;
  summary?: string;
  coverImageUrl?: string;
  publishedAt?: string;
  tags?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
};

type SanityJournalEntry = SanityJournalListEntry & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
};

export async function getJournalEntry(
  slug: string,
): Promise<JournalEntry | null> {
  try {
    const doc = await client.fetch<SanityJournalEntry | null>(
      journalEntryBySlugQuery,
      { slug },
    );
    if (!doc) return null;
    return {
      _id: doc._id,
      slug: doc.slug,
      title: doc.title,
      summary: doc.summary,
      coverImageUrl: doc.coverImage
        ? urlFor(doc.coverImage).width(2400).quality(85).url()
        : undefined,
      publishedAt: doc.publishedAt,
      tags: doc.tags,
      body: doc.body,
    };
  } catch (err) {
    console.warn("[sanity] journal entry fetch failed", err);
    return null;
  }
}

// Format an ISO date into "MMM DD, YYYY" — e.g. "Apr 29, 2026". Used both
// in the listing card and the article header. Returns "" for missing dates
// so callers can safely fall back to skipping the meta line.
export function formatJournalDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
