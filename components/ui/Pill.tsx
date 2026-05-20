import { cn } from "@/lib/utils";

// Discipline pill used in the hero strip (UI/UX · BRAND IDENTITY · WEB · ILLUSTRATION).
// Uses the Figma `headliner` token: Geist 400, 18/27, +4.5px tracking.
export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-semantic-border-light text-semantic-text-secondary",
        // Mobile: compact size
        "px-3 py-1 text-[12px] leading-5 tracking-[1.5px]",
        // Desktop: full headliner token
        "md:px-6 md:py-2 md:text-[18px] md:leading-[27px] md:tracking-[4.5px]",
        className,
      )}
    >
      {children}
    </span>
  );
}
