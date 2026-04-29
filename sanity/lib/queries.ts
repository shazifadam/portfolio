import { groq } from "next-sanity";

// Card-visible projection used everywhere a case study appears as a card
const cardFields = `
  _id,
  "slug": slug.current,
  titleStart,
  titleStartColor,
  titleEnd,
  tags,
  coverImage,
  order
`;

// Home shows 6 featured case studies — toggled per-doc via the `featured`
// boolean in the Sanity Studio. Order driven by the doc's `order` field
// (lower number = appears first). To change the count, update both the
// `[0...N]` slice here and `HOME_PROJECTS.slice(0, N)` in components/home/Work.tsx.
export const homeFeaturedCaseStudiesQuery = groq`
  *[_type == "caseStudy" && featured == true] | order(order asc)[0...6] {
    ${cardFields}
  }
`;

export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    ${cardFields}
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    ${cardFields},
    publishedAt,
    showOverview, overviewBody,
    showChallenges, challengesBody,
    showObjectives, objectivesBody,
    showApproach, approachBody,
    contentBlocks[]{
      _type,
      _key,
      _type == "photoBlock" => {
        layout,
        images[]{ ..., asset-> },
        caption
      },
      _type == "textBlock" => {
        heading,
        body
      }
    },
    showPostLaunch,
    postLaunchBlocks[]{
      _key,
      title,
      body
    },
    "similarStudies": similarStudies[]->{ ${cardFields} }
  }
`;

export const allCaseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)][].slug.current
`;

export const journalEntriesQuery = groq`
  *[_type == "journalEntry"] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    title,
    summary,
    coverImage,
    publishedAt,
    tags
  }
`;

export const journalEntryBySlugQuery = groq`
  *[_type == "journalEntry" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    summary,
    coverImage,
    publishedAt,
    tags,
    body[]{
      ...,
      _type == "image" => { ..., asset-> }
    }
  }
`;

export const allJournalSlugsQuery = groq`
  *[_type == "journalEntry" && defined(slug.current)][].slug.current
`;
