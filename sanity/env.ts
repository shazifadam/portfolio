// Build-resilient env loader. We don't throw when a Sanity var is missing —
// the build (e.g. Vercel's first deploy before env vars are configured) needs
// to succeed even without Sanity wired up. Missing values fall back to safe
// placeholders; runtime fetches in /work, /work/[slug] etc. all sit inside
// try/catch and return empty/notFound on failure, so the site renders without
// real Sanity content.
//
// IMPORTANT: each NEXT_PUBLIC_* var MUST be referenced as a direct, literal
// member expression — `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID`. Next.js
// inlines those into the client bundle by static text substitution. A dynamic
// lookup (`process.env[name]`) is NOT inlined: it works server-side, where
// process.env is a real object, but resolves to undefined in the browser —
// which silently fed the placeholder ID to the client-side Studio.

function pick(
  value: string | undefined,
  name: string,
  fallback: string,
): string {
  if (value && value.length > 0) return value;
  if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
    // Dev-only warning so missing config surfaces in the terminal.
    console.warn(
      `[sanity] ${name} is not set — using placeholder. Sanity reads will fail until this is configured in .env.local.`,
    );
  }
  return fallback;
}

export const apiVersion = pick(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "2024-01-01",
);

export const dataset = pick(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
  "production",
);

// Placeholder project ID lets the build complete. It MUST contain only the
// characters @sanity/client permits in a projectId (a-z, 0-9, dashes) — an
// underscore makes createClient() throw synchronously at construction.
export const projectId = pick(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "missing-project-id",
);

export const useCdn = false;
