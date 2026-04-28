# shazifadam.com — Project Blueprint (CLAUDE.md)

> **Source of truth:** *PRD v3.1 — shazifadam.com Personal Portfolio Website* (Shazif Adam, April 2026).
> The PRD is shared as a session attachment, not committed to the repo. Whenever this file and the PRD disagree, the PRD wins. Update this file to reflect the PRD; never the other way.

This file is the operational map for Claude sessions working on this project. It captures the full PRD execution plan in build order, with concrete file paths, schema decisions, type tokens, layout rules, and acceptance criteria for each phase.

---

## 0. Project identity

- **Brand line:** *Designer who builds. Illustrates the rest.*
- **Footer CTA:** *Good design isn't seen. It's felt. Let's start work today!*
- **SEO caption:** *Product and brand designer based in Malé, Maldives. Designing and building for international clients.*
- **Audience:** International agencies, NGOs, global brands.
- **Designer/owner:** Shazif Adam — Co-Founder & Creative Director, Encrea Studio.

---

## 1. Tech stack (locked)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | TypeScript, RSC by default |
| Styling | Tailwind CSS + CSS custom properties | Tokens in `globals.css`, type utilities in Tailwind layer |
| CMS | Sanity.io Studio v3 | Embedded studio at `/studio` |
| Animation | Framer Motion | Page transitions + blur/grain reveal |
| Email | Resend + React Hook Form | `/api/contact` route |
| Analytics | Plausible | Script in root layout |
| Hosting | Vercel | Domain: shazifadam.com |

### Dependencies to install

```
next react react-dom
typescript @types/react @types/node
tailwindcss postcss autoprefixer
framer-motion
react-hook-form
resend
@sanity/client @sanity/image-url next-sanity sanity @portabletext/react
@sanity/vision
clsx
```

---

## 2. Repository layout (target)

```
.
├── app/
│   ├── layout.tsx                     # Root, fonts, Navbar, Footer, transitions
│   ├── page.tsx                       # Home
│   ├── globals.css                    # Tokens + type classes + grain
│   ├── about/page.tsx
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── journal/page.tsx               # Shell only, nav link disabled at launch
│   ├── studio/[[...tool]]/page.tsx    # Embedded Sanity Studio
│   └── api/
│       └── contact/route.ts           # Resend handler
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx              # max-w-[80rem], 104px / 24px padding
│   ├── ui/
│   │   ├── Button.tsx                 # variants: dark | light
│   │   ├── SectionLabel.tsx
│   │   ├── HorizontalRule.tsx
│   │   ├── TagPill.tsx                # icon + label, Inter 18
│   │   └── Pill.tsx                   # hero discipline tags
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Expertise.tsx
│   │   ├── WorkGrid.tsx
│   │   ├── HowIWork.tsx
│   │   ├── ArtworkStrip.tsx
│   │   └── Testimonials.tsx
│   ├── case-study/
│   │   ├── CaseStudyCard.tsx          # asymmetric grid card
│   │   ├── CaseStudyHeader.tsx
│   │   ├── PhotoBlock.tsx             # single | pair
│   │   ├── TextBlock.tsx
│   │   ├── PostLaunchBlock.tsx
│   │   └── SimilarStudies.tsx
│   ├── about/
│   │   ├── Bio.tsx
│   │   └── IllustrationStrip.tsx
│   ├── contact/
│   │   └── ContactForm.tsx
│   └── motion/
│       ├── PageTransition.tsx
│       └── BlurReveal.tsx
├── sanity/
│   ├── schemas/
│   │   ├── index.ts
│   │   ├── caseStudy.ts
│   │   └── journalEntry.ts
│   ├── lib/
│   │   ├── client.ts                  # createClient
│   │   ├── image.ts                   # urlFor builder
│   │   └── queries.ts                 # GROQ queries
│   ├── env.ts
│   └── sanity.config.ts
├── lib/
│   ├── fonts.ts                       # next/font/local + next/font/google
│   ├── tags.ts                        # tag → icon map
│   └── utils.ts                       # cn(), etc.
├── public/
│   ├── fonts/                         # STK Bureau Serif (woff2)
│   ├── icons/tags/                    # Identity, Visuals, Web App, Website, Design System, Mobile App
│   └── images/                        # static assets, og images
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── package.json
├── .env.local                         # SANITY_*, RESEND_*, NEXT_PUBLIC_PLAUSIBLE_*
├── .env.example
├── .gitignore
├── CLAUDE.md
└── shazifadam-prd-v3.1.md
```

---

## 3. Design system — non-negotiable values

### 3.1 Colour tokens (CSS custom properties, defined in `globals.css`)

```
--brand-lightest         #faf9f6
--brand-light-gray       #f0efeb
--brand-gray             #e8e6e1
--brand-mist             #c4c4c4   /* pill bg on LIGHT surfaces (cursor) */
--brand-accent-orange    #f58c63
--brand-dark-gray        #6b6b6b   /* underline on dark surfaces (footer, navLight) */
--brand-coal             #3a3a3a   /* pill bg on DARK surfaces (mobile-menu badge) */
--brand-black            #111110
--brand-white            #ffffff
--semantic-text-primary       #111110
--semantic-text-secondary     #6b6b6b
--semantic-surface-bg-dark    #111110
--semantic-surface-bg-primary #faf9f6
--semantic-border-light       #e8e6e1
```

Expose all to Tailwind via `theme.extend.colors` (kebab-cased).

### 3.2 Typography

Three families, loaded via `next/font` (see [lib/fonts.ts](lib/fonts.ts)):

