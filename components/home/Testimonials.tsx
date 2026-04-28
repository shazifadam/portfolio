import { Container } from "@/components/layout/Container";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { cn } from "@/lib/utils";

// Testimonials are hardcoded for now — there's no Sanity schema for them yet
// (PRD §8 only ships caseStudy + journalEntry). The shape stays close to what
// a future schema would return so the migration is mechanical: replace this
// array with a CMS fetch, keep the component identical.
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** CSS colour value — token preferred, e.g. var(--brand-accent-orange). */
  avatarColor: string;
};

// 3×2 grid (6 cards) per Figma 182:3133 (light) / 184:6573 (dark).
// Avatar colours cycle through tokens to match the Figma sequence:
//   row 1 → gray, accent-orange, dark-gray
//   row 2 → dark-gray, gray, black
const PLACEHOLDER_QUOTE =
  "He totally got what I was going for with my brand. The logo is straight-up fire and has received so many compliments already. I'm stoked to put it on all of my branding materials and show it off to the world.";

const TESTIMONIALS: Testimonial[] = [
  {
    quote: PLACEHOLDER_QUOTE,
    name: "Alexander Becher",
    role: "CEO — Unable.agency",
    avatarColor: "var(--brand-gray)",
  },
  {
    quote: PLACEHOLDER_QUOTE,
    name: "Alexander Becher",
    role: "CEO — Unable.agency",
    avatarColor: "var(--brand-accent-orange)",
  },
  {
    quote: PLACEHOLDER_QUOTE,
    name: "Alexander Becher",
    role: "CEO — Unable.agency",
    avatarColor: "var(--brand-dark-gray)",
  },
  {
    quote: PLACEHOLDER_QUOTE,
    name: "Alexander Becher",
    role: "CEO — Unable.agency",
    avatarColor: "var(--brand-dark-gray)",
  },
  {
    quote: PLACEHOLDER_QUOTE,
    name: "Alexander Becher",
    role: "CEO — Unable.agency",
    avatarColor: "var(--brand-gray)",
  },
  {
    quote: PLACEHOLDER_QUOTE,
    name: "Alexander Becher",
    role: "CEO — Unable.agency",
    avatarColor: "var(--brand-black)",
  },
];

function Avatar({ color }: { color: string }) {
  // 40px square inside a 42.769px bounding box, rotated -4.12deg per Figma
  // 182:3142. The outer flex centres it so the rotation pivots around the
  // visual centre and the row's items-center alignment doesn't shift.
  return (
    <div className="flex size-[42.769px] items-center justify-center">
      <div
        aria-hidden
        className="size-10 rounded-sm"
        style={{
          transform: "rotate(-4.12deg)",
          backgroundColor: color,
        }}
      />
    </div>
  );
}

type Tone = "light" | "dark";

function TestimonialCard({
  quote,
  name,
  role,
  avatarColor,
  tone,
}: Testimonial & { tone: Tone }) {
  // Quote text recolours per surface so it stays readable: dark text on the
  // light bg version, light-gray on the dark bg version. Author name + role
  // stay on `--semantic-text-secondary` (mid-gray) which works on both.
  const quoteColor =
    tone === "dark"
      ? "text-semantic-border-light"
      : "text-semantic-text-primary";
  return (
    <div className="flex w-full flex-col items-start gap-[17px]">
      <p className={cn("text-body-xs", quoteColor)}>{quote}</p>
      <div className="flex items-center gap-[10px]">
        <Avatar color={avatarColor} />
        <div className="text-p3 text-semantic-text-secondary leading-[23.625px]">
          <p>{name}</p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ tone = "light" }: { tone?: Tone } = {}) {
  const surface =
    tone === "dark"
      ? "bg-semantic-surface-dark"
      : "bg-semantic-surface-primary";
  const headingColor = tone === "dark" ? "text-brand-white" : "text-brand-black";

  return (
    <section className={cn("py-20 md:py-36", surface)}>
      <Container>
        <div className="flex flex-col gap-10">
          {/* Title block reveals as a unit. Each card below has its own
              BlurReveal so it animates in when its row scrolls into view. */}
          <BlurReveal>
            <div className="flex flex-col gap-4">
              <h2 className={cn("text-h2 max-w-[870px]", headingColor)}>
                What they say
              </h2>
              {/* Default rule (--brand-gray) reads as near-white on dark; drop
                  to --brand-coal so it stays a subtle divider on either bg. */}
              <HorizontalRule
                className={tone === "dark" ? "bg-brand-coal" : undefined}
              />
            </div>
          </BlurReveal>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <BlurReveal key={`${t.name}-${i}`}>
                <TestimonialCard {...t} tone={tone} />
              </BlurReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
