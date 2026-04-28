import { Container } from "@/components/layout/Container";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { BlurReveal } from "@/components/motion/BlurReveal";

// Placeholder colours for the moving ticker. Real artwork will swap these
// `bg` values for image src later — the loop math (`-50%` keyframe + doubled
// content) doesn't care what's inside the tiles.
const TILES: { bg: string }[] = [
  { bg: "var(--brand-black)" },
  { bg: "var(--brand-accent-orange)" },
  { bg: "var(--brand-dark-gray)" },
  { bg: "var(--brand-coal)" },
  { bg: "var(--brand-mist)" },
  { bg: "var(--brand-gray)" },
];

export function ArtworkStrip() {
  return (
    <section className="bg-semantic-surface-primary py-20 md:py-36">
      <BlurReveal className="flex flex-col gap-10">
        {/* Title block — sits inside Container so it inherits the standard
            104/24 padding and aligns with every other section's left edge. */}
        <Container>
          <div className="flex flex-col gap-4">
            <h2 className="text-h2 text-brand-black max-w-[870px]">
              Artwork and other things{" "}
              <br className="hidden md:inline" />
              I do in my free time
            </h2>
            <HorizontalRule />
          </div>
        </Container>

        {/* Strip — full-bleed, fixed aspect ratio (1484/483 ≈ 3.07:1).
            `overflow-hidden` clips the ticker; the gradient overlays mask the
            tiles entering/leaving the viewport. */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "1484 / 483" }}
        >
          {/* The track. Each tile uses `mr-4` (instead of flex `gap`) so the
              right margin on the LAST tile of each set keeps the tile/gap
              rhythm intact across the loop boundary — gap math gets messy
              because flex-gap doesn't add a trailing gap. */}
          <div className="absolute inset-y-0 left-0 flex h-full w-fit animate-artwork-ticker">
            {[...TILES, ...TILES].map((tile, i) => (
              <div
                key={i}
                aria-hidden
                className="mr-4 aspect-square h-full shrink-0 rounded-sm"
                style={{ backgroundColor: tile.bg }}
              />
            ))}
          </div>

          {/* Edge gradients — page bg fading to transparent. Narrow on desktop
              so most of the artwork is visible, and a 3-stop gradient with a
              `via` at 30% opacity makes the fade feel tapered rather than a
              hard wall of opaque colour at the edge. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-semantic-surface-primary via-semantic-surface-primary/30 to-transparent md:w-32"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-semantic-surface-primary via-semantic-surface-primary/30 to-transparent md:w-32"
          />
        </div>
      </BlurReveal>
    </section>
  );
}
