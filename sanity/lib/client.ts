// Imported from @sanity/client directly rather than re-exported through
// next-sanity: the re-export pulls extra Studio-side code into every route
// bundle that touches the client (~54 kB gz across 6 routes).
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
});
