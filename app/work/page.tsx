import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { WorkGrid } from "@/components/case-study/WorkGrid";
import { ALL_CASE_STUDIES, HOME_FEATURED } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies — product design, brand identity, and web development for international clients.",
};

export default function WorkPage() {
  return (
    <>
      {/* ── Hero + Featured grid ──────────────────────────────────────────
          Same section pattern as home Work: heading block (label + H1 + HR)
          followed by the asymmetric WorkGrid. The grid handles its own
          per-card right-to-left stagger via CardReveal. */}
      <section className="bg-semantic-surface-primary py-20 md:py-36">
        <Container>
          <div className="flex flex-col gap-12">
            <BlurReveal>
              <div className="flex flex-col gap-8">
                <SectionLabel>Case Studies</SectionLabel>
                <h1 className="text-h1 max-w-4xl text-semantic-text-primary">
                  While design is more than meets the eye, here&apos;s the visible part.
                </h1>
                <HorizontalRule />
              </div>
            </BlurReveal>
            <WorkGrid items={HOME_FEATURED} />
          </div>
        </Container>
      </section>

      {/* ── Honest Account (dark) ─────────────────────────────────────────
          Same shape as the home How I Work section: SectionLabel, H3 body in
          two paragraphs separated by `mt-[1lh]`, indented with `xl:pl-[350px]`
          so the prose narrows on wide viewports without crushing on tablets. */}
      <section className="bg-semantic-surface-dark py-20 md:py-36">
        <Container>
          <BlurReveal>
            <div className="flex flex-col items-start gap-[30px] xl:pl-[350px]">
              <SectionLabel>Honest Account</SectionLabel>
              <div className="text-h3 text-brand-white">
                <p>
                  UI/UX and product design is where I spend most of my time now. But the branding work, the publication layouts, the websites I&apos;ve built from scratch — those weren&apos;t detours. They shaped how I think.
                </p>
                <p className="mt-[1lh]">
                  That breadth is what lets me design systems that hold together visually, structurally, and technically — without needing three different people in the room.
                </p>
              </div>
            </div>
          </BlurReveal>
        </Container>
      </section>

      {/* ── All work ──────────────────────────────────────────────────────
          Full case-study list, ordered by `order` field once Sanity is live.
          Same WorkGrid pattern (alternating big-small per row); no heading per
          PRD §5.2 — the dark→light bg shift from Honest Account is the
          divider. */}
      <section className="bg-semantic-surface-primary py-20 md:py-36">
        <Container>
          <WorkGrid items={ALL_CASE_STUDIES} />
        </Container>
      </section>
    </>
  );
}
