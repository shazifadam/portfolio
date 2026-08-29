export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import {
  getLinksPage,
  type FeatureCard as FeatureCardData,
  type LinkItem,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Shazif Adam — Designer who builds. Case studies, about, and shop.",
};

// Content is edited in Sanity Studio → "Links Page" (singleton). The static
// seed in lib/links.ts renders until that document is published.

function ChevronRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeatureCard({ card }: { card: FeatureCardData }) {
  return (
    <a
      href={card.href}
      target={card.newTab ? "_blank" : undefined}
      rel={card.newTab ? "noopener noreferrer" : undefined}
      className="group block w-full"
    >
      <div className="flex items-center gap-3 rounded-sm border border-brand-black py-2 pl-2 pr-3 transition-colors duration-200 group-hover:bg-brand-light-gray">
        <div className="relative aspect-[102.281/117.001] w-[102px] shrink-0 overflow-hidden">
          <Image
            src={card.imageUrl}
            alt={card.title}
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col items-stretch justify-between self-stretch pb-3 pt-2">
          <div className="flex flex-col items-start pl-2">
            <p className="text-p2 text-brand-black">{card.title}</p>
            {/* Figma-pinned one-off label (400:2257): Inter 12/14.4/+1 caps.
                No matching token in the type scale, so size/leading/tracking
                are inline; font family routes through --font-tag. */}
            {card.subtitle && (
              <p
                className="text-[12px] uppercase leading-[14.4px] tracking-[1px] text-semantic-text-secondary"
                style={{ fontFamily: "var(--font-tag)" }}
              >
                {card.subtitle}
              </p>
            )}
          </div>
          <div className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand-black px-4 py-2">
            <Image
              src="/icons/linkspage/shopping-cart-02.svg"
              alt=""
              width={18}
              height={18}
              aria-hidden
              className="h-[18px] w-[18px] shrink-0"
            />
            <span className="text-cta text-brand-lightest">{card.ctaLabel}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function LinkCard({ title, subtitle }: Pick<LinkItem, "title" | "subtitle">) {
  return (
    <div className="flex items-center gap-4 rounded-sm border border-brand-light-gray bg-brand-white p-4 transition-colors duration-200 hover:bg-brand-light-gray">
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-navbarlabel text-brand-black">{title}</p>
        {subtitle && (
          <p className="text-p3 text-semantic-text-secondary">{subtitle}</p>
        )}
      </div>
      <span className="shrink-0 text-semantic-text-secondary">
        <ChevronRight />
      </span>
    </div>
  );
}

export default async function LinksPage() {
  const page = await getLinksPage();

  return (
    <section className="bg-semantic-surface-primary py-16 md:py-24">
      <div className="mx-auto flex max-w-[480px] flex-col items-center gap-10 px-6">

        {/* Profile */}
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-full bg-semantic-border-light">
            <Image
              src={page.photoUrl}
              alt={page.name}
              fill
              sizes="112px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-h3 text-brand-black">{page.name}</h1>
            {page.role && (
              <p className="text-p2 text-semantic-text-secondary">{page.role}</p>
            )}
          </div>
          {page.disciplines.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {page.disciplines.map((d) => (
                <Pill key={d} className="uppercase">
                  {d}
                </Pill>
              ))}
            </div>
          )}
        </div>

        {/* Link cards */}
        <div className="flex w-full flex-col gap-3">
          {page.featureCard && <FeatureCard card={page.featureCard} />}
          {page.links.map((link) =>
            link.newTab ? (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkCard title={link.title} subtitle={link.subtitle} />
              </a>
            ) : (
              <Link key={link.key} href={link.href}>
                <LinkCard title={link.title} subtitle={link.subtitle} />
              </Link>
            )
          )}
        </div>

      </div>
    </section>
  );
}
