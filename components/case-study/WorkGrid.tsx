import { CardReveal } from "@/components/motion/CardReveal";
import {
  CaseStudyCard,
  type CaseStudyCardData,
  type CaseStudyCardVariant,
} from "./CaseStudyCard";

// Asymmetric "masonry" grid. Pairs items into rows of two; even rows render
// `[big | small]`, odd rows render `[small | big]`. On mobile every card is
// full-width with the bigger aspect.
//
// Animation: each card is wrapped in `<CardReveal>` which fires its blur+rise
// reveal when the card enters the viewport. On desktop, CardReveal applies a
// 0.2s delay to the LEFT column so the right card always reveals first per row
// — both cards in a row enter the viewport at the same instant (they share a
// top edge), so the delay produces a clean right-then-left sequence.

export function WorkGrid({ items }: { items: CaseStudyCardData[] }) {
  // Chunk into rows of 2.
  const rows: CaseStudyCardData[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {rows.map((row, idx) => {
        const evenRow = idx % 2 === 0;
        const leftVariant: CaseStudyCardVariant = evenRow ? "big" : "small";
        const rightVariant: CaseStudyCardVariant = evenRow ? "small" : "big";
        // Width proportions from Figma's 1440 artboard: 600/1232 ≈ 48.7% (big),
        // 530/1232 ≈ 43% (small). Remaining ~8.3% becomes the gap via
        // justify-between.
        const leftWidth =
          leftVariant === "big" ? "sm:w-[48.7%]" : "sm:w-[43%]";
        const rightWidth =
          rightVariant === "big" ? "sm:w-[48.7%]" : "sm:w-[43%]";

        return (
          <div
            key={idx}
            // Mobile: stack with same gap as between rows. Desktop: side-by-side
            // with row-remaining width as gap via justify-between.
            className="flex flex-col gap-16 sm:flex-row sm:gap-0 sm:items-start sm:justify-between"
          >
            <CardReveal columnIndex={0} className={`w-full ${leftWidth}`}>
              <CaseStudyCard {...row[0]} variant={leftVariant} />
            </CardReveal>
            {row[1] && (
              <CardReveal columnIndex={1} className={`w-full ${rightWidth}`}>
                <CaseStudyCard {...row[1]} variant={rightVariant} />
              </CardReveal>
            )}
          </div>
        );
      })}
    </div>
  );
}
