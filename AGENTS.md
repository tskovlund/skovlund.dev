# CLAUDE.md — skovlund.dev

## Overview

Personal website and blog built with Astro, Tailwind CSS v4, and TypeScript. Deployed to Cloudflare Pages via GitHub Actions. Based on Astro Nano.

**This repo is a portfolio piece.** Code quality, readability, and polish are first-class concerns. Every file should look like it was written by someone who cares deeply about their craft.

## Architecture

- **Astro 5** static site generator with content collections and View Transitions
- **Tailwind CSS 4** — CSS-first config via `@theme` in `src/styles/global.css` (no `tailwind.config.mjs`)
- **Content** lives in `src/content/` — blog posts (markdown/MDX) and projects
- **i18n** — all user-facing strings in `src/i18n/en.ts` (single source of truth for copy)
- **Theme** — Tokyo Night (dark) / Tokyo Night Day (light), class-based dark mode via `@custom-variant`
- **Fonts** — Inter (body/sans), Monaspace Neon (headings/nav/code/mono) via Fontsource
- **Icons** — Lucide (`@lucide/astro`) for UI icons, Simple Icons via `astro-icon` for brand logos
- **Config** centralized in `src/consts.ts` (typed re-exports from i18n + numeric config)
- **Deployment** via GitHub Actions → Cloudflare Pages (static output, no SSR)

## Commands

- `pnpm dev` — start dev server at localhost:4321
- `pnpm build` — production build (runs `astro check` first)
- `pnpm lint` / `pnpm lint:fix` — ESLint (v9 flat config with strict typescript-eslint)
- `pnpm format:check` / `pnpm format` — Prettier
- Devbox: `devbox shell` or `direnv allow` to enter dev environment (Node.js 22, pnpm)

## Code Quality Policy

This is non-negotiable. Enforced via ESLint rules and git hooks where possible, code review otherwise.

### Naming

- **No abbreviations.** `el`, `btn`, `acc`, `e`, `i`, `s` are never acceptable. Use full, descriptive names: `greetingElement`, `themeButton`, `postsByYear`, `clickEvent`, `index`, `social`.
- **Sort comparators**: use `first`/`second`, not `a`/`b`.
- **Types**: PascalCase. Variables/functions: camelCase. Constants: UPPER_SNAKE_CASE.
- Enforced: `@typescript-eslint/naming-convention` for casing patterns.

### Typing

- **Explicit types everywhere.** Every function must have an explicit return type. Every exported function must have explicit parameter and return types. Never rely on type inference for function signatures.
- **No `var`.** Use `const` by default, `let` only when reassignment is necessary.
- In `is:inline` scripts (plain JS, e.g. `Head.astro`), use `const`/`let` and descriptive names. TS annotations aren't available there.
- Prefer bundled `<script>` over `is:inline` + `define:vars` — bundled scripts run once as modules, avoiding re-execution issues with View Transitions. Pass config via `data-*` attributes.
- Enforced: `explicit-function-return-type`, `explicit-module-boundary-types`, `no-inferrable-types: off`.

### Magic numbers

- Extract numeric literals into named constants. `TYPEWRITER_TYPE_SPEED_MS = 100`, not bare `100`.
- Exception: 0, 1, and values in Tailwind classes.

### Structure

- Keep components focused on layout. Copy lives in `src/i18n/en.ts`.
- Prefer editing existing files over creating new ones.
- No dead code. If it's unused, delete it.

## Content

- **Blog**: `src/content/blog/<slug>/index.md` — frontmatter: title, description, date, draft
- **Projects**: `src/content/projects/<slug>/index.md` — frontmatter: title, description, date, draft, demoURL, repoURL, featured, cover
  - `featured: true` projects get a dedicated page via `[...slug].astro`; others are card-only with source/demo links

### Blog posts vs project pages

These serve different purposes — never duplicate content between them:

- **Project pages** = evergreen reference. "What is this, how it's built, current state." Updated as the project evolves.
- **Blog posts** = time-stamped narrative. "How/why I built this, the journey, tradeoffs, debugging rabbit holes." Published once.

Blog posts link _to_ project pages for current state. Project pages can link back to related blog posts. If it's about current state → project page. If it's about the process/journey → blog post.

### Service and tool linking

Link to services/tools naturally — not mechanically "first occurrence only." The goal is that any sentence reads well on its own. Rules:

