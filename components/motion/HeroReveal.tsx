"use client";

import { motion } from "framer-motion";
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
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      // Items reveal from opacity 0 + blur + offset, so each piece "appears"
      // instead of crisping up from already-visible. The hero section itself
      // (bg, container, layout) is rendered by SSR with no motion wrapper, so
      // there's no full-page flash — only the individual hero pieces are
      // briefly invisible until their respective `delay` fires.
      initial={{ opacity: 0, filter: "blur(24px)", y: 32 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
