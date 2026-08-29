// Content-Security-Policy for the marketing site (everything except /studio).
//
// Report-Only on purpose — observe violations in DevTools for a release cycle,
// then flip to `Content-Security-Policy` (Tier 2/3). There is no reporting
// endpoint, so no `report-uri` / `report-to`: violations surface only in the
// browser console.
//
// Origins were derived from an audit of app/ components/ lib/ sanity/:
//   - no <script>/<iframe>/dangerouslySetInnerHTML anywhere
//   - next/font self-hosts Inter + STK Bureau Serif (no fonts.gstatic.com)
//   - the only remote host is cdn.sanity.io (images + case-study MP4s)
//   - Vercel Analytics + Speed Insights serve from /_vercel/* (same-origin) in
//     production and from va.vercel-scripts.com in dev/debug mode
//
// `frame-ancestors` and `upgrade-insecure-requests` are ignored by browsers in
// Report-Only mode (they log a notice). They're kept so the flip to enforced
// needs no edit; framing and TLS are already covered by X-Frame-Options and HSTS.
const siteCsp = [
  "default-src 'self'",
  // Next 14 emits inline bootstrap scripts without a nonce (nonces would need
  // middleware, which this repo doesn't have) — 'unsafe-inline' is required.
  // No 'unsafe-eval': Framer Motion's LazyMotion/`m` doesn't need it.
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  // framer-motion writes inline styles on animating elements.
  "style-src 'self' 'unsafe-inline'",
  // data: covers the grain texture SVG in globals.css.
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "media-src 'self' https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Looser Report-Only policy for the embedded Sanity Studio, which is a full
// SPA: it evaluates generated code paths (GROQ / Vision), talks to the Sanity
// APIs directly, and uses blob: workers.
const studioCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://api.sanity.io https://*.api.sanity.io",
  "frame-src 'self' https://*.sanity.io",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

// Applied to every path including /studio — these never conflict, so they live
// in their own entry and the two entries below only carry what differs.
const universalHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Vercel already sets HSTS on custom domains; explicit here to document intent.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Sanity CDN URLs are content-addressed (the asset hash is in the path), so
    // a URL's bytes never change — a 30-day optimizer cache is safe and cuts
    // repeat transform work on Vercel.
    minimumCacheTTL: 2592000,
  },

  // Drop the `X-Powered-By: Next.js` fingerprint.
  poweredByHeader: false,

  async redirects() {
    // Vercel already handles http→https and trailing-slash normalisation.
    return [
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },

  async headers() {
    // Next applies EVERY matching `headers()` entry in order, assigning into a
    // single response-header map (`resHeaders[key] = value` in
    // next/dist/server/lib/router-utils/resolve-routes.js), so the last matching
    // entry wins for a given header name. Rather than rely on that, the site and
    // studio entries use mutually exclusive sources — the site entry's
    // negative-lookahead excludes /studio and /studio/* — so no header name is
    // ever set twice for the same path.
    return [
      { source: "/(.*)", headers: universalHeaders },
      {
        // Everything except /studio and /studio/**.
        source: "/((?!studio(?:/|$)).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy-Report-Only", value: siteCsp },
        ],
      },
      {
        // In Next 14, `/studio/:path*` matches bare `/studio` as well as
        // `/studio/desk/...` (the `*` modifier makes the segment optional).
        source: "/studio/:path*",
        headers: [
          // The Studio has no presentation/preview tool configured, so it never
          // frames itself cross-origin — SAMEORIGIN is enough.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Harmless duplicate of the route-level noindex on /studio.
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Content-Security-Policy-Report-Only", value: studioCsp },
        ],
      },
    ];
  },
};

export default nextConfig;
