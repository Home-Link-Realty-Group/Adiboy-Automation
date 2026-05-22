# New Microsoft Word Document (43)

Source: New Microsoft Word Document (43).docx

import React from "react";

/**

 * FunnelStageBar — Renders one stage of a conversion funnel with

 * users-at-this-stage bar, drop-off count, conversion rate, and severity color.

 */

export default function FunnelStageBar({ stage, maxUsers, isBiggestDrop }) {

  const widthPct = maxUsers > 0 ? Math.max(2, (stage.users / maxUsers) * 100) : 0;

  const conv = stage.conversionFromPrev;

  const isFirst = stage.stage === 0;

  const barColor = isFirst ? "#0B1F45" : conv >= 70 ? "#10b981" : conv >= 40 ? "#f59e0b" : "#ef4444";

  const dropColor = stage.dropOff === 0 ? "#9ca3af" : stage.dropOff > 50 ? "#ef4444" : "#f59e0b";

  return (

    <div style={{ marginBottom: 18, position: "relative" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

          <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 0.5 }}>STAGE {stage.stage}</span>

          <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{stage.label}</span>

          {isBiggestDrop && stage.dropOff > 0 && (

            <span style={{ background: "#fef2f2", color: "#dc2626", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 100, border: "1px solid #fecaca" }}>

              ⚠️ BIGGEST DROP-OFF

            </span>

          )}

        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 12 }}>

          <span style={{ color: "#6b7280" }}><strong style={{ color: "#111827" }}>{stage.users.toLocaleString()}</strong> users</span>

          {!isFirst && (

            <span style={{ color: barColor, fontWeight: 700 }}>{conv}% from prev</span>

          )}

        </div>

      </div>

      <div style={{ height: 32, background: "#f3f4f6", borderRadius: 6, overflow: "hidden", position: "relative" }}>

        <div style={{

          height: "100%", width: `${widthPct}%`,

          background: `linear-gradient(90deg, ${barColor}, ${barColor}dd)`,

          borderRadius: 6, transition: "width 0.6s ease",

          display: "flex", alignItems: "center", paddingLeft: 12,

          color: "#fff", fontWeight: 700, fontSize: 12,

        }}>

          {widthPct > 8 && stage.users.toLocaleString()}

        </div>

      </div>

      {!isFirst && stage.dropOff > 0 && (

        <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>

          <span style={{ color: dropColor, fontWeight: 700 }}>↓ {stage.dropOff.toLocaleString()} users dropped off</span>

          <span style={{ color: "#9ca3af" }}>at this step</span>

        </div>

      )}

    </div>

  );

}
