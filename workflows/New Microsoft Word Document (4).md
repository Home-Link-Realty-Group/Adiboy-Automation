# New Microsoft Word Document (4)

Source: New Microsoft Word Document (4).docx

import React from "react";

export default function BuyerCard\(\{ buyer: b, onEdit, onDelete \}\) \{

  const statusMeta = \{

    "Hot":      \{ color: "\#ef4444", bg: "rgba\(239,68,68,0\.15\)", icon: "🔥" \},

    "Active":   \{ color: "\#10b981", bg: "rgba\(16,185,129,0\.15\)", icon: "✅" \},

    "Inactive": \{ color: "\#94a3b8", bg: "rgba\(148,163,184,0\.15\)", icon: "⏸️" \},

  \}\[b\.status\] || \{ color: "\#94a3b8", bg: "rgba\(148,163,184,0\.15\)", icon: "•" \};

  return \(

    <div style=\{\{

      background: "linear\-gradient\(135deg, rgba\(255,255,255,0\.04\), rgba\(0,0,0,0\.25\)\)",

      backdropFilter: "blur\(20px\)",

      border: \`1px solid $\{b\.status === "Hot" ? "rgba\(239,68,68,0\.3\)" : "rgba\(255,255,255,0\.08\)"\}\`,

      borderRadius: 16, padding: 20,

      transition: "all 0\.2s",

      position: "relative",

    \}\}>

      <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "flex\-start", marginBottom: 12, gap: 8 \}\}>

        <div style=\{\{ flex: 1, minWidth: 0 \}\}>

          <div style=\{\{ fontWeight: 800, fontSize: 16, color: "\#fff", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis" \}\}>

            \{b\.name || "Unnamed Buyer"\}

          </div>

          <span style=\{\{ background: statusMeta\.bg, color: statusMeta\.color, fontSize: 10, fontWeight: 800, padding: "3px 9px", borderRadius: 100, letterSpacing: 0\.5 \}\}>

            \{statusMeta\.icon\} \{b\.status || "Active"\}

          </span>

          \{b\.proof\_of\_funds && \(

            <span style=\{\{ marginLeft: 6, background: "rgba\(16,185,129,0\.15\)", color: "\#34d399", fontSize: 10, fontWeight: 800, padding: "3px 9px", borderRadius: 100 \}\}>

              ✅ POF

            </span>

          \)\}

        </div>

        <div style=\{\{ display: "flex", gap: 4 \}\}>

          <button onClick=\{onEdit\} aria\-label="Edit buyer"

            style=\{\{ background: "rgba\(255,255,255,0\.06\)", border: "none", color: "\#fff", padding: "5px 9px", borderRadius: 6, cursor: "pointer", fontSize: 13 \}\}>✏️</button>

          <button onClick=\{onDelete\} aria\-label="Delete buyer"

            style=\{\{ background: "rgba\(239,68,68,0\.1\)", border: "none", color: "\#ef4444", padding: "5px 9px", borderRadius: 6, cursor: "pointer", fontSize: 13 \}\}>🗑</button>

        </div>

      </div>

      \{/\* Contact \*/\}

      <div style=\{\{ marginBottom: 14, fontSize: 12, color: "rgba\(255,255,255,0\.65\)", display: "flex", flexDirection: "column", gap: 4 \}\}>

        \{b\.phone && <div>📞 <a href=\{\`tel:$\{b\.phone\}\`\} style=\{\{ color: "\#60a5fa", textDecoration: "none" \}\}>\{b\.phone\}</a></div>\}

        \{b\.email && <div>✉️ <a href=\{\`mailto:$\{b\.email\}\`\} style=\{\{ color: "\#34d399", textDecoration: "none" \}\}>\{b\.email\}</a></div>\}

      </div>

      \{/\* Buy box \*/\}

      <div style=\{\{ background: "rgba\(0,0,0,0\.3\)", borderRadius: 10, padding: 12, marginBottom: 12 \}\}>

        <div style=\{\{ fontSize: 10, fontWeight: 800, color: "rgba\(255,255,255,0\.5\)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 \}\}>Buy Box</div>

        <div style=\{\{ display: "flex", flexWrap: "wrap", gap: 6 \}\}>

          \{b\.buy\_areas && <span style=\{\{ fontSize: 11, background: "rgba\(99,102,241,0\.15\)", color: "\#a5b4fc", padding: "3px 8px", borderRadius: 6 \}\}>📍 \{b\.buy\_areas\}</span>\}

          \{b\.property\_types && <span style=\{\{ fontSize: 11, background: "rgba\(124,58,237,0\.15\)", color: "\#c4b5fd", padding: "3px 8px", borderRadius: 6 \}\}>🏠 \{b\.property\_types\}</span>\}

          \{\(b\.price\_min || b\.price\_max\) && \(

            <span style=\{\{ fontSize: 11, background: "rgba\(212,168,67,0\.15\)", color: "\#fcd34d", padding: "3px 8px", borderRadius: 6 \}\}>

              💰 $\{\(b\.price\_min ? Math\.round\(b\.price\_min/1000\) : "0"\)\}K–$\{\(b\.price\_max ? Math\.round\(b\.price\_max/1000\) : "?"\)\}K

            </span>

          \)\}

          \{b\.arv\_max\_percent && <span style=\{\{ fontSize: 11, background: "rgba\(16,185,129,0\.15\)", color: "\#34d399", padding: "3px 8px", borderRadius: 6 \}\}>≤\{b\.arv\_max\_percent\}% ARV</span>\}

          \{b\.beds\_min && <span style=\{\{ fontSize: 11, background: "rgba\(255,255,255,0\.06\)", color: "rgba\(255,255,255,0\.7\)", padding: "3px 8px", borderRadius: 6 \}\}>🛏 \{b\.beds\_min\}\+</span>\}

          \{b\.closing\_timeline && <span style=\{\{ fontSize: 11, background: "rgba\(239,68,68,0\.15\)", color: "\#fca5a5", padding: "3px 8px", borderRadius: 6 \}\}>⏱ \{b\.closing\_timeline\}</span>\}

        </div>

      </div>

      \{b\.total\_deals\_bought > 0 && \(

        <div style=\{\{ fontSize: 12, color: "\#fcd34d", fontWeight: 700 \}\}>

          🤝 \{b\.total\_deals\_bought\} deal\{b\.total\_deals\_bought \!== 1 ? "s" : ""\} closed with you

        </div>

      \)\}

      \{b\.notes && \(

        <div style=\{\{ fontSize: 11, color: "rgba\(255,255,255,0\.5\)", marginTop: 8, lineHeight: 1\.5, fontStyle: "italic" \}\}>

          "\{b\.notes\.slice\(0, 100\)\}\{b\.notes\.length > 100 ? "\.\.\." : ""\}"

        </div>

      \)\}

    </div>

  \);

\}
