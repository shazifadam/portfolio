import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allCaseStudySlugsQuery } from "@/sanity/lib/queries";

const BASE_URL = "https://shazifadam.com";

// Routes that always exist regardless of CMS content. /journal isn't listed
// because the nav link is disabled at launch (CLAUDE.md §5.6) — re-enable
// once journal is live.
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
  { url: `${BASE_URL}/work`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[] = [];
  try {
    slugs = await client.fetch<string[]>(allCaseStudySlugsQuery);
  } catch {
    // Sanity fetch can fail if env vars are missing or the dataset is
    // unreachable. Sitemap stays valid with just the static routes.
    slugs = [];
  }

  const caseStudyRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/work/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const now = new Date();
  return [...STATIC_ROUTES, ...caseStudyRoutes].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}
