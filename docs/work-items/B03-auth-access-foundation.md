# B03 - Auth and Access Foundation

Backlog reference: `B03` from `docs/reconstruction-backlog.md`
Status: `ready_for_signoff` (CP1-CP3 complete; CP4 implementation complete; awaiting final reviewer assignment + sign-off decision)
Owner: Reconstruction team (Architect/Backend/Frontend/DevOps/QA/Product/Security)
Depends on: `B02` multi-tenant domain/data contract (closed)

## CP1 - Opportunity Definition

### Problem Statement

The repository now has B02 tenant contracts and isolation scaffolds, but no
authentication/session baseline to enforce actor identity and role checks at
runtime. Without B03, privileged pathways remain vulnerable to unauthorized
access and tenant-boundary controls cannot be consistently enforced.

### User Segment Impacted

- Internal contributors implementing API, billing, and lead workflows
- Tenant admins/operators requiring predictable role-based access controls
- Security reviewers responsible for high-severity access-risk prevention

### Primary KPI + Target Delta

- Primary KPI: high-severity unauthorized-access defects found in review/testing
- Target delta: reduce to `0` accepted high-severity unauthorized-access defects
  for B03-scoped pathways

### Guardrail KPIs

- Bootstrap validation remains green (`npm run bootstrap:check` pass rate 100%)
- B04 intake start date slippage remains <= 15% versus baseline sequence

## CP2 - Economic Baseline

### Current Baseline

- Shared tenant context/RBAC contracts exist in `packages/contracts`
- Auth middleware/session handling: not implemented
- Privileged-action audit logging contract: not implemented
- Negative-path authorization test coverage: 0% for app runtime paths

### Assumptions and Data Source

- Baseline is grounded in completed B02 artifacts:
  - `packages/contracts/src/tenant-context.ts`
  - `packages/contracts/src/rbac.ts`
  - `docs/work-items/B02-foundation-scaffolds.md`
- B03 definition of done sourced from `docs/reconstruction-backlog.md`
- Security/retention impact aligned with `docs/engineering-constitution.md`

### Estimated Upside / Downside

- Upside: lower breach/liability risk and lower rework cost for B04-B10
- Upside: faster implementation velocity by reusing B02 contracts in one auth
  baseline
- Downside/risk: selecting auth/session boundaries too narrowly may create
  migration overhead in later items

## CP3 - Solution Design

### Proposed Solution Summary

Implement a minimal auth/access foundation that reuses B02 contracts:

1. Add authentication/session baseline integration for API/runtime entry points
2. Enforce role-guard middleware/policy checks using B02 RBAC contracts
3. Add audit-event capture for privileged actions with tenant/request context
4. Add negative-case authorization tests for tenant boundary and role failures

### Alternatives Considered and Rejected

- **Alternative:** defer auth implementation until B04 billing skeleton
  - **Rejected:** increases unauthorized-access and tenant-risk exposure
- **Alternative:** implement complete identity provider + SSO surface now
  - **Rejected:** exceeds bounded scope and delays near-term risk reduction

### Architecture and Boundaries

- B03 must consume and not fork B02 tenant/RBAC contracts
- Tenant context is mandatory in auth checks, policy checks, and audit logs
- No billing, telephony, or feature workflow implementation in this intake phase
- BYOT and multi-tenant isolation constraints remain mandatory

### Risks

- Role-policy mapping gaps for edge actions could cause over/under-permissioning
- Missing correlation fields in audit logs could weaken incident response
- Middleware bypass paths could appear if boundaries are not centralized

### Rollback Plan

- Emergency read-only mode for privileged endpoints
- Revert B03 runtime/auth changes in isolated rollback commit(s)
- Preserve B02 contracts and planning artifacts as stable baseline

### Test Plan

- Run `npm run bootstrap:check` before and after B03 increments
- Add auth unit and integration tests for allow/deny paths
- Add negative-case authorization tests across tenant and role boundaries
- Verify privileged actions produce audit records with tenant/request context

### Measurement Plan

- Track unauthorized/forbidden defect count per increment
- Track policy bypass findings during architecture/security review
- Track % of privileged actions with complete audit context fields

## Review Sign-Off Checklist (Required Before CP4)

- [x] Architect sign-off
- [x] Security sign-off
- [x] Product sign-off
- [x] QA sign-off
- [x] DevOps sign-off

Sign-off note: 2026-05-04 approval granted to begin a bounded CP4 increment
limited to auth/access foundation artifacts aligned to B02 contracts.

## CP4 - Build and Validation (In Progress)

### Implementation Scope (Current Increment)

- Add foundational authenticated tenant context types/utilities in
  `packages/contracts`
- Add access guard helpers that enforce B02 RBAC capabilities in
  `packages/contracts`
- Apply one guarded integration point in scaffolded runtime package (`apps/api`)
- Do not expand into billing runtime, telephony runtime, or feature workflows

