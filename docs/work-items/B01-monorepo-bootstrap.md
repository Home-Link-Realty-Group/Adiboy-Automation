# B01 - Monorepo Bootstrap for App Implementation

Backlog reference: `B01` from `docs/reconstruction-backlog.md`
Status: `in_progress` (CP4 implementation started after sign-off)
Owner: Reconstruction team (Architect/Backend/Frontend/DevOps/QA/Product/Security)

## CP1 - Opportunity Definition

### Problem Statement

The repository has strong governance and workflow artifacts, but no executable
application scaffold. Without a monorepo foundation (workspace layout, base
tooling, and CI guardrails), implementation work cannot proceed consistently or
safely across contributors.

### User Segment Impacted

- Internal contributors (human and agent) building Home-Link SaaS modules
- Product owner requiring predictable progress and low restart friction

### Primary KPI + Target Delta

- Primary KPI: cycle time from task start to first validated implementation PR
- Target delta: reduce by 40% after scaffold baseline is in place

### Guardrail KPIs

- Build failure rate on PRs must remain below 10%
- Onboarding/setup time for a new contributor must be under 20 minutes

## CP2 - Economic Baseline

### Current Baseline

- App implementation readiness: 0% (no app scaffold)
- CI enforcement for app quality gates: 0%
- Repeatable contributor bootstrap for app code: not established

### Assumptions and Data Source

- Baseline derived from current repository inventory in
  `docs/reconstruction-source-of-truth.md`
- Existing scripts support workflow/document processing only

### Estimated Upside / Downside

- Upside: faster parallel development, fewer integration conflicts, lower rework
- Downside/risk: upfront setup effort before visible feature work

## CP3 - Solution Design

### Proposed Solution Summary

Implement a minimal but production-minded monorepo bootstrap:

1. Define workspace topology for `apps/*` and `packages/*`
2. Establish shared TypeScript/lint/format baseline
3. Add first CI workflow for install + static checks
4. Add a seeded app package to validate bootstrap path

### Alternatives Considered and Rejected

- **Alternative:** start coding features directly without scaffold
  - **Rejected:** high entropy, no consistent quality gates
- **Alternative:** bootstrap full production stack in one pass
  - **Rejected:** too large for safe first increment

### Architecture and Boundaries

- Root owns workspace/tooling/CI contracts
- `apps/` holds deployable surfaces (web/api)
- `packages/` holds shared UI/config/util contracts
- Tenant/security constraints enforced in later dependent items (`B02+`)

### Risks

- Toolchain over-configuration before first app feature
- CI friction if scripts are too strict at bootstrap stage
- Inconsistent package boundaries if naming conventions are vague

### Rollback Plan

- Revert bootstrap changes in one dedicated rollback commit
- Keep docs and backlog artifacts intact
- Pause at prior docs-only baseline with no partial runtime changes

### Test Plan

- Validate fresh install and workspace resolution
- Run static checks in CI on a clean clone
- Verify scripts execute from root and seeded app package

### Measurement Plan

- Track PR lead time before/after bootstrap
- Track first-week CI pass/fail ratio
- Track setup duration for any new contributor session

## Review Sign-Off Checklist (Required Before CP4)

- [x] Architect sign-off
- [x] DevOps sign-off
- [x] QA sign-off
- [x] Security sign-off
- [x] Product sign-off

Sign-off recorded: 2026-05-04 (approved to begin CP4 execution).

## CP4 - Build and Validation (In Progress)

### Implementation Scope

- Add npm workspace topology across `apps/*` and `packages/*`
- Add shared TypeScript configuration in `packages/config`
- Add seeded TypeScript packages in `apps/api` and `packages/ui`
- Add root static checks and CI workflow

### Validation Commands

- `npm install`
- `npm run bootstrap:check`

### Current Validation State

- 2026-05-04: `npm run bootstrap:check` passed (workspace check, typecheck,
  lint, and format check all succeeded).
