import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { BlurReveal } from "@/components/motion/BlurReveal";

// Figma 180:1035 (desktop) / 182:3107 (mobile).
// Inner stack uses gap-[30px]: section label, body, CTA.
// Body is two paragraphs separated by one line height of breathing room.
// Indent (`xl:pl-[350px]`) only kicks in at 1280px viewport per PRD §5.1.

export function HowIWork() {
  return (
    <section className="bg-semantic-surface-dark py-20 md:py-36">
      <BlurReveal>
        <Container>
          <div className="flex flex-col items-start gap-[30px] xl:pl-[350px]">
            <SectionLabel>How I Work</SectionLabel>

            <div className="text-h3 text-brand-white">
              <p>
                Most projects break at the gap between design and delivery. I close that gap — by designing with build in mind from the start, and building with design intent preserved all the way to the end.
              </p>
              {/* One line-height of breathing room between paragraphs (matches the
                  blank-line gap in Figma — H3 line-height is 42.525px). */}
              <p className="mt-[1lh]">
                It&apos;s not a handoff. It&apos;s a single thread from brief to browser.
              </p>
            </div>

            <Button href="/about" variant="light" size="sm">
              Know More
            </Button>
          </div>
        </Container>
      </BlurReveal>
    </section>
  );
}
