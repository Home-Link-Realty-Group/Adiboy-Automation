# Contributing

## Mission

Contributors optimize for sustainable profitability. A contribution is complete
only when it improves a measurable business outcome while maintaining quality.
All contributors must comply with `docs/engineering-constitution.md`.

## Non-Negotiable Rules

1. Define the expected business impact before coding.
2. Use checkpoint gates; do not skip them.
3. Keep changes small, testable, and reversible.
4. Capture evidence (tests, screenshots, metrics notes) in every PR.
5. Prioritize production safety over speed.
6. Enforce multi-tenant isolation and BYOT telephony safety.
7. Document architecture, contracts, and operations for major modules.

## Profitability Priorities

Order work by impact:

1. Revenue growth
2. Conversion improvement
3. Retention improvement
4. Cost reduction
5. Risk reduction

If a task does not map to one of these, it should be re-scoped.

## Required Checkpoints

Use the full procedure in `docs/checkpoints-and-procedures.md`.

- CP1: Opportunity Definition
- CP2: Economic Baseline
- CP3: Solution Design
- CP4: Build + Validation
- CP5: Launch Readiness
- CP6: Post-Launch Review

## Pull Request Requirements

PRs are blocked until they include:

- Problem statement and target KPI(s)
- Baseline and expected delta
- Test evidence
- Screenshot evidence for UI changes
- Rollback plan
- Follow-up measurement plan

## Required Technical Baseline

Unless a justified exception is approved:

- Next.js 15 (App Router)
- TypeScript
- Prisma + PostgreSQL
- NextAuth or equivalent JWT auth
- Tailwind + shadcn/ui
- Stripe billing
- Twilio Connect BYOT model
- Docker + CI/CD (GitHub Actions)

Use `.github/pull_request_template.md`.
