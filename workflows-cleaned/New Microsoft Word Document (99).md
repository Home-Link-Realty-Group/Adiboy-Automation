# New Microsoft Word Document (99)

Source: New Microsoft Word Document (99).docx

import ESigningFlow from "@/components/ESigningFlow";

import { PHONE_RAW } from "./portalConstants";

export default function ContractTab({ lead, deal, offerAmt, contractAccepted, contractStep, setContractStep, acceptContract, setTab }) {

  return (

    <div style={{ background: "#fff", borderRadius: 20, padding: "36px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>

      <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "#0B1F45" }}>✍️ Purchase Agreement</h2>

      <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 32px", lineHeight: 1.6 }}>Accepting our offer is simple. The process takes about 5 minutes and can be done entirely from your phone.</p>

      {contractAccepted ? (

        <div style={{ textAlign: "center", padding: "32px 0" }}>

          <div style={{ width: 88, height: 88, background: "linear-gradient(135deg, #27ae60, #2ecc71)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, margin: "0 auto 20px", boxShadow: "0 8px 32px rgba(39,174,96,0.3)" }}>✓</div>

          <h3 style={{ color: "#27ae60", fontWeight: 900, fontSize: 24, marginBottom: 10 }}>You're Under Contract!</h3>

          <p style={{ color: "#64748b", fontSize: 15, maxWidth: 420, margin: "0 auto 24px", lineHeight: 1.7 }}>Purchase agreement is on its way to your phone and email. Title company has been notified and escrow will be opened within 1 business day.</p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>

            <button onClick={() => setTab("timeline")} style={{ padding: "12px 24px", background: "linear-gradient(135deg, #27ae60, #2ecc71)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>📅 View Timeline</button>

            <button onClick={() => setTab("documents")} style={{ padding: "12px 24px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, color: "#0B1F45", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>📁 Closing Docs Checklist</button>

          </div>

        </div>

      ) : (

        <div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>

            {[

              { n: 1, icon: "💰", title: "Review the Offer",   desc: "Review your cash offer amount, close date, and terms in the 'My Offer' tab.", done: offerAmt > 0 },

              { n: 2, icon: "✅", title: "Indicate Acceptance", desc: "Click 'I Accept This Offer' below. We'll send a contract to your phone immediately.", done: contractStep >= 1 },

              { n: 3, icon: "✍️", title: "Sign the Agreement", desc: "Sign electronically in 60 seconds. No printing, no scanning, no DocuSign emails.", done: contractStep >= 2 },

              { n: 4, icon: "🏛️", title: "We Open Escrow",    desc: "Title company opens escrow same day. You're officially under contract.", done: contractAccepted },

            ].map((s, i) => (

              <div key={i} style={{ background: s.done ? "#f0fff4" : "#f8fafc", border: `1px solid ${s.done ? "#bbf7d0" : "#e2e8f0"}`, borderRadius: 14, padding: "18px" }}>

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>

                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: s.done ? "linear-gradient(135deg, #27ae60, #2ecc71)" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: s.done ? 14 : 16, color: s.done ? "#fff" : "#94a3b8", fontWeight: 900, flexShrink: 0 }}>{s.done ? "✓" : s.icon}</div>

                  <div style={{ fontWeight: 800, color: "#0B1F45", fontSize: 14 }}>Step {s.n}: {s.title}</div>

                </div>

                <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>

              </div>

            ))}

          </div>

          {!deal ? (

            <div style={{ background: "#f8fafc", borderRadius: 14, padding: "22px", textAlign: "center" }}>

              <div style={{ color: "#64748b", fontSize: 14, marginBottom: 14 }}>Your offer is still being prepared. Once it's ready, you'll be able to accept it here.</div>

              <a href={`tel:${PHONE_RAW}`} style={{ display: "inline-block", padding: "12px 24px", background: "#27ae60", borderRadius: 10, color: "#fff", fontWeight: 700, textDecoration: "none" }}>📞 Expedite My Offer</a>

            </div>

          ) : contractStep === 0 ? (

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

              <div style={{ background: "#fffbeb", borderRadius: 14, padding: "16px 20px", border: "1px solid #fde68a", fontSize: 14, color: "#92400e" }}>

                ⚠️ <strong>Important:</strong> By accepting, you authorize Home-Link Realty Group LLC to prepare a purchase agreement for {lead.address}. You are not obligated to sign — you may review the agreement before making a final decision.

              </div>

              <button onClick={() => setContractStep(1)} style={{ padding: "16px", background: "linear-gradient(135deg, #27ae60, #2ecc71)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 20px rgba(39,174,96,0.3)" }}>

                ✅ I Accept — Send Me the Purchase Agreement

              </button>

              <a href={`tel:${PHONE_RAW}`} style={{ padding: "14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, color: "#0B1F45", fontWeight: 700, fontSize: 15, textDecoration: "none", textAlign: "center" }}>📞 I Have Questions First</a>

            </div>

          ) : contractStep === 1 ? (

            <ESigningFlow lead={lead} offer={offerAmt} onComplete={() => { acceptContract(); setContractStep(2); }} />

          ) : null}

        </div>

      )}

    </div>

  );

}
