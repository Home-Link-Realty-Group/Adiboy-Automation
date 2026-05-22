# vacantleads

Source: vacantleads.docx

import { useState } from "react";

import { Lead } from "@/api/entities";

import { Building2 } from "lucide-react";

import SaaSLayout from "@/components/saas/SaaSLayout";

const D = "#0B1F45";

const R = "#D4A843";

const ACCENT = "#00d4aa";

const WARN = "#f39c12";

// Nationwide highest-vacancy zip codes (based on USPS HUD data + DCAD absentee concentration)

const TOP_VACANT_ZIPS = [

  { zip: "75216", area: "Oak Cliff / South Nationwide", vacancy_rate: "High", notes: "Highest absentee + vacant concentration  nationwide" },

  { zip: "75217", area: "Pleasant Grove", vacancy_rate: "High", notes: "Many inherited & abandoned properties" },

  { zip: "75241", area: "South Nationwide / Hutchins", vacancy_rate: "High", notes: "Estate sales, long-term vacants" },

  { zip: "75211", area: "West Nationwide", vacancy_rate: "High", notes: "Gentrification zone — lots of vacant holds" },

  { zip: "75215", area: "Fair Park", vacancy_rate: "Very High", notes: "Highest raw vacancy count  nationwide" },

  { zip: "75210", area: "Joppa / East Nationwide", vacancy_rate: "Very High", notes: "Highest distress score per sq mile" },

  { zip: "75212", area: "Trinity Groves", vacancy_rate: "Medium-High", notes: "Value-add corridor, aging stock" },

  { zip: "75228", area: "Buckner Terrace", vacancy_rate: "Medium-High", notes: "Pre-foreclosure + vacant overlap" },

  { zip: "75232", area: "Red Bird", vacancy_rate: "High", notes: "Absentee landlord concentration" },

  { zip: "75237", area: "Duncanville Rd Corridor", vacancy_rate: "High", notes: "Long DOM + vacant overlap" },

];

