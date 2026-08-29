// Canonical origin for the live site. The apex (shazifadam.com) 307-redirects
// to www at the Vercel domain level, so every absolute URL we emit — OG image
// URLs, sitemap entries, robots — must already be the www host or crawlers
// and social scrapers eat a redirect on each one.
//
// Single source of truth for app/layout.tsx (metadataBase), app/sitemap.ts
// and app/robots.ts.
export const SITE_URL = "https://www.shazifadam.com";
