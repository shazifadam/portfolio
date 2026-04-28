import Image from "next/image";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { PortableBody } from "@/components/case-study/PortableBody";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

// One entry from the case-study `contentBlocks` array. Either a photo block
// (single full-bleed image or a side-by-side pair) or a text block (optional
// H3 sub-heading + Portable Text body). See sanity/schemas/caseStudy.ts.

export type PhotoBlock = {
  _type: "photoBlock";
  _key: string;
  layout?: "single" | "pair";
  images?: SanityImageSource[];
  caption?: string;
};

export type TextBlock = {
  _type: "textBlock";
  _key: string;
  heading?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
};

export type ContentBlockData = PhotoBlock | TextBlock;

export function ContentBlock({ block }: { block: ContentBlockData }) {
  if (block._type === "photoBlock") {
    return <PhotoBlockRenderer block={block} />;
  }
  if (block._type === "textBlock") {
    return <TextBlockRenderer block={block} />;
  }
  return null;
}

function PhotoBlockRenderer({ block }: { block: PhotoBlock }) {
  const images = block.images ?? [];
  if (images.length === 0) return null;

  // Aspect ratio matches the Figma photo placeholders (1232×725 ≈ 1.7:1).
  // Pair layout keeps each image at the same aspect, side-by-side on desktop
  // and stacked on mobile.
  const isPair = block.layout === "pair" && images.length >= 2;

  return (
    <BlurReveal>
      <figure className="flex flex-col gap-3">
        {isPair ? (
          <div className="flex flex-col gap-4 md:flex-row">
            {images.slice(0, 2).map((img, i) => (
              <div
                key={i}
                className="relative aspect-[608/725] w-full overflow-hidden rounded-sm bg-semantic-border-light"
              >
                <Image
                  src={urlFor(img).width(1400).quality(85).url()}
                  alt={block.caption ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative aspect-[1232/725] w-full overflow-hidden rounded-sm bg-semantic-border-light">
            <Image
              src={urlFor(images[0]).width(2400).quality(85).url()}
              alt={block.caption ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 1232px"
              className="object-cover"
            />
          </div>
        )}
        {block.caption && (
          <figcaption className="text-p3 text-semantic-text-secondary">
            {block.caption}
          </figcaption>
        )}
      </figure>
    </BlurReveal>
  );
}

function TextBlockRenderer({ block }: { block: TextBlock }) {
  return (
    <BlurReveal>
      <div className="flex flex-col gap-4 xl:pl-[350px]">
        {block.heading && (
          <h3 className="text-h3 text-semantic-text-secondary">{block.heading}</h3>
        )}
        <PortableBody value={block.body} />
      </div>
    </BlurReveal>
  );
}
