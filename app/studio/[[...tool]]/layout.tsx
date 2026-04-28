// Server-component layout — owns the metadata + viewport for the embedded
// Sanity Studio route. The actual studio (page.tsx) is a client component, so
// it can't export metadata directly.

export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