### CP4 Evidence (2026-05-04)

- Added auth context foundation:
  - `packages/contracts/src/auth-context.ts`
- Added RBAC-backed guard helpers:
  - `packages/contracts/src/access-guard.ts`
- Exported new B03 foundation artifacts through contracts index:
  - `packages/contracts/src/index.ts`
- Applied guard integration in scaffolded API package:
  - `apps/api/src/index.ts` (`getTenantAccessSnapshot` + `requireCapability`)
- Added privileged-action audit trail baseline:
  - `packages/contracts/src/access-guard.ts` (`CapabilityAuditEvent`,
    `authorizeCapability`, `AccessDeniedError`)
  - `packages/contracts/src/access-audit.ts` (`AccessAuditSink`,
    `InMemoryAccessAuditSink`, `toAccessAuditCallback`)
  - `apps/api/src/index.ts` (`getTenantAccessSnapshotWithAudit`)
- Added negative-case authorization tests:
  - `apps/api/src/index.test.ts`
  - `packages/contracts/src/access-guard.test.ts`
- Added positive-path high-risk capability coverage:
  - `apps/api/src/index.test.ts`
  - `packages/contracts/src/access-guard.test.ts`
- Added structured runtime audit transport boundary:
  - `apps/api/src/index.ts` (`SecurityAuditTransport`,
    `InMemorySecurityAuditTransport`, transport-backed sink wiring)
- Added tenant-boundary middleware-entry simulation guard:
  - `apps/api/src/index.ts` (`authorizeTenantRouteAccess`,
    `TenantBoundaryViolationError`)
- Added tenant-boundary negative tests at middleware-entry simulation layer:
  - `packages/contracts/src/bootstrap-ingress.test.ts`
- Added auth/session envelope adapter for external identity claims:
  - `apps/api/src/index.ts` (`buildTenantAccessRequestFromSession`,
    `SessionEnvelopeInput`, `SessionEnvelopeError`)
- Added middleware-entry unauthenticated deny-path simulation:
  - `apps/api/src/index.test.ts`
  - `packages/contracts/src/auth-context.test.ts`
- Added request metadata contract for security correlation:
  - `apps/api/src/index.ts` (`RequestMetadata`)
  - metadata propagated through capability, tenant-boundary, and
    session-envelope audit entries
- Added deny-path tests for tenant/auth guard failures:
  - `apps/api/src/index.test.ts`
  - `packages/contracts/src/auth-context.test.ts`
- Added upstream identity-provider adapter contract for claim parsing:
  - `apps/api/src/index.ts` (`IdentityProviderAdapter`,
    `IdentityProviderClaimsParseResult`,
    `buildTenantAccessRequestFromIdentityProviderSession`)
- Added adapter and ingress coverage for valid/invalid provider boundaries:
  - `apps/api/src/index.test.ts`
  - `packages/contracts/src/bootstrap-ingress.test.ts`
- Added privileged-action audit conformance checklist artifact:
  - `docs/work-items/B03-privileged-action-audit-conformance-checklist.md`
- Added package wiring for safe type resolution:
  - `packages/contracts/package.json`
  - `apps/api/package.json`
  - `apps/api/tsconfig.json`

### Validation Commands

- `npm run bootstrap:check`
- `npm run test:auth`
- `npm run b03:check`
- Lints for edited files via `ReadLints`

### Validation Result

- `npm run b03:check` passes:
  - workspace check, typecheck, lint, and format check
  - authorization tests for session envelope, tenant boundary, capability checks,
    and identity-provider adapter parsing paths

### CP4 Sign-Off Packaging (2026-05-05)

- Evidence bundle prepared for review:
  - `docs/work-items/B03-privileged-action-audit-conformance-checklist.md`
- Exit-gate mapping (per `docs/checkpoints-and-procedures.md` CP4):
  - code implementation: complete for B03 scoped foundation
  - automated tests: complete (`npm run test:auth`)
  - manual validation notes: captured in `docs/reconstruction-execution-log.md`
  - high-severity unresolved issues: none currently identified in B03 scope
- Reviewer assignment status:
  - Security reviewer: `Security lead (pending named assignee)`
  - QA reviewer: `QA lead (pending named assignee)`
- Go/no-go target:
  - move B03 from CP4 to CP5 once reviewer assignments, review date, and
    checklist result are recorded

### CP4 Exit Criteria Snapshot

- `code implementation`: complete for B03 scoped foundation
- `automated tests`: complete and green (`npm run b03:check`)
- `manual validation notes`: complete in execution log
- `high-severity unresolved defects`: none open in current bug register entries
- `remaining blocker`: named Security and QA assignees + scheduled review date

### Rollback Reminder

- Revert only B03 CP4 foundation files in isolated rollback commit(s)
- Preserve B02 contracts baseline and all non-B03 repository changes
