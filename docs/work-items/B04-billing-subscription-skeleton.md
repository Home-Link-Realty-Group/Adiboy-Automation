# B04 - Billing and Subscription Skeleton

Backlog reference: `B04` from `docs/reconstruction-backlog.md`
Status: `in_progress` (CP1–CP3 complete; CP4 skeleton implementation complete in-repo)
Owner: Reconstruction team (Architect/Backend/Frontend/DevOps/QA/Product/Security)
Depends on: `B03` auth and access foundation (closed for bounded scope)

## CP1 - Opportunity Definition

### Problem Statement

The product roadmap requires tenant-scoped monetization and enforcement of billing
limits, but the repository has no subscription lifecycle model, no provider webhook
ingress, and no idempotent event handling. Without B04, later features cannot safely
assume billing state or guard premium capabilities.

### User Segment Impacted

- Engineering implementing gated features (leads, offers, telephony)
- Finance and operations relying on subscription correctness
- Security reviewers concerned with webhook authenticity and replay attacks

### Primary KPI + Target Delta

- Primary KPI: billing state drift incidents (wrong entitlements vs provider)
- Target delta: `0` accepted drift incidents for B04-scoped webhook path in test/stage
  validation

### Guardrail KPIs

- Bootstrap validation remains green (`npm run bootstrap:check` pass rate 100%)
- Webhook replay does not double-apply financial state transitions in tests

## CP2 - Economic Baseline

### Current Baseline

- Tenant and RBAC contracts exist; `billing.read` / `billing.manage` capabilities exist
- No subscription entities, billing events, or webhook ingress
- No documented usage caps or integration with a billing provider

### Assumptions and Data Source

- B03 ingress and audit patterns remain the standard for protected API paths
- B04 definition of done sourced from `docs/reconstruction-backlog.md`
- Provider: Stripe-like event names used as **compatibility labels** only in this
  skeleton; verifier is a deliberate stub

### Estimated Upside / Downside

- Upside: unlocks B05+ work that assumes a monetization spine
- Upside: idempotent webhook handling reduces duplicate-charge / duplicate-entitlement
  bugs early
- Downside/risk: a toy signature verifier must be replaced before production traffic

## CP3 - Solution Design

### Proposed Solution Summary

1. Define **subscription status** and **billing webhook envelope** types in
   `packages/contracts`, keyed by `TenantId` and a provider event id suitable for
   idempotency.
2. Implement a **skeleton webhook ingress** in `apps/api` that:
   - validates a stub `X-Billing-Signature` header against a configured signing secret
     (string equality with `v1=<secret>` for tests and local dev only),
   - parses JSON into the envelope,
   - applies **in-memory idempotency** keyed by `eventId + tenantId` (documented as
     non-durable placeholder).
3. Document **usage boundary checks**: premium routes must consult subscription
   state (future persistence); this increment only establishes types and ingress proof.

### Alternatives Considered and Rejected

- **Alternative:** integrate live Stripe SDK and full HMAC verification in B04
  - **Rejected:** exceeds one-session skeleton scope; stub verifier plus tests prove
    the contract boundary first
- **Alternative:** persist subscription rows in Postgres immediately
  - **Rejected:** no database runtime in this monorepo increment; persistence lands
    with core API runtime (B06)

### Architecture and Boundaries

- B04 builds on B03 patterns (typed errors, test-first ingress) but must not fork
  tenant identity types
- Webhook path is **unauthenticated provider ingress** protected only by the stub
  signature check; production must swap in timing-safe HMAC and provider-specific
  parsing
- No telephony, lead intake, or operator UI in this increment

### Risks

- Developers may mistake the stub verifier for production-ready crypto
- In-memory idempotency resets on process restart (documented)
- Event schema drift vs real provider payloads

### Rollback Plan

- Disable webhook entrypoint via configuration or route removal
- Revert B04-only modules: `packages/contracts/src/billing-webhook.ts`,
  `apps/api/src/billing-webhook.ts`, associated tests, and `index` exports
- Preserve B03 ingress and contracts

### Test Plan

- Run `npm run bootstrap:check` before and after B04 increments
- Unit tests: signature failure, invalid JSON, happy path apply, duplicate delivery
  returns `duplicate: true` without throwing

### Measurement Plan

- Track webhook test coverage for signature, idempotency, and parse failures
- Track follow-up tasks to replace stub verifier and durable idempotency store

## Review Sign-Off Checklist (Required Before CP4)

- [x] Architect sign-off
- [x] Security sign-off
- [x] Product sign-off
- [x] QA sign-off
- [x] DevOps sign-off

Sign-off note: 2026-05-06 bounded B04 CP4 approved for skeleton types, stub verifier,
and in-memory idempotency only.

## CP4 - Build and Validation

### Implementation Scope

- Shared billing webhook types and parse/validate helpers in `packages/contracts`
- API module for skeleton webhook delivery handling in `apps/api`
- Automated tests under `apps/api`

### CP4 Evidence

- See repository files referenced in `docs/reconstruction-execution-log.md` after B04
  merge (2026-05-06 session).

### Validation Commands

- `npm run bootstrap:check`

### Validation Result

- Recorded in `docs/reconstruction-execution-log.md` after CP4 completes.

### Rollback Reminder

- Revert B04 files in isolated commit(s); do not revert B03 ingress or B02 contracts
  unless incident demands full rollback
