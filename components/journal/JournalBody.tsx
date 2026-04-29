import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

// Renders the rearrangeable journal body — a Portable Text array that
// mixes paragraphs, subheadings, and inline images. Typography uses the
// .text-journal-* classes (see globals.css §Journal article styles)
// because the article voice is intentionally serif-heavy and reader-
// oriented, distinct from the rest of the site.

type ImageBlock = {
  _type: "image";
  _key: string;
  asset?: { _ref?: string; url?: string };
  alt?: string;
  caption?: string;
};

const components: PortableTextComponents = {
  block: {
    // Paragraph — STK Bureau Serif Light 18 / 27 / -0.28
    normal: ({ children }) => (
      <p className="text-journal-body text-semantic-text-primary">{children}</p>
    ),
    // Subheading — Geist Medium 31.5 / 27 / -0.28
    h2: ({ children }) => (
      <h2 className="text-journal-sub text-semantic-text-primary">
        {children}
      </h2>
    ),
  },
  marks: {
    em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => <strong className="font-medium">{children}</strong>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noreferrer noopener" : undefined}
        className="underline decoration-semantic-text-secondary underline-offset-4 hover:decoration-semantic-text-primary transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    // Inline image — full container width, optional caption below.
    image: ({ value }) => {
      const block = value as ImageBlock;
      if (!block) return null;
      const src = urlFor(block as unknown as SanityImageSource)
        .width(1600)
        .quality(85)
        .url();
      return (
        <figure className="flex flex-col gap-3">
          <div className="relative aspect-[1232/720] w-full overflow-hidden rounded-sm bg-semantic-border-light">
            <Image
              src={src}
              alt={block.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-p3 text-semantic-text-secondary">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any[];
};

export function JournalBody({ value }: Props) {
  if (!value || value.length === 0) return null;
  return (
    // Spacing between blocks scales off the body line-height (1lh = 27px),
    // so paragraphs breathe with the same rhythm as the prose itself.
    <div className="flex flex-col gap-[1lh] text-journal-body text-semantic-text-primary">
      <PortableText value={value} components={components} />
    </div>
  );
}