- **STK Bureau Serif** — local `.otf` files in `public/fonts/` (Light 300, Book 400). Use `next/font/local`.
- **Geist** — local variable font already shipped by create-next-app under `app/fonts/`.
- **Inter** — `next/font/google` (Regular 400). Tag pills only.

CSS variables wired by `next/font`: `--font-stk-bureau-serif`, `--font-geist`, `--font-inter`. Aliased in `:root` to `--font-display`, `--font-primary`, `--font-tag` so the type classes stay decoupled from family changes.

#### Type tokens (canonical source — Figma)

The type system is the **Figma token list**, audited against this file. All classes live in the `@layer components` block of [app/globals.css](app/globals.css).

| Figma token | CSS class | Family | Weight | Size / LH / Tracking | Notes |
|---|---|---|---|---|---|
| `Headings/H0` | `.text-h0` | display | 300 | 84.15 / 84.15 / -1.13 | Hero only |
| `Headings/H1` | `.text-h1` | display | 300 | 76.5 / 84.15 / -1.13 | Page heroes |
| `Headings/H2` | `.text-h2` | display | 300 | 54 / 72.9 / -0.6 | Section headings |
| `Headings/H3` | `.text-h3` | display | **400 (Book)** | 31.5 / 42.525 / -0.28 | Card titles, indented body, mobile menu links |
| `Paragraph/P1` | `.text-p1` | primary | 400 | 22.5 / 33.75 / 0 | Hero caption |
| `Paragraph/P2` | `.text-p2` | primary | 400 | 20.25 / 30.375 / 0 | Expertise body, About bio |
| `Paragraph/P3` | `.text-p3` | primary | 400 | 15.75 / 23.625 / +0.14 | Attribution, breadcrumb |
| `headliner` | `.text-headliner` | primary | 400 | 18 / 27 / +4.5 | Hero pills (no caps applied) |
| `navbarlabel` | `.text-navbarlabel` | primary | 500 | 20.25 / normal / 0 | Every nav + footer text link |
| `cta-button` | `.text-cta` | primary | 600 | 15.75 / — / +1.125 caps | Button labels, ComingSoonBadge |
| `TagLabel` | `.text-tag` | tag (Inter) | 400 | 18 / 27 / 0 | Case-study tag pills |
| (PRD-only) | `.text-body-xs` | primary | 400 | 18 / 27 / 0 | General body, testimonials, copyright |
| (convenience) | `.text-label` | primary | 400 | 18 / 27 / +4.5 + uppercase | Section labels (MY EXPERTISE etc.) — `headliner` + caps |

Mobile overrides for H0–H3 + P1, P2, label live in the `@media (max-width: 768px)` block.

> **Mobile H0/H1 distinction is preserved** — both 45px font-size, but H1 has 54px line-height. Don't merge them.

### 3.3 Container

```css
.container {
  width: 100%;
  max-width: 80rem;       /* 1280px */
  margin-inline: auto;
  padding-inline: 104px;
}
@media (max-width: 768px) {
  .container { padding-inline: 24px; }
}
```

Section *backgrounds* are full-bleed; only the **content** is constrained. Apply `Container` to: navbar inner, every section content wrapper, footer inner.

### 3.4 Other tokens

```
--radius-sm: 4px;
--radius-pill: 999px;
--container-max: 96rem;   /* 1536px */
--container-px: 104px;
```

---

## 4. Global components

> **Source-of-truth rule.** Every colour/font/dimension reference goes through a token (`--brand-*`, `--semantic-*`, `--font-*`, `--radius-*`, or a named type class). **Never inline a raw hex code, font-family, or spacing pixel value** unless it's a Figma-pinned dimension that has no token equivalent (and even then, comment it). If a value is missing from the token set, add the token first — don't bypass it.

### 4.0 Mandatory patterns — repeat verbatim across every new page

These are the established interaction and animation patterns. **Any new page (Work, About, Contact, Case Study Detail, Journal) MUST adopt them as-is.** No reinventing.

