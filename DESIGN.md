---
version: 1.0
name: gsebold-landing-design
description: Personal landing page (apps/landing) design system — a calm, developer-portfolio surface built on shadcn/ui primitives over Tailwind v4 CSS variables. Near-white/near-black oklch surfaces, a single vivid-blue primary, a fluid clamp()-based type and spacing scale, and a small set of signature motion primitives (dot/grid backgrounds, shine border, hand-drawn highlighter, line-shadow text, and a circular View Transitions theme toggle) that carry all of the brand's personality.
source: apps/landing/src/globals.css, apps/landing/src/components/ui/**, apps/landing/src/components/sections/**, apps/landing/src/components/theme/**
generated: extracted directly from source (not reverse-engineered from a live site)

colors:
  light:
    background: "oklch(0.9909 0.0029 264.5422)"
    foreground: "oklch(0.1054 0.0149 255.8858)"
    card: "oklch(0.9909 0.0029 264.5422)"
    card-foreground: "oklch(0.1054 0.0149 255.8858)"
    popover: "oklch(0.9909 0.0029 264.5422)"
    popover-foreground: "oklch(0.1054 0.0149 255.8858)"
    primary: "oklch(0.5006 0.2131 263.289)"
    primary-foreground: "oklch(1 0 0)"
    primary-text: "{colors.primary}"
    secondary: "oklch(0.9393 0.0011 197.1379)"
    secondary-foreground: "oklch(0.436 0.0071 239.9647)"
    muted: "oklch(0.9602 0.0034 247.8587)"
    muted-foreground: "oklch(0.4997 0 0)"
    accent: "oklch(0.8688 0.0094 232.3834)"
    accent-foreground: "oklch(0.2556 0.0104 229.3504)"
    destructive: "oklch(0.507 0.1971 25.6125)"
    destructive-foreground: "oklch(1 0 0)"
    border: "oklch(0.9153 0.0017 247.8407)"
    input: "oklch(0.9153 0.0017 247.8407)"
    ring: "oklch(0.5006 0.2131 263.289)"
    chart-1: "oklch(0.5976 0.1339 246.2598)"
    chart-2: "oklch(0.8644 0.0027 286.3426)"
    chart-3: "oklch(0.9073 0.0027 286.346)"
    chart-4: "oklch(0.8887 0.0014 286.3724)"
    chart-5: "oklch(0.5989 0.1399 247.0138)"
    sidebar: "oklch(0.958 0.0133 286.1454)"
    sidebar-foreground: "oklch(0.3015 0.0572 282.4176)"
    sidebar-primary: "oklch(0.5417 0.179 288.0332)"
    sidebar-primary-foreground: "oklch(1 0 0)"
    sidebar-accent: "oklch(0.9221 0.0373 262.141)"
    sidebar-accent-foreground: "oklch(0.3015 0.0572 282.4176)"
    sidebar-border: "oklch(0.9115 0.0216 285.9625)"
    sidebar-ring: "oklch(0.5417 0.179 288.0332)"
  dark:
    background: "oklch(0.1054 0.0149 255.8858)"
    foreground: "oklch(0.9752 0.0034 247.858)"
    card: "oklch(0.1054 0.0149 255.8858)"
    card-foreground: "oklch(0.9752 0.0034 247.858)"
    popover: "oklch(0.1054 0.0149 255.8858)"
    popover-foreground: "oklch(0.9752 0.0034 247.858)"
    primary: "oklch(0.5006 0.2131 263.289)"
    primary-foreground: "oklch(1 0 0)"
    primary-text: "color-mix(in oklch, {colors.primary}, white 30%)"
    secondary: "oklch(0.1874 0.0083 274.4503)"
    secondary-foreground: "oklch(0.7281 0.0278 276.2439)"
    muted: "oklch(0.2487 0.0136 272.7904)"
    muted-foreground: "oklch(0.6911 0.0224 273.8989)"
    accent: "oklch(0.4 0.0134 235.1628)"
    accent-foreground: "oklch(1 0 0)"
    destructive: "oklch(0.5042 0.1944 26.7867)"
    destructive-foreground: "oklch(0.908 0.0042 236.502)"
    border: "oklch(0.2684 0.004 264.4997)"
    input: "oklch(0.2684 0.004 264.4997)"
    ring: "oklch(0.5006 0.2131 263.289)"
    chart-1: "oklch(0.5054 0.1807 263.5824)"
    chart-2: "oklch(0.2514 0.0163 264.223)"
    chart-3: "oklch(0.3811 0.0329 252.0577)"
    chart-4: "oklch(0.283 0.0187 258.3671)"
    chart-5: "oklch(0.5032 0.1894 263.5465)"
    sidebar: "oklch(0.2284 0.0384 282.9324)"
    sidebar-foreground: "oklch(0.9185 0.0257 285.8834)"
    sidebar-primary: "oklch(0.7162 0.1597 290.3962)"
    sidebar-primary-foreground: "oklch(0.1743 0.0227 283.7998)"
    sidebar-accent: "oklch(0.3354 0.0828 280.9705)"
    sidebar-accent-foreground: "oklch(0.9185 0.0257 285.8834)"
    sidebar-border: "oklch(0.3261 0.0597 282.5832)"
    sidebar-ring: "oklch(0.7162 0.1597 290.3962)"

typography:
  font-sans: "Inter, sans-serif"
  font-serif: "Georgia, serif"
  font-mono: "JetBrains Mono, monospace"
  heading1:
    fontSize: "clamp(2.25rem, 5.625vw + 0rem, 4.5rem)"
    pxRange: "36px → 72px"
    fontWeight: 800
    lineHeight: 1
    tracking: tight
  heading2:
    fontSize: "clamp(1.5rem, 3.75vw + 0rem, 3rem)"
    pxRange: "24px → 48px"
    fontWeight: 600
    lineHeight: 1
    tracking: tight
  heading3:
    fontSize: "clamp(1.25rem, 1.563vw + 0.625rem, 1.875rem)"
    pxRange: "20px → 30px"
    fontWeight: 600
    tracking: tight
  heading4:
    fontSize: "clamp(1.125rem, 0.313vw + 1rem, 1.25rem)"
    pxRange: "18px → 20px"
    fontWeight: 600
    tracking: tight
  paragraph:
    fontSize: "clamp(1rem, 0.313vw + 0.875rem, 1.125rem)"
    pxRange: "16px → 18px"
    fontWeight: 400
    lineHeight: 1.75

rounded:
  sm: "calc(var(--radius) - 4px)"
  sm-px: 4px
  md: "calc(var(--radius) - 2px)"
  md-px: 6px
  lg: "var(--radius)"
  lg-px: 8px
  xl: "calc(var(--radius) + 4px)"
  xl-px: 12px
  full: 9999px

spacing:
  base: "0.25rem (4px) — Tailwind default scale, unmodified"
  fluid-section-y: "clamp(1rem, 2.5vw + 0rem, 2rem)"
  fluid-section-y-px: "16px → 32px"
  fluid-section-y-lg: "clamp(2rem, 4.5vw + 0rem, 3rem)"
  fluid-section-y-lg-px: "32px → 48px"
  fluid-gutter-x: "clamp(1rem, 2.5vw + 0rem, 2rem)"
  container-max: "84rem"
  container-max-px: 1344px

shadow:
  "2xs": "0px 2px 8px 0px hsl(0 0% 0% / 0.03)"
  xs: "0px 2px 8px 0px hsl(0 0% 0% / 0.03)"
  sm: "0px 2px 8px 0px hsl(0 0% 0% / 0.05), 0px 1px 2px -1px hsl(0 0% 0% / 0.05)"
  DEFAULT: "0px 2px 8px 0px hsl(0 0% 0% / 0.05), 0px 1px 2px -1px hsl(0 0% 0% / 0.05)"
  md: "0px 2px 8px 0px hsl(0 0% 0% / 0.05), 0px 2px 4px -1px hsl(0 0% 0% / 0.05)"
  lg: "0px 2px 8px 0px hsl(0 0% 0% / 0.05), 0px 4px 6px -1px hsl(0 0% 0% / 0.05)"
  xl: "0px 2px 8px 0px hsl(0 0% 0% / 0.05), 0px 8px 10px -1px hsl(0 0% 0% / 0.05)"
  "2xl": "0px 2px 8px 0px hsl(0 0% 0% / 0.13)"
  dark-note: "Same offsets, shadow-color flips to white — dark mode gets a soft glow instead of a shadow."

components:
  button-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "8px 16px"
    shadow: "{shadow.DEFAULT}"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    rounded: "{rounded.md}"
    shadow: "{shadow.sm}"
  button-outline:
    backgroundColor: transparent
    borderColor: "{colors.primary}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.md}"
    shadow: "{shadow.sm}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.md}"
    shadow: "{shadow.sm}"
  button-ghost:
    backgroundColor: transparent
    hoverBackground: "{colors.accent}"
    rounded: "{rounded.md}"
  button-link:
    textColor: "{colors.primary-text}"
    textDecoration: "underline on hover, offset 4px"
  button-sm:
    height: 32px
    padding: "0 12px"
    fontSize: "0.75rem"
  button-lg:
    padding: "16px 32px"
  button-icon:
    height: 36px
    width: 36px
    padding: 8px
  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
    fontSize: "0.875rem"
    shadow: "{shadow.DEFAULT}"
  badge-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.full}"
  badge-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    rounded: "{rounded.full}"
  badge-outline:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    borderColor: "{colors.border}"
    rounded: "{rounded.xl}"
    shadow: "{shadow.DEFAULT}"
  card-header:
    padding: "24px 24px 16px"
    gap: "6px"
  card-content:
    padding: "0 24px 24px"
  card-footer:
    padding: "0 24px 24px"
    display: flex
  input:
    backgroundColor: transparent
    borderColor: "{colors.input}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "4px 12px"
    shadow: "{shadow.sm}"
  textarea:
    backgroundColor: transparent
    borderColor: "{colors.input}"
    rounded: "{rounded.md}"
    minHeight: 60px
    padding: "8px 12px"
    shadow: "{shadow.sm}"
  accordion-trigger:
    padding: "16px 0"
    fontWeight: 500
    fontSize: "0.875rem"
    hoverStyle: underline
    icon: "ChevronDown, rotates 180deg on open"
  accordion-trigger-split:
    description: "SingleAccordionTrigger variant — a horizontal Separator flanks each side of the trigger label, framing it like a divider-with-label rather than a plain row."
    padding: "16px 0"
    fontWeight: 500
  nav-bar:
    backgroundColor: "{colors.background} at 80% opacity, backdrop-blur-md"
    borderColor: "{colors.accent}"
    height: 80px
    position: "fixed top-0"
    padding: "0 {spacing.fluid-gutter-x}"
  nav-link:
    backgroundColor: "{colors.background}"
    hoverBackground: "{colors.accent}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "8px 16px"
  nav-viewport:
    backgroundColor: "{colors.popover}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    shadow: "{shadow.DEFAULT}"
  sheet:
    backgroundColor: "{colors.background}"
    padding: 16px
    shadow: "{shadow.lg}"
    widthLeftRight: "75vw, capped sm:max-w-sm (384px)"
    overlay: "black at 80% opacity"
  separator:
    backgroundColor: "{colors.border}"
    thickness: 1px
  spinner:
    icon: "Loader2Icon, continuous rotation"
    size: 16px
  dropdown-menu-content:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: 4px
    shadow: "{shadow.md}"
  dropdown-menu-item:
    rounded: "{rounded.sm}"
    padding: "6px 8px"
    fontSize: "0.875rem"
    hoverBackground: "{colors.accent}"
  field-label-checked:
    description: "Form field wrapper in its checked/selected state (radio- and checkbox-style field cards)."
    backgroundColor: "{colors.primary} at 5% opacity (10% in dark mode)"
    borderColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 16px

  # ─── Signature components — these carry the brand's personality ───
  dot-pattern:
    description: "Full-bleed absolute-positioned SVG dot grid used as ambient section backdrop. Dots are 16x16px-spaced by default; an optional `glow` mode pulses each dot's opacity/scale on a randomized loop via framer-motion."
    color: "{colors.foreground} at low opacity (neutral-400/80)"
    cellSize: "16px × 16px"
  animated-grid-pattern:
    description: "Full-bleed SVG line-grid backdrop (40x40px cells by default) where a rotating subset of cells briefly fades in/out — a slower, more structural cousin of dot-pattern."
    fill: "{colors.accent}"
    stroke: "{colors.secondary}"
    cellSize: "40px × 40px"
  shine-border:
    description: "Absolutely-positioned pseudo-border that animates a radial gradient sweep around a card's edge using a CSS mask, restricted to the border ring only (content stays untouched). Used on the Footer contact card."
    color: "{colors.primary}"
    duration: "14s, linear, infinite"
    borderWidth: 1px
  highlighter:
    description: "Hand-drawn rough-notation annotation (highlight / underline / box / circle / strike-through / crossed-off / bracket) drawn over inline text, optionally deferred until the element scrolls into view."
    defaultColor: "#ffd1dc (soft pink)"
    strokeWidth: 1.5px
    animationDuration: "600ms"
  line-shadow-text:
    description: "Duplicates the text node behind itself with a diagonal hard-edged gradient clipped to the text, then animates the clip position — reads as a moving hard drop-shadow rather than a soft blur."
    animation: "animate-line-shadow, 15s linear infinite"
  theme-toggle-transition:
    description: "Dark/light switch uses the View Transitions API: a circle clip-path expands from the toggle button's screen position to cover the viewport, radius sized to the farthest corner. Falls back to an instant swap when the API or prefers-reduced-motion is unavailable."
    duration: "700ms ease-in-out"
    radiusFormula: "hypot(max(left, viewportWidth - left), max(top, viewportHeight - top))"

---

## Overview

This is a solo developer's personal landing page — a single long-scroll page (Hero → Career/Skills → Contact → Footer), not a product marketing site. The visual system is deliberately restrained: a near-white `{colors.background}` in light mode / near-black `{colors.background}` in dark mode, a single vivid-blue `{colors.primary}` that carries every call-to-action and accent, and almost no other hue in the interface chrome. Both modes share the exact same `{colors.primary}` value, so the brand accent reads identically regardless of theme — only the surrounding neutrals invert.

Every color, radius, and shadow is a CSS custom property resolved through Tailwind v4's `@theme inline` block (`apps/landing/src/globals.css`), not hardcoded utility values — this is a token-driven system, and the tokens are the source of truth for this document. Typography and section spacing use CSS `clamp()` fluid scaling almost everywhere instead of responsive breakpoint overrides: a heading or section padding is one continuous formula from mobile to desktop rather than a stepped set of `sm:`/`lg:` overrides. This is the system's most distinctive structural choice.

The component layer is shadcn/ui (Radix primitives + `class-variance-authority` + Tailwind), so most components (Button, Card, Input, Accordion, Sheet, DropdownMenu, NavigationMenu) will look immediately familiar to anyone who has used shadcn — this document exists to record the specific token values and the small set of custom decorative primitives layered on top, not to reinvent shadcn's conventions.

**Key characteristics:**
- One accent color, `{colors.primary}` — a saturated blue at `oklch(0.5006 0.2131 263.289)` — used identically in light and dark mode. No secondary brand hue exists.
- Fluid `clamp()` scaling for both type (`heading1`–`heading4`, `paragraph`) and section rhythm (`fluid-section-y`, `fluid-gutter-x`) — the whole page breathes continuously rather than snapping at breakpoints.
- Section eyebrow labels (e.g. "hero.greeting", "contact.section_label") are set in `{typography.font-mono}` at `text-primary-text` — the one place mono type appears outside of code contexts.
- Shadows are extremely subtle multi-layer stacks (2–5% black opacity) that flip to white-based glows in dark mode — never a heavy single drop-shadow.
- A small set of signature motion primitives — `dot-pattern`, `animated-grid-pattern`, `shine-border`, `highlighter`, `line-shadow-text`, and the circular `theme-toggle-transition` — are what give an otherwise minimal shadcn base its personality. They are used sparingly (one or two per page), not as blanket decoration.
- Full reduced-motion support: a global `prefers-reduced-motion: reduce` media query collapses all animation/transition durations to near-zero, and the theme-toggle transition explicitly checks for `document.startViewTransition` before using it.

## Colors

### Brand
- **Primary** (`{colors.primary}` — `oklch(0.5006 0.2131 263.289)`): A saturated azure blue. The only accent color in the system — every button default, focus ring, link, and eyebrow label uses it. Identical value in light and dark mode.
- **Primary Foreground** (`{colors.primary-foreground}` — `oklch(1 0 0)`): Pure white text/icon color for anything sitting on `{colors.primary}`.
- **Primary Text** (`{colors.primary-text}`): `{colors.primary}` used as a text color on page surfaces — eyebrow labels, outline/link buttons, secondary badges. Equals `{colors.primary}` in light mode; in dark mode it is `{colors.primary}` mixed with 30% white, because the base blue is only 3.25:1 on the dark background (6.25:1 with the tint, 5.66:1 on `{colors.secondary}`). Same hue, so it still reads as the one brand accent. Fills, borders and focus rings keep `{colors.primary}`.

### Surface (light / dark)
- **Background** (`{colors.background}`): `oklch(0.9909 0.0029 264.5422)` light (near-white, faint blue cast) → `oklch(0.1054 0.0149 255.8858)` dark (near-black navy). Page body, Card, Popover all share this value in each mode.
- **Secondary** (`{colors.secondary}`): `oklch(0.9393 0.0011 197.1379)` light → `oklch(0.1874 0.0083 274.4503)` dark. Muted-fill surfaces — the secondary Button/Badge variant, footer social icon buttons.
- **Muted** (`{colors.muted}`): `oklch(0.9602 0.0034 247.8587)` light → `oklch(0.2487 0.0136 272.7904)` dark. Lowest-emphasis fill.
- **Accent** (`{colors.accent}`): `oklch(0.8688 0.0094 232.3834)` light → `oklch(0.4 0.0134 235.1628)` dark. Hover/active fill for ghost buttons and nav links; also the NavBar and Footer border color.
- **Border / Input** (`{colors.border}` / `{colors.input}`): `oklch(0.9153 0.0017 247.8407)` light → `oklch(0.2684 0.004 264.4997)` dark. 1px dividers, card borders, form input borders — both tokens share the same value.

### Text
- **Foreground** (`{colors.foreground}`): `oklch(0.1054 0.0149 255.8858)` light (near-black) → `oklch(0.9752 0.0034 247.858)` dark (near-white). Default body/heading text.
- **Muted Foreground** (`{colors.muted-foreground}`): `oklch(0.4997 0 0)` light → `oklch(0.6911 0.0224 273.8989)` dark. Secondary copy — subheadings, card descriptions, footer copyright line.
- **Secondary / Accent Foreground**: paired text colors for surfaces of the same name, tuned per mode for contrast.

### Semantic
- **Destructive** (`{colors.destructive}`): `oklch(0.507 0.1971 25.6125)` light → `oklch(0.5042 0.1944 26.7867)` dark. A muted brick red. Used only by the Button/Badge `destructive` variant and form validation (`aria-invalid` rings on Input) — not currently exercised anywhere in the live page content.
- **Ring** (`{colors.ring}`): equals `{colors.primary}` in both modes — focus rings always render in the brand blue.

### Reserved (not yet used on this page)
- **Chart 1–5** and the full **Sidebar** token set exist in `globals.css` as part of the shadcn theme scaffold but have no corresponding component in the current page (no charts, no app-shell sidebar). Keep them in sync if you add either later — don't invent new ad-hoc tokens for those use cases.

## Typography

### Font Family
Three families, each with a narrow, deliberate job:
1. **`{typography.font-sans}` (Inter)** — every heading, paragraph, button, and nav label. The only body/display face in the system.
2. **`{typography.font-mono}` (JetBrains Mono)** — reserved for section eyebrow labels only (e.g. the small line above the Hero H1 and above the Contact H2), always set in `{colors.primary}`. Signals "this is a label," never body copy.
3. **`{typography.font-serif}` (Georgia)** — declared as a theme token but not visibly used in any current component; kept for parity with the shadcn theme scaffold.

No `@font-face` or webfont `<link>` was found in `index.html` — these families resolve through whatever is available on the user's system, falling back to the browser's generic sans/serif/monospace. If you need pixel-perfect Inter/JetBrains Mono rendering, a webfont load needs to be added; today it's opportunistic.

### Hierarchy

| Token | Size (fluid) | Weight | Line Height | Use |
|---|---|---|---|---|
| `{typography.heading1}` | 36px → 72px | 800 (extrabold) | 1 | Page H1 — only used once, the Hero name. |
| `{typography.heading2}` | 24px → 48px | 600 (semibold) | 1 | Section headings (Career, Contact). |
| `{typography.heading3}` | 20px → 30px | 600 (semibold) | normal | Sub-section headings, Card titles. |
| `{typography.heading4}` | 18px → 20px | 600 (semibold) | normal | Smallest heading tier — Footer column headers. |
| `{typography.paragraph}` | 16px → 18px | 400 (regular) | 1.75 | All body copy. |

### Principles
- **Fluid over stepped.** Every heading and the paragraph size is a single `clamp()` formula — there is no `md:text-2xl lg:text-4xl` breakpoint ladder anywhere in the type system. This is the system's core typographic rule; don't introduce breakpoint-stepped font sizes alongside it.
- **Tight tracking on headings, only H1 is heavy.** `tracking-tight` applies to all four heading levels; only H1 goes to weight 800 — H2–H4 stop at 600. Never push H2–H4 to extrabold.
- **Mono is a label device, not a voice.** JetBrains Mono appears only on short eyebrow lines directly above an H1/H2, always in `{colors.primary}`, always `aria-hidden` (decorative, not structural content per the component code). It does not appear in body copy, buttons, or navigation.

## Layout

### Spacing System
- **Base unit**: 4px (`--spacing: 0.25rem`), the unmodified Tailwind default scale — used for all fixed gaps (`gap-4`, `gap-6`, `gap-8`, `gap-12`, etc.) throughout cards, grids, and flex rows.
- **Fluid section rhythm**: `{spacing.fluid-section-y}` (`clamp(1rem, 2.5vw + 0rem, 2rem)`, 16px → 32px) is the vertical padding on Hero, Career, and Contact `<section>` elements, and the same formula sets the heading-to-content margin inside each. Footer uses the taller `{spacing.fluid-section-y-lg}` (32px → 48px).
- **Fluid gutter**: `{spacing.fluid-gutter-x}` (same 16px → 32px formula) is the horizontal padding inside the NavBar and Footer's max-width container.
- **Container**: `{spacing.container-max}` = `84rem` (1344px), centered (`mx-auto`), used identically by NavBar and Footer as the content-width ceiling.

### Grid Patterns
- **Footer columns**: 1-up mobile → 2-up (`md:`) → 4-up (`lg:`) grid, `gap-12` (48px), brand/nav/contact columns with the contact card spanning 2 columns at the `md:` breakpoint.
- **Skills grid** (Career section): 2-up mobile → 3-up (`sm:`) → 4-up (`md:`) grid of icon+label rows, `gap-4`/`gap-6`.
- **Mobile nav breakpoint**: 768px, checked both on initial mount (`window.innerWidth`) and reactively via `ResizeObserver` on the header — not a CSS-only breakpoint, because the mobile Sheet menu needs to mount/unmount.

### Whitespace Philosophy
Interior gaps stay tight and fixed (`gap-2`–`gap-4` between a label and its value, between icon and text); rhythm *between* sections and columns is where the fluid scale does its work. The page has almost no decorative whitespace — the `dot-pattern`/`animated-grid-pattern` backdrops are what keep large empty sections from feeling inert, rather than sheer size of margin.

### Responsive Strategy
- **Breakpoints**: standard Tailwind (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px) — no custom breakpoints are defined in `tailwind.config.ts`.
- **Nav collapse**: full horizontal `NavigationMenu` + inline theme/language controls at desktop; collapses to a `Sheet` (slide-in drawer, right side, 75vw capped at 384px) behind a hamburger at < 768px.
- **Hero/Contact stacking**: Contact section is `flex-col` on mobile, `flex-row` from `md:` up (info column beside the form). Hero never splits into two columns at any width.
- **Touch targets**: default Button height is 36px; icon buttons are 36×36px. This sits under the 44×44px WCAG-recommended touch target — worth padding up if mobile usability issues surface, but not currently compensated for anywhere in the codebase.

## Elevation & Depth

| Token | Treatment | Use |
|---|---|---|
| `{shadow.2xs}` / `{shadow.xs}` | `0px 2px 8px 0px rgba(0,0,0,.03)` | Barely-there lift; not directly assigned to a component class today. |
| `{shadow.sm}` | + `0px 1px 2px -1px rgba(0,0,0,.05)` | Button `destructive`/`outline`/`secondary` variants, Input, Textarea. |
| `{shadow.DEFAULT}` | same stack as `sm` | Button `default` variant, Card, Badge `default`/`destructive`. |
| `{shadow.md}` | + `0px 2px 4px -1px rgba(0,0,0,.05)` | DropdownMenu content. |
| `{shadow.lg}` | + `0px 4px 6px -1px rgba(0,0,0,.05)` | Sheet drawer. |
| `{shadow.xl}` / `{shadow.2xl}` | deeper stacks, same formula | Declared as theme tokens; no component currently reaches for them — available headroom for a future modal/dialog. |

All shadow tokens are **stacked, low-opacity multi-layer** definitions (2–5% opacity) rather than a single heavy blur, and `--shadow-color` flips from black to white between light and dark mode — dark surfaces get a faint glow instead of a shadow, never a black shadow on a black background. Don't hand-roll a one-off `box-shadow`; extend this stack instead.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 4px | Not currently assigned; smallest step in the scale. |
| `{rounded.md}` | 6px | The default for interactive controls — Button, Input, Textarea, NavigationMenu trigger, DropdownMenu content, Accordion is unrounded but its parent surfaces use this. |
| `{rounded.lg}` | 8px | The theme's base `--radius` value; not directly assigned to a component (components round up to `xl` or down to `md`). |
| `{rounded.xl}` | 12px | Card. The largest "square-ish" radius in the system. |
| `{rounded.full}` | 9999px | Badge, footer social icon Buttons, and any Button given `rounded-full` explicitly (Footer CTA, back-to-top). |

The system deliberately uses only two radius steps in practice — `md` (6px) for controls and inputs, `full` (pill) for badges and a handful of circular/pill buttons — with `xl` (12px) reserved for the one card-shaped surface. Don't introduce a third arbitrary radius value; pick one of these three.

## Components

### Buttons
Six `variant`s (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`) × four `size`s (`default` 36px, `sm` 32px, `lg` taller with 32px horizontal padding, `icon` 36×36px square), implemented as a single `cva` in `button.tsx`. `default` is solid `{colors.primary}`; `outline` is the only variant with a visible border, using `{colors.primary}` for both border and text. `ghost` and `link` carry no background/border at rest — `ghost` gets `{colors.accent}` on hover, `link` gets an underline.

### Cards
One `Card` primitive (`rounded-xl border shadow`) composed with `CardHeader` (24px sides, 24px top, 16px bottom, small vertical children gap), `CardContent` (24px sides and bottom, no top), and `CardFooter` (same padding as content, flex row). `CardTitle` renders as an `H4` internally regardless of visual heading level — don't nest a real `H1`–`H3` inside a card expecting different sizing without overriding it explicitly.

### Inputs & Forms
`Input`/`Textarea` share the same visual language: transparent background, `{colors.input}` border, `{shadow.sm}`, `{rounded.md}`. The `Field`/`FieldSet`/`FieldGroup` primitives (in `field.tsx`) are a newer shadcn form-layout layer sitting above raw inputs — they add vertical/horizontal/responsive orientation variants and a distinct "checked" treatment (`field-label-checked`: 5%-opacity primary background, primary border) for selectable field cards, though the current Contact form doesn't yet exercise the checked state.

### Navigation
`NavBar` is a fixed, 80px-tall, blurred-glass header (`bg-background/80` + `backdrop-blur-md`) with a bottom `{colors.accent}` border, holding the logo, a centered `NavigationMenu` (desktop only), and a right-aligned cluster of `ThemeToggle` + `LanguageSwitcher` + (mobile) hamburger `Sheet` trigger. `NavigationMenuTrigger`/link styling doubles as the desktop nav-link and Footer nav-link look — same 36px height, `rounded-md`, `{colors.accent}` hover fill.

### Overlays
`Sheet` (Radix Dialog under the hood) is the only overlay component actually used on the page — right-side mobile nav drawer, `w-3/4` capped at `sm:max-w-sm`, `{shadow.lg}`, black/80% overlay. `DropdownMenu` exists as a full shadcn primitive set but has no current call site in `sections/`, `shared/`, or `forms/` — it's available scaffold, not yet wired to a feature.

### Signature Components
These are the pieces that make the page recognizable beyond "a shadcn theme":

- **`dot-pattern`** / **`animated-grid-pattern`** — full-bleed, `aria-hidden`, absolutely-positioned SVG backdrops (dot grid vs. line grid) used behind section content to fill otherwise-empty space. `dot-pattern` supports an optional `glow` mode where dots pulse opacity/scale on staggered random loops via `motion/react`.
- **`shine-border`** — an animated conic-style sweep clipped to a 1px border ring via a CSS `mask`, currently applied to the Footer's contact `Card`. `--duration` defaults to 14s linear infinite; color defaults to `var(--primary)` so it always tracks the current theme's accent without prop overrides.
- **`highlighter`** — wraps `rough-notation` to hand-draw an annotation (highlight/underline/box/circle/strike-through/crossed-off/bracket) over inline text, defaulting to a soft pink (`#ffd1dc`) highlight; supports `isView` to defer the draw until scroll-into-view via `useInView`.
- **`line-shadow-text`** — clips a duplicated copy of the text behind itself with a hard 45°-diagonal gradient edge and animates the clip position (`animate-line-shadow`, 15s linear infinite) — reads as a moving flat drop-shadow rather than a blurred one.
- **`theme-toggle-transition`** — the dark/light switch drives the native View Transitions API directly: it computes the toggle button's screen center and the farthest viewport corner, sets those as CSS custom properties (`--vt-x`, `--vt-y`, `--vt-max-rad`), and lets a `::view-transition-new(root)` `clip-path: circle()` keyframe (defined globally in `globals.css`) expand from that point over 700ms. Falls back to an instant theme swap when `document.startViewTransition` isn't available, and the whole animation collapses under the global `prefers-reduced-motion: reduce` rule.

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` for the one brand accent — CTAs, focus rings, links, eyebrow labels. Don't introduce a second accent hue; the system's restraint is the point.
- Use `clamp()` fluid formulas for new headings or section spacing, matching the existing `{typography.heading*}` / `{spacing.fluid-section-y}` pattern, instead of adding `sm:`/`md:`/`lg:` stepped overrides.
- Keep JetBrains Mono limited to short, `aria-hidden` eyebrow labels directly above a heading, always colored `{colors.primary}`.
- Reach for `{rounded.md}` on controls and `{rounded.full}` on pills/badges/icon-buttons; use `{rounded.xl}` only for the Card surface itself.
- Build new elevated surfaces from the existing `{shadow.*}` stack (multi-layer, low-opacity) rather than a hand-rolled single drop-shadow.
- Add any new signature/decorative primitive as `aria-hidden` and respect `prefers-reduced-motion`, matching `dot-pattern`, `animated-grid-pattern`, and the theme-toggle transition.
- Reference semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`) — never a raw oklch/hex value in component code. `globals.css` is the only place tokens are defined.

### Don't
- Don't add a second brand color. Semantic colors (`destructive`) exist for status, not decoration.
- Don't set body copy or navigation labels in `{typography.font-mono}` — it's an eyebrow-label device only.
- Don't push H2–H4 to `font-extrabold`; 800 weight is reserved for the single page H1.
- Don't introduce a fourth radius step alongside `md`/`full`/`xl` without a clear reason — the system intentionally uses only three.
- Don't stack the `shine-border`, `highlighter`, and `line-shadow-text` effects on the same element — each is used exactly once per page today; treat them as rare accents, not a toolkit to combine freely.
- Don't ship a new animation without checking it degrades correctly under the global `prefers-reduced-motion: reduce` rule in `globals.css` — it's a blanket rule, but custom `motion/react` animations and the View Transition circle-expand need their own explicit guards (as the theme toggle already does).
