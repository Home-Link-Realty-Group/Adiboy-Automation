# New Microsoft Word Document (42)

Source: New Microsoft Word Document (42).docx

import React from "react";

const RECOMMENDATIONS = \{

  "Step 1: Address": \[

    "Pre\-fill address from URL param \(already implemented for Home → GetOffer\)",

    "Add Google Places autocomplete to reduce typing friction",

    "Make city auto\-populate from ZIP to cut form fields by 1",

    "Show 'Why we ask' tooltip — 73% of users abandon if they don't trust the form",

    "Test moving address entry to a single combined field",

  \],

  "Step 2: Property": \[

    "Reduce required fields — only ask for property type \+ condition",

    "Use icon\-based radio cards \(already implemented\) — verify mobile tap targets ≥ 44px",

    "Add 'I don't know' option for bedrooms/bathrooms — sellers often don't have exact info",

    "Show estimated value preview after this step to reward progress",

    "Consider making this step optional and asking on the call",

  \],

  "Step 3: Situation": \[

    "Sellers feel exposed sharing situation — add reassurance copy \('100% confidential'\)",

    "Reduce situation options from 9 to 5 most common \(foreclosure, inherited, divorce, repairs, just selling\)",

    "Add 'Prefer not to say' option for sensitive situations",

    "Show social proof testimonial from someone with their situation",

    "Test removing this step entirely and asking on the discovery call",

  \],

  "Lead Submitted": \[

    "Phone field is the \#1 drop\-off cause — make it optional or add SMS\-only option",

    "Strengthen TCPA consent copy to look less legal/scary",

    "Add 'No spam guarantee' badge near submit button",

    "Show 'Jacob is available now' live indicator \(already implemented\)",

    "Consider 2\-step submit: collect email first, then phone in a follow\-up",

    "Test removing email field — phone alone is enough for cash buyer leads",

  \],

\};

/\*\*

 \* DropoffInsights — Generates actionable recommendations based on

 \* which form step has the biggest drop\-off\.

 \*/

export default function DropoffInsights\(\{ biggestDrop, summary \}\) \{

  const recs = RECOMMENDATIONS\[biggestDrop?\.stage\] || \[\];

  const lostUsers = biggestDrop?\.lost\_users || 0;

  // Estimate lost revenue: avg lead value $20K × 3% close rate

  const estLostRevenue = Math\.round\(lostUsers \* 0\.03 \* 20000\);

  return \(

    <div style=\{\{

      background: "linear\-gradient\(135deg, \#fef2f2 0%, \#fff7ed 100%\)",

      border: "1px solid \#fecaca",

      borderRadius: 12, padding: 24, marginBottom: 20,

    \}\}>

      <div style=\{\{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 \}\}>

        <span style=\{\{ fontSize: 24 \}\}>🎯</span>

        <div>

          <div style=\{\{ fontSize: 11, fontWeight: 800, color: "\#dc2626", letterSpacing: 1, textTransform: "uppercase" \}\}>Top Optimization Opportunity</div>

          <div style=\{\{ fontWeight: 800, fontSize: 16, color: "\#111827", marginTop: 2 \}\}>

            Biggest drop\-off: <span style=\{\{ color: "\#dc2626" \}\}>\{biggestDrop?\.stage || "—"\}</span>

          </div>

        </div>

      </div>

      <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(3, 1fr\)", gap: 12, marginBottom: 16 \}\}>

        <div style=\{\{ background: "\#fff", borderRadius: 8, padding: "10px 14px" \}\}>

          <div style=\{\{ fontSize: 10, fontWeight: 700, color: "\#9ca3af", textTransform: "uppercase", letterSpacing: 0\.5 \}\}>Users Lost</div>

          <div style=\{\{ fontSize: 22, fontWeight: 900, color: "\#dc2626", marginTop: 2 \}\}>\{lostUsers\.toLocaleString\(\)\}</div>

        </div>

        <div style=\{\{ background: "\#fff", borderRadius: 8, padding: "10px 14px" \}\}>

          <div style=\{\{ fontSize: 10, fontWeight: 700, color: "\#9ca3af", textTransform: "uppercase", letterSpacing: 0\.5 \}\}>Overall Conv\. Rate</div>

          <div style=\{\{ fontSize: 22, fontWeight: 900, color: "\#0B1F45", marginTop: 2 \}\}>\{summary?\.overall\_conversion\_rate || 0\}%</div>

        </div>

        <div style=\{\{ background: "\#fff", borderRadius: 8, padding: "10px 14px" \}\}>

          <div style=\{\{ fontSize: 10, fontWeight: 700, color: "\#9ca3af", textTransform: "uppercase", letterSpacing: 0\.5 \}\}>Est\. Lost Revenue</div>

          <div style=\{\{ fontSize: 22, fontWeight: 900, color: "\#7c3aed", marginTop: 2 \}\}>$\{estLostRevenue\.toLocaleString\(\)\}</div>

        </div>

      </div>

      \{recs\.length > 0 && \(

        <div>

          <div style=\{\{ fontSize: 12, fontWeight: 800, color: "\#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0\.5 \}\}>

            Recommended Fixes \(ranked by impact\)

          </div>

          <ol style=\{\{ margin: 0, paddingLeft: 20, fontSize: 13, color: "\#374151", lineHeight: 1\.8 \}\}>

            \{recs\.map\(\(r, i\) => <li key=\{i\}>\{r\}</li>\)\}

          </ol>

        </div>

      \)\}

    </div>

  \);

\}
