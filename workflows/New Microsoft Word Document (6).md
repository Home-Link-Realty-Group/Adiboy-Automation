# New Microsoft Word Document (6)

Source: New Microsoft Word Document (6).docx

import React, \{ useState, useMemo \} from "react";

export default function BuyerMatchPanel\(\{ buyers \}\) \{

  const \[deal, setDeal\] = useState\(\{

    address: "", city: "", zip: "",

    arv: "", asking: "", repairs: "",

    beds: "", condition: "",

  \}\);

  const matches = useMemo\(\(\) => \{

    const askingNum = parseFloat\(deal\.asking\) || 0;

    const arvNum = parseFloat\(deal\.arv\) || 0;

    const bedsNum = parseFloat\(deal\.beds\) || 0;

    if \(\!askingNum\) return \[\];

    return buyers

      \.filter\(b => b\.status \!== "Inactive"\)

      \.map\(b => \{

        let score = 0;

        const reasons = \[\];

        // Price match

        if \(b\.price\_min && b\.price\_max\) \{

          if \(askingNum >= b\.price\_min && askingNum <= b\.price\_max\) \{

            score \+= 30; reasons\.push\("✅ Price in range"\);

          \} else if \(askingNum < b\.price\_min\) \{

            reasons\.push\(\`⚠️ Below min \($$\{Math\.round\(b\.price\_min/1000\)\}K\)\`\);

          \} else \{

            reasons\.push\(\`⚠️ Above max \($$\{Math\.round\(b\.price\_max/1000\)\}K\)\`\);

          \}

        \} else \{ score \+= 10; \}

        // ARV %

        if \(b\.arv\_max\_percent && arvNum\) \{

          const pct = \(askingNum / arvNum\) \* 100;

          if \(pct <= b\.arv\_max\_percent\) \{

            score \+= 25; reasons\.push\(\`✅ $\{pct\.toFixed\(0\)\}% of ARV \(≤$\{b\.arv\_max\_percent\}%\)\`\);

          \} else \{

            reasons\.push\(\`⚠️ $\{pct\.toFixed\(0\)\}% of ARV — over $\{b\.arv\_max\_percent\}% cap\`\);

          \}

        \} else \{ score \+= 10; \}

        // Areas

        if \(b\.buy\_areas && \(deal\.city || deal\.zip\)\) \{

          const areas = b\.buy\_areas\.toLowerCase\(\);

          if \(areas\.includes\(\(deal\.city || ""\)\.toLowerCase\(\)\) || areas\.includes\(deal\.zip\)\) \{

            score \+= 25; reasons\.push\("✅ Target area match"\);

          \} else \{

            reasons\.push\("⚠️ Not in stated buy areas"\);

          \}

        \} else \{ score \+= 5; \}

        // Beds

        if \(b\.beds\_min && bedsNum\) \{

          if \(bedsNum >= b\.beds\_min\) \{ score \+= 10; reasons\.push\("✅ Beds match"\); \}

          else reasons\.push\(\`⚠️ Need $\{b\.beds\_min\}\+ beds\`\);

        \} else \{ score \+= 5; \}

        // Condition

        if \(b\.condition\_preference && deal\.condition\) \{

          if \(b\.condition\_preference === deal\.condition\) \{

            score \+= 10; reasons\.push\("✅ Condition match"\);

          \}

        \} else \{ score \+= 5; \}

        // Hot bonus

        if \(b\.status === "Hot"\) score \+= 5;

        return \{ buyer: b, score: Math\.min\(100, score\), reasons \};

      \}\)

      \.filter\(m => m\.score >= 40\)

      \.sort\(\(a, b\) => b\.score \- a\.score\)

      \.slice\(0, 10\);

  \}, \[deal, buyers\]\);

  const inp = \{

    width: "100%",

    background: "rgba\(0,0,0,0\.3\)",

    border: "1px solid rgba\(255,255,255,0\.1\)",

    borderRadius: 8, padding: "10px 12px",

    color: "\#fff", fontSize: 13, outline: "none",

    fontFamily: "inherit", boxSizing: "border\-box",

  \};

  const lbl = \{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba\(255,255,255,0\.6\)", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0\.5 \};

  return \(

    <div style=\{\{ animation: "fadein 0\.3s ease" \}\}>

      <p style=\{\{ fontSize: 13, color: "rgba\(255,255,255,0\.7\)", marginBottom: 20 \}\}>

        Enter deal details — system instantly ranks your buyers by match probability\.

      </p>

      <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" \}\}>

        \{/\* Deal form \*/\}

        <div style=\{\{

          background: "linear\-gradient\(135deg, rgba\(255,255,255,0\.05\), rgba\(0,0,0,0\.3\)\)",

          backdropFilter: "blur\(20px\)",

          border: "1px solid rgba\(255,255,255,0\.08\)",

          borderRadius: 16, padding: 24,

        \}\}>

          <div style=\{\{ fontWeight: 800, fontSize: 15, color: "\#fff", marginBottom: 16 \}\}>📋 Deal Details</div>

          <div style=\{\{ display: "grid", gap: 12 \}\}>

            <div><label style=\{lbl\}>Property Address</label><input style=\{inp\} value=\{deal\.address\} onChange=\{e => setDeal\(d => \(\{ \.\.\.d, address: e\.target\.value \}\)\)\} placeholder="1234 Oak St" /></div>

            <div style=\{\{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 \}\}>

              <div><label style=\{lbl\}>City</label><input style=\{inp\} value=\{deal\.city\} onChange=\{e => setDeal\(d => \(\{ \.\.\.d, city: e\.target\.value \}\)\)\} placeholder="Cleveland" /></div>

              <div><label style=\{lbl\}>ZIP</label><input style=\{inp\} value=\{deal\.zip\} onChange=\{e => setDeal\(d => \(\{ \.\.\.d, zip: e\.target\.value \}\)\)\} placeholder="44102" /></div>

            </div>

            <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 \}\}>

              <div><label style=\{lbl\}>ARV \($\)</label><input style=\{inp\} type="number" value=\{deal\.arv\} onChange=\{e => setDeal\(d => \(\{ \.\.\.d, arv: e\.target\.value \}\)\)\} placeholder="180000" /></div>

              <div><label style=\{lbl\}>Asking \($\)</label><input style=\{inp\} type="number" value=\{deal\.asking\} onChange=\{e => setDeal\(d => \(\{ \.\.\.d, asking: e\.target\.value \}\)\)\} placeholder="95000" /></div>

              <div><label style=\{lbl\}>Repairs \($\)</label><input style=\{inp\} type="number" value=\{deal\.repairs\} onChange=\{e => setDeal\(d => \(\{ \.\.\.d, repairs: e\.target\.value \}\)\)\} placeholder="35000" /></div>

            </div>

            <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 \}\}>

              <div><label style=\{lbl\}>Beds</label><input style=\{inp\} type="number" value=\{deal\.beds\} onChange=\{e => setDeal\(d => \(\{ \.\.\.d, beds: e\.target\.value \}\)\)\} placeholder="3" /></div>

              <div><label style=\{lbl\}>Condition</label>

                <select style=\{inp\} value=\{deal\.condition\} onChange=\{e => setDeal\(d => \(\{ \.\.\.d, condition: e\.target\.value \}\)\)\}>

                  <option value="">—</option>

                  <option>Move\-in Ready</option>

                  <option>Light Cosmetic</option>

                  <option>Heavy Rehab</option>

                  <option>Tear Down OK</option>

                </select>

              </div>

            </div>

          </div>

        </div>

        \{/\* Matches \*/\}

        <div>

          <div style=\{\{ fontWeight: 800, fontSize: 15, color: "\#fff", marginBottom: 14 \}\}>

            🎯 Top Matches \{matches\.length > 0 && <span style=\{\{ color: "\#34d399" \}\}>\(\{matches\.length\}\)</span>\}

          </div>

          \{matches\.length === 0 ? \(

            <div style=\{\{

              background: "rgba\(255,255,255,0\.04\)", borderRadius: 14, padding: "40px 20px",

              border: "1px dashed rgba\(255,255,255,0\.1\)", textAlign: "center", color: "rgba\(255,255,255,0\.5\)", fontSize: 13,

            \}\}>

              \{deal\.asking ? "No matches — broaden your buyer list" : "Enter deal details to see matches"\}

            </div>

          \) : \(

            <div style=\{\{ display: "flex", flexDirection: "column", gap: 10 \}\}>

              \{matches\.map\(\(m, i\) => \(

                <div key=\{m\.buyer\.id\} style=\{\{

                  background: i === 0

                    ? "linear\-gradient\(135deg, rgba\(16,185,129,0\.12\), rgba\(0,0,0,0\.3\)\)"

                    : "linear\-gradient\(135deg, rgba\(255,255,255,0\.04\), rgba\(0,0,0,0\.2\)\)",

                  border: i === 0 ? "1px solid rgba\(16,185,129,0\.4\)" : "1px solid rgba\(255,255,255,0\.08\)",

                  borderRadius: 12, padding: 14,

                \}\}>

                  <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 8 \}\}>

                    <div style=\{\{ fontWeight: 800, color: "\#fff", fontSize: 14 \}\}>

                      \{i === 0 && "🥇 "\}\{m\.buyer\.name\}

                    </div>

                    <div style=\{\{

                      background: m\.score >= 80 ? "\#10b981" : m\.score >= 60 ? "\#f59e0b" : "\#94a3b8",

                      color: "\#fff", fontSize: 11, fontWeight: 800,

                      padding: "3px 10px", borderRadius: 100,

                    \}\}>\{m\.score\}% match</div>

                  </div>

                  <div style=\{\{ fontSize: 11, color: "rgba\(255,255,255,0\.7\)", lineHeight: 1\.6 \}\}>

                    \{m\.reasons\.slice\(0, 4\)\.join\(" · "\)\}

                  </div>

                  <div style=\{\{ display: "flex", gap: 8, marginTop: 10 \}\}>

                    \{m\.buyer\.phone && <a href=\{\`tel:$\{m\.buyer\.phone\}\`\} style=\{\{ background: "rgba\(99,102,241,0\.2\)", color: "\#a5b4fc", padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, textDecoration: "none" \}\}>📞 Call</a>\}

                    \{m\.buyer\.email && <a href=\{\`mailto:$\{m\.buyer\.email\}?subject=Off\-market deal: $\{deal\.address || "\[Property\]"\}\`\} style=\{\{ background: "rgba\(16,185,129,0\.2\)", color: "\#34d399", padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, textDecoration: "none" \}\}>✉️ Email Deal</a>\}

                  </div>

                </div>

              \)\)\}

            </div>

          \)\}

        </div>

      </div>

    </div>

  \);

\}
