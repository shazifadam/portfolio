import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Pill } from "@/components/ui/Pill";
import { HeroReveal } from "@/components/motion/HeroReveal";

const REVEAL_INTRO = 0;
const REVEAL_PILLS = 0.2;

export function Hero() {
  return (
    <section className="bg-semantic-border-light pt-28 pb-24 md:pb-32">
      <Container className="flex flex-col items-center">
        <div className="flex w-full max-w-[834px] flex-col gap-4">
          <HeroReveal delay={REVEAL_INTRO}>
            <p className="text-h3 text-brand-black">
              Hi, I&apos;m{" "}
              <Link
                href="/about"
                className="text-brand-accent-orange underline decoration-brand-accent-orange underline-offset-4"
              >
                Shazif
              </Link>
              {", "}a designer with over 10 years of experience in brand, web,
              and product design. I&apos;ve worked across healthcare,
              international development, education, and tech industries.
            </p>
          </HeroReveal>

          <HeroReveal delay={REVEAL_PILLS}>
            <div className="flex flex-wrap items-start gap-x-[10px] gap-y-[8px]">
              <Pill>BRAND IDENTITY</Pill>
              <Pill>UI/UX</Pill>
              <Pill>WEB</Pill>
              <Pill>ILLUSTRATION</Pill>
            </div>
          </HeroReveal>
        </div>
      </Container>
    </section>
  );
}
