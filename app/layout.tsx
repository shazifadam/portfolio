import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { geist, inter, stkBureauSerif } from "@/lib/fonts";
import { SiteShell } from "@/components/layout/SiteShell";
import { RouteBackground } from "@/components/layout/RouteBackground";
import { PageTransition } from "@/components/motion/PageTransition";
import { ComingSoonCursor } from "@/components/ui/ComingSoonCursor";
import { MotionProvider } from "@/components/motion/MotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://shazifadam.com"),
  title: {
    default: "Shazif Adam — Designer who builds. Illustrates the rest.",
    template: "%s — Shazif Adam",
  },
  description:
    "Product and brand designer based in Malé, Maldives. Designing and building for international clients.",
  openGraph: {
    title: "Shazif Adam — Designer who builds. Illustrates the rest.",
    description:
      "Product and brand designer based in Malé, Maldives. Designing and building for international clients.",
    url: "https://shazifadam.com",
    siteName: "Shazif Adam",
    type: "website",
    images: [
      {
        url: "/og/website.svg",
        width: 1200,
        height: 630,
        alt: "Shazif Adam — Designer who builds. Illustrates the rest.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shazif Adam",
    description:
      "Product and brand designer based in Malé, Maldives. Designing and building for international clients.",
    images: ["/og/website.svg"],
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
          <PageTransition>
            <main id="main">{children}</main>
          </PageTransition>
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
