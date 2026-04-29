import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import {
  allCaseStudySlugsQuery,
  allJournalSlugsQuery,
} from "@/sanity/lib/queries";

const BASE_URL = "https://shazifadam.com";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
  { url: `${BASE_URL}/work`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/journal`, changeFrequency: "weekly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let caseStudySlugs: string[] = [];
  let journalSlugs: string[] = [];
  try {
    caseStudySlugs = await client.fetch<string[]>(allCaseStudySlugsQuery);
  } catch {
    caseStudySlugs = [];
  }
  try {
    journalSlugs = await client.fetch<string[]>(allJournalSlugsQuery);
  } catch {
    journalSlugs = [];
  }

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${BASE_URL}/work/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journalSlugs.map((slug) => ({
    url: `${BASE_URL}/journal/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const now = new Date();
  return [...STATIC_ROUTES, ...caseStudyRoutes, ...journalRoutes].map(
    (entry) => ({ ...entry, lastModified: now }),
  );
}
