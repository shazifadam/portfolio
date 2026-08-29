import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { linksPageQuery } from "@/sanity/lib/queries";
import { LINKS_PAGE_ID } from "@/sanity/constants";
import type { SanityImageSource } from "@sanity/image-url";

// ── Page-facing shape ────────────────────────────────────────────────────

export type LinkItem = {
  key: string;
  title: string;
  subtitle?: string;
  href: string;
  /** Resolved: explicit Studio override, else true for absolute http(s) URLs. */
  newTab: boolean;
};

export type FeatureCard = {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaLabel: string;
  href: string;
  newTab: boolean;
};

export type LinksPageData = {
  name: string;
  role?: string;
  photoUrl: string;
  disciplines: string[];
  featureCard: FeatureCard | null;
  links: LinkItem[];
};

// Built-in assets used whenever the Studio field is empty.
const DEFAULT_PHOTO = "/images/head-pp-color.jpg";
const DEFAULT_FEATURE_IMAGE = "/images/featurelink/dhirunba-feature.jpg";

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

// Static seed — mirrors the schema's initialValue. Used when the Sanity doc
// hasn't been published yet or the fetch fails, so /links never renders empty.
export const LINKS_PAGE_FALLBACK: LinksPageData = {
  name: "Shazif Adam",
  role: "Designer",
  photoUrl: DEFAULT_PHOTO,
  disciplines: ["BRAND DESIGN", "UI/UX", "ILLUSTRATION"],
  featureCard: {
    title: "Dhirunba",
    subtitle: "A4 • A3 SIZE POSTER PRINT",
    imageUrl: DEFAULT_FEATURE_IMAGE,
    ctaLabel: "BUY PRINT",
    href: "https://shop.fineprintmv.com/artwork/6",
    newTab: true,
  },
  links: [
    {
      key: "shop",
      title: "Shop",
      subtitle: "Buy My Artworks",
      href: "https://shop.fineprintmv.com/artist/SA",
      newTab: true,
    },
    {
      key: "about",
      title: "About Me",
      subtitle: "Who I am & what I do",
      href: "/about",
      newTab: false,
    },
    {
      key: "work",
      title: "Case Studies",
      subtitle: "Selected work",
      href: "/work",
      newTab: false,
    },
  ],
};

// ── Sanity → page mapping ────────────────────────────────────────────────

type SanityLinksPage = {
  name?: string;
  role?: string;
  photo?: SanityImageSource;
  disciplines?: string[];
  featureCard?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    image?: SanityImageSource;
    ctaLabel?: string;
    href?: string;
  };
  links?: Array<{
    _key: string;
    title?: string;
    subtitle?: string;
    href?: string;
    newTab?: boolean;
  }>;
};

function mapLinksPage(doc: SanityLinksPage): LinksPageData {
  const fc = doc.featureCard;
  const featureCard: FeatureCard | null =
    fc && fc.enabled !== false && fc.title && fc.href
      ? {
          title: fc.title,
          subtitle: fc.subtitle,
          imageUrl: fc.image
            ? urlFor(fc.image).width(240).height(276).fit("crop").quality(85).url()
            : DEFAULT_FEATURE_IMAGE,
          ctaLabel: fc.ctaLabel || "BUY PRINT",
          href: fc.href,
          newTab: isExternalHref(fc.href),
        }
      : null;

  const links: LinkItem[] = (doc.links ?? [])
    .filter((l): l is typeof l & { title: string; href: string } =>
      Boolean(l.title && l.href),
    )
    .map((l) => ({
      key: l._key,
      title: l.title,
      subtitle: l.subtitle,
      href: l.href,
      newTab: l.newTab ?? isExternalHref(l.href),
    }));

  return {
    name: doc.name || LINKS_PAGE_FALLBACK.name,
    role: doc.role,
    photoUrl: doc.photo
      ? urlFor(doc.photo).width(224).height(224).fit("crop").quality(85).url()
      : DEFAULT_PHOTO,
    disciplines: doc.disciplines ?? [],
    featureCard,
    links,
  };
}

export async function getLinksPage(): Promise<LinksPageData> {
  try {
    const doc = await client.fetch<SanityLinksPage | null>(linksPageQuery, {
      id: LINKS_PAGE_ID,
    });
    if (doc) return mapLinksPage(doc);
  } catch (err) {
    console.warn("[sanity] links page fetch failed, using seed", err);
  }
  return LINKS_PAGE_FALLBACK;
}
