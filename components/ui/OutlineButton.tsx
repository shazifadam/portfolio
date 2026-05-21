import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Outlined pill CTA — transparent fill, 1px brand-black border, .text-cta
// label. Figma 397:2445 ("VIEW MORE WORK"). Distinct from <Button>, which is
// the pill + circle + arrow CTA; this is the lighter secondary style with no
// circle. Hover inverts to a solid brand-black fill.
export function OutlineButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-pill border border-brand-black px-6 py-3",
        "text-cta leading-none whitespace-nowrap text-brand-black",
        "transition-colors duration-300 ease-smooth",
        "hover:bg-brand-black hover:text-brand-lightest",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-black",
        className,
      )}
    >
      {children}
    </Link>
  );
}
