# Profitability Framework

## Objective

Ensure every code contribution has a clear path to higher profitability through
revenue growth, conversion lift, retention gains, lower operating costs, or
risk reduction.

## Decision Model

Score opportunities before implementation:

- Impact (1-5): expected contribution to revenue/margin
- Confidence (1-5): certainty based on data/evidence
- Effort (1-5): delivery and operational cost
- Risk (1-5): probability and severity of regressions

Recommended priority score:

`priority = (impact * confidence) / (effort + risk)`

## KPI Categories

Each contribution must select at least one primary KPI and one guardrail KPI.

Primary KPI examples:

- Lead conversion rate
- Offer request completion rate
- Qualified lead volume
- Seller portal activation rate
- Cost per lead

Guardrail KPI examples:

- Error rate
- Page load time
- Bounce rate
- Support/contact burden
- Failed automations/jobs

## Definition of Profitability-Aligned Change

A change is profitability-aligned when all are true:

1. KPI target exists.
2. Baseline exists.
3. Validation method exists.
4. Rollback threshold exists.
5. Post-launch measurement window exists.

## Risk Controls

- Ship behind staged rollout where possible.
- Prefer additive changes over destructive refactors.
- Keep migrations reversible.
- Define a stop-loss condition (when to roll back).

## Contributor Accountability

Contributors own:

- Business hypothesis quality
- Implementation correctness
- Evidence quality in PR
- Post-launch KPI readout
