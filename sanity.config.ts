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
  plugins: [deskTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
