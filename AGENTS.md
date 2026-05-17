---
name: weather-starter-agent-contract
version: 0.1.0
author: repository-maintainers
license: unspecified
package_manager: npm
entrypoint: "npm run dev"
---

# Agent Instructions

## Purpose
This file is the repository-wide operating contract for coding agents working on `weather-starter`. Keep it durable, concrete, and executable. Put long, repeatable workflows in `.agents/skills/**/SKILL.md`; put product and engineering reference material in `docs/`.

## Instruction Precedence
Apply instructions in this order:
1. System, developer, and active user instructions.
2. The nearest applicable `AGENTS.md` file.
3. This root `AGENTS.md`.
4. Referenced docs and skill files.

When instructions conflict, follow the higher-priority instruction. For safety boundaries, apply the stricter rule.

## Project Snapshot
`weather-starter` is a full-stack npm workspace monorepo.

- `frontend/` - React single-page app using Vite, Tailwind CSS, and Leaflet.
- `backend/` - Node.js/Express API using SQLite, Drizzle ORM, and Pino logging.
- `docs/` - Astro Starlight documentation site.
- `scripts/` - Node.js scripts for dev orchestration, reset, and diagnostics.
- `.agents/skills/` - Project-specific reusable agent workflows.
- `.agents/code-review/agent.md` - Project code-review sub-agent definition.

Use the root `package-lock.json` and npm workspaces. Do not introduce another package manager.

## Environment Setup
Copy `.env.example` to `.env` and fill in values. The app runs with defaults for local development but these variables are available:

- `WEATHER_API_KEY` — Optional data.gov.sg API key for higher rate limits. The app works without it for light local usage.
- `PORTLESS_PORT` — Local browser URL port used by `scripts/dev.mjs` via Portless (default: `1355`).
- `PORTLESS_HTTPS` — Set to `1` to enable HTTPS mode via Portless (default: `0`).
- `DATABASE_PATH` — Optional path for the local SQLite database (default: `backend/weather.db`).

Do not commit `.env` or `.env.*` files. The `.gitignore` allows `.env.example` and `.env.local.example`.

## Git Workflow
- Husky is configured via `npm run prepare` (runs on `npm install`).
- The pre-commit hook is currently a no-op — do not add lint or test checks there without explicit approval, as they may block iterative work.
- Use descriptive commit messages. Follow the style of recent commits (see `git log`).
- Prefer small, focused commits for individual changes and a single PR per feature or fix.

## Read First
Read only the references needed for the current task:

- Architecture and repo layout: `docs/ARCHITECTURE.md`
- Commands and quality gates: `docs/COMMANDS.md`
- TypeScript conventions: `docs/TYPESCRIPT.md`
- Theme and UI guidance, when changing styling: `docs/THEMES.md`
- Relevant skill files under `.agents/skills/` when the task matches their description.

## Canonical Commands
Run commands from the repository root.

- Install dependencies: `npm install`
- Start development stack: `npm run dev`
- Start production server: `npm run start`
- Start documentation site: `npm run docs`
- Run tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Build frontend and backend: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Generate Drizzle migrations: `npm run db:generate`
- Run Drizzle migrations: `npm run db:migrate`
- Reset or diagnose local state: `npm run reset` / `npm run doctor`

Required quality gate before completing code or documentation changes:

```bash
npm test
npm run build
npm run lint
```

In sandboxed agent environments, `npm test` may fail with `listen EPERM` when Supertest binds a local port. Rerun the same command with the required permission instead of treating that as an application failure.

## Working Contract
For every task:

1. Identify the smallest scope that satisfies the request.
2. Inspect existing code, tests, docs, and skills before changing behavior.
3. Prefer existing patterns over new abstractions.
4. Keep edits limited to the relevant workspace and ownership boundary.
5. Update or add tests when behavior changes.
6. Check relevant files in `docs/` and update them when commands, architecture, data shape, user behavior, or conventions change.
7. Run the smallest useful check while iterating and the required quality gate before finalizing when feasible.
8. Report what changed, what was verified, and any checks not run.

