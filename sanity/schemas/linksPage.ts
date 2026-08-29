import {
  defineArrayMember,
  defineField,
  defineType,
  type StringRule,
} from "sanity";

// Singleton document behind /links. Pinned in sanity.config.ts (structure +
// document actions) so the Studio shows exactly one "Links Page" entry —
// no create / delete / duplicate. The document _id is fixed to LINKS_PAGE_ID
// (sanity/constants.ts) so the GROQ query and the structure builder agree.

// Accepts site-relative paths ("/about"), absolute http(s) URLs and mailto:.
const HREF_PATTERN = /^(\/|https?:\/\/|mailto:)/i;

const hrefRule = (Rule: StringRule) =>
  Rule.required().custom((value) =>
    value && HREF_PATTERN.test(value)
      ? true
      : 'Use a site path like "/about" or a full URL starting with https://',
  );

export default defineType({
  name: "linksPage",
  title: "Links Page",
  type: "document",
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "feature", title: "Feature card" },
    { name: "links", title: "Links" },
  ],
  fields: [
    // ── Profile ─────────────────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "profile",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role line",
      description: 'Short line under the name, e.g. "Designer".',
      type: "string",
      group: "profile",
    }),
    defineField({
      name: "photo",
      title: "Profile photo",
      description:
        "Optional — leave empty to use the built-in portrait (head-pp-color.jpg).",
      type: "image",
      options: { hotspot: true },
      group: "profile",
    }),
    defineField({
      name: "disciplines",
      title: "Discipline pills",
      description: "Rendered in UPPERCASE under the role line. Drag to reorder.",
      type: "array",
      of: [{ type: "string" }],
      group: "profile",
    }),

    // ── Feature card ────────────────────────────────────────────────────
    defineField({
      name: "featureCard",
      title: "Feature card",
      description:
        "The large image + CTA card at the top of the list (e.g. a print for sale).",
      type: "object",
      group: "feature",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "enabled",
          title: "Show feature card",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          description: 'Rendered in caps, e.g. "A4 • A3 size poster print".',
          type: "string",
        }),
        defineField({
          name: "image",
          title: "Image",
          description:
            "Portrait crop (~102×117). Falls back to the built-in Dhirunba image if empty.",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "ctaLabel",
          title: "Button label",
          type: "string",
          initialValue: "BUY PRINT",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "href",
          title: "Link",
          type: "string",
          validation: hrefRule,
        }),
      ],
    }),

    // ── Links ───────────────────────────────────────────────────────────
    defineField({
      name: "links",
      title: "Links",
      description: "The list of link cards. Drag to reorder.",
      type: "array",
      group: "links",
      of: [
        defineArrayMember({
          name: "linkItem",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Link",
              description:
                'Site path ("/work") or full URL ("https://…"). Full URLs open in a new tab by default.',
              type: "string",
              validation: hrefRule,
            }),
            defineField({
              name: "newTab",
              title: "Open in new tab",
              description:
                "Override — leave unset to auto-detect (external URLs open in a new tab, site paths don't).",
              type: "boolean",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "href" },
          },
        }),
      ],
    }),
  ],

  // First-open defaults mirror the previously hard-coded page content so the
  // Studio starts from the live state rather than an empty form.
  initialValue: {
    name: "Shazif Adam",
    role: "Designer",
    disciplines: ["BRAND DESIGN", "UI/UX", "ILLUSTRATION"],
    featureCard: {
      enabled: true,
      title: "Dhirunba",
      subtitle: "A4 • A3 SIZE POSTER PRINT",
      ctaLabel: "BUY PRINT",
      href: "https://shop.fineprintmv.com/artwork/6",
    },
    links: [
      {
        _type: "linkItem",
        _key: "shop",
        title: "Shop",
        subtitle: "Buy My Artworks",
        href: "https://shop.fineprintmv.com/artist/SA",
      },
      {
        _type: "linkItem",
        _key: "about",
        title: "About Me",
        subtitle: "Who I am & what I do",
        href: "/about",
      },
      {
        _type: "linkItem",
        _key: "work",
        title: "Case Studies",
        subtitle: "Selected work",
        href: "/work",
      },
    ],
  },

  preview: {
    prepare: () => ({ title: "Links Page", subtitle: "/links" }),
  },
});
