# B03 Privileged-Action Audit Conformance Checklist

Backlog reference: `B03` auth/access foundation
Status: `ready_for_review` for CP4 sign-off evidence
Owner: Reconstruction team (Security + Backend + QA)

## Purpose

Confirm that B03 privileged-action authorization paths emit complete, structured,
and reviewable security audit events before closing B03 CP4.

## Scope

- Runtime auth flow in `apps/api/src/index.ts` plus split API helpers under
  `apps/api/src/`
- Authorization and envelope tests in `apps/api/src/index.test.ts` and
  `packages/contracts/src/*test.ts`
- Event types currently implemented in B03:
  - `auth.session_envelope_check`
  - `auth.tenant_boundary_check`
  - `auth.capability_check`

## Required Event Fields (Conformance Gate)

For every privileged-action decision event, the following fields are required:

- `eventType`
- `occurredAt`
- `requestId`
- `routeTenantId` (nullable only where not applicable)
- `tenantId`
- `actorUserId` (nullable only when unauthenticated)
- `actorRole`
- `capability` (nullable only for non-capability envelope/boundary checks)
- `outcome` (`allowed` or `denied`)
- `reason` (null for allowed, explicit code for denied)
- `ipAddress` (nullable when unavailable)
- `userAgent` (nullable when unavailable)

## Pass/Fail Criteria

1. **Session Envelope Checks**
   - **Pass when:** allow and deny paths emit `auth.session_envelope_check` with
     full required fields.
   - **Fail when:** tenant/role/session-claim failures do not emit a denied event
     with explicit reason code.
2. **Tenant Boundary Checks**
   - **Pass when:** route-tenant mismatch emits denied
     `auth.tenant_boundary_check` and matching route emits allowed event.
   - **Fail when:** boundary mismatch can proceed without denied event.
3. **Capability Checks**
   - **Pass when:** privileged capability decisions emit
     `auth.capability_check` with tenant/request metadata correlation.
   - **Fail when:** allow/deny decisions are not represented in structured audit
     entries.
4. **Metadata Correlation**
   - **Pass when:** `ipAddress` and `userAgent` propagate through envelope,
     boundary, and capability events in tests.
   - **Fail when:** either correlation field is dropped unexpectedly.

## Current B03 Evidence Snapshot

- Implemented event plumbing:
  - `packages/contracts/src/privileged-audit.ts`
  - `apps/api/src/audit-sink.ts`
  - `apps/api/src/tenant-access.ts`
- Implemented entry guards:
  - `apps/api/src/ingress.ts`
  - `packages/contracts/src/bootstrap-ingress.ts`
- Test evidence:
  - `apps/api/src/index.test.ts` and `packages/contracts/src/*test.ts` include
    allow/deny assertions for ingress, capability, audit, and tenant-context
    paths.

## Sign-Off Package (CP4 -> CP5 Handoff)

- Evidence command: `npm run b03:check`
- Last evidence status: `pass` (workspace check, typecheck, lint, format, auth tests)
- Evidence scope:
  - auth session-envelope checks (allow + deny)
  - tenant-boundary middleware-entry checks (allow + deny)
  - privileged capability checks (allow + deny)
  - identity-provider adapter mapping (valid + invalid)
- Rollback trigger condition:
  - any high-severity auth bypass, tenant-boundary violation, or missing audit
    record for privileged decisions
- Rollback action:
  - revert B03-only runtime/doc changes in an isolated rollback commit
  - keep B02 contract baseline unchanged
- Rollback trigger owner: `Engineering lead (pending named assignee)`
- Post-launch observation owner: `Security lead (pending named assignee)`
- Go/no-go prerequisites:
  - `npm run b03:check` pass evidence within current review window
  - Security and QA reviewer assignment captured below
  - checklist result explicitly set to `PASS` or `FAIL`

## Sign-Off Template

- Security reviewer: `Security lead (pending named assignee)`
- QA reviewer: `QA lead (pending named assignee)`
- Review date: `Pending scheduling (target next B03 review cycle)`
- Result: `PENDING`
- Notes / remediation actions: `None yet`
