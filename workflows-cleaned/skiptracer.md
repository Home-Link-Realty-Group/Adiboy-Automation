# skiptracer

Source: skiptracer.docx

import { useState, useRef } from "react";

import { Lead } from "@/api/entities";

import { Search } from "lucide-react";

import SaaSLayout from "@/components/saas/SaaSLayout";

// ─────────────────────────────────────────────────────────────────────────────

// HOME-LINK REALTY GROUP — SKIP TRACER

// REsimpli-style skip tracing center

// Paste addresses or upload CSV → Apify runs skip trace → phone + email returned

// Push results directly to CRM or export CSV

// ─────────────────────────────────────────────────────────────────────────────

const C = {

  dark: "#0B1F45", red: "#D4A843", green: "#16a34a", blue: "#2563eb",

  purple: "#7c3aed", gold: "#d97706", teal: "#0d9488", gray: "#f8fafc",

  border: "#e2e8f0", text: "#1e293b", muted: "#64748b"

};

const APIFY_SKIP_URL = "https://the-replicator-bfa0beaa.base44.app/functions/apifySkipTrace";

// ── Parse CSV ─────────────────────────────────────────────────────────────────

function parseCSV(text) {

  const lines = text.trim().split("\n");

  if (lines.length < 2) return { headers: [], rows: [] };

  const headers = lines[0].split(",").map(h => h.replace(/"/g, "").trim().toLowerCase());

  const rows = lines.slice(1).map(line => {

    const vals = line.split(",");

    const row = {};

    headers.forEach((h, i) => { row[h] = (vals[i] || "").replace(/"/g, "").trim(); });

    return row;

  }).filter(r => Object.values(r).some(v => v));

  return { headers, rows };

}

function extractAddress(row) {

  return row["property address"] || row["address"] || row["street address"] ||

    row["situs address"] || row["prop address"] || row["addr"] || "";

}

function extractOwner(row) {

  return row["owner name"] || row["owner"] || row["name"] || row["full name"] ||

    [row["first name"] || "", row["last name"] || ""].join(" ").trim() || "";

}

function extractCity(row) { return row["city"] || row["prop city"] || ""; }

function extractState(row) { return row["state"] || row["st"] || ""; }

function extractZip(row) { return row["zip"] || row["zip code"] || row["zipcode"] || row["postal code"] || ""; }

// ── Export CSV ────────────────────────────────────────────────────────────────

function exportCSV(rows) {

  const headers = ["address","city","state","zip","owner","phone","phone2","email","source"];

  const lines = [headers.join(","), ...rows.map(r => headers.map(h => `"${(r[h]||"").replace(/"/g,'""')}"`).join(","))];

  const blob = new Blob([lines.join("\n")], { type: "text/csv" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a"); a.href = url; a.download = "skip_trace_results.csv"; a.click();

}

// ─────────────────────────────────────────────────────────────────────────────

export default function SkipTracer() {

  const [mode, setMode] = useState("paste"); // paste | upload

  const [pasteText, setPasteText] = useState("");

  const [csvRows, setCsvRows] = useState([]);

  const [fileName, setFileName] = useState("");

  const [inputLeads, setInputLeads] = useState([]); // parsed input before trace

  const [results, setResults] = useState([]);

  const [running, setRunning] = useState(false);

  const [progress, setProgress] = useState(0);

  const [statusMsg, setStatusMsg] = useState("");

  const [imported, setImported] = useState(false);

  const [importCount, setImportCount] = useState(0);

  const [activeTab, setActiveTab] = useState("input"); // input | results

  const fileRef = useRef();

  // ── Parse pasted addresses ────────────────────────────────────────────────

  const parsePaste = () => {

    const lines = pasteText.trim().split("\n").filter(l => l.trim());

    const leads = lines.map((line, i) => ({

      id: i,

      address: line.trim(),

      city: "", state: "", zip: "", owner: "",

    }));

    setInputLeads(leads);

    return leads;

  };

  // ── Handle CSV file ───────────────────────────────────────────────────────

  const handleFile = (file) => {

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {

      const { rows } = parseCSV(e.target.result);

      const leads = rows.map((row, i) => ({

        id: i,

        address: extractAddress(row),

        city: extractCity(row),

        state: extractState(row),

        zip: extractZip(row),

        owner: extractOwner(row),

        rawRow: row,

      })).filter(l => l.address);

      setCsvRows(rows);

      setInputLeads(leads);

    };

    reader.readAsText(file);

  };

  // ── Run skip trace via Apify ──────────────────────────────────────────────

  const runSkipTrace = async () => {

    const leads = mode === "paste" ? parsePaste() : inputLeads;

    if (!leads.length) return;

    setRunning(true);

    setProgress(0);

    setResults([]);

    setActiveTab("results");

    setStatusMsg("Starting skip trace...");

    const batchSize = 10;

    const allResults = [];

    for (let i = 0; i < leads.length; i += batchSize) {

      const batch = leads.slice(i, i + batchSize);

      setProgress(Math.round((i / leads.length) * 100));

      setStatusMsg(`Processing ${i + 1}–${Math.min(i + batchSize, leads.length)} of ${leads.length}...`);

      // Build Apify input — using whitepages-style address lookup

      const input = {

        addresses: batch.map(l => ({

          address: [l.address, l.city, l.state, l.zip].filter(Boolean).join(", "),

          owner: l.owner || undefined,

        })),

        maxResults: 3, // up to 3 phone numbers per address

      };

      try {

        // Run via Home-Link backend (Apify token secured server-side)

        const tracePromises = batch.map(lead =>

          fetch(APIFY_SKIP_URL, {

            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({

              name: lead.owner || "",

              address: lead.address || "",

              city: lead.city || "",

              state: lead.state || "",

              zip: lead.zip || "",

            }),

          }).then(r => r.json()).catch(() => ({ ok: false, results: [] }))

        );

        const traceResults = await Promise.all(tracePromises);

        batch.forEach((lead, bi) => {

          const tr = traceResults[bi] || {};

          const first = tr.results?.[0] || {};

          const phones = first.phones || [];

          const emails = first.emails || [];

          allResults.push({

            ...lead,

            phone:  phones[0] || "",

            phone2: phones[1] || "",

            phone3: phones[2] || "",

            email:  emails[0] || "",

            email2: emails[1] || "",

            status: phones[0] ? "found" : (tr.fallback_links ? "needs_trace" : "not_found"),

            fallback_links: tr.fallback_links || [],

            raw: first,

          });

        });

      } catch (err) {

        batch.forEach(lead => {

          allResults.push({

            ...lead,

            phone: "", phone2: "", phone3: "", email: "", email2: "",

            status: "needs_trace",

            error: err.message,

          });

        });

      }

      setResults([...allResults]);

    }

    setProgress(100);

    setStatusMsg(`Done — ${allResults.filter(r => r.phone).length} of ${allResults.length} records found phone numbers`);

    setRunning(false);

  };

  // ── Push to CRM ───────────────────────────────────────────────────────────

  const pushToCRM = async () => {

    const withPhone = results.filter(r => r.phone);

    if (!withPhone.length) return;

    let created = 0;

    try {

      const existing = await Lead.list();

      const existingAddrs = new Set(existing.map(l => (l.address || "").toLowerCase().trim()));

      for (const r of withPhone) {

        const key = r.address.toLowerCase().trim();

        if (existingAddrs.has(key)) continue;

        await Lead.create({

          name: r.owner || "Unknown Owner",

          phone: r.phone,

          email: r.email || "",

          address: r.address,

          city: r.city,

          state: r.state,

          zip: r.zip,

          source: "Skip Trace",

          status: "New",

          priority: "MEDIUM",

          notes: `Skip traced. Phone 2: ${r.phone2 || "N/A"} | Email 2: ${r.email2 || "N/A"}`,

          touch_count: 0,

        });

        created++;

        existingAddrs.add(key);

      }

    } catch (e) { console.error(e); }

    setImportCount(created);

    setImported(true);

  };

  const found = results.filter(r => r.status === "found");

  const notFound = results.filter(r => r.status !== "found");

  const matchRate = results.length > 0 ? Math.round((found.length / results.length) * 100) : 0;

  // ─────────────────────────────────────────────────────────────────────────

  return (

    <SaaSLayout

      title="Skip Tracer"

      subtitle="Find phone numbers & emails from property addresses"

      icon={Search}

      accent="#0891b2"

      headerRight={

        <div style={{ display: "flex", gap: 8 }}>

          <a href="/ListStacker" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "6px 12px", borderRadius: 6, textDecoration: "none", fontSize: 12, fontWeight: 700 }}>List Stacker</a>

        </div>

      }

    >

    <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(11,31,69,0.06)" }}>

      {/* Tabs */}

      <div style={{ background: "#fff", borderBottom: `1px solid ${C.border}`, display: "flex", padding: "0 24px" }}>

        {[

          { id: "input",   label: "📋 Input" },

          { id: "results", label: `📞 Results${results.length ? ` (${results.length})` : ""}` },

        ].map(t => (

          <button key={t.id} onClick={() => setActiveTab(t.id)}

            style={{ padding: "14px 20px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 600,

              borderBottom: activeTab === t.id ? `3px solid ${C.red}` : "3px solid transparent",

              color: activeTab === t.id ? C.red : C.muted }}>

            {t.label}

          </button>

        ))}

      </div>

      <div style={{ padding: "24px" }}>

        {/* ── INPUT TAB ── */}

        {activeTab === "input" && (

          <div>

            {/* Stats row */}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>

              {[

                { label: "Addresses Loaded", value: inputLeads.length, icon: "📋", color: C.blue },

                { label: "Results Found", value: found.length, icon: "✅", color: C.green },

                { label: "Match Rate", value: results.length ? matchRate + "%" : "—", icon: "📊", color: C.gold },

                { label: "Pushed to CRM", value: importCount, icon: "🚀", color: C.purple },

              ].map(s => (

                <div key={s.label} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, textAlign: "center" }}>

                  <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>

                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>

                  <div style={{ fontSize: 12, color: C.muted }}>{s.label}</div>

                </div>

              ))}

            </div>

            {/* Mode toggle */}

            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>

              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>

                {[

                  { id: "paste",  label: "✏️ Paste Addresses" },

                  { id: "upload", label: "📁 Upload CSV" },

                ].map(m => (

                  <button key={m.id} onClick={() => setMode(m.id)}

                    style={{ padding: "10px 20px", border: `2px solid ${mode === m.id ? C.blue : C.border}`, borderRadius: 8, background: mode === m.id ? "#eff6ff" : "#fff", color: mode === m.id ? C.blue : C.muted, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>

                    {m.label}

                  </button>

                ))}

              </div>

              {mode === "paste" ? (

                <div>

                  <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, display: "block", marginBottom: 8 }}>

                    PASTE PROPERTY ADDRESSES — ONE PER LINE

                  </label>

                  <textarea

                    value={pasteText}

                    onChange={e => setPasteText(e.target.value)}

                    placeholder={"1234 Main St Dallas TX 75201\n5678 Oak Ave Chicago IL 60601\n910 Maple Dr Atlanta GA 30301"}

                    rows={10}

                    style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: "monospace", resize: "vertical", boxSizing: "border-box" }}

                  />

                  <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>

                    {pasteText.trim().split("\n").filter(l => l.trim()).length} addresses detected

                  </div>

                </div>

              ) : (

                <div>

                  <input type="file" accept=".csv,.txt" ref={fileRef} onChange={e => handleFile(e.target.files[0])} style={{ display: "none" }} />

                  <div onClick={() => fileRef.current?.click()}

                    style={{ border: `2px dashed ${fileName ? C.green : C.border}`, borderRadius: 10, padding: 40, textAlign: "center", cursor: "pointer", background: fileName ? "#f0fdf4" : C.gray }}>

                    {fileName ? (

                      <>

                        <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>

                        <div style={{ fontWeight: 700, color: C.green }}>{fileName}</div>

                        <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>{inputLeads.length} addresses detected</div>

                      </>

                    ) : (

                      <>

                        <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>

                        <div style={{ fontWeight: 700, color: C.muted }}>Click to upload CSV</div>

                        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Needs an address column — any CSV format works</div>

                      </>

                    )}

                  </div>

                  {inputLeads.length > 0 && (

                    <div style={{ marginTop: 12, background: C.gray, borderRadius: 8, padding: 12, maxHeight: 160, overflow: "auto" }}>

                      {inputLeads.slice(0, 10).map((l, i) => (

                        <div key={i} style={{ fontSize: 12, color: C.text, padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>

                          {l.address}{l.city ? `, ${l.city}` : ""}{l.state ? `, ${l.state}` : ""}{l.zip ? ` ${l.zip}` : ""}

                        </div>

                      ))}

                      {inputLeads.length > 10 && <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>...and {inputLeads.length - 10} more</div>}

                    </div>

                  )}

                </div>

              )}

            </div>

            {/* Run button */}

            <button

              onClick={runSkipTrace}

              disabled={running || (!pasteText.trim() && !inputLeads.length)}

              style={{ width: "100%", padding: "16px", background: running ? "#94a3b8" : C.red, color: "#fff", border: "none", borderRadius: 10, cursor: running ? "not-allowed" : "pointer", fontSize: 16, fontWeight: 800, letterSpacing: -0.3 }}>

              {running ? `⏳ ${statusMsg}` : `🔍 Run Skip Trace — ${mode === "paste" ? pasteText.trim().split("\n").filter(l=>l.trim()).length : inputLeads.length} Addresses`}

            </button>

            {/* Progress */}

            {running && (

              <div style={{ marginTop: 16 }}>

                <div style={{ background: C.border, borderRadius: 6, height: 8, overflow: "hidden" }}>

                  <div style={{ width: `${progress}%`, height: "100%", background: C.blue, borderRadius: 6, transition: "width 0.3s ease" }} />

                </div>

                <div style={{ fontSize: 12, color: C.muted, marginTop: 6, textAlign: "center" }}>{progress}% complete — {statusMsg}</div>

              </div>

            )}

            {/* Free alternatives info box */}

            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginTop: 24 }}>

              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>💡 Free Skip Trace Sources (if Apify credits run out)</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

                {[

                  { name: "TruePeopleSearch", url: "https://www.truepeoplesearch.com", tag: "FREE", desc: "Address → owner name, phone, relatives. No login required." },

                  { name: "FastPeopleSearch", url: "https://www.fastpeoplesearch.com", tag: "FREE", desc: "Phone numbers by address or name. Updated frequently." },

                  { name: "PropWire Skip Trace", url: "https://propwire.com/investors", tag: "FREE", desc: "Built-in skip trace on all exported records. 200/month free." },

                  { name: "BatchSkipTracing", url: "https://batchskiptracing.com", tag: "$0.18/rec", desc: "Highest match rate. Best for bulk — 90%+ phone match." },

                ].map(s => (

                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer"

                    style={{ textDecoration: "none", background: C.gray, borderRadius: 10, padding: 14, display: "block" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>

                      <span style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{s.name}</span>

                      <span style={{ background: s.tag === "FREE" ? "#dcfce7" : "#fef3c7", color: s.tag === "FREE" ? "#166534" : "#92400e", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>{s.tag}</span>

                    </div>

                    <div style={{ fontSize: 12, color: C.muted }}>{s.desc}</div>

                  </a>

                ))}

              </div>

            </div>

          </div>

        )}

        {/* ── RESULTS TAB ── */}

        {activeTab === "results" && (

          <div>

            {results.length === 0 && !running ? (

              <div style={{ textAlign: "center", padding: 80, color: C.muted }}>

                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>

                <div style={{ fontSize: 18, fontWeight: 700 }}>No results yet</div>

                <div style={{ fontSize: 14, marginTop: 8 }}>Go to the Input tab and run a skip trace</div>

              </div>

            ) : (

              <>

                {/* Stats */}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>

                  {[

                    { label: "Total Traced", value: results.length, color: C.blue },

                    { label: "Phone Found", value: found.length, color: C.green },

                    { label: "Match Rate", value: matchRate + "%", color: matchRate >= 60 ? C.green : matchRate >= 30 ? C.gold : C.red },

                    { label: "Email Found", value: results.filter(r=>r.email).length, color: C.teal },

                  ].map(s => (

                    <div key={s.label} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, textAlign: "center" }}>

                      <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>

                      <div style={{ fontSize: 12, color: C.muted }}>{s.label}</div>

                    </div>

                  ))}

                </div>

                {/* Action bar */}

                <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>

                  <span style={{ fontSize: 13, color: C.muted }}>{found.length} records with phone numbers ready</span>

                  <button onClick={pushToCRM} disabled={imported || found.length === 0}

                    style={{ marginLeft: "auto", padding: "10px 22px", background: imported ? "#94a3b8" : C.green, color: "#fff", border: "none", borderRadius: 8, cursor: imported ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 14 }}>

                    {imported ? `✅ ${importCount} Pushed to CRM` : `🚀 Push ${found.length} to CRM`}

                  </button>

                  <button onClick={() => exportCSV(results)}

                    style={{ padding: "10px 18px", background: C.blue, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>

                    ⬇ Export CSV

                  </button>

                </div>

                {imported && (

                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: 14, marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>

                    <span style={{ fontSize: 20 }}>✅</span>

                    <div>

                      <div style={{ fontWeight: 700, color: "#166534" }}>{importCount} leads pushed to CRM</div>

                      <div style={{ fontSize: 13, color: "#15803d" }}>Duplicates automatically skipped</div>

                    </div>

                    <a href="/CRM" style={{ marginLeft: "auto", background: C.green, color: "#fff", padding: "8px 18px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 13 }}>Open CRM →</a>

                  </div>

                )}

                {/* Results table */}

                <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>

                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>

                    <thead>

                      <tr style={{ background: C.dark, color: "#94a3b8", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>

                        <th style={{ padding: "10px 16px", textAlign: "left" }}>Status</th>

                        <th style={{ padding: "10px 16px", textAlign: "left" }}>Address</th>

                        <th style={{ padding: "10px 16px", textAlign: "left" }}>Owner</th>

                        <th style={{ padding: "10px 16px", textAlign: "left" }}>Phone 1</th>

                        <th style={{ padding: "10px 16px", textAlign: "left" }}>Phone 2</th>

                        <th style={{ padding: "10px 16px", textAlign: "left" }}>Email</th>

                      </tr>

                    </thead>

                    <tbody>

                      {results.map((r, i) => (

                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: r.status === "found" ? "#f0fdf4" : i % 2 === 0 ? "#fff" : C.gray }}>

                          <td style={{ padding: "10px 16px" }}>

                            <span style={{

                              background: r.status === "found" ? "#dcfce7" : r.status === "needs_trace" ? "#fef9c3" : "#fee2e2",

                              color: r.status === "found" ? "#16a34a" : r.status === "needs_trace" ? "#92400e" : "#dc2626",

                              border: "none", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700

                            }}>

                              {r.status === "found" ? "✅ Found" : r.status === "needs_trace" ? "⚠️ Manual" : "❌ Not Found"}

                            </span>

                          </td>

                          <td style={{ padding: "10px 16px" }}>

                            <div style={{ fontWeight: 600 }}>{r.address}</div>

                            <div style={{ fontSize: 11, color: C.muted }}>{[r.city, r.state, r.zip].filter(Boolean).join(", ")}</div>

                          </td>

                          <td style={{ padding: "10px 16px", color: C.text }}>{r.owner || <span style={{ color: "#cbd5e1" }}>—</span>}</td>

                          <td style={{ padding: "10px 16px" }}>

                            {r.phone ? <a href={`tel:${r.phone}`} style={{ color: C.blue, fontWeight: 700, textDecoration: "none" }}>{r.phone}</a> : <span style={{ color: "#cbd5e1" }}>—</span>}

                          </td>

                          <td style={{ padding: "10px 16px" }}>

                            {r.phone2 ? <a href={`tel:${r.phone2}`} style={{ color: C.blue, textDecoration: "none" }}>{r.phone2}</a> : <span style={{ color: "#cbd5e1" }}>—</span>}

                          </td>

                          <td style={{ padding: "10px 16px", color: C.text }}>

                            {r.email ? <a href={`mailto:${r.email}`} style={{ color: C.teal, textDecoration: "none" }}>{r.email}</a> : <span style={{ color: "#cbd5e1" }}>—</span>}

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </>

            )}

          </div>

        )}

      </div>

    </div>

    </SaaSLayout>

  );

}
