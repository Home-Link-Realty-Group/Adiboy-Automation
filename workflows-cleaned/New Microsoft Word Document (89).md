# New Microsoft Word Document (89)

Source: New Microsoft Word Document (89).docx

import React from "react";

export default function StatGrid({ stats }) {

  return (

    <div style={{

      display: "grid",

      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",

      gap: 14,

      marginBottom: 28,

    }}>

      {stats.map(s => (

        <div key={s.label} style={{

          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))",

          backdropFilter: "blur(20px)",

          border: "1px solid rgba(255,255,255,0.08)",

          borderRadius: 14, padding: "16px 18px",

          position: "relative", overflow: "hidden",

        }}>

          <div aria-hidden style={{

            position: "absolute", top: -10, right: -10, width: 60, height: 60,

            borderRadius: "50%", background: `${s.color}22`, filter: "blur(20px)",

          }} />

          <div style={{ position: "relative" }}>

            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>

            <div style={{ fontSize: 22, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>

            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>

          </div>

        </div>

      ))}

    </div>

  );

}
