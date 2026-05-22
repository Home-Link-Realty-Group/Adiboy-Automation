# propwireimport

Source: propwireimport.docx

import { useState } from "react";

import { base44 } from "@/api/base44Client";

// ─────────────────────────────────────────────────────────────────────────────

// PROPWIRE → LEAD IMPORT WIZARD

//

// Drag-and-drop PropWire CSV exports → auto-mapped into your Lead entity

// with motivation pre-scoring and Eric Cline filter validation.

//

// PropWire's standard export columns (verified from their CSV schema):

//   Owner First Name, Owner Last Name, Mailing Address, Mailing City,

//   Mailing State, Mailing Zip, Property Address, Property City,

//   Property State, Property Zip, Phone 1, Phone 2, Phone 3, Email,

//   Estimated Value, Estimated Equity, Equity %, Year Built, Beds, Baths,

//   Sqft, Last Sale Date, Last Sale Price, Owner Occupied, Vacancy,

//   Pre-Foreclosure, Tax Delinquent, Lien, Absentee Owner

// ─────────────────────────────────────────────────────────────────────────────

const NAVY = "#0B1F45", GOLD = "#D4A843", GREEN = "#22c55e", RED = "#dc2626";

// Field mappings: PropWire column header (lowercased) → Lead entity field

const FIELD_MAP = {

  // Names

  "owner first name": "first_name",

  "owner last name": "last_name",

  "first name": "first_name",

  "last name": "last_name",

  "owner name": "name",

  "full name": "name",

  // Phones

  "phone 1": "phone",

  "phone1": "phone",

  "primary phone": "phone",

  "phone": "phone",

  "phone 2": "phone2",

  "phone 3": "phone3",

  // Email

  "email": "email",

  "email 1": "email",

  // Property address

  "property address": "address",

  "site address": "address",

  "address": "address",

  "property city": "city",

  "site city": "city",

  "city": "city",

  "property state": "state",

  "site state": "state",

  "state": "state",

  "property zip": "zip",

  "site zip": "zip",

  "zip": "zip",

  "zip code": "zip",

  // Financials

  "estimated value": "arv_estimate",

  "estimated market value": "arv_estimate",

  "avm": "arv_estimate",

  "value": "arv_estimate",

  "equity %": "equity_percent",

  "equity percent": "equity_percent",

  "estimated equity %": "equity_percent",

  "year built": "year_built",

  // Distress flags

  "pre-foreclosure": "is_pre_foreclosure",

  "preforeclosure": "is_pre_foreclosure",

  "tax delinquent": "has_tax_lien",

  "tax lien": "has_tax_lien",

  "lien": "has_tax_lien",

  "code violation": "has_code_violation",

  "vacancy": "is_vacant",

  "vacant": "is_vacant",

  "absentee owner": "is_absentee",

  "absentee": "is_absentee",

  "owner occupied": "_owner_occupied",

  "free and clear": "is_free_and_clear",

  "free & clear": "is_free_and_clear",

  // Property details

  "beds": "_beds",

  "bedrooms": "_beds",

  "baths": "_baths",

  "sqft": "_sqft",

  "property type": "property_type",

  "last sale date": "_last_sale_date",

  "last sale price": "_last_sale_price",

};

function parseCSV(text) {

  const lines = text.split(/\r?\n/).filter(l => l.trim());

  if (lines.length < 2) return { headers: [], rows: [] };

  // Simple CSV parser handling quoted fields with commas

  const parseLine = (line) => {

    const out = [];

    let cur = "", inQuote = false;

    for (let i = 0; i < line.length; i++) {

      const c = line[i];

      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }

      else if (c === '"') inQuote = !inQuote;

      else if (c === "," && !inQuote) { out.push(cur); cur = ""; }

      else cur += c;

    }

    out.push(cur);

    return out.map(s => s.trim());

  };

  const headers = parseLine(lines[0]);

  const rows = lines.slice(1).map(parseLine).filter(r => r.some(c => c !== ""));

  return { headers, rows };

}

