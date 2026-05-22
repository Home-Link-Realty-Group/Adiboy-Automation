# Bug Register

This register provides a lightweight but strict system for tracking
reconstruction bugs from discovery through closure.

## Purpose and Scope

- Enforce traceable defect handling for reconstruction work items.
- Keep bug evidence linked to backlog, validation, and rollback decisions.
- Cover defects in docs, contracts, tests, automation, and implementation.
- Keep entries concise, auditable, and reversible.

## Severity Definitions

- `S0-Critical`: security, tenant-isolation, data-loss, or production-blocking
  defect; immediate triage and containment required.
- `S1-High`: major workflow or compliance impact; fix in current active cycle.
- `S2-Medium`: functional issue with workaround; schedule in nearest increment.
- `S3-Low`: minor quality or documentation issue; fix when capacity allows.

## Status Workflow

`new -> triaged -> in_progress -> fixed -> verified -> closed`

Rules:

- Every bug starts as `new` and must be triaged before implementation.
- `fixed` requires a linked change artifact (commit or patch reference).
- `verified` requires evidence (test result, check run, or reviewer validation).
- `closed` requires no open regression risk for current scope.

## Required Fields Per Bug Entry

- `ID`
- `Date`
- `Area`
- `Severity`
- `Status`
- `Repro`
- `Root cause`
- `Fix commit`
- `Tests added`
- `Owner`

## Bug Register Entries

| ID | Date | Area | Severity | Status | Repro | Root cause | Fix commit | Tests added | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B03-BUG-001 | 2026-05-04 | B03 session-envelope adapter | S0-Critical | verified | Session claims without tenant should deny route entry and emit audit reason `missing_tenant_claim`. | Claims mapping path allowed incomplete identity payload to proceed to guard checks. | `patch_ref:b03_session_envelope_deny_path` | Current B03 Vitest coverage in `apps/api/src/index.test.ts` and `packages/contracts/src/*.test.ts`. | `Security lead (role)` |
| B03-BUG-002 | 2026-05-04 | B03 role-claim validation | S1-High | verified | Session claims with unknown role should deny route entry and emit audit reason `invalid_role_claim`. | Role normalization accepted non-whitelisted claim value before RBAC evaluation. | `patch_ref:b03_invalid_role_claim_guard` | Current B03 Vitest coverage in `apps/api/src/index.test.ts` and `packages/contracts/src/*.test.ts`. | `Backend lead (role)` |

## Operating Rules

1. All auth, security, tenant-boundary, and audit-integrity defects must include
   linked regression tests before moving beyond `fixed`.
2. Any bug marked `fixed` must reference a change artifact in `Fix commit` (or
   a patch reference when commit is pending).
3. Bugs discovered during constitution checkpoints must be logged before
   checkpoint sign-off.
4. A bug cannot move to `closed` without verification evidence recorded in tests
   or checks.
5. Owner fields must use role or team labels when named assignees are unknown.

## Session Closure Protocol

At the end of each active implementation session:

1. Add all newly discovered defects with `new` or `triaged` status.
2. Update statuses for defects touched in the session.
3. Link verification evidence (`checks` summary, tests, or review notes).
4. Sync any status-critical bug changes in:
   - `docs/reconstruction-execution-log.md`
   - `docs/reconstruction-source-of-truth.md`
