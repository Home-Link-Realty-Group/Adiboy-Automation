# New Microsoft Word Document (90)

Source: New Microsoft Word Document (90).docx

import React from "react";

export default function CSVDropzone({ onFile, csvText, onPaste, template, accent = "#D4A843" }) {

  return (

    <>

      <label style={{

        display: "block",

        background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0.2))",

        backdropFilter: "blur(20px)",

        border: `2px dashed ${accent}66`,

        borderRadius: 16, padding: "44px 24px",

        textAlign: "center", cursor: "pointer", marginBottom: 16,

        transition: "all 0.2s",

      }}>

        <div style={{ fontSize: 42, marginBottom: 12 }}>📂</div>

        <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>Drop CSV here or click to browse</div>

        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Auto-detects columns, deduplicates against your CRM</div>

        <input type="file" accept=".csv,.txt" onChange={(e) => e.target.files[0] && onFile(e.target.files[0])} style={{ display: "none" }} />

      </label>

      <div style={{ marginBottom: 20 }}>

        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>

          Or paste CSV text directly

        </div>

        <textarea value={csvText} onChange={(e) => onPaste(e.target.value)} placeholder={template}

          style={{

            width: "100%", height: 140,

            background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,

            color: "#fff", padding: 14, fontSize: 12, fontFamily: "ui-monospace, monospace",

            resize: "vertical", boxSizing: "border-box", outline: "none",

          }} />

      </div>

    </>

  );

}
