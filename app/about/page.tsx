import type { Metadata, Viewport } from "next";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { Testimonials } from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "About",
  description:
    "Designer who builds — a brand and product designer based in Malé, Maldives, designing and building for international clients.",
};

// /about renders on the dark surface; iOS Safari's status bar tint
// follows theme-color, so dropping it to the page bg keeps the chrome
// continuous with the navbar instead of flashing the default light tint.
export const viewport: Viewport = {
  themeColor: "#111110",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Dark hero / bio / illustration strip ────────────────────────────
          One full-bleed dark section spans the whole page above the
          testimonials. Inside, the indented hero (label + H2) sits above a
          full-width rule; the bio is a 2-col layout on desktop (tilted photo
          left, prose right) and stacks on mobile; the illustration strip is
          four placeholder tiles that flex evenly on desktop and scroll
          horizontally on mobile (per Figma 184:6524 / 184:6613). */}
      <section className="bg-semantic-surface-dark py-20 md:py-36">
        <Container>
          <div className="flex flex-col gap-12">
            {/* Hero — label + H2 indent only on wide viewports, matching the
                same xl:pl-[350px] rhythm used on the home How-I-Work block
                and the case-study body indent. */}
            <BlurReveal>
              <div className="flex flex-col gap-2 xl:pl-[350px]">
                <SectionLabel>About Me</SectionLabel>
                <h1 className="text-h2 text-brand-white">
                  I design digital products, brand systems, and websites.{" "}
                  <br className="hidden md:inline" />
                  Then I build them.
                </h1>
              </div>
            </BlurReveal>

            <BlurReveal>
              <HorizontalRule tone="dark" />
            </BlurReveal>

            {/* Bio — photo left + 4-paragraph prose right on desktop, stacked
                on mobile. The photo placeholder is tilted -2.11deg per the
                Figma; outer wrapper preserves the original bounding box so the
                rotation doesn't push the prose column. */}
            <BlurReveal>
              <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-10">
                <div className="flex w-full shrink-0 items-center justify-center overflow-hidden lg:w-[508px]">
                  <div
                    className="aspect-[508/414] w-full rounded-sm bg-semantic-text-secondary"
                    style={{ transform: "rotate(-2.11deg)" }}
                    aria-hidden
                  />
                </div>
                <div className="text-p1 text-brand-light-gray flex flex-1 flex-col gap-[1lh]">
                  <p>
                    That combination is rarer than it should be — and it&apos;s
                    what makes the work land the way it does. There&apos;s no
                    translation loss between the design and the thing that ships.
                  </p>
                  <p>
                    I&apos;m a Co-Founder and Creative Director at Encrea
                    Studio, based in Malé, Maldives.
                  </p>
                  <p>
                    Over the past eight years I&apos;ve worked across healthcare,
                    international development, education, and tech — with clients
                    ranging from a 200-bed hospital to a World Bank-funded
                    publication programme in Cambodia.
                  </p>
                  <p>
                    I&apos;ve kept a sketchbook running alongside every project.
                    The current series is observational studies of Maldivian
                    marine species — unhurried, field-note work that has nothing
                    to do with client briefs and everything to do with keeping
                    the eye sharp.
                  </p>
                </div>
              </div>
            </BlurReveal>

            {/* Illustration strip — four placeholder tiles. Desktop renders
                them as four flex-1 cells that share the container width.
                Mobile turns into an infinite ticker carousel: tiles double
                ([...TILES, ...TILES]) and the track translates from 0 to
                -50% over the loop — same technique as the home ArtworkStrip
                so when the first set scrolls past, the second is already in
                position and the loop reads as continuous. */}
            <BlurReveal>
              {/* Desktop: static 4-cell row */}
              <div className="hidden gap-[30px] md:flex">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    aria-hidden
                    className="aspect-[321/261] flex-1 rounded-sm bg-semantic-text-secondary"
                  />
                ))}
              </div>

              {/* Mobile: full-bleed ticker. Negative margin breaks out of
                  Container's px-6 so the strip touches the screen edges, and
                  overflow-hidden clips the off-screen tail of the doubled set. */}
              <div className="-mx-6 overflow-hidden md:hidden">
                <div className="flex w-fit animate-artwork-ticker">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      aria-hidden
                      className="mr-[30px] h-[151px] w-[185px] shrink-0 rounded-sm bg-semantic-text-secondary"
                    />
                  ))}
                </div>
              </div>
            </BlurReveal>
          </div>
        </Container>
      </section>

      {/* Testimonials — same 6-card grid as home, dark surface variant.
          Two adjacent dark sections share the same bg, so the boundary
          reads as breathing room rather than a colour shift. */}
      <Testimonials tone="dark" />
    </>
  );
}