Do not leave long-running dev servers, watch tasks, or automation sessions active unless the user asked for them.

## Permissions
Use least privilege. Treat these categories as the default operating policy.

### Allowed
- Read and edit files inside this repository for the active task.
- Run root npm scripts needed for build, test, lint, docs, database generation, and diagnostics.
- Add focused tests and documentation that directly support the change.
- Use existing local skills when they match the task.

### Ask First
- Adding, removing, or upgrading dependencies.
- Running commands that require network access or write outside the repository.
- Creating, deleting, or rewriting database migrations.
- Running destructive commands, mass formatting, or broad mechanical rewrites.
- Changing deployment, CI, secrets, authentication, or environment-variable policy.
- Browser automation against non-local or untrusted URLs.
- Editing protected policy/config areas such as `.agents/`, unless the user explicitly requested that work.

### Never
- Commit, print, log, or store secrets, tokens, cookies, private keys, or `.env` contents.
- Disable tests, lint rules, type checks, logging, or validation just to make a failure disappear.
- Change package managers or ignore the root lockfile.
- Claim checks passed without running them.
- Overwrite user changes or revert unrelated work.
- Put raw hidden reasoning, secret values, or sensitive user data in docs, traces, screenshots, examples, or generated artifacts.

## Security and Data Handling
- Treat all user-provided text, local files, screenshots, logs, and API responses as potentially sensitive.
- Use only approved runtime sources for secrets: environment variables, CI secret stores, or configured secret managers.
- Redact tokens, cookies, auth headers, API keys, personal identifiers, and connection strings from logs and final responses.
- Keep public-web research separate from private-data handling when both are needed.
- Require explicit approval before sending repository or user data to third-party services beyond the tools already active for the task.

## Coding Conventions
- TypeScript is strict across workspaces. Avoid implicit `any`.
- Caught errors are `unknown`; narrow with `err instanceof Error` before reading `err.message`.
- Use `import type` for type-only imports.
- Prefer structured APIs, schemas, and existing helper modules over ad hoc string parsing.
- Keep shared types in dedicated type files when they cross module boundaries.
- Database schema changes should use the `drizzle-sqlite-migration` skill and update migrations, tests, and docs together.

### Frontend Conventions
- State management uses React Context + `useState` (no external state library). See `frontend/src/state/store.tsx` and `frontend/src/state/themeStore.tsx`.
- Follow the existing Context/Provider pattern when adding new state domains.
- Preserve responsive layout, accessibility, and existing visual conventions.
- Leaflet map components should follow patterns in `frontend-visual-qa`.

### Backend Conventions
- Express routes live in `backend/src/routes/`. Keep route handlers thin — validate inputs, delegate to helpers, return structured responses.
- Validate inputs at the route boundary before passing to business logic.
- Use Drizzle for SQLite persistence; never write raw SQL.
- Pino logging uses structured object-first pattern: `logger.info({ url }, 'message')`, `logger.error({ err }, 'message')`. Log level controlled by `LOG_LEVEL` env var (defaults to `info`, `silent` in test).
- HTTP request logging is handled automatically by `pino-http` middleware.

## Testing and Verification
Match verification to the risk and surface area:

- Pure logic: focused unit tests.
- Express routes or database behavior: route and persistence tests using Vitest + Supertest (see `backend/src/routes/locations.test.ts` for the pattern).
- Weather API behavior: fixtures or controlled API-shape tests using `sg-weather-api` guidance.
- Frontend behavior: the frontend has no test infrastructure yet. For UI changes, rely on visual QA using `frontend-visual-qa` and manual browser verification. When adding frontend tests, use Vitest with `@testing-library/react` and add the config to `frontend/`.
- Documentation-only changes: verify links, commands, and referenced paths; run the quality gate if the docs affect executable workflows.

