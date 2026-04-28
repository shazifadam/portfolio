import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    // ── CARD-VISIBLE FIELDS (home, work, cards everywhere) ─────────────
    defineField({
      name: "titleStart",
      title: "Title Start",
      description: 'Coloured first part of project name e.g. "Mytkt.app"',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleStartColor",
      title: "Title Start Colour (hex)",
      description: "e.g. #a1d147 — shown on cards and detail page",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^#([0-9a-fA-F]{3}){1,2}$/).warning(
          "Use a hex colour like #a1d147",
        ),
    }),
    defineField({
      name: "titleEnd",
      title: "Title Long End",
      description:
        'Descriptor after the dash e.g. "Ticketing platform designed to make your events easy"',
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Identity", value: "identity" },
          { title: "Visuals", value: "visuals" },
          { title: "Web App", value: "webApp" },
          { title: "Website", value: "website" },
          { title: "Design System", value: "designSystem" },
          { title: "Mobile App", value: "mobileApp" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image / GIF / Video",
      type: "image",
      options: { hotspot: true },
    }),

    // ── METADATA ─────────────────────────────────────────────────────
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titleStart", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower number = appears first",
      type: "number",
    }),

    // ── STANDARD SECTIONS (boolean-activated) ─────────────────────────
    defineField({
      name: "showOverview",
      title: "Show Overview section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "overviewBody",
      title: "Overview",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ document }) => !document?.showOverview,
    }),
    defineField({
      name: "showChallenges",
      title: "Show Challenges section",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "challengesBody",
      title: "Challenges",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ document }) => !document?.showChallenges,
    }),
    defineField({
      name: "showObjectives",
      title: "Show Objectives section",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "objectivesBody",
      title: "Objectives",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ document }) => !document?.showObjectives,
    }),
    defineField({
      name: "showApproach",
      title: "Show Approach section",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "approachBody",
      title: "Approach",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ document }) => !document?.showApproach,
    }),

    // ── FLEXIBLE CONTENT BLOCKS ───────────────────────────────────────
    defineField({
      name: "contentBlocks",
      title: "Content Blocks",
      description:
        "Add photo blocks and text blocks between sections in any order. Rendered between Overview and Challenges (see CLAUDE.md §5.3).",
      type: "array",
      of: [
        {
          name: "photoBlock",
          title: "Photo Block",
          type: "object",
          fields: [
            {
              name: "layout",
              title: "Layout",
              type: "string",
              options: {
                list: [
                  { title: "Single image (full width)", value: "single" },
                  { title: "Two images (side by side)", value: "pair" },
                ],
                layout: "radio",
              },
              initialValue: "single",
            },
            {
              name: "images",
              title: "Image(s)",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              description: "1 image for single, 2 for pair",
            },
            {
              name: "caption",
              title: "Caption (optional)",
              type: "string",
            },
          ],
          preview: {
            select: { layout: "layout" },
            prepare: ({ layout }) => ({
              title: `Photo Block — ${layout ?? "single"}`,
            }),
          },
        },
        {
          name: "textBlock",
          title: "Text Block",
          type: "object",
          fields: [
            {
              name: "heading",
              title: "Heading (optional)",
              type: "string",
            },
            {
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
          preview: {
            select: { heading: "heading" },
            prepare: ({ heading }) => ({
              title: `Text Block — ${heading || "No heading"}`,
            }),
          },
        },
      ],
    }),

    // ── POST LAUNCH SUCCESS ───────────────────────────────────────────
    defineField({
      name: "showPostLaunch",
      title: "Show Post Launch Success section",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "postLaunchBlocks",
      title: "Post Launch Success blocks",
      type: "array",
      hidden: ({ document }) => !document?.showPostLaunch,
      of: [
        {
          name: "postLaunchBlock",
          title: "Block",
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "body",
              title: "Paragraph",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({
              title: title || "Post Launch Block",
            }),
          },
        },
      ],
    }),

    // ── SIMILAR CASE STUDIES (max 2) ──────────────────────────────────
    defineField({
      name: "similarStudies",
      title: "Similar Case Studies",
      description: "Select up to 2 related case studies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
      validation: (Rule) => Rule.max(2),
    }),
  ],

  preview: {
    select: {
      title: "titleStart",
      subtitle: "titleEnd",
      media: "coverImage",
    },
  },
});
