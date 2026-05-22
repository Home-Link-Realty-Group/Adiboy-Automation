# New Microsoft Word Document (50)

Source: New Microsoft Word Document (50).docx

/\*\*

 \* AnalyticsTab — GA4 \+ Search Console \+ Funnel Exit Analysis

 \* Extracted from HQ to keep the main file within size limits\.

 \*/

import FunnelAnalysis from "@/components/HQ/FunnelAnalysis";

export default function AnalyticsTab\(\{ analytics, analyticsLoading, analyticsError, loadAnalytics \}\) \{

  return \(

    <div style=\{\{ animation: "slide 0\.3s ease" \}\}>

      \{/\* ── Header Bar ── \*/\}

      <div style=\{\{ display: "flex", alignItems: "center", justifyContent: "space\-between", marginBottom: 24 \}\}>

        <div>

          <div style=\{\{ fontSize: 20, fontWeight: 900, color: "\#f1f5f9", letterSpacing: "\-0\.5px" \}\}>📊 Website Analytics</div>

          <div style=\{\{ fontSize: 12, color: "\#334155", marginTop: 3 \}\}>Google Analytics 4 · homelinkrealtygroup\.com · Last 30 days</div>

        </div>

        <div style=\{\{ display: "flex", alignItems: "center", gap: 10 \}\}>

          \{analytics && \(

            <div style=\{\{ fontSize: 10, color: "\#1e3a5f", textAlign: "right" \}\}>

              <div>Last updated</div>

              <div style=\{\{ color: "\#334155" \}\}>\{new Date\(analytics\.fetched\_at\)\.toLocaleTimeString\("en\-US", \{ timeZone: "America/Chicago", hour: "2\-digit", minute: "2\-digit" \}\)\} CT</div>

            </div>

          \)\}

          <button onClick=\{loadAnalytics\} disabled=\{analyticsLoading\}

            style=\{\{ background: analyticsLoading ? "\#0d1520" : "linear\-gradient\(135deg, \#0B1F45, \#0f1e30\)", border: "1px solid \#22c55e44", color: analyticsLoading ? "\#334155" : "\#22c55e", borderRadius: 8, padding: "10px 20px", fontSize: 12, fontWeight: 800, cursor: analyticsLoading ? "not\-allowed" : "pointer", display: "flex", alignItems: "center", gap: 6 \}\}>

            <span style=\{\{ display: "inline\-block", animation: analyticsLoading ? "spin 1s linear infinite" : "none" \}\}>↻</span>

            \{analyticsLoading ? "Refreshing\.\.\." : "Refresh Data"\}

          </button>

        </div>

      </div>

      \{analyticsError && \(

        <div style=\{\{ background: "rgba\(239,68,68,0\.08\)", border: "1px solid rgba\(239,68,68,0\.3\)", borderRadius: 12, padding: "16px 20px", color: "\#f87171", marginBottom: 20, fontSize: 13, display: "flex", alignItems: "center", gap: 10 \}\}>

          <span style=\{\{ fontSize: 18 \}\}>⚠️</span>

          <div>

            <div style=\{\{ fontWeight: 700, marginBottom: 2 \}\}>Failed to load analytics</div>

            <div style=\{\{ fontSize: 11, color: "\#ef4444aa" \}\}>\{analyticsError\}</div>

          </div>

        </div>

      \)\}

      \{analyticsLoading && \!analytics && \(

        <div style=\{\{ textAlign: "center", padding: 80, color: "\#334155" \}\}>

          <div style=\{\{ fontSize: 48, marginBottom: 16, opacity: 0\.4 \}\}>📊</div>

          <div style=\{\{ fontSize: 14, fontWeight: 600 \}\}>Pulling live data from Google Analytics\.\.\.</div>

          <div style=\{\{ fontSize: 11, marginTop: 6, color: "\#1e3a5f" \}\}>This takes 2–3 seconds</div>

        </div>

      \)\}

      \{\!analytics && \!analyticsLoading && \(

        <div style=\{\{ textAlign: "center", padding: 60, color: "\#334155" \}\}>

          <div style=\{\{ fontSize: 40, marginBottom: 12, opacity: 0\.3 \}\}>📊</div>

          <div style=\{\{ fontSize: 14, fontWeight: 600, marginBottom: 8 \}\}>No data loaded yet</div>

          <button onClick=\{loadAnalytics\} style=\{\{ background: "\#22c55e", color: "\#000", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 13, fontWeight: 800, cursor: "pointer" \}\}>Load Analytics →</button>

        </div>

      \)\}

      \{analytics && \(\(\) => \{

        const ov = analytics\.ga\.overview;

        const sessions    = parseInt\(ov\[0\]?\.value || 0\);

        const users       = parseInt\(ov\[1\]?\.value || 0\);

        const newUsers    = parseInt\(ov\[2\]?\.value || 0\);

        const bounceRate  = parseFloat\(ov\[3\]?\.value || 0\);

        const avgDuration = parseFloat\(ov\[4\]?\.value || 0\);

        const pageViews   = parseInt\(ov\[5\]?\.value || 0\);

        const minutes     = Math\.floor\(avgDuration / 60\);

        const secs        = Math\.floor\(avgDuration % 60\);

        const returningUsers = users \- newUsers;

        const pagesPerSession = sessions > 0 ? \(pageViews / sessions\)\.toFixed\(1\) : "0";

        return \(

          <div>

            \{/\* ══ ROW 1: KPI TILES ══ \*/\}

            <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(4, 1fr\)", gap: 12, marginBottom: 20 \}\}>

              \{\[

                \{ icon: "👥", label: "Total Users", value: users, sub: \`$\{returningUsers\} returning\`, color: "\#3b82f6" \},

                \{ icon: "🔁", label: "Sessions", value: sessions, sub: \`$\{pagesPerSession\} pages/session\`, color: "\#8b5cf6" \},

                \{ icon: "📄", label: "Page Views", value: pageViews, sub: \`$\{newUsers\} new users\`, color: "\#f59e0b" \},

                \{ icon: "⏱️", label: "Avg Duration", value: \`$\{minutes\}m $\{secs\}s\`, sub: bounceRate > 0 ? \`$\{\(bounceRate\*100\)\.toFixed\(0\)\}% bounce rate\` : "Engaged sessions", color: "\#06b6d4" \},

              \]\.map\(k => \(

                <div key=\{k\.label\} style=\{\{ background: "linear\-gradient\(145deg, \#0d1520, \#0a111e\)", border: \`1px solid $\{k\.color\}33\`, borderRadius: 14, padding: "18px 20px", position: "relative", overflow: "hidden" \}\}>

                  <div style=\{\{ position: "absolute", top: 12, right: 14, fontSize: 22, opacity: 0\.15 \}\}>\{k\.icon\}</div>

                  <div style=\{\{ fontSize: 11, color: "\#334155", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0\.5px", marginBottom: 8 \}\}>\{k\.label\}</div>

                  <div style=\{\{ fontSize: 28, fontWeight: 900, color: k\.color, lineHeight: 1 \}\}>\{k\.value\}</div>

                  <div style=\{\{ fontSize: 10, color: "\#1e3a5f", marginTop: 6 \}\}>\{k\.sub\}</div>

                  <div style=\{\{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: \`linear\-gradient\(90deg, $\{k\.color\}66, transparent\)\` \}\} />

                </div>

              \)\)\}

            </div>

            \{/\* ══ ROW 2: SECOND TIER METRICS ══ \*/\}

            <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(4, 1fr\)", gap: 12, marginBottom: 24 \}\}>

              \{\[

                \{ icon: "🆕", label: "New Users", value: newUsers, sub: \`$\{users > 0 ? Math\.round\(\(newUsers/users\)\*100\) : 0\}% of total\`, color: "\#22c55e" \},

                \{ icon: "↩️", label: "Bounce Rate", value: \`$\{\(bounceRate\*100\)\.toFixed\(1\)\}%\`, sub: bounceRate > 0\.7 ? "⚠️ High — improve page" : bounceRate > 0\.4 ? "Average" : "✅ Excellent", color: bounceRate > 0\.7 ? "\#ef4444" : bounceRate > 0\.4 ? "\#f59e0b" : "\#22c55e" \},

                \{ icon: "📱", label: "Top Device", value: analytics\.ga\.deviceBreakdown\[0\]?\.dimensionValues\[0\]?\.value?\.charAt\(0\)\.toUpperCase\(\) \+ \(analytics\.ga\.deviceBreakdown\[0\]?\.dimensionValues\[0\]?\.value?\.slice\(1\) || ""\), sub: \`$\{analytics\.ga\.deviceBreakdown\[0\] ? Math\.round\(\(parseInt\(analytics\.ga\.deviceBreakdown\[0\]?\.metricValues\[0\]?\.value||0\) / sessions\) \* 100\) : 0\}% of sessions\`, color: "\#a855f7" \},

                \{ icon: "🌐", label: "Top Source", value: analytics\.ga\.trafficSources\[0\]?\.dimensionValues\[0\]?\.value === "\(direct\)" ? "Direct" : \(analytics\.ga\.trafficSources\[0\]?\.dimensionValues\[0\]?\.value || "—"\), sub: \`$\{analytics\.ga\.trafficSources\[0\]?\.metricValues\[0\]?\.value || 0\} sessions\`, color: "\#f97316" \},

              \]\.map\(k => \(

                <div key=\{k\.label\} style=\{\{ background: "\#0d1520", border: \`1px solid $\{k\.color\}22\`, borderRadius: 12, padding: "14px 16px" \}\}>

                  <div style=\{\{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 \}\}>

                    <span style=\{\{ fontSize: 14 \}\}>\{k\.icon\}</span>

                    <span style=\{\{ fontSize: 10, color: "\#334155", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0\.5px" \}\}>\{k\.label\}</span>

                  </div>

                  <div style=\{\{ fontSize: 18, fontWeight: 900, color: k\.color \}\}>\{k\.value\}</div>

                  <div style=\{\{ fontSize: 10, color: "\#1e3a5f", marginTop: 4 \}\}>\{k\.sub\}</div>

                </div>

              \)\)\}

            </div>

            \{/\* ══ FUNNEL EXIT ANALYSIS ══ \*/\}

            <div style=\{\{ marginBottom: 24 \}\}>

              <FunnelAnalysis funnelData=\{analytics\.ga\.funnelData || \[\]\} />

            </div>

            \{/\* ══ ROW 3: TRAFFIC TREND CHART ══ \*/\}

            \{analytics\.ga\.dailyTrend\.length > 0 && \(

              <div style=\{\{ background: "linear\-gradient\(145deg, \#0d1520, \#0a111e\)", border: "1px solid \#0B1F45", borderRadius: 14, padding: "20px 24px", marginBottom: 20 \}\}>

                <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 20 \}\}>

                  <div>

                    <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 14 \}\}>📈 Daily Traffic Trend</div>

                    <div style=\{\{ fontSize: 11, color: "\#334155", marginTop: 2 \}\}>Sessions per day — last 30 days</div>

                  </div>

                  <div style=\{\{ display: "flex", gap: 16, fontSize: 11, color: "\#334155" \}\}>

                    <div style=\{\{ display: "flex", alignItems: "center", gap: 5 \}\}>

                      <div style=\{\{ width: 10, height: 10, background: "\#3b82f6", borderRadius: 2 \}\} />Sessions

                    </div>

                    <div style=\{\{ display: "flex", alignItems: "center", gap: 5 \}\}>

                      <div style=\{\{ width: 10, height: 10, background: "\#22c55e44", borderRadius: 2 \}\} />Users

                    </div>

                  </div>

                </div>

                <div style=\{\{ position: "relative", height: 120 \}\}>

                  <div style=\{\{ display: "flex", alignItems: "flex\-end", gap: 2, height: 100, paddingBottom: 20 \}\}>

                    \{\(\(\) => \{

                      const trend = analytics\.ga\.dailyTrend;

                      const maxS = Math\.max\(\.\.\.trend\.map\(r => parseInt\(r\.metricValues\[0\]?\.value || 0\)\), 1\);

                      const maxU = Math\.max\(\.\.\.trend\.map\(r => parseInt\(r\.metricValues\[1\]?\.value || 0\)\), 1\);

                      return trend\.map\(\(r, i\) => \{

                        const s = parseInt\(r\.metricValues\[0\]?\.value || 0\);

                        const u = parseInt\(r\.metricValues\[1\]?\.value || 0\);

                        const hS = Math\.max\(\(s / maxS\) \* 80, s > 0 ? 4 : 0\);

                        const hU = Math\.max\(\(u / maxU\) \* 80, u > 0 ? 4 : 0\);

                        const dateStr = r\.dimensionValues\[0\]?\.value || "";

                        const label = \(dateStr\.slice\(4,6\)\) \+ "/" \+ dateStr\.slice\(6,8\);

                        return \(

                          <div key=\{i\} style=\{\{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex\-end", gap: 1, height: 100 \}\}

                            title=\{\`$\{label\}: $\{s\} sessions, $\{u\} users\`\}>

                            <div style=\{\{ display: "flex", alignItems: "flex\-end", gap: 1, width: "100%" \}\}>

                              <div style=\{\{ flex: 1, height: hS, background: s > 0 ? "linear\-gradient\(180deg, \#3b82f6, \#1d4ed8\)" : "\#0a111e", borderRadius: "2px 2px 0 0", transition: "height 0\.3s ease" \}\} />

                              <div style=\{\{ flex: 1, height: hU, background: u > 0 ? "linear\-gradient\(180deg, \#22c55e66, \#16a34a44\)" : "\#0a111e", borderRadius: "2px 2px 0 0", transition: "height 0\.3s ease" \}\} />

                            </div>

                            \{i % Math\.ceil\(trend\.length / 8\) === 0 && \(

                              <div style=\{\{ fontSize: 8, color: "\#1e3a5f", marginTop: 4, whiteSpace: "nowrap" \}\}>\{label\}</div>

                            \)\}

                          </div>

                        \);

                      \}\);

                    \}\)\(\)\}

                  </div>

                </div>

              </div>

            \)\}

            \{/\* ══ ROW 4: TOP PAGES \+ TRAFFIC SOURCES ══ \*/\}

            <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 \}\}>

              <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 14, padding: "18px 20px" \}\}>

                <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 16 \}\}>

                  <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 13 \}\}>🏆 Top Pages</div>

                  <div style=\{\{ fontSize: 10, color: "\#334155" \}\}>by sessions</div>

                </div>

                \{analytics\.ga\.topPages\.length === 0 ? \(

                  <div style=\{\{ color: "\#334155", fontSize: 12, padding: "20px 0", textAlign: "center" \}\}>No page data yet</div>

                \) : analytics\.ga\.topPages\.map\(\(r, i\) => \{

                  const path = r\.dimensionValues\[0\]?\.value || "/";

                  const s = parseInt\(r\.metricValues\[0\]?\.value || 0\);

                  const v = parseInt\(r\.metricValues\[1\]?\.value || 0\);

                  const maxS = parseInt\(analytics\.ga\.topPages\[0\]?\.metricValues\[0\]?\.value || 1\);

                  const pct = Math\.round\(\(s / maxS\) \* 100\);

                  const barColors = \["\#3b82f6","\#8b5cf6","\#22c55e","\#f59e0b","\#ef4444","\#06b6d4","\#f97316","\#a855f7","\#ec4899","\#14b8a6"\];

                  return \(

                    <div key=\{i\} style=\{\{ marginBottom: 12 \}\}>

                      <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 4 \}\}>

                        <div style=\{\{ flex: 1, minWidth: 0 \}\}>

                          <div style=\{\{ fontSize: 11, color: "\#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 600 \}\}>

                            \{path === "/" ? "🏠 Home" : path\}

                          </div>

                          <div style=\{\{ fontSize: 9, color: "\#1e3a5f", marginTop: 1 \}\}>\{v\} views</div>

                        </div>

                        <div style=\{\{ fontSize: 13, fontWeight: 800, color: barColors\[i % barColors\.length\], marginLeft: 8 \}\}>\{s\}</div>

                      </div>

                      <div style=\{\{ background: "\#0a111e", borderRadius: 4, height: 5 \}\}>

                        <div style=\{\{ width: \`$\{pct\}%\`, height: 5, background: \`linear\-gradient\(90deg, $\{barColors\[i % barColors\.length\]\}, $\{barColors\[i % barColors\.length\]\}88\)\`, borderRadius: 4, transition: "width 0\.5s ease" \}\} />

                      </div>

                    </div>

                  \);

                \}\)\}

              </div>

              <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 14, padding: "18px 20px" \}\}>

                <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 16 \}\}>

                  <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 13 \}\}>🚦 Traffic Sources</div>

                  <div style=\{\{ fontSize: 10, color: "\#334155" \}\}>by sessions</div>

                </div>

                \{analytics\.ga\.trafficSources\.length === 0 ? \(

                  <div style=\{\{ color: "\#334155", fontSize: 12, padding: "20px 0", textAlign: "center" \}\}>No source data yet</div>

                \) : \(\(\) => \{

                  const total = analytics\.ga\.trafficSources\.reduce\(\(a, r\) => a \+ parseInt\(r\.metricValues\[0\]?\.value || 0\), 0\);

                  const colors = \["\#3b82f6","\#22c55e","\#f59e0b","\#8b5cf6","\#ef4444","\#06b6d4","\#f97316","\#a855f7"\];

                  const sourceIcons = \{ "\(direct\)": "🔗", "google": "🔍", "facebook": "📘", "instagram": "📸", "craigslist": "📋", "referral": "↗️", "organic": "🌱" \};

                  return analytics\.ga\.trafficSources\.map\(\(r, i\) => \{

                    const source = r\.dimensionValues\[0\]?\.value || "unknown";

                    const medium = r\.dimensionValues\[1\]?\.value || "none";

                    const s = parseInt\(r\.metricValues\[0\]?\.value || 0\);

                    const pct = total > 0 ? Math\.round\(\(s / total\) \* 100\) : 0;

                    const icon = sourceIcons\[source\.toLowerCase\(\)\] || "🌐";

                    return \(

                      <div key=\{i\} style=\{\{ marginBottom: 12 \}\}>

                        <div style=\{\{ display: "flex", alignItems: "center", justifyContent: "space\-between", marginBottom: 4 \}\}>

                          <div style=\{\{ display: "flex", alignItems: "center", gap: 7 \}\}>

                            <span style=\{\{ fontSize: 13 \}\}>\{icon\}</span>

                            <div>

                              <div style=\{\{ fontSize: 11, fontWeight: 700, color: "\#f1f5f9" \}\}>\{source === "\(direct\)" ? "Direct / Type\-in" : source\}</div>

                              <div style=\{\{ fontSize: 9, color: "\#334155" \}\}>\{medium\} · \{pct\}%</div>

                            </div>

                          </div>

                          <div style=\{\{ fontSize: 14, fontWeight: 900, color: colors\[i % colors\.length\] \}\}>\{s\}</div>

                        </div>

                        <div style=\{\{ background: "\#0a111e", borderRadius: 4, height: 4 \}\}>

                          <div style=\{\{ width: \`$\{pct\}%\`, height: 4, background: colors\[i % colors\.length\], borderRadius: 4, transition: "width 0\.5s ease" \}\} />

                        </div>

                      </div>

                    \);

                  \}\);

                \}\)\(\)\}

              </div>

            </div>

            \{/\* ══ ROW 5: DEVICE BREAKDOWN \+ SEO HEALTH ══ \*/\}

            <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 \}\}>

              <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 14, padding: "18px 20px" \}\}>

                <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 13, marginBottom: 16 \}\}>📱 Device Breakdown</div>

                \{analytics\.ga\.deviceBreakdown\.length === 0 ? \(

                  <div style=\{\{ color: "\#334155", fontSize: 12 \}\}>No data</div>

                \) : \(\(\) => \{

                  const total = analytics\.ga\.deviceBreakdown\.reduce\(\(a, r\) => a \+ parseInt\(r\.metricValues\[0\]?\.value || 0\), 0\);

                  const deviceConfig = \{

                    mobile:  \{ icon: "📱", color: "\#22c55e", label: "Mobile" \},

                    desktop: \{ icon: "🖥️", color: "\#3b82f6", label: "Desktop" \},

                    tablet:  \{ icon: "📲", color: "\#f59e0b", label: "Tablet" \},

                  \};

                  return \(

                    <div>

                      <div style=\{\{ display: "flex", gap: 12, marginBottom: 16 \}\}>

                        \{analytics\.ga\.deviceBreakdown\.map\(\(r, i\) => \{

                          const d = r\.dimensionValues\[0\]?\.value || "unknown";

                          const s = parseInt\(r\.metricValues\[0\]?\.value || 0\);

                          const pct = total > 0 ? Math\.round\(\(s / total\) \* 100\) : 0;

                          const cfg = deviceConfig\[d\] || \{ icon: "💻", color: "\#94a3b8", label: d \};

                          return \(

                            <div key=\{i\} style=\{\{ flex: 1, background: "\#0a111e", borderRadius: 10, padding: "14px 12px", textAlign: "center" \}\}>

                              <div style=\{\{ fontSize: 24, marginBottom: 6 \}\}>\{cfg\.icon\}</div>

                              <div style=\{\{ fontSize: 24, fontWeight: 900, color: cfg\.color \}\}>\{pct\}%</div>

                              <div style=\{\{ fontSize: 10, color: "\#334155", marginTop: 3 \}\}>\{cfg\.label\}</div>

                              <div style=\{\{ fontSize: 9, color: "\#1e3a5f", marginTop: 2 \}\}>\{s\} sessions</div>

                            </div>

                          \);

                        \}\)\}

                      </div>

                      <div style=\{\{ height: 8, borderRadius: 8, overflow: "hidden", display: "flex" \}\}>

                        \{analytics\.ga\.deviceBreakdown\.map\(\(r, i\) => \{

                          const d = r\.dimensionValues\[0\]?\.value || "unknown";

                          const s = parseInt\(r\.metricValues\[0\]?\.value || 0\);

                          const pct = total > 0 ? \(s / total\) \* 100 : 0;

                          const cfg = deviceConfig\[d\] || \{ color: "\#94a3b8" \};

                          return <div key=\{i\} style=\{\{ width: \`$\{pct\}%\`, background: cfg\.color, transition: "width 0\.5s" \}\} />;

                        \}\)\}

                      </div>

                    </div>

                  \);

                \}\)\(\)\}

              </div>

              <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 14, padding: "18px 20px" \}\}>

                <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 13, marginBottom: 16 \}\}>🔍 SEO Health Check</div>

                \{\[

                  \{ label: "Organic Traffic", value: analytics\.ga\.trafficSources\.find\(r => r\.dimensionValues\[1\]?\.value === "organic"\)?\.metricValues\[0\]?\.value || "0", status: "organic", target: "Target: 30\+ sessions/mo" \},

                  \{ label: "Direct Traffic", value: analytics\.ga\.trafficSources\.find\(r => r\.dimensionValues\[0\]?\.value === "\(direct\)"\)?\.metricValues\[0\]?\.value || "0", status: "direct", target: "Brand awareness metric" \},

                  \{ label: "Referral Traffic", value: analytics\.ga\.trafficSources\.filter\(r => r\.dimensionValues\[1\]?\.value === "referral"\)\.reduce\(\(a, r\) => a \+ parseInt\(r\.metricValues\[0\]?\.value || 0\), 0\), status: "referral", target: "Craigslist \+ backlinks" \},

                  \{ label: "Pages Indexed", value: analytics\.ga\.topPages\.length, status: "indexed", target: \`$\{analytics\.ga\.topPages\.length\} pages tracked\` \},

                \]\.map\(\(item, i\) => \{

                  const val = parseInt\(item\.value\) || 0;

                  const isGood = \(item\.status === "organic" && val > 5\) || \(item\.status === "direct" && val > 10\) || \(item\.status === "referral" && val > 0\) || \(item\.status === "indexed" && val > 3\);

                  return \(

                    <div key=\{i\} style=\{\{ display: "flex", alignItems: "center", justifyContent: "space\-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid \#0a111e" : "none" \}\}>

                      <div>

                        <div style=\{\{ fontSize: 11, fontWeight: 700, color: "\#94a3b8" \}\}>\{item\.label\}</div>

                        <div style=\{\{ fontSize: 9, color: "\#1e3a5f", marginTop: 2 \}\}>\{item\.target\}</div>

                      </div>

                      <div style=\{\{ display: "flex", alignItems: "center", gap: 8 \}\}>

                        <div style=\{\{ fontSize: 16, fontWeight: 900, color: isGood ? "\#22c55e" : "\#f59e0b" \}\}>\{val\}</div>

                        <div style=\{\{ fontSize: 14 \}\}>\{isGood ? "✅" : "⚡"\}</div>

                      </div>

                    </div>

                  \);

                \}\)\}

              </div>

            </div>

            \{/\* ══ ROW 6: SEARCH CONSOLE KEYWORDS ══ \*/\}

            \{analytics\.sc?\.keywords?\.length > 0 ? \(

              <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 14, padding: "18px 20px", marginBottom: 20 \}\}>

                <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 16 \}\}>

                  <div>

                    <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 13 \}\}>🔍 Top Search Keywords</div>

                    <div style=\{\{ fontSize: 10, color: "\#334155", marginTop: 2 \}\}>Google Search Console · Last 28 days</div>

                  </div>

                  <div style=\{\{ fontSize: 10, color: "\#22c55e", background: "rgba\(34,197,94,0\.1\)", border: "1px solid rgba\(34,197,94,0\.2\)", borderRadius: 6, padding: "3px 10px" \}\}>LIVE</div>

                </div>

                <table style=\{\{ width: "100%", borderCollapse: "collapse" \}\}>

                  <thead>

                    <tr style=\{\{ borderBottom: "1px solid \#0B1F45" \}\}>

                      \{\["\#", "Keyword", "Clicks", "Impressions", "CTR", "Avg Position"\]\.map\(h => \(

                        <th key=\{h\} style=\{\{ textAlign: h === "Keyword" || h === "\#" ? "left" : "right", padding: "6px 10px", fontSize: 10, color: "\#334155", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0\.5px" \}\}>\{h\}</th>

                      \)\)\}

                    </tr>

                  </thead>

                  <tbody>

                    \{analytics\.sc\.keywords\.map\(\(r, i\) => \(

                      <tr key=\{i\} style=\{\{ borderBottom: "1px solid \#0a111e" \}\}

                        onMouseEnter=\{e => e\.currentTarget\.style\.background = "\#0a111e"\}

                        onMouseLeave=\{e => e\.currentTarget\.style\.background = "transparent"\}>

                        <td style=\{\{ padding: "9px 10px", fontSize: 11, color: "\#1e3a5f", fontWeight: 700 \}\}>\{i \+ 1\}</td>

                        <td style=\{\{ padding: "9px 10px", fontSize: 12, color: "\#94a3b8", fontWeight: 600 \}\}>\{r\.keys?\.\[0\] || "—"\}</td>

                        <td style=\{\{ padding: "9px 10px", textAlign: "right", fontSize: 13, fontWeight: 800, color: "\#22c55e" \}\}>\{r\.clicks || 0\}</td>

                        <td style=\{\{ padding: "9px 10px", textAlign: "right", fontSize: 12, color: "\#f1f5f9" \}\}>\{\(r\.impressions || 0\)\.toLocaleString\(\)\}</td>

                        <td style=\{\{ padding: "9px 10px", textAlign: "right", fontSize: 12, color: "\#f59e0b", fontWeight: 700 \}\}>\{\(\(r\.ctr || 0\) \* 100\)\.toFixed\(1\)\}%</td>

                        <td style=\{\{ padding: "9px 10px", textAlign: "right", fontSize: 12, color: \(r\.position || 99\) <= 10 ? "\#22c55e" : \(r\.position || 99\) <= 20 ? "\#f59e0b" : "\#ef4444", fontWeight: 700 \}\}>\#\{\(r\.position || 0\)\.toFixed\(0\)\}</td>

                      </tr>

                    \)\)\}

                  </tbody>

                </table>

              </div>

            \) : \(

              <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 14, padding: "20px 24px", marginBottom: 20 \}\}>

                <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 13, marginBottom: 8 \}\}>🔍 Search Console Keywords</div>

                <div style=\{\{ fontSize: 12, color: "\#334155" \}\}>No search keyword data available yet\. Populates once Google starts crawling your pages — usually within 2–4 weeks of going live\.</div>

                <div style=\{\{ marginTop: 12, fontSize: 11, color: "\#1e3a5f" \}\}>

                  💡 Tip: Submit your sitemap at <span style=\{\{ color: "\#3b82f6" \}\}>search\.google\.com/search\-console</span> to speed up indexing\.

                </div>

              </div>

            \)\}

            \{/\* ══ FOOTER ══ \*/\}

            <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", padding: "12px 0", borderTop: "1px solid \#0a111e", fontSize: 10, color: "\#1e3a5f" \}\}>

              <span>📊 GA4 Property: Home\-Link Realty Group LLC \(527074144\)</span>

              <span>Last refreshed: \{new Date\(analytics\.fetched\_at\)\.toLocaleString\("en\-US", \{ timeZone: "America/Chicago", dateStyle: "short", timeStyle: "short" \}\)\} CT</span>

              <a href="https://analytics\.google\.com" target="\_blank" rel="noopener noreferrer" style=\{\{ color: "\#3b82f6", textDecoration: "none", fontWeight: 700 \}\}>Open GA4 ↗</a>

            </div>

          </div>

        \);

      \}\)\(\)\}

    </div>

  \);

\}
