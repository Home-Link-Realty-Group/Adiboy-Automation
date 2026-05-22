# Single-Workspace Execution Protocol Checklist

Use this checklist before, during, and after every implementation cycle.
All contributors and agents must follow it.

## 1) Workspace Lock (Mandatory First Step)

- [ ] Open `START_HERE.md`
- [ ] Confirm work is scoped to `Home-Link-Realty-Group/Wholesaler-Pro` only
- [ ] Confirm the active workspace file is
      `Home-Link-SaaS-Reconstruction.code-workspace`
- [ ] Confirm task maps to a backlog ID in `docs/reconstruction-backlog.md`
- [ ] Confirm status aligns with `docs/reconstruction-source-of-truth.md`
- [ ] Reject or park any request that depends on off-repo-only claims

## 2) Intake Gate (CP1-CP3)

- [ ] Problem statement defined in one paragraph
- [ ] Primary KPI + guardrail KPI selected
- [ ] Baseline and expected delta documented
- [ ] Architecture/design note prepared
- [ ] Risks and rollback plan captured
- [ ] Reviewer sign-off recorded before coding

## 3) Implementation Gate (CP4)

- [ ] Implementation is in small reversible increments
- [ ] Multi-tenant boundaries are enforced in the design
- [ ] Security constraints (RBAC, secrets, auditability) are addressed
- [ ] Automated tests added, or waiver documented with reason
- [ ] Manual validation notes captured
- [ ] UI screenshots captured when applicable

## 4) Launch Gate (CP5)

- [ ] Release notes documented
- [ ] Monitoring checks and alert conditions defined
- [ ] Rollback trigger and owner documented
- [ ] Go/No-Go decision explicitly recorded

## 5) Post-Launch Gate (CP6)

- [ ] KPI results measured in observation window
- [ ] Guardrail metrics reviewed
- [ ] Unexpected regressions documented
- [ ] Iterate/scale/revert decision recorded

## 6) Handoff Protocol (Any Agent/Human Transition)

- [ ] Context summary (what changed and why)
- [ ] Current status (`done`, `in_progress`, `blocked`)
- [ ] Risks and assumptions
- [ ] Exact next actions with owner
- [ ] Evidence links (tests, screenshots, logs, PR)

## 7) Daily/Weekly Cadence

### Daily

- [ ] Update active backlog item statuses
- [ ] Check latest daily snapshot issue
- [ ] Record blockers with owner and unblock plan

### Weekly

- [ ] Reconcile completed work against profitability goals
- [ ] Re-rank backlog based on impact/confidence/effort/risk
- [ ] Confirm no off-repo drift occurred

## 8) Off-Repo Drift Response

If a claim appears from outside this repository:

1. Mark as `unverified`.
2. Re-validate against files in this repo.
3. If valid, record it in source-of-truth doc or backlog.
4. If invalid, keep it out of implementation and log as rejected context.

## 9) Task Start Template

Use this text block at the top of each new implementation session:

```text
Backlog ID: <Bxx>
Primary KPI: <name + target delta>
Guardrail KPI: <name + threshold>
Dependencies cleared: <yes/no>
Rollback trigger: <condition>
Evidence required: <tests/screenshots/logs>
```
