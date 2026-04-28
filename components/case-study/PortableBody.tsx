import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { cn } from "@/lib/utils";

// Portable Text renderer used for every Sanity-authored body on the
// case-study detail page (Overview / Challenges / Objectives / Approach
// and the textBlocks inside contentBlocks).
//
// The wrapper sets the type token (`text-p1` + primary text colour) so each
// child inherits font-size and line-height. Paragraph spacing is `gap-[1lh]`
// which resolves to one line of the wrapper's line-height — matches the
// `mt-[1lh]` rhythm used on the home How-I-Work block.

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3: ({ children }) => (
      <h3 className="text-h3 text-semantic-text-secondary">{children}</h3>
    ),
  },
  list: {
    number: ({ children }) => (
      <ol className="list-decimal pl-[1.5em]">{children}</ol>
    ),
    bullet: ({ children }) => (
      <ul className="list-disc pl-[1.5em]">{children}</ul>
    ),
  },
  listItem: {
    number: ({ children }) => <li>{children}</li>,
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => <strong className="font-medium">{children}</strong>,
  },
};

type Props = {
  // Sanity Portable Text array — typed loosely because the per-block shape varies.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any[];
  className?: string;
};

export function PortableBody({ value, className }: Props) {
  if (!value || value.length === 0) return null;
  return (
    <div
      className={cn(
        "text-p1 text-semantic-text-primary flex flex-col gap-[1lh]",
        className,
      )}
    >
      <PortableText value={value} components={components} />
    </div>
  );
}
