# AGENTS.md — skovlund.dev

Follow the code standards in [CONVENTIONS.md](CONVENTIONS.md).

## Overview

Personal website and blog built with Astro, Tailwind CSS v4, and TypeScript. Deployed to Cloudflare Pages via GitHub Actions. Based on Astro Nano.

**This repo is a portfolio piece.** Code quality, readability, and polish are first-class concerns.

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
- **Scripts**: `src/scripts/main.ts` (orchestrator), `theme.ts`, `navigation.ts`. The typewriter is a component, `src/components/Typewriter.astro`, not a script.
- **Deployment** via GitHub Actions → Cloudflare Pages (static output, no SSR)

## Commands

- `pnpm dev` — start dev server at localhost:4321
- `pnpm build` — production build (runs `astro check` first)
- `pnpm lint` / `pnpm lint:fix` — ESLint (v9 flat config with strict typescript-eslint)
- `pnpm format:check` / `pnpm format` — Prettier
- `pnpm test` / `pnpm test:a11y` — Playwright a11y tests (axe-core, WCAG 2.1 AA)
- Devbox: `devbox shell` or `direnv allow` to enter dev environment (Node.js 22, pnpm)

## Project Rules

Naming, typing, import order, and magic-number rules are enforced by ESLint and Prettier — see CONVENTIONS.md. The repo-specific exceptions and additions:

- **Sort comparators**: use `first`/`second`, not `a`/`b`.
- **Magic numbers**: 0, 1, and values inside Tailwind classes are exempt.
- **`is:inline` scripts** (plain JS, e.g. `Head.astro`) get no TS annotations — still use `const`/`let` and descriptive names.
- **Prefer a bundled `<script>` over `is:inline` + `define:vars`.** Bundled scripts run once as modules, which avoids re-execution problems with View Transitions. Pass config via `data-*` attributes.
- Keep components focused on layout. Copy lives in `src/i18n/en.ts`.

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

## Transitions & Animation

The site uses Astro's View Transitions API (`<ClientRouter />`) for navigation. The goal is Apple-level subtlety: transitions should feel invisible — no jarring reloads, no flashy animations.

**Event delegation is load-bearing.** Header and footer use `transition:persist`, and all persistent chrome listeners are registered once at module scope in `src/scripts/main.ts`, delegating on `document` via `closest()` — that's what makes them survive the DOM replacement a View Transition performs. Per-page work goes in `onPageLoad()` instead.

### Design principles

- Never animate chrome (header, footer) on navigation — it should feel like it was always there
- Content transitions should be barely perceptible — a gentle fade, not a slide or zoom
- First visit gets the full stagger reveal; return visits skip the wait (the View Transition fade already covers it)
- Theme switches are instant (CSS transitions temporarily disabled during toggle)

## Accessibility

WCAG 2.1 AA compliance. Every change must maintain these standards; Playwright + axe-core cover them in CI. The site already has a skip link, `focus-visible` indicators, ARIA state on all toggles, `prefers-reduced-motion` handling, landmark regions, and `rel="noopener noreferrer"` on external links — read the components for the current state rather than trusting a list here.

### Rules for new code

- All decorative icons/SVGs must have `aria-hidden="true"`
- Dynamic content changes must consider screen reader announcements
- Animations must respect `prefers-reduced-motion`
- New buttons must have `aria-label` if text content is not descriptive

## Git Hooks & workflow

- **Pre-commit**: lints + format-checks staged files only (fast feedback)
- **Commit-msg**: enforces conventional commit format (`type(scope): description`)
- **Pre-push**: full `pnpm build` (includes `astro check` for type checking)
- **Devbox gotcha**: `devbox run -- git commit -m "$(cat <<'EOF'...)"` produces literal `\n` instead of newlines. For multi-line commit messages, write to a temp file and use `git commit -F /tmp/msg.txt`.
- GitHub Actions: lint + format-check + build on push to main and PRs; deploy to Cloudflare Pages on push to main (preview deployments on PRs). CodeQL scanning via separate workflow.
