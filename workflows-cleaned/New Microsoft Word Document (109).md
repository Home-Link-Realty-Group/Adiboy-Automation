# New Microsoft Word Document (109)

Source: New Microsoft Word Document (109).docx

import { TIMELINE_STEPS } from "./portalConstants";

export default function TimelineTab({ statusIdx }) {

  return (

    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      <div style={{ background: "#fff", borderRadius: 20, padding: "36px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>

        <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "#0B1F45" }}>📅 Closing Timeline</h2>

        <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 32px" }}>From inquiry to cash in hand — here's exactly what happens and when.</p>

        <div style={{ position: "relative", paddingLeft: 44 }}>

          <div style={{ position: "absolute", left: 14, top: 10, bottom: 10, width: 3, background: "linear-gradient(180deg, #27ae60, #86efac)", borderRadius: 4 }} />

          {TIMELINE_STEPS.map((step, i) => {

            const isActive = i <= statusIdx;

            return (

              <div key={i} style={{ position: "relative", marginBottom: 22 }}>

                <div style={{ position: "absolute", left: -36, top: 2, width: 28, height: 28, borderRadius: "50%", background: isActive ? "linear-gradient(135deg, #27ae60, #2ecc71)" : "#f1f5f9", border: isActive ? "none" : "2px solid #dde3ec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isActive ? 12 : 13, color: isActive ? "#fff" : "#94a3b8", fontWeight: 900 }}>

                  {isActive ? "✓" : step.icon}

                </div>

                <div style={{ background: isActive ? "#f0fff4" : "#f8fafc", border: isActive ? "1px solid #bbf7d0" : "1px solid #e8edf4", borderRadius: 14, padding: "16px 20px", transition: "all 0.3s" }}>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>

                    <span style={{ background: isActive ? "#27ae60" : "#64748b", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 10 }}>{step.day}</span>

                    <span style={{ fontWeight: 800, color: "#0B1F45", fontSize: 15 }}>{step.title}</span>

                  </div>

                  <p style={{ color: "#475569", fontSize: 13, margin: 0, lineHeight: 1.6 }}>{step.desc}</p>

                </div>

              </div>

            );

          })}

        </div>

      </div>

      <div style={{ background: "linear-gradient(135deg, #f0fff4, #dcfce7)", borderRadius: 20, padding: "28px 32px", border: "1px solid #bbf7d0" }}>

        <div style={{ fontWeight: 900, fontSize: 18, color: "#0B1F45", marginBottom: 10 }}>🏆 Our Flexibility Guarantee</div>

        <p style={{ color: "#374151", fontSize: 15, margin: 0, lineHeight: 1.7 }}>We close on <strong>your timeline</strong> — not ours. Need 3 days because you're facing foreclosure? Done. Need 45 days to find your next home first? Absolutely. We've worked with every situation imaginable. Just tell us what you need.</p>

      </div>

    </div>

  );

}
