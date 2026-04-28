// Routes whose hero sits on the dark surface. The Navbar inverts its theme
// while the user is on one of these, and the over-scroll bg switches to dark
// so the iOS/trackpad bounce doesn't flash white.
export const DARK_ROUTES = ["/about"] as const;

export function isDarkRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return DARK_ROUTES.some((p) => pathname.startsWith(p));
}
