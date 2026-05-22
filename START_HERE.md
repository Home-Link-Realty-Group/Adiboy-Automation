# Start Here: Home-Link SaaS Reconstruction

This is the single entry point for the SaaS reconstruction workspace.

## Daily Desktop Login

Open `DAILY_LOGIN.html` every day.

On Windows, copy `open-daily-workspace.cmd` or `open-daily-workspace.ps1` to your
desktop. That shortcut opens the one screen for this workspace.

## One Workspace

- Repository: `Home-Link-Realty-Group/Wholesaler-Pro`
- Local Cursor Cloud path: `/workspace`
- Active reconstruction branch: `b01-bootstrap-upgrades`
- Active PR: `https://github.com/Home-Link-Realty-Group/Wholesaler-Pro/pull/16`
- Cursor/VS Code workspace file: `Home-Link-SaaS-Reconstruction.code-workspace`

Open this repository through `Home-Link-SaaS-Reconstruction.code-workspace`.
Do not start from old chat claims, screenshots, random folders, or legacy branch
names.

## Where Build Progress Lives

Read these files in this order:

1. `START_HERE.md` - this file, the front door.
2. `docs/reconstruction-source-of-truth.md` - current validated build status.
3. `docs/reconstruction-execution-log.md` - daily execution history.
4. `docs/reconstruction-backlog.md` - build order and dependencies.
5. `docs/bug-register.md` - known defects and closure evidence.

## Current Reconstruction Status

- `B01` monorepo bootstrap: complete.
- `B02` multi-tenant domain/data contract: complete.
- `B03` auth/access foundation: ready for sign-off.
- `B04` billing/subscription skeleton: intake ready for sign-off.
- `B05+`: not started.

The SaaS is still in reconstruction foundation work. Product feature flows like
seller intake, offer pipeline, BYOT telephony, and operator workspace come later
in the backlog.

## Agent Rule

Every Cursor agent must begin by reading this file and must keep work inside
this repository unless the user explicitly says otherwise.

If the branch, docs, or status conflict, pause and reconcile
`docs/reconstruction-source-of-truth.md` before making changes.
