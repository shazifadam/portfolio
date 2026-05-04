import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Shazif Adam — Designer who builds. Case studies, about, and shop.",
};

const DISCIPLINES = ["UI/UX", "WEB", "BRAND IDENTITY", "ILLUSTRATION"];

type LinkItem = {
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
  /** Placeholder bg shown until a real cover image is provided */
  bg: string;
  /** Optional cover image — drop into public/images/links/ and set the path */
  src?: string;
};

const LINKS: LinkItem[] = [
  {
    title: "Case Studies",
    subtitle: "Selected work",
    href: "/work",
    bg: "var(--brand-black)",
  },
  {
    title: "About Me",
    subtitle: "Who I am & what I do",
    href: "/about",
    bg: "var(--brand-accent-orange)",
  },
  {
    title: "Shop",
    subtitle: "Buy My Artworks",
    href: "https://shop.fineprintmv.com/artist/SA",
    external: true,
    bg: "var(--brand-dark-gray)",
  },
];

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

function LinkCard({ title, subtitle, bg, src }: Omit<LinkItem, "href" | "external">) {
  return (
    <div className="flex items-center gap-4 rounded-sm border border-brand-light-gray bg-brand-white p-4 transition-colors duration-200 hover:bg-brand-light-gray">
      <div
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm"
        style={{ backgroundColor: bg }}
      >
        {src && (
          <Image
            src={src}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-navbarlabel text-brand-black">{title}</p>
        <p className="text-p3 text-semantic-text-secondary">{subtitle}</p>
      </div>
      <span className="shrink-0 text-semantic-text-secondary">
        <ChevronRight />
      </span>
    </div>
  );
}

export default function LinksPage() {
  return (
    <section className="bg-semantic-surface-primary py-16 md:py-24">
      <div className="mx-auto flex max-w-[480px] flex-col items-center gap-10 px-6">

        {/* Profile */}
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-full bg-semantic-border-light">
            <Image
              src="/images/head-pp-color.jpg"
              alt="Shazif Adam"
              fill
              sizes="112px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-h3 text-brand-black">Shazif Adam</h1>
            <p className="text-p2 text-semantic-text-secondary">Designer</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {DISCIPLINES.map((d) => (
              <span
                key={d}
                className="rounded-pill border border-semantic-border-light px-3 py-1 text-cta text-semantic-text-secondary"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Link cards */}
        <div className="flex w-full flex-col gap-3">
          {LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkCard
                  title={link.title}
                  subtitle={link.subtitle}
                  bg={link.bg}
                  src={link.src}
                />
              </a>
            ) : (
              <Link key={link.href} href={link.href}>
                <LinkCard
                  title={link.title}
                  subtitle={link.subtitle}
                  bg={link.bg}
                  src={link.src}
                />
              </Link>
            )
          )}
        </div>

      </div>
    </section>
  );
}
