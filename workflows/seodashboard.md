# seodashboard

Source: seodashboard.docx

import \{ useState, useEffect \} from 'react';

import \{ base44 \} from '@/api/base44Client';

import \{ LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar \} from 'recharts';

import \{ TrendingUp, AlertTriangle, Zap, Eye, Download, Share2, Settings, Moon, Sun, Zap as Lightning, Target, TrendingDown, Brain \} from 'lucide\-react';

const NAVY = '\#0B1F45';

const GOLD = '\#D4A843';

const GREEN = '\#27ae60';

const RED = '\#e74c3c';

const ORANGE = '\#f39c12';

const PURPLE = '\#9b59b6';

const CYAN = '\#1abc9c';

export default function SEODashboardPro\(\) \{

  const \[dashboardView, setDashboardView\] = useState\('executive'\); // executive, operational, strategic

  const \[darkMode, setDarkMode\] = useState\(false\);

  const \[timeRange, setTimeRange\] = useState\('6m'\); // 1m, 3m, 6m, 1y

  const \[selectedMetrics, setSelectedMetrics\] = useState\(\['organic', 'keywords', 'visibility'\]\);

  const \[competitorView, setCompetitorView\] = useState\(false\);

  const \[showAnomalies, setShowAnomalies\] = useState\(true\);

  const \[seoData, setSeoData\] = useState\(null\);

  const \[predictions, setPredictions\] = useState\(null\);

  const \[loading, setLoading\] = useState\(true\);

  useEffect\(\(\) => \{

    document\.title = 'Enterprise SEO Intelligence Platform | Fortune 1 Grade Analytics';

    

    // Enterprise\-grade mock data

    const mockData = \{

      executive: \{

        overallScore: 94\.2,

        scoreChange: 5\.8,

        marketPosition: 'Leader',

        visibility: 87,

        authority: 91,

        coverage: 96,

        healthScore: 89,

      \},

      operational: \{

        keywordData: \[

          \{ date: 'Week 1', rank: 15\.2, traffic: 2100, ctr: 8\.2, impressions: 25600 \},

          \{ date: 'Week 2', rank: 14\.8, traffic: 2340, ctr: 8\.5, impressions: 27500 \},

          \{ date: 'Week 3', rank: 14\.1, traffic: 2680, ctr: 9\.1, impressions: 29400 \},

          \{ date: 'Week 4', rank: 13\.4, traffic: 2950, ctr: 9\.8, impressions: 30100 \},

          \{ date: 'Week 5', rank: 12\.9, traffic: 3280, ctr: 10\.2, impressions: 32100 \},

          \{ date: 'Week 6', rank: 12\.4, traffic: 3640, ctr: 10\.8, impressions: 33700 \},

        \],

        anomalies: \[

          \{ date: 'Week 2', type: 'spike', metric: 'traffic', value: '\+12%', reason: 'New content index' \},

          \{ date: 'Week 4', type: 'dip', metric: 'rank', value: '\-0\.7', reason: 'Competitor update detected' \},

        \],

        topOpportunities: \[

          \{ keyword: 'sell inherited house \[city\]', gap: 8\.4, volume: 1200, potential: 'high' \},

          \{ keyword: '\[city\] tax lien properties', gap: 6\.2, volume: 580, potential: 'medium' \},

          \{ keyword: 'quick home sale \[state\]', gap: 5\.1, volume: 2100, potential: 'high' \},

        \],

      \},

      strategic: \{

        competitors: \[

          \{ name: 'HomeVestors', visibility: 92, keywords: 4200, authority: 94, trend: 'up' \},

          \{ name: 'We Buy Ugly Houses', visibility: 88, keywords: 3800, authority: 91, trend: 'flat' \},

          \{ name: 'Home\-Link \(You\)', visibility: 87, keywords: 3400, authority: 89, trend: 'up' \},

          \{ name: 'CashForHomes', visibility: 78, keywords: 2600, authority: 82, trend: 'down' \},

        \],

        marketTrends: \[

          \{ month: 'Jan', volume: 450000, avgCPC: 2\.40, competition: 'high', trendDir: 'flat' \},

          \{ month: 'Feb', volume: 485000, avgCPC: 2\.55, competition: 'high', trendDir: 'up' \},

          \{ month: 'Mar', volume: 520000, avgCPC: 2\.80, competition: 'high', trendDir: 'up' \},

          \{ month: 'Apr', volume: 545000, avgCPC: 3\.10, competition: 'very\_high', trendDir: 'up' \},

        \],

      \},

    \};

    const mockPredictions = \{

      next30: \{

        organicGrowth: '\+18%',

        trafficForecast: 4300,

        rankImprovement: 0\.8,

        confidence: 94,

      \},

      next90: \{

        marketShare: '\+3\.2%',

        newKeywords: 245,

        visibilityTarget: 92,

        confidence: 87,

      \},

      risks: \[

        \{ risk: 'Algorithm update detected', probability: 78, impact: 'medium', mitigation: 'Update 5 core articles' \},

        \{ risk: 'Competitor aggressive expansion', probability: 65, impact: 'medium', mitigation: 'Target long\-tail variants' \},

      \],

    \};

    setSeoData\(mockData\);

    setPredictions\(mockPredictions\);

    setLoading\(false\);

  \}, \[\]\);

  const bg = darkMode ? '\#0a0f1e' : '\#f8f9fa';

  const cardBg = darkMode ? '\#1a2332' : '\#fff';

  const textPrimary = darkMode ? '\#e0e8f5' : NAVY;

  const textSecondary = darkMode ? '\#a0b0c8' : '\#666';

  const borderColor = darkMode ? 'rgba\(255,255,255,0\.1\)' : '\#e8e8e8';

  if \(loading\) return <div style=\{\{ padding: '40px', textAlign: 'center', color: textSecondary, background: bg, minHeight: '100vh' \}\}>Loading Enterprise Analytics\.\.\.</div>;

  const StatCard = \(\{ title, value, change, icon, subtext, trend \}\) => \(

    <div style=\{\{ background: cardBg, borderRadius: 12, padding: '20px', border: \`1px solid $\{borderColor\}\`, flex: 1 \}\}>

      <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'flex\-start', marginBottom: 12 \}\}>

        <div style=\{\{ fontSize: 13, fontWeight: 700, color: textSecondary \}\}>\{title\}</div>

        <div style=\{\{ fontSize: 20 \}\}>\{icon\}</div>

      </div>

      <div style=\{\{ fontSize: 32, fontWeight: 900, color: textPrimary, marginBottom: 6 \}\}>\{value\}</div>

      <div style=\{\{ fontSize: 12, color: change > 0 ? GREEN : RED, fontWeight: 700, marginBottom: 4 \}\}>

        \{change > 0 ? '↑' : '↓'\} \{Math\.abs\(change\)\}% vs last period

      </div>

      \{subtext && <div style=\{\{ fontSize: 11, color: textSecondary \}\}>\{subtext\}</div>\}

    </div>

  \);

  return \(

    <div style=\{\{ fontFamily: "'Segoe UI', Arial, sans\-serif", background: bg, color: textPrimary, minHeight: '100vh', transition: 'all 0\.3s' \}\}>

      \{/\* Header \*/\}

      <div style=\{\{ background: cardBg, borderBottom: \`1px solid $\{borderColor\}\`, padding: '20px 32px', position: 'sticky', top: 0, zIndex: 100 \}\}>

        <div style=\{\{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space\-between', alignItems: 'center' \}\}>

          <div>

            <h1 style=\{\{ fontSize: 28, fontWeight: 900, margin: '0 0 4px', color: textPrimary \}\}>🚀 Enterprise SEO Intelligence</h1>

            <p style=\{\{ margin: 0, fontSize: 12, color: textSecondary \}\}>Fortune 1 Grade Analytics & Predictions</p>

          </div>

          <div style=\{\{ display: 'flex', gap: 10, alignItems: 'center' \}\}>

            <button onClick=\{\(\) => setDarkMode\(\!darkMode\)\} style=\{\{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: textPrimary, fontSize: 18 \}\}>

              \{darkMode ? <Sun /> : <Moon />\}

            </button>

            <select value=\{timeRange\} onChange=\{\(e\) => setTimeRange\(e\.target\.value\)\} style=\{\{ padding: '8px 12px', borderRadius: 6, border: \`1px solid $\{borderColor\}\`, background: cardBg, color: textPrimary, cursor: 'pointer' \}\}>

              <option value="1m">Last Month</option>

              <option value="3m">Last 3 Months</option>

              <option value="6m">Last 6 Months</option>

              <option value="1y">Last Year</option>

            </select>

            <button style=\{\{ background: GOLD, color: '\#fff', border: 'none', padding: '8px 14px', borderRadius: 6, cursor: 'pointer', fontWeight: 700, display: 'flex', gap: 6, alignItems: 'center' \}\}>

              <Download size=\{14\} /> Export

            </button>

            <button style=\{\{ background: PURPLE, color: '\#fff', border: 'none', padding: '8px 14px', borderRadius: 6, cursor: 'pointer', fontWeight: 700, display: 'flex', gap: 6, alignItems: 'center' \}\}>

              <Share2 size=\{14\} /> Share

            </button>

          </div>

        </div>

      </div>

      \{/\* Dashboard Selector \*/\}

      <div style=\{\{ background: cardBg, borderBottom: \`1px solid $\{borderColor\}\`, padding: '0 32px' \}\}>

        <div style=\{\{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 0 \}\}>

          \{\[

            \{ id: 'executive', label: '👔 Executive Dashboard', desc: 'High\-level KPIs & forecasts' \},

            \{ id: 'operational', label: '⚙️ Operational Dashboard', desc: 'Detailed metrics & anomalies' \},

            \{ id: 'strategic', label: '🎯 Strategic Dashboard', desc: 'Competitive & market intelligence' \},

          \]\.map\(d => \(

            <button

              key=\{d\.id\}

              onClick=\{\(\) => setDashboardView\(d\.id\)\}

              style=\{\{

                flex: 1,

                padding: '16px 20px',

                border: 'none',

                background: dashboardView === d\.id ? GOLD : 'transparent',

                color: dashboardView === d\.id ? '\#fff' : textSecondary,

                cursor: 'pointer',

                fontWeight: dashboardView === d\.id ? 700 : 500,

                borderBottom: dashboardView === d\.id ? \`3px solid $\{GOLD\}\` : \`1px solid $\{borderColor\}\`,

                fontSize: 13,

              \}\}

            >

              <div style=\{\{ fontWeight: 700 \}\}>\{d\.label\}</div>

              <div style=\{\{ fontSize: 11, marginTop: 2, opacity: 0\.7 \}\}>\{d\.desc\}</div>

            </button>

          \)\)\}

        </div>

      </div>

      \{/\* Content \*/\}

      <div style=\{\{ padding: '32px' \}\}>

        <div style=\{\{ maxWidth: 1400, margin: '0 auto' \}\}>

          

          \{dashboardView === 'executive' && \(

            <div>

              \{/\* Executive KPIs \*/\}

              <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fit, minmax\(200px, 1fr\)\)', gap: 16, marginBottom: 32 \}\}>

                <StatCard title="SEO Health Score" value=\{\`$\{seoData\.executive\.overallScore\}%\`\} change=\{seoData\.executive\.scoreChange\} icon="💚" subtext=\{\`$\{seoData\.executive\.scoreChange > 0 ? 'Improving' : 'Declining'\} trend\`\} />

                <StatCard title="Visibility Index" value=\{\`$\{seoData\.executive\.visibility\}%\`\} change=\{3\.2\} icon="👁️" subtext="Market leader position" />

                <StatCard title="Domain Authority" value=\{seoData\.executive\.authority\} change=\{2\.1\} icon="🏆" subtext="Top tier ranking" />

                <StatCard title="Content Coverage" value=\{\`$\{seoData\.executive\.coverage\}%\`\} change=\{5\.3\} icon="📚" subtext="Indexed & live" />

              </div>

              \{/\* AI Predictions \*/\}

              <div style=\{\{ background: cardBg, borderRadius: 12, padding: '24px', border: \`1px solid $\{borderColor\}\`, marginBottom: 32 \}\}>

                <div style=\{\{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 \}\}>

                  <Brain size=\{20\} color=\{PURPLE\} />

                  <h3 style=\{\{ fontSize: 16, fontWeight: 800, margin: 0, color: textPrimary \}\}>AI\-Powered Predictions</h3>

                  <span style=\{\{ background: GREEN \+ '20', color: GREEN, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 4 \}\}>94% Confidence</span>

                </div>

                <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 \}\}>

                  <div>

                    <div style=\{\{ fontSize: 12, color: textSecondary, marginBottom: 8 \}\}>Next 30 Days Forecast</div>

                    <div style=\{\{ fontSize: 28, fontWeight: 900, color: GREEN, marginBottom: 4 \}\}>\{predictions\.next30\.organicGrowth\}</div>

                    <div style=\{\{ fontSize: 12, color: textSecondary \}\}>Organic Traffic Growth</div>

                    <div style=\{\{ fontSize: 11, marginTop: 8, padding: '8px 12px', background: GREEN \+ '10', borderRadius: 6, color: GREEN, fontWeight: 700 \}\}>

                      📈 Projected: \{predictions\.next30\.trafficForecast\} visits/month

                    </div>

                  </div>

                  <div>

                    <div style=\{\{ fontSize: 12, color: textSecondary, marginBottom: 8 \}\}>Next 90 Days Forecast</div>

                    <div style=\{\{ fontSize: 28, fontWeight: 900, color: CYAN, marginBottom: 4 \}\}>\+\{predictions\.next90\.newKeywords\}</div>

                    <div style=\{\{ fontSize: 12, color: textSecondary \}\}>New Keyword Rankings</div>

                    <div style=\{\{ fontSize: 11, marginTop: 8, padding: '8px 12px', background: CYAN \+ '20', borderRadius: 6, color: CYAN, fontWeight: 700 \}\}>

                      🎯 Market Share: \+\{predictions\.next90\.marketShare\}

                    </div>

                  </div>

                </div>

              </div>

              \{/\* Risk Matrix \*/\}

              <div style=\{\{ background: cardBg, borderRadius: 12, padding: '24px', border: \`1px solid $\{borderColor\}\` \}\}>

                <h3 style=\{\{ fontSize: 16, fontWeight: 800, margin: '0 0 20px', color: textPrimary \}\}>⚠️ Risk Intelligence</h3>

                \{predictions\.risks\.map\(\(r, i\) => \(

                  <div key=\{i\} style=\{\{ padding: '12px 16px', background: darkMode ? 'rgba\(255,255,255,0\.05\)' : '\#f8f9fa', borderRadius: 8, marginBottom: 10, display: 'flex', justifyContent: 'space\-between', alignItems: 'center' \}\}>

                    <div>

                      <div style=\{\{ fontWeight: 700, color: textPrimary, marginBottom: 4 \}\}>\{r\.risk\}</div>

                      <div style=\{\{ fontSize: 12, color: textSecondary \}\}>Probability: \{r\.probability\}% | Impact: \{r\.impact\}</div>

                    </div>

                    <button style=\{\{ background: ORANGE, color: '\#fff', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 700 \}\}>

                      → \{r\.mitigation\}

                    </button>

                  </div>

                \)\)\}

              </div>

            </div>

          \)\}

          \{dashboardView === 'operational' && \(

            <div>

              \{/\* Charts \*/\}

              <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 \}\}>

                \{/\* Keyword Performance \*/\}

                <div style=\{\{ background: cardBg, borderRadius: 12, padding: '20px', border: \`1px solid $\{borderColor\}\` \}\}>

                  <h3 style=\{\{ fontSize: 14, fontWeight: 800, margin: '0 0 16px', color: textPrimary \}\}>📈 Keyword Performance Trend</h3>

                  <ResponsiveContainer width="100%" height=\{300\}>

                    <AreaChart data=\{seoData\.operational\.keywordData\}>

                      <defs>

                        <linearGradient id="colorRank" x1="0" y1="0" x2="0" y2="1">

                          <stop offset="5%" stopColor=\{GREEN\} stopOpacity=\{0\.3\}/>

                          <stop offset="95%" stopColor=\{GREEN\} stopOpacity=\{0\}/>

                        </linearGradient>

                      </defs>

                      <CartesianGrid strokeDasharray="3 3" stroke=\{borderColor\} />

                      <XAxis dataKey="date" stroke=\{textSecondary\} />

                      <YAxis stroke=\{textSecondary\} />

                      <Tooltip contentStyle=\{\{ background: cardBg, border: \`1px solid $\{borderColor\}\`, color: textPrimary \}\} />

                      <Area type="monotone" dataKey="rank" stroke=\{GREEN\} fillOpacity=\{1\} fill="url\(\#colorRank\)" />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

                \{/\* Traffic Attribution \*/\}

                <div style=\{\{ background: cardBg, borderRadius: 12, padding: '20px', border: \`1px solid $\{borderColor\}\` \}\}>

                  <h3 style=\{\{ fontSize: 14, fontWeight: 800, margin: '0 0 16px', color: textPrimary \}\}>🚀 Traffic Attribution</h3>

                  <ResponsiveContainer width="100%" height=\{300\}>

                    <BarChart data=\{seoData\.operational\.keywordData\}>

                      <CartesianGrid strokeDasharray="3 3" stroke=\{borderColor\} />

                      <XAxis dataKey="date" stroke=\{textSecondary\} />

                      <YAxis stroke=\{textSecondary\} />

                      <Tooltip contentStyle=\{\{ background: cardBg, border: \`1px solid $\{borderColor\}\`, color: textPrimary \}\} />

                      <Bar dataKey="traffic" fill=\{GREEN\} radius=\{\[8, 8, 0, 0\]\} />

                      <Bar dataKey="impressions" fill=\{GOLD\} radius=\{\[8, 8, 0, 0\]\} />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

              \{/\* Anomaly Detection \*/\}

              \{showAnomalies && \(

                <div style=\{\{ background: cardBg, borderRadius: 12, padding: '20px', border: \`1px solid $\{borderColor\}\`, marginBottom: 32 \}\}>

                  <h3 style=\{\{ fontSize: 14, fontWeight: 800, margin: '0 0 16px', color: textPrimary \}\}>🔔 Anomaly Detection</h3>

                  \{seoData\.operational\.anomalies\.map\(\(a, i\) => \(

                    <div key=\{i\} style=\{\{ padding: '12px 16px', background: a\.type === 'spike' ? GREEN \+ '10' : RED \+ '10', borderRadius: 8, borderLeft: \`3px solid $\{a\.type === 'spike' ? GREEN : RED\}\`, marginBottom: 10 \}\}>

                      <div style=\{\{ fontWeight: 700, color: textPrimary, marginBottom: 4 \}\}>\{a\.date\}: \{a\.type\.toUpperCase\(\)\}</div>

                      <div style=\{\{ fontSize: 12, color: textSecondary \}\}>\{a\.metric\} \{a\.value\} — \{a\.reason\}</div>

                    </div>

                  \)\)\}

                </div>

              \)\}

              \{/\* Opportunities \*/\}

              <div style=\{\{ background: cardBg, borderRadius: 12, padding: '20px', border: \`1px solid $\{borderColor\}\` \}\}>

                <h3 style=\{\{ fontSize: 14, fontWeight: 800, margin: '0 0 16px', color: textPrimary \}\}>💎 Top Ranking Opportunities</h3>

                \{seoData\.operational\.topOpportunities\.map\(\(opp, i\) => \(

                  <div key=\{i\} style=\{\{ padding: '12px 16px', background: darkMode ? 'rgba\(255,255,255,0\.05\)' : '\#f8f9fa', borderRadius: 8, marginBottom: 10 \}\}>

                    <div style=\{\{ fontWeight: 700, color: textPrimary, marginBottom: 4 \}\}>\{opp\.keyword\}</div>

                    <div style=\{\{ fontSize: 12, color: textSecondary \}\}>

                      Rank Gap: \{opp\.gap\} | Search Volume: \{opp\.volume\.toLocaleString\(\)\} | Potential: \{opp\.potential\}

                    </div>

                  </div>

                \)\)\}

              </div>

            </div>

          \)\}

          \{dashboardView === 'strategic' && \(

            <div>

              \{/\* Competitive Benchmarking \*/\}

              <div style=\{\{ background: cardBg, borderRadius: 12, padding: '24px', border: \`1px solid $\{borderColor\}\`, marginBottom: 32 \}\}>

                <h3 style=\{\{ fontSize: 16, fontWeight: 800, margin: '0 0 20px', color: textPrimary \}\}>⚔️ Competitive Benchmarking</h3>

                <div style=\{\{ overflowX: 'auto' \}\}>

                  <table style=\{\{ width: '100%', borderCollapse: 'collapse' \}\}>

                    <thead>

                      <tr style=\{\{ borderBottom: \`2px solid $\{borderColor\}\` \}\}>

                        <th style=\{\{ padding: '12px', textAlign: 'left', fontWeight: 700, color: textSecondary \}\}>Competitor</th>

                        <th style=\{\{ padding: '12px', textAlign: 'center', fontWeight: 700, color: textSecondary \}\}>Visibility</th>

                        <th style=\{\{ padding: '12px', textAlign: 'center', fontWeight: 700, color: textSecondary \}\}>Keywords</th>

                        <th style=\{\{ padding: '12px', textAlign: 'center', fontWeight: 700, color: textSecondary \}\}>Authority</th>

                        <th style=\{\{ padding: '12px', textAlign: 'center', fontWeight: 700, color: textSecondary \}\}>Trend</th>

                      </tr>

                    </thead>

                    <tbody>

                      \{seoData\.strategic\.competitors\.map\(\(c, i\) => \(

                        <tr key=\{i\} style=\{\{ borderBottom: \`1px solid $\{borderColor\}\` \}\}>

                          <td style=\{\{ padding: '12px', fontWeight: c\.name === 'Home\-Link \(You\)' ? 800 : 600, color: textPrimary \}\}>

                            \{c\.name === 'Home\-Link \(You\)' && '🟢 '\} \{c\.name\}

                          </td>

                          <td style=\{\{ padding: '12px', textAlign: 'center', color: textPrimary \}\}>\{c\.visibility\}%</td>

                          <td style=\{\{ padding: '12px', textAlign: 'center', color: textPrimary \}\}>\{c\.keywords\.toLocaleString\(\)\}</td>

                          <td style=\{\{ padding: '12px', textAlign: 'center', color: textPrimary \}\}>\{c\.authority\}</td>

                          <td style=\{\{ padding: '12px', textAlign: 'center', color: c\.trend === 'up' ? GREEN : c\.trend === 'down' ? RED : GOLD, fontWeight: 700 \}\}>

                            \{c\.trend === 'up' ? '↑' : c\.trend === 'down' ? '↓' : '→'\}

                          </td>

                        </tr>

                      \)\)\}

                    </tbody>

                  </table>

                </div>

              </div>

              \{/\* Market Trends \*/\}

              <div style=\{\{ background: cardBg, borderRadius: 12, padding: '24px', border: \`1px solid $\{borderColor\}\` \}\}>

                <h3 style=\{\{ fontSize: 16, fontWeight: 800, margin: '0 0 20px', color: textPrimary \}\}>📊 Market Trends & Volume</h3>

                <ResponsiveContainer width="100%" height=\{400\}>

                  <LineChart data=\{seoData\.strategic\.marketTrends\}>

                    <CartesianGrid strokeDasharray="3 3" stroke=\{borderColor\} />

                    <XAxis dataKey="month" stroke=\{textSecondary\} />

                    <YAxis stroke=\{textSecondary\} yAxisId="left" />

                    <YAxis stroke=\{textSecondary\} yAxisId="right" orientation="right" />

                    <Tooltip contentStyle=\{\{ background: cardBg, border: \`1px solid $\{borderColor\}\`, color: textPrimary \}\} />

                    <Legend />

                    <Line yAxisId="left" type="monotone" dataKey="volume" stroke=\{CYAN\} strokeWidth=\{2\} name="Search Volume" />

                    <Line yAxisId="right" type="monotone" dataKey="avgCPC" stroke=\{GOLD\} strokeWidth=\{2\} name="Avg CPC \($\)" />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>

          \)\}

        </div>

      </div>

      \{/\* Footer \*/\}

      <div style=\{\{ background: cardBg, borderTop: \`1px solid $\{borderColor\}\`, padding: '20px 32px', textAlign: 'center', marginTop: 32, color: textSecondary, fontSize: 12 \}\}>

        Real\-time data updated every 60 seconds | Last sync: \{new Date\(\)\.toLocaleTimeString\(\)\} | Enterprise Grade Analytics

      </div>

    </div>

  \);

\}
