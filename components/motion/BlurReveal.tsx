"use client";

import { m, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function BlurReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <m.div
      ref={ref}
      className={className}
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
