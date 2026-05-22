# skiptrace

Source: skiptrace.docx

import { useState, useRef, useCallback } from "react";

import { Lead } from "@/api/entities";

// ─────────────────────────────────────────────────────────────────────────────

// HOME-LINK REALTY GROUP — SKIP TRACE UPLOAD CENTER

// Drop a CSV of property addresses → find owner phone numbers → push to CRM

// ─────────────────────────────────────────────────────────────────────────────

const NAVY = "#0B1F45";

const GOLD = "#D4A843";

const SKIP_URL = "https://the-replicator-bfa0beaa.base44.app/functions/apifySkipTrace";

// ── CSV Parser ────────────────────────────────────────────────────────────────

function parseCSV(text) {

  const lines = text.trim().split(/\r?\n/);

  if (lines.length < 2) return [];

  const raw_headers = lines[0].split(",").map(h => h.replace(/^"|"$/g, "").trim().toLowerCase());

  return lines.slice(1).map(line => {

    const vals = line.match(/("([^"]*)")|([^,]+)|(?<=,)(?=,|$)/g) || line.split(",");

    const row = {};

    raw_headers.forEach((h, i) => {

      row[h] = (vals[i] || "").replace(/^"|"$/g, "").trim();

    });

    return row;

  }).filter(r => Object.values(r).some(v => v));

}

function extractField(row, keys) {

  for (const k of keys) {

    if (row[k] && row[k].trim()) return row[k].trim();

  }

  return "";

}

function normalizeLead(row) {

  return {

    address: extractField(row, ["property address","address","street address","situs address","prop address","addr","street"]),

    city:    extractField(row, ["city","prop city","property city"]),

    state:   extractField(row, ["state","st","prop state"]),

    zip:     extractField(row, ["zip","zip code","zipcode","postal code","postal"]),

    owner:   extractField(row, ["owner name","owner","name","full name","first name"]),

  };

}

// ── Export ────────────────────────────────────────────────────────────────────

function downloadCSV(rows) {

  const hdrs = ["address","city","state","zip","owner","phone1","phone2","phone3","email","status"];

  const lines = [hdrs.join(","), ...rows.map(r =>

    hdrs.map(h => `"${(r[h]||"").replace(/"/g,'""')}"`).join(",")

  )];

  const blob = new Blob([lines.join("\n")], { type: "text/csv" });

  const a = document.createElement("a");

  a.href = URL.createObjectURL(blob);

  a.download = `skip_trace_${new Date().toISOString().slice(0,10)}.csv`;

  a.click();

}

// ─────────────────────────────────────────────────────────────────────────────

