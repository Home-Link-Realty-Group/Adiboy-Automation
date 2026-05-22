# B02 Foundation Scaffolds (CP4)

This document captures planning-only artifacts introduced during the first CP4
increment for `B02`.

## 1) Tenant-Context Conventions

Use `@home-link/contracts` as the single contract source for tenant context.

- Every write/read path that touches tenant data uses a `TenantContextEnvelope`.
- `tenant.tenantId` is required on every domain payload and job payload.
- `tenant.requestId` is required for audit correlation across API/jobs/logs.
- `tenant.actorRole` must be one of the baseline `TenantRole` values.
- `tenant.actorUserId` may be `null` only for system-originated work.

## 2) Baseline RBAC Matrix Conventions

The baseline role-capability matrix is defined in
`packages/contracts/src/rbac.ts`.

- Capabilities are scoped and verb-oriented (`lead.read`, `offer.update`, etc.)
- `tenant_admin` can manage tenant members but does not get platform-wide scope
- `readonly_analyst` is read-only across supported domains
- Matrix is baseline-only and will be extended in `B03`/`B10` as flows solidify

## 3) Schema Planning Scaffold (No Migration)

Target strategy: tenant-scoped shared schema with explicit tenant boundary fields
and optional RLS enforcement once auth identity plumbing exists.

### Required Columns for Tenant Domain Tables

- `id` (primary key)
- `tenant_id` (required, indexed, immutable after insert)
- `created_at`, `updated_at`
- `deleted_at`, `deleted_by_user_id` (soft-delete baseline for auditability)

### Initial Candidate Tables for B03+ Implementation

- `tenants`
- `tenant_memberships`
- `seller_leads`
- `offers`
- `billing_accounts`
- `audit_events`

### Index and Constraint Baseline

- Composite uniqueness patterns include `tenant_id` where relevant
- Foreign keys between tenant-scoped tables include tenant-safe join patterns
- Query plans for high-volume tables include `(tenant_id, created_at)` indexes

### Guardrails

- No cross-tenant query path in application code without explicit admin pathway
- No production migration added in this increment
- RLS policies are planned but deferred until auth/session contracts are in place
