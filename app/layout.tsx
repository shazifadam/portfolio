import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { geist, inter, stkBureauSerif } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RouteBackground } from "@/components/layout/RouteBackground";
import { PageTransition } from "@/components/motion/PageTransition";
import { ComingSoonCursor } from "@/components/ui/ComingSoonCursor";

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Shazif Adam",
    description:
      "Product and brand designer based in Malé, Maldives. Designing and building for international clients.",
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
        <RouteBackground />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <ComingSoonCursor />
        {/* Plausible analytics — loads only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN
            is set, so dev / preview without the env var don't fire pageviews
            into the production site. The default `script.js` auto-tracks
            App Router push-state navigations as pageviews. */}
        {plausibleDomain && (
          <Script
            defer
            strategy="afterInteractive"
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}
