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
    defineField({ name: "summary", type: "string", title: "Summary" }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover Image (optional)",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
      title: "Body",
    }),
    defineField({ name: "publishedAt", type: "date", title: "Published At" }),
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
        layout: "tags",
      },
    }),
  ],
});
