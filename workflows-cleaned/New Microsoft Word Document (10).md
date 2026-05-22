# New Microsoft Word Document (10)

Source: New Microsoft Word Document (10).docx

import React, { useState } from "react";

const NAVY = "#0B1F45", GOLD = "#D4A843";

/**

 * CityComparisonTable — Sortable, color-coded table comparing traffic

 * + conversion metrics across every city landing page.

 */

export default function CityComparisonTable({ cities, maxSessions }) {

  const [sortKey, setSortKey] = useState("sessions");

  const [sortDir, setSortDir] = useState("desc");

  const sorted = [...cities].sort((a, b) => {

    const av = a[sortKey], bv = b[sortKey];

    return sortDir === "desc" ? bv - av : av - bv;

  });

  const setSort = (key) => {

    if (sortKey === key) setSortDir(d => d === "desc" ? "asc" : "desc");

    else { setSortKey(key); setSortDir("desc"); }

  };

  const Header = ({ k, label, align = "right" }) => (

    <th

      onClick={() => setSort(k)}

      style={{

        padding: "10px 12px", textAlign: align, fontSize: 11, color: "#6b7280",

        fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5,

        cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",

        background: sortKey === k ? "#f3f4f6" : "transparent",

      }}>

      {label} {sortKey === k && (sortDir === "desc" ? "↓" : "↑")}

    </th>

  );

  const formatDuration = (s) => {

    if (s === 0) return "—";

    const m = Math.floor(s / 60), sec = s % 60;

    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;

  };

  const bounceColor = (b) => b === 0 ? "#9ca3af" : b < 40 ? "#10b981" : b < 70 ? "#f59e0b" : "#ef4444";

  const convColor = (c) => c === 0 ? "#9ca3af" : c >= 3 ? "#10b981" : c >= 1 ? "#f59e0b" : "#ef4444";

  return (

    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>

      <div style={{ overflowX: "auto" }}>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>

          <thead>

            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>

              <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>#</th>

              <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>City</th>

              <Header k="sessions" label="Sessions" />

              <Header k="users" label="Users" />

              <Header k="newUsers" label="New" />

              <Header k="bounceRate" label="Bounce" />

              <Header k="avgDuration" label="Avg Time" />

              <Header k="leads" label="Leads" />

              <Header k="conversionRate" label="CVR %" />

              <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Top Source</th>

            </tr>

          </thead>

          <tbody>

            {sorted.map((c, i) => {

              const widthPct = maxSessions > 0 ? (c.sessions / maxSessions) * 100 : 0;

              return (

                <tr key={c.path} style={{ borderBottom: "1px solid #f3f4f6", background: c.sessions === 0 ? "#fafafa" : "#fff" }}>

                  <td style={{ padding: "10px 12px", color: "#9ca3af", fontWeight: 700, fontSize: 11 }}>{i + 1}</td>

                  <td style={{ padding: "10px 12px", position: "relative" }}>

                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${widthPct}%`, background: `linear-gradient(90deg, ${GOLD}15, transparent)`, pointerEvents: "none" }} />

                    <a href={c.path} target="_blank" rel="noopener noreferrer" style={{ position: "relative", color: NAVY, fontWeight: 700, textDecoration: "none", fontSize: 13 }}>

                      {c.city}, {c.state}

                    </a>

                  </td>

                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, color: "#111827" }}>{c.sessions.toLocaleString()}</td>

                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#374151" }}>{c.users.toLocaleString()}</td>

                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#6b7280", fontSize: 12 }}>{c.newUsers.toLocaleString()}</td>

                  <td style={{ padding: "10px 12px", textAlign: "right", color: bounceColor(c.bounceRate), fontWeight: 600 }}>

                    {c.bounceRate === 0 ? "—" : `${c.bounceRate}%`}

                  </td>

                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#6b7280", fontSize: 12 }}>{formatDuration(c.avgDuration)}</td>

                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, color: c.leads > 0 ? "#10b981" : "#9ca3af" }}>

                    {c.leads === 0 ? "—" : c.leads}

                  </td>

                  <td style={{ padding: "10px 12px", textAlign: "right", color: convColor(c.conversionRate), fontWeight: 700 }}>

                    {c.conversionRate === 0 ? "—" : `${c.conversionRate}%`}

                  </td>

                  <td style={{ padding: "10px 12px", color: "#6b7280", fontSize: 12, textTransform: "capitalize" }}>{c.topSource}</td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>

  );

}
