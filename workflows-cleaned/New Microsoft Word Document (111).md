# New Microsoft Word Document (111)

Source: New Microsoft Word Document (111).docx

import { TrendingUp, Sparkles } from 'lucide-react';

import SectionCard from '../SectionCard';

import SettingRow from '../SettingRow';

import Toggle from '../Toggle';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const ACCENT = '#10b981';

const inputSty = { width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', fontFamily: 'inherit' };

export default function ARVAnalysisSection({ prefs, onChange, onSave, saving }) {

  // Live preview — confidence score using current settings

  const confidenceDemo = calcDemoConfidence(prefs);

  return (

    <SectionCard

      icon={TrendingUp}

      accent={ACCENT}

      tint="#d1fae5"

      title="ARV Analysis"

      description="How comps are pulled, filtered, and weighted to estimate After-Repair Value"

    >

      {/* ── LIVE CONFIDENCE PREVIEW ── */}

      <div style={{

        background: `linear-gradient(135deg, ${ACCENT}11, ${NAVY}08)`,

        border: `1.5px solid ${ACCENT}33`,

        borderRadius: 12, padding: 14, marginBottom: 18,

        display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',

      }}>

        <div style={{

          width: 56, height: 56, borderRadius: '50%',

          background: `conic-gradient(${confidenceDemo.color} ${confidenceDemo.score * 3.6}deg, #e2e8f0 0)`,

          display: 'flex', alignItems: 'center', justifyContent: 'center',

          flexShrink: 0,

        }}>

          <div style={{

            width: 44, height: 44, borderRadius: '50%', background: '#fff',

            display: 'flex', alignItems: 'center', justifyContent: 'center',

            fontWeight: 900, color: confidenceDemo.color, fontSize: 14,

          }}>

            {confidenceDemo.score}

          </div>

        </div>

        <div style={{ flex: 1, minWidth: 0 }}>

          <div style={{ fontSize: 11, fontWeight: 800, color: ACCENT, letterSpacing: 0.5, textTransform: 'uppercase' }}>

            <Sparkles size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />

            Live ARV Confidence — based on your current rules

          </div>

          <div style={{ fontSize: 13, color: NAVY, fontWeight: 700, marginTop: 2 }}>

            {confidenceDemo.label}

          </div>

          <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>

            {confidenceDemo.tip}

          </div>

        </div>

      </div>

      {/* ── DATA SOURCE ── */}

      <SettingRow title="Default Comp Data Source" description="Where to pull sold comparables from"

        why="MLS is the gold standard (real closing prices) but requires agent access. Rentcast is the best non-MLS option — pulls from county records + multiple syndicators. Zillow Zestimates are estimates, not sales — never trust them as primary comps.">

        <select value={prefs.arv_default_data_source} onChange={e => onChange({ arv_default_data_source: e.target.value })} style={inputSty}>

          <option value="rentcast">Rentcast API (recommended)</option>

          <option value="mls">MLS (agent access required)</option>

          <option value="zillow">Zillow / Public sources</option>

          <option value="manual">Manual entry only</option>

        </select>

      </SettingRow>

      <SettingRow title="Auto-Pull Comps on Deal Open" description="Fetch comparables automatically when you start a new analysis"

        why="Saves 3-5 minutes per deal. Turn OFF only if you're on a metered API plan or working in a market where automated comps are unreliable (rural, niche property types).">

        <Toggle value={prefs.arv_auto_pull_comps} onChange={v => onChange({ arv_auto_pull_comps: v })} />

      </SettingRow>

      {/* ── COMP RECENCY & COUNT ── */}

      <SettingRow title="Max Comp Age (months)" description="Don't use sales older than this" badge="CRITICAL" badgeColor={ACCENT}

        why="6 months is the appraiser standard. In appreciating markets, anything older than 6 months understates ARV. In stable markets you can stretch to 9-12 months. Never use 12+ month comps in fast-moving markets — your ARV will be 5-15% too low.">

        <select value={prefs.arv_max_comp_age_months} onChange={e => onChange({ arv_max_comp_age_months: parseInt(e.target.value) })} style={inputSty}>

          <option value={3}>3 months — Hot market</option>

          <option value={6}>6 months — Standard (appraiser default)</option>

          <option value={9}>9 months — Stable market</option>

          <option value={12}>12 months — Rural / Slow market</option>

        </select>

      </SettingRow>

      <SettingRow title="Minimum Comps Required" description="Refuse to estimate ARV with fewer than this many sold comps"

        why="Below 3 comps, your ARV is essentially a guess — one outlier swings the entire estimate. Cash buyers and lenders both reject deals supported by fewer than 3 comps.">

        <select value={prefs.arv_min_comps_required} onChange={e => onChange({ arv_min_comps_required: parseInt(e.target.value) })} style={inputSty}>

          <option value={2}>2 comps (high risk)</option>

          <option value={3}>3 comps — Lender minimum</option>

          <option value={4}>4 comps</option>

          <option value={5}>5 comps — Conservative</option>

        </select>

      </SettingRow>

      <SettingRow title="Max Comps Used in Average" description="Cap the comp set so distant outliers don't drag the estimate"

        why="More comps ≠ better. Using 10+ comps almost always means you're reaching into different sub-markets and tanking accuracy. 4-6 tight comps beat 12 loose ones every time.">

        <select value={prefs.arv_max_comps_used} onChange={e => onChange({ arv_max_comps_used: parseInt(e.target.value) })} style={inputSty}>

          <option value={4}>4 comps — Tight</option>

          <option value={6}>6 comps — Standard</option>

          <option value={8}>8 comps</option>

          <option value={10}>10 comps — Wide</option>

        </select>

      </SettingRow>

      {/* ── SIMILARITY FILTERS ── */}

      <SettingRow title="Square Footage Variance" description="Only pull comps within ± this % of the subject property"

        why="±20% is the appraiser standard. Tighten to ±10% in tract neighborhoods (cookie-cutter homes); widen to ±25% only in custom-build areas. Beyond ±25% you're comparing fundamentally different properties.">

        <select value={prefs.arv_sqft_variance_pct} onChange={e => onChange({ arv_sqft_variance_pct: parseInt(e.target.value) })} style={inputSty}>

          <option value={10}>±10% — Tract / Cookie-cutter</option>

          <option value={15}>±15% — Tight</option>

          <option value={20}>±20% — Standard (appraiser default)</option>

          <option value={25}>±25% — Custom builds</option>

        </select>

      </SettingRow>

      <SettingRow title="Bedroom Variance" description="Allowed +/- bedroom count from subject"

        why="Each bedroom typically adds 5-10% to value. ±1 is safe with sqft adjustments; ±0 (exact match) is best for low-priced homes where bed count drives value more than sqft.">

        <select value={prefs.arv_beds_variance} onChange={e => onChange({ arv_beds_variance: parseInt(e.target.value) })} style={inputSty}>

          <option value={0}>Exact match only</option>

          <option value={1}>±1 bedroom — Standard</option>

          <option value={2}>±2 bedrooms — Loose</option>

        </select>

      </SettingRow>

      <SettingRow title="Bathroom Variance" description="Allowed +/- bathroom count"

        why="Half-baths and full-baths affect value differently. ±1 is the standard but always manually verify when comparing 1-bath subjects against 2-bath comps — bath count is one of the biggest value drivers under $250K.">

        <select value={prefs.arv_baths_variance} onChange={e => onChange({ arv_baths_variance: parseInt(e.target.value) })} style={inputSty}>

          <option value={0}>Exact match only</option>

          <option value={1}>±1 bath — Standard</option>

          <option value={2}>±2 baths — Loose</option>

        </select>

      </SettingRow>

      <SettingRow title="Year-Built Variance" description="Don't compare a 1950 house to a 2010 build"

        why="Building era controls layout, materials, and buyer expectations. ±15 years keeps you within the same generation of construction. Mixing 1960s ranches with 2000s open-concept homes is a top reason wholesalers blow ARV estimates.">

        <select value={prefs.arv_year_built_variance} onChange={e => onChange({ arv_year_built_variance: parseInt(e.target.value) })} style={inputSty}>

          <option value={10}>±10 years — Tight</option>

          <option value={15}>±15 years — Standard</option>

          <option value={20}>±20 years</option>

          <option value={30}>±30 years — Loose</option>

        </select>

      </SettingRow>

      {/* ── BOUNDARY RULES ── */}

      <SettingRow title="Same School Zone" description="Restrict comps to the subject property's school attendance zone" badge="HIGH IMPACT" badgeColor={ACCENT}

        why="School boundaries are the #1 invisible value cliff in residential real estate — two identical houses 500 feet apart can sell for 15-25% different prices because of school zones. Always ON unless the market is non-family (urban condos, retirement areas).">

        <Toggle value={prefs.arv_same_school_zone} onChange={v => onChange({ arv_same_school_zone: v })} />

      </SettingRow>

      <SettingRow title="Same Subdivision Only" description="Only pull comps from inside the subject's subdivision"

        why="In tract neighborhoods (Pulte, Lennar, KB Home), this rule produces near-perfect comps. In older patchwork urban neighborhoods, it eliminates too many valid comps — leave OFF.">

        <Toggle value={prefs.arv_same_subdivision_only} onChange={v => onChange({ arv_same_subdivision_only: v })} />

      </SettingRow>

      {/* ── EXCLUSIONS ── */}

      <SettingRow title="Exclude Distressed Sales" description="Skip REO, auction, and as-is bank sales" badge="RECOMMENDED" badgeColor="#16a34a"

        why="Distressed sales close 15-30% under retail. Including them pulls your ARV down and you'll offer too low — losing every deal. Exclude unless you're explicitly trying to estimate auction value.">

        <Toggle value={prefs.arv_exclude_distressed_sales} onChange={v => onChange({ arv_exclude_distressed_sales: v })} />

      </SettingRow>

      <SettingRow title="Exclude Short Sales" description="Skip lender-approved short sales (sold below mortgage balance)"

        why="Short sales close 10-20% under retail and have 60-120 day timelines that distort 'recent sale' assumptions. Exclude unless you're wholesaling specifically to short-sale buyers.">

        <Toggle value={prefs.arv_exclude_short_sales} onChange={v => onChange({ arv_exclude_short_sales: v })} />

      </SettingRow>

      <SettingRow title="Exclude Foreclosure Sales" description="Skip courthouse auction and trustee sales"

        why="Trustee sales are wholesale-to-wholesale prices, not retail. Including them is the fastest way to a 20%+ ARV miss. ALWAYS keep this ON unless the entire market trades at trustee prices (rare, mostly Detroit/Cleveland tier-3 zips).">

        <Toggle value={prefs.arv_exclude_foreclosures} onChange={v => onChange({ arv_exclude_foreclosures: v })} />

      </SettingRow>

      {/* ── WEIGHTING METHOD ── */}

      <SettingRow title="Comp Weighting Method" description="How comps are combined into a single ARV estimate"

        why="Simple Average is fast but treats a 6-month-old comp 2 miles away the same as a 1-month comp next door. Recency + Distance weighting auto-emphasizes the closest, freshest sales. Strict Match (recommended) enforces the tightest investor-grade rules — the same method top wholesalers use to defend offers to cash buyers.">

        <select value={prefs.arv_weight_method} onChange={e => onChange({ arv_weight_method: e.target.value })} style={inputSty}>

          <option value="strict_match">🎯 Strict Match — Top 3-5 closest comps (recommended)</option>

          <option value="zip_psf_renovated">📍 ZIP $/sqft (Renovated Sales) × Subject SqFt</option>

          <option value="public_estimate_avg">🌐 Public Estimate Avg — Zillow + Redfin + Realtor ÷ 3</option>

          <option value="recency_distance">Recency + Distance Weighted</option>

          <option value="sqft_adjusted">$/sqft Adjusted</option>

          <option value="simple_avg">Simple Average</option>

          <option value="manual">Manual — I'll pick comp weights per deal</option>

        </select>

      </SettingRow>

      {prefs.arv_weight_method === 'public_estimate_avg' && (

        <div style={{

          margin: '4px 0 8px',

          background: 'linear-gradient(135deg, #0891b210, #0891b204)',

          border: '1.5px solid #0891b255',

          borderRadius: 12,

          padding: '14px 16px',

        }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>

            <Sparkles size={14} color="#0891b2" />

            <div style={{ fontSize: 12, fontWeight: 800, color: '#0891b2', letterSpacing: 0.5, textTransform: 'uppercase' }}>

              Public Estimate Average — How It Works

            </div>

          </div>

          <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.7 }}>

            <ol style={{ margin: 0, paddingLeft: 18 }}>

              <li>Pull <strong style={{ color: NAVY }}>Zillow Zestimate</strong> for the subject address</li>

              <li>Pull <strong style={{ color: NAVY }}>Redfin Estimated Value</strong> for the subject address</li>

              <li>Pull <strong style={{ color: NAVY }}>Realtor.com Estimated Value</strong> for the subject address</li>

              <li>Average all three: <strong style={{ color: NAVY }}>(Z + R + Rd) ÷ 3 = ARV</strong></li>

            </ol>

            <div style={{ marginTop: 10, padding: '10px 12px', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}>

              <div style={{ fontWeight: 800, color: NAVY, marginBottom: 4 }}>📊 Example:</div>

              <div style={{ fontFamily: 'monospace', color: '#475569' }}>

                Zillow: <strong style={{ color: '#0891b2' }}>$245,000</strong><br />

                Redfin: <strong style={{ color: '#0891b2' }}>$238,500</strong><br />

                Realtor: <strong style={{ color: '#0891b2' }}>$251,200</strong><br />

                ARV = ($245,000 + $238,500 + $251,200) ÷ 3 = <strong style={{ color: NAVY, fontSize: 13 }}>$244,900</strong>

              </div>

            </div>

            <div style={{ marginTop: 10, fontSize: 11.5, color: '#64748b' }}>

              <strong style={{ color: '#dc2626' }}>Best used as:</strong> A quick sanity check or pre-call screening tool. <strong style={{ color: '#dc2626' }}>Avoid as primary ARV:</strong> AVMs are based on tax records and can be 10-20% off in distressed neighborhoods or after recent renovations. Always verify with sold comps before sending an offer.

            </div>

          </div>

        </div>

      )}

      {prefs.arv_weight_method === 'zip_psf_renovated' && (

        <div style={{

          margin: '4px 0 8px',

          background: 'linear-gradient(135deg, #8b5cf610, #8b5cf604)',

          border: '1.5px solid #8b5cf655',

          borderRadius: 12,

          padding: '14px 16px',

        }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>

            <Sparkles size={14} color="#8b5cf6" />

            <div style={{ fontSize: 12, fontWeight: 800, color: '#8b5cf6', letterSpacing: 0.5, textTransform: 'uppercase' }}>

              ZIP $/SqFt Method — How It Works

            </div>

          </div>

          <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.7 }}>

            <ol style={{ margin: 0, paddingLeft: 18 }}>

              <li>Pull all <strong style={{ color: NAVY }}>renovated sales</strong> in the subject's ZIP code</li>

              <li>Filter to <strong style={{ color: NAVY }}>recent sales</strong> (within your max comp age)</li>

              <li>Calculate the <strong style={{ color: NAVY }}>average $/sqft</strong> across those sales</li>

              <li>Multiply by <strong style={{ color: NAVY }}>subject property's square footage</strong> = ARV</li>

            </ol>

            <div style={{ marginTop: 10, padding: '10px 12px', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}>

              <div style={{ fontWeight: 800, color: NAVY, marginBottom: 4 }}>📊 Example:</div>

              <div style={{ fontFamily: 'monospace', color: '#475569' }}>

                ZIP 75216 renovated avg: <strong style={{ color: '#8b5cf6' }}>$165/sqft</strong><br />

                Subject: <strong style={{ color: '#8b5cf6' }}>1,450 sqft</strong><br />

                ARV = $165 × 1,450 = <strong style={{ color: NAVY, fontSize: 13 }}>$239,250</strong>

              </div>

            </div>

            <div style={{ marginTop: 10, fontSize: 11.5, color: '#64748b' }}>

              <strong style={{ color: '#dc2626' }}>Best used when:</strong> ZIP is uniform (similar housing stock). <strong style={{ color: '#dc2626' }}>Avoid when:</strong> ZIP spans wildly different neighborhoods (waterfront + inland, school-zone splits).

            </div>

          </div>

        </div>

      )}

      {prefs.arv_weight_method === 'strict_match' && (

        <div style={{

          margin: '4px 0 8px',

          background: `linear-gradient(135deg, ${ACCENT}10, ${ACCENT}04)`,

          border: `1.5px solid ${ACCENT}55`,

          borderRadius: 12,

          padding: '14px 16px',

        }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>

            <Sparkles size={14} color={ACCENT} />

            <div style={{ fontSize: 12, fontWeight: 800, color: ACCENT, letterSpacing: 0.5, textTransform: 'uppercase' }}>

              Strict Match Rules — Auto-Enforced

            </div>

          </div>

          <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.7 }}>

            <ul style={{ margin: 0, paddingLeft: 18 }}>

              <li><strong style={{ color: NAVY }}>Top 3–5 most recent</strong> sold comparables only</li>

              <li>Sold within <strong style={{ color: NAVY }}>last 3–6 months</strong></li>

              <li>Within <strong style={{ color: NAVY }}>0.5 miles</strong> of subject property</li>

              <li><strong style={{ color: NAVY }}>±10% square footage</strong> tolerance</li>

              <li><strong style={{ color: NAVY }}>Exact bedroom & bathroom match</strong> required</li>

              <li><strong style={{ color: NAVY }}>Renovation recency</strong> factored into adjustment</li>

              <li>Ranked by overall similarity to target property</li>

            </ul>

            <div style={{ marginTop: 10, padding: '8px 10px', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 11.5 }}>

              <strong style={{ color: NAVY }}>Why this works:</strong> This is the same comp methodology hard-money lenders, appraisers, and institutional cash buyers use. ARVs built this way get accepted on the first pass — no haggling.

            </div>

          </div>

        </div>

      )}

      <SettingRow title="Show $/sqft on Comps" description="Display price-per-square-foot alongside each comp"

        why="The single best sanity check on a comp set. If your comps range from $115/sqft to $185/sqft, something's wrong — either the comps are mismatched or the neighborhood has a hidden value boundary you missed.">

        <Toggle value={prefs.arv_show_price_per_sqft} onChange={v => onChange({ arv_show_price_per_sqft: v })} />

      </SettingRow>

      <SettingRow title="Adjust for Condition" description="Auto-discount comps in better condition than the subject"

        why="A subject in 'fair' condition shouldn't be valued against renovated comps without adjustment. The standard adjustment is 5-15% per condition tier difference. Turn OFF only if you're manually adjusting in spreadsheets.">

        <Toggle value={prefs.arv_adjust_for_condition} onChange={v => onChange({ arv_adjust_for_condition: v })} />

      </SettingRow>

      {/* ── CONFIDENCE THRESHOLD ── */}

      {/* ── ALL FORMULAS REFERENCE GUIDE ── */}

      <div style={{

        margin: '20px 0 14px',

        background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a7a 100%)`,

        borderRadius: 14,

        padding: '20px 22px',

        color: '#fff',

        position: 'relative',

        overflow: 'hidden',

      }}>

        <div aria-hidden="true" style={{

          position: 'absolute', top: -30, right: -30, width: 120, height: 120,

          borderRadius: '50%', background: `${ACCENT}33`, filter: 'blur(30px)',

        }} />

        <div style={{ position: 'relative' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>

            <Sparkles size={16} color={GOLD} />

            <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: 0.5, color: '#fff' }}>

              📚 ALL ARV FORMULAS — DETAILED REFERENCE

            </div>

          </div>

          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>

            Every comp weighting method explained — pick the right one for each deal type.

          </div>

          <div style={{ display: 'grid', gap: 10 }}>

            {FORMULA_GUIDE.map(f => (

              <div key={f.id} style={{

                background: 'rgba(255,255,255,0.06)',

                border: `1px solid ${prefs.arv_weight_method === f.id ? f.color : 'rgba(255,255,255,0.1)'}`,

                borderRadius: 10,

                padding: '14px 16px',

                position: 'relative',

              }}>

                {prefs.arv_weight_method === f.id && (

                  <div style={{

                    position: 'absolute', top: 10, right: 12,

                    background: f.color, color: '#fff',

                    fontSize: 9, fontWeight: 900, letterSpacing: 1,

                    padding: '3px 8px', borderRadius: 4,

                  }}>ACTIVE</div>

                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>

                  <span style={{ fontSize: 16 }}>{f.emoji}</span>

                  <div style={{ fontWeight: 800, fontSize: 13.5, color: f.color }}>{f.name}</div>

                </div>

                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 8 }}>

                  {f.description}

                </div>

                <div style={{ fontSize: 11, fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: 6, color: '#fff', marginBottom: 6 }}>

                  {f.formula}

                </div>

                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>

                  <div><strong style={{ color: '#86efac' }}>✓ Best for:</strong> {f.bestFor}</div>

                  <div><strong style={{ color: '#fca5a5' }}>✗ Avoid when:</strong> {f.avoidWhen}</div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      <SettingRow title="Confidence Warning Threshold" description="Show a 'low confidence' warning when the comp set scores below this"

        why="ARV confidence scores combine comp count, recency, similarity, and price spread. Below 75%, the estimate is too risky to base offers on without manual review. Below 60%, walk away or get drive-by photos.">

        <select value={prefs.arv_confidence_threshold} onChange={e => onChange({ arv_confidence_threshold: parseInt(e.target.value) })} style={inputSty}>

          <option value={60}>60% — Warn only on bad comp sets</option>

          <option value={75}>75% — Standard (recommended)</option>

          <option value={85}>85% — Conservative</option>

          <option value={90}>90% — Only trust near-perfect comps</option>

        </select>

      </SettingRow>

      <SaveBar saving={saving} onSave={onSave} />

    </SectionCard>

  );

}

// ── Detailed reference for every ARV weighting method ──

const FORMULA_GUIDE = [

  {

    id: 'strict_match',

    emoji: '🎯',

    name: 'Strict Match',

    color: '#10b981',

    description: 'The institutional-grade method. Pulls the top 3-5 most recent sold comps within 0.5 miles, sold in the last 3-6 months, with ±10% sqft tolerance, EXACT bedroom/bathroom match, factoring in renovation recency, ranked by overall similarity to the target property.',

    formula: 'Avg sale price of top 3-5 strictly-matched comps = ARV',

    bestFor: 'Defensible offers, lender-grade ARVs, cash buyer presentations',

    avoidWhen: 'Rural areas where strict matches are impossible',

  },

  {

    id: 'zip_psf_renovated',

    emoji: '📍',

    name: 'ZIP $/SqFt (Renovated Sales) × Subject SqFt',

    color: '#a78bfa',

    description: 'Calculates the average price-per-square-foot of recently-renovated sold properties in the subject\'s ZIP code, then multiplies that figure by the target property\'s square footage to produce ARV.',

    formula: 'ZIP renovated avg $/sqft × Subject SqFt = ARV',

    bestFor: 'Uniform ZIP codes (similar housing stock), tract neighborhoods',

    avoidWhen: 'ZIPs spanning waterfront/inland or major school-zone splits',

  },

  {

    id: 'public_estimate_avg',

    emoji: '🌐',

    name: 'Public Estimate Average',

    color: '#22d3ee',

    description: 'Pulls the AVM (automated valuation model) estimates from Zillow Zestimate, Redfin Estimated Value, and Realtor.com Estimated Value, then averages all three to produce a single ARV figure. Fast and requires no comp pulling.',

    formula: '(Zillow + Redfin + Realtor.com) ÷ 3 = ARV',

    bestFor: 'Pre-call screening, rapid lead triage, sanity checks',

    avoidWhen: 'Final offers — AVMs miss recent renovations and distress 10-20%',

  },

  {

    id: 'recency_distance',

    emoji: '⚖️',

    name: 'Recency + Distance Weighted',

    color: '#fbbf24',

    description: 'Pulls all qualifying comps then weights each one by how recent the sale was AND how close it is to the subject. A 1-month-old comp 2 blocks away gets ~5× more weight than a 6-month-old comp half a mile away.',

    formula: 'Σ(comp_price × recency_weight × distance_weight) ÷ Σ(weights) = ARV',

    bestFor: 'Markets with rapidly-moving prices or mixed neighborhoods',

    avoidWhen: 'Stable markets where simple averages work just as well',

  },

  {

    id: 'sqft_adjusted',

    emoji: '📏',

    name: '$/SqFt Adjusted',

    color: '#f472b6',

    description: 'Converts every comp to its price-per-sqft, averages those values, then multiplies by the subject\'s sqft. Normalizes for size differences across the comp set — useful when comps have larger sqft variance than ideal.',

    formula: 'Avg($/sqft of all comps) × Subject SqFt = ARV',

    bestFor: 'Comp sets with size variance (custom builds, mixed lots)',

    avoidWhen: 'Tract neighborhoods where $/sqft varies wildly by floor plan',

  },

  {

    id: 'simple_avg',

    emoji: '➗',

    name: 'Simple Average',

    color: '#94a3b8',

    description: 'Adds up the sale prices of all qualifying comps and divides by the number of comps. No adjustments, no weighting — every comp counts equally regardless of distance, recency, or similarity.',

    formula: 'Σ(comp prices) ÷ Number of comps = ARV',

    bestFor: 'Quick estimates, very tight comp sets where comps are nearly identical',

    avoidWhen: 'Diverse comp sets — outliers will skew the result heavily',

  },

  {

    id: 'manual',

    emoji: '✋',

    name: 'Manual',

    color: '#cbd5e1',

    description: 'Disables all automatic weighting. Pulls the comp set but lets YOU pick which comps to include and assign each one a custom weight (e.g. 50% / 30% / 20%) based on your knowledge of the local market.',

    formula: 'Σ(comp_price × your_custom_weight) = ARV',

    bestFor: 'Experienced wholesalers in markets they know intimately',

    avoidWhen: 'New markets — your gut weights will be wrong without local rep',

  },

];

// Live confidence demo — reflects current settings stringency

function calcDemoConfidence(p) {

  let score = 50;

  // Recency stringency (tighter = higher confidence)

  if (p.arv_max_comp_age_months <= 3) score += 14;

  else if (p.arv_max_comp_age_months <= 6) score += 10;

  else if (p.arv_max_comp_age_months <= 9) score += 5;

  // Min comps

  if (p.arv_min_comps_required >= 5) score += 8;

  else if (p.arv_min_comps_required >= 4) score += 6;

  else if (p.arv_min_comps_required >= 3) score += 4;

  // Sqft variance

  if (p.arv_sqft_variance_pct <= 10) score += 8;

  else if (p.arv_sqft_variance_pct <= 15) score += 6;

  else if (p.arv_sqft_variance_pct <= 20) score += 4;

  // School zone

  if (p.arv_same_school_zone) score += 6;

  // Distressed exclusions

  if (p.arv_exclude_distressed_sales) score += 4;

  if (p.arv_exclude_foreclosures) score += 4;

  if (p.arv_exclude_short_sales) score += 2;

  // Weighting

  if (p.arv_weight_method === 'strict_match') score += 8;

  else if (p.arv_weight_method === 'recency_distance' || p.arv_weight_method === 'sqft_adjusted') score += 4;

  else if (p.arv_weight_method === 'zip_psf_renovated') score += 3;

  else if (p.arv_weight_method === 'public_estimate_avg') score -= 4;

  // Condition adjustment

  if (p.arv_adjust_for_condition) score += 3;

  score = Math.min(99, Math.max(20, score));

  let color, label, tip;

  if (score >= 85) {

    color = '#16a34a';

    label = 'Tight, conservative comp rules — institutional-grade ARVs';

    tip = 'Expect to reject more comp sets but every offer you make will be defensible.';

  } else if (score >= 70) {

    color = '#10b981';

    label = 'Solid balance — recommended for most wholesalers';

    tip = 'Catches most bad comps without filtering out too many valid ones.';

  } else if (score >= 55) {

    color = '#f59e0b';

    label = 'Loose — faster but more variance per estimate';

    tip = 'Good for high-volume scouting; tighten before sending offers.';

  } else {

    color = '#dc2626';

    label = 'Very loose — high risk of mispriced offers';

    tip = 'Tighten comp age, sqft variance, or enable distressed exclusions.';

  }

  return { score, color, label, tip };

}

function SaveBar({ saving, onSave }) {

  return (

    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>

      <button onClick={onSave} disabled={saving}

        style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 800, fontSize: 13, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>

        {saving ? 'Saving…' : 'Save ARV Settings'}

      </button>

    </div>

  );

}