| Pattern | Component / Where it lives | Rule |
|---|---|---|
| **Layout container** | `<Container>` ([components/layout/Container.tsx](components/layout/Container.tsx)) | Wraps every section's inner content. Width via `--container-max` (96rem / 1536px). Full-bleed effects (backgrounds, gradients, marquees) sit OUTSIDE Container. |
| **Section reveal — text/heading blocks** | `<BlurReveal>` ([components/motion/BlurReveal.tsx](components/motion/BlurReveal.tsx)) | Wraps heading/text blocks below the hero. Viewport-triggered (`useInView`, fires once at `-10%` margin). `opacity 0→1` + `blur 16px→0` + `y 12px→0`, **1.5s** `cubic-bezier(0.22, 1, 0.36, 1)`. |
| **Section reveal — grid/card sections** | `<CardReveal>` ([components/motion/CardReveal.tsx](components/motion/CardReveal.tsx)) | Per-card viewport-triggered reveal. Same blur+y+opacity values as BlurReveal (1.5s, ease-smooth). On desktop applies a **0.2s delay to left-column cards** (`columnIndex === 0`) so the right card reveals first per row. Mobile (single column) suppresses the per-position delay — every card animates as it scrolls in. |
| **Hero on-load reveal** | `<HeroReveal>` ([components/motion/HeroReveal.tsx](components/motion/HeroReveal.tsx)) | Mount-triggered (no IntersectionObserver — hero is in view by definition). `opacity 0→1` + `blur 24px→0` + `y 32px→0`, 1.5s. Used for staggered hero-element reveals with explicit `delay` per child. |
| **Page transitions** | `<PageTransition>` ([components/motion/PageTransition.tsx](components/motion/PageTransition.tsx)) | Currently a pass-through. The previous motion-wrapper version interfered with hero animations during hydration. Keep pass-through until route transitions are re-introduced via a different mechanism. |
| **Underline links** | `<UnderlineLink>` ([components/ui/UnderlineLink.tsx](components/ui/UnderlineLink.tsx)) | Used by every nav link AND every footer text link. Absolute 2px underline that slides 4px down + colour-shifts on hover; **text never moves**. Variants: `navDark`, `navLight`, `footerMuted`, `disabled`. |
| **CTA button** | `<Button>` ([components/ui/Button.tsx](components/ui/Button.tsx)) | Pill + separate circle. Default touching, hover translates the circle right `+4px` (no layout shift). Sizes: `md` (44px) default, `sm` (36px) for secondary CTAs like "Know More". |
| **Coming-soon hover cursor** | `<ComingSoonCursor>` mounted in [app/layout.tsx](app/layout.tsx) | Triggered by `data-coming-soon` attribute on any element. Desktop hover only (`(hover: hover) and (pointer: fine)`). Native cursor hidden via global rule in `globals.css`. Used for Journal + Shop in the navbar; reuse for any "not yet shipped" element. |
| **Grain texture** | Global `body::after` ([app/globals.css](app/globals.css)) | `feTurbulence baseFrequency=1.2`, `opacity 0.08`, `mix-blend-mode: multiply`. Always present — reveals scatter through it during BlurReveal/CardReveal which is what gives the "grain emerges" feel. Don't disable per-section. |
| **Reduced-motion** | Global `@media (prefers-reduced-motion: reduce)` in [app/globals.css](app/globals.css) | Clamps all CSS animation/transition durations to 0.01ms. Honours user preference automatically — no per-component handling needed. |
| **Token discipline** | All colour / font / radius / spacing | Through CSS variables and the named type classes (§3.2 table). Never inline `#hex`, never use raw `font-family`, never bypass `--container-max` / `--container-px`. Add a token before bypassing one. |

### 4.1 Component inventory

### Button — [components/ui/Button.tsx](components/ui/Button.tsx)
- Two surfaces in one wrapper: a pill (`h-11 px-6`) + a separate 44×44 circle (`h-11 w-11`).
- Same skin on both surfaces: `dark` = bg-brand-black + text-brand-lightest, `light` = bg-brand-white + text-brand-black.
- Default: pill and circle touching (gap-0). On hover the circle **`translate-x-1`** so a 4px gap appears — `translate` keeps the wrapper width constant, so the navbar/footer never reflow on hover.
- Arrow: 24px inline SVG with `currentColor` (no remote Figma image asset).

### UnderlineLink — [components/ui/UnderlineLink.tsx](components/ui/UnderlineLink.tsx)
Shared text-with-underline link. Variants: `navDark`, `navLight`, `footerMuted`, `disabled`.
- Underline is **absolutely positioned** at `bottom-1` (4px) inside a `pb-1.5` (6px) wrapper. The text is in normal flow → never moves.
- Hover: underline `translate-y-1` (4px down) + colour swap. 2px tall (`h-0.5`).
- Default underline colour is **surface-aware**: `navDark` on light bg uses `--brand-gray`; `navLight` and `footerMuted` on dark bg use `--brand-dark-gray` (clearly visible mid-gray, not near-white). Hover ink is the variant's primary text colour (black on light, white on dark).
- Used by every nav link AND every footer text link (Privacy, Cookie, Instagram, Threads, LinkedIn, X).
- `disabled` variant is `pointer-events-none`, gray text, gray rule, no hover.

### Navbar — [components/layout/Navbar.tsx](components/layout/Navbar.tsx)

Desktop: `[Logo]   Work · About · Journal · Shop↗   [Contact CTA]`
- Sticky, **solid bg `--semantic-surface-bg-primary`** (no blur).
- **Scroll behaviour** — accumulator-based hide/show:
  - Always visible while `scrollY < 16px` (the "near top" zone).
  - **Hides** after the user has scrolled DOWN ≥ **100px** in one direction (downward accumulator). Reversing direction resets the down accumulator.
  - **Shows** after scrolling UP ≥ **30px** (upward accumulator). Reversing resets the up accumulator.
  - Transform: `translate-y-0` ↔ `-translate-y-full`, **600ms** `ease-smooth`. Scroll handler is rAF-throttled.
  - Mobile menu open keeps the navbar pinned visible regardless of scroll state.
- Work, About → `<UnderlineLink variant="navDark">`.
- Journal, Shop → `<UnderlineLink variant="disabled">` wrapped in `<span data-coming-soon>` (triggers the desktop hover cursor — Shop also has the ↗ arrow).
- Contact CTA → `<Button variant="dark" size="md">`.

