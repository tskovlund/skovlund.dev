# skovlund.dev

[![Build & Deploy](https://github.com/tskovlund/skovlund.dev/workflows/Build%20%26%20Deploy/badge.svg)](https://github.com/tskovlund/skovlund.dev/actions/workflows/deploy.yml)

Personal website and blog. Built with [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and [TypeScript](https://www.typescriptlang.org). Deployed to [Cloudflare Pages](https://pages.cloudflare.com) via GitHub Actions.

Based on [Astro Nano](https://github.com/markhorn-dev/astro-nano). Tokyo Night theme.

## Development

Requires [Devbox](https://www.jetify.com/devbox) (or Node.js 22+ and pnpm).

```sh
devbox shell        # enter dev environment (or: direnv allow)
pnpm install        # install dependencies
pnpm dev            # start dev server at localhost:4321
pnpm build          # production build (type-check + build) to ./dist/
pnpm preview        # preview production build locally
```

## Stack

- **Astro 5** — static site generator with content collections and View Transitions
- **Tailwind CSS 4** — styling via CSS-first config (`@theme` in `global.css`)
- **TypeScript** — strict mode with explicit types everywhere
- **Fonts** — Inter (body), Monaspace Neon (headings/nav/code) via Fontsource
- **Theme** — Tokyo Night (dark, default) / Tokyo Night Day (light)
- **Icons** — Lucide (UI icons) + Simple Icons via astro-icon (brand logos)
- **i18n** — all user-facing strings in `src/i18n/en.ts`

## Linting & formatting

```sh
pnpm lint           # ESLint (v9 flat config, strict typescript-eslint)
pnpm lint:fix       # auto-fix ESLint issues
pnpm format:check   # check formatting with Prettier
pnpm format         # auto-format with Prettier
```

Git hooks (`.githooks/`) run lint + format check on staged files pre-commit, and a full build pre-push. Activate with:

```sh
git config core.hooksPath .githooks
```

## Content

- **Blog**: `src/content/blog/<slug>/index.md`
- **Projects**: `src/content/projects/<slug>/index.md`
- **Shelf**: curated links and media in `src/i18n/en.ts` (no content collection — data-driven)

## Deployment

Pushes to `main` trigger the GitHub Actions workflow which builds the site and deploys to Cloudflare Pages.

Requires two repository secrets:

- `CLOUDFLARE_API_TOKEN` — Cloudflare API token with Pages edit permissions
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account ID

## License

[MIT](LICENSE)
