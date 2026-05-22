# New Microsoft Word Document (5)

Source: New Microsoft Word Document (5).docx

import React, { useState } from "react";

export default function BuyerForm({ initial, onSave, onCancel }) {

  const [form, setForm] = useState(initial || {

    name: "", phone: "", email: "",

    buy_areas: "", property_types: "", price_min: "", price_max: "",

    arv_max_percent: 70, beds_min: "",

    condition_preference: "", closing_timeline: "",

    proof_of_funds: false, status: "Active",

    notes: "",

  });

  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {

    e.preventDefault();

    setSaving(true);

    try {

      await onSave({

        ...form,

        price_min: parseFloat(form.price_min) || null,

        price_max: parseFloat(form.price_max) || null,

        arv_max_percent: parseFloat(form.arv_max_percent) || null,

        beds_min: parseFloat(form.beds_min) || null,

      });

    } finally { setSaving(false); }

  };

  const inp = {

    width: "100%",

    background: "rgba(0,0,0,0.3)",

    border: "1px solid rgba(255,255,255,0.1)",

    borderRadius: 8, padding: "10px 12px",

    color: "#fff", fontSize: 13, outline: "none",

    fontFamily: "inherit", boxSizing: "border-box",

  };

  const lbl = { display: "block", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.6)", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 };

  return (

    <form onSubmit={submit} style={{

      background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.3))",

      backdropFilter: "blur(20px)",

      border: "1px solid rgba(16,185,129,0.3)",

      borderRadius: 16, padding: 24, marginBottom: 20,

      animation: "fadein 0.3s ease",

    }}>

      <div style={{ fontWeight: 900, fontSize: 17, marginBottom: 18, color: "#fff" }}>

        {initial?.id ? "✏️ Edit Buyer" : "+ Add Cash Buyer"}

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>

        <div><label style={lbl}>Buyer Name *</label><input style={inp} required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Mike Johnson" /></div>

        <div><label style={lbl}>Status</label>

          <select style={inp} value={form.status} onChange={e => set("status", e.target.value)}>

            <option value="Active">Active</option>

            <option value="Hot">🔥 Hot</option>

            <option value="Inactive">Inactive</option>

          </select>

        </div>

        <div><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="(555) 123-4567" /></div>

        <div><label style={lbl}>Email</label><input style={inp} type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="mike@example.com" /></div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>

        <div><label style={lbl}>Target Areas (cities, ZIPs)</label><input style={inp} value={form.buy_areas} onChange={e => set("buy_areas", e.target.value)} placeholder="Cleveland, Akron, 44102" /></div>

        <div><label style={lbl}>Property Types</label><input style={inp} value={form.property_types} onChange={e => set("property_types", e.target.value)} placeholder="SFR, Duplex, Multi-family" /></div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>

        <div><label style={lbl}>Min Price</label><input style={inp} type="number" value={form.price_min} onChange={e => set("price_min", e.target.value)} placeholder="50000" /></div>

        <div><label style={lbl}>Max Price</label><input style={inp} type="number" value={form.price_max} onChange={e => set("price_max", e.target.value)} placeholder="250000" /></div>

        <div><label style={lbl}>Max % of ARV</label><input style={inp} type="number" value={form.arv_max_percent} onChange={e => set("arv_max_percent", e.target.value)} placeholder="70" /></div>

        <div><label style={lbl}>Min Beds</label><input style={inp} type="number" value={form.beds_min} onChange={e => set("beds_min", e.target.value)} placeholder="3" /></div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>

        <div><label style={lbl}>Condition Preference</label>

          <select style={inp} value={form.condition_preference} onChange={e => set("condition_preference", e.target.value)}>

            <option value="">Any</option>

            <option value="Move-in Ready">Move-in Ready</option>

            <option value="Light Cosmetic">Light Cosmetic</option>

            <option value="Heavy Rehab">Heavy Rehab</option>

            <option value="Tear Down OK">Tear Down OK</option>

          </select>

        </div>

        <div><label style={lbl}>Close Timeline</label>

          <select style={inp} value={form.closing_timeline} onChange={e => set("closing_timeline", e.target.value)}>

            <option value="">Any</option>

            <option value="7 days">7 days</option>

            <option value="14 days">14 days</option>

            <option value="30 days">30 days</option>

            <option value="Flexible">Flexible</option>

          </select>

        </div>

      </div>

      <div style={{ marginBottom: 14 }}>

        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: "#fff", fontSize: 13 }}>

          <input type="checkbox" checked={!!form.proof_of_funds} onChange={e => set("proof_of_funds", e.target.checked)} style={{ width: 16, height: 16 }} />

          ✅ Proof of funds verified

        </label>

      </div>

      <div style={{ marginBottom: 18 }}>

        <label style={lbl}>Notes</label>

        <textarea style={{ ...inp, height: 64, resize: "vertical" }} value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Met at REIA. Buys 3-4 houses/month. Prefers 3/2 SFR..." />

      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>

        <button type="button" onClick={onCancel}

          style={{ background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>

          Cancel

        </button>

        <button type="submit" disabled={saving}

          style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 13, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 20px rgba(16,185,129,0.4)" }}>

          {saving ? "Saving..." : "💾 Save Buyer"}

        </button>

      </div>

    </form>

  );

}
