"use client";

import { useEffect, useState } from "react";
import { ComingSoonBadge } from "./ComingSoonBadge";

// Custom desktop cursor that follows the mouse and shows a "Coming Soon" badge
// while hovering anything tagged with `data-coming-soon`. On those elements,
// the native cursor is hidden via the global rule in globals.css.
//
// Mobile/touch devices are excluded via `@media (hover: hover)`-style logic
// (the badge stays hidden when the device has no hover capability).

export function ComingSoonCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = () => setCanHover(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!canHover) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hit = target?.closest("[data-coming-soon]");
      setVisible(!!hit);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [canHover]);

  if (!canHover) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[9999] transition-opacity duration-150"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 1 : 0,
        // Centre the badge horizontally and lift it slightly above the cursor.
        transform: "translate(-50%, calc(-50% - 18px))",
      }}
    >
      <ComingSoonBadge tone="onLight" />
    </div>
  );
}
