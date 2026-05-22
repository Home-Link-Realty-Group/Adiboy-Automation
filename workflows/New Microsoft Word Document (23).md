# New Microsoft Word Document (23)

Source: New Microsoft Word Document (23).docx

import \{ useState, useEffect \} from 'react';

import \{ base44 \} from '@/api/base44Client';

const NAVY = "\#0B1F45";

const GOLD = "\#D4A843";

const HOTNESS\_COLORS = \{

  'FIRE': \{ bg: '\#fef2f2', border: '\#dc2626', text: '\#dc2626', icon: '🔥', label: 'FIRE' \},

  'HOT': \{ bg: '\#fff7ed', border: '\#f59e0b', text: '\#f59e0b', icon: '🌡️', label: 'HOT' \},

  'WARM': \{ bg: '\#fef3c7', border: '\#eab308', text: '\#b45309', icon: '⚡', label: 'WARM' \},

  'COOL': \{ bg: '\#f0f9ff', border: '\#0284c7', text: '\#0284c7', icon: '❄️', label: 'COOL' \},

\};

const PRIORITY\_ORDER = \{ 'CALL\_NOW': 0, 'TODAY': 1, 'THIS\_WEEK': 2, 'MONITOR': 3 \};

export default function AILeadHotnessScorer\(\{ leads = \[\] \}\) \{

  const \[loading, setLoading\] = useState\(false\);

  const \[scoredLeads, setScoredLeads\] = useState\(\[\]\);

  const \[summary, setSummary\] = useState\(''\);

  const \[error, setError\] = useState\(null\);

  const \[expandedLead, setExpandedLead\] = useState\(null\);

  useEffect\(\(\) => \{

    if \(leads\.length > 0\) \{

      scoreLeads\(\);

    \}

  \}, \[leads\]\);

  async function scoreLeads\(\) \{

    if \(leads\.length === 0\) return;

    

    setLoading\(true\);

    setError\(null\);

    try \{

      const response = await base44\.functions\.invoke\('aiLeadScoringEngine', \{

        action: 'score\_leads',

        leads,

      \}\);

      

      if \(response\.scoredLeads\) \{

        // Sort by priority then by hotness score

        const sorted = response\.scoredLeads\.sort\(\(a, b\) => \{

          const priorityDiff = \(PRIORITY\_ORDER\[a\.callPriority\] || 999\) \- \(PRIORITY\_ORDER\[b\.callPriority\] || 999\);

          if \(priorityDiff \!== 0\) return priorityDiff;

          return \(b\.hotnessScore || 0\) \- \(a\.hotnessScore || 0\);

        \}\);

        setScoredLeads\(sorted\);

        setSummary\(response\.summary || ''\);

      \}

    \} catch \(err\) \{

      setError\(err\.message || 'Scoring failed'\);

      console\.error\(err\);

    \} finally \{

      setLoading\(false\);

    \}

  \}

  if \(loading\) \{

    return \(

      <div style=\{\{ padding: 20, textAlign: 'center' \}\}>

        <div style=\{\{ animation: 'spin 1s linear infinite', fontSize: 24, marginBottom: 10 \}\}>⟳</div>

        <div style=\{\{ color: '\#666', fontSize: 13 \}\}>AI analyzing lead hotness\.\.\.</div>

      </div>

    \);

  \}

  if \(error\) \{

    return \(

      <div style=\{\{ padding: 12, background: '\#ffebee', border: '1px solid \#f5a5a5', borderRadius: 8, color: '\#d32f2f', fontSize: 12 \}\}>

        ⚠️ \{error\}

      </div>

    \);

  \}

  const fireLeads = scoredLeads\.filter\(l => l\.hotnessLevel === 'FIRE'\);

  const hotLeads = scoredLeads\.filter\(l => l\.hotnessLevel === 'HOT'\);

  const warmLeads = scoredLeads\.filter\(l => l\.hotnessLevel === 'WARM'\);

  return \(

    <div>

      <style>\{\`@keyframes spin \{ to \{ transform: rotate\(360deg\); \} \}\`\}</style>

      \{/\* Summary \*/\}

      \{summary && \(

        <div style=\{\{ background: '\#f0f8ff', border: '1px solid \#bae6fd', borderRadius: 10, padding: 14, marginBottom: 16 \}\}>

          <div style=\{\{ fontSize: 11, fontWeight: 700, color: '\#0369a1', textTransform: 'uppercase', letterSpacing: 0\.5, marginBottom: 6 \}\}>📊 Pipeline Health</div>

          <div style=\{\{ fontSize: 12, color: '\#0c4a6e', lineHeight: 1\.6 \}\}>\{summary\}</div>

        </div>

      \)\}

      \{/\* Stats \*/\}

      <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fit, minmax\(140px, 1fr\)\)', gap: 10, marginBottom: 16 \}\}>

        \{\[

          \{ icon: '🔥', label: 'FIRE Leads', count: fireLeads\.length, color: '\#dc2626' \},

          \{ icon: '🌡️', label: 'HOT Leads', count: hotLeads\.length, color: '\#f59e0b' \},

          \{ icon: '⚡', label: 'WARM Leads', count: warmLeads\.length, color: '\#eab308' \},

          \{ icon: '📊', label: 'Total Leads', count: scoredLeads\.length, color: NAVY \},

        \]\.map\(\(stat, i\) => \(

          <div key=\{i\} style=\{\{ background: '\#fff', border: '1px solid \#e5e7eb', borderRadius: 8, padding: 12, textAlign: 'center' \}\}>

            <div style=\{\{ fontSize: 18, marginBottom: 4 \}\}>\{stat\.icon\}</div>

            <div style=\{\{ fontSize: 20, fontWeight: 900, color: stat\.color \}\}>\{stat\.count\}</div>

            <div style=\{\{ fontSize: 10, color: '\#888', marginTop: 2 \}\}>\{stat\.label\}</div>

          </div>

        \)\)\}

      </div>

      \{/\* FIRE Leads \- Call Immediately \*/\}

      \{fireLeads\.length > 0 && \(

        <div style=\{\{ marginBottom: 16 \}\}>

          <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 \}\}>

            <span style=\{\{ fontSize: 20 \}\}>🔥</span>

            <div style=\{\{ fontSize: 13, fontWeight: 800, color: NAVY \}\}>FIRE — Call In Next 30 Minutes</div>

            <span style=\{\{ background: '\#fef2f2', color: '\#dc2626', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 100 \}\}>\{fireLeads\.length\}</span>

          </div>

          <div style=\{\{ display: 'grid', gap: 8 \}\}>

            \{fireLeads\.map\(lead => \(

              <LeadCard key=\{lead\.leadId\} lead=\{lead\} expanded=\{expandedLead === lead\.leadId\} setExpanded=\{setExpandedLead\} />

            \)\)\}

          </div>

        </div>

      \)\}

      \{/\* HOT Leads \*/\}

      \{hotLeads\.length > 0 && \(

        <div style=\{\{ marginBottom: 16 \}\}>

          <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 \}\}>

            <span style=\{\{ fontSize: 20 \}\}>🌡️</span>

            <div style=\{\{ fontSize: 13, fontWeight: 800, color: NAVY \}\}>HOT — Call Today</div>

            <span style=\{\{ background: '\#fff7ed', color: '\#f59e0b', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 100 \}\}>\{hotLeads\.length\}</span>

          </div>

          <div style=\{\{ display: 'grid', gap: 8 \}\}>

            \{hotLeads\.map\(lead => \(

              <LeadCard key=\{lead\.leadId\} lead=\{lead\} expanded=\{expandedLead === lead\.leadId\} setExpanded=\{setExpandedLead\} />

            \)\)\}

          </div>

        </div>

      \)\}

      \{/\* WARM Leads \*/\}

      \{warmLeads\.length > 0 && \(

        <div style=\{\{ marginBottom: 16 \}\}>

          <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 \}\}>

            <span style=\{\{ fontSize: 20 \}\}>⚡</span>

            <div style=\{\{ fontSize: 13, fontWeight: 800, color: NAVY \}\}>WARM — Call This Week</div>

            <span style=\{\{ background: '\#fef3c7', color: '\#b45309', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 100 \}\}>\{warmLeads\.length\}</span>

          </div>

          <div style=\{\{ display: 'grid', gap: 8 \}\}>

            \{warmLeads\.slice\(0, 3\)\.map\(lead => \(

              <LeadCard key=\{lead\.leadId\} lead=\{lead\} expanded=\{expandedLead === lead\.leadId\} setExpanded=\{setExpandedLead\} />

            \)\)\}

            \{warmLeads\.length > 3 && \(

              <div style=\{\{ fontSize: 11, color: '\#888', textAlign: 'center', padding: '8px 0' \}\}>

                \+\{warmLeads\.length \- 3\} more warm leads\.\.\.

              </div>

            \)\}

          </div>

        </div>

      \)\}

    </div>

  \);

\}

function LeadCard\(\{ lead, expanded, setExpanded \}\) \{

  const hotness = HOTNESS\_COLORS\[lead\.hotnessLevel\] || HOTNESS\_COLORS\.COOL;

  

  return \(

    <div

      onClick=\{\(\) => setExpanded\(expanded ? null : lead\.leadId\)\}

      style=\{\{

        background: hotness\.bg,

        border: \`2px solid $\{hotness\.border\}\`,

        borderRadius: 10,

        padding: 12,

        cursor: 'pointer',

        transition: 'all 0\.2s',

      \}\}

      onMouseEnter=\{e => e\.currentTarget\.style\.boxShadow = '0 4px 12px rgba\(0,0,0,0\.1\)'\}

      onMouseLeave=\{e => e\.currentTarget\.style\.boxShadow = 'none'\}

    >

      <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'flex\-start' \}\}>

        <div style=\{\{ flex: 1 \}\}>

          <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 \}\}>

            <span style=\{\{ fontSize: 16 \}\}>\{hotness\.icon\}</span>

            <div style=\{\{ fontWeight: 700, fontSize: 13, color: NAVY \}\}>Lead \#\{lead\.leadId?\.slice\(\-6\)\}</div>

            <div style=\{\{ background: hotness\.bg, border: \`1px solid $\{hotness\.border\}\`, color: hotness\.text, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100 \}\}>

              \{lead\.hotnessScore\}/100

            </div>

          </div>

          <div style=\{\{ fontSize: 12, color: '\#666', marginBottom: 2 \}\}>\{lead\.primaryFactor\}</div>

          <div style=\{\{ fontSize: 11, color: '\#888' \}\}>Priority: \{lead\.callPriority\}</div>

        </div>

        <span style=\{\{ fontSize: 16, transform: expanded ? 'rotate\(180deg\)' : 'rotate\(0deg\)', transition: 'transform 0\.2s' \}\}>▼</span>

      </div>

      \{expanded && \(

        <div style=\{\{ marginTop: 12, paddingTop: 12, borderTop: \`1px solid $\{hotness\.border\}\` \}\}>

          <div style=\{\{ fontSize: 12, color: NAVY, lineHeight: 1\.6, marginBottom: 8 \}\}>

            <strong>Analysis:</strong> \{lead\.reasoning\}

          </div>

          \{lead\.secondaryFactors && lead\.secondaryFactors\.length > 0 && \(

            <div style=\{\{ fontSize: 11, color: '\#666' \}\}>

              <div style=\{\{ fontWeight: 600, marginBottom: 4 \}\}>Key Factors:</div>

              <div style=\{\{ display: 'flex', flexDirection: 'column', gap: 2 \}\}>

                \{lead\.secondaryFactors\.map\(\(factor, i\) => \(

                  <div key=\{i\}>• \{factor\}</div>

                \)\)\}

              </div>

            </div>

          \)\}

        </div>

      \)\}

    </div>

  \);

\}
