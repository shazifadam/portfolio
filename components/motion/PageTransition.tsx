"use client";

import type { ReactNode } from "react";

// Pass-through wrapper. Earlier this used framer-motion's AnimatePresence to
// fade the entire page on route changes, but the wrapping motion.div
// interfered with the hero's on-load HeroReveal animations (the SSR `opacity:
// 0` inline style and the AnimatePresence/motion lifecycle competed with the
// hero's own staggered reveals). Page-to-page transitions can be re-added
// later with a different mechanism (view transitions API, or a route-level
// stagger that doesn't wrap in opacity).
export function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
