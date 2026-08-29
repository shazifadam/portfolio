import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import {
  allCaseStudySlugsWithDatesQuery,
  allJournalSlugsWithDatesQuery,
} from "@/sanity/lib/queries";

const BASE_URL = SITE_URL;

// Static pages have no CMS timestamp to read, so their <lastmod> is pinned
// here — bump when static page copy changes. Emitting `new Date()` instead
// would tell crawlers every static page changed on every crawl, which makes
// the whole lastmod signal worthless.
const STATIC_LASTMOD = new Date("2026-08-29");

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
  { url: `${BASE_URL}/work`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/journal`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE_URL}/links`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE_URL}/cookies`, changeFrequency: "yearly", priority: 0.3 },
];

// Sanity's `_updatedAt` is an ISO string; guard against a malformed or
// missing value so one bad doc can't NaN the whole sitemap.
type DatedSlug = { slug: string; _updatedAt?: string };

function toLastModified(iso?: string): Date {
  if (!iso) return STATIC_LASTMOD;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? STATIC_LASTMOD : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let caseStudies: DatedSlug[] = [];
  let journalEntries: DatedSlug[] = [];
  try {
    caseStudies = await client.fetch<DatedSlug[]>(
      allCaseStudySlugsWithDatesQuery,
    );
  } catch {
    caseStudies = [];
  }
  try {
    journalEntries = await client.fetch<DatedSlug[]>(
      allJournalSlugsWithDatesQuery,
    );
  } catch {
    journalEntries = [];
  }

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((doc) => ({
    url: `${BASE_URL}/work/${doc.slug}`,
    lastModified: toLastModified(doc._updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journalEntries.map((doc) => ({
    url: `${BASE_URL}/journal/${doc.slug}`,
    lastModified: toLastModified(doc._updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...STATIC_ROUTES.map((entry) => ({
      ...entry,
      lastModified: STATIC_LASTMOD,
    })),
    ...caseStudyRoutes,
    ...journalRoutes,
  ];
}
