# New Microsoft Word Document (22)

Source: New Microsoft Word Document (22).docx

// Action-priority list of conversion fixes ranked by impact

const NAVY = "#0B1F45", RED = "#dc2626", AMBER = "#f59e0b", BLUE = "#3b82f6";

const PRIORITY_STYLES = {

  CRITICAL: { bg: "#fef2f2", border: "#fecaca", color: RED, icon: "🚨" },

  HIGH: { bg: "#fef3c7", border: "#fcd34d", color: AMBER, icon: "⚠️" },

  MEDIUM: { bg: "#eff6ff", border: "#bfdbfe", color: BLUE, icon: "💡" },

};

export default function RecommendationsPanel({ recommendations = [] }) {

  if (recommendations.length === 0) {

    return (

      <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 12, padding: 20, textAlign: "center" }}>

        <div style={{ fontSize: 28, marginBottom: 6 }}>✅</div>

        <div style={{ fontWeight: 800, color: "#166534", fontSize: 14 }}>No major conversion leaks detected</div>

        <div style={{ fontSize: 12, color: "#15803d", marginTop: 4 }}>Funnel is healthy — focus on driving more traffic.</div>

      </div>

    );

  }

  return (

    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {recommendations.map((r, i) => {

        const style = PRIORITY_STYLES[r.priority] || PRIORITY_STYLES.MEDIUM;

        return (

          <div key={i} style={{ background: style.bg, border: `1.5px solid ${style.border}`, borderRadius: 12, padding: "16px 20px" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 12 }}>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

                <span style={{ fontSize: 20 }}>{style.icon}</span>

                <span style={{ background: style.color, color: "#fff", padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 800, letterSpacing: 0.5 }}>

                  {r.priority}

                </span>

              </div>

              {r.impact && (

                <div style={{ fontSize: 11, fontWeight: 700, color: style.color }}>

                  {r.impact}

                </div>

              )}

            </div>

            <div style={{ fontSize: 14, fontWeight: 800, color: NAVY, marginBottom: 6 }}>{r.issue}</div>

            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>

              <strong>Fix:</strong> {r.fix}

            </div>

          </div>

        );

      })}

    </div>

  );

}
