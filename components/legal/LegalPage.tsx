import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { BlurReveal } from "@/components/motion/BlurReveal";

// Shared chrome for the privacy + cookie policy pages. Same 770px column
// and centred header as the journal slug page, but uses the site's main
// typography (text-h2 / text-h3 / text-p1) instead of the journal's
// reader-oriented serif stack.
export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-semantic-surface-primary py-20 md:py-36">
      <Container>
        <div className="mx-auto flex max-w-[770px] flex-col gap-12">
          <BlurReveal>
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-h2 text-balance text-semantic-text-primary">
                {title}
              </h1>
              <p className="text-p3 text-semantic-text-secondary">
                Last updated {lastUpdated}
              </p>
            </div>
          </BlurReveal>

          <BlurReveal>
            {/* Prose stack — child sections render as <LegalSection> with
                their own h2 + paragraph classes; the wrapper just lays
                them out vertically and lets links pick up an underline. */}
            <div className="flex flex-col gap-10 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-black [&_a]:transition-colors">
              {children}
            </div>
          </BlurReveal>
        </div>
      </Container>
    </section>
  );
}

// One section inside a legal page — h3-style heading + body content.
// Body is whatever the caller passes (paragraphs, lists, nested blocks).
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 text-semantic-text-primary">{heading}</h2>
      <div className="flex flex-col gap-4 [&>p]:text-p1 [&>p]:text-semantic-text-primary [&>ul]:text-p1 [&>ul]:text-semantic-text-primary [&>ul]:list-disc [&>ul]:pl-[1.5em] [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2">
        {children}
      </div>
    </section>
  );
}
