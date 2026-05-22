# Tests and Checks System (Reconstruction)

This document defines a custom, automated quality process for the full
reconstruction phase.

## Goal

Run tests/checks automatically when enough pending changes exist, support manual
execution at any time, and keep auditable evidence for each run.

## Trigger Rule

The automated checker starts a run when:

- there are at least **2 pending files** in git status, and
- the pending-file snapshot changed since the last completed run.

Pending files include staged, unstaged, and untracked files.

## Profile-Based Runs

The system is config-driven through `tests-checks.config.json`.

- `quick` profile: fast local iteration checks
- `full` profile: full local reconstruction gate
- `ci` profile: CI gate for PR/scheduled validation

Default profile for local watch mode is `full`.
Profiles can set `publishLatest: true/false`. Non-default config files do not
overwrite `latest.json` unless `publishLatest` is explicitly enabled.

## Commands

- Run once (default full profile):
  - `npm run checks:run`
- Run quick profile once:
  - `npm run checks:quick`
- Run full profile once:
  - `npm run checks:full`
- Run CI profile once:
  - `npm run checks:ci`
- Run continuously in watch mode:
  - `npm run checks:watch`
- Run quick watch mode:
  - `npm run checks:watch:quick`
- Run full watch mode with shorter polling:
  - `npm run checks:watch:fast`

One-time mode (`--once`) exits with code `1` when checks fail, so CI can use it
as a strict quality gate.
CI mode also uses `--force-run`, so checks execute on clean checkouts (no
pending-file dependency) and are not skipped by duplicate pending-file
signatures.

## Current Full Gate Coverage

The full/ci profile currently runs `npm run b03:check`, which includes:

- workspace structure validation
- TypeScript typecheck
- lint
- formatting check
- auth/access test suite

## Reports

Each run writes machine-readable evidence to:

- `reports/tests-checks/latest.json` (most recent run)
- `reports/tests-checks/history.ndjson` (append-only run history)
- `reports/tests-checks/latest-summary.md` (human-readable summary)
- `reports/tests-checks/.lock` (run lock while active)

Note: `reports/tests-checks/` is git-ignored as local runtime output.
In watch mode, skip cycles are recorded in `history.ndjson` only; `latest.json`
and `latest-summary.md` always reflect the most recent real check execution.

Each report includes:

- timestamp
- pending file count + file names
- trigger readiness
- commit recommendation (`readyToCommit` true/false)
- commit recommendation reason (`commitDecisionReason`)
- selected profile
- per-step results, exit code, and output

## Warning Popup (Windows)

When a check run fails, the watcher shows a Windows warning popup (MessageBox)
with a short failure summary and where to find details.

- Trigger: failed check run (`readyToCommit: false`)
- Detail source: `reports/tests-checks/latest.json`

## Always-On Scheduling (Local)

To keep this running automatically during reconstruction:

1. Start once in a terminal:
   - `npm run checks:watch`
2. Optionally register it with Windows Task Scheduler at login:
   - Program: `npm`
   - Arguments: `run checks:watch`
   - Start in: repository root path

This gives continuous local auto-checking as soon as 2+ files are waiting for
review/commit.

## CI Schedule

The repository uses two workflows:

- `.github/workflows/bootstrap-ci.yml`
  - runs on pull requests and manual dispatch
  - executes `npm run checks:ci`
- `.github/workflows/reconstruction-tests-checks.yml`
  - runs on pushes to `main`/`master`, every 4 hours, and manual dispatch
  - executes `npm run checks:ci`

CI validates committed code independently from local uncommitted changes.

## Process Standard During Reconstruction

1. Keep `checks:watch` running while implementing.
2. Review `reports/tests-checks/latest.json` after each automated run.
3. Do not commit until latest run is green.
4. For PR handoff, confirm both:
   - local latest check green
   - CI PR check green

## Future Upgrade Path

When B04-B12 land, expand `tests-checks.config.json` profiles to include
integration tests, E2E checks, performance checks, and release smoke checks.