Mobile: hamburger trigger → full-viewport `<MobileMenu>` overlay (defined in the same file).
- Wrapper: `fixed inset-0 z-[100]` with `100dvh` (not `100vh`, so iOS keyboard/address bar doesn't clip the Contact CTA).
- Visibility is class-toggled (`flex` ↔ `hidden`) — **NOT** the `hidden` HTML attribute, because the attribute's `display: none` loses to the `flex` class on equal CSS specificity.
- Top bar: logo placeholder (gray-dark) + close (×) button. Always rendered while overlay is in DOM.
- **Body is conditionally rendered** (`{open && <MobileMenuBody />}`) so motion children re-mount and replay their entrance animation on every open.
- Items (Work · About · Journal · Shop) followed by Contact CTA — Contact pinned to the bottom via `flex-1 flex-col justify-between` + `pb-12`.
- Disabled items (Journal, Shop) show `<ComingSoonBadge tone="onDark">` next to the label.
- Body scroll is locked while open (`useScrollLock`).
- `Escape` closes the menu.
- **Item reveal cadence** (motion.li per item, mandatory):
  - `initial = { opacity: 0, filter: "blur(24px)", y: 32 }` → `animate = { opacity: 1, filter: "blur(0px)", y: 0 }`
  - duration **0.6s** with `cubic-bezier(0.22, 1, 0.36, 1)`
  - delays: Work `0` · About `0.1` · Journal `0.2` · Shop `0.3` · Contact `0.4`
  - This reveal **replays every time the menu opens** (because of the conditional render).

### Footer — [components/layout/Footer.tsx](components/layout/Footer.tsx)
Bg `--semantic-surface-bg-dark`. Inner `Container` with `py-16`.
- Heading row: `flex-col` on mobile (circles ON TOP, then heading), `md:flex-row md:justify-between` on desktop (heading left, circles right) via `order-1 md:order-2`. Heading uses `<br>` to force the line break.
- Two-circle ornament: 76×76 each, no gap. Left = `--brand-dark-gray`, right = `--brand-lightest`. **Replace with images later — keep the same dimensions.**
- Get in touch CTA: `light` Button.
- Bottom row: Privacy / Cookie + copyright (left), socials (right). Socials are **hidden on mobile** per Figma 184:7224.
- Copyright year is `new Date().getFullYear()` so it auto-rolls over.

### Pill — [components/ui/Pill.tsx](components/ui/Pill.tsx)
Hero discipline pills (UI/UX · WEB · BRAND IDENTITY · ILLUSTRATION).
- Uses `text-headliner` (Geist 400, 18/27, +4.5 — the Figma `headliner` token).
- Border `--semantic-border-light`, padding `px-6 py-2` (24/8 per Figma 182:2799).
- Order is intentional so it wraps cleanly on mobile (UI/UX + WEB row 1, BRAND IDENTITY row 2, ILLUSTRATION row 3).

### ComingSoonBadge — [components/ui/ComingSoonBadge.tsx](components/ui/ComingSoonBadge.tsx)
Pill saying "Coming Soon" — Figma 237:8657. Two tones:
- `onDark` — bg `--brand-coal` (#2e2e2e). Darker than the gray text; sits clearly on dark surfaces (mobile menu).
- `onLight` — bg `--brand-mist` (#c4c4c4). Lighter than the gray text; sits clearly on light surfaces (desktop cursor).

Text always uses `.text-cta` (Geist SemiBold 15.75, +1.125, uppercase) in `--semantic-text-secondary`.

### ComingSoonCursor — [components/ui/ComingSoonCursor.tsx](components/ui/ComingSoonCursor.tsx)
Mounted once, globally, in [app/layout.tsx](app/layout.tsx).
- Listens to global `mousemove` + `mouseover`. Visible only while the cursor is over an element with `data-coming-soon`.
- Restricted to fine-pointer / hover-capable devices via `(hover: hover) and (pointer: fine)` — touch devices never see it.
- Native cursor is hidden over `[data-coming-soon]` via the global rule in [app/globals.css](app/globals.css).
- Renders a `ComingSoonBadge tone="onLight"` slightly above the cursor position.

### SectionLabel — [components/ui/SectionLabel.tsx](components/ui/SectionLabel.tsx)
`.text-label` in `--semantic-text-secondary`.

### HorizontalRule — [components/ui/HorizontalRule.tsx](components/ui/HorizontalRule.tsx)
1px `--brand-gray`, full container width.

### TagPill — [components/ui/TagPill.tsx](components/ui/TagPill.tsx)
Bare chip (no border, no fill) per Figma 180:914. Icon (24×24, from [lib/tags.ts](lib/tags.ts)) + label in `.text-tag` (Inter 18/27/0), colour `--brand-dark-gray`, padding `pl-1 pr-2 py-0.5`.

| Tag value | Label | Icon (svg in `public/icons/tags/`) |
|---|---|---|
| `identity` | Identity | brand-identity.svg (Diamond/gem) |
| `visuals` | Visuals | visuals.svg (Eye/star) |
| `webApp` | Web App | web-app.svg (Browser window) |
| `website` | Website | website.svg (Globe) |
| `designSystem` | Design System | design-system.svg (Dashboard grid) |
| `mobileApp` | Mobile App | mobile-app.svg (Phone) |

The tag icons are already provided in `public/icons/tags/` — reuse them; do not regenerate.

---

## 5. Pages — content & layout

### 5.1 Home `/`

Mounted in [app/page.tsx](app/page.tsx) in this exact order — **diverges from PRD §7's original rhythm; this is the canonical order Shazif approved**:

```
Hero → Expertise → Work → How I Work → Testimonials → Artwork strip → Footer
```

Section rhythm: Light → Dark → Light → Dark → Light → Light → Dark.

#### Hero — [components/home/Hero.tsx](components/home/Hero.tsx) — light, `--brand-lightest`
- Section padding `pt-24 pb-24 md:pb-32`, content centred via `Container className="flex flex-col items-center gap-10 text-center"`.
- **H0 line 1**: *"Designer who builds."* in `--brand-black`. Mobile `<br className="md:hidden">` after "Designer".
- **H0 line 2**: *"Illustrates the rest."* in `--brand-accent-orange`. Mobile `<br>` after "Illustrates".
- **Discipline pills**: `UI/UX · WEB · BRAND IDENTITY · ILLUSTRATION` (this exact order — wraps cleanly on mobile as 2-1-1). Component: `<Pill>`. Gap `[17px]`.
- **P1 caption** (max-width 664px): *"Product and brand designer based in Malé, Maldives. Designing and building for international clients."* Mobile `<br>` after "designer" and "building" so it stacks on 4 lines.
- **GIF grid** — five absolutely-positioned cards in a `position: relative` container with `aspect-ratio: 1280 / 340`. Card heights are percentages so cards stay proportional at any viewport (no stretching). Mobile uses 3 cards with `aspect-ratio: 327 / 163`. All cards `rounded-sm`, all bgs token references.

| Card | Width | Height | Top | Left | Bg token | z | Mobile? |
|---|---|---|---|---|---|---|---|
| 1 | 26.68% | 66.76% | 0% | 0% | `--brand-black` | 1 | ✓ |
| 2 | 26.68% | 66.76% | 0% | 37.21% | `--brand-gray` | 1 | — |
| 3 | 26.68% | 66.76% | 0% | 73.32% | `--brand-dark-gray` | 1 | — |
| 4 | 26.68% | 66.76% | 33.24% | 14.48% | `--brand-dark-gray` | 2 | — |
| 5 | 26.68% | 66.76% | 33.24% | 54.63% | `--brand-accent-orange` | 2 | ✓ (orange) |

Mobile card 2 (gray) replaces card 3 (dark-gray) at left 58.23%. Cards swap to GIF/video later — solid token bgs are placeholders.

- **On-load reveal cadence** via `<HeroReveal>` (mount-triggered, no IntersectionObserver):

| Element | Delay (s) |
|---|---|
| H0 line 1 | 0.0 |
| H0 line 2 | 0.2 |
| Pill 1 (UI/UX) | 0.3 |
| Pill 2 (WEB) | 0.4 |
| Pill 3 (BRAND IDENTITY) | 0.5 |
| Pill 4 (ILLUSTRATION) | 0.6 |
| P1 caption | 0.7 |
| GIF grid | 0.8 |

Constants are named (`REVEAL_LINE_1` etc.) at the top of [Hero.tsx](components/home/Hero.tsx) — change one number to retime the whole sequence.

#### Expertise — [components/home/Expertise.tsx](components/home/Expertise.tsx) — dark, `--semantic-surface-bg-dark`
- Section padding `py-20 md:py-36`. SectionLabel "MY EXPERTISE".
- **Layout**: 2 explicit row containers (each `grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12`) so each row gets its own `<CardReveal>` per cell. **Cards stack icon-on-top, text-below at every viewport** (no desktop horizontal flip).
- 4 items, row-major reading order matches Figma 180:792:

| # | Row / Col | Title | Body |
|---|---|---|---|
| 1 | R1 / C1 | Experience Design | I design products that are structurally sound, visually considered, and built around how people actually move through them. |
| 2 | R1 / C2 | Brand Identity | A brand is a system, not a logo. I build identity from the inside out, visual language and logic that holds coherent across every surface. |
| 3 | R2 / C1 | Web & Product Development | I build what I design. From Figma to a live, functional product, without losing design intent in translation. |
| 4 | R2 / C2 | Illustration | An eye trained on observation sharpens how I see proportion, texture, and detail in every system I design. |

- Each card: 113×113 icon placeholder (1px `border-brand-accent-orange`, `rounded-sm`) + H3 title (`text-semantic-border-light`) + P2 body (`text-semantic-text-secondary`). 16px gap inside card.
- Reveal: SectionLabel via `<BlurReveal>`, each card via `<CardReveal columnIndex={0|1}>` — right-card-first per row on desktop.

#### Work — [components/home/Work.tsx](components/home/Work.tsx) — light, `--semantic-surface-bg-primary`
- Section padding `py-20 md:py-36`. H2 *"While design is more than meets the eye, here's the visible part."* + `<HorizontalRule>`. Heading wrapped in `<BlurReveal>`.
- **Home shows 6 featured projects** (`HOME_PROJECTS.slice(0, 6)`). When Sanity is wired up, the home GROQ pulls 6 featured items via `homeFeaturedCaseStudiesQuery` (§6).
- Grid via `<WorkGrid>` ([components/case-study/WorkGrid.tsx](components/case-study/WorkGrid.tsx)) — chunks items into rows of 2 and alternates `[big | small]` ↔ `[small | big]` per row (the masonry pattern). Aspect: big = `600/489`, small = `530/363` desktop / `600/489` mobile.

| Row | Pattern | Items (current seed) |
|---|---|---|
| 1 | big · small | Mytkt.app · FitBase |
| 2 | small · big | QMed Pharmacy · GenAI Hackathon |
| 3 | big · small | Mytkt.app · FitBase (repeats row 1 — to be replaced when Sanity has 6 real entries) |

- Card colours per project (`titleStartColor`, inline because per-project content not design tokens):

| Project | Colour | Descriptor | Tags |
|---|---|---|---|
| Mytkt.app | `#a1d147` | Ticketing platform designed to make your events easy | Identity · Visuals · Web App · Design System |
| FitBase | `#3157ee` | Fitness trainer app for session and payment management | Visuals · Website |
| QMed Pharmacy | `#8c8c8c` | Giving a digital face for a pharmacy | Visuals · Website |
| GenAI Hackathon | `#df52ec` | Solving the hassle of managing cases | Identity · Visuals · Web App · Website · Design System |

- Each card wrapped in `<CardReveal columnIndex={0|1}>` for the right-first row stagger.
- `<CaseStudyCard>` ([components/case-study/CaseStudyCard.tsx](components/case-study/CaseStudyCard.tsx)) is layout-agnostic (always `w-full` of parent) — width is owned by the row wrapper. Reused on `/work`, similar studies, anywhere.

#### How I Work — [components/home/HowIWork.tsx](components/home/HowIWork.tsx) — dark, `--semantic-surface-bg-dark`
- Section padding `py-20 md:py-36`. SectionLabel "HOW I WORK".
- Indent: `xl:pl-[350px]` (kicks in only at 1280px+, per PRD §5.1's "full width ≤ 1280px"). Below xl the body uses the full container width.
- Body: H3 in `text-brand-white`, two paragraphs separated by `mt-[1lh]` (one CSS line-height of breathing room — keyed to H3's line-height token, no magic px).
  > *Most projects break at the gap between design and delivery. I close that gap — by designing with build in mind from the start, and building with design intent preserved all the way to the end.*
  >
  > *It's not a handoff. It's a single thread from brief to browser.*
- CTA: `<Button href="/about" variant="light" size="sm">Know More</Button>` — points to **`/about`**. The `sm` size (h-9 + 36px circle + 20px arrow) is the secondary-CTA standard; reuse for similar "Know more / Read more" links elsewhere.
- Whole inner block wrapped in `<BlurReveal>`.

#### Testimonials — [components/home/Testimonials.tsx](components/home/Testimonials.tsx) — light, `--semantic-surface-bg-primary`
- Section padding `py-20 md:py-36`. H2 *"What they say"* + `<HorizontalRule>`. Heading wrapped in `<BlurReveal>`.
- **6 cards in a 3×2 grid on desktop** (`grid-cols-1 md:grid-cols-3 gap-10`), single column on mobile. Avatar colour sequence per Figma 182:3133:

| Row / Col | Avatar token |
|---|---|
| R1 / C1 | `--brand-gray` |
| R1 / C2 | `--brand-accent-orange` |
| R1 / C3 | `--brand-dark-gray` |
| R2 / C1 | `--brand-dark-gray` |
| R2 / C2 | `--brand-gray` |
| R2 / C3 | `--brand-black` |

- Each card: quote (`text-body-xs` in `text-semantic-text-primary`) + author block (40×40 square avatar **rotated -4.12deg** in a 42.769px bounding box, name + role in `text-p3`/`text-semantic-text-secondary`).
- Each card wrapped in `<BlurReveal>`.
- Quote text is a single shared `PLACEHOLDER_QUOTE` constant. Real quotes replace per-author when content is ready.

#### Artwork strip — [components/home/ArtworkStrip.tsx](components/home/ArtworkStrip.tsx) — light, `--semantic-surface-bg-primary`
- Section padding `py-20 md:py-36`. H2 *"Artwork and other things I do in my free time"* (`<br className="hidden md:inline">` between "things" and "I do" so the line break only fires on desktop) + `<HorizontalRule>`.
- **Strip is full-bleed** (sits OUTSIDE Container at the section level). `aspect-ratio: 1484 / 483`, `overflow-hidden`.
- Marquee track: 6 colour tiles, doubled (`[...TILES, ...TILES]`), `mr-4` per tile (NOT flex `gap` — trailing margin keeps the rhythm consistent across the loop boundary). Colours all from token palette (`--brand-black`, `--brand-accent-orange`, `--brand-dark-gray`, `--brand-coal`, `--brand-mist`, `--brand-gray`).
- Animation `animate-artwork-ticker` defined in [app/globals.css](app/globals.css): `translateX(0 → -50%)`, **120s linear infinite**. Doubling makes the loop seamless.
- **Edge gradients** (left + right): `w-16 md:w-32`, `from-semantic-surface-primary via-semantic-surface-primary/30 to-transparent`. Three-stop fade so the gradient tapers gradually rather than hard-walling at the edge.
- Whole inner column wrapped in `<BlurReveal>`.

#### Footer
- Standard global footer (see §4 inventory).

### 5.2 Work `/work`

1. Hero: Label `CASE STUDIES` + H1 *"While design is more than meets the eye, here's the visible part."*
2. Featured grid — same asymmetric layout as homepage, projects with `featured: true` ordered by `order`.
3. Honest Account (dark bg):
   - Label `HONEST ACCOUNT`.
   - H3 body (white):
     > *UI/UX and product design is where I spend most of my time now. But the branding work, the publication layouts, the websites I've built from scratch — those weren't detours. They shaped how I think.*
     >
     > *That breadth is what lets me design systems that hold together visually, structurally, and technically — without needing three different people in the room.*
4. All work — every case study from Sanity ordered by `order`, same card grid pattern.

### 5.3 Case Study Detail `/work/[slug]`

Render order — fixed, matches Figma 183:3688 (desktop) and 183:3737 (mobile). Every section is optional unless flagged otherwise:

1. Navbar.
2. Breadcrumb: `← Back to Case Studies` (P3 in `--semantic-text-secondary`, with a 24×24 left-arrow icon).
3. Title row: `[titleStart in titleStartColor] — [titleEnd]` as H1, then tag row.
4. Cover image / GIF / video (full-width, `border-radius: 4px`, `aspect-[1232/720]`).
5. **Overview** (H2 + rule + indented body) — render iff `showOverview`.
6. **Challenges** — iff `showChallenges`.
7. **Objectives** — iff `showObjectives`.
8. **Approach** — iff `showApproach`.
9. `contentBlocks` array — render in the exact order the editor arranged them. Each block is either `photoBlock` (single full-width or pair side-by-side, optional caption) or `textBlock` (optional H3 heading + rich text body).
10. **Post Launch Success** — iff `showPostLaunch`. Each `postLaunchBlock` = P1 title + P2 secondary paragraph. Renders as a 2-column grid on desktop, stacked on mobile.
11. **Similar Case Studies** — H2 + rule on a separate light-bg section (`--semantic-surface-primary`). Up to 2 cards from `similarStudies` references, rendered through the existing `<WorkGrid>` masonry.
12. Footer.

> All four standard sections (Overview / Challenges / Objectives / Approach) come first as a block; **all** `contentBlocks` follow them in editor order — never interleaved. Body text inside SectionBlock indents to `xl:pl-[350px]` on wide viewports, full-width otherwise. Photo blocks always render full container width.

### 5.4 About `/about`

Full dark page (`--semantic-surface-bg-dark`).

| Section | Content |
|---|---|
| Hero | Label `ABOUT ME` + H1 *"I design digital products, brand systems, and websites. Then I build them."* + horizontal rule |
| Bio | 2-col: photo left + 4-paragraph bio right (P2, `--semantic-text-secondary`) |
| Illustration strip | 4-col horizontal row of illustration thumbnails |
| Testimonials | H2 *"What they say"* + 3×2 grid (reuse component) |
| Footer | Standard |

Bio paragraphs (verbatim):

> *That combination is rarer than it should be — and it's what makes the work land the way it does. There's no translation loss between the design and the thing that ships.*
>
> *I'm a Co-Founder and Creative Director at Encrea Studio, based in Malé, Maldives.*
>
> *Over the past eight years I've worked across healthcare, international development, education, and tech — with clients ranging from a 200-bed hospital to a World Bank-funded publication programme in Cambodia.*
>
> *I've kept a sketchbook running alongside every project. The current series is observational studies of Maldivian marine species — unhurried, field-note work that has nothing to do with client briefs and everything to do with keeping the eye sharp.*

### 5.5 Contact `/contact`

Light bg.
- Label `CONTACT` + H1 *"Let's work together"* + horizontal rule.
- 2-col: image left + form right.
- Form fields: Name, Email, Message (textarea, placeholder *"Tell me about your project or your collaboration idea"*).
- Helper text under message (P3, `--semantic-text-secondary`):
  > *A few icebreakers: What's about your business that keeps you up at night? How would you define success for your project? What's getting in the way of it?...*
- Submit: `SEND YOUR REQUEST →` Dark button, right-aligned.
- Validation via React Hook Form. Submit POSTs to `/api/contact` → Resend.

### 5.6 Journal `/journal`

Built as a shell so the route exists, but the navbar link is **disabled** at launch (`pointer-events: none`, `aria-disabled`, dark-gray colour). Sanity schema is built and ready.

### 5.7 Shop

Nav item linking out (external arrow). No internal route.

---

## 6. Sanity schemas

Both schemas live in `sanity/schemas/`. Use them **verbatim** from PRD §8 — they are the contract. Highlights:

### `caseStudy`
- Card-visible: `titleStart`, `titleStartColor` (hex string), `titleEnd`, `tags` (array w/ enum list), `coverImage` (with hotspot).
- Metadata: `slug` (sourced from `titleStart`), `publishedAt`, `featured` (bool), `order` (number, lower = earlier).
- Standard sections each gated by a `show*` boolean: `showOverview`/`overviewBody`, `showChallenges`/`challengesBody`, `showObjectives`/`objectivesBody`, `showApproach`/`approachBody`. Each body is a Portable Text array. The `*Body` field is `hidden` when its toggle is off.
- `contentBlocks`: ordered array of `photoBlock` (`layout: single|pair`, `images[]`, optional `caption`) or `textBlock` (optional `heading`, `body` Portable Text).
- `showPostLaunch` + `postLaunchBlocks` (each block = `title` + `body` Portable Text).
- `similarStudies`: array of references to other `caseStudy`, max 2 (Rule.max(2)).
- Preview uses `titleStart` as title, `titleEnd` as subtitle, `coverImage` as media.

### `journalEntry`
- Fields: `title`, `slug` (sourced from `title`), `summary`, optional `coverImage`, `body` (Portable Text), `publishedAt`, `tags` (enum: `designProcess | uiux | illustration | tools | shortTake`).

### Tag enum reference (single source of truth)

```ts
// Used in caseStudy.tags
[
  { title: 'Identity', value: 'identity' },
  { title: 'Visuals', value: 'visuals' },
  { title: 'Web App', value: 'webApp' },
  { title: 'Website', value: 'website' },
  { title: 'Design System', value: 'designSystem' },
  { title: 'Mobile App', value: 'mobileApp' },
]
```

The same `value` strings drive the tag → icon map in `lib/tags.ts`.

### Studio
Mount Sanity Studio at `/studio` via `app/studio/[[...tool]]/page.tsx`. Config in `sanity/sanity.config.ts` (projectId, dataset, schema types from `schemas/index.ts`).

### GROQ queries (in `sanity/lib/queries.ts`)
- `homeFeaturedCaseStudiesQuery`: `*[_type=="caseStudy" && featured==true] | order(order asc)[0...6]` — **6 featured items on the home page**, toggled per-doc via the `featured` boolean in the Sanity Studio. To change the count, update both the slice here AND `HOME_PROJECTS.slice(0, N)` in [components/home/Work.tsx](components/home/Work.tsx).
- `allCaseStudiesQuery`: `*[_type=="caseStudy"] | order(order asc)` — used by `/work` for the full list.
- `caseStudyBySlugQuery(slug)`: full doc with derefs for `similarStudies` (project the card-visible fields).
- `journalEntriesQuery`: `*[_type=="journalEntry"] | order(publishedAt desc)`

---

## 7. Animation rules

| Effect | Where | Detail |
|---|---|---|
| Blur/grain reveal | All sections below hero | IntersectionObserver, 1200ms, `cubic-bezier(0.22,1,0.36,1)` |
| Page transition | All routes | Framer Motion `AnimatePresence`, 400ms fade |
| Grain texture | Global | `body::after` SVG `feTurbulence`, opacity 0.035 |
| Nav backdrop blur | On scroll | `backdrop-filter: blur(12px)` |

Reduce-motion: respect `prefers-reduced-motion: reduce` and disable transforms/transitions.

---

## 8. Build sequence (use TodoWrite to track)

### Phase 1 — Foundation
1. Scaffold Next.js 14 (TypeScript, Tailwind, ESLint, App Router) into the project root.
2. Install deps (§1).
3. Create `globals.css` with all tokens, type classes (desktop + mobile overrides), and grain texture.
4. Wire fonts in `lib/fonts.ts` (STK Bureau Serif local + Geist + Inter via `next/font`).
5. Configure `tailwind.config.ts` to expose tokens as colours and to extend the typography utilities so editor IntelliSense works.
6. Build `Container`, `SectionLabel`, `HorizontalRule`, `Button`, `TagPill`, `Pill`.
7. Build `Navbar` and `Footer` (both wired into `app/layout.tsx`).
8. Set up Sanity Studio at `/studio`, both schemas, env vars.
9. Page transition wrapper using Framer Motion `AnimatePresence`.

### Phase 2 — Home (build section by section, confirm each before advancing)
1. Hero (H0 lines, pill row, P1 caption, GIF grid layout).
2. Expertise (2×2 dark grid).
3. Work grid (static seed → swap to Sanity).
4. How I Work (indented dark block).
5. Artwork strip.
6. Testimonials.
7. Footer CTA wired.

### Phase 3 — Inner pages
1. `/work` (hero + featured grid + Honest Account + all work).
2. `/work/[slug]` (full schema-driven render: cover, overview, contentBlocks, challenges/objectives/approach, post-launch, similar studies). Test edge cases: no overview, only contentBlocks, post-launch only, similar studies < 2.
3. `/about` (full dark, 2-col bio, illustration strip, testimonials).
4. `/contact` (form + Resend route at `/api/contact`).
5. `/journal` shell (built, nav link disabled).

### Phase 4 — Polish + deploy
1. Mobile responsive sweep on every page (test at 375 / 768 / 1024 / 1280 / 1440).
2. SEO: metadata API on each route, OG images, `robots.txt`, `sitemap.ts`.
3. Performance: image sizes, font preload, ISR or static where possible.
4. Plausible analytics in root layout.
5. Vercel deploy + domain.

---

## 9. Working agreements

- **Read the PRD before changing anything content/structural.** Numbers, colours, and copy are exact — don't paraphrase or "improve" them. If a value seems off, ask before editing.
- **Type values are exact.** 84.15px is not 84px. Mobile H0 (45/45) and H1 (45/54) differ — preserve.
- **Container is sacred.** All content sits in `max-w-[80rem]` with 104px / 24px padding. Backgrounds are full-bleed; content is not.
- **Confirm before advancing each home section in Phase 2.** The PRD explicitly says "section by section, confirm each".
- **Tag enums are one list.** Sanity values, `lib/tags.ts` keys, and `public/icons/tags/` filenames are all derived from the same set. Adding a tag means updating all three.
- **Schemas are contracts.** When adding fields, update both `sanity/schemas/*.ts` and the GROQ projection in `lib/queries.ts`.
- **Do not enable the Journal nav link at launch.** It stays `disabled` until post-launch sign-off.
- **Tag icons are already supplied** in `public/icons/tags/`. Don't regenerate them.

---

## 10. Environment variables

Add to `.env.local` (and document in `.env.example`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=

RESEND_API_KEY=
CONTACT_TO_EMAIL=hussain.shaxif002@gmail.com

NEXT_PUBLIC_PLAUSIBLE_DOMAIN=shazifadam.com
```

---

## 11. Open items / decisions to confirm with Shazif

1. **STK Bureau Serif licence files** — need actual `.woff2` files dropped into `public/fonts/`. Hold the type system on placeholder until they arrive.
2. **Final hero GIFs** — five looping assets to swap into the grid.
3. **Testimonial copy + avatars** — three quotes for row 1.
4. **Artwork strip image** — long horizontal illustration at 1484 × 483.
5. **About bio photo + illustration thumbnails (4)**.
6. **Contact left column image**.
7. **Resend domain verification** — required before contact form goes live.
8. **Sanity project + dataset** — create project, populate IDs in `.env.local`.
9. **Plausible site** — provision domain in Plausible dashboard.
10. **Shop external URL** — confirm destination.
11. **`contentBlocks` placement** — confirm whether one ordered array (current plan) or split top/bottom around Challenges/Objectives/Approach is preferred.
