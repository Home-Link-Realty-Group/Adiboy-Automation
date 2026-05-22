# New Microsoft Word Document (53)

Source: New Microsoft Word Document (53).docx

import \{ useState, useEffect \} from 'react';

import \{ base44 \} from '@/api/base44Client';

import \{ BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer \} from 'recharts';

const NAVY = "\#0B1F45";

const GOLD = "\#D4A843";

export default function ContentPerformanceDashboard\(\) \{

  const \[selectedCity, setSelectedCity\] = useState\(null\);

  const \[performanceData, setPerformanceData\] = useState\(\[\]\);

  const \[journeyMetrics, setJourneyMetrics\] = useState\(null\);

  const \[loading, setLoading\] = useState\(false\);

  const cities = \[

    \{ name: 'Atlanta', state: 'GA' \},

    \{ name: 'Chicago', state: 'IL' \},

    \{ name: 'Dallas', state: 'TX' \},

    \{ name: 'Denver', state: 'CO' \},

    \{ name: 'Detroit', state: 'MI' \},

    \{ name: 'Houston', state: 'TX' \},

  \];

  async function analyzeCity\(city, state\) \{

    setLoading\(true\);

    try \{

      const result = await base44\.functions\.invoke\('analyzeContentPerformance', \{

        city,

        state,

      \}\);

      if \(result\.success\) \{

        setPerformanceData\(result\.all\_variants || \[\]\);

        setJourneyMetrics\(\{

          city: result\.city,

          state: result\.state,

          total\_journeys: result\.total\_journeys,

          variants\_analyzed: result\.variants\_analyzed,

          top\_performer: result\.top\_performer,

        \}\);

        setSelectedCity\(\{ city, state \}\);

      \}

    \} catch \(error\) \{

      console\.error\('Analysis failed:', error\);

    \} finally \{

      setLoading\(false\);

    \}

  \}

  return \(

    <div style=\{\{ padding: 20, background: '\#f8f9fa', borderRadius: 12 \}\}>

      <h2 style=\{\{ fontSize: 22, fontWeight: 900, color: NAVY, marginBottom: 20 \}\}>

        📊 Content Performance Tracking

      </h2>

      \{/\* City Selector \*/\}

      <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, marginBottom: 20, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

        <div style=\{\{ fontSize: 12, fontWeight: 700, color: '\#666', marginBottom: 10 \}\}>SELECT CITY</div>

        <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fit, minmax\(140px, 1fr\)\)', gap: 8 \}\}>

          \{cities\.map\(city => \(

            <button

              key=\{\`$\{city\.name\}\-$\{city\.state\}\`\}

              onClick=\{\(\) => analyzeCity\(city\.name, city\.state\)\}

              style=\{\{

                padding: '10px 14px',

                borderRadius: 8,

                border: 'none',

                background: selectedCity?\.city === city\.name ? GOLD : '\#f5f5f5',

                color: selectedCity?\.city === city\.name ? '\#fff' : NAVY,

                fontWeight: 700,

                cursor: 'pointer',

                transition: 'all 0\.2s',

              \}\}

            >

              \{city\.name\}, \{city\.state\}

            </button>

          \)\)\}

        </div>

      </div>

      \{loading && \(

        <div style=\{\{ textAlign: 'center', padding: 40, color: '\#999' \}\}>

          Analyzing content performance\.\.\.

        </div>

      \)\}

      \{journeyMetrics && performanceData\.length > 0 && \(

        <>

          \{/\* Summary Cards \*/\}

          <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fit, minmax\(200px, 1fr\)\)', gap: 14, marginBottom: 24 \}\}>

            <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

              <div style=\{\{ fontSize: 11, color: '\#888', fontWeight: 700, marginBottom: 4 \}\}>TOTAL VISITORS</div>

              <div style=\{\{ fontSize: 24, fontWeight: 900, color: NAVY \}\}>

                \{journeyMetrics\.total\_journeys\.toLocaleString\(\)\}

              </div>

              <div style=\{\{ fontSize: 11, color: '\#aaa', marginTop: 6 \}\}>

                \{journeyMetrics\.variants\_analyzed\} content variants tracked

              </div>

            </div>

            <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

              <div style=\{\{ fontSize: 11, color: '\#888', fontWeight: 700, marginBottom: 4 \}\}>TOP CONVERSION RATE</div>

              <div style=\{\{ fontSize: 24, fontWeight: 900, color: GOLD \}\}>

                \{journeyMetrics\.top\_performer\.conversion\_rate\.toFixed\(2\)\}%

              </div>

              <div style=\{\{ fontSize: 11, color: '\#aaa', marginTop: 6 \}\}>

                \{journeyMetrics\.top\_performer\.conversions\} conversions

              </div>

            </div>

            <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

              <div style=\{\{ fontSize: 11, color: '\#888', fontWeight: 700, marginBottom: 4 \}\}>TOP VARIANT REVENUE</div>

              <div style=\{\{ fontSize: 24, fontWeight: 900, color: '\#27ae60' \}\}>

                $\{\(journeyMetrics\.top\_performer\.revenue / 1000\)\.toFixed\(0\)\}K

              </div>

              <div style=\{\{ fontSize: 11, color: '\#aaa', marginTop: 6 \}\}>

                Estimated value from conversions

              </div>

            </div>

            <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

              <div style=\{\{ fontSize: 11, color: '\#888', fontWeight: 700, marginBottom: 4 \}\}>AVG TIME ON SITE</div>

              <div style=\{\{ fontSize: 24, fontWeight: 900, color: NAVY \}\}>

                \{journeyMetrics\.top\_performer\.avg\_time\_on\_site\}s

              </div>

              <div style=\{\{ fontSize: 11, color: '\#aaa', marginTop: 6 \}\}>

                Top performing variant

              </div>

            </div>

          </div>

          \{/\* Performance Chart \*/\}

          <div style=\{\{ background: '\#fff', padding: 14, borderRadius: 10, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)', marginBottom: 24 \}\}>

            <h3 style=\{\{ fontSize: 14, fontWeight: 800, color: NAVY, marginBottom: 12 \}\}>

              Conversion Rate by Content Variant

            </h3>

            <ResponsiveContainer width="100%" height=\{300\}>

              <BarChart data=\{performanceData\.map\(\(v, i\) => \(\{

                variant: \`Variant $\{i \+ 1\}\`,

                conversion\_rate: v\.conversion\_rate,

              \}\)\)\}>

                <CartesianGrid strokeDasharray="3 3" stroke="\#eee" />

                <XAxis dataKey="variant" tick=\{\{ fontSize: 11 \}\} />

                <YAxis label=\{\{ value: '% Conversion', angle: 90, position: 'insideLeft' \}\} />

                <Tooltip formatter=\{\(v\) => \`$\{v\.toFixed\(2\)\}%\`\} />

                <Bar dataKey="conversion\_rate" fill=\{GOLD\} />

              </BarChart>

            </ResponsiveContainer>

          </div>

          \{/\* Engagement Metrics \*/\}

          <div style=\{\{ background: '\#fff', padding: 14, borderRadius: 10, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)', marginBottom: 24 \}\}>

            <h3 style=\{\{ fontSize: 14, fontWeight: 800, color: NAVY, marginBottom: 12 \}\}>

              Engagement Metrics by Variant

            </h3>

            <ResponsiveContainer width="100%" height=\{300\}>

              <LineChart data=\{performanceData\.map\(\(v, i\) => \(\{

                variant: \`V$\{i \+ 1\}\`,

                scroll\_depth: v\.avg\_scroll\_depth,

                form\_start: v\.form\_start\_rate,

              \}\)\)\}>

                <CartesianGrid strokeDasharray="3 3" stroke="\#eee" />

                <XAxis dataKey="variant" tick=\{\{ fontSize: 11 \}\} />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line type="monotone" dataKey="scroll\_depth" stroke=\{GOLD\} strokeWidth=\{2\} name="Avg Scroll Depth %" />

                <Line type="monotone" dataKey="form\_start" stroke="\#3b82f6" strokeWidth=\{2\} name="Form Start Rate %" />

              </LineChart>

            </ResponsiveContainer>

          </div>

          \{/\* Detailed Performance Table \*/\}

          <div style=\{\{ background: '\#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)', overflow: 'hidden' \}\}>

            <div style=\{\{ padding: 14, borderBottom: '1px solid \#eee' \}\}>

              <h3 style=\{\{ fontSize: 14, fontWeight: 800, color: NAVY, margin: 0 \}\}>Content Variant Performance</h3>

            </div>

            <div style=\{\{ overflowX: 'auto' \}\}>

              <table style=\{\{ width: '100%', borderCollapse: 'collapse', fontSize: 12 \}\}>

                <thead>

                  <tr style=\{\{ background: '\#f5f5f5', borderBottom: '2px solid \#ddd' \}\}>

                    <th style=\{\{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, color: NAVY \}\}>Rank</th>

                    <th style=\{\{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY \}\}>Visitors</th>

                    <th style=\{\{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY \}\}>Conversions</th>

                    <th style=\{\{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY \}\}>Conv Rate</th>

                    <th style=\{\{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY \}\}>Scroll Depth</th>

                    <th style=\{\{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY \}\}>Form Start</th>

                    <th style=\{\{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY \}\}>Revenue</th>

                  </tr>

                </thead>

                <tbody>

                  \{performanceData\.map\(\(variant, i\) => \(

                    <tr key=\{i\} style=\{\{ borderBottom: '1px solid \#eee', background: i % 2 === 0 ? '\#fafafa' : '\#fff' \}\}>

                      <td style=\{\{ padding: '10px 14px', fontWeight: 700, color: NAVY \}\}>\{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i \+ 1\}</td>

                      <td style=\{\{ padding: '10px 14px', textAlign: 'center', color: '\#555' \}\}>\{variant\.total\_visitors\}</td>

                      <td style=\{\{ padding: '10px 14px', textAlign: 'center', color: GOLD, fontWeight: 700 \}\}>\{variant\.total\_conversions\}</td>

                      <td style=\{\{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: '\#27ae60' \}\}>

                        \{variant\.conversion\_rate\.toFixed\(2\)\}%

                      </td>

                      <td style=\{\{ padding: '10px 14px', textAlign: 'center', color: '\#555' \}\}>

                        \{variant\.avg\_scroll\_depth\.toFixed\(0\)\}%

                      </td>

                      <td style=\{\{ padding: '10px 14px', textAlign: 'center', color: '\#555' \}\}>

                        \{variant\.form\_start\_rate\.toFixed\(1\)\}%

                      </td>

                      <td style=\{\{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: NAVY \}\}>

                        $\{\(variant\.total\_revenue / 1000\)\.toFixed\(0\)\}K

                      </td>

                    </tr>

                  \)\)\}

                </tbody>

              </table>

            </div>

          </div>

          \{/\* Top Insights \*/\}

          <div style=\{\{ marginTop: 20, padding: 14, background: '\#f0f8ff', borderRadius: 10, borderLeft: \`4px solid $\{GOLD\}\` \}\}>

            <div style=\{\{ fontSize: 12, color: '\#1a3a5c', lineHeight: 1\.7 \}\}>

              <strong>💡 Insights:</strong> Variant \#\{performanceData\.findIndex\(v => v\.conversion\_rate === performanceData\[0\]\.conversion\_rate\) \+ 1\} is your top performer with \{performanceData\[0\]\.conversion\_rate\.toFixed\(2\)\}% conversion rate\. 

              Visitors spend avg \{performanceData\[0\]\.avg\_time\_on\_site\}s on this content and scroll \{performanceData\[0\]\.avg\_scroll\_depth\.toFixed\(0\)\}% down the page\. 

              Form start rate: \{performanceData\[0\]\.form\_start\_rate\.toFixed\(1\)\}% — suggesting this messaging resonates strongest\.

            </div>

          </div>

        </>

      \)\}

      \{\!loading && \!journeyMetrics && \(

        <div style=\{\{ textAlign: 'center', padding: 40, color: '\#999', background: '\#fff', borderRadius: 10 \}\}>

          Select a city to view content performance analysis

        </div>

      \)\}

    </div>

  \);

\}