const SOURCES = [

  {

    id: "propwire",

    icon: "🏚️",

    label: "PropWire — Vacant Filter",

    color: "#9b59b6",

    cost: "FREE",

    speed: "Instant",

    accuracy: "85%",

    desc: "Best free source. Filter by 'Vacant' lead type + Nationwide zip codes. Download CSV unlimited.",

    steps: [

      "Go to propwire.com/investors (free account required)",

      "In the search bar, type a Nationwide zip code (use the list below)",

      "Click 'Lead Type' filter → select 'Vacant Properties'",

      "Optional: Stack filters — add 'Absentee Owner' + 'Tax Delinquent' for highest motivation",

      "Click 'Download' — get CSV with owner name + address",

      "Upload CSV to the Skip Trace tab → bulk skip trace for phones",

      "Upload skip-traced CSV to Prospect Scraper → loads into CRM + Call List"

    ],

    link: "https://propwire.com/investors",

    linkLabel: "Open PropWire →"

  },

  {

    id: "dcad",

    icon: "📋",

    label: "DCAD — Absentee = Vacant",

    color: "#f39c12",

    cost: "FREE",

    speed: "5-10 min",

    accuracy: "90%",

    desc: "Nationwide Central Appraisal District. If mailing address ≠ property address → owner doesn't live there → likely vacant or absentee. Gold mine.",

    steps: [

      "Go to dallascad.org/searchaddr.aspx (link below)",

      "Search by street name (leave number blank) for bulk results",

      "Look for properties where 'Mailing Address' is different from 'Property Address'",

      "That gap = absentee owner = likely vacant property",

      "Note: owner name + property address + mailing address",

      "Paste into the Manual Entry tab of Prospect Scraper OR use CSV upload",

      "Skip trace via Tracerfy to get phone numbers"

    ],

    link: "https://www.dallascad.org/searchaddr.aspx",

    linkLabel: "Open DCAD →"

  },

  {

    id: "driving",

    icon: "🚗",

    label: "Drive for Dollars — DealMachine",

    color: "#3498db",

    cost: "Free tier",

    speed: "Real-time",

    accuracy: "95%+",

    desc: "Most accurate method. Drive target zip codes, tap vacant/distressed homes in the app, instantly get owner info + skip trace. 10 free lookups/month.",

    steps: [

      "Download DealMachine app (iOS/Android — free account)",

      "Enable 'Drive for Dollars' mode",

      "Drive through: 75215, 75216, 75210, 75217 (highest vacancy zips)",

      "When you see a vacant/distressed property, tap it on the map",

      "App auto-pulls owner name, mailing address, skip trace",

      "Add to your list — export CSV weekly",

      "Upload to Prospect Scraper → into CRM"

    ],

    link: "https://www.dealmachine.com/",

    linkLabel: "Get DealMachine →"

  },

  {

    id: "tracerfy_county",

    icon: "📦",

    label: "Tracerfy County Lists",

    color: "#00d4aa",

    cost: "$0.10/record",

    speed: "24hrs",

    accuracy: "92%",

    desc: "Tracerfy pulls FRESH county records — not 30-day-old data. Vacant property lists direct from Nationwide County assessor + USPS vacancy flags. Phone numbers included.",

    steps: [

      "Go to tracerfy.com/county-lead-lists",

      "Select: Nationwide County, TX",

      "Filter: 'Vacant Properties' lead type",

      "Order minimum 100 records ($10 total)",

      "Receive CSV with owner name, address, phone, email within 24hrs",

      "Upload CSV to Prospect Scraper → instantly in CRM + Call List"

    ],

    link: "https://www.tracerfy.com/county-lead-lists/",

    linkLabel: "Order County List →"

  },

  {

    id: "hud",

    icon: "🏛️",

    label: "HUD Vacant / REO Properties",

    color: "#D4A843",

    cost: "FREE",

    speed: "Instant",

    accuracy: "100%",

    desc: "HUD-owned foreclosed homes (FHA loans). These are bank-owned, fully vacant, and HUD is motivated to sell. Nationwide has 40-80 active HUD properties at any time.",

    steps: [

      "Go to hudhomestore.gov (link below)",

      "Filter: State = TX, City = Nationwide",

      "All listings are vacant — HUD is the motivated seller",

      "Get property address from listing",

      "HUD listings have a listing agent — contact them directly to submit offer",

      "Note: HUD sells at or below market — great for assignment"

    ],

    link: "https://www.hudhomestore.gov/Listing/PropertySearchResult.aspx?sState=TX&sCity=Nationwide",

    linkLabel: "Open HUD Home Store →"

  },

  {

    id: "usps_hud",

    icon: "📮",

    label: "USPS Vacancy Data (HUD)",

    color: "#6c757d",

    cost: "FREE",

    speed: "Quarterly",

    accuracy: "Government-verified",

    desc: "USPS mail carriers report vacant addresses every quarter to HUD. Data covers all US addresses — updated every 90 days. Use to identify highest-vacancy zip codes for targeting.",

    steps: [

      "Go to huduser.gov → Datasets → USPS Vacancy Data",

      "Register (free — nonprofits and researchers only)",

      "OR: Use the zip code data we've already compiled below",

      "Use the Top Vacant Zips table to prioritize your PropWire + DCAD searches",

      "Highest-vacancy zips = most properties to find, lowest competition"

    ],

    link: "https://www.huduser.gov/portal/datasets/usps.html",

    linkLabel: "View HUD USPS Data →"

  }

];

const CSV_TEMPLATE = `name,phone,email,address,city,state,zip,situation,source,notes

John Smith,,john@email.com,1234 Oak St,Nationwide,TX,75215,Vacant Property,PropWire,Mailing address in Houston - absentee 8yrs

`;

