import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Pill } from "@/components/ui/Pill";
import { HeroReveal } from "@/components/motion/HeroReveal";

type Card = {
  /** width as % of the grid container */
  width: string;
  /** height as % of the grid container — keeps cards proportional at any viewport */
  height: string;
  /** top as % of the grid container */
  top: string;
  /** left as % of the grid container */
  left: string;
  /** background colour fallback shown until the GIF/video is provided */
  bg: string;
  /** stacking order */
  z: number;
  /** optional image src — drop a path under /public/images/hero/ */
  src?: string;
};

// Desktop — five cards. Reference: 1280×340 container, cards 26.68% × 227px,
// rows at top 0 and top 113. PRD §5.1.
//   227 / 340 = 66.76% (card height as % of container)
//   113 / 340 = 33.24% (top of bottom row as % of container)
const DESKTOP_CARDS: Card[] = [
  { width: "26.68%", height: "66.76%", top: "0%",    left: "0%",     bg: "var(--brand-black)",         z: 1 },
  { width: "26.68%", height: "66.76%", top: "0%",    left: "37.21%", bg: "var(--brand-gray)",          z: 1 },
  { width: "26.68%", height: "66.76%", top: "0%",    left: "73.32%", bg: "var(--brand-dark-gray)",     z: 1 },
  { width: "26.68%", height: "66.76%", top: "33.24%", left: "14.48%", bg: "var(--brand-dark-gray)",     z: 2 },
  { width: "26.68%", height: "66.76%", top: "33.24%", left: "54.63%", bg: "var(--brand-accent-orange)", z: 2 },
];
// Aspect ratio of the desktop grid container — keeps cards in proportion.
const DESKTOP_ASPECT = "1280 / 340";

// Mobile — three cards. Reference: ~327×163 (375 minus 24px page padding ×2).
// Cards 1+2 sit on the top row; card 3 (orange) overlaps below. Figma 182:2793.
const MOBILE_CARDS: Card[] = [
  { width: "41.77%", height: "66.76%", top: "0%",     left: "0%",     bg: "var(--brand-black)",         z: 1 },
  { width: "41.77%", height: "66.76%", top: "0%",     left: "58.23%", bg: "var(--brand-dark-gray)",     z: 1 },
  { width: "51.68%", height: "66.87%", top: "33.13%", left: "24.16%", bg: "var(--brand-accent-orange)", z: 2 },
];
const MOBILE_ASPECT = "327 / 163";

// Pill order — chosen so they wrap nicely on mobile (UI/UX + WEB on row 1,
// BRAND IDENTITY on row 2, ILLUSTRATION on row 3) per Figma 182:2793.
const DISCIPLINES = ["UI/UX", "WEB", "BRAND IDENTITY", "ILLUSTRATION"];

// On-load reveal cadence for the hero (seconds, absolute from t=0):
//   0.0 — H0 line 1
//   0.2 — H0 line 2
//   0.3..0.6 — pill tags, +0.1s each
//   0.7 — caption paragraph
//   0.8 — GIF card grid
const REVEAL_LINE_1 = 0;
const REVEAL_LINE_2 = 0.2;
const REVEAL_PILLS_BASE = 0.3;
const REVEAL_PILL_STEP = 0.1;
const REVEAL_CAPTION = 0.7;
const REVEAL_GRID = 0.8;

function CardGrid({
  cards,
  aspectRatio,
  className,
}: {
  cards: Card[];
  aspectRatio: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full ${className ?? ""}`}
      style={{ aspectRatio }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          className="absolute overflow-hidden rounded-sm"
          style={{
            width: card.width,
            height: card.height,
            top: card.top,
            left: card.left,
            backgroundColor: card.bg,
            zIndex: card.z,
          }}
        >
          {card.src && (
            <Image
              src={card.src}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 27vw"
              className="object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-brand-lightest pt-24 pb-24 md:pb-32">
      <Container className="flex flex-col items-center gap-10 text-center">
        <div className="w-full">
          {/* `<br className="md:hidden" />` is display:none on desktop, so the
              hero collapses back to "Designer who builds." / "Illustrates the
              rest." at md and up. On mobile the breaks render and produce the
              4-line stack from Figma 182:2793. */}
          <HeroReveal delay={REVEAL_LINE_1}>
            <h1 className="text-h0 text-brand-black">
              Designer <br className="md:hidden" />who builds.
            </h1>
          </HeroReveal>
          <HeroReveal delay={REVEAL_LINE_2}>
            <h1 className="text-h0 text-brand-accent-orange">
              Illustrates <br className="md:hidden" />the rest.
            </h1>
          </HeroReveal>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-[17px]">
          {DISCIPLINES.map((d, i) => (
            <HeroReveal
              key={d}
              delay={REVEAL_PILLS_BASE + i * REVEAL_PILL_STEP}
            >
              <Pill>{d}</Pill>
            </HeroReveal>
          ))}
        </div>

        <HeroReveal delay={REVEAL_CAPTION}>
          <p className="text-p1 text-semantic-text-secondary max-w-[664px]">
            Product and brand designer <br className="md:hidden" />based in Malé, Maldives.
            <br />
            Designing and building <br className="md:hidden" />for international clients.
          </p>
        </HeroReveal>

        {/* GIF grid — desktop has 5 cards, mobile has 3. Both use aspect-ratio
            so the cards scale proportionally with viewport width. The whole
            grid reveals as one beat after the caption. */}
        <HeroReveal delay={REVEAL_GRID} className="w-full">
          <CardGrid
            cards={DESKTOP_CARDS}
            aspectRatio={DESKTOP_ASPECT}
            className="hidden md:block"
          />
          <CardGrid
            cards={MOBILE_CARDS}
            aspectRatio={MOBILE_ASPECT}
            className="md:hidden"
          />
        </HeroReveal>
      </Container>
    </section>
  );
}
