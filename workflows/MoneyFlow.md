# MoneyFlow

Source: MoneyFlow.docx

// Money Flow Dashboard — Copilot\-style cash flow \+ burn rate \+ runway \+ category breakdown\.

// Reads BankTransaction \+ BankAccount entities for the user\.

import \{ useState, useEffect, useMemo, useCallback \} from 'react';

import \{ base44 \} from '@/api/base44Client';

import \{ TrendingUp, TrendingDown, AlertTriangle, Calendar, DollarSign, Target \} from 'lucide\-react';

const NAVY = '\#0B1F45';

const GREEN = '\#16a34a';

const RED = '\#dc2626';

const GOLD = '\#D4A843';

function fmt$\(n, opts = \{\}\) \{

  const \{ sign = false \} = opts;

  const v = Math\.abs\(n || 0\);

  const formatted = v\.toLocaleString\(undefined, \{ minimumFractionDigits: 0, maximumFractionDigits: 0 \}\);

  if \(\!sign\) return \`$$\{formatted\}\`;

  return n >= 0 ? \`\+$$\{formatted\}\` : \`\-$$\{formatted\}\`;

\}

function daysAgo\(n\) \{

  const d = new Date\(\);

  d\.setDate\(d\.getDate\(\) \- n\);

  return d\.toISOString\(\)\.split\('T'\)\[0\];

\}

export default function MoneyFlowDashboard\(\{ userEmail, refreshKey = 0 \}\) \{

  const \[txns, setTxns\] = useState\(\[\]\);

  const \[accounts, setAccounts\] = useState\(\[\]\);

  const \[loading, setLoading\] = useState\(true\);

  const \[windowDays, setWindowDays\] = useState\(30\);

  const load = useCallback\(async \(\) => \{

    if \(\!userEmail\) \{ setLoading\(false\); return; \}

    setLoading\(true\);

    try \{

      const \[t, a\] = await Promise\.all\(\[

        base44\.entities\.BankTransaction\.filter\(\{ user\_email: userEmail \}, '\-date', 1000\),

        base44\.entities\.BankAccount\.filter\(\{ user\_email: userEmail \}\),

      \]\);

      setTxns\(t || \[\]\);

      setAccounts\(a || \[\]\);

    \} catch \(e\) \{ console\.error\(e\); \}

    setLoading\(false\);

  \}, \[userEmail\]\);

  useEffect\(\(\) => \{ load\(\); \}, \[load, refreshKey\]\);

  const stats = useMemo\(\(\) => \{

    const cutoff = daysAgo\(windowDays\);

    const inWindow = txns\.filter\(t => t\.date >= cutoff && \!t\.pending\);

    const inflows = inWindow\.filter\(t => t\.direction === 'inflow' && t\.wholesale\_category \!== 'Transfer \(Internal\)'\);

    const outflows = inWindow\.filter\(t => t\.direction === 'outflow' && t\.wholesale\_category \!== 'Transfer \(Internal\)'\);

    const inflowTotal = inflows\.reduce\(\(s, t\) => s \+ Math\.abs\(t\.amount || 0\), 0\);

    const outflowTotal = outflows\.reduce\(\(s, t\) => s \+ Math\.abs\(t\.amount || 0\), 0\);

    const netFlow = inflowTotal \- outflowTotal;

    // Cash on hand \(depository accounts\)

    const cashOnHand = accounts

      \.filter\(a => a\.is\_active && a\.type === 'depository'\)

      \.reduce\(\(s, a\) => s \+ \(a\.current\_balance || 0\), 0\);

    // Burn rate = avg daily outflow over window

    const burnRate = outflowTotal / windowDays;

    const runwayDays = burnRate > 0 ? Math\.floor\(cashOnHand / burnRate\) : null;

    // Category breakdown of outflows

    const catMap = \{\};

    outflows\.forEach\(t => \{

      const cat = t\.wholesale\_category || 'Uncategorized';

      catMap\[cat\] = \(catMap\[cat\] || 0\) \+ Math\.abs\(t\.amount || 0\);

    \}\);

    const topCategories = Object\.entries\(catMap\)\.sort\(\(a, b\) => b\[1\] \- a\[1\]\)\.slice\(0, 8\);

    // Daily flow buckets for sparkline

    const dailyMap = \{\};

    for \(let i = 0; i < windowDays; i\+\+\) \{

      const d = daysAgo\(i\);

      dailyMap\[d\] = \{ date: d, in: 0, out: 0 \};

    \}

    inflows\.forEach\(t => \{ if \(dailyMap\[t\.date\]\) dailyMap\[t\.date\]\.in \+= Math\.abs\(t\.amount\); \}\);

    outflows\.forEach\(t => \{ if \(dailyMap\[t\.date\]\) dailyMap\[t\.date\]\.out \+= Math\.abs\(t\.amount\); \}\);

    const daily = Object\.values\(dailyMap\)\.reverse\(\);

    const maxDaily = Math\.max\(1, \.\.\.daily\.map\(d => Math\.max\(d\.in, d\.out\)\)\);

    return \{ inflowTotal, outflowTotal, netFlow, cashOnHand, burnRate, runwayDays, topCategories, daily, maxDaily, txnCount: inWindow\.length \};

  \}, \[txns, accounts, windowDays\]\);

  if \(loading\) \{

    return \(

      <div style=\{\{ background: '\#fff', border: '1px solid \#e2e8f0', borderRadius: 14, padding: 32, textAlign: 'center', color: '\#64748b' \}\}>

        Loading money flow…

      </div>

    \);

  \}

  if \(txns\.length === 0\) \{

    return \(

      <div style=\{\{ background: '\#f8fafc', border: '2px dashed \#cbd5e1', borderRadius: 14, padding: 40, textAlign: 'center' \}\}>

        <DollarSign size=\{36\} color="\#94a3b8" style=\{\{ margin: '0 auto 12px' \}\} />

        <div style=\{\{ fontWeight: 800, color: '\#334155', fontSize: 16, marginBottom: 6 \}\}>No bank transactions yet</div>

        <div style=\{\{ fontSize: 13, color: '\#64748b' \}\}>Connect a bank above to start seeing your money flow\.</div>

      </div>

    \);

  \}

  const runwayColor = stats\.runwayDays === null ? '\#94a3b8' : stats\.runwayDays < 30 ? RED : stats\.runwayDays < 90 ? '\#f59e0b' : GREEN;

  return \(

    <div style=\{\{ display: 'flex', flexDirection: 'column', gap: 16 \}\}>

      \{/\* Window selector \*/\}

      <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 \}\}>

        <div style=\{\{ fontWeight: 800, fontSize: 16, color: NAVY \}\}>📊 Money Flow — last \{windowDays\} days</div>

        <div style=\{\{ display: 'flex', gap: 4, background: '\#f1f5f9', borderRadius: 8, padding: 3 \}\}>

          \{\[7, 30, 90\]\.map\(d => \(

            <button key=\{d\} onClick=\{\(\) => setWindowDays\(d\)\}

              style=\{\{

                background: windowDays === d ? '\#fff' : 'transparent',

                border: 'none', padding: '6px 12px', borderRadius: 6,

                fontSize: 12, fontWeight: 700, cursor: 'pointer',

                color: windowDays === d ? NAVY : '\#64748b',

                boxShadow: windowDays === d ? '0 1px 3px rgba\(0,0,0,0\.1\)' : 'none',

              \}\}>

              \{d\}d

            </button>

          \)\)\}

        </div>

      </div>

      \{/\* KPI row \*/\}

      <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fit, minmax\(180px, 1fr\)\)', gap: 12 \}\}>

        <KPICard label="Cash on Hand" value=\{fmt$\(stats\.cashOnHand\)\} icon=\{DollarSign\} color=\{NAVY\} bg="\#eff6ff" />

        <KPICard label=\{\`Money In \($\{windowDays\}d\)\`\} value=\{fmt$\(stats\.inflowTotal\)\} icon=\{TrendingUp\} color=\{GREEN\} bg="\#f0fdf4" />

        <KPICard label=\{\`Money Out \($\{windowDays\}d\)\`\} value=\{fmt$\(stats\.outflowTotal\)\} icon=\{TrendingDown\} color=\{RED\} bg="\#fef2f2" />

        <KPICard label="Net Flow" value=\{fmt$\(stats\.netFlow, \{ sign: true \}\)\} icon=\{Target\} color=\{stats\.netFlow >= 0 ? GREEN : RED\} bg=\{stats\.netFlow >= 0 ? '\#f0fdf4' : '\#fef2f2'\} />

      </div>

      \{/\* Burn / Runway alert card \*/\}

      <div style=\{\{

        background: \`linear\-gradient\(135deg, $\{runwayColor\}15, $\{runwayColor\}05\)\`,

        border: \`2px solid $\{runwayColor\}40\`,

        borderRadius: 14, padding: 20,

        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',

      \}\}>

        <div style=\{\{ width: 50, height: 50, borderRadius: 12, background: \`$\{runwayColor\}25\`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 \}\}>

          \{stats\.runwayDays \!== null && stats\.runwayDays < 60 ? <AlertTriangle size=\{24\} color=\{runwayColor\} /> : <Calendar size=\{24\} color=\{runwayColor\} />\}

        </div>

        <div style=\{\{ flex: 1, minWidth: 200 \}\}>

          <div style=\{\{ fontSize: 11, fontWeight: 800, color: runwayColor, letterSpacing: 1, textTransform: 'uppercase' \}\}>Cash Runway</div>

          <div style=\{\{ fontSize: 28, fontWeight: 900, color: NAVY, marginTop: 2 \}\}>

            \{stats\.runwayDays === null ? '∞' : \`$\{stats\.runwayDays\} days\`\}

          </div>

          <div style=\{\{ fontSize: 12, color: '\#64748b', marginTop: 4 \}\}>

            At your current burn of <strong>\{fmt$\(stats\.burnRate\)\}/day</strong>, your cash lasts \{stats\.runwayDays === null ? 'indefinitely' : \`until ~$\{new Date\(Date\.now\(\) \+ stats\.runwayDays \* 86400000\)\.toLocaleDateString\(\)\}\`\}\.

            \{stats\.runwayDays \!== null && stats\.runwayDays < 60 && ' ⚠️ Close a deal soon or cut spend\.'\}

          </div>

        </div>

      </div>

      \{/\* Daily sparkline \*/\}

      <div style=\{\{ background: '\#fff', border: '1px solid \#e2e8f0', borderRadius: 12, padding: 18 \}\}>

        <div style=\{\{ fontWeight: 700, fontSize: 13, color: NAVY, marginBottom: 12 \}\}>Daily Cash Flow</div>

        <div style=\{\{ display: 'flex', gap: 2, alignItems: 'flex\-end', height: 80 \}\}>

          \{stats\.daily\.map\(\(d, i\) => \(

            <div key=\{i\} style=\{\{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, height: '100%', justifyContent: 'flex\-end' \}\} title=\{\`$\{d\.date\}\\nIn: $\{fmt$\(d\.in\)\}\\nOut: $\{fmt$\(d\.out\)\}\`\}>

              <div style=\{\{ background: GREEN, height: \`$\{\(d\.in / stats\.maxDaily\) \* 60\}%\`, minHeight: d\.in > 0 ? 2 : 0, borderRadius: '2px 2px 0 0' \}\} />

              <div style=\{\{ background: RED, height: \`$\{\(d\.out / stats\.maxDaily\) \* 60\}%\`, minHeight: d\.out > 0 ? 2 : 0, borderRadius: '0 0 2px 2px' \}\} />

            </div>

          \)\)\}

        </div>

        <div style=\{\{ display: 'flex', justifyContent: 'space\-between', marginTop: 6, fontSize: 10, color: '\#94a3b8' \}\}>

          <span>\{stats\.daily\[0\]?\.date\}</span>

          <span style=\{\{ display: 'flex', gap: 12 \}\}>

            <span><span style=\{\{ display: 'inline\-block', width: 8, height: 8, background: GREEN, borderRadius: 2, marginRight: 4 \}\} />In</span>

            <span><span style=\{\{ display: 'inline\-block', width: 8, height: 8, background: RED, borderRadius: 2, marginRight: 4 \}\} />Out</span>

          </span>

          <span>\{stats\.daily\[stats\.daily\.length \- 1\]?\.date\}</span>

        </div>

      </div>

      \{/\* Where it went \*/\}

      <div style=\{\{ background: '\#fff', border: '1px solid \#e2e8f0', borderRadius: 12, padding: 18 \}\}>

        <div style=\{\{ fontWeight: 700, fontSize: 13, color: NAVY, marginBottom: 12 \}\}>Where Your Money Went</div>

        \{stats\.topCategories\.length === 0 ? \(

          <div style=\{\{ fontSize: 12, color: '\#94a3b8' \}\}>No outflows in this window\.</div>

        \) : stats\.topCategories\.map\(\(\[cat, amt\]\) => \{

          const pct = stats\.outflowTotal > 0 ? Math\.round\(\(amt / stats\.outflowTotal\) \* 100\) : 0;

          return \(

            <div key=\{cat\} style=\{\{ marginBottom: 10 \}\}>

              <div style=\{\{ display: 'flex', justifyContent: 'space\-between', fontSize: 12, marginBottom: 3 \}\}>

                <span style=\{\{ color: '\#334155', fontWeight: 600 \}\}>\{cat\}</span>

                <span style=\{\{ display: 'flex', gap: 10 \}\}>

                  <span style=\{\{ color: '\#94a3b8', fontSize: 10 \}\}>\{pct\}%</span>

                  <span style=\{\{ fontWeight: 800, color: RED \}\}>\{fmt$\(amt\)\}</span>

                </span>

              </div>

              <div style=\{\{ height: 6, background: '\#f1f5f9', borderRadius: 3, overflow: 'hidden' \}\}>

                <div style=\{\{ width: \`$\{pct\}%\`, height: '100%', background: \`linear\-gradient\(90deg, $\{RED\}, $\{RED\}aa\)\`, borderRadius: 3 \}\} />

              </div>

            </div>

          \);

        \}\)\}

      </div>

      <div style=\{\{ fontSize: 11, color: '\#94a3b8', textAlign: 'center', padding: '6px 0' \}\}>

        \{stats\.txnCount\} transactions in window · AI\-categorized into wholesaler buckets

      </div>

    </div>

  \);

\}

function KPICard\(\{ label, value, icon: Icon, color, bg \}\) \{

  return \(

    <div style=\{\{ background: bg, border: '1px solid \#e2e8f0', borderRadius: 12, padding: 16 \}\}>

      <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'flex\-start' \}\}>

        <div style=\{\{ fontSize: 10, fontWeight: 800, color, letterSpacing: 1, textTransform: 'uppercase' \}\}>\{label\}</div>

        <Icon size=\{16\} color=\{color\} />

      </div>

      <div style=\{\{ fontSize: 22, fontWeight: 900, color: NAVY, marginTop: 6 \}\}>\{value\}</div>

    </div>

  \);

\}
