import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lightest: "var(--brand-lightest)",
          "light-gray": "var(--brand-light-gray)",
          gray: "var(--brand-gray)",
          mist: "var(--brand-mist)",
          "accent-orange": "var(--brand-accent-orange)",
          "dark-gray": "var(--brand-dark-gray)",
          coal: "var(--brand-coal)",
          black: "var(--brand-black)",
          white: "var(--brand-white)",
        },
        semantic: {
          "text-primary": "var(--semantic-text-primary)",
          "text-secondary": "var(--semantic-text-secondary)",
          "surface-dark": "var(--semantic-surface-bg-dark)",
          "surface-primary": "var(--semantic-surface-bg-primary)",
          "border-light": "var(--semantic-border-light)",
        },
      },
      fontFamily: {
        display: "var(--font-display)",
        primary: "var(--font-primary)",
        tag: "var(--font-tag)",
      },
      maxWidth: {
        // Mirrors --container-max in globals.css. Single source of truth lives
        // in CSS so designers can tweak via :root without rebuilding Tailwind.
        container: "var(--container-max)",
      },
      borderRadius: {
        sm: "4px",
        pill: "999px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      // Note: animation keyframes live in app/globals.css (.animate-artwork-ticker)
      // rather than this config — Tailwind config changes require a dev-server
      // restart to surface in compiled CSS, so globals.css is the more reliable
      // home for one-off named animations.
    },
  },
  plugins: [],
};

export default config;
