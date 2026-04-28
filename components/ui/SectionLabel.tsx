import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function SectionLabel({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-label text-semantic-text-secondary block", className)}
      {...rest}
    >
      {children}
    </span>
  );
}
