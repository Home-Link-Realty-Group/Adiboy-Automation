# New Microsoft Word Document (67)

Source: New Microsoft Word Document (67).docx

export default function HQPipelineFunnel\(\{ leads \}\) \{

  const stages = \[

    \{ label: 'New Lead', key: 'New Lead', color: '\#3498db', icon: '📥' \},

    \{ label: 'Contacted', key: 'Contacted', color: '\#9b59b6', icon: '📞' \},

    \{ label: 'Responded', key: 'Responded', color: '\#f39c12', icon: '💬' \},

    \{ label: 'Offer Sent', key: 'Offer Sent', color: '\#e67e22', icon: '💵' \},

    \{ label: 'Under Contract', key: 'Under Contract', color: '\#27ae60', icon: '📝' \},

  \];

  const counts = stages\.map\(s => \(\{

    \.\.\.s,

    count: leads\.filter\(l => l\.status === s\.key\)\.length,

  \}\)\);

  const maxCount = Math\.max\(\.\.\.counts\.map\(c => c\.count\), 1\);

  const totalPipeline = leads

    \.filter\(l => \!\['Dead', 'Inactive', 'Closed'\]\.includes\(l\.status\)\)

    \.reduce\(\(sum, l\) => sum \+ \(l\.offer\_amount || 0\), 0\);

  const avgScore = leads\.filter\(l => l\.motivation\_total\_score > 0\)\.length > 0

    ? Math\.round\(leads\.filter\(l => l\.motivation\_total\_score > 0\)\.reduce\(\(s, l\) => s \+ \(l\.motivation\_total\_score || 0\), 0\) / leads\.filter\(l => l\.motivation\_total\_score > 0\)\.length \* 10\) / 10

    : 0;

  return \(

    <div style=\{\{ background: 'rgba\(255,255,255,0\.03\)', border: '1px solid rgba\(255,255,255,0\.07\)', borderRadius: 14, padding: 18 \}\}>

      <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', marginBottom: 14 \}\}>

        <div style=\{\{ fontSize: 12, fontWeight: 900, color: '\#e74c3c', letterSpacing: 1, textTransform: 'uppercase' \}\}>🔻 Pipeline Funnel</div>

        <div style=\{\{ fontSize: 10, color: '\#888' \}\}>Total Active: \{leads\.filter\(l => \!\['Dead','Inactive'\]\.includes\(l\.status\)\)\.length\}</div>

      </div>

      <div style=\{\{ display: 'flex', flexDirection: 'column', gap: 6 \}\}>

        \{counts\.map\(\(stage, i\) => \{

          const pct = maxCount > 0 ? \(stage\.count / maxCount\) \* 100 : 0;

          return \(

            <div key=\{i\} style=\{\{ display: 'flex', alignItems: 'center', gap: 8 \}\}>

              <div style=\{\{ fontSize: 14, width: 20 \}\}>\{stage\.icon\}</div>

              <div style=\{\{ fontSize: 10, color: 'rgba\(255,255,255,0\.5\)', width: 90, flexShrink: 0 \}\}>\{stage\.label\}</div>

              <div style=\{\{ flex: 1, height: 18, background: 'rgba\(255,255,255,0\.05\)', borderRadius: 4, overflow: 'hidden' \}\}>

                <div style=\{\{

                  height: '100%', width: \`$\{pct\}%\`,

                  background: \`linear\-gradient\(90deg, $\{stage\.color\}cc, $\{stage\.color\}\)\`,

                  borderRadius: 4, transition: 'width 0\.8s ease',

                  display: 'flex', alignItems: 'center', justifyContent: 'flex\-end', paddingRight: 6,

                \}\}>

                  \{stage\.count > 0 && <span style=\{\{ fontSize: 9, fontWeight: 900, color: '\#fff' \}\}>\{stage\.count\}</span>\}

                </div>

              </div>

              <div style=\{\{ fontSize: 12, fontWeight: 900, color: stage\.color, width: 28, textAlign: 'right' \}\}>\{stage\.count\}</div>

            </div>

          \);

        \}\)\}

      </div>

      <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 \}\}>

        <div style=\{\{ background: 'rgba\(39,174,96,0\.1\)', border: '1px solid rgba\(39,174,96,0\.25\)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' \}\}>

          <div style=\{\{ fontSize: 13, fontWeight: 900, color: '\#27ae60' \}\}>$\{totalPipeline > 0 ? \(totalPipeline / 1000\)\.toFixed\(0\) \+ 'k' : '0'\}</div>

          <div style=\{\{ fontSize: 9, color: '\#888' \}\}>Pipeline Value</div>

        </div>

        <div style=\{\{ background: 'rgba\(243,156,18,0\.1\)', border: '1px solid rgba\(243,156,18,0\.25\)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' \}\}>

          <div style=\{\{ fontSize: 13, fontWeight: 900, color: '\#f39c12' \}\}>\{avgScore\}/20</div>

          <div style=\{\{ fontSize: 9, color: '\#888' \}\}>Avg Motivation</div>

        </div>

      </div>

    </div>

  \);

\}