function normalizePhone(raw) {

  if (!raw) return "";

  const digits = String(raw).replace(/\D/g, "");

  if (digits.length === 10) return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;

  if (digits.length === 11 && digits[0] === "1") return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`;

  return raw;

}

function parseMoney(v) {

  if (!v) return null;

  const n = parseFloat(String(v).replace(/[$,\s]/g, ""));

  return isNaN(n) ? null : n;

}

function parseBool(v) {

  if (v === undefined || v === null || v === "") return false;

  const s = String(v).toLowerCase().trim();

  return s === "yes" || s === "true" || s === "y" || s === "1" || s === "x";

}

// Eric Cline's qualification filter

function ericQualifies(lead) {

  const arv = lead.arv_estimate || 0;

  const eq = lead.equity_percent || 0;

  const age = lead.year_built ? (2026 - lead.year_built) : 0;

  if (arv > 0 && arv > 350000) return false;

  if (eq > 0 && eq < 30) return false;

  if (age > 0 && age < 15) return false;

  return true;

}

// Motivation score (matches CRM logic — simplified)

function motivationScore(lead) {

  let score = 0;

  if (lead.is_pre_foreclosure) score += 20;

  if (lead.has_tax_lien) score += 15;

  if (lead.has_code_violation) score += 5;

  if (lead.is_vacant) score += 8;

  if (lead.is_absentee) score += 6;

  if (lead.is_free_and_clear) score += 8;

  const eq = lead.equity_percent || 0;

  if (eq >= 80) score += 15; else if (eq >= 60) score += 12; else if (eq >= 40) score += 9;

  const age = lead.year_built ? (2026 - lead.year_built) : 0;

  if (age >= 30) score += 5; else if (age >= 15) score += 3;

  return Math.min(100, score);

}

export default function PropWireImport() {

  const [step, setStep] = useState(1);

  const [fileName, setFileName] = useState("");

  const [rawHeaders, setRawHeaders] = useState([]);

  const [rawRows, setRawRows] = useState([]);

  const [mapping, setMapping] = useState({});

  const [previewLeads, setPreviewLeads] = useState([]);

  const [defaults, setDefaults] = useState({ source: "PropWire — Tired Senior Landlord", target_zip: "" });

  const [ericFilterOnly, setEricFilterOnly] = useState(true);

  const [requirePhone, setRequirePhone] = useState(true);

  const [skipDuplicates, setSkipDuplicates] = useState(true);

  const [duplicatesSkipped, setDuplicatesSkipped] = useState(0);

  const [importing, setImporting] = useState(false);

  const [progress, setProgress] = useState({ done: 0, total: 0, failed: 0 });

  const [completed, setCompleted] = useState(false);

  const [error, setError] = useState("");

  function handleFile(file) {

    setError("");

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {

      try {

        const { headers, rows } = parseCSV(e.target.result);

        if (!headers.length) { setError("CSV is empty or unreadable."); return; }

        setRawHeaders(headers);

        setRawRows(rows);

        // Auto-map

        const auto = {};

        headers.forEach((h, i) => {

          const key = h.toLowerCase().trim();

          if (FIELD_MAP[key]) auto[i] = FIELD_MAP[key];

        });

        setMapping(auto);

        setStep(2);

      } catch (err) { setError("Failed to parse CSV: " + err.message); }

    };

    reader.readAsText(file);

  }

  // Normalize for dedup matching: digits only for phone, lowercase trimmed for address

  const normPhone = (p) => (p || "").replace(/\D/g, "");

  const normAddr = (a) => (a || "").toLowerCase().replace(/\s+/g, " ").trim();

  async function buildPreview() {

    const leads = rawRows.map(row => {

      const lead = {};

      let firstName = "", lastName = "";

      Object.entries(mapping).forEach(([colIdx, field]) => {

        const val = row[colIdx];

        if (!val || !field) return;

        if (field === "first_name") firstName = val;

        else if (field === "last_name") lastName = val;

        else if (field === "phone" || field === "phone2" || field === "phone3") {

          lead[field] = normalizePhone(val);

        } else if (field === "arv_estimate") lead.arv_estimate = parseMoney(val);

        else if (field === "equity_percent") {

          const n = parseFloat(String(val).replace(/[%,\s]/g, ""));

          if (!isNaN(n)) lead.equity_percent = n;

        } else if (field === "year_built") {

          const n = parseInt(val);

          if (!isNaN(n)) lead.year_built = n;

        } else if (["is_pre_foreclosure","has_tax_lien","has_code_violation","is_vacant","is_absentee","is_free_and_clear"].includes(field)) {

          lead[field] = parseBool(val);

        } else if (field === "_owner_occupied") {

          lead.is_absentee = !parseBool(val);

        } else if (!field.startsWith("_")) {

          lead[field] = val;

        }

      });

      // Combine name parts

      if (!lead.name && (firstName || lastName)) lead.name = `${firstName} ${lastName}`.trim();

      // Clean phone — use phone2/phone3 as fallback

      if (!lead.phone && lead.phone2) lead.phone = lead.phone2;

      if (!lead.phone && lead.phone3) lead.phone = lead.phone3;

      delete lead.phone2; delete lead.phone3;

      // Defaults

      lead.source = defaults.source;

      lead.status = "New Lead";

      lead.touch_count = 0;

      lead.next_followup_date = new Date().toISOString().split("T")[0];

      // Calculate stacked flags

      let stacks = 0;

      if (lead.is_pre_foreclosure) stacks++;

      if (lead.has_tax_lien) stacks++;

      if (lead.is_vacant) stacks++;

      if (lead.is_absentee) stacks++;

      if (lead.has_code_violation) stacks++;

      if (lead.is_free_and_clear) stacks++;

      lead.stacked_flags_count = stacks;

      lead.motivation_total_score = motivationScore(lead);

      lead.priority = lead.motivation_total_score >= 70 ? "Hot" : lead.motivation_total_score >= 50 ? "High" : lead.motivation_total_score >= 30 ? "Medium" : "Low";

      return lead;

    });

    // Apply filters

    let filtered = leads;

    if (requirePhone) filtered = filtered.filter(l => l.phone && l.phone.trim());

    if (ericFilterOnly) filtered = filtered.filter(ericQualifies);

    // Deduplication — fetch existing leads, skip phone or address matches

    let dupesRemoved = 0;

    if (skipDuplicates) {

      try {

        const existing = await base44.entities.Lead.list("-created_date", 5000);

        const existingPhones = new Set(existing.map(l => normPhone(l.phone)).filter(p => p.length >= 10));

        const existingAddrs = new Set(existing.map(l => normAddr(l.address)).filter(a => a.length > 5));

        const before = filtered.length;

        filtered = filtered.filter(l => {

          const p = normPhone(l.phone);

          const a = normAddr(l.address);

          if (p.length >= 10 && existingPhones.has(p)) return false;

          if (a.length > 5 && existingAddrs.has(a)) return false;

          return true;

        });

        dupesRemoved = before - filtered.length;

      } catch (e) { console.error("Dedup check failed:", e); }

    }

    setDuplicatesSkipped(dupesRemoved);

    setPreviewLeads(filtered);

    setStep(3);

  }

  async function runImport() {

    setImporting(true);

    setProgress({ done: 0, total: previewLeads.length, failed: 0 });

    let done = 0, failed = 0;

    // Batch in chunks of 10 with delay to avoid rate limits

    const CHUNK = 10;

    for (let i = 0; i < previewLeads.length; i += CHUNK) {

      const chunk = previewLeads.slice(i, i + CHUNK);

      await Promise.all(chunk.map(async (lead) => {

        try { await base44.entities.Lead.create(lead); done++; }

        catch (e) { console.error("Lead create failed:", e); failed++; }

      }));

      setProgress({ done, total: previewLeads.length, failed });

      await new Promise(r => setTimeout(r, 200));

    }

    setImporting(false);

    setCompleted(true);

  }

  // Field options for manual mapping

  const FIELD_OPTIONS = [

    { value: "", label: "— Skip column —" },

    { value: "name", label: "Owner Name (full)" },

    { value: "first_name", label: "Owner First Name" },

    { value: "last_name", label: "Owner Last Name" },

    { value: "phone", label: "Phone (primary)" },

    { value: "phone2", label: "Phone 2 (fallback)" },

    { value: "phone3", label: "Phone 3 (fallback)" },

    { value: "email", label: "Email" },

    { value: "address", label: "Property Address" },

    { value: "city", label: "Property City" },

    { value: "state", label: "Property State" },

    { value: "zip", label: "Property Zip" },

    { value: "arv_estimate", label: "Estimated Value (ARV)" },

    { value: "equity_percent", label: "Equity %" },

    { value: "year_built", label: "Year Built" },

    { value: "is_pre_foreclosure", label: "Pre-Foreclosure flag" },

    { value: "has_tax_lien", label: "Tax Lien / Delinquent flag" },

    { value: "has_code_violation", label: "Code Violation flag" },

    { value: "is_vacant", label: "Vacant flag" },

    { value: "is_absentee", label: "Absentee Owner flag" },

    { value: "_owner_occupied", label: "Owner Occupied (will invert)" },

    { value: "is_free_and_clear", label: "Free & Clear flag" },

    { value: "property_type", label: "Property Type" },

  ];

  return (

    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", minHeight: "100vh", background: "#f8f9fa" }}>

      {/* Header */}

      <div style={{ background: `linear-gradient(135deg, ${NAVY}, #122B5E)`, padding: "28px 24px", color: "#fff" }}>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>📥 PropWire Import Wizard</div>

          <h1 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>Bulk Import Sellers from PropWire</h1>

          <p style={{ fontSize: 14, color: "#a0b0c8", margin: 0 }}>Drop your CSV → auto-mapped → motivation-scored → ready to dial. Three weeks of Gold = export everything now.</p>

        </div>

      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>

        {/* Progress steps */}

        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>

          {[

            { n: 1, label: "Upload CSV" },

            { n: 2, label: "Map Columns" },

            { n: 3, label: "Preview & Filter" },

            { n: 4, label: "Import Done" },

          ].map(s => (

            <div key={s.n} style={{ flex: 1, padding: "10px 14px", borderRadius: 8,

              background: step === s.n ? GOLD : step > s.n ? GREEN : "#e5e7eb",

              color: step >= s.n ? "#fff" : "#666",

              fontWeight: 700, fontSize: 13, textAlign: "center" }}>

              {step > s.n ? "✓" : s.n}. {s.label}

            </div>

          ))}

        </div>

        {error && <div style={{ background: "#fee2e2", border: `1px solid ${RED}`, color: RED, padding: 12, borderRadius: 8, marginBottom: 16 }}>{error}</div>}

        {/* STEP 1: Upload */}

        {step === 1 && (

          <div style={{ background: "#fff", borderRadius: 14, padding: 32, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>

            <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: "0 0 16px" }}>Step 1 — Upload Your PropWire CSV</h2>

            <label htmlFor="csv-upload" style={{

              display: "block", border: `2px dashed ${GOLD}`, borderRadius: 12, padding: "48px 24px",

              textAlign: "center", cursor: "pointer", background: "#fffbf0", transition: "all 0.15s",

            }}>

              <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>

              <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 6 }}>Click to upload PropWire CSV</div>

              <div style={{ fontSize: 13, color: "#666" }}>Drop the file here, or click to browse</div>

              <input id="csv-upload" type="file" accept=".csv" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: "none" }} />

            </label>

            <div style={{ marginTop: 24, padding: 16, background: "#f9fafb", borderRadius: 10, fontSize: 13, color: "#555", lineHeight: 1.7 }}>

              <strong style={{ color: NAVY }}>💡 How to export from PropWire:</strong>

              <ol style={{ margin: "8px 0 0", paddingLeft: 20 }}>

                <li>Run your filtered search in PropWire (e.g., Memphis tired senior landlords)</li>

                <li>Click <strong>"Export"</strong> in the top-right of the results page</li>

                <li>Choose <strong>CSV format</strong></li>

                <li>Wait for the email or download trigger, then upload here</li>

              </ol>

            </div>

            <div style={{ marginTop: 16, padding: 16, background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 10, fontSize: 13, color: "#92400e", lineHeight: 1.7 }}>

              <strong>⏰ Reminder:</strong> Your PropWire Gold expires in 3 weeks. Pull your top lists NOW (Memphis Tired Landlord, Cleveland Inherited, all-cities Pre-Foreclosure) — even if you can't dial them all this month, you own the data forever once imported here.

            </div>

          </div>

        )}

        {/* STEP 2: Map Columns */}

        {step === 2 && (

          <div style={{ background: "#fff", borderRadius: 14, padding: 32, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>

              <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: 0 }}>Step 2 — Map Columns</h2>

              <div style={{ fontSize: 12, color: "#888" }}>📁 {fileName} · {rawRows.length} rows</div>

            </div>

            <p style={{ fontSize: 13, color: "#666", margin: "0 0 20px" }}>

              We auto-detected most columns. Review below and adjust if needed. <strong style={{ color: GREEN }}>{Object.keys(mapping).length}</strong> of {rawHeaders.length} columns mapped.

            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "10px 12px", background: "#f3f4f6", borderRadius: 8, marginBottom: 8, fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 0.5 }}>

              <div>PropWire Column</div>

              <div>Sample Value</div>

              <div>Maps To</div>

            </div>

            <div style={{ maxHeight: 480, overflowY: "auto" }}>

              {rawHeaders.map((header, idx) => (

                <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "10px 12px", borderBottom: "1px solid #f3f4f6", alignItems: "center" }}>

                  <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{header}</div>

                  <div style={{ fontSize: 12, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rawRows[0]?.[idx] || "—"}</div>

                  <select value={mapping[idx] || ""} onChange={e => setMapping(m => ({ ...m, [idx]: e.target.value }))}

                    style={{ padding: "7px 10px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 12, background: mapping[idx] ? "#f0fdf4" : "#fff" }}>

                    {FIELD_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}

                  </select>

                </div>

              ))}

            </div>

            <div style={{ marginTop: 24, padding: 18, background: "#f9fafb", borderRadius: 10 }}>

              <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 12 }}>Defaults applied to every imported lead:</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

                <div>

                  <label style={{ fontSize: 11, fontWeight: 700, color: "#555", display: "block", marginBottom: 4 }}>Source Tag</label>

                  <input value={defaults.source} onChange={e => setDefaults(d => ({ ...d, source: e.target.value }))}

                    style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} />

                </div>

                <div>

                  <label style={{ fontSize: 11, fontWeight: 700, color: "#555", display: "block", marginBottom: 4 }}>Target Zip / Sprint City (optional)</label>

                  <input value={defaults.target_zip} onChange={e => setDefaults(d => ({ ...d, target_zip: e.target.value }))} placeholder="e.g. Memphis, TN"

                    style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} />

                </div>

              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 16, flexWrap: "wrap" }}>

                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#333", cursor: "pointer" }}>

                  <input type="checkbox" checked={ericFilterOnly} onChange={e => setEricFilterOnly(e.target.checked)} />

                  <span>Apply Eric Cline's filters (ARV ≤ $350K, equity ≥ 30%, 15+ year-old property)</span>

                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#333", cursor: "pointer" }}>

                  <input type="checkbox" checked={requirePhone} onChange={e => setRequirePhone(e.target.checked)} />

                  <span>Skip leads without phone numbers</span>

                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#333", cursor: "pointer" }}>

                  <input type="checkbox" checked={skipDuplicates} onChange={e => setSkipDuplicates(e.target.checked)} />

                  <span>🛡️ Skip duplicates (matches phone or address already in CRM)</span>

                </label>

              </div>

            </div>

            <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "space-between" }}>

              <button onClick={() => { setStep(1); setRawHeaders([]); setRawRows([]); setMapping({}); }}

                style={{ background: "#f3f4f6", color: "#555", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>

                ← Start Over

              </button>

              <button onClick={buildPreview}

                style={{ background: GOLD, color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>

                Preview Leads →

              </button>

            </div>

          </div>

        )}

        {/* STEP 3: Preview */}

        {step === 3 && (

          <div style={{ background: "#fff", borderRadius: 14, padding: 32, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>

              <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: 0 }}>Step 3 — Preview & Confirm</h2>

              <div style={{ fontSize: 13, color: "#666" }}>

                <strong style={{ color: GREEN }}>{previewLeads.length}</strong> qualified leads ready to import

                {rawRows.length > previewLeads.length && <span style={{ color: "#888" }}> · {rawRows.length - previewLeads.length} filtered out</span>}

                {duplicatesSkipped > 0 && <span style={{ color: GOLD, fontWeight: 700 }}> · 🛡️ {duplicatesSkipped} duplicates skipped</span>}

              </div>

            </div>

            {/* Stats */}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>

              {[

                { label: "Total Leads", val: previewLeads.length, color: NAVY },

                { label: "🔥 Hot (70+)", val: previewLeads.filter(l => l.motivation_total_score >= 70).length, color: RED },

                { label: "📈 High (50-69)", val: previewLeads.filter(l => l.motivation_total_score >= 50 && l.motivation_total_score < 70).length, color: GOLD },

                { label: "Have Phone", val: previewLeads.filter(l => l.phone).length, color: GREEN },

              ].map(s => (

                <div key={s.label} style={{ background: "#f9fafb", borderTop: `3px solid ${s.color}`, borderRadius: 8, padding: 14 }}>

                  <div style={{ fontSize: 22, fontWeight: 900, color: NAVY }}>{s.val}</div>

                  <div style={{ fontSize: 11, color: "#666" }}>{s.label}</div>

                </div>

              ))}

            </div>

            {/* Preview table */}

            <div style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: 8, maxHeight: 400, overflowY: "auto" }}>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>

                <thead style={{ position: "sticky", top: 0, background: "#f3f4f6" }}>

                  <tr>

                    {["Name", "Phone", "Address", "City", "ARV", "Eq%", "Score", "Flags"].map(h => (

                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "#555", borderBottom: "1px solid #e5e7eb" }}>{h}</th>

                    ))}

                  </tr>

                </thead>

                <tbody>

                  {previewLeads.slice(0, 50).map((l, i) => (

                    <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>

                      <td style={{ padding: "8px 12px", fontWeight: 600 }}>{l.name || "—"}</td>

                      <td style={{ padding: "8px 12px", color: l.phone ? GREEN : "#aaa", fontWeight: l.phone ? 700 : 400 }}>{l.phone || "no phone"}</td>

                      <td style={{ padding: "8px 12px", color: "#555" }}>{l.address || "—"}</td>

                      <td style={{ padding: "8px 12px", color: "#555" }}>{l.city || "—"}</td>

                      <td style={{ padding: "8px 12px", color: "#555" }}>{l.arv_estimate ? `$${l.arv_estimate.toLocaleString()}` : "—"}</td>

                      <td style={{ padding: "8px 12px", color: "#555" }}>{l.equity_percent ? `${l.equity_percent}%` : "—"}</td>

                      <td style={{ padding: "8px 12px" }}>

                        <span style={{ background: l.motivation_total_score >= 70 ? RED : l.motivation_total_score >= 50 ? GOLD : "#9ca3af",

                          color: "#fff", padding: "2px 8px", borderRadius: 10, fontWeight: 700, fontSize: 11 }}>

                          {l.motivation_total_score}

                        </span>

                      </td>

                      <td style={{ padding: "8px 12px", fontSize: 10 }}>

                        {l.is_pre_foreclosure && <span style={{ background: "#fee2e2", color: RED, padding: "1px 6px", borderRadius: 8, marginRight: 3 }}>Pre-FC</span>}

                        {l.has_tax_lien && <span style={{ background: "#fef3c7", color: "#92400e", padding: "1px 6px", borderRadius: 8, marginRight: 3 }}>Tax</span>}

                        {l.is_vacant && <span style={{ background: "#dbeafe", color: "#1e40af", padding: "1px 6px", borderRadius: 8, marginRight: 3 }}>Vac</span>}

                        {l.is_absentee && <span style={{ background: "#e0e7ff", color: "#3730a3", padding: "1px 6px", borderRadius: 8, marginRight: 3 }}>Abs</span>}

                        {l.is_free_and_clear && <span style={{ background: "#dcfce7", color: "#166534", padding: "1px 6px", borderRadius: 8 }}>F&C</span>}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

              {previewLeads.length > 50 && (

                <div style={{ padding: 12, textAlign: "center", background: "#f9fafb", color: "#888", fontSize: 12 }}>

                  + {previewLeads.length - 50} more leads (will all be imported)

                </div>

              )}

            </div>

            {/* Action buttons */}

            <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "space-between" }}>

              <button onClick={() => setStep(2)} disabled={importing}

                style={{ background: "#f3f4f6", color: "#555", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>

                ← Back to Mapping

              </button>

              <button onClick={runImport} disabled={importing || previewLeads.length === 0}

                style={{ background: previewLeads.length === 0 ? "#ccc" : GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 900, cursor: importing ? "not-allowed" : "pointer", fontSize: 14 }}>

                {importing ? `⏳ Importing ${progress.done} / ${progress.total}...` : `🚀 Import ${previewLeads.length} Leads to CRM`}

              </button>

            </div>

            {importing && (

              <div style={{ marginTop: 16 }}>

                <div style={{ height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>

                  <div style={{ height: "100%", width: `${(progress.done / progress.total) * 100}%`, background: GREEN, transition: "width 0.3s" }} />

                </div>

                <div style={{ fontSize: 11, color: "#666", marginTop: 6, textAlign: "center" }}>

                  {progress.done} imported · {progress.failed} failed · {progress.total - progress.done - progress.failed} remaining

                </div>

              </div>

            )}

            {completed && (

              <div style={{ marginTop: 24, background: "#f0fdf4", border: `2px solid ${GREEN}`, borderRadius: 12, padding: 24, textAlign: "center" }}>

                <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>

                <div style={{ fontSize: 20, fontWeight: 900, color: GREEN, marginBottom: 6 }}>Import Complete!</div>

                <div style={{ fontSize: 14, color: "#333", marginBottom: 18 }}>

                  <strong>{progress.done}</strong> leads added to your CRM. {progress.failed > 0 && <span style={{ color: RED }}>{progress.failed} failed (likely duplicates).</span>}

                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>

                  <a href="/CRM" style={{ background: NAVY, color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>📋 Open CRM Pipeline</a>

                  <a href="/FirstDealSprint" style={{ background: GOLD, color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>🎯 First Deal Sprint</a>

                  <a href="/SkipTracer" style={{ background: "rgba(11,31,69,0.1)", color: NAVY, padding: "12px 22px", borderRadius: 8, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>🔍 Skip Trace Missing Numbers</a>

                  <button onClick={() => { setStep(1); setFileName(""); setRawHeaders([]); setRawRows([]); setMapping({}); setPreviewLeads([]); setCompleted(false); setProgress({ done: 0, total: 0, failed: 0 }); }}

                    style={{ background: "#fff", color: NAVY, border: `2px solid ${NAVY}`, padding: "12px 22px", borderRadius: 8, fontWeight: 800, cursor: "pointer", fontSize: 13 }}>

                    📥 Import Another CSV

                  </button>

                </div>

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  );

}
