"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isDarkRoute } from "@/lib/routes";

// Toggles a `dark-surface` class on <html> + <body> when the user is on a
// dark-themed route (currently /about). The class flips both elements'
// background to --semantic-surface-bg-dark so the over-scroll bounce on iOS
// or trackpad doesn't reveal the underlying white.
//
// Mounted once in the root layout. There's a tiny first-paint window before
// hydration where the html bg is still light — unavoidable without
// server-side pathname knowledge — but it disappears once React mounts.
export function RouteBackground() {
  const pathname = usePathname();
  useEffect(() => {
    const dark = isDarkRoute(pathname);
    document.documentElement.classList.toggle("dark-surface", dark);
    document.body.classList.toggle("dark-surface", dark);
  }, [pathname]);
  return null;
}
