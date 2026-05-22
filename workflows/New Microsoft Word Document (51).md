# New Microsoft Word Document (51)

Source: New Microsoft Word Document (51).docx

import \{ useState, useEffect \} from 'react';

import \{ base44 \} from '@/api/base44Client';

const NAVY = "\#0B1F45";

const GOLD = "\#D4A843";

export default function CityAdRecommendations\(\{ cityData \}\) \{

  const \[loading, setLoading\] = useState\(false\);

  const \[analysis, setAnalysis\] = useState\(null\);

  const \[error, setError\] = useState\(null\);

  useEffect\(\(\) => \{

    if \(cityData && cityData\.length > 0\) \{

      analyzeCities\(\);

    \}

  \}, \[cityData\]\);

  async function analyzeCities\(\) \{

    if \(\!cityData || cityData\.length === 0\) return;

    

    setLoading\(true\);

    setError\(null\);

    try \{

      const response = await base44\.functions\.invoke\('aiCityAdAllocator', \{

        cityData,

      \}\);

      if \(response\.analysis\) \{

        setAnalysis\(response\.analysis\);

      \}

    \} catch \(err\) \{

      setError\(err\.message || 'Analysis failed'\);

      console\.error\(err\);

    \} finally \{

      setLoading\(false\);

    \}

  \}

  if \(loading\) \{

    return \(

      <div style=\{\{ padding: 20, background: '\#fff', borderRadius: 12, border: '1px solid \#e5e7eb', textAlign: 'center' \}\}>

        <div style=\{\{ animation: 'spin 1s linear infinite', fontSize: 24, marginBottom: 10 \}\}>⟳</div>

        <div style=\{\{ color: '\#666', fontSize: 13 \}\}>AI analyzing city performance and market conditions\.\.\.</div>

      </div>

    \);

  \}

  if \(error\) \{

    return \(

      <div style=\{\{ padding: 16, background: '\#ffebee', border: '1px solid \#f5a5a5', borderRadius: 8, color: '\#d32f2f', fontSize: 13 \}\}>

        ⚠️ \{error\}

      </div>

    \);

  \}

  if \(\!analysis || \!analysis\.recommendations\) \{

    return null;

  \}

  const highPriority = analysis\.recommendations\.filter\(r => r\.priority === 'HIGH'\);

  const mediumPriority = analysis\.recommendations\.filter\(r => r\.priority === 'MEDIUM'\);

  return \(

    <div style=\{\{ animation: 'fadein 0\.3s ease' \}\}>

      <style>\{\`@keyframes fadein \{ from \{ opacity: 0; \} to \{ opacity: 1; \} \}\`\}</style>

      \{/\* Strategic Summary \*/\}

      <div style=\{\{ background: \`linear\-gradient\(135deg, $\{NAVY\}, \#122B5E\)\`, borderRadius: 12, padding: 20, marginBottom: 20, color: '\#fff' \}\}>

        <div style=\{\{ display: 'flex', alignItems: 'flex\-start', gap: 16 \}\}>

          <div style=\{\{ fontSize: 32 \}\}>🤖</div>

          <div>

            <div style=\{\{ fontSize: 14, fontWeight: 800, marginBottom: 8 \}\}>AI Ad Allocation Strategy</div>

            <div style=\{\{ fontSize: 13, lineHeight: 1\.6, color: '\#d0d8e0' \}\}>\{analysis\.summary\}</div>

          </div>

        </div>

      </div>

      \{/\* High Priority Recommendations \*/\}

      \{highPriority\.length > 0 && \(

        <div style=\{\{ marginBottom: 20 \}\}>

          <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 \}\}>

            <span style=\{\{ fontSize: 20 \}\}>🔴</span>

            <div style=\{\{ fontSize: 14, fontWeight: 800, color: NAVY \}\}>HIGH PRIORITY — Activate Immediately</div>

            <span style=\{\{ background: '\#fee2e2', color: '\#dc2626', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100 \}\}>\{highPriority\.length\}</span>

          </div>

          <div style=\{\{ display: 'grid', gap: 12 \}\}>

            \{highPriority\.map\(\(rec, i\) => \(

              <RecommendationCard key=\{i\} rec=\{rec\} />

            \)\)\}

          </div>

        </div>

      \)\}

      \{/\* Medium Priority Recommendations \*/\}

      \{mediumPriority\.length > 0 && \(

        <div style=\{\{ marginBottom: 20 \}\}>

          <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 \}\}>

            <span style=\{\{ fontSize: 20 \}\}>🟡</span>

            <div style=\{\{ fontSize: 14, fontWeight: 800, color: NAVY \}\}>MEDIUM PRIORITY — Monitor & Plan</div>

            <span style=\{\{ background: '\#fef3c7', color: '\#92400e', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100 \}\}>\{mediumPriority\.length\}</span>

          </div>

          <div style=\{\{ display: 'grid', gap: 12 \}\}>

            \{mediumPriority\.map\(\(rec, i\) => \(

              <RecommendationCard key=\{i\} rec=\{rec\} />

            \)\)\}

          </div>

        </div>

      \)\}

      \{/\* Risk Factors \*/\}

      \{analysis\.riskFactors && analysis\.riskFactors\.length > 0 && \(

        <div style=\{\{ background: '\#fff9e6', border: '1px solid \#fcd34d', borderRadius: 10, padding: 14 \}\}>

          <div style=\{\{ fontSize: 11, fontWeight: 700, color: '\#7a5e1a', textTransform: 'uppercase', letterSpacing: 0\.5, marginBottom: 8 \}\}>⚠️ Risk Factors</div>

          <div style=\{\{ display: 'grid', gap: 6 \}\}>

            \{analysis\.riskFactors\.map\(\(factor, i\) => \(

              <div key=\{i\} style=\{\{ fontSize: 12, color: '\#5a4a1a', display: 'flex', gap: 8, alignItems: 'flex\-start' \}\}>

                <span style=\{\{ color: '\#f59e0b', fontWeight: 700, flexShrink: 0 \}\}>•</span>

                <span>\{factor\}</span>

              </div>

            \)\)\}

          </div>

        </div>

      \)\}

      \{/\* Budget Allocation Summary \*/\}

      <div style=\{\{ marginTop: 20, padding: 14, background: '\#f0f9ff', border: '1px solid \#bae6fd', borderRadius: 10 \}\}>

        <div style=\{\{ fontSize: 11, fontWeight: 700, color: '\#0369a1', textTransform: 'uppercase', letterSpacing: 0\.5, marginBottom: 10 \}\}>💰 Recommended Monthly Ad Budget</div>

        <div style=\{\{ fontSize: 20, fontWeight: 900, color: '\#0369a1', marginBottom: 6 \}\}>

          $\{analysis\.recommendations\.reduce\(\(sum, r\) => sum \+ \(r\.suggestedMonthlyAdSpend || 0\), 0\)\.toLocaleString\(\)\}

        </div>

        <div style=\{\{ fontSize: 12, color: '\#0c4a6e' \}\}>

          Estimated \{analysis\.recommendations\.reduce\(\(sum, r\) => sum \+ \(r\.expectedMonthlyLeads || 0\), 0\)\} leads/month across \{analysis\.recommendations\.length\} cities

        </div>

      </div>

    </div>

  \);

\}

function RecommendationCard\(\{ rec \}\) \{

  const confidenceColor = rec\.confidence >= 80 ? '\#10b981' : rec\.confidence >= 60 ? '\#f59e0b' : '\#ef4444';

  return \(

    <div style=\{\{ background: '\#fff', border: '1px solid \#e5e7eb', borderRadius: 10, padding: 16, boxShadow: '0 1px 4px rgba\(0,0,0,0\.05\)' \}\}>

      <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'flex\-start', marginBottom: 12 \}\}>

        <div>

          <div style=\{\{ fontSize: 15, fontWeight: 800, color: '\#111827' \}\}>\{rec\.city\}</div>

          <div style=\{\{ fontSize: 12, color: '\#6b7280', marginTop: 2 \}\}>\{rec\.reason\}</div>

        </div>

        <div style=\{\{ textAlign: 'right' \}\}>

          <div style=\{\{ fontSize: 24, fontWeight: 900, color: '\#0B1F45' \}\}>\{rec\.confidence\}%</div>

          <div style=\{\{ fontSize: 10, color: '\#888', fontWeight: 600 \}\}>Confidence</div>

        </div>

      </div>

      <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingTop: 12, borderTop: '1px solid \#f0f0f0' \}\}>

        <div>

          <div style=\{\{ fontSize: 10, color: '\#9ca3af', fontWeight: 600, textTransform: 'uppercase', marginBottom: 3 \}\}>Monthly Ad Spend</div>

          <div style=\{\{ fontSize: 16, fontWeight: 900, color: '\#0B1F45' \}\}>$\{rec\.suggestedMonthlyAdSpend?\.toLocaleString\(\) || '0'\}</div>

        </div>

        <div>

          <div style=\{\{ fontSize: 10, color: '\#9ca3af', fontWeight: 600, textTransform: 'uppercase', marginBottom: 3 \}\}>Expected Leads</div>

          <div style=\{\{ fontSize: 16, fontWeight: 900, color: '\#D4A843' \}\}>\{rec\.expectedMonthlyLeads || 0\}/mo</div>

        </div>

      </div>

      \{rec\.marketReadiness && \(

        <div style=\{\{ marginTop: 10, padding: '8px 12px', background: '\#f0fdf4', border: '1px solid \#bbf7d0', borderRadius: 6, fontSize: 12, color: '\#166534' \}\}>

          ✓ \{rec\.marketReadiness\}

        </div>

      \)\}

    </div>

  \);

\}