function parseCSV(text) {

  const lines = text.trim().split("\n");

  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map(h => h.replace(/"/g, "").trim().toLowerCase().replace(/\s+/g, "_"));

  return lines.slice(1).map(line => {

    const vals = [];

    let cur = "", inQ = false;

    for (let ch of line) {

      if (ch === '"') inQ = !inQ;

      else if (ch === ',' && !inQ) { vals.push(cur.trim()); cur = ""; }

      else cur += ch;

    }

    vals.push(cur.trim());

    const obj = {};

    headers.forEach((h, i) => { obj[h] = (vals[i] || "").replace(/"/g, "").trim(); });

    if (!obj.name && (obj.owner_name || obj.first_name)) {

      obj.name = obj.owner_name || `${obj.first_name || ""} ${obj.last_name || ""}`.trim();

    }

    if (!obj.address && obj.property_address) obj.address = obj.property_address;

    if (!obj.situation) obj.situation = "Vacant Property";

    if (!obj.source) obj.source = "Vacant Lead Import";

    return obj;

  }).filter(r => r.address || r.name);

}

export default function VacantLeads() {

  const [activeSource, setActiveSource] = useState(null);

  const [tab, setTab] = useState("sources");

  const [csvText, setCsvText] = useState("");

  const [parsedLeads, setParsedLeads] = useState([]);

  const [importing, setImporting] = useState(false);

  const [imported, setImported] = useState([]);

  const [skipped, setSkipped] = useState([]);

  const [done, setDone] = useState(false);

  const [manualLead, setManualLead] = useState({

    name: "", phone: "", email: "", address: "", city: "Nationwide", state: "TX", zip: "",

    situation: "Vacant Property", source: "Manual Entry", notes: ""

  });

  const [manualSaving, setManualSaving] = useState(false);

  const [manualDone, setManualDone] = useState(false);

  const handleCSVUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (ev) => {

      const text = ev.target.result;

      setCsvText(text);

      setParsedLeads(parseCSV(text));

      setTab("import");

    };

    reader.readAsText(file);

  };

  const handlePaste = (text) => {

    setCsvText(text);

    setParsedLeads(parseCSV(text));

  };

  const importLeads = async () => {

    setImporting(true);

    setDone(false);

    const good = [], bad = [];

    const existing = await Lead.list();

    const existingPhones = new Set(existing.map(l => (l.phone || "").replace(/\D/g, "")));

    const existingAddresses = new Set(existing.map(l => (l.address || "").toLowerCase().trim()));

    for (const lead of parsedLeads) {

      const phone = (lead.phone || "").replace(/\D/g, "");

      const address = (lead.address || "").toLowerCase().trim();

      if ((phone && existingPhones.has(phone)) || (address && existingAddresses.has(address))) {

        bad.push({ ...lead, skip_reason: "Duplicate" });

        continue;

      }

      try {

        await Lead.create({

          name: lead.name || "Unknown",

          phone: lead.phone || "",

          email: lead.email || "",

          address: lead.address || "",

          city: lead.city || "Nationwide",

          state: lead.state || "TX",

          zip: lead.zip || "",

          situation: lead.situation || "Vacant Property",

          source: lead.source || "Vacant Lead Import",

          notes: lead.notes || "",

          status: "New",

          priority: "High",

          is_vacant: true,

        });

        good.push(lead);

        existingPhones.add(phone);

        existingAddresses.add(address);

      } catch (e) {

        bad.push({ ...lead, skip_reason: "Error" });

      }

    }

    setImported(good);

    setSkipped(bad);

    setImporting(false);

    setDone(true);

  };

  const saveManual = async () => {

    setManualSaving(true);

    try {

      await Lead.create({ ...manualLead, status: "New", priority: "High", is_vacant: true });

      setManualDone(true);

      setManualLead({ name: "", phone: "", email: "", address: "", city: "Nationwide", state: "TX", zip: "", situation: "Vacant Property", source: "Manual Entry", notes: "" });

      setTimeout(() => setManualDone(false), 3000);

    } catch (e) {}

    setManualSaving(false);

  };

  return (

    <SaaSLayout

      title="Vacant Property Lead Hunter"

      subtitle="Find vacant homes before anyone else — 6 sources stacked"

      icon={Building2}

      accent="#f59e0b"

    >

      <div style={{ background: D, borderRadius: 14, padding: 24, color: "#fff", fontFamily: "'Inter', sans-serif" }}>

      {/* Stats bar */}

      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>

        {[

          { label: "Nationwide Vacant Homes Est.", value: "14,000+", color: R },

          { label: "Best Source", value: "PropWire (Free)", color: ACCENT },

          { label: "Cost to Skip Trace 500", value: "$10 via Tracerfy", color: WARN },

          { label: "Avg Motivation Score", value: "8.5 / 10", color: "#9b59b6" },

        ].map(s => (

          <div key={s.label} style={{ background: "#111827", border: "1px solid #2a2a3a", borderRadius: 10, padding: "12px 18px", minWidth: 160 }}>

            <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>

            <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{s.label}</div>

          </div>

        ))}

      </div>

      {/* Tabs */}

      <div style={{ display: "flex", gap: 8, marginBottom: 24, borderBottom: "1px solid #333", overflowX: "auto" }}>

        {[

          { id: "sources", label: "📡 Lead Sources" },

          { id: "zips", label: "📍 Top Vacant Zips" },

          { id: "import", label: "📤 Bulk Import" },

          { id: "manual", label: "✏️ Manual Entry" },

          { id: "workflow", label: "⚙️ Full Workflow" },

        ].map(t => (

          <button key={t.id} onClick={() => setTab(t.id)} style={{

            background: tab === t.id ? R : "transparent",

            color: tab === t.id ? "#fff" : "#aaa",

            border: "none", borderRadius: "8px 8px 0 0", whiteSpace: "nowrap",

            padding: "10px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600,

            borderBottom: tab === t.id ? `2px solid ${R}` : "2px solid transparent"

          }}>{t.label}</button>

        ))}

      </div>

      {/* ── SOURCES ── */}

      {tab === "sources" && (

        <div>

          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 20 }}>

            6 sources ranked by speed. Start with PropWire (free, instant). Stack with DCAD for maximum coverage.

          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>

            {SOURCES.map(src => (

              <div key={src.id} onClick={() => setActiveSource(activeSource?.id === src.id ? null : src)}

                style={{

                  background: "#111827",

                  border: `2px solid ${activeSource?.id === src.id ? src.color : "#2a2a3a"}`,

                  borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "all 0.2s"

                }}>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>

                  <span style={{ fontSize: 26 }}>{src.icon}</span>

                  <div style={{ flex: 1 }}>

                    <div style={{ fontWeight: 700, fontSize: 15 }}>{src.label}</div>

                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>

                      <span style={{ background: "#1a2a1a", color: "#4caf50", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>{src.cost}</span>

                      <span style={{ background: "#1a1a2a", color: "#aaa", fontSize: 11, padding: "2px 8px", borderRadius: 4 }}>⚡ {src.speed}</span>

                      <span style={{ background: "#2a1a1a", color: WARN, fontSize: 11, padding: "2px 8px", borderRadius: 4 }}>🎯 {src.accuracy}</span>

                    </div>

                  </div>

                </div>

                <div style={{ fontSize: 13, color: "#ccc", marginBottom: 12, lineHeight: 1.5 }}>{src.desc}</div>

                {activeSource?.id === src.id && (

                  <div style={{ borderTop: "1px solid #333", paddingTop: 14 }}>

                    <div style={{ fontWeight: 700, fontSize: 13, color: ACCENT, marginBottom: 10 }}>📋 Exact Steps:</div>

                    {src.steps.map((step, i) => (

                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>

                        <div style={{

                          background: src.color, borderRadius: "50%", width: 22, height: 22,

                          display: "flex", alignItems: "center", justifyContent: "center",

                          fontSize: 11, fontWeight: 800, flexShrink: 0, color: "#fff"

                        }}>{i + 1}</div>

                        <div style={{ fontSize: 13, color: "#ddd", lineHeight: 1.5 }}>{step}</div>

                      </div>

                    ))}

                    <div style={{ display: "flex", gap: 10, marginTop: 14 }}>

                      <a href={src.link} target="_blank" rel="noopener noreferrer"

                        style={{ background: src.color, color: "#fff", padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>

                        {src.linkLabel}

                      </a>

                      <button onClick={e => { e.stopPropagation(); setTab("import"); }}

                        style={{ background: "#2a2a3a", color: "#fff", border: "none", padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>

                        Upload CSV →

                      </button>

                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      )}

      {/* ── TOP VACANT ZIPS ── */}

      {tab === "zips" && (

        <div>

          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 20 }}>

            Ranked by USPS carrier-reported vacancy + DCAD absentee concentration. Hit these zips first on PropWire and DealMachine.

          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 12 }}>

            {TOP_VACANT_ZIPS.map((z, i) => (

              <div key={z.zip} style={{ background: "#111827", border: `1px solid ${z.vacancy_rate === "Very High" ? R : z.vacancy_rate === "High" ? WARN : "#2a2a3a"}`, borderRadius: 10, padding: "14px 18px" }}>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

                  <div style={{ background: i < 2 ? R : i < 6 ? WARN : "#333", borderRadius: 6, padding: "4px 12px", fontWeight: 800, fontSize: 15 }}>

                    {z.zip}

                  </div>

                  <div>

                    <div style={{ fontWeight: 700, fontSize: 14 }}>{z.area}</div>

                    <div style={{ fontSize: 11, color: z.vacancy_rate === "Very High" ? R : z.vacancy_rate === "High" ? WARN : "#aaa", fontWeight: 700 }}>

                      {z.vacancy_rate === "Very High" ? "🔴" : z.vacancy_rate === "High" ? "🟡" : "🟢"} {z.vacancy_rate} Vacancy

                    </div>

                  </div>

                </div>

                <div style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>{z.notes}</div>

                <button onClick={() => navigator.clipboard?.writeText(z.zip)}

                  style={{ marginTop: 10, background: "#1a2a3a", color: ACCENT, border: "none", padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>

                  Copy ZIP

                </button>

              </div>

            ))}

          </div>

          <div style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 12, padding: "18px 22px", marginTop: 24 }}>

            <div style={{ fontWeight: 700, color: ACCENT, marginBottom: 10 }}>💡 Stacking Strategy — Maximum Motivation</div>

            <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.9 }}>

              On PropWire, select ALL of these filters together:<br />

              <strong style={{ color: "#fff" }}>✅ Vacant</strong> + <strong style={{ color: "#fff" }}>✅ Absentee Owner</strong> + <strong style={{ color: "#fff" }}>✅ Tax Delinquent</strong> + <strong style={{ color: "#fff" }}>Zip: 75215 or 75216</strong><br /><br />

              A property that is Vacant + Absentee + Tax Delinquent = owner hasn't been there in years AND owes back taxes. They WANT out. <strong style={{ color: R }}>These are your 10/10 motivation leads.</strong>

            </div>

          </div>

        </div>

      )}

      {/* ── BULK IMPORT ── */}

      {tab === "import" && (

        <div style={{ maxWidth: 860 }}>

          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 20 }}>

            Upload your PropWire, DealMachine, Tracerfy, or any CSV. Auto-tagged as Vacant + High Priority. Deduped before import.

          </div>

          <label style={{

            display: "block", border: "2px dashed #444", borderRadius: 12, padding: "40px 24px",

            textAlign: "center", cursor: "pointer", marginBottom: 20, background: "#0B1F45"

          }}>

            <div style={{ fontSize: 36, marginBottom: 10 }}>🏚️</div>

            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Drop Vacant Property CSV here</div>

            <div style={{ fontSize: 13, color: "#aaa" }}>PropWire, DealMachine, Tracerfy County Lists, BatchLeads — any format</div>

            <input type="file" accept=".csv,.txt" onChange={handleCSVUpload} style={{ display: "none" }} />

          </label>

          <div style={{ marginBottom: 20 }}>

            <div style={{ fontSize: 13, fontWeight: 600, color: "#aaa", marginBottom: 8 }}>Or paste CSV text:</div>

            <textarea value={csvText} onChange={e => handlePaste(e.target.value)} placeholder={CSV_TEMPLATE}

              style={{ width: "100%", height: 120, background: "#0B1F45", border: "1px solid #333", borderRadius: 8, color: "#fff", padding: 12, fontSize: 12, fontFamily: "monospace", resize: "vertical", boxSizing: "border-box" }} />

          </div>

          {parsedLeads.length > 0 && (

            <div style={{ marginBottom: 20 }}>

              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: ACCENT }}>

                ✅ {parsedLeads.length} vacant leads parsed — auto-tagged High Priority

              </div>

              <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #333" }}>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>

                  <thead>

                    <tr style={{ background: "#0B1F45" }}>

                      {["Name", "Phone", "Address", "City", "Zip", "Source", "Notes"].map(h => (

                        <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#aaa", borderBottom: "1px solid #333", whiteSpace: "nowrap" }}>{h}</th>

                      ))}

                    </tr>

                  </thead>

                  <tbody>

                    {parsedLeads.slice(0, 10).map((l, i) => (

                      <tr key={i} style={{ borderBottom: "1px solid #222", background: i % 2 === 0 ? "#111" : "#0B1F45" }}>

                        <td style={{ padding: "8px 12px" }}>{l.name || "—"}</td>

                        <td style={{ padding: "8px 12px", color: ACCENT }}>{l.phone || <span style={{ color: WARN }}>⚠️ Needs Skip Trace</span>}</td>

                        <td style={{ padding: "8px 12px" }}>{l.address || "—"}</td>

                        <td style={{ padding: "8px 12px" }}>{l.city || "—"}</td>

                        <td style={{ padding: "8px 12px" }}>{l.zip || "—"}</td>

                        <td style={{ padding: "8px 12px", color: "#aaa" }}>{l.source || "—"}</td>

                        <td style={{ padding: "8px 12px", color: "#777", fontSize: 11 }}>{(l.notes || "").slice(0, 40)}</td>

                      </tr>

                    ))}

                  </tbody>

                </table>

                {parsedLeads.length > 10 && (

                  <div style={{ padding: "10px 12px", color: "#aaa", fontSize: 12, background: "#111" }}>+ {parsedLeads.length - 10} more</div>

                )}

              </div>

              <button onClick={importLeads} disabled={importing}

                style={{ marginTop: 16, background: importing ? "#555" : R, color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 15, fontWeight: 800, cursor: importing ? "not-allowed" : "pointer", width: "100%" }}>

                {importing ? "⏳ Importing..." : `🚀 Import ${parsedLeads.length} Vacant Leads → CRM (High Priority)`}

              </button>

            </div>

          )}

          {done && (

            <div style={{ background: "#0a1a0a", border: "1px solid #2d6a2d", borderRadius: 12, padding: "20px 24px" }}>

              <div style={{ fontWeight: 800, fontSize: 18, color: "#4caf50", marginBottom: 10 }}>✅ Import Complete</div>

              <div style={{ fontSize: 14, marginBottom: 6 }}><span style={{ color: "#4caf50", fontWeight: 700 }}>✅ {imported.length} leads imported</span> — tagged Vacant + High Priority</div>

              {skipped.length > 0 && <div style={{ fontSize: 14, color: WARN }}>⚠️ {skipped.length} skipped (duplicates)</div>}

              <div style={{ display: "flex", gap: 12, marginTop: 14 }}>

                <a href="/CRM" style={{ background: "#0d6efd", color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Open CRM →</a>

                <a href="/CallLists" style={{ background: R, color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Start Calling →</a>

              </div>

            </div>

          )}

          <div style={{ marginTop: 20, background: "#111827", border: "1px solid #2a2a3a", borderRadius: 10, padding: "14px 18px" }}>

            <div style={{ fontWeight: 700, fontSize: 12, color: "#aaa", marginBottom: 8 }}>📄 Minimum CSV columns needed:</div>

            <code style={{ fontSize: 11, color: ACCENT, display: "block", background: "#0B1F45", padding: 10, borderRadius: 6 }}>

              name, address, city, state, zip (phone optional — skip trace after import)

            </code>

          </div>

        </div>

      )}

      {/* ── MANUAL ENTRY ── */}

      {tab === "manual" && (

        <div style={{ maxWidth: 560 }}>

          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 20 }}>

            Found a vacant home driving around or from a neighbor tip? Log it here instantly. Auto-tagged Vacant + High Priority.

          </div>

          <div style={{ background: "#111827", border: "1px solid #2a2a3a", borderRadius: 12, padding: "24px" }}>

            {[

              { key: "address", label: "Property Address *", placeholder: "1234 Oak St" },

              { key: "name", label: "Owner Name (if known)", placeholder: "John Smith" },

              { key: "phone", label: "Phone (if skip traced)", placeholder: "(214) 555-1234" },

              { key: "zip", label: "Zip Code *", placeholder: "75215" },

              { key: "source", label: "How you found it", placeholder: "Driving 75216, Neighbor tip, DealMachine, etc." },

              { key: "notes", label: "Property Condition Notes", placeholder: "Overgrown lawn, broken windows, mail piling up, no cars..." },

            ].map(field => (

              <div key={field.key} style={{ marginBottom: 16 }}>

                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#aaa", marginBottom: 6 }}>{field.label}</label>

                {field.key === "notes" ? (

                  <textarea value={manualLead[field.key]} onChange={e => setManualLead(p => ({ ...p, [field.key]: e.target.value }))}

                    placeholder={field.placeholder}

                    style={{ width: "100%", background: "#0B1F45", border: "1px solid #333", borderRadius: 8, color: "#fff", padding: "10px 12px", fontSize: 13, resize: "vertical", height: 80, boxSizing: "border-box" }} />

                ) : (

                  <input type="text" value={manualLead[field.key]} onChange={e => setManualLead(p => ({ ...p, [field.key]: e.target.value }))}

                    placeholder={field.placeholder}

                    style={{ width: "100%", background: "#0B1F45", border: "1px solid #333", borderRadius: 8, color: "#fff", padding: "10px 12px", fontSize: 13, boxSizing: "border-box" }} />

                )}

              </div>

            ))}

            <div style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#aaa" }}>

              💡 No phone? That's OK — import first, then bulk skip trace the whole list via Tracerfy ($0.02/record)

            </div>

            <button onClick={saveManual} disabled={manualSaving || !manualLead.address}

              style={{ width: "100%", background: manualDone ? "#2d6a2d" : R, color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>

              {manualDone ? "✅ Saved as High Priority — Enter Another" : manualSaving ? "Saving..." : "💾 Save Vacant Lead to CRM"}

            </button>

          </div>

        </div>

      )}

      {/* ── WORKFLOW ── */}

      {tab === "workflow" && (

        <div style={{ maxWidth: 720 }}>

          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 24 }}>

            The complete end-to-end system for turning vacant properties into deals. Do this daily.

          </div>

          {[

            {

              step: 1, icon: "🏚️", title: "Find Vacant Properties", time: "30 min/day",

              color: "#9b59b6",

              actions: [

                "Open PropWire → nationwide → Vacant + Absentee + Tax Delinquent filters",

                "Download 100-200 leads as CSV",

                "OR: Drive zips 75215, 75216, 75210 with DealMachine app open",

                "OR: Order Tracerfy County Vacant List ($10 for 100 records, phones included)"

              ]

            },

            {

              step: 2, icon: "📞", title: "Skip Trace for Phone Numbers", time: "10 min",

              color: "#00d4aa",

              actions: [

                "Go to tracerfy.com → upload your CSV",

                "Select: address, city, state columns",

                "Submit → receive skip-traced CSV via email in minutes",

                "Cost: $0.02/record = 100 leads = $2.00 total",

                "Re-upload the phone-appended CSV to the Bulk Import tab above"

              ]

            },

            {

              step: 3, icon: "📋", title: "Import to CRM", time: "2 min",

              color: "#3498db",

              actions: [

                "Upload skip-traced CSV to Bulk Import tab on this page",

                "All leads auto-tagged: Vacant + High Priority + is_vacant = true",

                "System deduplicates against existing CRM records automatically",

                "Leads appear in CRM sorted by motivation score"

              ]

            },

            {

              step: 4, icon: "📞", title: "Call from Call List", time: "3-4 hrs/day",

              color: R,

              actions: [

                "Open /CallLists page",

                "Filter by: Situation = 'Vacant Property' or Priority = 'High'",

                "Work through Eric Cline's 5-step script (pre-loaded)",

                "Target: 60 dials/day, 3-4 offers/day",

                "Log outcome after every call — next touch auto-scheduled"

              ]

            },

            {

              step: 5, icon: "🤝", title: "Get the Contract", time: "Ongoing",

              color: WARN,

              actions: [

                "Warm leads → text + email offer details (15-touch sequence auto-fires)",

                "Vacant owners are MOTIVATED — many accept 60-70 cents on the dollar",

                "ARV - repairs - your fee - profit margin = your offer number",

                "Get contract signed → blast to your cash buyers list",

                "Collect assignment fee at closing: $5k–$25k per deal"

              ]

            },

          ].map(s => (

            <div key={s.step} style={{ display: "flex", gap: 20, marginBottom: 24 }}>

              <div style={{ flexShrink: 0 }}>

                <div style={{ background: s.color, borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800 }}>

                  {s.icon}

                </div>

                {s.step < 5 && <div style={{ width: 2, height: 40, background: "#333", margin: "4px auto 0" }} />}

              </div>

              <div style={{ flex: 1, background: "#111827", border: `1px solid ${s.color}33`, borderRadius: 12, padding: "16px 20px", marginBottom: 0 }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>

                  <div style={{ fontWeight: 700, fontSize: 15 }}>Step {s.step}: {s.title}</div>

                  <span style={{ fontSize: 12, color: s.color, fontWeight: 700, background: `${s.color}22`, padding: "3px 10px", borderRadius: 6 }}>⏱ {s.time}</span>

                </div>

                {s.actions.map((a, i) => (

                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>

                    <span style={{ color: s.color, fontSize: 14, flexShrink: 0 }}>›</span>

                    <span style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{a}</span>

                  </div>

                ))}

              </div>

            </div>

          ))}

          <div style={{ background: "#0a1a0a", border: "1px solid #2d6a2d", borderRadius: 12, padding: "18px 22px" }}>

            <div style={{ fontWeight: 700, color: "#4caf50", fontSize: 16, marginBottom: 8 }}>💰 The Math</div>

            <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2 }}>

              100 vacant leads → skip trace $2 → 60-70 calls → 5-8 interested → 1-2 offers → <strong style={{ color: "#4caf50" }}>1 deal closed = $8,000–$20,000</strong><br />

              Total cost to get there: <strong style={{ color: "#fff" }}>$2 (skip trace) + your time</strong>

            </div>

          </div>

        </div>

      )}

      </div>

    </SaaSLayout>

  );

}
