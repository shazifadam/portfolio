import Image from "next/image";
import { TAGS, type TagValue } from "@/lib/tags";
import { cn } from "@/lib/utils";

// Bare tag chip — icon + label, no border, no fill (Figma 180:914).
// Padding is asymmetric to balance the icon (4px left, 8px right, 2px y).
export function TagPill({
  tag,
  className,
}: {
  tag: TagValue;
  className?: string;
}) {
  const def = TAGS[tag];
  if (!def) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 pl-1 pr-2 py-0.5 text-tag text-brand-dark-gray",
        className,
      )}
    >
      <Image
        src={def.iconSrc}
        alt=""
        width={24}
        height={24}
        aria-hidden
        className="shrink-0"
      />
      <span>{def.label}</span>
    </span>
  );
}
