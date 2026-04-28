// Build-resilient env loader. We don't throw when a Sanity var is missing —
// the build (e.g. Vercel's first deploy before env vars are configured) needs
// to succeed even without Sanity wired up. Missing values fall back to safe
// placeholders; runtime fetches in /work, /work/[slug] etc. all sit inside
// try/catch and return empty/notFound on failure, so the site renders without
// real Sanity content.
//
// Once `NEXT_PUBLIC_SANITY_PROJECT_ID` is set (in `.env.local` for dev, in
// Vercel's project settings for prod), Sanity reads start working — no other
// code change required.

function readEnv(name: string, fallback: string): string {
  const v = process.env[name];
  if (v && v.length > 0) return v;
  if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
    // Dev-only warning so missing config surfaces in the terminal.

    console.warn(
      `[sanity] ${name} is not set — using placeholder. Sanity reads will fail until this is configured in .env.local.`,
    );
  }
  return fallback;
}

export const apiVersion = readEnv(
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "2024-01-01",
);

export const dataset = readEnv("NEXT_PUBLIC_SANITY_DATASET", "production");

// Placeholder project ID lets the build complete; @sanity/client tolerates an
// invalid ID at construction — actual API calls fail at runtime, where they're
// caught by try/catch.
export const projectId = readEnv(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "l8rn7xb3",
);

export const useCdn = false;
