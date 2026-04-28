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
        "inline-flex items-center rounded-pill border border-semantic-border-light px-6 py-2 text-headliner text-semantic-text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
