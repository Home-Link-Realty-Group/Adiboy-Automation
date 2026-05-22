# prospectscraper

Source: prospectscraper.docx

import \{ useState \} from "react";

import \{ Lead \} from "@/api/entities";

import \{ Target \} from "lucide\-react";

import SaaSLayout from "@/components/saas/SaaSLayout";

const D = "\#0B1F45";

const R = "\#D4A843";

const G = "\#0d6efd";

const ACCENT = "\#00d4aa";

// nationwide zip codes — high distress / absentee concentration

const DALLAS\_ZIPS = \[

  "75201","75202","75203","75204","75205","75206","75207","75208","75209","75210",

  "75211","75212","75214","75215","75216","75217","75218","75219","75220","75221",

  "75223","75224","75225","75226","75227","75228","75229","75230","75231","75232",

  "75233","75234","75235","75236","75237","75238","75240","75241","75243","75244",

  "75246","75247","75248","75249","75251","75252","75253","75254"

\];

const SOURCES = \[

  \{

    id: "hud",

    label: "HUD Home Store",

    icon: "🏛️",

    color: "\#D4A843",

    desc: "FHA foreclosures — bank\-owned, motivated to sell fast",

    url: "https://www\.hudhomestore\.gov/Listing/PropertySearchResult\.aspx?sState=TX&sCity=Nationwide",

    scrapeUrl: null,

    freeApi: true,

    instructions: \[

      "Go to HUD Home Store \(link below\)",

      "Filter: State=TX, City=Nationwide",

      "Export results to CSV",

      "Upload CSV here — system auto\-imports to CRM"

    \]

  \},

  \{

    id: "propwire",

    label: "PropWire",

    icon: "🏚️",

    color: "\#9b59b6",

    desc: "Tax delinquent, absentee owners, pre\-foreclosure, vacant",

    url: "https://propwire\.com/investors",

    freeApi: false,

    instructions: \[

      "Login to PropWire \(free account\)",

      "Filter: nationwide \+ Tax Delinquent / Absentee Owner / Vacant",

      "Export CSV \(up to 200 free/month\)",

      "Upload CSV here"

    \]

  \},

  \{

    id: "redfin",

    label: "Redfin FSBO",

    icon: "🏠",

    color: "\#3498db",

    desc: "FSBO listings 90\+ days — seller is desperate",

    url: "https://www\.redfin\.com/city/9063/TX/Nationwide/filter/include=forsale\+by\+owner,min\-days\-on\-market=90",

    freeApi: false,

    instructions: \[

      "Open Redfin link \(button below\)",

      "Sort by: Days on Market \(oldest first\)",

      "Note: address, price, days on market",

      "Manually enter below OR use CSV upload"

    \]

  \},

  \{

    id: "zillow",

    label: "Zillow FSBO",

    icon: "🟦",

    color: "\#0077b6",

    desc: "For Sale By Owner — 100\+ days, price drops",

    url: "https://www\.zillow\.com/nationwide\-tx/fsbo/",

    freeApi: false,

    instructions: \[

      "Open Zillow FSBO link",

      "Filter: Sort by Newest \(then flip to Oldest\)",

      "Target listings 100\+ days on market",

      "Copy address \+ phone from listing description"

    \]

  \},

  \{

    id: "dallas\_cad",

    label: "Nationwide CAD \(Tax Records\)",

    icon: "📋",

    color: "\#f39c12",

    desc: "Public tax delinquent records — FREE forever",

    url: "https://www\.dallascad\.org/SearchAddr\.aspx",

    freeApi: false,

    instructions: \[

      "Go to Nationwide CAD \(link below\)",

      "Search by zip code \(use zips below\)",

      "Look for properties with 'Delinquent' tax status",

      "Note owner name \+ address — skip trace for phone"

    \]

  \},

  \{

    id: "foreclosure",

    label: "Foreclosure\.com",

    icon: "🚨",

    color: "\#c0392b",

    desc: "Pre\-foreclosure, auction, bank\-owned listings",

    url: "https://www\.foreclosure\.com/listing/search\.html?state=tx&city=nationwide",

    freeApi: false,

    instructions: \[

      "Open Foreclosure\.com \(free trial available\)",

      "Filter: nationwide, Pre\-Foreclosure",

      "Export or manually copy listings",

      "Upload CSV or enter manually below"

    \]

  \}

\];

