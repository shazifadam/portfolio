import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  basePath: "/studio",
  name: "shazifadam-content",
  title: "shazifadam.com Studio",
  projectId,
  dataset,
  plugins: [
    deskTool(),
    // visionTool is the GROQ query explorer — dev only so it isn't exposed
    // to authenticated studio members in production.
    ...(process.env.NODE_ENV !== "production"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],
  schema: { types: schemaTypes },
});
