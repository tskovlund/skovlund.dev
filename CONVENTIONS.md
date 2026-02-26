# Code Conventions

Shared conventions for all tskovlund repositories. Each repo includes the
relevant subset in its own AGENTS.md / CLAUDE.md / CONTRIBUTING.md.

## Code Quality

- **Explicit types whenever possible** — no `var` where the type isn't obvious.
  The reader should never have to guess a type
- **Proper fixes over workarounds.** Solve at the root cause. If a hack is
  unavoidable (something outside our control), track it so it can be replaced
  when a proper solution is available
- **No magic constants** — named constants for ports, protocol versions, error
  codes. Every literal value must be self-documenting
- **No DRY violations** — extract shared logic into a single source of truth.
  Prefer a base class or utility over copy-paste
- **Single responsibility** — each file and class has one clear purpose
- **Clean APIs / interface abstractions** — decouple code when valuable and
  appropriate
- **Full variable names** — `measure_index` not `m`, `connection` not `conn`.
  Intent should be readable, not inferred from abbreviations
- **No shorthand** — `exception` not `exc`, `message` not `msg`, `response`
  not `resp`
- **Idempotency** — scripts, migrations, and deployments must be safe to run
  twice

## Configuration

- **Externalize values that vary by environment or that users may need to
  change.** Hardcode what is truly constant
- **Choose the right configuration mechanism for the situation** — env vars for
  secrets and deployment, config files for complex settings, CI variables for
  build-time values

## Error Handling & Resilience

- **Fail CI on warnings** — warnings that persist become invisible. Either fix
  them or explicitly suppress with justification

## Library Usage

- **Battle-tested libraries for complex problems** — don't reinvent auth, retry
  logic, serialization, or anything with known edge cases
- **Skip trivial dependencies** — if a few lines of our own code solve the same
  problem, the dependency isn't worth it
- **Vet before adding** — check maintenance activity, security track record,
  and transitive dependency count
- **Discuss with the maintainer if unsure** — the right call isn't always
  obvious

## Dependencies & Security

- **Lockfiles always committed** — `uv.lock`, `package-lock.json`,
  `flake.lock`, etc. Reproducible builds
- **Pin direct dependencies to compatible ranges** — not exact (too noisy), not
  fully open (too risky)
- **CodeQL scanning in CI** when available
- **Dependabot/Renovate** for automated dependency updates when available
- **No secrets in code** — env vars or secret managers. `.env` files gitignored

## Git & Workflow

- **Conventional commits** — `feat:`, `fix:`, `refactor:`, `docs:`, `test:`,
  `chore:`
- **Direct to main** for small changes, **branch + PR** for structural work
- **PR review loop** before merge on structural changes

## Documentation

- **Diataxis framework** — tutorials, how-to guides, reference, explanation
- **README in every repo** — what the project does, how to set it up, how to
  run it. A repo without a README is incomplete

## Project Structure

- **Follow established conventions per language/framework** — standard
  framework structures
- **AGENTS.md in every repo** with a CLAUDE.md symlink — the canonical file for
  AI agent instructions
- **Shared CI via `tskovlund/.github`** — reusable workflows for common
  patterns. Repos reference shared workflows instead of duplicating CI
  configuration
- **Automate enforcement** — CI checks, pre-commit/pre-push hooks, linting,
  and type checking should enforce every rule that can be checked automatically
- **Conventions belong in the repo** — each repo includes the relevant subset
  of these conventions in its own docs. Redundancy across repos is intentional
  so that every contributor picks them up
