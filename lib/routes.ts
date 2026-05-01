// Routes whose hero sits on the dark surface. The Navbar inverts its theme
// while the user is on one of these, and the over-scroll bg switches to dark
// so the iOS/trackpad bounce doesn't flash white.
export const DARK_ROUTES = ["/about"] as const;

export function isDarkRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return DARK_ROUTES.some((p) => pathname.startsWith(p));
}

// Routes whose first section uses bg-brand-white (#ffffff) rather than the
// default bg-semantic-surface-primary (#faf9f6). RouteBackground sets the
// html+body bg to white on these so the transparent navbar at the top of the
// page sees white behind it — matching the section — instead of the default
// body bg, which would otherwise show as a faint off-white band.
//
// "/journal/" (with trailing slash) matches slug pages only; the listing
// "/journal" has the standard primary bg and is intentionally excluded.
export const WHITE_BG_ROUTES = ["/journal/"] as const;

export function isWhiteBgRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return WHITE_BG_ROUTES.some((p) => pathname.startsWith(p));
}
