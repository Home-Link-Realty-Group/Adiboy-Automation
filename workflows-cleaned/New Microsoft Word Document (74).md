# New Microsoft Word Document (74)

Source: New Microsoft Word Document (74).docx

import { rgba } from "@/components/HQ/HQHelpers";

export default function MapTab({ leads }) {

  const mappedLeads = leads.filter(l => l.lat && l.lng);

  const unmappedLeads = leads.filter(l => !l.lat || !l.lng);

  const statusColors = {

    "New Lead": "#3b82f6", "Attempted Contact": "#f59e0b", "Contacted": "#f59e0b",

    "Follow Up": "#06b6d4", "Offer Made": "#a855f7", "Under Contract": "#22c55e",

    "Closed": "#22c55e", "Dead": "#ef4444",

  };

  return (

    <div style={{ animation: "slide 0.3s ease" }}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>

        <div>

          <div style={{ fontSize: 20, fontWeight: 900, color: "#f1f5f9" }}>🗺️ Live Lead Map</div>

          <div style={{ fontSize: 12, color: "#334155", marginTop: 3 }}>

            {mappedLeads.length} of {leads.length} leads mapped · powered by Google Maps

          </div>

        </div>

        <div style={{ display: "flex", gap: 8 }}>

          {[

            { label: "New Lead", color: "#3b82f6" },

            { label: "Contacted", color: "#f59e0b" },

            { label: "Offer Made", color: "#a855f7" },

            { label: "Under Contract", color: "#22c55e" },

            { label: "Dead", color: "#ef4444" },

          ].map(s => (

            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#94a3b8" }}>

              <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color }} />

              {s.label}

            </div>

          ))}

        </div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 16 }}>

        {[

          { label: "Total Leads", value: leads.length, color: "#3b82f6" },

          { label: "Contacted", value: leads.filter(l => l.status === "Attempted Contact" || l.status === "Contacted").length, color: "#f59e0b" },

          { label: "Offers Out", value: leads.filter(l => l.status === "Offer Made").length, color: "#a855f7" },

          { label: "Under Contract", value: leads.filter(l => l.status === "Under Contract").length, color: "#22c55e" },

          { label: "Mapped", value: mappedLeads.length, color: "#06b6d4" },

        ].map(s => (

          <div key={s.label} style={{ background: "#0d1520", border: `1px solid ${s.color}33`, borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>

            <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</div>

            <div style={{ fontSize: 10, color: "#475569", fontWeight: 700, marginTop: 3 }}>{s.label}</div>

          </div>

        ))}

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>

        <div style={{ background: "#0d1520", border: "1px solid #0B1F45", borderRadius: 16, overflow: "hidden", height: 520, position: "relative" }}>

          {mappedLeads.length === 0 ? (

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>

              <div style={{ fontSize: 48 }}>🗺️</div>

              <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>No leads mapped yet</div>

              <div style={{ fontSize: 12, color: "#475569", textAlign: "center", maxWidth: 280 }}>Add leads with a full address to see them here.</div>

              <div style={{ fontSize: 11, color: "#334155", marginTop: 4 }}>{unmappedLeads.length} leads need addresses → go to CRM</div>

            </div>

          ) : (

            <iframe title="Lead Map" width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"

              src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBkHeLB4bCaziBKJWvA-FiLoWkJWQMNxJI&q=${encodeURIComponent(mappedLeads.slice(0,10).map(l => l.address + " " + (l.city||"") + " " + (l.state||"")).join("|"))}&zoom=5`}

            />

          )}

        </div>

        <div style={{ background: "#0d1520", border: "1px solid #0B1F45", borderRadius: 16, padding: 16, height: 520, overflowY: "auto" }}>

          <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>

            All Leads — {leads.length} total

          </div>

          {leads.slice(0, 50).map(l => (

            <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #0a111e" }}>

              <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColors[l.status] || "#475569", flexShrink: 0 }} />

              <div style={{ flex: 1, minWidth: 0 }}>

                <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.name || "Unknown"}</div>

                <div style={{ fontSize: 10, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.address || l.city || "No address"}</div>

              </div>

              <div style={{ flexShrink: 0 }}>

                <div style={{ fontSize: 9, fontWeight: 700, color: statusColors[l.status] || "#475569", textAlign: "right" }}>{l.status || "—"}</div>

                {l.lat && l.lng && <div style={{ fontSize: 9, color: "#22c55e", textAlign: "right" }}>📍 mapped</div>}

              </div>

            </div>

          ))}

          {leads.length > 50 && <div style={{ fontSize: 11, color: "#334155", textAlign: "center", paddingTop: 12 }}>+{leads.length - 50} more in CRM</div>}

        </div>

      </div>

      {leads.filter(l => l.address && (!l.lat || !l.lng)).length > 0 && (

        <div style={{ marginTop: 16, background: "#0d1520", border: "1px solid #f59e0b33", borderRadius: 12, padding: 16 }}>

          <div style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700, marginBottom: 8 }}>

            ⚠️ {leads.filter(l => l.address && (!l.lat || !l.lng)).length} leads have addresses but are not geocoded yet

          </div>

          <div style={{ fontSize: 11, color: "#475569" }}>New leads added via the CRM autocomplete will auto-geocode.</div>

        </div>

      )}

    </div>

  );

}
