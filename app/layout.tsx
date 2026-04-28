import type { Metadata } from "next";
import "./globals.css";
import { geist, inter, stkBureauSerif } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RouteBackground } from "@/components/layout/RouteBackground";
import { PageTransition } from "@/components/motion/PageTransition";
import { ComingSoonCursor } from "@/components/ui/ComingSoonCursor";

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
      </body>
    </html>
  );
}