export default function SkipTraceUpload() {

  const [step, setStep]           = useState(1);         // 1=upload 2=preview 3=running 4=results

  const [leads, setLeads]         = useState([]);

  const [fileName, setFileName]   = useState("");

  const [results, setResults]     = useState([]);

  const [progress, setProgress]   = useState(0);

  const [statusMsg, setStatusMsg] = useState("");

  const [pushing, setPushing]     = useState(false);

  const [pushed, setPushed]       = useState(0);

  const [dragOver, setDragOver]   = useState(false);

  const [filterFound, setFilterFound] = useState(false);

  const [pasteMode, setPasteMode] = useState(false);

  const [pasteText, setPasteText] = useState("");

  const fileRef = useRef();

  // ── File / paste handling ─────────────────────────────────────────────────

  const processFile = (file) => {

    if (!file || !file.name.endsWith(".csv")) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {

      const rows = parseCSV(e.target.result);

      const normalized = rows.map(r => normalizeLead(r)).filter(l => l.address);

      setLeads(normalized);

      setStep(2);

    };

    reader.readAsText(file);

  };

  const handleDrop = useCallback((e) => {

    e.preventDefault();

    setDragOver(false);

    processFile(e.dataTransfer.files[0]);

  }, []);

  const handlePaste = () => {

    const lines = pasteText.trim().split(/\r?\n/).filter(l => l.trim());

    const normalized = lines.map(line => {

      const parts = line.split(",").map(p => p.trim());

      return {

        address: parts[0] || "",

        city:    parts[1] || "",

        state:   parts[2] || "",

        zip:     parts[3] || "",

        owner:   parts[4] || "",

      };

    }).filter(l => l.address);

    setLeads(normalized);

    setFileName("Pasted addresses");

    setStep(2);

  };

  // ── Run skip trace ────────────────────────────────────────────────────────

  const runTrace = async () => {

    setStep(3);

    setProgress(0);

    setResults([]);

    const allResults = [];

    const BATCH = 5; // small batches to stay within timeouts

    for (let i = 0; i < leads.length; i += BATCH) {

      const batch = leads.slice(i, i + BATCH);

      const pct = Math.round((i / leads.length) * 90);

      setProgress(pct);

      setStatusMsg(`Tracing ${i + 1}–${Math.min(i + BATCH, leads.length)} of ${leads.length}...`);

      const promises = batch.map(lead =>

        fetch(SKIP_URL, {

          method: "POST",

          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({

            address: lead.address,

            city:    lead.city,

            state:   lead.state,

            zip:     lead.zip,

            name:    lead.owner || "",

          }),

        })

        .then(r => r.json())

        .catch(() => ({ ok: false, results: [] }))

      );

      const responses = await Promise.all(promises);

      batch.forEach((lead, bi) => {

        const res = responses[bi] || {};

        const first = res.results?.[0] || {};

        const phones = first.phones || [];

        const emails = first.emails || [];

        allResults.push({

          ...lead,

          owner:   first.name  || lead.owner || "",

          phone1:  phones[0] || "",

          phone2:  phones[1] || "",

          phone3:  phones[2] || "",

          email:   emails[0] || "",

          status:  phones[0] ? "✅ Found" : "❌ Not Found",

          found:   !!phones[0],

        });

      });

      setResults([...allResults]);

    }

    setProgress(100);

    setStatusMsg(`Complete — ${allResults.filter(r => r.found).length} of ${allResults.length} found`);

    setStep(4);

  };

  // ── Push to CRM ───────────────────────────────────────────────────────────

  const pushToCRM = async () => {

    setPushing(true);

    const withPhone = results.filter(r => r.found);

    let count = 0;

    try {

      const existing = await Lead.list();

      const existingSet = new Set(existing.map(l => (l.address||"").toLowerCase().trim()));

      for (const r of withPhone) {

        const key = r.address.toLowerCase().trim();

        if (existingSet.has(key)) continue;

        await Lead.create({

          name:    r.owner || "Unknown Owner",

          phone:   r.phone1,

          email:   r.email || "",

          address: r.address,

          city:    r.city,

          state:   r.state,

          zip:     r.zip,

          source:  "Skip Trace",

          status:  "New",

          priority: "MEDIUM",

          notes:   `Skip traced. Alt phones: ${[r.phone2, r.phone3].filter(Boolean).join(" | ") || "None"}`,

          touch_count: 0,

        });

        count++;

        existingSet.add(key);

      }

    } catch (e) { console.error(e); }

    setPushed(count);

    setPushing(false);

  };

  const foundCount  = results.filter(r => r.found).length;

  const displayRows = filterFound ? results.filter(r => r.found) : results;

  // ─────────────────────────────────────────────────────────────────────────

  return (

    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Inter',sans-serif", padding: "24px 16px" }}>

      {/* ── Header ── */}

      <div style={{

        background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a6e 100%)`,

        borderRadius: 16, padding: "28px 32px", marginBottom: 24,

        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,

        boxShadow: "0 4px 24px rgba(11,31,69,0.18)"

      }}>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

          <div style={{ fontSize: 40 }}>🔍</div>

          <div>

            <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>

              Skip Trace Upload Center

            </div>

            <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 2 }}>

              Upload a property list → find owner phone numbers → push to CRM

            </div>

          </div>

        </div>

        <div style={{

          background: "rgba(212,168,67,0.15)", border: `1.5px solid ${GOLD}`,

          borderRadius: 10, padding: "10px 20px", textAlign: "center"

        }}>

          <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Powered by</div>

          <div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>Apify Skip Trace</div>

        </div>

      </div>

      {/* ── Progress Steps ── */}

      <div style={{

        display: "flex", alignItems: "center", gap: 0,

        background: "#fff", borderRadius: 12, padding: "16px 24px",

        boxShadow: "0 1px 6px rgba(0,0,0,0.08)", marginBottom: 24,

        overflowX: "auto"

      }}>

        {[

          { n: 1, label: "Upload File" },

          { n: 2, label: "Preview" },

          { n: 3, label: "Running" },

          { n: 4, label: "Results" },

        ].map((s, idx) => (

          <div key={s.n} style={{ display: "flex", alignItems: "center", flex: 1 }}>

            <div style={{

              display: "flex", flexDirection: "column", alignItems: "center", flex: 1

            }}>

              <div style={{

                width: 36, height: 36, borderRadius: "50%",

                background: step >= s.n ? NAVY : "#e2e8f0",

                color: step >= s.n ? "#fff" : "#94a3b8",

                display: "flex", alignItems: "center", justifyContent: "center",

                fontWeight: 800, fontSize: 15,

                border: step === s.n ? `3px solid ${GOLD}` : "3px solid transparent",

                transition: "all 0.3s"

              }}>{step > s.n ? "✓" : s.n}</div>

              <div style={{ fontSize: 11, fontWeight: 600, color: step >= s.n ? NAVY : "#94a3b8", marginTop: 4, whiteSpace: "nowrap" }}>{s.label}</div>

            </div>

            {idx < 3 && <div style={{ height: 2, flex: 1, background: step > s.n ? NAVY : "#e2e8f0", transition: "all 0.3s", marginBottom: 18 }} />}

          </div>

        ))}

      </div>

      {/* ── STEP 1: Upload ── */}

      {step === 1 && (

        <div style={{ maxWidth: 720, margin: "0 auto" }}>

          {/* Mode toggle */}

          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>

            {[["📁 Upload CSV", false], ["✏️ Paste Addresses", true]].map(([label, mode]) => (

              <button key={label} onClick={() => setPasteMode(mode)}

                style={{

                  flex: 1, padding: "12px 0", borderRadius: 10, fontWeight: 700, fontSize: 14,

                  border: `2px solid ${pasteMode === mode ? NAVY : "#e2e8f0"}`,

                  background: pasteMode === mode ? NAVY : "#fff",

                  color: pasteMode === mode ? "#fff" : "#64748b",

                  cursor: "pointer", transition: "all 0.2s"

                }}>{label}</button>

            ))}

          </div>

          {!pasteMode ? (

            /* Drop zone */

            <div

              onDragOver={e => { e.preventDefault(); setDragOver(true); }}

              onDragLeave={() => setDragOver(false)}

              onDrop={handleDrop}

              onClick={() => fileRef.current?.click()}

              style={{

                border: `3px dashed ${dragOver ? GOLD : "#94a3b8"}`,

                borderRadius: 20, padding: "60px 40px", textAlign: "center",

                background: dragOver ? "rgba(212,168,67,0.06)" : "#fff",

                cursor: "pointer", transition: "all 0.3s",

                boxShadow: dragOver ? "0 0 0 4px rgba(212,168,67,0.15)" : "none"

              }}>

              <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }}

                onChange={e => processFile(e.target.files[0])} />

              <div style={{ fontSize: 56, marginBottom: 16 }}>📂</div>

              <div style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>

                Drop your CSV file here

              </div>

              <div style={{ color: "#64748b", fontSize: 15, marginBottom: 20 }}>

                or click to browse your computer

              </div>

              <div style={{

                display: "inline-block", background: NAVY, color: "#fff",

                padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15

              }}>Choose CSV File</div>

            </div>

          ) : (

            /* Paste zone */

            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>

              <div style={{ fontWeight: 700, color: NAVY, marginBottom: 8, fontSize: 14 }}>

                Paste addresses — one per line:

              </div>

              <div style={{ color: "#64748b", fontSize: 12, marginBottom: 12 }}>

                Format: <code>123 Main St, Dallas, TX, 75201, Owner Name</code> (city/state/zip/owner optional)

              </div>

              <textarea

                value={pasteText}

                onChange={e => setPasteText(e.target.value)}

                placeholder={"123 Main St, Dallas, TX, 75201\n456 Oak Ave, Houston, TX, 77001\n789 Pine Rd, Austin, TX, 78701"}

                style={{

                  width: "100%", height: 220, borderRadius: 10, border: "1.5px solid #e2e8f0",

                  padding: 14, fontSize: 13, fontFamily: "monospace", resize: "vertical",

                  outline: "none", boxSizing: "border-box"

                }}

              />

              <button onClick={handlePaste} disabled={!pasteText.trim()}

                style={{

                  marginTop: 14, width: "100%", padding: "14px 0",

                  background: pasteText.trim() ? NAVY : "#e2e8f0",

                  color: pasteText.trim() ? "#fff" : "#94a3b8",

                  border: "none", borderRadius: 10, fontWeight: 800, fontSize: 16, cursor: pasteText.trim() ? "pointer" : "not-allowed"

                }}>

                Preview Addresses →

              </button>

            </div>

          )}

          {/* Format guide */}

          <div style={{ background: "#fff", borderRadius: 14, padding: 20, marginTop: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>

            <div style={{ fontWeight: 700, color: NAVY, marginBottom: 12, fontSize: 14 }}>📋 Accepted CSV Column Names</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>

              {[

                ["Address", "address, property address, situs address, street"],

                ["City", "city, prop city"],

                ["State", "state, st"],

                ["Zip", "zip, zip code, postal code"],

                ["Owner", "owner name, owner, name, full name"],

              ].map(([field, aliases]) => (

                <div key={field} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 14px" }}>

                  <div style={{ fontWeight: 700, color: NAVY, fontSize: 13 }}>{field}</div>

                  <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{aliases}</div>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

      {/* ── STEP 2: Preview ── */}

      {step === 2 && (

        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>

            {/* Summary bar */}

            <div style={{ background: NAVY, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>

              <div>

                <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>📋 {fileName}</div>

                <div style={{ color: "#94a3b8", fontSize: 13 }}>{leads.length} addresses ready to skip trace</div>

              </div>

              <div style={{ display: "flex", gap: 10 }}>

                <button onClick={() => setStep(1)}

                  style={{ padding: "10px 20px", borderRadius: 8, border: "1.5px solid #475569", background: "transparent", color: "#94a3b8", fontWeight: 700, cursor: "pointer" }}>

                  ← Change File

                </button>

                <button onClick={runTrace}

                  style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: GOLD, color: NAVY, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>

                  🔍 Run Skip Trace ({leads.length} records)

                </button>

              </div>

            </div>

            {/* Preview table */}

            <div style={{ overflowX: "auto", maxHeight: 420 }}>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>

                <thead>

                  <tr style={{ background: "#f8fafc", borderBottom: "1.5px solid #e2e8f0" }}>

                    {["#","Address","City","State","Zip","Owner Name"].map(h => (

                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#475569", whiteSpace: "nowrap" }}>{h}</th>

                    ))}

                  </tr>

                </thead>

                <tbody>

                  {leads.slice(0, 50).map((lead, i) => (

                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>

                      <td style={{ padding: "9px 14px", color: "#94a3b8", fontSize: 12 }}>{i + 1}</td>

                      <td style={{ padding: "9px 14px", fontWeight: 600, fontSize: 13, color: NAVY }}>{lead.address || <span style={{color:"#ef4444"}}>⚠️ Missing</span>}</td>

                      <td style={{ padding: "9px 14px", fontSize: 13, color: "#374151" }}>{lead.city || "—"}</td>

                      <td style={{ padding: "9px 14px", fontSize: 13, color: "#374151" }}>{lead.state || "—"}</td>

                      <td style={{ padding: "9px 14px", fontSize: 13, color: "#374151" }}>{lead.zip || "—"}</td>

                      <td style={{ padding: "9px 14px", fontSize: 13, color: "#374151" }}>{lead.owner || <span style={{color:"#94a3b8"}}>Unknown</span>}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {leads.length > 50 && (

              <div style={{ textAlign: "center", padding: "12px", color: "#64748b", fontSize: 13, background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>

                Showing first 50 of {leads.length} records — all {leads.length} will be traced

              </div>

            )}

          </div>

        </div>

      )}

      {/* ── STEP 3: Running ── */}

      {step === 3 && (

        <div style={{ maxWidth: 600, margin: "0 auto" }}>

          <div style={{ background: "#fff", borderRadius: 20, padding: "48px 40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center" }}>

            <div style={{ fontSize: 60, marginBottom: 20 }}>

              {progress < 100 ? "⏳" : "✅"}

            </div>

            <div style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 8 }}>

              {progress < 100 ? "Running Skip Trace..." : "Skip Trace Complete!"}

            </div>

            <div style={{ color: "#64748b", fontSize: 15, marginBottom: 28 }}>{statusMsg}</div>

            {/* Progress bar */}

            <div style={{ background: "#e2e8f0", borderRadius: 99, height: 14, overflow: "hidden", marginBottom: 16 }}>

              <div style={{

                width: `${progress}%`, height: "100%",

                background: `linear-gradient(90deg, ${NAVY}, ${GOLD})`,

                borderRadius: 99, transition: "width 0.5s ease"

              }} />

            </div>

            <div style={{ fontWeight: 700, color: NAVY, fontSize: 16 }}>{progress}%</div>

            {/* Live results preview */}

            {results.length > 0 && (

              <div style={{ marginTop: 24, textAlign: "left" }}>

                <div style={{ fontWeight: 700, color: NAVY, marginBottom: 10, fontSize: 14 }}>Live Results:</div>

                {results.slice(-5).map((r, i) => (

                  <div key={i} style={{

                    display: "flex", alignItems: "center", gap: 10,

                    padding: "8px 12px", borderRadius: 8,

                    background: r.found ? "rgba(22,163,74,0.08)" : "rgba(239,68,68,0.06)",

                    marginBottom: 6

                  }}>

                    <span style={{ fontSize: 16 }}>{r.found ? "✅" : "❌"}</span>

                    <div style={{ flex: 1 }}>

                      <div style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{r.address}</div>

                      {r.found && <div style={{ fontSize: 12, color: "#16a34a" }}>{r.phone1}</div>}

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      )}

      {/* ── STEP 4: Results ── */}

      {step === 4 && (

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Stat cards */}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 20 }}>

            {[

              { label: "Total Traced", value: results.length, icon: "📊", color: NAVY },

              { label: "Phone Found", value: foundCount, icon: "✅", color: "#16a34a" },

              { label: "Not Found", value: results.length - foundCount, icon: "❌", color: "#ef4444" },

              { label: "Match Rate", value: `${Math.round((foundCount/results.length)*100)||0}%`, icon: "🎯", color: GOLD },

            ].map(s => (

              <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", borderLeft: `4px solid ${s.color}` }}>

                <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>

                <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</div>

                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{s.label}</div>

              </div>

            ))}

          </div>

          {/* Action bar */}

          <div style={{ background: "#fff", borderRadius: 12, padding: "14px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

              <button onClick={() => setFilterFound(!filterFound)}

                style={{ padding: "9px 18px", borderRadius: 8, border: `1.5px solid ${filterFound ? NAVY : "#e2e8f0"}`, background: filterFound ? NAVY : "#fff", color: filterFound ? "#fff" : "#374151", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>

                {filterFound ? "✅ Showing Found Only" : "Show All Results"}

              </button>

              <span style={{ color: "#64748b", fontSize: 13 }}>{displayRows.length} records</span>

            </div>

            <div style={{ display: "flex", gap: 10 }}>

              <button onClick={() => downloadCSV(displayRows)}

                style={{ padding: "10px 20px", borderRadius: 8, border: `1.5px solid ${NAVY}`, background: "#fff", color: NAVY, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>

                ⬇️ Export CSV

              </button>

              <button onClick={pushToCRM} disabled={pushing || pushed > 0 || foundCount === 0}

                style={{

                  padding: "10px 22px", borderRadius: 8, border: "none",

                  background: pushed > 0 ? "#16a34a" : foundCount === 0 ? "#e2e8f0" : GOLD,

                  color: pushed > 0 ? "#fff" : foundCount === 0 ? "#94a3b8" : NAVY,

                  fontWeight: 800, fontSize: 14, cursor: foundCount > 0 && pushed === 0 ? "pointer" : "not-allowed"

                }}>

                {pushing ? "Pushing..." : pushed > 0 ? `✅ ${pushed} Added to CRM` : `Push ${foundCount} to CRM`}

              </button>

              <button onClick={() => { setStep(1); setLeads([]); setResults([]); setPushed(0); setFileName(""); setPasteText(""); }}

                style={{ padding: "10px 18px", borderRadius: 8, border: `1.5px solid #e2e8f0`, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>

                🔄 New Batch

              </button>

            </div>

          </div>

          {/* Results table */}

          <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>

            <div style={{ overflowX: "auto" }}>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>

                <thead>

                  <tr style={{ background: NAVY }}>

                    {["Status","Address","City/State","Owner","Phone 1","Phone 2","Phone 3","Email"].map(h => (

                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#94a3b8", whiteSpace: "nowrap" }}>{h}</th>

                    ))}

                  </tr>

                </thead>

                <tbody>

                  {displayRows.map((r, i) => (

                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: r.found ? (i%2===0?"#fff":"#fafffe") : (i%2===0?"#fff":"#fefafa") }}>

                      <td style={{ padding: "10px 14px" }}>

                        <span style={{

                          fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20,

                          background: r.found ? "rgba(22,163,74,0.1)" : "rgba(239,68,68,0.1)",

                          color: r.found ? "#15803d" : "#dc2626"

                        }}>{r.found ? "✅ Found" : "❌ Not Found"}</span>

                      </td>

                      <td style={{ padding: "10px 14px", fontWeight: 600, fontSize: 13, color: NAVY, maxWidth: 200 }}>{r.address}</td>

                      <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{[r.city, r.state].filter(Boolean).join(", ") || "—"}</td>

                      <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{r.owner || "—"}</td>

                      <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: r.phone1 ? "#16a34a" : "#94a3b8" }}>

                        {r.phone1 ? <a href={`tel:${r.phone1}`} style={{ color: "#16a34a", textDecoration: "none" }}>{r.phone1}</a> : "—"}

                      </td>

                      <td style={{ padding: "10px 14px", fontSize: 13, color: "#64748b" }}>{r.phone2 || "—"}</td>

                      <td style={{ padding: "10px 14px", fontSize: 13, color: "#64748b" }}>{r.phone3 || "—"}</td>

                      <td style={{ padding: "10px 14px", fontSize: 13, color: "#2563eb" }}>

                        {r.email ? <a href={`mailto:${r.email}`} style={{ color: "#2563eb", textDecoration: "none" }}>{r.email}</a> : "—"}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {displayRows.length === 0 && (

              <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>No results to display</div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}
