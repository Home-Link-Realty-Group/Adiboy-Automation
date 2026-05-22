# New Microsoft Word Document (21)

Source: New Microsoft Word Document (21).docx

// Single funnel stage row with conversion rate vs benchmark + visual bar

const NAVY = "#0B1F45", GOLD = "#D4A843", GREEN = "#22c55e", RED = "#dc2626", AMBER = "#f59e0b";

export default function FunnelStage({ stage, prevCount, maxCount, isFirst }) {

  const widthPct = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;

  const cvr = stage.conversionFromPrev;

  const hasBench = stage.benchmark != null && cvr != null;

  let statusColor = "#9ca3af";

  let statusLabel = "—";

  if (hasBench) {

    if (cvr >= stage.benchmark) { statusColor = GREEN; statusLabel = "ON TRACK"; }

    else if (cvr >= stage.benchmark * 0.6) { statusColor = AMBER; statusLabel = "BELOW BENCHMARK"; }

    else { statusColor = RED; statusLabel = "MAJOR LEAK"; }

  }

  const peopleLost = !isFirst && prevCount != null ? Math.max(0, prevCount - stage.count) : 0;

  return (

    <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "16px 20px", marginBottom: 10 }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

          <div style={{ fontSize: 24 }}>{stage.icon}</div>

          <div>

            <div style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{stage.stage}</div>

            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{stage.description}</div>

          </div>

        </div>

        <div style={{ textAlign: "right" }}>

          <div style={{ fontSize: 22, fontWeight: 900, color: NAVY }}>{stage.count.toLocaleString()}</div>

          {!isFirst && (

            <div style={{ fontSize: 10, color: "#6b7280" }}>

              {peopleLost > 0 && <span style={{ color: RED, fontWeight: 700 }}>−{peopleLost.toLocaleString()} lost</span>}

            </div>

          )}

        </div>

      </div>

      <div style={{ height: 8, background: "#f3f4f6", borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>

        <div style={{ height: "100%", width: `${widthPct}%`, background: `linear-gradient(90deg, ${NAVY}, ${GOLD})`, transition: "width 0.5s" }} />

      </div>

      {hasBench && (

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }}>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>

            <span style={{ color: "#6b7280" }}>

              <strong style={{ color: NAVY }}>{cvr.toFixed(1)}%</strong> from previous step

            </span>

            <span style={{ color: "#9ca3af" }}>

              Industry: {stage.benchmark}%

            </span>

          </div>

          <span style={{ background: statusColor + "20", color: statusColor, padding: "2px 10px", borderRadius: 12, fontWeight: 800, fontSize: 10, letterSpacing: 0.5 }}>

            {statusLabel}

          </span>

        </div>

      )}

    </div>

  );

}
