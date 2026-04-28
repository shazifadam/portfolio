import { Container } from "@/components/layout/Container";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { WorkGrid } from "@/components/case-study/WorkGrid";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { HOME_FEATURED } from "@/lib/case-studies";

export function Work() {
  return (
    <section className="bg-semantic-surface-primary py-20 md:py-36">
      <Container>
        <div className="flex flex-col gap-10">
          {/* Heading + rule reveal as a unit. The grid below handles its own
              per-card right-to-left stagger via CardReveal. */}
          <BlurReveal>
            <div className="flex flex-col gap-4">
              <h2 className="text-h2 max-w-[870px] text-brand-black">
                While design is more than meets the eye, here&apos;s the visible part.
              </h2>
              <HorizontalRule />
            </div>
          </BlurReveal>
          <WorkGrid items={HOME_FEATURED} />
        </div>
      </Container>
    </section>
  );
}
