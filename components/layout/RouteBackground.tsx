"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isDarkRoute, isWhiteBgRoute } from "@/lib/routes";

// Toggles surface classes on <html> + <body> to match the first-section bg
// of the current route. This ensures the body bg behind the transparent
// navbar (and iOS/trackpad over-scroll bounce) is always the right colour.
//
// Mounted once in the root layout. There's a tiny first-paint window before
// hydration where the html bg is still the default light — unavoidable
// without server-side pathname knowledge — but it disappears once React mounts.
export function RouteBackground() {
  const pathname = usePathname();
  useEffect(() => {
    const dark = isDarkRoute(pathname);
    const white = isWhiteBgRoute(pathname);
    document.documentElement.classList.toggle("dark-surface", dark);
    document.body.classList.toggle("dark-surface", dark);
    document.documentElement.classList.toggle("white-surface", white);
    document.body.classList.toggle("white-surface", white);
  }, [pathname]);
  return null;
}
