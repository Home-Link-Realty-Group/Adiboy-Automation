# New Microsoft Word Document (104)

Source: New Microsoft Word Document (104).docx

import \{ useState \} from "react";

import \{ PHONE\_RAW, PHONE, fmt \} from "\./portalConstants";

export default function OfferTab\(\{ lead, deal, offerAmt, setTab \}\) \{

  const \[agentPrice, setAgentPrice\] = useState\(""\);

  const agentPriceNum = parseFloat\(\(agentPrice || ""\)\.replace\(/\[^0\-9\.\]/g, ""\)\) || 0;

  const agentNet = agentPriceNum > 0 ? agentPriceNum \- agentPriceNum \* 0\.06 \- agentPriceNum \* 0\.025 \- 8000 \- 3000 : null;

  const ourNet = offerAmt > 0 ? offerAmt : null;

  const savings = agentNet && ourNet ? ourNet \- agentNet : null;

  if \(\!deal && \!offerAmt\) \{

    return \(

      <div style=\{\{ background: "\#fff", borderRadius: 20, padding: "64px", textAlign: "center", boxShadow: "0 2px 16px rgba\(0,0,0,0\.06\)" \}\}>

        <div style=\{\{ fontSize: 64, marginBottom: 16 \}\}>⏳</div>

        <h2 style=\{\{ color: "\#0B1F45", fontSize: 24, fontWeight: 900, marginBottom: 12 \}\}>Your Offer Is Being Prepared</h2>

        <p style=\{\{ color: "\#64748b", fontSize: 15, maxWidth: 420, margin: "0 auto 28px", lineHeight: 1\.7 \}\}>We're analyzing comparable sales in your area and calculating repair costs\. You'll receive a written cash offer within <strong>24 hours</strong>\.</p>

        <div style=\{\{ background: "\#f0fff4", borderRadius: 14, padding: "18px 24px", display: "inline\-block", border: "1px solid \#bbf7d0" \}\}>

          <div style=\{\{ color: "\#374151", fontSize: 14 \}\}>Want it faster? <a href=\{\`tel:$\{PHONE\_RAW\}\`\} style=\{\{ color: "\#27ae60", fontWeight: 700 \}\}>Call us now at \{PHONE\}</a></div>

        </div>

      </div>

    \);

  \}

  return \(

    <div style=\{\{ display: "flex", flexDirection: "column", gap: 20 \}\}>

      \{/\* Offer hero \*/\}

      <div style=\{\{ background: "\#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 16px rgba\(0,0,0,0\.06\)" \}\}>

        <div style=\{\{ background: "linear\-gradient\(135deg, \#071a0e, \#27ae60\)", padding: "32px 36px" \}\}>

          <div style=\{\{ color: "rgba\(255,255,255,0\.55\)", fontSize: 11, fontWeight: 700, letterSpacing: 1\.2, textTransform: "uppercase", marginBottom: 8 \}\}>Your Cash Offer</div>

          <div style=\{\{ color: "\#fff", fontSize: 52, fontWeight: 900, letterSpacing: \-2, lineHeight: 1, marginBottom: 8 \}\}>\{fmt\(offerAmt\)\}</div>

          <div style=\{\{ color: "rgba\(255,255,255,0\.65\)", fontSize: 14 \}\}>All cash · No contingencies · Close in 7–14 days · No fees</div>

        </div>

        <div style=\{\{ padding: "28px 36px" \}\}>

          <div style=\{\{ marginBottom: 24 \}\}>

            <div style=\{\{ fontWeight: 800, color: "\#0B1F45", fontSize: 15, marginBottom: 14 \}\}>✅ Everything included in this offer</div>

            <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 \}\}>

              \{\[

                \["No agent commissions", "Save ~6% \($" \+ Math\.round\(offerAmt \* 0\.06\)\.toLocaleString\(\) \+ "\)"\],

                \["No closing costs", "We cover all escrow fees"\],

                \["No repairs needed", "Buy completely as\-is"\],

                \["No inspection contingency", "Firm offer, no surprises"\],

                \["Close on your timeline", "7 days or up to 60 days"\],

                \["Cash wired at closing", "Same\-day fund transfer"\],

              \]\.map\(\(\[title, sub\], i\) => \(

                <div key=\{i\} style=\{\{ display: "flex", gap: 10, alignItems: "flex\-start", background: "\#f8fafc", borderRadius: 10, padding: "12px 14px" \}\}>

                  <span style=\{\{ color: "\#27ae60", fontWeight: 900, fontSize: 16, flexShrink: 0 \}\}>✓</span>

                  <div>

                    <div style=\{\{ fontWeight: 700, color: "\#0B1F45", fontSize: 13 \}\}>\{title\}</div>

                    <div style=\{\{ color: "\#64748b", fontSize: 12 \}\}>\{sub\}</div>

                  </div>

                </div>

              \)\)\}

            </div>

          </div>

          \{deal && \(

            <div style=\{\{ borderTop: "1px solid \#f1f5f9", paddingTop: 24, marginBottom: 24 \}\}>

              <div style=\{\{ fontWeight: 800, color: "\#0B1F45", fontSize: 15, marginBottom: 14 \}\}>📋 Offer Details</div>

              <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 \}\}>

                \{\[

                  \{ l: "Property Address",    v: deal\.property\_address || lead\.address \},

                  \{ l: "After\-Repair Value",  v: fmt\(deal\.arv\) \},

                  \{ l: "Purchase Price",      v: fmt\(deal\.purchase\_price\) \},

                  \{ l: "Contract Date",       v: deal\.contract\_date || "Pending acceptance" \},

                  \{ l: "Target Close Date",   v: deal\.closing\_date   || "7–14 business days" \},

                  \{ l: "Title Company",       v: deal\.title\_company  || "Being arranged" \},

                  \{ l: "Earnest Money",       v: deal\.earnest\_money ? fmt\(deal\.earnest\_money\) : "Waived" \},

                  \{ l: "Inspection Period",   v: deal\.inspection\_period\_end || "3 business days" \},

                \]\.map\(\(r, i\) => \(

                  <div key=\{i\} style=\{\{ background: "\#f8fafc", borderRadius: 10, padding: "14px" \}\}>

                    <div style=\{\{ color: "\#94a3b8", fontSize: 10, fontWeight: 700, letterSpacing: 0\.7, textTransform: "uppercase", marginBottom: 4 \}\}>\{r\.l\}</div>

                    <div style=\{\{ color: "\#0B1F45", fontSize: 14, fontWeight: 700 \}\}>\{r\.v || "—"\}</div>

                  </div>

                \)\)\}

              </div>

            </div>

          \)\}

          <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 \}\}>

            <button onClick=\{\(\) => setTab\("contract"\)\} style=\{\{ padding: "15px", background: "linear\-gradient\(135deg, \#27ae60, \#2ecc71\)", border: "none", borderRadius: 12, color: "\#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 16px rgba\(39,174,96,0\.3\)" \}\}>✍️ Accept &amp; Sign Contract</button>

            <a href=\{\`tel:$\{PHONE\_RAW\}\`\} style=\{\{ padding: "15px", background: "\#f8fafc", border: "1px solid \#e2e8f0", borderRadius: 12, color: "\#0B1F45", fontWeight: 700, fontSize: 15, textDecoration: "none", textAlign: "center", display: "block" \}\}>📞 Negotiate / Ask Questions</a>

          </div>

        </div>

      </div>

      \{/\* Net Proceeds Calculator \*/\}

      <div style=\{\{ background: "\#fff", borderRadius: 20, padding: "32px", boxShadow: "0 2px 16px rgba\(0,0,0,0\.06\)" \}\}>

        <h3 style=\{\{ margin: "0 0 6px", fontWeight: 900, color: "\#0B1F45", fontSize: 18 \}\}>🧮 Net Proceeds Calculator</h3>

        <p style=\{\{ color: "\#64748b", fontSize: 14, marginBottom: 24 \}\}>See how our cash offer compares to listing with an agent after all costs are deducted\.</p>

        <div style=\{\{ marginBottom: 20 \}\}>

          <label style=\{\{ color: "\#374151", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 \}\}>What would an agent list your home for?</label>

          <input type="text" placeholder="e\.g\. 250000" value=\{agentPrice\} onChange=\{e => setAgentPrice\(e\.target\.value\)\}

            style=\{\{ flex: 1, padding: "12px 14px", border: "1\.5px solid \#e2e8f0", borderRadius: 10, fontSize: 15, outline: "none", color: "\#0B1F45", width: "100%", boxSizing: "border\-box" \}\}

            onFocus=\{e => e\.target\.style\.borderColor = "\#27ae60"\} onBlur=\{e => e\.target\.style\.borderColor = "\#e2e8f0"\} />

        </div>

        <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 \}\}>

          <div style=\{\{ background: "\#fef2f2", borderRadius: 14, padding: "20px", border: "1px solid \#fecaca" \}\}>

            <div style=\{\{ fontWeight: 800, color: "\#991b1b", fontSize: 14, marginBottom: 14 \}\}>🏡 Listing with an Agent</div>

            \{\[

              \{ l: "Listing Price",         v: agentPriceNum > 0 ? fmt\(agentPriceNum\) : "—" \},

              \{ l: "Agent Commission \(6%\)", v: agentPriceNum > 0 ? \`−$\{fmt\(agentPriceNum \* 0\.06\)\}\` : "—", neg: true \},

              \{ l: "Closing Costs \(2\.5%\)",  v: agentPriceNum > 0 ? \`−$\{fmt\(agentPriceNum \* 0\.025\)\}\` : "—", neg: true \},

              \{ l: "Avg\. Repairs Req\.",     v: agentPriceNum > 0 ? "−$8,000" : "—", neg: true \},

              \{ l: "Holding Costs \(2mo\)",   v: agentPriceNum > 0 ? "−$3,000" : "—", neg: true \},

            \]\.map\(\(r, i\) => \(

              <div key=\{i\} style=\{\{ display: "flex", justifyContent: "space\-between", padding: "7px 0", borderBottom: i < 4 ? "1px solid \#fee2e2" : "none" \}\}>

                <span style=\{\{ fontSize: 13, color: "\#64748b" \}\}>\{r\.l\}</span>

                <span style=\{\{ fontSize: 13, fontWeight: 700, color: r\.neg ? "\#dc2626" : "\#0B1F45" \}\}>\{r\.v\}</span>

              </div>

            \)\)\}

            <div style=\{\{ borderTop: "2px solid \#fca5a5", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space\-between" \}\}>

              <span style=\{\{ fontWeight: 800, color: "\#0B1F45" \}\}>You Net</span>

              <span style=\{\{ fontWeight: 900, color: agentNet && agentNet > 0 ? "\#0B1F45" : "\#dc2626", fontSize: 16 \}\}>\{agentNet ? fmt\(Math\.max\(0, agentNet\)\) : "—"\}</span>

            </div>

          </div>

          <div style=\{\{ background: "\#f0fff4", borderRadius: 14, padding: "20px", border: "1px solid \#bbf7d0" \}\}>

            <div style=\{\{ fontWeight: 800, color: "\#15803d", fontSize: 14, marginBottom: 14 \}\}>🏆 Home\-Link Cash Offer</div>

            \{\[

              \{ l: "Our Cash Offer",    v: fmt\(offerAmt\) \},

              \{ l: "Agent Commission", v: "$0", green: true \},

              \{ l: "Closing Costs",    v: "$0", green: true \},

              \{ l: "Repairs",          v: "$0", green: true \},

              \{ l: "Holding Costs",    v: "$0", green: true \},

            \]\.map\(\(r, i\) => \(

              <div key=\{i\} style=\{\{ display: "flex", justifyContent: "space\-between", padding: "7px 0", borderBottom: i < 4 ? "1px solid \#dcfce7" : "none" \}\}>

                <span style=\{\{ fontSize: 13, color: "\#64748b" \}\}>\{r\.l\}</span>

                <span style=\{\{ fontSize: 13, fontWeight: 700, color: r\.green ? "\#27ae60" : "\#0B1F45" \}\}>\{r\.v\}</span>

              </div>

            \)\)\}

            <div style=\{\{ borderTop: "2px solid \#86efac", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space\-between" \}\}>

              <span style=\{\{ fontWeight: 800, color: "\#0B1F45" \}\}>You Net</span>

              <span style=\{\{ fontWeight: 900, color: "\#15803d", fontSize: 16 \}\}>\{fmt\(offerAmt\)\}</span>

            </div>

          </div>

        </div>

        \{savings && \(

          <div style=\{\{ marginTop: 20, background: "linear\-gradient\(135deg, \#0B1F45, \#27ae60\)", borderRadius: 16, padding: "24px", border: "2px solid \#27ae60", textAlign: "center" \}\}>

            <div style=\{\{ fontSize: 13, fontWeight: 700, color: "\#4ade80", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 \}\}>Your Financial Benefit</div>

            <div style=\{\{ fontWeight: 900, color: "\#fff", fontSize: 36, marginBottom: 4 \}\}>$\{savings > 0 ? Math\.abs\(savings\)\.toLocaleString\(\) : 0\}</div>

            <div style=\{\{ color: "\#86efac", fontSize: 14, fontWeight: 700, marginBottom: 14 \}\}>\{savings > 0 ? "More cash in your pocket" : "No fees or commissions"\}</div>

            <div style=\{\{ background: "rgba\(255,255,255,0\.08\)", borderRadius: 12, padding: "16px", fontSize: 12, color: "\#d1fae5", lineHeight: 1\.7 \}\}>

              ✓ vs\. listing with agent: save \{savings && agentNet ? Math\.round\(\(savings / agentNet\) \* 100\) : 0\}% on costs<br />

              ✓ Close in 7 days instead of 90 days<br />

              ✓ No repairs, no showings, no delays

            </div>

          </div>

        \)\}

      </div>

    </div>

  \);

\}
