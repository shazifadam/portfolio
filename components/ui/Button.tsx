import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "dark" | "light";
type Size = "sm" | "md";

// Pill + circle, same skin on both. Default = no gap (touching). On hover the
// circle translates +4px so a gap APPEARS — using translate keeps the wrapper's
// bounding box constant, so parent layouts (navbar, footer) don't reflow.
//
// Sizes:
//   md — 44px tall pill + 44×44 circle + 24px arrow (Contact, Get in touch). Figma 184:7018.
//   sm — 36px tall pill + 36×36 circle + 20px arrow (Know More).            Figma 181:1242.
const wrapperBase =
  "group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-black";

const surface: Record<Variant, string> = {
  dark: "bg-brand-black text-brand-lightest",
  light: "bg-brand-white text-brand-black",
};

const SIZE: Record<
  Size,
  { pill: string; circle: string; arrow: number }
> = {
  sm: { pill: "h-9 px-6", circle: "h-9 w-9", arrow: 20 },
  md: { pill: "h-11 px-6", circle: "h-11 w-11", arrow: 24 },
};

function ArrowIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ButtonContent({
  variant,
  size,
  children,
}: {
  variant: Variant;
  size: Size;
  children: ReactNode;
}) {
  const skin = surface[variant];
  const sz = SIZE[size];
  return (
    <>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-pill text-cta leading-none whitespace-nowrap",
          sz.pill,
          skin,
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-pill transition-transform duration-300 ease-smooth group-hover:translate-x-1",
          sz.circle,
          skin,
        )}
      >
        <ArrowIcon size={sz.arrow} />
      </span>
    </>
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "dark", size = "md", className, ...rest } = props;
  const classes = cn(wrapperBase, className);

  if ("href" in rest && typeof rest.href === "string") {
    return (
      <Link className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} href={rest.href}>
        <ButtonContent variant={variant} size={size}>{children}</ButtonContent>
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <ButtonContent variant={variant} size={size}>{children}</ButtonContent>
    </button>
  );
}
