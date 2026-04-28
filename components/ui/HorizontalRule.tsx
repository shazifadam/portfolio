import { cn } from "@/lib/utils";

export function HorizontalRule({ className }: { className?: string }) {
  return <hr className={cn("h-px w-full border-0 bg-brand-gray", className)} />;
}