- If a sentence mentions several tools and some are linked, link them all. Unlinked names next to linked names look inconsistent.
- Re-link in new sections. A reader skimming to "Security" shouldn't have to scroll up to find the Tailscale link.
- Don't over-link within the same paragraph — if Grafana appears three times in one bullet, linking once is fine.
- In `en.ts`, use the shared `links` object (top of file) for frequently referenced URLs.

## Styling

- All theme colors defined as CSS custom properties in `src/styles/global.css` `@theme` block
- Color tokens: `tn-{light,dark}-{bg,bg-alt,surface,fg,fg-muted,accent,accent-hover,warm,green,red,orange,yellow,cyan}`
- Dark mode is the default fallback (no system preference → dark)
- Typography plugin registered via `@plugin "@tailwindcss/typography"` in CSS

## Transitions & Animation

The site uses Astro's View Transitions API (`<ClientRouter />`) for navigation. The goal is Apple-level subtlety: transitions should feel invisible — no jarring reloads, no flashy animations.

### How it works

- **Header and footer** use `transition:persist` — they stay in the DOM across navigations and never re-render. Their event listeners (theme buttons, scroll handler, back-to-top) are bound once on first load. Social links live in the footer, visible on every page.
- **Main content** uses a subtle 200ms fade (`fade({ duration: "0.2s" })`) between pages. Fast enough to feel instant, slow enough to avoid a hard cut.
- **Stagger animation** (`.animate` elements fading in one by one) runs with 150ms delays on first page load for a dramatic entrance. On subsequent navigations, elements reveal instantly (delay=0) since the View Transition fade already provides the visual transition.
- **Script architecture** (`Head.astro`): `setupChromeListeners()` runs once (persisted UI), `setupContentListeners()` runs on every navigation (back buttons etc. in new content), `revealAnimatedElements()` adapts its timing based on whether it's first load or navigation.
- **Event delegation**: All persistent chrome listeners use event delegation on `document` (via `closest()`) so they survive DOM replacement during View Transitions.

### Design principles

- Never animate chrome (header, footer) on navigation — it should feel like it was always there
- Content transitions should be barely perceptible — a gentle fade, not a slide or zoom
- First visit gets the full stagger reveal; return visits skip the wait
- Theme switches are instant (CSS transitions temporarily disabled during toggle)

## Accessibility

WCAG 2.1 AA compliance. Every change must maintain these standards.

### Implemented

- **Skip link**: "Skip to main content" link at top of every page, visible on keyboard focus
- **Keyboard focus indicators**: `focus-visible` outline on all interactive elements (accent color, 2px offset)
- **ARIA attributes**: `aria-expanded` on mobile menu toggle, `aria-pressed` on theme buttons, `aria-hidden` on decorative SVGs, `aria-controls` linking menu button to menu
- **Reduced motion**: `prefers-reduced-motion` disables all animations, transitions, and the typewriter effect — shows static greeting instead
- **Semantic HTML**: proper landmark regions (`<header>`, `<main>`, `<footer>`, `<nav>`), list markup for navigation and content
- **External links**: `rel="noopener noreferrer"` on all `target="_blank"` links
- **Color scheme**: `color-scheme: light`/`dark` set on `<html>` for proper system integration

### Rules for new code

- All decorative icons/SVGs must have `aria-hidden="true"`
- All interactive elements must have visible focus indicators (handled globally via `focus-visible`)
- Dynamic content changes must consider screen reader announcements
- Animations must respect `prefers-reduced-motion`
- New buttons must have `aria-label` if text content is not descriptive

## Git Hooks

- **Pre-commit**: lints + format-checks staged files only (fast feedback)
- **Pre-push**: full `pnpm build` (includes `astro check` for type checking)
- Plain shell scripts in `.githooks/` — zero dependencies, activated via `git config core.hooksPath .githooks`
- **Devbox gotcha**: `devbox run -- git commit -m "$(cat <<'EOF'...)"` produces literal `\n` instead of newlines. For multi-line commit messages, write to a temp file and use `git commit -F /tmp/msg.txt`.

## Git workflow

- Direct to main for content and small changes
- Branch + PR for structural changes
- GitHub Actions: build + deploy on push to main; build-only on PRs

## Style

- Conventional commits
- Prettier for formatting (double quotes, semicolons, trailing commas)
- ESLint for linting (strict typescript-eslint + astro plugin + prettier compat)