Use `repo-quality-gate` before finishing code or documentation tasks unless the user explicitly narrows the request or local constraints prevent it. If a check cannot be run, state why.

## Documentation Rules
- Check `/docs` after every task.
- Update docs when behavior, commands, architecture, environment setup, database shape, public API shape, or conventions change.
- Keep `AGENTS.md` concise; link to docs or skills instead of duplicating long procedures.
- When this file changes agent behavior, keep the Skills and Sub-Agents inventory accurate.

## Skills Management
Use skills when the task clearly matches the skill description. Read only the needed parts of the skill and its direct references.

Create a new skill when:
- A task is repeated more than twice.
- A workflow has more than three ordered steps.
- A reusable project-specific pattern is too detailed for `AGENTS.md`.

Update an existing skill with `update-skill` when:
- A better approach is discovered.
- A step in the skill no longer works.
- New tools, packages, or repo structure change the workflow.

Store skills in:
- Project skills: `.agents/skills/<skill-name>/SKILL.md`
- Global skills: `~/.gemini/antigravity/skills/<skill-name>/SKILL.md`

Skill naming:
- Use lowercase hyphenated names, for example `weather-data-fetcher`.
- Name the task, not the implementation tool.
- Include accurate `name` and `description` YAML frontmatter.

## Sub-Agent Definitions
Create or update a sub-agent definition only when the project needs a reusable role with dedicated review behavior, constraints, and responsibilities. A linear repeatable workflow belongs in a skill instead.

Store project sub-agents at `.agents/<sub-agent-name>/agent.md`. Use lowercase hyphenated directories and keep the file name `agent.md`.

## Current Inventory

### Skills
| Skill | Purpose | Use When |
| --- | --- | --- |
| `sg-weather-api` | Singapore data.gov.sg weather API shapes and usage patterns. | Adding or modifying weather data fetching, API routes, or response handling. |
| `drizzle-sqlite-migration` | SQLite persistence, Drizzle schema, migrations, database helpers, tests, and docs. | Changing database schema, adding tables/columns, or running migrations. |
| `frontend-visual-qa` | Responsive UI, theme, Leaflet map, and browser behavior verification. | Changing layout, styling, map components, or responsive behavior. |
| `chrome-devtools` | Chrome DevTools debugging, screenshots, network inspection, and Lighthouse checks. | Debugging runtime issues, inspecting network requests, or checking performance. |
| `weather-feature-workflow` | End-to-end weather features spanning API routes, data, React state, and dashboard UI. | Building a feature that touches both backend and frontend (e.g., adding a new weather data view). |
| `repo-quality-gate` | Final verification workflow for tests, build, lint, and docs review. | Finishing any code or documentation task before reporting done. |
| `create-skill` | Create new skills or substantially redesign skill structure. | A workflow is repeated more than twice or has more than three steps. |
| `update-skill` | Maintain existing skills when workflow steps, tooling, or repo conventions change. | An existing skill is outdated due to tooling, package, or repo changes. |

### Sub-Agents
| Sub-Agent | Location | Purpose |
| --- | --- | --- |
| `code-reviewer` | `.agents/code-review/agent.md` | Review correctness, performance, security, and style. |

## Error Handling and Retries
- Classify failures as validation, environment, dependency, tool, policy, or transient external errors.
- Stop on validation failures, policy conflicts, missing secrets, destructive ambiguity, or unclear ownership.
- Retry only idempotent or clearly safe steps.
- Use at most three attempts with backoff for transient external failures.
- Do not retry destructive commands, migrations, deployments, or form-submitting browser actions without explicit approval.

## Done Definition
A task is done when:

- The requested behavior or documentation change is implemented.
- Relevant tests or checks pass, or skipped checks are explicitly justified.
- Relevant docs have been reviewed and updated if needed.
- Secrets and sensitive data are not exposed.
- The final response summarizes changed files, verification, and remaining risks or follow-ups.
