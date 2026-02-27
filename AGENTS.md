# AGENTS.md — skovlund.dev

Follow the code standards in [CONVENTIONS.md](CONVENTIONS.md).

## Overview

Personal website and blog built with Astro, Tailwind CSS v4, and TypeScript. Deployed to Cloudflare Pages via GitHub Actions. Based on Astro Nano.

**This repo is a portfolio piece.** Code quality, readability, and polish are first-class concerns. Every file should look like it was written by someone who cares deeply about their craft.

## Architecture

- **Astro 5** static site generator with content collections and View Transitions
- **Tailwind CSS 4** — CSS-first config via `@theme` in `src/styles/global.css` (no `tailwind.config.mjs`)
- **Content** lives in `src/content/` — blog posts (markdown/MDX) and projects
- **i18n** — all user-facing strings in `src/i18n/en.ts` (single source of truth for copy)
- **Theme** — 12 color schemes (Tokyo Night default), class-based dark mode via `@custom-variant`, scheme switcher via `data-color-scheme` attribute
- **Fonts** — Inter (body/sans), Monaspace Neon (headings/nav/code/mono) via Fontsource
- **Icons** — Lucide (`@lucide/astro`) for UI icons, Simple Icons via `astro-icon` for brand logos
- **Config** centralized in `src/consts.ts` (typed re-exports from i18n + numeric config)
- **Utilities**: `src/lib/icons.ts` (Lucide icon registry + theme color classes), `src/lib/utils.ts` (`classNames` via clsx/tailwind-merge, `readingTime`)
- **Scripts**: `src/scripts/main.ts` (orchestrator), `theme.ts`, `navigation.ts`, `typewriter.ts`
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

- Enforced via `@typescript-eslint/naming-convention`. Examples: `greetingElement` not `el`, `themeButton` not `btn`, `postsByYear` not `acc`, `clickEvent` not `e`, `index` not `i`, `social` not `s`.
- **Sort comparators**: use `first`/`second`, not `a`/`b`.
- **Types**: PascalCase. Variables/functions: camelCase. Constants: UPPER_SNAKE_CASE.

### Typing

- Use `const` by default, `let` only when reassignment is necessary.
- In `is:inline` scripts (plain JS, e.g. `Head.astro`), use `const`/`let` and descriptive names. TS annotations aren't available there.
- Prefer bundled `<script>` over `is:inline` + `define:vars` — bundled scripts run once as modules, avoiding re-execution issues with View Transitions. Pass config via `data-*` attributes.
- Enforced: `explicit-function-return-type`, `explicit-module-boundary-types`, `no-inferrable-types: off`.

### Magic numbers

- Example: `TYPEWRITER_TYPE_SPEED_MS = 100`, not bare `100`.
- Exception: 0, 1, and values in Tailwind classes.

### Structure

- Keep components focused on layout. Copy lives in `src/i18n/en.ts`.
- Prefer editing existing files over creating new ones.
- No dead code. If it's unused, delete it.

## Content

- **Blog**: `src/content/blog/<slug>/index.md` (or `.mdx` for posts with components) — frontmatter: title, description, date, draft
- **Projects**: `src/content/projects/<slug>/index.md` (or `.mdx`) — frontmatter: title, description, sortOrder, draft, featured, demoURL, repoURL, icon, iconColor
  - `featured: true` projects get a dedicated page via `[...slug].astro`; others are card-only with source/demo links
- **Shelf**: curated links and media defined in `src/i18n/en.ts` (`shelf` object) — no content collection, purely data-driven

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

- **Color schemes**: 12 switchable schemes (Tokyo Night, Gruvbox, Nord, Rosé Pine, Catppuccin, Kanagawa, Everforest, Dracula, Solarized, Monokai Pro, Horizon, Night Owl) defined as CSS variable overrides in `global.css` via `html[data-color-scheme="..."]` selectors. Active scheme stored in `localStorage` and applied via `data-color-scheme` attribute. Scheme list in `src/i18n/en.ts` (`colorSchemes`).
- All theme colors defined as CSS custom properties in `src/styles/global.css` `@theme` block
- UI color tokens: `{light,dark}-{bg,bg-alt,surface,fg,fg-muted,accent,accent-hover,warm,green,red,orange,yellow,cyan}`
- Syntax highlighting tokens: `{light,dark}-syntax-{keyword,string,comment,function,constant,parameter,string-expr,punctuation,link}`
- Each scheme block defines **all** its colors (UI + syntax) — single source of truth per scheme
- Code block mapping (`--astro-code-*`) references syntax tokens and is scheme-agnostic
- System preference is honored by default (no saved preference → follows `prefers-color-scheme`)
- Typography plugin registered via `@plugin "@tailwindcss/typography"` in CSS

## Transitions & Animation

The site uses Astro's View Transitions API (`<ClientRouter />`) for navigation. The goal is Apple-level subtlety: transitions should feel invisible — no jarring reloads, no flashy animations.

### How it works

- **Header and footer** use `transition:persist` — they stay in the DOM across navigations and never re-render. Their event listeners (theme buttons, scroll handler, back-to-top) are bound once on first load. Social links live in the footer, visible on every page.
- **Main content** uses a subtle 300ms fade (`fade({ duration: "0.3s" })`) between pages. Fast enough to feel instant, slow enough to avoid a hard cut.
- **Stagger animation** (`.animate` elements fading in one by one) runs with 150ms delays on first page load for a dramatic entrance. On subsequent navigations, elements reveal instantly (delay=0) since the View Transition fade already provides the visual transition.
- **Script architecture** (`src/scripts/main.ts`): Chrome listeners are registered at module scope on first load (event delegation on `document`), `onPageLoad()` runs on every `astro:page-load` event (theme, nav state, typewriter, animated elements), and `revealAnimatedElements()` adapts its timing based on whether it's first load or navigation.
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
- **ARIA attributes**: `aria-expanded` on mobile menu toggle and settings panel trigger, `aria-pressed` on theme and color scheme buttons, `aria-hidden` on decorative SVGs, `aria-controls` linking menu button to menu
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
- **Commit-msg**: enforces conventional commit format (`type(scope): description`)
- **Pre-push**: full `pnpm build` (includes `astro check` for type checking)
- Plain shell scripts in `.githooks/` — zero dependencies, activated via `git config core.hooksPath .githooks`
- **Devbox gotcha**: `devbox run -- git commit -m "$(cat <<'EOF'...)"` produces literal `\n` instead of newlines. For multi-line commit messages, write to a temp file and use `git commit -F /tmp/msg.txt`.

## Git workflow

- GitHub Actions: lint + format-check + build on push to main and PRs; deploy to Cloudflare Pages on push to main (preview deployments on PRs). CodeQL scanning via separate workflow.

## Style

- Prettier for formatting (double quotes, semicolons, trailing commas)
- ESLint for linting (strict typescript-eslint + astro plugin + prettier compat)
