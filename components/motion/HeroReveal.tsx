"use client";

import { m } from "framer-motion";
import { type ReactNode } from "react";

// On-load reveal for hero content (above the fold). Animates blur + slight
// rise — but NOT opacity — so the content is always visible during page load
// and SSR. JS just resolves the soft → sharp transition once Framer Motion
// hydrates.
//
// Triggers on mount (no IntersectionObserver) since the hero is in view
// by definition.

export function HeroReveal({
  children,
  delay = 0,
  className,
  fade = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** When true, also animates opacity 0→1 (used for caption + GIF grid). */
  fade?: boolean;
}) {
  const initial = fade
    ? { opacity: 0, filter: "blur(24px)", y: 32 }
    : { filter: "blur(24px)", y: 32 };
  const animate = fade
    ? { opacity: 1, filter: "blur(0px)", y: 0 }
    : { filter: "blur(0px)", y: 0 };

  return (
    <m.div
      className={className}
      initial={initial}
      animate={animate}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.div>
  );
}
