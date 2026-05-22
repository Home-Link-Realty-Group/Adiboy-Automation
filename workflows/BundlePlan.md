# BundlePlan

Source: BundlePlan.docx

const phases = \[

  \{

    phase: "Phase 1 — Quick Wins \(Day 1\)",

    effort: "~2 hours",

    impact: "\-330 KB initial bundle",

    tasks: \[

      \{ task: "Convert Home page to lazy\(\)", savings: "\-40 KB", difficulty: "Trivial" \},

      \{ task: "Replace \`import moment\` → \`date\-fns\` across codebase", savings: "\-270 KB", difficulty: "Low \(find/replace\)" \},

      \{ task: "Audit three\.js usage — remove if unused", savings: "\-580 KB if unused", difficulty: "Low" \},

      \{ task: "Per\-method lodash imports \(lodash/debounce, etc\.\)", savings: "\-60 KB", difficulty: "Low" \},

    \],

  \},

  \{

    phase: "Phase 2 — Vendor Chunking \(Day 2\)",

    effort: "~3 hours",

    impact: "Better caching · \-200 KB repeat loads",

    tasks: \[

      \{ task: "Add manualChunks to vite\.config\.js", savings: "Caching win", difficulty: "Medium" \},

      \{ task: "Group admin routes with webpackChunkName", savings: "\-70% admin nav traffic", difficulty: "Low" \},

      \{ task: "Verify no vendor bleed \(recharts on public pages etc\)", savings: "Validation", difficulty: "Low" \},

    \],

  \},

  \{

    phase: "Phase 3 — Dynamic Imports \(Day 3\)",

    effort: "~4 hours",

    impact: "\-530 KB initial · On\-demand only",

    tasks: \[

      \{ task: "Wrap jsPDF \+ html2canvas in click\-handler dynamic imports", savings: "\-380 KB", difficulty: "Medium" \},

      \{ task: "Lazy\-load InteractiveNeighborhoodMap below fold", savings: "\-150 KB \(city pages\)", difficulty: "Low" \},

      \{ task: "Defer react\-quill to blog editor route only", savings: "Verify isolated", difficulty: "Low" \},

    \],

  \},

  \{

    phase: "Phase 4 — Advanced Optimization \(Week 2\)",

    effort: "~6 hours",

    impact: "LCP \-400ms · TTI \-800ms",

    tasks: \[

      \{ task: "Add modulepreload for /GetOffer chunk on Home", savings: "\-400ms perceived nav", difficulty: "Low" \},

      \{ task: "Reduce framer\-motion to CSS keyframes where possible", savings: "\-60 KB", difficulty: "Medium" \},

      \{ task: "Add bundle size budget in vite config \(fails CI if exceeded\)", savings: "Regression guard", difficulty: "Low" \},

      \{ task: "Implement route prefetch on link hover", savings: "\-200ms perceived nav", difficulty: "Medium" \},

    \],

  \},

\];

export default function BundleImplementationPlan\(\) \{

  return \(

    <section style=\{\{ marginBottom: 36 \}\}>

      <div style=\{\{ fontSize: 11, fontWeight: 700, color: "\#7a5e1a", letterSpacing: 1\.5, textTransform: "uppercase", marginBottom: 10 \}\}>Implementation Plan</div>

      <h2 style=\{\{ fontSize: 22, fontWeight: 900, color: "\#0B1F45", margin: "0 0 20px" \}\}>4\-Phase Rollout \(Total ~15 hours\)</h2>

      <div style=\{\{ display: "flex", flexDirection: "column", gap: 16 \}\}>

        \{phases\.map\(\(p, i\) => \(

          <div key=\{p\.phase\} style=\{\{ background: "\#fff", borderRadius: 12, padding: 22, boxShadow: "0 1px 8px rgba\(0,0,0,0\.05\)", borderLeft: \`4px solid \#D4A843\` \}\}>

            <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 \}\}>

              <div style=\{\{ fontWeight: 900, fontSize: 16, color: "\#0B1F45" \}\}>\{p\.phase\}</div>

              <div style=\{\{ display: "flex", gap: 10, fontSize: 11 \}\}>

                <span style=\{\{ background: "\#f0f0f0", color: "\#444", padding: "3px 10px", borderRadius: 20, fontWeight: 700 \}\}>⏱️ \{p\.effort\}</span>

                <span style=\{\{ background: "\#2dc65322", color: "\#2dc653", padding: "3px 10px", borderRadius: 20, fontWeight: 700 \}\}>💾 \{p\.impact\}</span>

              </div>

            </div>

            <table style=\{\{ width: "100%", borderCollapse: "collapse", fontSize: 13 \}\}>

              <thead>

                <tr style=\{\{ borderBottom: "2px solid \#f0f0f0" \}\}>

                  <th style=\{\{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: "\#444", fontSize: 11, textTransform: "uppercase", letterSpacing: 0\.5 \}\}>Task</th>

                  <th style=\{\{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: "\#444", fontSize: 11, textTransform: "uppercase", letterSpacing: 0\.5, width: 120 \}\}>Savings</th>

                  <th style=\{\{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: "\#444", fontSize: 11, textTransform: "uppercase", letterSpacing: 0\.5, width: 100 \}\}>Difficulty</th>

                </tr>

              </thead>

              <tbody>

                \{p\.tasks\.map\(\(t, j\) => \(

                  <tr key=\{j\} style=\{\{ borderBottom: "1px solid \#f8f8f8" \}\}>

                    <td style=\{\{ padding: "10px", color: "\#333" \}\}>\{t\.task\}</td>

                    <td style=\{\{ padding: "10px", fontWeight: 700, color: "\#2dc653" \}\}>\{t\.savings\}</td>

                    <td style=\{\{ padding: "10px", color: "\#444" \}\}>\{t\.difficulty\}</td>

                  </tr>

                \)\)\}

              </tbody>

            </table>

          </div>

        \)\)\}

      </div>

    </section>

  \);

\}
