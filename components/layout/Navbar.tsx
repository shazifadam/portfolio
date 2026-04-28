"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { ComingSoonBadge } from "@/components/ui/ComingSoonBadge";
import { cn } from "@/lib/utils";
import { isDarkRoute } from "@/lib/routes";

// On dark routes (see lib/routes.ts) the navbar inverts:
//   - bg: dark surface
//   - logo placeholder swatch: brand-dark-gray (visible on dark)
//   - Work/About underlines: navLight (white text, underline gray→white on hover)
//   - Contact CTA: light (white pill, dark text — the inverse of the default)
//   - Hamburger glyph: white
// Mobile menu overlay is already dark; it's unaffected.

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 6H21M3 12H21M3 18H21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5L19 19M5 19L19 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Lock body scroll while the mobile menu is open.
function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Hide the navbar when the user scrolls down; reveal it when they scroll up.
  // Always reveal at the top of the page.
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isDark = isDarkRoute(pathname);

  useScrollLock(menuOpen);

  useEffect(() => {
    let frame: number | null = null;
    // Accumulators — the user has to scroll a meaningful distance in one
    // direction before we toggle. A direction reversal resets the opposite
    // accumulator so a brief jitter doesn't trigger the wrong state.
    //   HIDE_AFTER_DOWN: scroll-down distance before the navbar hides
    //   SHOW_AFTER_UP:   scroll-up distance before the navbar reveals
    //   NEAR_TOP:        always-visible zone at the top of the page
    const HIDE_AFTER_DOWN = 100;
    const SHOW_AFTER_UP = 30;
    const NEAR_TOP = 16;

    let downAccum = 0;
    let upAccum = 0;

    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollY.current;

        if (y < NEAR_TOP) {
          setHidden(false);
          downAccum = 0;
          upAccum = 0;
        } else if (delta > 0) {
          downAccum += delta;
          upAccum = 0;
          if (downAccum >= HIDE_AFTER_DOWN) setHidden(true);
        } else if (delta < 0) {
          upAccum += -delta;
          downAccum = 0;
          if (upAccum >= SHOW_AFTER_UP) setHidden(false);
        }

        lastScrollY.current = y;
        frame = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Close the menu on Escape for a11y.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          // Sticky bar with a permanent background cap. The bg lives on the
          // <header> so it's always pinned at the top of the viewport — only
          // the contents inside slide on scroll. `overflow-hidden` clips the
          // sliding inner row so when it translates -100% it disappears
          // cleanly without bleeding above. This is what eliminates the
          // "gap above the navbar" the previous implementation showed on iOS
          // mid-animation: the bg covers the navbar's space at every frame,
          // so the page section behind never peeks through.
          "sticky top-0 z-50 w-full overflow-hidden",
          isDark ? "bg-semantic-surface-dark" : "bg-semantic-surface-primary",
        )}
      >
        <div
          className={cn(
            // The actual navbar row — logo, links, CTA. Slides up on
            // scroll-down and back on scroll-up. `will-change: transform`
            // keeps it on its own compositor layer so iOS doesn't leave
            // sub-pixel artefacts during the 600ms slide. The hidden state
            // overshoots to -101% so any sub-pixel rounding still clears
            // the parent's overflow-hidden edge.
            "transition-transform duration-[600ms] ease-smooth will-change-transform",
            hidden && !menuOpen && "-translate-y-[101%]",
          )}
        >
          <Container className="flex items-center justify-between !py-4">
            {/* Logo placeholder — replace with the SVG mark when ready */}
            <Link
              href="/"
              aria-label="Shazif Adam — home"
              className={cn(
                "block h-8 w-32",
                isDark ? "bg-brand-dark-gray" : "bg-brand-gray",
              )}
            />

            <nav className="hidden items-center gap-10 md:flex">
              <UnderlineLink href="/work" variant={isDark ? "navLight" : "navDark"}>
                Work
              </UnderlineLink>
              <UnderlineLink href="/about" variant={isDark ? "navLight" : "navDark"}>
                About
              </UnderlineLink>
              <span data-coming-soon className="inline-flex">
                <UnderlineLink
                  variant="disabled"
                  surface={isDark ? "dark" : "light"}
                >
                  Journal
                </UnderlineLink>
              </span>
              <span data-coming-soon className="inline-flex">
                <UnderlineLink
                  variant="disabled"
                  surface={isDark ? "dark" : "light"}
                >
                  <span className="inline-flex items-center gap-1">
                    Shop
                    <ArrowUpRight className="text-brand-dark-gray" />
                  </span>
                </UnderlineLink>
              </span>
            </nav>

            {/* Desktop CTA — light pill on dark routes so it reads against the bar */}
            <div className="hidden md:block">
              <Button href="/contact" variant={isDark ? "light" : "dark"}>
                Contact
              </Button>
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={cn(
                "md:hidden inline-flex h-10 w-10 items-center justify-center",
                isDark ? "text-brand-white" : "text-semantic-text-primary",
              )}
            >
              <HamburgerIcon />
            </button>
          </Container>
        </div>
      </header>

      {/* MOBILE MENU — full-viewport overlay */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={cn(
        // Full viewport (use 100dvh so iOS chrome doesn't clip the CTA).
        // Use a class-toggled `flex` / `hidden` instead of the `hidden` attr —
        // the attribute's `display: none` loses to the `flex` class on equal
        // specificity, which is what was making the menu always-visible.
        "fixed inset-0 z-[100] flex-col bg-semantic-surface-dark text-brand-white md:hidden",
        open ? "flex" : "hidden",
      )}
      style={{ height: "100dvh" }}
    >
      {/* Top bar — mirrors the dark navbar in Figma 184:7271 */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Shazif Adam — home"
          onClick={onClose}
          className="block h-8 w-32 bg-brand-dark-gray"
        />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center text-brand-white"
        >
          <CancelIcon />
        </button>
      </div>

      {/* Body — only mounted while `open` is true, so each motion item
          re-mounts (and re-plays its staggered reveal) every time the
          user opens the menu. */}
      {open && <MobileMenuBody onClose={onClose} />}
    </div>
  );
}

