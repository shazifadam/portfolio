import { cn } from "@/lib/utils";

// Matches Figma node 237:8657 — translucent pill, text-cta type, secondary
// text colour. The same visual is used in the mobile menu next to disabled
// items (Journal, Shop) AND as the desktop hover cursor.
//
// Bg uses tokenised greys that sit between the surface and the text:
//   onDark  — bg `--brand-coal` (#2e2e2e), darker than the gray text. For
//             use over dark surfaces (mobile menu).
//   onLight — bg `--brand-mist` (#c4c4c4), lighter than the gray text. For
//             use over light surfaces (desktop hover cursor).

type Tone = "onDark" | "onLight";

const TONE: Record<Tone, string> = {
  onDark: "bg-brand-coal",
  onLight: "bg-brand-mist",
};

export function ComingSoonBadge({
  tone = "onDark",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-pill px-3 py-2 text-cta text-semantic-text-secondary",
        TONE[tone],
        className,
      )}
    >
      Coming Soon
    </span>
  );
}
