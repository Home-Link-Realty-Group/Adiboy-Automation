# Home-Link Contributor Operating System

## One Workspace Entry Point

Start every day from one desktop screen:
`DAILY_LOGIN.html`.

On Windows, double-click `open-daily-workspace.cmd` after cloning this repo.

Use one workspace file only:
`Home-Link-SaaS-Reconstruction.code-workspace`

Current reconstruction branch:
`b01-bootstrap-upgrades`

Do not use old branch names, old workspace names, local screenshots, chat memory,
or unverified prior claims as the source of progress. The single progress record
is `docs/reconstruction-source-of-truth.md`.

This repository uses a profitability-first engineering constitution. Every
change must show business impact, quality evidence, and safe rollout readiness.

## Start Here

1. Open `DAILY_LOGIN.html`.
2. Open `Home-Link-SaaS-Reconstruction.code-workspace`.
3. Confirm the branch is `b01-bootstrap-upgrades`.
4. Read `docs/reconstruction-source-of-truth.md` only when you need details.
5. Follow `docs/checkpoints-and-procedures.md` for execution steps.

## Required Standards

- No implementation without a clear profitability hypothesis.
- Every PR includes measurable KPI targets and verification evidence.
- Work ships in small, reversible increments.
- Visual/UI changes require screenshot evidence for parity.
- Multi-tenant and BYOT telephony constraints are mandatory.

## Framework Docs

- `CONTRIBUTING.md`
- `docs/engineering-constitution.md`
- `docs/profitability-framework.md`
- `docs/checkpoints-and-procedures.md`
- `docs/architecture-diagrams.md`
- `docs/reconstruction-source-of-truth.md`
- `docs/reconstruction-backlog.md`
- `docs/execution-protocol-checklist.md`
- `docs/tests-checks-system.md`
- `docs/task-automation-system.md`
- `docs/bug-register.md`

## Single-Workspace Reconstruction

To keep all work in one place, use these documents together:

1. `docs/reconstruction-source-of-truth.md` for current validated status.
2. `docs/reconstruction-backlog.md` for what gets built and in what order.
3. `docs/execution-protocol-checklist.md` for mandatory execution gates.
4. `docs/bug-register.md` for strict defect tracking and closure evidence.

No implementation task should start without a referenced backlog ID and the
checklist gates from CP1-CP6.

## Daily Progress Board

Use GitHub Projects as the visual progress board for this workspace.

1. Create a project board named `Base44 Build Progress`.
2. Add these status columns: `Backlog`, `Planned`, `In Progress`, `Blocked`,
   `In Review`, `Done`.
3. Add issues and PRs from this repo as project items.
4. Pin the project URL in your browser favorites bar and as a startup tab.

The repository includes a daily automation that posts a progress snapshot issue
every morning. Add that issue type to your board so the status history is easy
to scan at any time.

### One-Time Setup

- In repo settings, create an Actions variable named `PROJECT_BOARD_URL`.
- Set it to your GitHub Project URL (for example,
  `https://github.com/orgs/<org>/projects/<id>`).
- Ensure GitHub Actions are enabled for this repository.

### Daily Access Flow

- Open your pinned GitHub Project board tab.
- Review the latest issue titled `Daily Progress Snapshot (YYYY-MM-DD)`.
- Use that snapshot to decide the next priorities and blockers.

## Tests and Checks Automation

Use the reconstruction checker to automatically run quality gates whenever at
least two files are waiting for review/commit:

- Run once: `npm run checks:run`
- Run quick profile: `npm run checks:quick`
- Run full profile: `npm run checks:full`
- Run continuously: `npm run checks:watch`

Run evidence is written to `reports/tests-checks/`.
