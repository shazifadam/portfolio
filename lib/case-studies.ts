import type { CaseStudyCardData } from "@/components/case-study/CaseStudyCard";
import type { TagValue } from "@/lib/tags";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  allCaseStudiesQuery,
  homeFeaturedCaseStudiesQuery,
} from "@/sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";

// Static seed used until the Sanity dataset has docs (or as a fallback when the
// fetch fails). Once Sanity returns ≥1 doc, the live data wins.
//
// Row-major reading order across the WorkGrid masonry:
//   row 0 (big-small): Mytkt, FitBase
//   row 1 (small-big): QMed, GenAI
//   row 2 (big-small): Mytkt repeat, FitBase repeat   ← placeholders until
//   row 3 (small-big): QMed repeat, GenAI repeat        more real entries

export const ALL_CASE_STUDIES: CaseStudyCardData[] = [
  {
    titleStart: "Mytkt.app",
    titleStartColor: "#a1d147",
    titleEnd: "Ticketing platform designed to make your events easy",
    tags: ["identity", "visuals", "webApp", "designSystem"],
    href: "/work/mytkt-app",
  },
  {
    titleStart: "FitBase",
    titleStartColor: "#3157ee",
    titleEnd: "Fitness trainer app for session and payment management",
    tags: ["visuals", "website"],
    href: "/work/fitbase",
  },
  {
    titleStart: "QMed Pharmacy",
    titleStartColor: "#8c8c8c",
    titleEnd: "Giving a digital face for a pharmacy",
    tags: ["visuals", "website"],
    href: "/work/qmed-pharmacy",
  },
  {
    titleStart: "GenAI Hackathon",
    titleStartColor: "#df52ec",
    titleEnd: "Solving the hassle of managing cases",
    tags: ["identity", "visuals", "webApp", "website", "designSystem"],
    href: "/work/genai-hackathon",
  },
  {
    titleStart: "Mytkt.app",
    titleStartColor: "#a1d147",
    titleEnd: "Ticketing platform designed to make your events easy",
    tags: ["identity", "visuals", "webApp", "designSystem"],
    href: "/work/mytkt-app",
  },
  {
    titleStart: "FitBase",
    titleStartColor: "#3157ee",
    titleEnd: "Fitness trainer app for session and payment management",
    tags: ["visuals", "website"],
    href: "/work/fitbase",
  },
  {
    titleStart: "QMed Pharmacy",
    titleStartColor: "#8c8c8c",
    titleEnd: "Giving a digital face for a pharmacy",
    tags: ["visuals", "website"],
    href: "/work/qmed-pharmacy",
  },
  {
    titleStart: "GenAI Hackathon",
    titleStartColor: "#df52ec",
    titleEnd: "Solving the hassle of managing cases",
    tags: ["identity", "visuals", "webApp", "website", "designSystem"],
    href: "/work/genai-hackathon",
  },
];

export const HOME_FEATURED = ALL_CASE_STUDIES.slice(0, 6);

// ── Sanity-backed fetchers ──────────────────────────────────────────────
// Both helpers fall back to the static seed above when the dataset is empty
// or the fetch fails — so the site renders even before Sanity is wired up.

export type SanityCaseStudyCard = {
  _id: string;
  slug: string;
  titleStart: string;
  titleStartColor?: string;
  titleEnd?: string;
  tags?: TagValue[];
  coverImage?: SanityImageSource;
  order?: number;
};

export function mapSanityCard(doc: SanityCaseStudyCard): CaseStudyCardData {
  return {
    titleStart: doc.titleStart,
    titleStartColor: doc.titleStartColor,
    titleEnd: doc.titleEnd,
    tags: doc.tags,
    href: `/work/${doc.slug}`,
    coverImage: doc.coverImage
      ? urlFor(doc.coverImage).width(1200).quality(85).url()
      : undefined,
  };
}

export async function getHomeFeatured(): Promise<CaseStudyCardData[]> {
  try {
    const docs = await client.fetch<SanityCaseStudyCard[]>(
      homeFeaturedCaseStudiesQuery,
    );
    if (docs && docs.length > 0) return docs.map(mapSanityCard);
  } catch (err) {
    console.warn("[sanity] home-featured fetch failed, using seed", err);
  }
  return HOME_FEATURED;
}

export async function getAllCaseStudies(): Promise<CaseStudyCardData[]> {
  try {
    const docs = await client.fetch<SanityCaseStudyCard[]>(allCaseStudiesQuery);
    if (docs && docs.length > 0) return docs.map(mapSanityCard);
  } catch (err) {
    console.warn("[sanity] all-case-studies fetch failed, using seed", err);
  }
  return ALL_CASE_STUDIES;
}
