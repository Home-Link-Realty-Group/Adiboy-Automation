# New Microsoft Word Document (5)

Source: New Microsoft Word Document (5).docx

import React, \{ useState \} from "react";

export default function BuyerForm\(\{ initial, onSave, onCancel \}\) \{

  const \[form, setForm\] = useState\(initial || \{

    name: "", phone: "", email: "",

    buy\_areas: "", property\_types: "", price\_min: "", price\_max: "",

    arv\_max\_percent: 70, beds\_min: "",

    condition\_preference: "", closing\_timeline: "",

    proof\_of\_funds: false, status: "Active",

    notes: "",

  \}\);

  const \[saving, setSaving\] = useState\(false\);

  const set = \(k, v\) => setForm\(f => \(\{ \.\.\.f, \[k\]: v \}\)\);

  const submit = async \(e\) => \{

    e\.preventDefault\(\);

    setSaving\(true\);

    try \{

      await onSave\(\{

        \.\.\.form,

        price\_min: parseFloat\(form\.price\_min\) || null,

        price\_max: parseFloat\(form\.price\_max\) || null,

        arv\_max\_percent: parseFloat\(form\.arv\_max\_percent\) || null,

        beds\_min: parseFloat\(form\.beds\_min\) || null,

      \}\);

    \} finally \{ setSaving\(false\); \}

  \};

  const inp = \{

    width: "100%",

    background: "rgba\(0,0,0,0\.3\)",

    border: "1px solid rgba\(255,255,255,0\.1\)",

    borderRadius: 8, padding: "10px 12px",

    color: "\#fff", fontSize: 13, outline: "none",

    fontFamily: "inherit", boxSizing: "border\-box",

  \};

  const lbl = \{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba\(255,255,255,0\.6\)", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0\.5 \};

  return \(

    <form onSubmit=\{submit\} style=\{\{

      background: "linear\-gradient\(135deg, rgba\(255,255,255,0\.05\), rgba\(0,0,0,0\.3\)\)",

      backdropFilter: "blur\(20px\)",

      border: "1px solid rgba\(16,185,129,0\.3\)",

      borderRadius: 16, padding: 24, marginBottom: 20,

      animation: "fadein 0\.3s ease",

    \}\}>

      <div style=\{\{ fontWeight: 900, fontSize: 17, marginBottom: 18, color: "\#fff" \}\}>

        \{initial?\.id ? "✏️ Edit Buyer" : "\+ Add Cash Buyer"\}

      </div>

      <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 \}\}>

        <div><label style=\{lbl\}>Buyer Name \*</label><input style=\{inp\} required value=\{form\.name\} onChange=\{e => set\("name", e\.target\.value\)\} placeholder="Mike Johnson" /></div>

        <div><label style=\{lbl\}>Status</label>

          <select style=\{inp\} value=\{form\.status\} onChange=\{e => set\("status", e\.target\.value\)\}>

            <option value="Active">Active</option>

            <option value="Hot">🔥 Hot</option>

            <option value="Inactive">Inactive</option>

          </select>

        </div>

        <div><label style=\{lbl\}>Phone</label><input style=\{inp\} value=\{form\.phone\} onChange=\{e => set\("phone", e\.target\.value\)\} placeholder="\(555\) 123\-4567" /></div>

        <div><label style=\{lbl\}>Email</label><input style=\{inp\} type="email" value=\{form\.email\} onChange=\{e => set\("email", e\.target\.value\)\} placeholder="mike@example\.com" /></div>

      </div>

      <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 \}\}>

        <div><label style=\{lbl\}>Target Areas \(cities, ZIPs\)</label><input style=\{inp\} value=\{form\.buy\_areas\} onChange=\{e => set\("buy\_areas", e\.target\.value\)\} placeholder="Cleveland, Akron, 44102" /></div>

        <div><label style=\{lbl\}>Property Types</label><input style=\{inp\} value=\{form\.property\_types\} onChange=\{e => set\("property\_types", e\.target\.value\)\} placeholder="SFR, Duplex, Multi\-family" /></div>

      </div>

      <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 14 \}\}>

        <div><label style=\{lbl\}>Min Price</label><input style=\{inp\} type="number" value=\{form\.price\_min\} onChange=\{e => set\("price\_min", e\.target\.value\)\} placeholder="50000" /></div>

        <div><label style=\{lbl\}>Max Price</label><input style=\{inp\} type="number" value=\{form\.price\_max\} onChange=\{e => set\("price\_max", e\.target\.value\)\} placeholder="250000" /></div>

        <div><label style=\{lbl\}>Max % of ARV</label><input style=\{inp\} type="number" value=\{form\.arv\_max\_percent\} onChange=\{e => set\("arv\_max\_percent", e\.target\.value\)\} placeholder="70" /></div>

        <div><label style=\{lbl\}>Min Beds</label><input style=\{inp\} type="number" value=\{form\.beds\_min\} onChange=\{e => set\("beds\_min", e\.target\.value\)\} placeholder="3" /></div>

      </div>

      <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 \}\}>

        <div><label style=\{lbl\}>Condition Preference</label>

          <select style=\{inp\} value=\{form\.condition\_preference\} onChange=\{e => set\("condition\_preference", e\.target\.value\)\}>

            <option value="">Any</option>

            <option value="Move\-in Ready">Move\-in Ready</option>

            <option value="Light Cosmetic">Light Cosmetic</option>

            <option value="Heavy Rehab">Heavy Rehab</option>

            <option value="Tear Down OK">Tear Down OK</option>

          </select>

        </div>

        <div><label style=\{lbl\}>Close Timeline</label>

          <select style=\{inp\} value=\{form\.closing\_timeline\} onChange=\{e => set\("closing\_timeline", e\.target\.value\)\}>

            <option value="">Any</option>

            <option value="7 days">7 days</option>

            <option value="14 days">14 days</option>

            <option value="30 days">30 days</option>

            <option value="Flexible">Flexible</option>

          </select>

        </div>

      </div>

      <div style=\{\{ marginBottom: 14 \}\}>

        <label style=\{\{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: "\#fff", fontSize: 13 \}\}>

          <input type="checkbox" checked=\{\!\!form\.proof\_of\_funds\} onChange=\{e => set\("proof\_of\_funds", e\.target\.checked\)\} style=\{\{ width: 16, height: 16 \}\} />

          ✅ Proof of funds verified

        </label>

      </div>

      <div style=\{\{ marginBottom: 18 \}\}>

        <label style=\{lbl\}>Notes</label>

        <textarea style=\{\{ \.\.\.inp, height: 64, resize: "vertical" \}\} value=\{form\.notes\} onChange=\{e => set\("notes", e\.target\.value\)\} placeholder="Met at REIA\. Buys 3\-4 houses/month\. Prefers 3/2 SFR\.\.\." />

      </div>

      <div style=\{\{ display: "flex", gap: 10, justifyContent: "flex\-end" \}\}>

        <button type="button" onClick=\{onCancel\}

          style=\{\{ background: "rgba\(255,255,255,0\.06\)", color: "\#fff", border: "1px solid rgba\(255,255,255,0\.1\)", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" \}\}>

          Cancel

        </button>

        <button type="submit" disabled=\{saving\}

          style=\{\{ background: "linear\-gradient\(135deg, \#10b981, \#059669\)", color: "\#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 13, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 20px rgba\(16,185,129,0\.4\)" \}\}>

          \{saving ? "Saving\.\.\." : "💾 Save Buyer"\}

        </button>

      </div>

    </form>

  \);

\}
