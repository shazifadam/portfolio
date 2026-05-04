"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// Routes listed here render without the site navbar and footer — useful for
// standalone pages (link-in-bio, embeds, etc.) that need a clean canvas.
const SHELL_FREE = ["/links"];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = SHELL_FREE.some((r) => pathname === r || pathname?.startsWith(r + "/"));

  if (bare) return <>{children}</>;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
