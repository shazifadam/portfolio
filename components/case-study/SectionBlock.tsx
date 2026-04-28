import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { cn } from "@/lib/utils";

// Reusable "H2 heading + rule + indented body" block used for every
// labelled section on the case-study detail page (Overview, Challenges,
// Objectives, Approach, Post Launch Success, Similar Case Studies).
//
// Heading sits flush left at full container width; body indents to
// xl:pl-[350px] on wide viewports so the prose narrows on desktop without
// crushing on tablets — matches the home How-I-Work pattern (CLAUDE.md §5.1).

type Props = {
  heading: string;
  children?: React.ReactNode;
  /** When true the body skips the xl:pl-[350px] indent (used for grids). */
  fullWidth?: boolean;
  className?: string;
};

export function SectionBlock({
  heading,
  children,
  fullWidth = false,
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <BlurReveal>
        <div className="flex flex-col gap-2">
          <h2 className="text-h2 text-brand-black">{heading}</h2>
          <HorizontalRule />
        </div>
      </BlurReveal>
      {children && (
        <BlurReveal>
          <div className={cn("flex flex-col gap-6", !fullWidth && "xl:pl-[350px]")}>
            {children}
          </div>
        </BlurReveal>
      )}
    </div>
  );
}
