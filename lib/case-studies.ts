import type { CaseStudyCardData } from "@/components/case-study/CaseStudyCard";

// Seeded case-study list. Replaced by Sanity once the docs are in the CMS;
// see sanity/lib/queries.ts for the GROQ queries this seed maps to.
//
// Row-major reading order across the WorkGrid masonry:
//   row 0 (big-small): Mytkt, FitBase
//   row 1 (small-big): QMed, GenAI
//   row 2 (big-small): Mytkt repeat, FitBase repeat   ← placeholders until
//   row 3 (small-big): QMed repeat, GenAI repeat        more real entries
//
// `HOME_FEATURED` = the first 6 (matches the `featured == true` filter in the
// Sanity query). The home Work section and /work's "Featured" grid both read
// from this. `ALL_CASE_STUDIES` is the full list /work's "All work" grid uses.

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

// Home page (and /work's "Featured" grid) caps at 6. Update both this slice AND
// the `[0...6]` slice in sanity/lib/queries.ts → homeFeaturedCaseStudiesQuery
// when the count changes.
export const HOME_FEATURED = ALL_CASE_STUDIES.slice(0, 6);
