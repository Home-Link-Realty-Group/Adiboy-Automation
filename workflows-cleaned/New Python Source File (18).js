// Six standard wholesaler MAO formulas — used in Settings preview AND on Deal Analysis.
// Pure functions. No UI here.

export const MAO_FORMULA_ORDER = [
  '70_rule', '75_rule', '65_rule', 'fixed_profit', 'all_in_cost', 'cap_rate',
];

export const MAO_FORMULAS = {
  '70_rule': {
    label: '70% Rule',
    short: 'ARV × 0.70 − Repairs − Fee',
    badge: 'CLASSIC',
    badgeColor: '#0B1F45',
    description: 'The industry-standard wholesaler formula. Leaves a 30% margin for the cash buyer.',
    calc: ({ arv, repairs, fee }) => arv * 0.70 - repairs - fee,
  },
  '75_rule': {
    label: '75% Rule',
    short: 'ARV × 0.75 − Repairs − Fee',
    badge: 'HOT MARKET',
    badgeColor: '#16a34a',
    description: 'Slightly more aggressive — works in tight markets where buyers accept thinner margins.',
    calc: ({ arv, repairs, fee }) => arv * 0.75 - repairs - fee,
  },
  '65_rule': {
    label: '65% Rule',
    short: 'ARV × 0.65 − Repairs − Fee',
    badge: 'CONSERVATIVE',
    badgeColor: '#7b2d8b',
    description: 'Conservative — used in soft or declining markets where buyers want a fatter cushion.',
    calc: ({ arv, repairs, fee }) => arv * 0.65 - repairs - fee,
  },
  'fixed_profit': {
    label: 'Fixed Profit',
    short: 'ARV − Repairs − Fee − $25k',
    badge: 'FLIPPER',
    badgeColor: '#d97706',
    description: 'Backs into MAO from a flat dollar profit target ($25k default). Common with rehabbers.',
    calc: ({ arv, repairs, fee }) => arv - repairs - fee - 25000,
  },
  'all_in_cost': {
    label: 'All-In Cost',
    short: 'ARV × 0.70 − Repairs − Fee − Holding',
    badge: 'PRECISE',
    badgeColor: '#0891b2',
    description: 'Same as 70% rule but subtracts holding/closing costs for a tighter true MAO.',
    calc: ({ arv, repairs, fee, monthlyHolding = 600, holdingMonths = 4 }) =>
      arv * 0.70 - repairs - fee - (monthlyHolding * holdingMonths),
  },
  'cap_rate': {
    label: 'Cap Rate (BRRRR)',
    short: 'NOI ÷ Target Cap',
    badge: 'RENTAL',
    badgeColor: '#be185d',
    description: 'For BRRRR/rental buyers. Values the property based on NOI and a target cap rate.',
    calc: ({ arv, monthlyRent = 0, targetCap = 0.08, repairs, fee }) => {
      const noi = (monthlyRent * 12) * 0.55; // ~45% expense ratio
      if (!noi || !targetCap) return arv * 0.70 - repairs - fee; // fallback
      return (noi / targetCap) - repairs - fee;
    },
  },
};

export function calculateAllMAO(inputs) {
  return MAO_FORMULA_ORDER.map(id => {
    const f = MAO_FORMULAS[id];
    let value = 0;
    try { value = f.calc(inputs); } catch { value = 0; }
    return { id, ...f, value: Math.max(0, value) };
  });
}
