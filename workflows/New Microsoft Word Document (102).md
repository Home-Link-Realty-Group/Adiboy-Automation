# New Microsoft Word Document (102)

Source: New Microsoft Word Document (102).docx

import \{ useState \} from "react";

import \{ PHONE, PHONE\_RAW, FAQS \} from "\./portalConstants";

export default function FAQTab\(\{ setTab \}\) \{

  const \[faqOpen, setFaqOpen\] = useState\(null\);

  return \(

    <div style=\{\{ display: "flex", flexDirection: "column", gap: 12 \}\}>

      <div style=\{\{ background: "\#fff", borderRadius: 20, padding: "36px", boxShadow: "0 2px 16px rgba\(0,0,0,0\.06\)" \}\}>

        <h2 style=\{\{ margin: "0 0 8px", fontSize: 20, fontWeight: 900, color: "\#0B1F45" \}\}>❓ Frequently Asked Questions</h2>

        <p style=\{\{ color: "\#64748b", fontSize: 14, margin: "0 0 28px" \}\}>10 questions every seller asks — answered honestly\.</p>

        \{FAQS\.map\(\(item, i\) => \(

          <div key=\{i\} style=\{\{ borderBottom: i < FAQS\.length \- 1 ? "1px solid \#f1f5f9" : "none", overflow: "hidden" \}\}>

            <button onClick=\{\(\) => setFaqOpen\(faqOpen === i ? null : i\)\} style=\{\{ width: "100%", padding: "18px 4px", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "space\-between", cursor: "pointer", textAlign: "left", gap: 12 \}\}>

              <span style=\{\{ fontWeight: 700, color: "\#0B1F45", fontSize: 15, lineHeight: 1\.4 \}\}>Q: \{item\.q\}</span>

              <span style=\{\{ color: "\#27ae60", fontSize: 20, fontWeight: 900, flexShrink: 0, transform: faqOpen === i ? "rotate\(45deg\)" : "none", transition: "transform 0\.2s" \}\}>\+</span>

            </button>

            \{faqOpen === i && \(

              <div style=\{\{ padding: "4px 4px 20px", color: "\#475569", fontSize: 14, lineHeight: 1\.75 \}\}>

                A: \{item\.a\}

              </div>

            \)\}

          </div>

        \)\)\}

      </div>

      <div style=\{\{ background: "linear\-gradient\(135deg, \#f0fff4, \#dcfce7\)", borderRadius: 20, padding: "28px 32px", border: "1px solid \#bbf7d0", textAlign: "center" \}\}>

        <div style=\{\{ fontWeight: 900, color: "\#0B1F45", fontSize: 18, marginBottom: 8 \}\}>Still have questions?</div>

        <p style=\{\{ color: "\#374151", fontSize: 14, margin: "0 0 20px" \}\}>Jacob answers his own phone\. Call or text any time\.</p>

        <div style=\{\{ display: "flex", gap: 12, justifyContent: "center" \}\}>

          <a href=\{\`tel:$\{PHONE\_RAW\}\`\} style=\{\{ padding: "13px 28px", background: "\#27ae60", borderRadius: 12, color: "\#fff", fontWeight: 700, textDecoration: "none", fontSize: 15 \}\}>📞 Call \{PHONE\}</a>

          <button onClick=\{\(\) => setTab\("messages"\)\} style=\{\{ padding: "13px 28px", background: "\#fff", border: "1px solid \#bbf7d0", borderRadius: 12, color: "\#27ae60", fontWeight: 700, cursor: "pointer", fontSize: 15 \}\}>✉️ Send a Message</button>

        </div>

      </div>

    </div>

  \);

\}
