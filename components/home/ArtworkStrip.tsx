import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { BlurReveal } from "@/components/motion/BlurReveal";

// Each tile can carry an optional image src and its own aspect ratio.
// Portrait images (ratio < 1) produce narrower tiles; landscape (ratio > 1)
// produce wider ones. The strip height is fixed by the outer aspect-ratio
// container — tile width = strip height × ratio, keeping the image proportional.
// Tiles without a src show the placeholder bg colour.
type Tile = {
  bg: string;
  src?: string;
  /** width ÷ height — e.g. 0.75 for a 3:4 portrait, 1.5 for a 3:2 landscape.
   *  Defaults to 1 (square) when omitted. */
  ratio?: number;
};

const TILES: Tile[] = [
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
            `overflow-hidden` clips the ticker; edge gradients mask tiles
            entering/leaving the viewport edges. */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "1484 / 483" }}
        >
          <div className="absolute inset-y-0 left-0 flex h-full w-fit animate-artwork-ticker">
            {[...TILES, ...TILES].map((tile, i) => (
              <div
                key={i}
                aria-hidden
                className="relative mr-4 h-full shrink-0 overflow-hidden rounded-sm"
                style={{
                  aspectRatio: tile.ratio ?? 1,
                  backgroundColor: tile.bg,
                }}
              >
                {tile.src && (
                  <Image
                    src={tile.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 30vw, 20vw"
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>

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