// Each item reveals with the same blur+opacity+y motion as HeroReveal, with
// 0.1s between adjacent rows: Work, About, Journal, Shop, then the Contact CTA.
// Duration is shorter than HeroReveal so the menu doesn't keep the user
// waiting to read the labels — total reveal completes within ~1s.
const ITEM_HIDDEN = { opacity: 0, filter: "blur(24px)", y: 32 };
const ITEM_VISIBLE = { opacity: 1, filter: "blur(0px)", y: 0 };
const ITEM_EASE = [0.22, 1, 0.36, 1] as const;
const ITEM_DURATION = 0.6;

function MobileMenuBody({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-between px-6 pt-10 pb-12">
      <ul className="flex flex-col items-start gap-4">
        <motion.li
          initial={ITEM_HIDDEN}
          animate={ITEM_VISIBLE}
          transition={{ duration: ITEM_DURATION, ease: ITEM_EASE, delay: 0 }}
        >
          <Link href="/work" onClick={onClose} className="text-h3 text-brand-white">
            Work
          </Link>
        </motion.li>
        <motion.li
          initial={ITEM_HIDDEN}
          animate={ITEM_VISIBLE}
          transition={{ duration: ITEM_DURATION, ease: ITEM_EASE, delay: 0.1 }}
        >
          <Link href="/about" onClick={onClose} className="text-h3 text-brand-white">
            About
          </Link>
        </motion.li>
        <motion.li
          className="flex items-center gap-2"
          initial={ITEM_HIDDEN}
          animate={ITEM_VISIBLE}
          transition={{ duration: ITEM_DURATION, ease: ITEM_EASE, delay: 0.2 }}
        >
          <span aria-disabled className="text-h3 text-brand-white opacity-90">
            Journal
          </span>
          <ComingSoonBadge tone="onDark" />
        </motion.li>
        <motion.li
          className="flex items-center gap-2"
          initial={ITEM_HIDDEN}
          animate={ITEM_VISIBLE}
          transition={{ duration: ITEM_DURATION, ease: ITEM_EASE, delay: 0.3 }}
        >
          <span aria-disabled className="inline-flex items-center text-h3 text-brand-white opacity-90">
            Shop
            <ArrowUpRight className="ml-1 text-brand-white" />
          </span>
          <ComingSoonBadge tone="onDark" />
        </motion.li>
      </ul>

      <motion.div
        onClick={onClose}
        initial={ITEM_HIDDEN}
        animate={ITEM_VISIBLE}
        transition={{ duration: ITEM_DURATION, ease: ITEM_EASE, delay: 0.4 }}
      >
        <Button href="/contact" variant="light" className="w-full justify-center">
          Contact
        </Button>
      </motion.div>
    </div>
  );
}
