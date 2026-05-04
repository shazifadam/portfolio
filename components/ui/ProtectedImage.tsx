"use client";

import NextImage from "next/image";
import type { ImageProps } from "next/image";

// Wraps next/image with two layers of passive protection:
//   1. draggable={false} — prevents drag-to-desktop
//   2. Transparent overlay div — right-clicking the image hits the div, so
//      the browser context menu shows "Save Page As" instead of "Save Image As",
//      stopping casual right-click saves. The overlay also blocks the context
//      menu entirely via onContextMenu.
//
// The component renders a fragment (image + sibling div) so it must sit inside
// an existing `position: relative; overflow: hidden` container — every image
// wrapper on this site already satisfies that invariant.
export function ProtectedImage(props: ImageProps) {
  return (
    <>
      <NextImage {...props} draggable={false} />
      <div
        aria-hidden
        className="absolute inset-0 z-10 select-none"
        onContextMenu={(e) => e.preventDefault()}
      />
    </>
  );
}
