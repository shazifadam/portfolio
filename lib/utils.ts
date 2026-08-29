import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Flatten a Portable Text array into a plain sentence for <meta name="description">.
// Only walks top-level `block` nodes (images, videos and custom blocks have no
// crawler-useful text) and stops at maxLen, trimming back to the last word so
// the snippet doesn't end mid-word. Typed loosely because the body arrays are
// opaque `any[]` everywhere else in the codebase.
export function portableTextToPlain(
  blocks: unknown[] | undefined,
  maxLen = 155,
): string {
  if (!Array.isArray(blocks)) return "";

  const text = blocks
    .filter(
      (b): b is { _type?: string; children?: { text?: string }[] } =>
        typeof b === "object" && b !== null && (b as { _type?: string })._type === "block",
    )
    .map((b) =>
      (b.children ?? [])
        .map((c) => c?.text ?? "")
        .join(""),
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLen) return text;
  const clipped = text.slice(0, maxLen);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).replace(/[,;:.\s]+$/, "")}…`;
}
