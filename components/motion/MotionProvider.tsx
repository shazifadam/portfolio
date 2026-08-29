"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// Wraps the app in LazyMotion so all `m.*` components share one async-loaded
// feature bundle (domAnimation) instead of each pulling in the full motion
// library. Reduces the Framer Motion JS payload by ~50%, improving TBT.
//
// MotionConfig `reducedMotion="user"` makes every `m.*` animation honour the
// OS "reduce motion" setting: transform/blur values snap to their target and
// only opacity still animates. Without it Framer ignores the preference
// entirely — the globals.css `prefers-reduced-motion` rule only clamps CSS
// animations, not JS-driven ones. No effect for users who haven't set it.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