const CSV\_TEMPLATE = \`name,phone,email,address,city,state,zip,condition,situation,timeline,arv\_estimate,source,notes

John Smith,\(214\) 555\-1234,john@email\.com,1234 Oak St,Nationwide,TX,75201,Fair,Tax Delinquent,ASAP,180000,PropWire,2 years delinquent

\`;

function parseCSV\(text\) \{

  const lines = text\.trim\(\)\.split\("\\n"\);

  if \(lines\.length < 2\) return \[\];

  const headers = lines\[0\]\.split\(","\)\.map\(h => h\.replace\(/"/g, ""\)\.trim\(\)\.toLowerCase\(\)\.replace\(/\\s\+/g, "\_"\)\);

  return lines\.slice\(1\)\.map\(line => \{

    const vals = \[\];

    let cur = "", inQ = false;

    for \(let ch of line\) \{

      if \(ch === '"'\) inQ = \!inQ;

      else if \(ch === ',' && \!inQ\) \{ vals\.push\(cur\.trim\(\)\); cur = ""; \}

      else cur \+= ch;

    \}

    vals\.push\(cur\.trim\(\)\);

    const obj = \{\};

    headers\.forEach\(\(h, i\) => \{ obj\[h\] = \(vals\[i\] || ""\)\.replace\(/"/g, ""\)\.trim\(\); \}\);

    // Normalize common column names

    if \(\!obj\.name && \(obj\.owner\_name || obj\.first\_name\)\) \{

      obj\.name = obj\.owner\_name || \`$\{obj\.first\_name || ""\} $\{obj\.last\_name || ""\}\`\.trim\(\);

    \}

    if \(\!obj\.address && obj\.property\_address\) obj\.address = obj\.property\_address;

    if \(\!obj\.arv\_estimate && obj\.estimated\_value\) obj\.arv\_estimate = obj\.estimated\_value;

    if \(\!obj\.source\) obj\.source = "CSV Import";

    return obj;

  \}\)\.filter\(r => r\.address || r\.name\);

\}

export default function ProspectScraper\(\) \{

  const \[activeSource, setActiveSource\] = useState\(null\);

  const \[csvText, setCsvText\] = useState\(""\);

  const \[parsedLeads, setParsedLeads\] = useState\(\[\]\);

  const \[importing, setImporting\] = useState\(false\);

  const \[imported, setImported\] = useState\(\[\]\);

  const \[skipped, setSkipped\] = useState\(\[\]\);

  const \[done, setDone\] = useState\(false\);

  const \[manualLead, setManualLead\] = useState\(\{ name:"", phone:"", address:"", city:"Nationwide", state:"TX", zip:"", situation:"", source:"Manual Entry", notes:"" \}\);

  const \[manualSaving, setManualSaving\] = useState\(false\);

  const \[manualDone, setManualDone\] = useState\(false\);

  const \[tab, setTab\] = useState\("sources"\); // sources | upload | manual | zips

  const handleCSVUpload = \(e\) => \{

    const file = e\.target\.files\[0\];

    if \(\!file\) return;

    const reader = new FileReader\(\);

    reader\.onload = \(ev\) => \{

      const text = ev\.target\.result;

      setCsvText\(text\);

      const leads = parseCSV\(text\);

      setParsedLeads\(leads\);

      setTab\("upload"\);

    \};

    reader\.readAsText\(file\);

  \};

  const handleCSVPaste = \(text\) => \{

    setCsvText\(text\);

    const leads = parseCSV\(text\);

    setParsedLeads\(leads\);

  \};

  const importLeads = async \(\) => \{

    setImporting\(true\);

    setDone\(false\);

    const good = \[\], bad = \[\];

    // Load existing leads to check duplicates

    const existing = await Lead\.list\(\);

    const existingPhones = new Set\(existing\.map\(l => \(l\.phone || ""\)\.replace\(/\\D/g, ""\)\)\);

    const existingAddresses = new Set\(existing\.map\(l => \(l\.address || ""\)\.toLowerCase\(\)\.trim\(\)\)\);

    for \(const lead of parsedLeads\) \{

      const phone = \(lead\.phone || ""\)\.replace\(/\\D/g, ""\);

      const address = \(lead\.address || ""\)\.toLowerCase\(\)\.trim\(\);

      if \(\(phone && existingPhones\.has\(phone\)\) || \(address && existingAddresses\.has\(address\)\)\) \{

        bad\.push\(\{ \.\.\.lead, skip\_reason: "Duplicate" \}\);

        continue;

      \}

      try \{

        await Lead\.create\(\{

          name: lead\.name || "Unknown",

          phone: lead\.phone || "",

          email: lead\.email || "",

          address: lead\.address || "",

          city: lead\.city || "Nationwide",

          state: lead\.state || "TX",

          zip: lead\.zip || "",

          condition: lead\.condition || "",

          situation: lead\.situation || "",

          timeline: lead\.timeline || "",

          arv\_estimate: parseFloat\(lead\.arv\_estimate\) || null,

          source: lead\.source || "CSV Import",

          notes: lead\.notes || "",

          status: "New",

          priority: "Medium",

        \}\);

        good\.push\(lead\);

        existingPhones\.add\(phone\);

        existingAddresses\.add\(address\);

      \} catch \(e\) \{

        bad\.push\(\{ \.\.\.lead, skip\_reason: "Error" \}\);

      \}

    \}

    setImported\(good\);

    setSkipped\(bad\);

    setImporting\(false\);

    setDone\(true\);

  \};

  const saveManualLead = async \(\) => \{

    setManualSaving\(true\);

    try \{

      await Lead\.create\(\{ \.\.\.manualLead, status: "New", priority: "High" \}\);

      setManualDone\(true\);

      setManualLead\(\{ name:"", phone:"", address:"", city:"Nationwide", state:"TX", zip:"", situation:"", source:"Manual Entry", notes:"" \}\);

      setTimeout\(\(\) => setManualDone\(false\), 3000\);

    \} catch \(e\) \{\}

    setManualSaving\(false\);

  \};

  return \(

    <SaaSLayout

      title="Prospect Scraper"

      subtitle="Build your call list from free public sources — CSV import, manual entry, zip code lookups"

      icon=\{Target\}

      accent="\#dc2626"

    >

      <div style=\{\{ background: D, borderRadius: 14, color: "\#fff", fontFamily: "'Inter', sans\-serif", padding: "24px" \}\}>

      \{/\* Tab Nav \*/\}

      <div style=\{\{ marginBottom: 24 \}\}>

        <div style=\{\{ display: "flex", gap: 8, borderBottom: "1px solid \#333", paddingBottom: 0 \}\}>

          \{\[

            \{ id: "sources", label: "📡 Data Sources" \},

            \{ id: "upload", label: "📤 CSV Import" \},

            \{ id: "manual", label: "✏️ Manual Entry" \},

            \{ id: "zips", label: "📍 Nationwide Zip Codes" \},

          \]\.map\(t => \(

            <button key=\{t\.id\} onClick=\{\(\) => setTab\(t\.id\)\} style=\{\{

              background: tab === t\.id ? R : "transparent",

              color: tab === t\.id ? "\#fff" : "\#aaa",

              border: "none", borderRadius: "8px 8px 0 0",

              padding: "10px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600,

              borderBottom: tab === t\.id ? "2px solid " \+ R : "2px solid transparent"

            \}\}>\{t\.label\}</button>

          \)\)\}

        </div>

      </div>

      \{/\* ── TAB: SOURCES ── \*/\}

      \{tab === "sources" && \(

        <div>

          <div style=\{\{ fontSize: 13, color: "\#aaa", marginBottom: 20 \}\}>

            Click any source to see exact steps\. Pull a list → upload CSV → leads load straight into your CRM \+ Call List\.

          </div>

          <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fill, minmax\(320px, 1fr\)\)", gap: 16 \}\}>

            \{SOURCES\.map\(src => \(

              <div key=\{src\.id\} onClick=\{\(\) => setActiveSource\(activeSource?\.id === src\.id ? null : src\)\}

                style=\{\{

                  background: "\#111827", border: \`2px solid $\{activeSource?\.id === src\.id ? src\.color : "\#2a2a3a"\}\`,

                  borderRadius: 12, padding: "18px 20px", cursor: "pointer",

                  transition: "all 0\.2s"

                \}\}>

                <div style=\{\{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 \}\}>

                  <span style=\{\{ fontSize: 24 \}\}>\{src\.icon\}</span>

                  <div>

                    <div style=\{\{ fontWeight: 700, fontSize: 15 \}\}>\{src\.label\}</div>

                    <div style=\{\{ fontSize: 12, color: src\.color, fontWeight: 600 \}\}>

                      \{src\.freeApi ? "✅ FREE" : "🔗 Free Account Required"\}

                    </div>

                  </div>

                </div>

                <div style=\{\{ fontSize: 13, color: "\#ccc", marginBottom: 12 \}\}>\{src\.desc\}</div>

                \{activeSource?\.id === src\.id && \(

                  <div style=\{\{ borderTop: "1px solid \#333", paddingTop: 12, marginTop: 4 \}\}>

                    <div style=\{\{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: ACCENT \}\}>📋 Step\-by\-Step:</div>

                    \{src\.instructions\.map\(\(step, i\) => \(

                      <div key=\{i\} style=\{\{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex\-start" \}\}>

                        <div style=\{\{ background: src\.color, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 \}\}>\{i\+1\}</div>

                        <div style=\{\{ fontSize: 13, color: "\#ddd", lineHeight: 1\.5 \}\}>\{step\}</div>

                      </div>

                    \)\)\}

                    <a href=\{src\.url\} target="\_blank" rel="noopener noreferrer"

                      style=\{\{ display: "inline\-block", marginTop: 12, background: src\.color, color: "\#fff", padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" \}\}>

                      Open \{src\.label\} →

                    </a>

                    <button onClick=\{\(e\) => \{ e\.stopPropagation\(\); setTab\("upload"\); \}\}

                      style=\{\{ marginLeft: 10, background: "\#2a2a3a", color: "\#fff", border: "none", padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" \}\}>

                      Upload CSV →

                    </button>

                  </div>

                \)\}

              </div>

            \)\)\}

          </div>

          \{/\* Quick tip \*/\}

          <div style=\{\{ background: "\#0a1628", border: "1px solid \#1e3a5f", borderRadius: 12, padding: "16px 20px", marginTop: 24 \}\}>

            <div style=\{\{ fontWeight: 700, color: ACCENT, marginBottom: 8 \}\}>💡 Fastest Path to a Call List Today</div>

            <div style=\{\{ fontSize: 13, color: "\#ccc", lineHeight: 1\.8 \}\}>

              1\. Go to <strong style=\{\{color:"\#fff"\}\}>PropWire\.com</strong> \(free account\) → nationwide → Tax Delinquent \+ Absentee → Export CSV<br/>

              2\. Come back here → <strong style=\{\{color:"\#fff"\}\}>CSV Import tab</strong> → Upload file → Import to CRM<br/>

              3\. Open <strong style=\{\{color:"\#fff"\}\}>Call List page</strong> → leads are pre\-sorted by motivation score → start dialing

            </div>

          </div>

        </div>

      \)\}

      \{/\* ── TAB: CSV IMPORT ── \*/\}

      \{tab === "upload" && \(

        <div style=\{\{ maxWidth: 860 \}\}>

          <div style=\{\{ fontSize: 13, color: "\#aaa", marginBottom: 20 \}\}>

            Upload a CSV from PropWire, HUD, BatchLeads, or any other source\. System auto\-detects columns, deduplicates, and loads straight into your CRM\.

          </div>

          \{/\* Upload zone \*/\}

          <label style=\{\{

            display: "block", border: "2px dashed \#444", borderRadius: 12, padding: "40px 24px",

            textAlign: "center", cursor: "pointer", marginBottom: 20,

            background: "\#0B1F45", transition: "border\-color 0\.2s"

          \}\}>

            <div style=\{\{ fontSize: 36, marginBottom: 10 \}\}>📂</div>

            <div style=\{\{ fontWeight: 700, fontSize: 16, marginBottom: 6 \}\}>Drop CSV file here or click to browse</div>

            <div style=\{\{ fontSize: 13, color: "\#aaa" \}\}>Accepts PropWire, BatchLeads, HUD, or any standard CSV with address \+ name columns</div>

            <input type="file" accept="\.csv,\.txt" onChange=\{handleCSVUpload\} style=\{\{ display: "none" \}\} />

          </label>

          \{/\* Or paste \*/\}

          <div style=\{\{ marginBottom: 20 \}\}>

            <div style=\{\{ fontSize: 13, fontWeight: 600, color: "\#aaa", marginBottom: 8 \}\}>Or paste CSV text directly:</div>

            <textarea

              value=\{csvText\}

              onChange=\{e => handleCSVPaste\(e\.target\.value\)\}

              placeholder=\{CSV\_TEMPLATE\}

              style=\{\{ width: "100%", height: 140, background: "\#0B1F45", border: "1px solid \#333", borderRadius: 8, color: "\#fff", padding: 12, fontSize: 12, fontFamily: "monospace", resize: "vertical", boxSizing: "border\-box" \}\}

            />

          </div>

          \{/\* Preview \*/\}

          \{parsedLeads\.length > 0 && \(

            <div style=\{\{ marginBottom: 20 \}\}>

              <div style=\{\{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: ACCENT \}\}>

                ✅ \{parsedLeads\.length\} leads parsed — ready to import

              </div>

              <div style=\{\{ overflowX: "auto", borderRadius: 10, border: "1px solid \#333" \}\}>

                <table style=\{\{ width: "100%", borderCollapse: "collapse", fontSize: 12 \}\}>

                  <thead>

                    <tr style=\{\{ background: "\#0B1F45" \}\}>

                      \{\["Name","Phone","Address","City","Zip","Source","Situation"\]\.map\(h => \(

                        <th key=\{h\} style=\{\{ padding: "10px 12px", textAlign: "left", color: "\#aaa", borderBottom: "1px solid \#333", whiteSpace: "nowrap" \}\}>\{h\}</th>

                      \)\)\}

                    </tr>

                  </thead>

                  <tbody>

                    \{parsedLeads\.slice\(0,10\)\.map\(\(l, i\) => \(

                      <tr key=\{i\} style=\{\{ borderBottom: "1px solid \#222", background: i % 2 === 0 ? "\#111" : "\#0B1F45" \}\}>

                        <td style=\{\{ padding: "8px 12px" \}\}>\{l\.name || "—"\}</td>

                        <td style=\{\{ padding: "8px 12px", color: ACCENT \}\}>\{l\.phone || "—"\}</td>

                        <td style=\{\{ padding: "8px 12px" \}\}>\{l\.address || "—"\}</td>

                        <td style=\{\{ padding: "8px 12px" \}\}>\{l\.city || "—"\}</td>

                        <td style=\{\{ padding: "8px 12px" \}\}>\{l\.zip || "—"\}</td>

                        <td style=\{\{ padding: "8px 12px", color: "\#aaa" \}\}>\{l\.source || "—"\}</td>

                        <td style=\{\{ padding: "8px 12px", color: "\#f39c12" \}\}>\{l\.situation || "—"\}</td>

                      </tr>

                    \)\)\}

                  </tbody>

                </table>

                \{parsedLeads\.length > 10 && \(

                  <div style=\{\{ padding: "10px 12px", color: "\#aaa", fontSize: 12, background: "\#111" \}\}>

                    \+ \{parsedLeads\.length \- 10\} more leads not shown

                  </div>

                \)\}

              </div>

              <button onClick=\{importLeads\} disabled=\{importing\}

                style=\{\{ marginTop: 16, background: importing ? "\#555" : R, color: "\#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 15, fontWeight: 800, cursor: importing ? "not\-allowed" : "pointer", width: "100%" \}\}>

                \{importing ? "⏳ Importing\.\.\." : \`🚀 Import $\{parsedLeads\.length\} Leads to CRM\`\}

              </button>

            </div>

          \)\}

          \{/\* Results \*/\}

          \{done && \(

            <div style=\{\{ background: "\#0a1a0a", border: "1px solid \#2d6a2d", borderRadius: 12, padding: "20px 24px" \}\}>

              <div style=\{\{ fontWeight: 800, fontSize: 18, color: "\#4caf50", marginBottom: 12 \}\}>✅ Import Complete</div>

              <div style=\{\{ fontSize: 14, marginBottom: 6 \}\}>

                <span style=\{\{ color: "\#4caf50", fontWeight: 700 \}\}>✅ \{imported\.length\} leads imported</span> to CRM

              </div>

              \{skipped\.length > 0 && \(

                <div style=\{\{ fontSize: 14, color: "\#f39c12" \}\}>⚠️ \{skipped\.length\} skipped \(duplicates or errors\)</div>

              \)\}

              <div style=\{\{ display: "flex", gap: 12, marginTop: 16 \}\}>

                <a href="/CRM" style=\{\{ background: G, color: "\#fff", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" \}\}>

                  Open CRM →

                </a>

                <a href="/CallLists" style=\{\{ background: R, color: "\#fff", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" \}\}>

                  Start Calling →

                </a>

              </div>

            </div>

          \)\}

          \{/\* CSV Template download \*/\}

          <div style=\{\{ marginTop: 24, background: "\#111827", border: "1px solid \#2a2a3a", borderRadius: 10, padding: "14px 18px" \}\}>

            <div style=\{\{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: "\#aaa" \}\}>📄 CSV Template \(copy this header row\):</div>

            <code style=\{\{ fontSize: 11, color: ACCENT, display: "block", background: "\#0B1F45", padding: 10, borderRadius: 6, overflowX: "auto" \}\}>

              name,phone,email,address,city,state,zip,condition,situation,timeline,arv\_estimate,source,notes

            </code>

          </div>

        </div>

      \)\}

      \{/\* ── TAB: MANUAL ENTRY ── \*/\}

      \{tab === "manual" && \(

        <div style=\{\{ maxWidth: 560 \}\}>

          <div style=\{\{ fontSize: 13, color: "\#aaa", marginBottom: 20 \}\}>

            Found a lead on Craigslist, Zillow, or from a referral? Enter it manually here — goes straight into CRM as High Priority\.

          </div>

          <div style=\{\{ background: "\#111827", border: "1px solid \#2a2a3a", borderRadius: 12, padding: "24px" \}\}>

            \{\[

              \{ key: "name", label: "Owner Name \*", placeholder: "John Smith" \},

              \{ key: "phone", label: "Phone Number \*", placeholder: "\(214\) 555\-1234" \},

              \{ key: "address", label: "Property Address \*", placeholder: "1234 Oak St" \},

              \{ key: "city", label: "City", placeholder: "Nationwide" \},

              \{ key: "zip", label: "Zip Code", placeholder: "75201" \},

              \{ key: "situation", label: "Situation / Lead Type", placeholder: "Pre\-Foreclosure, Tax Delinquent, FSBO, etc\." \},

              \{ key: "source", label: "Source", placeholder: "PropWire, Craigslist, Referral, etc\." \},

              \{ key: "notes", label: "Notes", placeholder: "Any details about the property or situation\.\.\." \},

            \]\.map\(field => \(

              <div key=\{field\.key\} style=\{\{ marginBottom: 16 \}\}>

                <label style=\{\{ display: "block", fontSize: 12, fontWeight: 700, color: "\#aaa", marginBottom: 6 \}\}>\{field\.label\}</label>

                \{field\.key === "notes" ? \(

                  <textarea

                    value=\{manualLead\[field\.key\]\}

                    onChange=\{e => setManualLead\(p => \(\{\.\.\.p, \[field\.key\]: e\.target\.value\}\)\)\}

                    placeholder=\{field\.placeholder\}

                    style=\{\{ width: "100%", background: "\#0B1F45", border: "1px solid \#333", borderRadius: 8, color: "\#fff", padding: "10px 12px", fontSize: 13, resize: "vertical", height: 80, boxSizing: "border\-box" \}\}

                  />

                \) : \(

                  <input

                    type="text"

                    value=\{manualLead\[field\.key\]\}

                    onChange=\{e => setManualLead\(p => \(\{\.\.\.p, \[field\.key\]: e\.target\.value\}\)\)\}

                    placeholder=\{field\.placeholder\}

                    style=\{\{ width: "100%", background: "\#0B1F45", border: "1px solid \#333", borderRadius: 8, color: "\#fff", padding: "10px 12px", fontSize: 13, boxSizing: "border\-box" \}\}

                  />

                \)\}

              </div>

            \)\)\}

            <button onClick=\{saveManualLead\} disabled=\{manualSaving || \!manualLead\.name || \!manualLead\.phone\}

              style=\{\{ width: "100%", background: manualDone ? "\#2d6a2d" : R, color: "\#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer" \}\}>

              \{manualDone ? "✅ Lead Saved — Enter Another" : manualSaving ? "Saving\.\.\." : "💾 Save Lead to CRM"\}

            </button>

          </div>

        </div>

      \)\}

      \{/\* ── TAB: DALLAS ZIP CODES ── \*/\}

      \{tab === "zips" && \(

        <div>

          <div style=\{\{ fontSize: 13, color: "\#aaa", marginBottom: 20 \}\}>

            All 46 nationwide zip codes\. Use these when searching PropWire, Nationwide CAD, or any county record system\.

          </div>

          <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fill, minmax\(100px, 1fr\)\)", gap: 8 \}\}>

            \{DALLAS\_ZIPS\.map\(zip => \(

              <div key=\{zip\} onClick=\{\(\) => navigator\.clipboard?\.writeText\(zip\)\}

                style=\{\{ background: "\#111827", border: "1px solid \#2a2a3a", borderRadius: 8, padding: "10px", textAlign: "center", cursor: "pointer", fontSize: 14, fontWeight: 700, color: ACCENT, transition: "background 0\.2s" \}\}

                title="Click to copy">

                \{zip\}

              </div>

            \)\)\}

          </div>

          <div style=\{\{ fontSize: 12, color: "\#666", marginTop: 12 \}\}>Click any zip to copy it to clipboard\.</div>

          \{/\* High\-value zip guide \*/\}

          <div style=\{\{ background: "\#0a1628", border: "1px solid \#1e3a5f", borderRadius: 12, padding: "20px 24px", marginTop: 24 \}\}>

            <div style=\{\{ fontWeight: 700, color: ACCENT, marginBottom: 12 \}\}>🎯 Highest\-Value Zip Codes for Motivated Sellers</div>

            \{\[

              \{ zip: "75216", area: "Oak Cliff / South Nationwide", why: "High absentee ownership, aging housing stock, strong distress signals" \},

              \{ zip: "75217", area: "Pleasant Grove", why: "High tax delinquency rate, many absentee landlords" \},

              \{ zip: "75211", area: "West Nationwide", why: "Gentrification pressure = motivated sellers, good ARV upside" \},

              \{ zip: "75241", area: "South Nationwide", why: "High vacancy rate, inherited properties, estate sales" \},

              \{ zip: "75212", area: "Trinity Groves", why: "Value\-add corridor, many FSBO \+ distressed listings" \},

              \{ zip: "75228", area: "East Nationwide / Buckner Terrace", why: "Pre\-foreclosure concentration, DOM 100\+ common" \},

            \]\.map\(z => \(

              <div key=\{z\.zip\} style=\{\{ display: "flex", gap: 16, marginBottom: 12, alignItems: "flex\-start" \}\}>

                <div style=\{\{ background: R, borderRadius: 6, padding: "4px 10px", fontSize: 13, fontWeight: 800, flexShrink: 0 \}\}>\{z\.zip\}</div>

                <div>

                  <div style=\{\{ fontSize: 13, fontWeight: 700 \}\}>\{z\.area\}</div>

                  <div style=\{\{ fontSize: 12, color: "\#aaa" \}\}>\{z\.why\}</div>

                </div>

              </div>

            \)\)\}

          </div>

        </div>

      \)\}

      </div>

    </SaaSLayout>

  \);

\}
