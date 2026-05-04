"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// Wraps the app in LazyMotion so all `m.*` components share one async-loaded
// feature bundle (domAnimation) instead of each pulling in the full motion
// library. Reduces the Framer Motion JS payload by ~50%, improving TBT.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
