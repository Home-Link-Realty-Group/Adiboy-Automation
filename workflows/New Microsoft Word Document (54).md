# New Microsoft Word Document (54)

Source: New Microsoft Word Document (54).docx

/\*\*

 \* FunnelAnalysis — Property Lead Funnel Exit Point Analyzer

 \* Visualizes where users drop off across the Home\-Link lead funnel:

 \*   Landing Pages → GetOffer Form → ThankYou \(Conversion\)

 \*/

const rgba = \(hex, a = 1\) => \{

  const r = parseInt\(hex\.slice\(1, 3\), 16\);

  const g = parseInt\(hex\.slice\(3, 5\), 16\);

  const b = parseInt\(hex\.slice\(5, 7\), 16\);

  return \`rgba\($\{r\},$\{g\},$\{b\},$\{a\}\)\`;

\};

const fmtDur = \(secs\) => \{

  if \(\!secs\) return "0s";

  const m = Math\.floor\(secs / 60\);

  const s = secs % 60;

  return m > 0 ? \`$\{m\}m $\{s\}s\` : \`$\{s\}s\`;

\};

// The ordered funnel we care about

const FUNNEL\_ORDER = \[

  \{ path: "/Home",              label: "Home Page",         icon: "🏠", desc: "Main landing — traffic entry point" \},

  \{ path: "/Dallas",            label: "Dallas Landing",    icon: "📍", desc: "Dallas market landing page" \},

  \{ path: "/DallasForeclosure", label: "Foreclosure Page",  icon: "⚠️", desc: "Foreclosure\-specific landing" \},

  \{ path: "/DallasInherited",   label: "Inherited Page",    icon: "📜", desc: "Inherited property landing" \},

  \{ path: "/GetOffer",          label: "Get Offer Form",    icon: "📋", desc: "4\-step lead capture form" \},

  \{ path: "/ThankYou",          label: "Conversion ✅",     icon: "🎉", desc: "Lead submitted — form complete" \},

\];

export default function FunnelAnalysis\(\{ funnelData = \[\] \}\) \{

  if \(\!funnelData || funnelData\.length === 0\) \{

    return \(

      <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 14, padding: "32px", textAlign: "center" \}\}>

        <div style=\{\{ fontSize: 36, marginBottom: 10, opacity: 0\.3 \}\}>🔻</div>

        <div style=\{\{ color: "\#475569", fontSize: 14 \}\}>No funnel data yet — load analytics to see exit points\.</div>

      </div>

    \);

  \}

  // Map GA data by path for easy lookup

  const byPath = \{\};

  funnelData\.forEach\(r => \{ byPath\[r\.path\] = r; \}\);

  // Build ordered funnel rows \(only pages that have data\)

  const orderedFunnel = FUNNEL\_ORDER\.map\(step => \(\{

    \.\.\.step,

    \.\.\.\(byPath\[step\.path\] || \{ sessions: 0, bounceRate: 0, exitRate: 0, avgDuration: 0, pageViews: 0, newUsers: 0 \}\),

  \}\)\);

  // Find max sessions for bar scaling

  const maxSessions = Math\.max\(\.\.\.orderedFunnel\.map\(s => s\.sessions\), 1\);

  // Compute conversion/drop\-off between steps

  const withDropOff = orderedFunnel\.map\(\(step, i\) => \{

    const next = orderedFunnel\[i \+ 1\];

    const dropOff = step\.sessions > 0 && next

      ? Math\.round\(\(\(step\.sessions \- next\.sessions\) / step\.sessions\) \* 100\)

      : null;

    return \{ \.\.\.step, dropOff \};

  \}\);

  // Find the biggest exit problem

  const worstExit = \[\.\.\.withDropOff\]

    \.filter\(s => s\.sessions > 0\)

    \.sort\(\(a, b\) => \(b\.exitRate || 0\) \- \(a\.exitRate || 0\)\)\[0\];

  const worstDropOff = \[\.\.\.withDropOff\]

    \.filter\(s => s\.dropOff \!== null && s\.sessions > 10\)

    \.sort\(\(a, b\) => \(b\.dropOff || 0\) \- \(a\.dropOff || 0\)\)\[0\];

  // GetOffer → ThankYou conversion rate

  const getOfferData = byPath\["/GetOffer"\];

  const thankYouData = byPath\["/ThankYou"\];

  const formConvRate = getOfferData?\.sessions > 0 && thankYouData?\.sessions > 0

    ? \(\(thankYouData\.sessions / getOfferData\.sessions\) \* 100\)\.toFixed\(1\)

    : null;

  // Total top\-of\-funnel \(landing pages combined\)

  const landingTotal = \["/Home", "/Dallas", "/DallasForeclosure", "/DallasInherited"\]

    \.reduce\(\(sum, p\) => sum \+ \(byPath\[p\]?\.sessions || 0\), 0\);

  return \(

    <div>

      \{/\* ── Header ── \*/\}

      <div style=\{\{ marginBottom: 20 \}\}>

        <div style=\{\{ fontSize: 18, fontWeight: 900, color: "\#f1f5f9", letterSpacing: "\-0\.5px", marginBottom: 4 \}\}>

          🔻 Lead Funnel Exit Analysis

        </div>

        <div style=\{\{ fontSize: 12, color: "\#475569" \}\}>

          Where are sellers dropping off before submitting their info? · Last 30 days · GA4

        </div>

      </div>

      \{/\* ── Summary KPIs ── \*/\}

      <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(4, 1fr\)", gap: 12, marginBottom: 20 \}\}>

        \{\[

          \{

            icon: "🌐", label: "Top\-of\-Funnel",

            value: landingTotal\.toLocaleString\(\),

            sub: "Total landing page sessions",

            color: "\#3b82f6",

          \},

          \{

            icon: "📋", label: "Reached Form",

            value: getOfferData?\.sessions?\.toLocaleString\(\) || "—",

            sub: getOfferData?\.sessions > 0 && landingTotal > 0

              ? \`$\{Math\.round\(\(getOfferData\.sessions / landingTotal\) \* 100\)\}% of landing traffic\`

              : "No data",

            color: "\#f59e0b",

          \},

          \{

            icon: "✅", label: "Conversions",

            value: thankYouData?\.sessions?\.toLocaleString\(\) || "—",

            sub: "Completed the form",

            color: "\#22c55e",

          \},

          \{

            icon: "📐", label: "Form Conv\. Rate",

            value: formConvRate ? \`$\{formConvRate\}%\` : "—",

            sub: "GetOffer → ThankYou",

            color: formConvRate ? \(parseFloat\(formConvRate\) >= 20 ? "\#22c55e" : parseFloat\(formConvRate\) >= 10 ? "\#f59e0b" : "\#ef4444"\) : "\#475569",

          \},

        \]\.map\(\(k, i\) => \(

          <div key=\{i\} style=\{\{ background: "\#0d1520", border: \`1px solid $\{k\.color\}22\`, borderRadius: 12, padding: "16px 18px" \}\}>

            <div style=\{\{ fontSize: 10, color: "\#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0\.5px", marginBottom: 6 \}\}>

              \{k\.icon\} \{k\.label\}

            </div>

            <div style=\{\{ fontSize: 24, fontWeight: 900, color: k\.color \}\}>\{k\.value\}</div>

            <div style=\{\{ fontSize: 10, color: "\#334155", marginTop: 4 \}\}>\{k\.sub\}</div>

          </div>

        \)\)\}

      </div>

      \{/\* ── Problem Callouts ── \*/\}

      \{\(worstExit || worstDropOff\) && \(

        <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 \}\}>

          \{worstExit && \(

            <div style=\{\{ background: rgba\("\#ef4444", 0\.06\), border: \`1px solid $\{rgba\("\#ef4444", 0\.25\)\}\`, borderRadius: 12, padding: "14px 16px" \}\}>

              <div style=\{\{ fontSize: 11, fontWeight: 800, color: "\#ef4444", marginBottom: 4 \}\}>

                🚨 Highest Exit Rate

              </div>

              <div style=\{\{ fontSize: 16, fontWeight: 900, color: "\#f1f5f9" \}\}>\{worstExit\.label\}</div>

              <div style=\{\{ fontSize: 24, fontWeight: 900, color: "\#ef4444", marginTop: 4 \}\}>\{worstExit\.exitRate\}% exit rate</div>

              <div style=\{\{ fontSize: 11, color: "\#475569", marginTop: 4 \}\}>

                \{worstExit\.sessions\} sessions · avg \{fmtDur\(worstExit\.avgDuration\)\} on page

              </div>

              <div style=\{\{ fontSize: 11, color: "\#f87171", marginTop: 6, fontWeight: 600 \}\}>

                💡 Fix: Add stronger CTA, reduce friction, add trust signals

              </div>

            </div>

          \)\}

          \{worstDropOff && \(

            <div style=\{\{ background: rgba\("\#f59e0b", 0\.06\), border: \`1px solid $\{rgba\("\#f59e0b", 0\.25\)\}\`, borderRadius: 12, padding: "14px 16px" \}\}>

              <div style=\{\{ fontSize: 11, fontWeight: 800, color: "\#f59e0b", marginBottom: 4 \}\}>

                ⚠️ Biggest Drop\-Off to Next Step

              </div>

              <div style=\{\{ fontSize: 16, fontWeight: 900, color: "\#f1f5f9" \}\}>\{worstDropOff\.label\}</div>

              <div style=\{\{ fontSize: 24, fontWeight: 900, color: "\#f59e0b", marginTop: 4 \}\}>\{worstDropOff\.dropOff\}% drop\-off</div>

              <div style=\{\{ fontSize: 11, color: "\#475569", marginTop: 4 \}\}>

                \{worstDropOff\.sessions\} enter · \{worstDropOff\.dropOff\}% don't reach next step

              </div>

              <div style=\{\{ fontSize: 11, color: "\#fbbf24", marginTop: 6, fontWeight: 600 \}\}>

                💡 Fix: Improve CTA button, add urgency, test headline copy

              </div>

            </div>

          \)\}

        </div>

      \)\}

      \{/\* ── Funnel Visualization ── \*/\}

      <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 14, padding: "20px 24px", marginBottom: 20 \}\}>

        <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 13, marginBottom: 20 \}\}>

          📊 Funnel Step\-by\-Step Breakdown

        </div>

        \{withDropOff\.map\(\(step, i\) => \{

          const barWidth = step\.sessions > 0 ? Math\.round\(\(step\.sessions / maxSessions\) \* 100\) : 0;

          const isConversion = step\.path === "/ThankYou";

          const isForm = step\.path === "/GetOffer";

          const exitColor = step\.exitRate >= 70 ? "\#ef4444" : step\.exitRate >= 50 ? "\#f59e0b" : "\#22c55e";

          const bounceColor = step\.bounceRate >= 70 ? "\#ef4444" : step\.bounceRate >= 50 ? "\#f59e0b" : "\#22c55e";

          const barColor = isConversion ? "\#22c55e" : isForm ? "\#f59e0b" : "\#3b82f6";

          const hasData = step\.sessions > 0;

          return \(

            <div key=\{step\.path\}>

              \{/\* Step row \*/\}

              <div style=\{\{

                background: hasData ? rgba\(barColor, 0\.04\) : "\#0a111e",

                border: \`1px solid $\{hasData ? rgba\(barColor, 0\.2\) : "\#0B1F45"\}\`,

                borderRadius: 10, padding: "14px 16px", marginBottom: 8,

              \}\}>

                <div style=\{\{ display: "flex", alignItems: "center", gap: 14, marginBottom: hasData ? 10 : 0 \}\}>

                  \{/\* Step number \*/\}

                  <div style=\{\{

                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,

                    background: isConversion ? "\#22c55e22" : rgba\(barColor, 0\.15\),

                    color: barColor, fontSize: 12, fontWeight: 900,

                    display: "flex", alignItems: "center", justifyContent: "center",

                  \}\}>

                    \{isConversion ? "✓" : i \+ 1\}

                  </div>

                  \{/\* Label \*/\}

                  <div style=\{\{ flex: 1 \}\}>

                    <div style=\{\{ display: "flex", alignItems: "center", gap: 8 \}\}>

                      <span style=\{\{ fontSize: 14 \}\}>\{step\.icon\}</span>

                      <span style=\{\{ fontWeight: 800, fontSize: 13, color: "\#f1f5f9" \}\}>\{step\.label\}</span>

                      <span style=\{\{ fontSize: 10, color: "\#334155" \}\}>\{step\.path\}</span>

                    </div>

                    <div style=\{\{ fontSize: 10, color: "\#475569", marginTop: 2 \}\}>\{step\.desc\}</div>

                  </div>

                  \{/\* Sessions count \*/\}

                  <div style=\{\{ textAlign: "right", flexShrink: 0 \}\}>

                    <div style=\{\{ fontSize: 20, fontWeight: 900, color: hasData ? barColor : "\#334155" \}\}>

                      \{hasData ? step\.sessions\.toLocaleString\(\) : "—"\}

                    </div>

                    <div style=\{\{ fontSize: 9, color: "\#475569" \}\}>sessions</div>

                  </div>

                </div>

                \{/\* Metrics row \*/\}

                \{hasData && \(

                  <div>

                    \{/\* Bar \*/\}

                    <div style=\{\{ height: 6, background: "\#0a111e", borderRadius: 4, overflow: "hidden", marginBottom: 10 \}\}>

                      <div style=\{\{

                        height: "100%", width: \`$\{barWidth\}%\`,

                        background: \`linear\-gradient\(90deg, $\{barColor\}, $\{rgba\(barColor, 0\.6\)\}\)\`,

                        borderRadius: 4, transition: "width 0\.5s ease",

                      \}\} />

                    </div>

                    \{/\* Metric pills \*/\}

                    <div style=\{\{ display: "flex", gap: 16, flexWrap: "wrap" \}\}>

                      <div style=\{\{ display: "flex", alignItems: "center", gap: 5 \}\}>

                        <span style=\{\{ fontSize: 10, color: "\#475569" \}\}>Exit Rate:</span>

                        <span style=\{\{ fontSize: 11, fontWeight: 800, color: exitColor \}\}>\{step\.exitRate\}%</span>

                        \{step\.exitRate >= 70 && <span style=\{\{ fontSize: 9 \}\}>🚨</span>\}

                      </div>

                      <div style=\{\{ display: "flex", alignItems: "center", gap: 5 \}\}>

                        <span style=\{\{ fontSize: 10, color: "\#475569" \}\}>Bounce:</span>

                        <span style=\{\{ fontSize: 11, fontWeight: 800, color: bounceColor \}\}>\{step\.bounceRate\}%</span>

                      </div>

                      <div style=\{\{ display: "flex", alignItems: "center", gap: 5 \}\}>

                        <span style=\{\{ fontSize: 10, color: "\#475569" \}\}>Avg Time:</span>

                        <span style=\{\{ fontSize: 11, fontWeight: 700, color: "\#94a3b8" \}\}>\{fmtDur\(step\.avgDuration\)\}</span>

                      </div>

                      <div style=\{\{ display: "flex", alignItems: "center", gap: 5 \}\}>

                        <span style=\{\{ fontSize: 10, color: "\#475569" \}\}>New Users:</span>

                        <span style=\{\{ fontSize: 11, fontWeight: 700, color: "\#94a3b8" \}\}>\{step\.newUsers\.toLocaleString\(\)\}</span>

                      </div>

                    </div>

                  </div>

                \)\}

                \{\!hasData && \(

                  <div style=\{\{ fontSize: 11, color: "\#334155", marginTop: 4 \}\}>No traffic recorded for this page in the last 30 days</div>

                \)\}

              </div>

              \{/\* Drop\-off connector arrow \*/\}

              \{step\.dropOff \!== null && i < withDropOff\.length \- 1 && \(

                <div style=\{\{ display: "flex", alignItems: "center", gap: 10, padding: "2px 16px", marginBottom: 8 \}\}>

                  <div style=\{\{ width: 2, height: 20, background: "\#0B1F45", marginLeft: 13 \}\} />

                  \{step\.sessions > 0 && \(

                    <div style=\{\{

                      background: step\.dropOff >= 70 ? rgba\("\#ef4444", 0\.1\) : step\.dropOff >= 40 ? rgba\("\#f59e0b", 0\.1\) : rgba\("\#22c55e", 0\.08\),

                      border: \`1px solid $\{step\.dropOff >= 70 ? rgba\("\#ef4444", 0\.3\) : step\.dropOff >= 40 ? rgba\("\#f59e0b", 0\.3\) : rgba\("\#22c55e", 0\.2\)\}\`,

                      borderRadius: 6, padding: "3px 12px", fontSize: 10, fontWeight: 700,

                      color: step\.dropOff >= 70 ? "\#f87171" : step\.dropOff >= 40 ? "\#fbbf24" : "\#4ade80",

                      marginLeft: 8,

                    \}\}>

                      ↓ \{step\.dropOff\}% drop\-off to next step

                      \{step\.dropOff >= 70 ? " 🚨" : step\.dropOff >= 40 ? " ⚡" : " ✅"\}

                    </div>

                  \)\}

                </div>

              \)\}

            </div>

          \);

        \}\)\}

      </div>

      \{/\* ── Action Plan ── \*/\}

      <div style=\{\{ background: "\#0d1520", border: "1px solid \#f59e0b33", borderRadius: 14, padding: "18px 20px" \}\}>

        <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 13, marginBottom: 4 \}\}>⚡ Funnel Optimization Playbook</div>

        <div style=\{\{ fontSize: 11, color: "\#475569", marginBottom: 14 \}\}>Fix these in order — highest impact first</div>

        <div style=\{\{ display: "flex", flexDirection: "column", gap: 8 \}\}>

          \{\[

            \{ icon: "📋", page: "/GetOffer", issue: "Multi\-step form abandonment", fix: "Add progress indicator, reduce fields, add trust badges above fold\. Target: >25% form→ThankYou rate\.", priority: "🔴 Critical" \},

            \{ icon: "🏠", page: "/Home",     issue: "High bounce on main landing", fix: "Ensure hero CTA is above fold on mobile\. Address input should be first interaction\. A/B test headline\.", priority: "🔴 Critical" \},

            \{ icon: "⚠️", page: "/DallasForeclosure", issue: "Exit before reaching form", fix: "Add inline mini\-form to foreclosure page\. Don't make them navigate away to GetOffer\.", priority: "🟡 High" \},

            \{ icon: "📜", page: "/DallasInherited",   issue: "Exit before reaching form", fix: "Same — add inline form or sticky bottom bar with phone \+ CTA button\.", priority: "🟡 High" \},

            \{ icon: "📍", page: "/Dallas",   issue: "Landing page drop\-off",          fix: "Check mobile rendering\. Ensure CTA button is visible without scrolling\.", priority: "🟢 Medium" \},

          \]\.map\(\(item, i\) => \(

            <div key=\{i\} style=\{\{ display: "flex", gap: 12, alignItems: "flex\-start", padding: "10px 14px", background: "\#0a111e", borderRadius: 8 \}\}>

              <span style=\{\{ fontSize: 18, flexShrink: 0 \}\}>\{item\.icon\}</span>

              <div style=\{\{ flex: 1 \}\}>

                <div style=\{\{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 \}\}>

                  <span style=\{\{ fontSize: 11, fontWeight: 800, color: "\#f1f5f9" \}\}>\{item\.page\}</span>

                  <span style=\{\{ fontSize: 9, fontWeight: 700 \}\}>\{item\.priority\}</span>

                </div>

                <div style=\{\{ fontSize: 11, color: "\#ef4444", fontWeight: 600, marginBottom: 3 \}\}>Issue: \{item\.issue\}</div>

                <div style=\{\{ fontSize: 11, color: "\#475569" \}\}>Fix: \{item\.fix\}</div>

              </div>

            </div>

          \)\)\}

        </div>

      </div>

    </div>

  \);

\}
