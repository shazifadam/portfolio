"use client";

import { m } from "framer-motion";
import { useRef, type ReactNode } from "react";

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
  const ref = useRef<HTMLDivElement>(null);

  const initial = fade
    ? { opacity: 0, filter: "blur(24px)", y: 32 }
    : { filter: "blur(24px)", y: 32 };
  const animate = fade
    ? { opacity: 1, filter: "blur(0px)", y: 0 }
    : { filter: "blur(0px)", y: 0 };

  return (
    <m.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay }}
      onAnimationComplete={() => {
        // Remove the filter property entirely once settled — leaving
        // filter: blur(0px) active creates a stacking-context boundary
        // that iOS Safari renders as a visible ring around the element.
        if (ref.current) ref.current.style.filter = "";
      }}
    >
      {children}
    </m.div>
  );
}
