# New Microsoft Word Document (103)

Source: New Microsoft Word Document (103).docx

import \{ useState \} from "react";

import \{ Lead \} from "@/api/entities";

import \{ PHONE, PHONE\_RAW, EMAIL \} from "\./portalConstants";

export default function MessagesTab\(\{ lead, setLead, messages, setMessages \}\) \{

  const \[msgText, setMsgText\] = useState\(""\);

  const \[msgSent, setMsgSent\] = useState\(false\);

  async function sendMessage\(\) \{

    if \(\!msgText\.trim\(\) || \!lead?\.id\) return;

    const dateStr = new Date\(\)\.toLocaleDateString\(\);

    await Lead\.update\(lead\.id, \{ notes: \`$\{lead\.notes || ""\}\\n\[SELLER MESSAGE $\{dateStr\}\]: $\{msgText\}\` \}\);

    setMessages\(prev => \[\.\.\.prev, \{ id: Date\.now\(\), from: "seller", date: dateStr, text: msgText \}\]\);

    setMsgText\(""\);

    setMsgSent\(true\);

    setTimeout\(\(\) => setMsgSent\(false\), 4000\);

  \}

  return \(

    <div style=\{\{ background: "\#fff", borderRadius: 20, padding: "36px", boxShadow: "0 2px 16px rgba\(0,0,0,0\.06\)" \}\}>

      <h2 style=\{\{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "\#0B1F45" \}\}>💬 Message Jacob</h2>

      <p style=\{\{ color: "\#64748b", fontSize: 14, margin: "0 0 24px", lineHeight: 1\.6 \}\}>Questions, concerns, or updates on your situation — send a message and Jacob will respond personally, usually within a few hours\.</p>

      \{messages\.length > 0 && \(

        <div style=\{\{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 12 \}\}>

          \{messages\.map\(m => \(

            <div key=\{m\.id\} style=\{\{ display: "flex", justifyContent: "flex\-end" \}\}>

              <div style=\{\{ maxWidth: "75%", background: "linear\-gradient\(135deg, \#27ae60, \#2ecc71\)", borderRadius: "14px 14px 4px 14px", padding: "12px 16px" \}\}>

                <div style=\{\{ color: "\#fff", fontSize: 14, lineHeight: 1\.5 \}\}>\{m\.text\}</div>

                <div style=\{\{ color: "rgba\(255,255,255,0\.6\)", fontSize: 11, marginTop: 5, textAlign: "right" \}\}>\{m\.date\}</div>

              </div>

            </div>

          \)\)\}

          <div style=\{\{ display: "flex", justifyContent: "flex\-start" \}\}>

            <div style=\{\{ maxWidth: "75%", background: "\#f1f5f9", borderRadius: "14px 14px 14px 4px", padding: "12px 16px" \}\}>

              <div style=\{\{ color: "\#374151", fontSize: 14, lineHeight: 1\.5 \}\}>Thanks for your message\! Jacob has been notified and will respond via call or text shortly\. You can also reach us any time at <strong>\{PHONE\}</strong>\.</div>

              <div style=\{\{ color: "\#94a3b8", fontSize: 11, marginTop: 5 \}\}>Home\-Link Realty Group</div>

            </div>

          </div>

        </div>

      \)\}

      <div>

        \{msgSent && \(

          <div style=\{\{ background: "\#f0fff4", border: "1px solid \#bbf7d0", borderRadius: 12, padding: "12px 16px", color: "\#15803d", fontSize: 14, fontWeight: 600, marginBottom: 14 \}\}>

            ✅ Message sent\! Jacob will respond shortly\.

          </div>

        \)\}

        <textarea

          value=\{msgText\}

          onChange=\{e => setMsgText\(e\.target\.value\)\}

          rows=\{5\}

          placeholder="Hi Jacob, I wanted to ask about\.\.\."

          style=\{\{ width: "100%", padding: "16px", borderRadius: 14, border: "1\.5px solid \#e2e8f0", fontSize: 14, resize: "vertical", boxSizing: "border\-box", lineHeight: 1\.6, outline: "none", color: "\#374151", fontFamily: "'Inter', sans\-serif" \}\}

          onFocus=\{e => e\.target\.style\.borderColor = "\#27ae60"\}

          onBlur=\{e => e\.target\.style\.borderColor = "\#e2e8f0"\}

        />

        <button onClick=\{sendMessage\} disabled=\{\!msgText\.trim\(\)\} style=\{\{ width: "100%", marginTop: 10, padding: "14px", background: msgText\.trim\(\) ? "linear\-gradient\(135deg, \#27ae60, \#2ecc71\)" : "\#f1f5f9", border: "none", borderRadius: 12, color: msgText\.trim\(\) ? "\#fff" : "\#94a3b8", fontWeight: 800, fontSize: 15, cursor: msgText\.trim\(\) ? "pointer" : "default", transition: "all 0\.2s" \}\}>

          📨 Send Message to Jacob

        </button>

      </div>

      <div style=\{\{ borderTop: "1px solid \#f1f5f9", marginTop: 28, paddingTop: 22 \}\}>

        <div style=\{\{ color: "\#94a3b8", fontSize: 11, fontWeight: 700, letterSpacing: 0\.8, textTransform: "uppercase", marginBottom: 12 \}\}>Prefer a direct line?</div>

        <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 \}\}>

          <a href=\{\`tel:$\{PHONE\_RAW\}\`\} style=\{\{ padding: "14px 10px", background: "\#f0fff4", borderRadius: 12, color: "\#15803d", fontWeight: 700, textDecoration: "none", textAlign: "center", fontSize: 14, border: "1px solid \#bbf7d0" \}\}>📞 Call</a>

          <a href=\{\`sms:$\{PHONE\_RAW\}\`\} style=\{\{ padding: "14px 10px", background: "\#eff6ff", borderRadius: 12, color: "\#1d4ed8", fontWeight: 700, textDecoration: "none", textAlign: "center", fontSize: 14, border: "1px solid \#bfdbfe" \}\}>💬 Text</a>

          <a href=\{\`mailto:$\{EMAIL\}\`\} style=\{\{ padding: "14px 10px", background: "\#fdf4ff", borderRadius: 12, color: "\#7c3aed", fontWeight: 700, textDecoration: "none", textAlign: "center", fontSize: 14, border: "1px solid \#e9d5ff" \}\}>✉️ Email</a>

        </div>

      </div>

    </div>

  \);

\}
