# New Microsoft Word Document (108)

Source: New Microsoft Word Document (108).docx

import \{ PHONE\_RAW, JOURNEY \} from "\./portalConstants";

export default function StatusTab\(\{ lead, statusIdx, currentStep, setTab \}\) \{

  return \(

    <div style=\{\{ display: "flex", flexDirection: "column", gap: 20 \}\}>

      \{/\* Progress Stepper \*/\}

      <div style=\{\{ background: "\#fff", borderRadius: 20, padding: "36px 40px", boxShadow: "0 2px 16px rgba\(0,0,0,0\.06\)" \}\}>

        <div style=\{\{ display: "flex", alignItems: "center", justifyContent: "space\-between", marginBottom: 32 \}\}>

          <h2 style=\{\{ margin: 0, fontSize: 20, fontWeight: 900, color: "\#0B1F45" \}\}>Your Offer Journey</h2>

          <span style=\{\{ background: \`$\{currentStep\.color\}15\`, color: currentStep\.color, fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 20, border: \`1px solid $\{currentStep\.color\}30\` \}\}>\{currentStep\.icon\} \{currentStep\.label\}</span>

        </div>

        <div style=\{\{ position: "relative", display: "flex", justifyContent: "space\-between" \}\}>

          <div style=\{\{ position: "absolute", top: 22, left: "5%", right: "5%", height: 3, background: "\#e8edf4", borderRadius: 4 \}\} />

          <div style=\{\{ position: "absolute", top: 22, left: "5%", height: 3, width: \`$\{statusIdx === 0 ? 0 : \(statusIdx / \(JOURNEY\.length \- 1\)\) \* 90\}%\`, background: "linear\-gradient\(90deg, \#27ae60, \#2ecc71\)", borderRadius: 4, transition: "width 0\.8s ease" \}\} />

          \{JOURNEY\.map\(\(step, i\) => \{

            const done = i < statusIdx, curr = i === statusIdx;

            return \(

              <div key=\{step\.status\} style=\{\{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 2, flex: 1 \}\}>

                <div style=\{\{ width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: done ? 18 : 20, background: done ? "linear\-gradient\(135deg, \#27ae60, \#2ecc71\)" : curr ? "\#fff" : "\#f1f5f9", border: curr ? \`3px solid $\{step\.color\}\` : done ? "none" : "2px solid \#dde3ec", boxShadow: curr ? \`0 0 0 6px $\{step\.color\}18\` : "none", color: done ? "\#fff" : "\#94a3b8", transition: "all 0\.4s", fontWeight: 900 \}\}>

                  \{done ? "✓" : step\.icon\}

                </div>

                <div style=\{\{ fontSize: 11, fontWeight: curr ? 800 : 500, color: curr ? step\.color : done ? "\#27ae60" : "\#94a3b8", textAlign: "center", maxWidth: 85, lineHeight: 1\.3 \}\}>\{step\.label\}</div>

              </div>

            \);

          \}\)\}

        </div>

        <div style=\{\{ marginTop: 28, background: \`$\{currentStep\.color\}0d\`, border: \`1px solid $\{currentStep\.color\}25\`, borderLeft: \`4px solid $\{currentStep\.color\}\`, borderRadius: 14, padding: "20px 24px" \}\}>

          <div style=\{\{ fontWeight: 800, fontSize: 16, color: "\#0B1F45", marginBottom: 6 \}\}>\{currentStep\.icon\} What's happening right now</div>

          <div style=\{\{ color: "\#475569", fontSize: 14, lineHeight: 1\.7 \}\}>\{currentStep\.longDesc\}</div>

        </div>

      </div>

      \{/\* Property snapshot \*/\}

      <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fit, minmax\(175px, 1fr\)\)", gap: 14 \}\}>

        \{\[

          \{ icon: "🏚️", label: "Condition",       val: lead\.condition || "Not specified" \},

          \{ icon: "💬", label: "Situation",        val: lead\.situation || "Not specified" \},

          \{ icon: "📅", label: "Closing Timeline", val: lead\.timeline  || "Flexible" \},

          \{ icon: "📞", label: "Touches Made",     val: \`$\{lead\.touch\_count || 0\} contacts\` \},

          \{ icon: "🏗️", label: "Property Type",   val: lead\.property\_type || "Single Family" \},

          \{ icon: "📍", label: "Priority",         val: lead\.priority || "Standard" \},

        \]\.map\(\(c, i\) => \(

          <div key=\{i\} style=\{\{ background: "\#fff", borderRadius: 14, padding: "18px", boxShadow: "0 1px 6px rgba\(0,0,0,0\.05\)" \}\}>

            <div style=\{\{ fontSize: 22, marginBottom: 8 \}\}>\{c\.icon\}</div>

            <div style=\{\{ color: "\#94a3b8", fontSize: 10, fontWeight: 700, letterSpacing: 0\.8, textTransform: "uppercase", marginBottom: 4 \}\}>\{c\.label\}</div>

            <div style=\{\{ color: "\#0B1F45", fontSize: 14, fontWeight: 700, lineHeight: 1\.3 \}\}>\{c\.val\}</div>

          </div>

        \)\)\}

      </div>

      \{/\* Advisor card \*/\}

      <div style=\{\{ background: "linear\-gradient\(135deg, \#0B1F45, \#122B5E\)", borderRadius: 20, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space\-between", flexWrap: "wrap", gap: 18 \}\}>

        <div style=\{\{ display: "flex", alignItems: "center", gap: 18 \}\}>

          <div style=\{\{ width: 56, height: 56, borderRadius: "50%", background: "linear\-gradient\(135deg, \#27ae60, \#2ecc71\)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 4px 16px rgba\(39,174,96,0\.4\)" \}\}>👤</div>

          <div>

            <div style=\{\{ color: "rgba\(255,255,255,0\.4\)", fontSize: 10, fontWeight: 700, letterSpacing: 1\.2, textTransform: "uppercase" \}\}>Your Personal Advisor</div>

            <div style=\{\{ color: "\#fff", fontSize: 20, fontWeight: 900 \}\}>Jacob Levy</div>

            <div style=\{\{ color: "rgba\(255,255,255,0\.45\)", fontSize: 13 \}\}>Home\-Link Realty Group LLC · Licensed Buyer</div>

          </div>

        </div>

        <div style=\{\{ display: "flex", gap: 10, flexWrap: "wrap" \}\}>

          <a href=\{\`tel:$\{PHONE\_RAW\}\`\} style=\{\{ padding: "11px 18px", background: "\#27ae60", borderRadius: 10, color: "\#fff", fontWeight: 700, textDecoration: "none", fontSize: 14 \}\}>📞 Call</a>

          <a href=\{\`sms:$\{PHONE\_RAW\}\`\} style=\{\{ padding: "11px 18px", background: "rgba\(255,255,255,0\.1\)", border: "1px solid rgba\(255,255,255,0\.18\)", borderRadius: 10, color: "\#fff", fontWeight: 700, textDecoration: "none", fontSize: 14 \}\}>💬 Text</a>

          <button onClick=\{\(\) => setTab\("messages"\)\} style=\{\{ padding: "11px 18px", background: "rgba\(255,255,255,0\.1\)", border: "1px solid rgba\(255,255,255,0\.18\)", borderRadius: 10, color: "\#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 \}\}>✉️ Message</button>

        </div>

      </div>

      \{/\* Notification opt\-in \*/\}

      <div style=\{\{ background: "linear\-gradient\(135deg, \#eff6ff, \#dbeafe\)", borderRadius: 14, padding: "18px 22px", border: "1px solid \#bfdbfe", display: "flex", alignItems: "center", justifyContent: "space\-between", flexWrap: "wrap", gap: 12 \}\}>

        <div>

          <div style=\{\{ fontWeight: 700, color: "\#1e3a5f", fontSize: 14, marginBottom: 3 \}\}>🔔 Get status update notifications</div>

          <div style=\{\{ color: "\#3b5998", fontSize: 13 \}\}>We'll text you the moment your status changes so you're never left wondering\.</div>

        </div>

        <a href=\{\`sms:$\{PHONE\_RAW\}?body=I want status updates on my offer — $\{lead\.address || "my property"\}\`\} style=\{\{ padding: "10px 20px", background: "\#2563eb", borderRadius: 10, color: "\#fff", fontWeight: 700, textDecoration: "none", fontSize: 14, whiteSpace: "nowrap" \}\}>Enable Text Alerts</a>

      </div>

    </div>

  \);

\}
