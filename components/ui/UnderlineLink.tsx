"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// Text + 2px underline. Underline is absolutely positioned so the text never
// shifts; on hover the rule slides down 4px and recolours from gray → ink.
// Matches NavbarItem in Figma node 184:7790.
//
// Variants:
//  - navDark      — black text on light bg, underline → black on hover
//  - navLight     — white text on dark bg, underline → white on hover
//  - footerMuted  — gray text on dark bg, underline → white on hover
//  - disabled     — gray text, gray underline, no hover (Journal / Shop)

type Variant = "navDark" | "navLight" | "footerMuted" | "disabled";
type Surface = "light" | "dark";

const TEXT: Record<Variant, string> = {
  navDark: "text-semantic-text-primary",
  navLight: "text-brand-white",
  footerMuted: "text-semantic-text-secondary",
  disabled: "text-brand-dark-gray",
};

// Default underline colour per variant.
//   navDark   — light bg → brand-gray (subtle line on light)
//   navLight  — dark bg → brand-dark-gray (visible mid-gray, not near-white)
//   footerMuted — dark bg → brand-dark-gray (matches text colour, reads as a
//                deliberate part of the link without being too prominent)
//   disabled  — surface-aware: brand-gray on light surfaces (matches active
//               nav rules at rest), brand-dark-gray on dark surfaces (matches
//               the disabled text colour so the line and label read as one
//               muted unit instead of a bright bar under dim text).
const RULE_DEFAULT: Record<Variant, string> = {
  navDark: "bg-brand-gray",
  navLight: "bg-brand-dark-gray",
  footerMuted: "bg-brand-dark-gray",
  disabled: "bg-brand-gray",
};

const DISABLED_RULE_DARK = "bg-brand-dark-gray";

const RULE_HOVER: Record<Variant, string> = {
  navDark: "group-hover:bg-brand-black",
  navLight: "group-hover:bg-brand-white",
  footerMuted: "group-hover:bg-brand-white",
  disabled: "",
};

type Props = {
  href?: string;
  external?: boolean;
  variant?: Variant;
  /** Currently only affects the `disabled` variant — see RULE_DEFAULT comment. */
  surface?: Surface;
  className?: string;
  children: ReactNode;
};

function Inner({
  variant,
  surface,
  children,
}: {
  variant: Variant;
  surface: Surface;
  children: ReactNode;
}) {
  // Layout:
  //   relative wrapper, pb-1.5 (=6px) reserves space for the underline.
  //   Text is in normal flow → does not move.
  //   Underline is absolutely positioned at bottom-1 (=4px from wrapper bottom),
  //   which sits flush against the text's lower edge.
  //   On hover the underline translates down 4px (lands at bottom-0).
  const ruleClass =
    variant === "disabled" && surface === "dark"
      ? DISABLED_RULE_DARK
      : RULE_DEFAULT[variant];
  return (
    <span className="relative inline-flex pb-1.5">
      <span className={cn("text-navbarlabel whitespace-nowrap", TEXT[variant])}>
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute left-0 right-0 bottom-1 h-0.5 transition-[transform,background-color] duration-300 ease-smooth",
          ruleClass,
          variant !== "disabled" && [
            "group-hover:translate-y-1",
            RULE_HOVER[variant],
          ],
        )}
      />
    </span>
  );
}

export function UnderlineLink({
  href,
  external,
  variant = "navDark",
  surface = "light",
  className,
  children,
}: Props) {
  if (variant === "disabled" || !href) {
    return (
      <span
        aria-disabled={variant === "disabled" ? "true" : undefined}
        className={cn(
          "group inline-flex pointer-events-none select-none",
          className,
        )}
      >
        <Inner variant={variant} surface={surface}>
          {children}
        </Inner>
      </span>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn("group inline-flex", className)}
      >
        <Inner variant={variant} surface={surface}>
          {children}
        </Inner>
      </a>
    );
  }

  return (
    <Link href={href} className={cn("group inline-flex", className)}>
      <Inner variant={variant} surface={surface}>
        {children}
      </Inner>
    </Link>
  );
}
