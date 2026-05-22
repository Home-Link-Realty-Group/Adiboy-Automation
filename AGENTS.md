# AGENTS.md

## Cursor Cloud specific instructions

### Mandatory single entry point

Start every task by reading `START_HERE.md`. Treat it as the front door for this
SaaS reconstruction workspace.

- Correct repository: `Home-Link-Realty-Group/Wholesaler-Pro`
- Correct workspace file: `Home-Link-SaaS-Reconstruction.code-workspace`
- Canonical progress file: `docs/reconstruction-source-of-truth.md`
- Canonical execution log: `docs/reconstruction-execution-log.md`
- Canonical backlog: `docs/reconstruction-backlog.md`

Do not create alternate workspace files, alternate progress trackers, or
parallel "current status" documents. Update the canonical files instead.

### Repository overview

This repository contains:

- `src/` — a **Vite + React 18 SPA** (marketing website for Home-Link Realty Group) with pages for homepage, get-offer form, seller portal, resources, cities, and blog
- `workflows/` — ~365 `.docx` files and their converted `.md` versions (business logic specs exported from Base44)
- `workflows-cleaned/` — cleaned Markdown output
- `docs/` — reconstruction progress, backlog, work items, and governance docs
- `apps/` and `packages/` — TypeScript workspace scaffold (`@home-link/api`, contracts, UI) gated by the canonical backlog
- Utility scripts for workflow conversion and progress tracking

The reconstruction has started in this repo. Bootstrap workspace packages exist
under `apps/` and `packages/`; production app features are still gated by the
canonical backlog and checkpoint docs.

### Available npm scripts

All scripts are defined in `package.json`:

- `npm run dev` — starts Vite dev server (React SPA on port 5173)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config `eslint.config.mjs`) for the repo
- `npm run lint:fix` — auto-fix lint issues
- `npm run test` — Vitest (`vitest run`)
- `npm run workflows:convert` — converts `.docx` files to Markdown (requires `mammoth`)
- `npm run workflows:clean` — normalizes Markdown artifacts from Word conversion
- `npm run progress:snapshot` — posts a daily progress issue to GitHub (requires `GITHUB_TOKEN` and `GITHUB_REPOSITORY` env vars)
- `npm run bootstrap:check` — workspace check, TypeScript build, ESLint, Vitest, Prettier
- `npm run b03:check` — validates the B03 auth/access foundation bundle (`bootstrap:check` + Node test modules)
- `npm run checks:quick` — runs the quick reconstruction checks profile
- `npm run checks:ci` — runs the CI reconstruction checks profile

### Development notes

- **Package manager:** npm (lockfile: `package-lock.json`)
- **Node.js version:** 20.x LTS
- **Runtime dependency:** `mammoth` (docx-to-markdown converter)
- Workspace tooling: TypeScript, ESLint 9 (flat config), Prettier, Vitest, Husky +
  lint-staged on pre-commit, plus `checks:*` orchestrator scripts
- Root workflow utilities (`convert-workflows.cjs`, `clean-workflows.cjs`,
  `clean-workflows-py.cjs`) use CommonJS `require()`; the `.cjs` extension keeps
  them runnable even when the repo root sets `"type": "module"`
- The `components.json` (shadcn/ui config) is a placeholder for the future frontend build
- The `progress:snapshot` script requires GitHub API access (`GITHUB_TOKEN`) and will fail locally without it

### Starting the dev server

```bash
npm install
npm run bootstrap:check
npm run checks:quick
# optional:
npm run workflows:convert
npm run workflows:clean
npm run dev
```

The Vite dev server starts on `http://localhost:5173/`.

### Governance rules

All PRs must follow the template at `.github/pull_request_template.md` and the engineering constitution in `.cursor/rules/saas-reconstruction-constitution.mdc`.
