# New Microsoft Word Document (88)

Source: New Microsoft Word Document (88).docx

import React from "react";

export default function SourceCard\(\{ source: src, active, onToggle, onUpload \}\) \{

  return \(

    <div onClick=\{onToggle\} style=\{\{

      background: active

        ? \`linear\-gradient\(135deg, $\{src\.color\}15, rgba\(0,0,0,0\.3\)\)\`

        : "linear\-gradient\(135deg, rgba\(255,255,255,0\.04\), rgba\(0,0,0,0\.2\)\)",

      backdropFilter: "blur\(20px\)",

      border: \`1\.5px solid $\{active ? src\.color : "rgba\(255,255,255,0\.08\)"\}\`,

      borderRadius: 16,

      padding: "20px 22px",

      cursor: "pointer",

      transition: "all 0\.25s ease",

      transform: active ? "translateY\(\-2px\)" : "none",

      boxShadow: active ? \`0 12px 40px $\{src\.color\}33\` : "0 2px 8px rgba\(0,0,0,0\.1\)",

    \}\}>

      <div style=\{\{ display: "flex", alignItems: "flex\-start", gap: 12, marginBottom: 12 \}\}>

        <span style=\{\{ fontSize: 28, lineHeight: 1 \}\}>\{src\.icon\}</span>

        <div style=\{\{ flex: 1, minWidth: 0 \}\}>

          <div style=\{\{ fontWeight: 800, fontSize: 15, color: "\#fff", marginBottom: 6 \}\}>\{src\.label\}</div>

          <div style=\{\{ display: "flex", flexWrap: "wrap", gap: 6 \}\}>

            <span style=\{\{ background: src\.cost\.includes\("FREE"\) ? "rgba\(16,185,129,0\.15\)" : "rgba\(212,168,67,0\.15\)", color: src\.cost\.includes\("FREE"\) ? "\#34d399" : "\#fcd34d", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 100 \}\}>

              \{src\.cost\.includes\("FREE"\) ? "✅" : "💰"\} \{src\.cost\}

            </span>

            <span style=\{\{ background: "rgba\(255,255,255,0\.08\)", color: "rgba\(255,255,255,0\.7\)", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100 \}\}>

              ⚡ \{src\.speed\}

            </span>

            <span style=\{\{ background: "rgba\(124,58,237,0\.15\)", color: "\#a78bfa", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100 \}\}>

              🎯 \{src\.accuracy\}

            </span>

          </div>

        </div>

      </div>

      <div style=\{\{ fontSize: 13, color: "rgba\(255,255,255,0\.7\)", marginBottom: 12, lineHeight: 1\.55 \}\}>\{src\.desc\}</div>

      \{active && \(

        <div style=\{\{

          borderTop: "1px solid rgba\(255,255,255,0\.1\)", paddingTop: 14, marginTop: 10,

          animation: "fadein 0\.3s ease",

        \}\}>

          <div style=\{\{ fontWeight: 700, fontSize: 12, color: src\.color, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 \}\}>📋 Exact Steps</div>

          \{src\.steps\.map\(\(step, i\) => \(

            <div key=\{i\} style=\{\{ display: "flex", gap: 10, marginBottom: 9, alignItems: "flex\-start" \}\}>

              <div style=\{\{

                background: \`linear\-gradient\(135deg, $\{src\.color\}, $\{src\.color\}99\)\`,

                borderRadius: "50%", width: 22, height: 22,

                display: "flex", alignItems: "center", justifyContent: "center",

                fontSize: 11, fontWeight: 800, flexShrink: 0, color: "\#fff",

                boxShadow: \`0 2px 8px $\{src\.color\}55\`,

              \}\}>\{i \+ 1\}</div>

              <div style=\{\{ fontSize: 13, color: "rgba\(255,255,255,0\.85\)", lineHeight: 1\.5 \}\}>\{step\}</div>

            </div>

          \)\)\}

          <div style=\{\{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" \}\}>

            <a href=\{src\.link\} target="\_blank" rel="noopener noreferrer" onClick=\{e => e\.stopPropagation\(\)\}

              style=\{\{ background: src\.color, color: "\#fff", padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none", boxShadow: \`0 4px 12px $\{src\.color\}55\` \}\}>

              \{src\.linkLabel\}

            </a>

            <button onClick=\{\(e\) => \{ e\.stopPropagation\(\); onUpload\(\); \}\}

              style=\{\{ background: "rgba\(255,255,255,0\.08\)", color: "\#fff", border: "1px solid rgba\(255,255,255,0\.12\)", padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" \}\}>

              Upload CSV →

            </button>

          </div>

        </div>

      \)\}

    </div>

  \);

\}
