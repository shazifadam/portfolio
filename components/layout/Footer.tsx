import Image from "next/image";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { UnderlineLink } from "@/components/ui/UnderlineLink";

const SOCIALS: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/shazifadam/" },
  { label: "Threads", href: "https://www.threads.com/@shazifadam" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shazifadam/" },
  { label: "X", href: "https://x.com/shazifadam" },
];

// Two-circle ornament — 76×76 each, no gap, side by side. The left
// circle is now Shazif's portrait crop (1-1 new copy.jpg) clipped to a
// circle; the right is the brand-lightest swatch from Figma node 182:3210.
function CircleOrnament({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`flex shrink-0 ${className ?? ""}`}>
      <div className="relative h-[76px] w-[76px] overflow-hidden rounded-full bg-brand-dark-gray">
        <Image
          src="/images/1-1%20new%20copy.jpg"
          alt=""
          fill
          sizes="76px"
          className="object-cover"
        />
      </div>
      <div className="h-[76px] w-[76px] rounded-full bg-brand-lightest" />
    </div>
  );
}

export function Footer() {
  // Date.getFullYear() so the © stays current without manual edits.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-semantic-surface-dark text-brand-lightest">
      <Container className="!py-16">
        <div className="flex flex-col gap-[69px]">
          {/* TOP BLOCK */}
          <div className="flex flex-col gap-[30px]">
            {/* Heading + circles row.
                Mobile (Figma 184:7224): circles on top, heading below.
                Desktop (Figma 182:3210): heading left, circles right. */}
            <div className="flex flex-col gap-[30px] md:flex-row md:items-start md:justify-between md:gap-8">
              <CircleOrnament className="order-1 md:order-2" />
              <h2 className="text-h2 max-w-3xl text-brand-white order-2 md:order-1">
                Good design isn&apos;t seen. It&apos;s felt.
                <br aria-hidden />
                Let&apos;s start work today!
              </h2>
            </div>

            <div>
              <Button href="/contact" variant="light">
                Get in touch
              </Button>
            </div>
          </div>

          {/* BOTTOM BLOCK */}
          <div className="flex flex-col gap-[30px] md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col items-start gap-2">
                <UnderlineLink href="/privacy" variant="footerMuted">
                  Privacy Policy
                </UnderlineLink>
                <UnderlineLink href="/cookies" variant="footerMuted">
                  Cookie Policy
                </UnderlineLink>
              </div>
              <p className="text-body-xs text-semantic-text-secondary">
                ©ShazifAdam 2014–{year}. All Rights Reserved.
              </p>
            </div>

            {/* Socials hidden on mobile per Figma 184:7224. */}
            <div className="hidden md:flex items-start gap-[30px]">
              {SOCIALS.map((s) => (
                <UnderlineLink
                  key={s.href}
                  href={s.href}
                  external
                  variant="footerMuted"
                >
                  {s.label}
                </UnderlineLink>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
