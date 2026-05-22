# Checkpoints and Procedures

This process is mandatory for all contributors.

## CP1: Opportunity Definition

Required outputs:

- Problem statement in one paragraph
- User segment impacted
- Primary KPI and target delta
- Guardrail KPI(s)

Exit criteria:

- Scope fits a single PR or a clearly phased set of PRs.

## CP2: Economic Baseline

Required outputs:

- Current KPI baseline value
- Assumptions and data source
- Estimated upside/downside

Exit criteria:

- Team agrees expected value is meaningful.

## CP3: Solution Design

Required outputs:

- Proposed solution summary
- Alternatives considered and rejected
- Risk list and rollback plan
- Test plan and measurement plan

Exit criteria:

- Reviewer sign-off before coding begins.

## CP4: Build and Validation

Required outputs:

- Code implementation
- Automated tests (or documented reason if not feasible)
- Manual validation notes
- UI screenshots when applicable

Exit criteria:

- Build/lint/test pass and no unresolved high-severity issues.

## CP5: Launch Readiness

Required outputs:

- Release notes (what changed and why)
- Monitoring checks
- Rollback trigger condition
- Owner assigned for post-launch observation

Exit criteria:

- Explicit go/no-go decision documented.

## CP6: Post-Launch Review

Required outputs within the defined observation window:

- KPI outcome vs target
- Guardrail KPI outcome
- Unexpected regressions or gains
- Follow-up actions

Exit criteria:

- Decision to iterate, scale, or revert.

## Standard Operating Procedure

1. Open issue using profitability-focused template.
2. Complete CP1-CP3 before implementation.
3. Implement in small PR(s), complete CP4.
4. Complete CP5 checklist in PR before merge.
5. Publish CP6 summary after launch window.
