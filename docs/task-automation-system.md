# Task Automation System

This system auto-populates and maintains implementation tasks from the canonical
reconstruction backlog.

## Purpose

Keep planning and execution synchronized by turning each backlog item in
`docs/reconstruction-backlog.md` into a managed GitHub issue.

## Source of Truth

- Backlog source: `docs/reconstruction-backlog.md`
- Sync engine: `scripts/sync-backlog-to-issues.mjs`
- Automation workflow: `.github/workflows/backlog-task-sync.yml`

## What It Creates

For each backlog item (for example `B03`, `B04`, etc.), the sync creates or
updates one issue with:

- standardized title: `[Backlog Bxx] <item title>`
- outcome target and dependency fields
- CP1-CP6 checklist
- current backlog excerpt
- labels:
  - `reconstruction-backlog`
  - `backlog-bxx`

## Project Board Integration

If `PROJECT_BOARD_URL` is set (organization project URL), synced issues are also
added to that project board.

Expected format:

- `https://github.com/orgs/<org>/projects/<number>`

## Commands

- Dry-run preview (safe, no writes):
  - `npm run backlog:sync:dry`
- Live sync:
  - `npm run backlog:sync`

Required environment variables:

- `GITHUB_TOKEN`
- `GITHUB_REPOSITORY` (`owner/repo`)
- Optional: `PROJECT_BOARD_URL`

Dry-run can execute without GitHub environment variables for local parse preview.

## Automation Triggers

Workflow `.github/workflows/backlog-task-sync.yml` runs:

- on push when backlog/sync files change
- on manual dispatch
- daily schedule

## Operating Rule

Update `docs/reconstruction-backlog.md` first. Let sync automation create/update
execution issues. Avoid manual edits to auto-managed issue sections unless they
are execution notes.
