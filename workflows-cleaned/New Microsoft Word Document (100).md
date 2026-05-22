# New Microsoft Word Document (100)

Source: New Microsoft Word Document (100).docx

import { PHONE, PHONE_RAW, DOCS_CHECKLIST } from "./portalConstants";

export default function DocumentsTab() {

  return (

    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      <div style={{ background: "#fff", borderRadius: 20, padding: "36px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>

        <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "#0B1F45" }}>📁 Closing Documents Checklist</h2>

        <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 28px", lineHeight: 1.6 }}>Here's everything you may need to bring or have ready for closing. The title company will confirm exactly which apply to your situation.</p>

        {DOCS_CHECKLIST.map((section, si) => (

          <div key={si} style={{ marginBottom: 24 }}>

            <div style={{ fontWeight: 800, color: "#0B1F45", fontSize: 16, marginBottom: 12, padding: "8px 14px", background: "#f8fafc", borderRadius: 10 }}>{section.cat}</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 8 }}>

              {section.items.map((item, ii) => (

                <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>

                  <span style={{ color: "#27ae60", fontWeight: 900, fontSize: 16, flexShrink: 0, marginTop: 1 }}>☑</span>

                  <span style={{ color: "#374151", fontSize: 14, lineHeight: 1.5 }}>{item}</span>

                </div>

              ))}

            </div>

          </div>

        ))}

        <div style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)", borderRadius: 14, padding: "20px 22px", border: "1px solid #bfdbfe" }}>

          <div style={{ fontWeight: 800, color: "#1e40af", fontSize: 15, marginBottom: 6 }}>💡 Don't stress about this list</div>

          <p style={{ color: "#1e3a5f", fontSize: 13, margin: 0, lineHeight: 1.6 }}>The title company will walk you through exactly what you need before your closing appointment. If you have questions, call us at <a href={`tel:${PHONE_RAW}`} style={{ color: "#2563eb", fontWeight: 700 }}>{PHONE}</a>.</p>

        </div>

      </div>

      <div style={{ background: "#fff", borderRadius: 20, padding: "32px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>

        <h3 style={{ margin: "0 0 20px", fontWeight: 900, color: "#0B1F45", fontSize: 18 }}>🏛️ What Happens at Closing</h3>

        {[

          { n: "1", title: "Arrive at the title office (or we send a mobile notary to you)", desc: "Most closings take 20–30 minutes. You'll be in a comfortable office with a professional closer walking you through each document." },

          { n: "2", title: "Review and sign the closing disclosure", desc: "This document shows exactly what you'll receive after payoffs. No surprises — you've seen the numbers throughout." },

          { n: "3", title: "Sign the deed transfer and seller documents", desc: "A short stack of documents. The closer explains each one before you sign. Questions are always welcome." },

          { n: "4", title: "Receive your funds", desc: "Cash is wired to your bank account same day. Most sellers have funds within 2–4 hours of signing." },

        ].map((s, i) => (

          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 18, paddingBottom: 18, borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>

            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #27ae60, #2ecc71)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{s.n}</div>

            <div>

              <div style={{ fontWeight: 700, color: "#0B1F45", fontSize: 14, marginBottom: 4 }}>{s.title}</div>

              <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
