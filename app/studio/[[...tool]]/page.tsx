"use client";

/**
 * Mounts the Sanity Studio at /studio.
 * Auth + dataset config live in sanity.config.ts at the project root.
 * Metadata + viewport are exported from the sibling layout.tsx (must be a
 * server component to export Next.js metadata).
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
