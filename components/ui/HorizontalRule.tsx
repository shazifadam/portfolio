import { cn } from "@/lib/utils";

// Surface-aware divider. Default colour `--brand-gray` reads correctly on
// light bgs; on dark surfaces (e.g. /about) the same value would look
// near-white, so the `dark` tone drops to `--brand-coal` (#3a3a3a) — close
// enough to the bg that the line behaves like a quiet structural cue
// rather than a visible band.
type Tone = "light" | "dark";

export function HorizontalRule({
  tone = "light",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const bg = tone === "dark" ? "bg-brand-coal" : "bg-brand-gray";
  return <hr className={cn("h-px w-full border-0", bg, className)} />;
}
