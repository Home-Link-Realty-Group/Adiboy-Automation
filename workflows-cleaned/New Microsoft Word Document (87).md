# New Microsoft Word Document (87)

Source: New Microsoft Word Document (87).docx

import React from "react";

import SaaSLayout from "@/components/saas/SaaSLayout";

/**

 * PageShell — wraps scraper/finder/warmup tools in the unified SaaSLayout.

 * Renders a tab strip below the SaaSLayout hero so every tool feels native to the app.

 *

 * Note: tool content (children) was originally designed for a dark gradient surface,

 * so we keep an inner dark "content card" so existing children render correctly

 * without rewriting every scraper page.

 */

export default function PageShell({ icon, title, subtitle, accent = "#D4A843", tab, setTab, tabs, children }) {

  // icon prop is a string emoji from the original API — keep that working

  // by mapping to a small inline component for SaaSLayout

  const IconComponent = () => <span style={{ fontSize: 22, lineHeight: 1 }}>{icon}</span>;

  return (

    <SaaSLayout

      title={title}

      subtitle={subtitle}

      icon={IconComponent}

      accent={accent}

    >

      <style>{`

        @keyframes fadein { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        @keyframes shimmer { 0%,100%{opacity:.4} 50%{opacity:.8} }

      `}</style>

      {/* Tabs */}

      {tabs && tabs.length > 0 && (

        <div style={{

          display: "flex", gap: 4, marginBottom: 20,

          background: "#fff",

          border: "1px solid #e2e8f0", borderRadius: 12, padding: 4,

          flexWrap: "wrap",

          boxShadow: "0 2px 8px rgba(11,31,69,0.04)",

        }}>

          {tabs.map(t => (

            <button key={t.id} onClick={() => setTab(t.id)}

              aria-pressed={tab === t.id}

              style={{

                background: tab === t.id ? `linear-gradient(135deg, ${accent}, ${accent}dd)` : "transparent",

                color: tab === t.id ? "#fff" : "#475569",

                border: "none", borderRadius: 8,

                padding: "9px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700,

                transition: "all 0.2s",

                boxShadow: tab === t.id ? `0 4px 12px ${accent}55` : "none",

              }}>

              {t.label}

            </button>

          ))}

        </div>

      )}

      {/* Tool content — refined dark surface (children expect white text) */}

      <div style={{

        background: `linear-gradient(135deg, #0B1F45 0%, #122B5E 100%)`,

        color: "#fff",

        borderRadius: 14,

        padding: "24px 28px",

        position: "relative",

        overflow: "hidden",

        boxShadow: "0 8px 28px rgba(11,31,69,0.18)",

        border: `1px solid ${accent}22`,

      }}>

        {/* Subtle ambient orbs */}

        <div aria-hidden style={{ position: "absolute", top: "-10%", right: "-5%", width: 360, height: 360, borderRadius: "50%", background: `${accent}10`, filter: "blur(80px)", pointerEvents: "none" }} />

        <div aria-hidden style={{ position: "absolute", bottom: "-15%", left: "-10%", width: 420, height: 420, borderRadius: "50%", background: "#7c3aed0d", filter: "blur(100px)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>

          {children}

        </div>

      </div>

    </SaaSLayout>

  );

}
