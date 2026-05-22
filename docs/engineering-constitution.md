# SaaS Reconstruction Engineering Constitution

This document is the governing contract for all contributors (human and AI).
It defines how we build for maximum profitability, reliability, and speed.

## 1) Roles and Ownership

Every work item must identify a responsible owner for each role:

- **Lead Architect**: system structure, domain boundaries, tenancy model
- **Backend Engineer**: API, DB, queue/worker logic, data guarantees
- **Frontend Engineer**: UX flows, accessibility, UI consistency
- **DevOps Engineer**: CI/CD, runtime reliability, observability, rollback
- **QA Engineer**: test strategy, edge-case coverage, quality gates
- **Product Manager**: market fit, profitability alignment, acceptance criteria
- **Security Officer**: RBAC, audit, secrets, abuse prevention, compliance

No role is optional on production-impacting work.

## 2) Rules of Execution

1. Architect first; do not code before boundaries and flow are defined.
2. Follow **Propose -> Review -> Implement** for every major change.
3. Ship in complete, runnable units (no pseudo-code, no dangling imports).
4. Keep changes reversible with explicit rollback criteria.
5. Do not merge without passing all quality gates.

## 3) Required Deliverables

Every feature or rebuild segment must produce:

- Problem statement and profitability hypothesis
- Scope + architecture note
- Data model and API contract updates (if affected)
- Working implementation with tests
- Screenshots for UI changes
- Operational notes (monitoring, rollback, runbook)
- Post-launch KPI measurement plan

## 4) Quality Gates

A contribution is blocked until all are satisfied:

- Build passes
- Lint/type checks pass
- Automated tests pass (or explicit waiver approved)
- Security checks pass (secrets, authz, abuse vectors)
- Accessibility checks meet WCAG AA baseline
- Rollback plan documented
- KPI hypothesis and guardrails documented

## 5) Profitability Constraints

All work must demonstrate at least one:

- Revenue growth potential
- Conversion lift potential
- Retention/churn reduction potential
- Cost reduction potential
- Risk reduction protecting margin

Hard constraints:

- Minimize compute and infrastructure sprawl
- Avoid unnecessary managed services
- Prefer scalable, efficient serverless/container execution
- Reduce support burden via clear UX and diagnostics

## 6) Non-Negotiables

- Multi-tenant isolation is mandatory
- No plaintext secrets anywhere
- RBAC and audit trails for sensitive operations
- Tenant-aware billing and usage boundaries
- Error boundaries, loading states, and empty states in user UI
- Documentation for every major module

## 7) Handoff Protocol

Each handoff (Agent/Human -> Agent/Human) must include:

1. Context summary (what changed and why)
2. Current status (done, in progress, blocked)
3. Open risks and assumptions
4. Exact next actions with owners
5. Evidence links (tests, screenshots, logs, PR)

No handoff without explicit next action.

## 8) Review and Correction Loop

Review loop:

1. Primary reviewer validates architecture and correctness
2. QA reviewer validates tests and edge cases
3. Security reviewer validates auth, secrets, abuse controls
4. Product reviewer validates business impact

Correction loop:

- Defect logged with severity and owner
- Fix applied in smallest safe unit
- Regression tests added
- Root cause and prevention note recorded

## 9) Market Viability Requirements

Before merge, each feature must state:

- Target user segment
- User pain solved
- Revenue or conversion mechanism
- Expected support cost impact
- Differentiation against alternatives

If viability is weak, redesign before implementation.

## 10) SaaS Architecture Standards

- Tenant context required on every request path
- Tenant-aware query enforcement at data access layer
- Row-level or schema-level isolation strategy documented
- Idempotent background jobs and retry-safe worker design
- API contracts versioned for external integrations
- Observability: structured logs, metrics, traceable request IDs

## 11) UI/UX Standards

- WCAG AA minimum for key user journeys
- Role-aware navigation and authorization-aware page states
- Consistent design tokens and component usage
- Explicit loading, empty, success, and error states
- Form validation and actionable inline errors
- Screenshot parity required for visual rebuild phases

## 12) Security and Compliance Standards

- Encrypt sensitive data at rest and in transit
- Secure secret storage (no repo hardcoding)
- RBAC for all privileged actions
- Immutable audit logs for sensitive changes
- Rate limiting and abuse prevention at edge/API
- Incident-ready logging with tenant attribution

## 13) BYOT Telephony Constraints (Twilio Connect)

- No storage of raw Twilio credentials
- OAuth/delegated access only
- No platform assumption of downstream telco billing liability
- Tenant-specific telephony permission scopes
- Telephony failures logged with tenant-safe diagnostics

## 14) Multi-Tenant SaaS Constraints

- Never execute cross-tenant reads/writes without explicit admin pathway
- Tenant ID propagation required across API, jobs, logs, and billing
- Tenant usage limits and throttles must be enforceable
- Cross-tenant analytics must use aggregate-safe paths only

## 15) Documentation Requirements

Every major module must include:

- `README` (purpose + usage)
- Architecture note (decisions + tradeoffs)
- API contract (inputs/outputs/errors)
- Setup instructions
- Troubleshooting guide

## 16) Release Readiness Criteria

A release is ready only if:

- Critical flows tested in staging
- Migration/rollback validated
- Monitoring dashboards and alerts updated
- Runbook updated with known risks
- KPI measurement window and owner assigned

## 17) Mandatory Startup Sequence for Reconstruction

1. Collect Base44/OpenAPI/workflow inputs and screenshots
2. Publish architecture plan and multi-tenant boundaries
3. Publish repo scaffold and schema plan
4. Publish feature-by-feature rebuild plan
5. Implement only after architecture approval
