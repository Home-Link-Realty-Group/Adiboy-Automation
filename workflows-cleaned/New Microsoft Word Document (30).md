# New Microsoft Word Document (30)

Source: New Microsoft Word Document (30).docx

import React, { useState } from "react";

const NAVY = "#0B1F45";

const GOLD = "#D4A843";

export default function KPISection({ kpiEdit, setKpiEdit, allKPIsMet, saveKPI, loading }) {

  const kpiGoals = { calls_made: 60, talk_time_hours: 3.5, offers_made: 3, contacts_reached: 15 };

  const kpiPct = (key) => Math.min(100, Math.round(((kpiEdit[key] || 0) / kpiGoals[key]) * 100));

  return (

    <div>

      <div style={{ marginBottom: 24 }}>

        <h1 style={{ fontSize: 22, fontWeight: 900, color: NAVY, margin: "0 0 4px" }}>📊 Daily KPI Tracker</h1>

        <div style={{ fontSize: 13, color: "#888" }}>Eric Cline's non-negotiable daily targets — hit these every day, deals follow.</div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>

        {[

          { key: "calls_made", label: "Outbound Dials", goal: 60, icon: "📞", unit: "calls", note: "Must ring 3+ times each" },

          { key: "talk_time_hours", label: "Seller Talk Time", goal: 3.5, icon: "⏱️", unit: "hrs", note: "3.5–6 hrs = deals happen here" },

          { key: "offers_made", label: "Offers Made", goal: 3, icon: "💵", unit: "offers", note: "3–4 per day minimum" },

          { key: "contacts_reached", label: "Contacts Reached", goal: 15, icon: "🤝", unit: "contacts", note: "Live conversations" },

        ].map(kpi => {

          const val = kpiEdit[kpi.key] || 0;

          const pct = Math.min(100, Math.round((val / kpi.goal) * 100));

          const met = val >= kpi.goal;

          return (

            <div key={kpi.key} style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", borderTop: `4px solid ${met ? "#27ae60" : GOLD}` }}>

              <div style={{ fontSize: 26, marginBottom: 6 }}>{kpi.icon}</div>

              <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>{kpi.label.toUpperCase()}</div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>

                <input type="number" value={val}

                  onChange={e => setKpiEdit(p => ({ ...p, [kpi.key]: parseFloat(e.target.value) || 0 }))}

                  style={{ width: 60, padding: "6px 8px", border: "2px solid " + (met ? "#27ae60" : GOLD), borderRadius: 8, fontSize: 20, fontWeight: 900, textAlign: "center", color: met ? "#27ae60" : NAVY }} />

                <span style={{ fontSize: 13, color: "#888" }}>/ {kpi.goal} {kpi.unit}</span>

              </div>

              <div style={{ background: "#f0f0f0", borderRadius: 6, height: 8, overflow: "hidden", marginBottom: 6 }}>

                <div style={{ width: `${pct}%`, height: "100%", background: met ? "#27ae60" : pct >= 60 ? "#f5a623" : GOLD, transition: "width 0.4s" }} />

              </div>

              <div style={{ fontSize: 11, color: met ? "#27ae60" : "#888", fontWeight: met ? 700 : 400 }}>

                {met ? "✅ GOAL MET" : `${pct}% — ${kpi.goal - val} more to go`}

              </div>

              <div style={{ fontSize: 10, color: "#bbb", marginTop: 4 }}>{kpi.note}</div>

            </div>

          );

        })}

      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>

        <button onClick={saveKPI} style={{ background: GOLD, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Save Today's KPIs</button>

        {allKPIsMet && <div style={{ background: "#f0fff4", border: "2px solid #27ae60", borderRadius: 10, padding: "10px 18px", fontWeight: 800, color: "#27ae60", fontSize: 14 }}>🏆 ALL DAILY KPIs MET — Great work today!</div>}

      </div>

      <div style={{ background: NAVY, borderRadius: 14, padding: 24, color: "#fff", marginBottom: 24 }}>

        <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 16, color: GOLD }}>Eric Cline's Formula → $2.6M Year 1</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>

          {[

            { label: "Daily Dials", value: "60+", sub: "Must ring 3+ times each" },

            { label: "Talk Time", value: "3.5–6 hrs", sub: "Where deals actually happen" },

            { label: "Daily Offers", value: "3–4", sub: "No offer = no deal" },

            { label: "Lead Filters", value: "ARV ≤ $350K", sub: "30–100% equity, owned 10+ yrs" },

            { label: "Team Size (Year 1)", value: "5 callers + himself", sub: "He still called his best leads" },

            { label: "Year 1 Revenue", value: "$2.6M", sub: "Pure discipline + system" },

          ].map(item => (

            <div key={item.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 14 }}>

              <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{item.label}</div>

              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{item.value}</div>

              <div style={{ fontSize: 10, color: "#666", marginTop: 3 }}>{item.sub}</div>

            </div>

          ))}

        </div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>

        {[

          { label: "Total Leads", value: "—", color: "#3498db" },

          { label: "Qualified (Eric's Filters)", value: "—", color: "#27ae60" },

          { label: "Under Contract", value: "—", color: "#f39c12" },

          { label: "Revenue Closed", value: "$—", color: GOLD },

        ].map(c => (

          <div key={c.label} style={{ background: "#fff", borderRadius: 12, padding: 16, borderTop: `3px solid ${c.color}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>

            <div style={{ fontSize: 22, fontWeight: 900, color: NAVY }}>{c.value}</div>

            <div style={{ fontSize: 11, color: "#888" }}>{c.label}</div>

          </div>

        ))}

      </div>

    </div>

  );

}
