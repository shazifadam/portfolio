import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { CardReveal } from "@/components/motion/CardReveal";

// Copy is sourced from Figma 180:792 (desktop) / 182:2868 (mobile) — the
// current design intent. Reading order (row-major) is the desktop 2×2 grid:
//   ED  | BI
//   WPD | I
const EXPERTISE: { title: string; body: string }[] = [
  {
    title: "Experience Design",
    body: "I design products that are structurally sound, visually considered, and built around how people actually move through them.",
  },
  {
    title: "Brand Identity",
    body: "A brand is a system, not a logo. I build identity from the inside out, visual language and logic that holds coherent across every surface.",
  },
  {
    title: "Web & Product Development",
    body: "I build what I design. From Figma to a live, functional product, without losing design intent in translation.",
  },
  {
    title: "Illustration",
    body: "An eye trained on observation sharpens how I see proportion, texture, and detail in every system I design.",
  },
];

// 113×113 placeholder. The orange outline marks the slot — Shazif will swap
// in real icons later. Decorative, so aria-hidden.
function IconPlaceholder() {
  return (
    <div
      aria-hidden
      className="size-[113px] shrink-0 rounded-sm border border-brand-accent-orange"
    />
  );
}

function ExpertiseItem({ title, body }: { title: string; body: string }) {
  // Same layout on every viewport now: icon on top, text below, 16px between.
  return (
    <div className="flex flex-col gap-[16px]">
      <IconPlaceholder />
      <div className="flex flex-col gap-1">
        <h3 className="text-h3 text-semantic-border-light">{title}</h3>
        <p className="text-p2 text-semantic-text-secondary">{body}</p>
      </div>
    </div>
  );
}

export function Expertise() {
  // Pair the 4 items into two visual rows so each row gets its own row-based
  // stagger via CardReveal. Mobile collapses to 1 column — CardReveal sees
  // that and skips the column-based delay automatically.
  const rows: (typeof EXPERTISE)[number][][] = [
    EXPERTISE.slice(0, 2),
    EXPERTISE.slice(2, 4),
  ];

  return (
    <section className="bg-semantic-surface-dark py-20 md:py-36">
      <Container>
        <div className="flex flex-col gap-[30px]">
          <BlurReveal>
            <SectionLabel>My Expertise</SectionLabel>
          </BlurReveal>

          {/* Two rows, each with its own viewport-triggered stagger via
              CardReveal. gap-12 between rows on mobile, kept at 12 on
              desktop (matches Figma 180:818 vertical rhythm). */}
          <div className="flex flex-col gap-12">
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-14"
              >
                {row.map((item, colIdx) => (
                  <CardReveal
                    key={item.title}
                    columnIndex={colIdx as 0 | 1}
                  >
                    <ExpertiseItem {...item} />
                  </CardReveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
