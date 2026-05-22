import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { AlertCircle, CheckCircle, TrendingUp, Lightbulb, X } from "lucide-react";

const NAVY = "#0B1F45";
const GOLD = "#D4A843";
const GREEN = "#27ae60";
const ORANGE = "#e67e22";
const RED = "#c0392b";

export default function SiteAdvisor({ changeType, changeData, pageData, currentScore, onClose }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (changeType && changeData) {
      analyzeChange();
    }
  }, [changeType, changeData]);

  async function analyzeChange() {
    setLoading(true);
    try {
      const response = await base44.functions.invoke("analyzeSiteChange", {
        change_type: changeType,
        change_data: changeData,
        page_data: pageData,
        current_score: currentScore
      });
      setAnalysis(response.analysis);
    } catch (e) {
      console.error("Analysis failed:", e);
    } finally {
      setLoading(false);
    }
  }

  if (dismissed || !analysis) return null;

  const isOptimal = analysis.isOptimal;
  const impactScore = analysis.impactScore || 0;
  const severity = analysis.priority;

  const severityColor = {
    high: RED,
    medium: ORANGE,
    low: "#999"
  }[severity];

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      left: 24,
      maxWidth: 420,
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      border: `2px solid ${isOptimal ? GREEN : RED}`,
      zIndex: 998,
      animation: "slideInUp 0.3s ease-out"
    }}>
      {/* HEADER */}
      <div style={{
        padding: 14,
        background: isOptimal ? `${GREEN}10` : `${RED}10`,
        borderBottom: `1px solid ${isOptimal ? GREEN : RED}20`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isOptimal ? (
            <>
              <CheckCircle size={18} color={GREEN} />
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 13 }}>Good Change! ✅</div>
            </>
          ) : (
            <>
              <AlertCircle size={18} color={RED} />
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 13 }}>Not Optimal</div>
            </>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#999",
            padding: 4
          }}
          aria-label="Close advisor"
        >
          <X size={16} />
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ padding: 14 }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 10, color: "#888" }}>Analyzing...</div>
        ) : (
          <>
            {/* IMPACT SCORE */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 4 }}>Impact Score</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  flex: 1,
                  height: 8,
                  background: "#eee",
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative"
                }}>
                  <div style={{
                    position: "absolute",
                    left: "50%",
                    width: 2,
                    height: "100%",
                    background: "#ddd"
                  }} />
                  <div style={{
                    height: "100%",
                    width: `${50 + (impactScore / 100) * 50}%`,
                    background: impactScore > 0 ? GREEN : RED,
                    borderRadius: 4,
                    transition: "width 0.3s"
                  }} />
                </div>
                <div style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: impactScore > 0 ? GREEN : RED,
                  minWidth: 40,
                  textAlign: "right"
                }}>
                  {impactScore > 0 ? "+" : ""}{impactScore}
                </div>
              </div>
            </div>

            {/* AFFECTED METRICS */}
            {analysis.affectedMetrics?.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 4 }}>Affects</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {analysis.affectedMetrics.map(metric => (
                    <span
                      key={metric}
                      style={{
                        fontSize: 10,
                        background: GOLD + "20",
                        color: NAVY,
                        padding: "3px 8px",
                        borderRadius: 4,
                        fontWeight: 600
                      }}
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* REASONING */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Analysis</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>
                {analysis.reasoning}
              </div>
            </div>

            {/* RECOMMENDATION */}
            {!isOptimal && analysis.recommendation && (
              <div style={{
                padding: 10,
                background: "#fffbf0",
                border: `1px solid ${ORANGE}40`,
                borderRadius: 6,
                marginBottom: 12
              }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <Lightbulb size={14} color={ORANGE} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE }}>Better Alternative</div>
                </div>
                <div style={{ fontSize: 12, color: "#7a5e1a", lineHeight: 1.6 }}>
                  {analysis.recommendation}
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setDismissed(true)}
                style={{
                  flex: 1,
                  background: isOptimal ? GREEN : ORANGE,
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: 8,
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer"
                }}
              >
                {isOptimal ? "✅ Continue" : "📝 Apply Suggestion"}
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
