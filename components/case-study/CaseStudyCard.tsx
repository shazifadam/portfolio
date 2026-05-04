import { ProtectedImage } from "@/components/ui/ProtectedImage";
import Link from "next/link";
import { TagPill } from "@/components/ui/TagPill";
import { cn } from "@/lib/utils";
import type { TagValue } from "@/lib/tags";

// Reusable card for any case-study list (home Work section, /work page, similar
// case studies on detail pages). The visual variant (big vs small) is set by
// the parent grid — the card just consumes it.
//
// big   — aspect 600/489, wider column (matches the "feature" card in Figma 180:867)
// small — aspect 530/363, narrower column (matches Figma 180:927)
//
// On mobile both variants render full-width with the bigger 600/489 aspect
// (per Figma 182:2894 — mobile uses one ratio for every card).

export type CaseStudyCardVariant = "big" | "small";

export type CaseStudyCardData = {
  titleStart: string;
  /** Hex string from Sanity / seed. Inline style — content data, not a design token. */
  titleStartColor?: string;
  titleEnd?: string;
  tags?: TagValue[];
  href: string;
  /** Cover image URL (Sanity later). Falls back to a tinted placeholder. */
  coverImage?: string;
};

type Props = CaseStudyCardData & {
  variant: CaseStudyCardVariant;
  className?: string;
};

export function CaseStudyCard({
  titleStart,
  titleStartColor,
  titleEnd,
  tags,
  href,
  coverImage,
  variant,
  className,
}: Props) {
  // Aspect — mobile is uniform (both variants 600/489); desktop big keeps that
  // ratio while small switches to 530/363. Width is owned by the parent (e.g.
  // WorkGrid wraps each card in a width-bearing motion.div) so this card always
  // fills the container it's given.
  const aspectClass =
    variant === "big"
      ? "aspect-[600/489]"
      : "aspect-[600/489] md:aspect-[530/363]";

  return (
    <Link
      href={href}
      className={cn("group flex w-full flex-col gap-6", className)}
    >
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-sm bg-semantic-border-light",
            aspectClass,
          )}
        >
          {coverImage && (
            <ProtectedImage
              src={coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>

        {/* Title: [titleStart in brand colour] [—] [titleEnd]. The em-dash sits
            in --semantic-border-light so it reads as a quiet separator. */}
        <p className="text-h3 text-brand-black max-w-[510px]">
          <span style={titleStartColor ? { color: titleStartColor } : undefined}>
            {titleStart}
          </span>
          {titleEnd && (
            <>
              {" "}
              <span className="text-semantic-border-light">—</span>{" "}
              {titleEnd}
            </>
          )}
        </p>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      )}
    </Link>
  );
}
