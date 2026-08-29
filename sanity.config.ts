import { defineConfig } from "sanity";
import { deskTool, type StructureBuilder } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { LINKS_PAGE_ID } from "./sanity/constants";
import { apiVersion, dataset, projectId } from "./sanity/env";

// Document types that exist exactly once. They are pinned at the top of the
// desk as a single editable document (fixed _id) and hidden from the
// "create new" menu / stripped of destructive actions.
const SINGLETONS = new Set([LINKS_PAGE_ID]);

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Links Page")
        .id(LINKS_PAGE_ID)
        .child(
          S.document()
            .schemaType("linksPage")
            .documentId(LINKS_PAGE_ID)
            .title("Links Page"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.has(item.getId() ?? ""),
      ),
    ]);

export default defineConfig({
  basePath: "/studio",
  name: "shazifadam-content",
  title: "shazifadam.com Studio",
  projectId,
  dataset,
  plugins: [
    deskTool({ structure }),
    // visionTool is the GROQ query explorer — dev only so it isn't exposed
    // to authenticated studio members in production.
    ...(process.env.NODE_ENV !== "production"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],
  schema: {
    types: schemaTypes,
    // Keep singletons out of the global "+ Create" menu.
    templates: (templates) =>
      templates.filter((t) => !SINGLETONS.has(t.schemaType)),
  },
  document: {
    // Singletons can be edited and published, never deleted/duplicated.
    actions: (actions, context) =>
      SINGLETONS.has(context.schemaType)
        ? actions.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action),
          )
        : actions,
  },
});
