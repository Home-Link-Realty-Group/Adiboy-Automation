# B02 - Multi-Tenant Domain and Data Contract

Backlog reference: `B02` from `docs/reconstruction-backlog.md`
Status: `complete` (CP1-CP4 complete; ready for B03 intake)
Owner: Reconstruction team (Architect/Backend/Frontend/DevOps/QA/Product/Security)
Depends on: `B01` monorepo bootstrap baseline

## CP1 - Opportunity Definition

### Problem Statement

The repository now has an executable monorepo scaffold, but it lacks explicit
tenant-domain contracts and data-isolation conventions. Starting auth, billing,
and feature work without these foundations increases the risk of cross-tenant
data leakage, inconsistent authorization behavior, and expensive rework.

### User Segment Impacted

- Internal implementation contributors for API, auth, and workflow modules
- Brokerage operators and tenant admins who depend on strict tenant isolation

### Primary KPI + Target Delta

- Primary KPI: high-severity tenant-isolation defect count in implementation
  review cycles
- Target delta: reduce from unknown/unbounded baseline to `0` accepted
  high-severity defects per reviewed increment

### Guardrail KPIs

- Guardrail KPI: time-to-deliver dependent item `B03` should not increase by
  more than 15% due to contract overhead
- Guardrail KPI: bootstrap checks remain green (`bootstrap:check` pass rate
  stays at 100% for this increment)

## CP2 - Economic Baseline

### Current Baseline

- Tenant identity propagation contract: not defined in code
- Tenant-scoped schema planning artifact: not defined
- RBAC baseline matrix: not defined
- Data-access conventions for tenant context: not defined

### Assumptions and Data Source

- Baseline derived from current scaffold contents in `apps/` and `packages/`
- Requirements traced to `docs/reconstruction-backlog.md` and
  `docs/engineering-constitution.md`
- Cost/risk priority is justified by backlog ordering (`B02` before `B03+`)

### Estimated Upside / Downside

- Upside: reduces security defect risk and rework cost for all downstream
  backlog items
- Upside: makes auth and API implementation faster by giving one shared tenant
  contract
- Downside/risk: if over-specified too early, contracts may require updates as
  product behavior becomes concrete

## CP3 - Solution Design

### Proposed Solution Summary

Implement a minimal foundation package and planning docs that establish:

1. Tenant context contract conventions for request/job paths
2. Tenant-scoped domain record contract and naming expectations
3. Baseline RBAC role-to-capability matrix (draft)
4. Schema planning scaffold for tenant isolation and auditability

### Alternatives Considered and Rejected

- **Alternative:** wait until `B03` auth implementation to define contracts
  - **Rejected:** increases risk of incompatible assumptions across teams
- **Alternative:** implement full database migrations now
  - **Rejected:** overreaches scope before auth and feature behaviors are
    finalized

### Architecture and Boundaries

- Contracts live in a shared package for reuse by API/auth/billing modules
- Schema plan is documentation-only at this stage (no database mutation)
- RBAC matrix is baseline-only and will be expanded in `B03` and `B10`
- Tenant context propagation must be present in API, jobs, logs, and billing
  boundaries

### Risks

- Role matrix might miss future edge roles without product feedback
- Tenant context fields could be too narrow for all background job scenarios
- Contributors might bypass shared contracts without enforcement hooks

### Rollback Plan

- Revert new B02 contract package and documentation in a single rollback commit
- Keep B01 bootstrap baseline intact
- Do not apply any production schema migration (none introduced)

### Test Plan

- Run `npm run bootstrap:check` after adding B02 artifacts
- Verify TypeScript build includes new contracts package without regressions
- Validate docs exist and align with backlog definition of done

### Measurement Plan

- Track architecture and security review findings on tenant boundaries
- Track number of auth/data contract changes required in `B03` (lower is better)
- Track whether downstream items reuse shared contracts without divergence

## Review Sign-Off Checklist (Required Before CP4)

- [x] Architect sign-off (continuation approval for bounded B02 foundation)
- [x] Security sign-off (continuation approval for bounded B02 foundation)
- [x] Product sign-off (continuation approval for bounded B02 foundation)
- [x] QA sign-off (validation evidence reviewed)
- [x] DevOps sign-off (validation evidence reviewed)

Sign-off assumption recorded: 2026-05-04 continuation request approved to
proceed with a constrained CP4 increment limited to contracts and scaffolds.

## CP4 - Build and Validation (Complete)

### Implementation Scope (Bounded)

- Add shared package for tenant context and RBAC baseline contracts
- Add schema planning scaffold (documentation only)
- Keep implementation to foundational artifacts only (no auth runtime or DB
  migration)

### Validation Commands

- `npm run bootstrap:check`

### Current Validation State

- 2026-05-04: `npm run bootstrap:check` passed (workspace check, typecheck,
  lint, and format check all succeeded).
- 2026-05-04: formatting drift that previously blocked `format:check` was
  corrected with minimal Prettier updates to existing bootstrap files.

### Manual Validation Notes

- Confirmed artifacts are foundational-only and reversible
- Confirmed no production infrastructure or migration action was introduced

### CP4 Closeout Decision

B02 is closed as complete and ready for dependent intake (`B03`). All work in
this item remains within planning/foundation boundaries:

- Shared tenant/RBAC contracts in `packages/contracts`
- Planning-only scaffold in `docs/work-items/B02-foundation-scaffolds.md`
- No auth runtime, billing runtime, telephony runtime, or DB migration started
