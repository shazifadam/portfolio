import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { geist, inter, stkBureauSerif } from "@/lib/fonts";
import { SiteShell } from "@/components/layout/SiteShell";
import { RouteBackground } from "@/components/layout/RouteBackground";
import { ComingSoonCursor } from "@/components/ui/ComingSoonCursor";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shazif Adam — Multidisciplinary Designer specialized in crafting Brand Identities, Interface Designs & Illustrations",
    template: "%s — Shazif Adam",
  },
  description:
    "Product and brand designer based in Malé, Maldives. Designing and building for international clients.",
  // Home's canonical. Metadata is shallow-merged down the tree, so every
  // other route declares its own `alternates` block — otherwise it would
  // inherit this one and self-canonicalise to the homepage.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shazif Adam — Multidisciplinary Designer specialized in crafting Brand Identities, Interface Designs & Illustrations",
    description:
      "Product and brand designer based in Malé, Maldives. Designing and building for international clients.",
    url: SITE_URL,
    siteName: "Shazif Adam",
    type: "website",
    images: [
      {
        url: "/og/website.png",
        width: 1200,
        height: 630,
        alt: "Shazif Adam — Multidisciplinary Designer specialized in crafting Brand Identities, Interface Designs & Illustrations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shazif Adam",
    description:
      "Product and brand designer based in Malé, Maldives. Designing and building for international clients.",
    images: ["/og/website.png"],
  },
};

// iOS Safari uses theme-color to tint the status bar above the page.
// Defaults to the light surface so the chrome reads as a continuation of
// the navbar bg on every page; the dark hero of /about overrides this in
// app/about/page.tsx so the tint matches that surface instead.
//
// `viewport-fit=cover` lets the page extend edge-to-edge under iOS
// chrome — required for `env(safe-area-inset-top)` to expose the notch
// height to the navbar's permanent cap (see components/layout/Navbar.tsx).
export const viewport: Viewport = {
  themeColor: "#faf9f6",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} ${stkBureauSerif.variable}`}>
      <body className="min-h-screen bg-semantic-surface-primary text-semantic-text-primary">
        <MotionProvider>
        {/* Skip-to-content link — invisible until a keyboard user tabs to
            it; lets them jump past the navbar. Standard a11y pattern. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-brand-black focus:px-4 focus:py-2 focus:text-brand-white focus:text-cta"
        >
          Skip to content
        </a>
        <RouteBackground />
        <SiteShell>
          {/* tabIndex={-1} makes the skip-link target programmatically
              focusable; outline-none keeps the focus ring from drawing a
              box around the whole page when the link is used. */}
          <main id="main" tabIndex={-1} className="outline-none focus:outline-none">
            {children}
          </main>
        </SiteShell>
        <ComingSoonCursor />
        {/* Vercel Analytics + Speed Insights — both free tier, cookieless,
            privacy-friendly. Auto-track App Router push-state navigations.
            No env var needed; the @vercel/analytics package ships a no-op
            in dev so only Production deploys send beacons. */}
        <Analytics />
        <SpeedInsights />
        </MotionProvider>
      </body>
    </html>
  );
}
