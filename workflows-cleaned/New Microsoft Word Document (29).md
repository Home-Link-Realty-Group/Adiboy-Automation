# New Microsoft Word Document (29)

Source: New Microsoft Word Document (29).docx

import { useState } from "react";

import { EnterpriseTask } from "@/api/entities";

const PRIORITY_COLORS = {

  critical: "#ef4444",

  high: "#f97316",

  medium: "#3b82f6",

  low: "#6b7280",

};

export default function FollowUpTaskModal({ entity, entityType, onClose, onCreated }) {

  const today = new Date().toISOString().split("T")[0];

  const defaultTitle = entityType === "lead"

    ? `Follow-up call — ${entity.name}`

    : `Deal follow-up — ${entity.property_address || entity.seller_name}`;

  const defaultNotes = entityType === "lead"

    ? `Lead: ${entity.name}\nPhone: ${entity.phone || "—"}\nAddress: ${entity.address || "—"}\nStatus: ${entity.status || "—"}\nNext Follow-Up: ${entity.next_followup_date || "—"}`

    : `Deal: ${entity.property_address || "—"}\nSeller: ${entity.seller_name || "—"}\nBuyer: ${entity.buyer_name || "—"}\nStatus: ${entity.status || "—"}\nClosing: ${entity.closing_date || "—"}`;

  const [title, setTitle] = useState(defaultTitle);

  const [scheduledDate, setScheduledDate] = useState(today);

  const [scheduledTime, setScheduledTime] = useState("09:00");

  const [priority, setPriority] = useState("high");

  const [notes, setNotes] = useState(defaultNotes);

  const [saving, setSaving] = useState(false);

  async function create() {

    setSaving(true);

    await EnterpriseTask.create({

      title,

      scheduled_date: scheduledDate,

      scheduled_time: scheduledTime,

      priority,

      status: "planned",

      category: "follow_up",

      linked_entity: entity.id,

      linked_entity_type: entityType,

      notes,

      duration_minutes: 30,

      recurring: "none",

    });

    setSaving(false);

    onCreated();

    onClose();

  }

  const inp = { width: "100%", padding: "9px 12px", border: "1.5px solid #ddd", borderRadius: 8, fontSize: 13, boxSizing: "border-box", fontFamily: "inherit" };

  return (

    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>

      <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: "90%", maxWidth: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>

          <div style={{ fontSize: 18, fontWeight: 900, color: "#0B1F45" }}>📅 Create Follow-up Task</div>

          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888" }}>✕</button>

        </div>

        <div style={{ background: "#f0f4ff", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#0B1F45" }}>

          <span style={{ fontWeight: 700 }}>Linked to {entityType === "lead" ? "Lead" : "Deal"}:</span> {entityType === "lead" ? entity.name : (entity.property_address || entity.seller_name)}

        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          <div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#555", marginBottom: 5 }}>TASK TITLE *</div>

            <input value={title} onChange={e => setTitle(e.target.value)} style={inp} />

          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>

            <div>

              <div style={{ fontSize: 11, fontWeight: 700, color: "#555", marginBottom: 5 }}>DATE *</div>

              <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} style={inp} />

            </div>

            <div>

              <div style={{ fontSize: 11, fontWeight: 700, color: "#555", marginBottom: 5 }}>TIME</div>

              <input type="time" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} style={inp} />

            </div>

            <div>

              <div style={{ fontSize: 11, fontWeight: 700, color: "#555", marginBottom: 5 }}>PRIORITY</div>

              <select value={priority} onChange={e => setPriority(e.target.value)} style={inp}>

                <option value="critical">🔴 Critical</option>

                <option value="high">🟠 High</option>

                <option value="medium">🔵 Medium</option>

                <option value="low">🟢 Low</option>

              </select>

            </div>

          </div>

          <div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#555", marginBottom: 5 }}>NOTES (pre-filled from record)</div>

            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={5}

              style={{ ...inp, resize: "vertical", minHeight: 100 }} />

          </div>

        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>

          <button onClick={onClose} style={{ flex: 1, padding: "11px", border: "1.5px solid #ddd", borderRadius: 10, background: "#fff", color: "#333", fontWeight: 700, cursor: "pointer" }}>Cancel</button>

          <button onClick={create} disabled={!title.trim() || saving} style={{ flex: 2, padding: "11px", border: "none", borderRadius: 10, background: title.trim() && !saving ? "#D4A843" : "#ccc", color: "#fff", fontWeight: 800, fontSize: 14, cursor: title.trim() && !saving ? "pointer" : "default" }}>

            {saving ? "⏳ Creating..." : "✅ Create Task in Calendar"}

          </button>

        </div>

      </div>

    </div>

  );

}
