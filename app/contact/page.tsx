import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell me about your project or collaboration idea. Brand, product, web — designed and built end-to-end.",
};

export default function ContactPage() {
  return (
    <section className="bg-semantic-surface-primary py-20 md:py-36">
      <Container>
        <div className="flex flex-col gap-4">
          {/* Heading group — narrower content centred via xl:px-[350px] on
              wide viewports per Figma 184:6938. The rule below sits at full
              container width so the divider runs edge-to-edge. */}
          <BlurReveal>
            <div className="flex flex-col gap-4 xl:px-[350px]">
              <SectionLabel>Contact</SectionLabel>
              <h1 className="text-h2 max-w-[870px] text-brand-black">
                Let&apos;s work together
              </h1>
            </div>
          </BlurReveal>

          <BlurReveal>
            <HorizontalRule />
          </BlurReveal>

          {/* Photo + form. Desktop is a 2-col side-by-side; mobile stacks
              with the photo on top. The photo placeholder shares the same
              -2.11deg tilt as the About bio so the visual handwriting stays
              consistent — replace the bg with a real image when ready. */}
          <BlurReveal>
            <div className="flex flex-col gap-10 pt-12 md:pt-16 lg:flex-row lg:items-start lg:gap-10">
              <div className="flex w-full shrink-0 items-center justify-center overflow-hidden lg:w-[320px] xl:w-[508px]">
                <div
                  className="aspect-[508/414] w-full max-h-[280px] lg:max-h-none rounded-sm bg-semantic-text-secondary"
                  style={{ transform: "rotate(-2.11deg)" }}
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col">
                <ContactForm />
              </div>
            </div>
          </BlurReveal>
        </div>
      </Container>
    </section>
  );
}
