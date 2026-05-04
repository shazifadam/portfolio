"use client";

import { m, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Reveals a single grid card with the standard blur+rise+fade transition.
//
// On desktop (≥ md), `columnIndex` produces a row-aware right-to-left stagger:
//   - columnIndex === 1 (right) → delay 0
//   - columnIndex === 0 (left)  → delay 0.2s
// Both cards in a row enter the viewport at roughly the same instant (they
// share a top edge with `items-start`), so the delay produces a clean
// right-first / left-after sequence per row.
//
// On mobile (single column) the column-based delay is suppressed — every card
// uses delay 0 and animates as it scrolls into view individually.
//
// Layout (width / flex-basis) is owned by `className` so this wrapper slots
// into existing flex/grid layouts without changing the card's footprint.

export function CardReveal({
  children,
  columnIndex = 0,
  className,
}: {
  children: ReactNode;
  columnIndex?: 0 | 1;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  // Track viewport so the column-based delay only applies on desktop.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const delay = isDesktop && columnIndex === 0 ? 0.2 : 0;

  return (
    <m.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, filter: "blur(16px)", y: 12 }}
      animate={
        inView
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: "blur(16px)", y: 12 }
      }
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.div>
  );
}
