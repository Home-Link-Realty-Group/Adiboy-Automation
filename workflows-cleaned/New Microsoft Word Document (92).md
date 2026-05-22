# New Microsoft Word Document (92)

Source: New Microsoft Word Document (92).docx

import React from "react";

export default function ImportResult({ imported, skipped, accent = "#D4A843" }) {

  return (

    <div style={{

      background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(0,0,0,0.3))",

      border: "1px solid rgba(16,185,129,0.3)",

      borderRadius: 14, padding: "20px 24px",

      animation: "fadein 0.3s ease",

    }}>

      <div style={{ fontWeight: 900, fontSize: 18, color: "#34d399", marginBottom: 12 }}>✅ Import Complete</div>

      <div style={{ fontSize: 14, marginBottom: 6, color: "#fff" }}>

        <span style={{ color: "#34d399", fontWeight: 700 }}>✅ {imported.length} leads imported</span> to CRM

      </div>

      {skipped.length > 0 && (

        <div style={{ fontSize: 14, color: "#fbbf24" }}>⚠️ {skipped.length} skipped (duplicates or errors)</div>

      )}

      <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>

        <a href="/CRM" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}>

          Open CRM →

        </a>

        <a href="/CallLists" style={{ background: accent, color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none", boxShadow: `0 4px 12px ${accent}55` }}>

          Start Calling →

        </a>

      </div>

    </div>

  );

}
