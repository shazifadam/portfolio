import { defineField, defineType } from "sanity";

export default defineType({
  name: "journalEntry",
  title: "Journal Entry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      type: "string",
      title: "Summary",
      description: "One-line teaser shown on the listing page.",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover Image (optional)",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      type: "date",
      title: "Published At",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      title: "Tags",
      options: {
        list: [
          { title: "Design Process", value: "designProcess" },
          { title: "UI/UX", value: "uiux" },
          { title: "Illustration", value: "illustration" },
          { title: "Tools & Workflow", value: "tools" },
          { title: "Short Take", value: "shortTake" },
        ],
      },
    }),

    // ── Body — drag-rearrangeable mix of paragraphs, subheadings, and
    //         images. The editor adds a new block via the + button in
    //         Sanity's array UI; existing blocks reorder by drag. Each
    //         text block toggles between Body and Subheading from the
    //         Style dropdown.
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          // Renderer maps `normal` → .text-journal-body and `h2` →
          // .text-journal-sub on the slug page.
          styles: [
            { title: "Body", value: "normal" },
            { title: "Subheading", value: "h2" },
          ],
          // Keep the editor focused on prose for now — no bullet lists
          // or quotes in the article style. Add back later if needed.
          lists: [],
          marks: {
            decorators: [
              { title: "Italic", value: "em" },
              { title: "Strong", value: "strong" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({ scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
        // Inline image — drop one between paragraphs and reorder freely.
        {
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption (optional)" },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});
