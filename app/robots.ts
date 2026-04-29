import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /studio is the embedded Sanity Studio — no value to search engines
      // and shouldn't be indexed. /api routes are handlers, not pages.
      disallow: ["/studio", "/api"],
    },
    sitemap: "https://shazifadam.com/sitemap.xml",
    host: "https://shazifadam.com",
  };
}
