import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { AlertCircle, CheckCircle, AlertTriangle, TrendingUp, Activity } from "lucide-react";

const NAVY = "#0B1F45";
const GOLD = "#D4A843";
const GREEN = "#27ae60";
const RED = "#c0392b";
const ORANGE = "#e67e22";

export default function PageScoreAnalyzer({ pages }) {
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(null);
  const [expandedPage, setExpandedPage] = useState(null);

  async function auditPage(page) {
    setLoading(page.id);
    try {
      const response = await base44.functions.invoke("auditPageGSCLighthouse", {
        page_route: page.route,
        page_url: page.canonical_url || `https://homelinkrealtygroup.com${page.route}`
      });
      setScores(prev => ({ ...prev, [page.id]: response }));
    } catch (e) {
      alert("Audit failed: " + e.message);
    } finally {
      setLoading(null);
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return GREEN;
    if (score >= 80) return "#f0c86a";
    if (score >= 70) return ORANGE;
    return RED;
  };

  const getGrade = (score) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  const getSeverityIcon = (severity) => {
    if (severity === "high") return <AlertCircle size={16} color={RED} />;
    if (severity === "medium") return <AlertTriangle size={16} color={ORANGE} />;
    return <CheckCircle size={16} color={GREEN} />;
  };

  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <Activity size={24} color={NAVY} />
        <h3 style={{ fontSize: 16, fontWeight: 900, color: NAVY, margin: 0 }}>Page Optimization Scores</h3>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {pages.map(page => {
          const score = scores[page.id];
          const isLoading = loading === page.id;

          return (
            <div key={page.id} style={{ border: "1.5px solid #e0e0e0", borderRadius: 10, overflow: "hidden" }}>
              {/* HEADER */}
              <div
                style={{
                  padding: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: score ? "#f9f9f9" : "#fff",
                  cursor: "pointer"
                }}
                onClick={() => setExpandedPage(expandedPage === page.id ? null : page.id)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: NAVY }}>{page.display_name}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{page.route}</div>
                </div>

                {score ? (
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "#666", marginBottom: 2 }}>Overall Score</div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                        <div style={{ fontSize: 24, fontWeight: 900, color: getScoreColor(score.scores.overall) }}>
                          {score.scores.overall}
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: getScoreColor(score.scores.overall) }}>
                          {score.scores.grade}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: `conic-gradient(${getScoreColor(score.scores.overall)} 0deg ${(score.scores.overall / 100) * 360}deg, #eee ${(score.scores.overall / 100) * 360}deg)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: NAVY,
                        fontWeight: 900,
                        fontSize: 24
                      }}
                    >
                      {score.scores.overall}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={e => { e.stopPropagation(); auditPage(page); }}
                    disabled={isLoading}
                    style={{
                      background: GOLD,
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "8px 16px",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: isLoading ? "not-allowed" : "pointer"
                    }}
                  >
                    {isLoading ? "Auditing..." : "Run Audit"}
                  </button>
                )}
              </div>

              {/* EXPANDED CONTENT */}
              {expandedPage === page.id && score && (
                <div style={{ padding: 16, background: "#f9f9f9", borderTop: "1px solid #e0e0e0" }}>
                  {/* SCORES GRID */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 10 }}>📊 Detailed Scores</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
                      {[
                        { label: "Lighthouse", value: score.scores.lighthouse, icon: "💡" },
                        { label: "GSC Health", value: score.scores.gsc, icon: "📈" },
                        { label: "Performance", value: score.lighthouse?.performance, icon: "⚡" },
                        { label: "Accessibility", value: score.lighthouse?.accessibility, icon: "♿" },
                        { label: "SEO", value: score.lighthouse?.seo, icon: "🔍" },
                        { label: "Best Practices", value: score.lighthouse?.bestPractices, icon: "✅" }
                      ].map(item => (
                        item.value !== undefined && (
                          <div key={item.label} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: 10, textAlign: "center" }}>
                            <div style={{ fontSize: 14, marginBottom: 4 }}>{item.icon}</div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: getScoreColor(item.value), marginBottom: 2 }}>
                              {item.value}
                            </div>
                            <div style={{ fontSize: 10, color: "#666" }}>{item.label}</div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* CORE WEB VITALS */}
                  {score.gsc?.coreWebVitals && (
                    <div style={{ marginBottom: 20, padding: 10, background: "#fff", borderRadius: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 8 }}>⚡ Core Web Vitals</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                        {[
                          { name: "LCP", value: score.gsc.coreWebVitals.lcp, desc: "Largest Contentful Paint" },
                          { name: "FID", value: score.gsc.coreWebVitals.fid, desc: "First Input Delay" },
                          { name: "CLS", value: score.gsc.coreWebVitals.cls, desc: "Cumulative Layout Shift" }
                        ].map(vital => (
                          <div key={vital.name} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: vital.value === "GOOD" ? GREEN : ORANGE, marginBottom: 4 }}>
                              {vital.value === "GOOD" ? "✅" : "⚠️"} {vital.name}
                            </div>
                            <div style={{ fontSize: 10, color: "#666" }}>{vital.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RECOMMENDATIONS */}
                  {score.recommendations && score.recommendations.length > 0 && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 10 }}>💡 Recommendations</div>
                      <div style={{ display: "grid", gap: 10 }}>
                        {score.recommendations.map((rec, idx) => (
                          <div key={idx} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: 12 }}>
                            <div style={{ display: "flex", alignItems: "start", gap: 10 }}>
                              <div style={{ marginTop: 2, flexShrink: 0 }}>{getSeverityIcon(rec.severity)}</div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{rec.title}</div>
                                <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5 }}>{rec.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RE-AUDIT BUTTON */}
                  <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                    <button
                      onClick={() => auditPage(page)}
                      disabled={isLoading}
                      style={{
                        flex: 1,
                        background: GOLD,
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: 10,
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: isLoading ? "not-allowed" : "pointer"
                      }}
                    >
                      {isLoading ? "Re-auditing..." : "🔄 Re-audit Page"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
