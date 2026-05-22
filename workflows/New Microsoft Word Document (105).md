# New Microsoft Word Document (105)

Source: New Microsoft Word Document (105).docx

import \{ useRef, useState \} from "react";

import \{ UploadFile \} from "@/api/integrations";

import \{ Lead \} from "@/api/entities";

import \{ PHONE, PHONE\_RAW \} from "\./portalConstants";

export default function PhotosTab\(\{ lead, setLead \}\) \{

  const fileRef = useRef\(null\);

  const dropRef = useRef\(null\);

  const \[dragging, setDragging\] = useState\(false\);

  const \[uploading, setUploading\] = useState\(false\);

  const \[uploadPct, setUploadPct\] = useState\(0\);

  const \[gallery, setGallery\] = useState\(\[\]\);

  const \[selectedPhoto, setSelectedPhoto\] = useState\(null\);

  async function uploadFiles\(files\) \{

    if \(\!files?\.length\) return;

    setUploading\(true\);

    setUploadPct\(0\);

    const done = \[\];

    for \(let i = 0; i < files\.length; i\+\+\) \{

      try \{

        const \{ file\_url \} = await UploadFile\(\{ file: files\[i\] \}\);

        done\.push\(\{ name: files\[i\]\.name, url: file\_url, size: files\[i\]\.size \}\);

        setUploadPct\(Math\.round\(\(\(i \+ 1\) / files\.length\) \* 100\)\);

      \} catch \{\}

    \}

    if \(done\.length && lead?\.id\) \{

      const urls = done\.map\(f => f\.url\)\.join\(", "\);

      await Lead\.update\(lead\.id, \{ notes: \`$\{lead\.notes || ""\}\\n\[PHOTOS $\{new Date\(\)\.toLocaleDateString\(\)\}\]: $\{urls\}\` \}\);

      setLead\(prev => \(\{ \.\.\.prev, notes: \`$\{prev?\.notes || ""\}\\n\[PHOTOS\]: $\{urls\}\` \}\)\);

    \}

    setGallery\(prev => \[\.\.\.prev, \.\.\.done\]\);

    setUploading\(false\);

  \}

  return \(

    <div style=\{\{ display: "flex", flexDirection: "column", gap: 20 \}\}>

      <div style=\{\{ background: "\#fff", borderRadius: 20, padding: "36px", boxShadow: "0 2px 16px rgba\(0,0,0,0\.06\)" \}\}>

        <h2 style=\{\{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "\#0B1F45" \}\}>📸 Property Photos</h2>

        <p style=\{\{ color: "\#64748b", fontSize: 14, margin: "0 0 24px", lineHeight: 1\.6 \}\}>Photos help us finalize your offer faster\. Upload any room in any condition — we don't judge\.</p>

        <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fit, minmax\(140px, 1fr\)\)", gap: 10, marginBottom: 28 \}\}>

          \{\[

            \{ icon: "🚪", label: "Front Exterior", tip: "Curb view" \},

            \{ icon: "🏠", label: "Back/Side Yard",  tip: "Full view" \},

            \{ icon: "🛋️", label: "Living Room",    tip: "Wide angle" \},

            \{ icon: "🍳", label: "Kitchen",         tip: "All angles" \},

            \{ icon: "🛁", label: "Bathrooms",       tip: "Each one" \},

            \{ icon: "🛏️", label: "Bedrooms",       tip: "Each room" \},

            \{ icon: "🏗️", label: "Damage Areas",   tip: "All issues" \},

            \{ icon: "🪟", label: "Roof / Windows", tip: "If accessible" \},

          \]\.map\(\(r, i\) => \(

            <div key=\{i\} onClick=\{\(\) => fileRef\.current?\.click\(\)\}

              style=\{\{ background: gallery\.length > i ? "\#f0fff4" : "\#f8fafc", border: \`2px dashed $\{gallery\.length > i ? "\#27ae60" : "\#cbd5e1"\}\`, borderRadius: 12, padding: "16px 10px", textAlign: "center", cursor: "pointer", transition: "all 0\.15s" \}\}

              onMouseEnter=\{e => \{ e\.currentTarget\.style\.background = "\#f0fff4"; e\.currentTarget\.style\.borderColor = "\#27ae60"; \}\}

              onMouseLeave=\{e => \{ if \(gallery\.length <= i\) \{ e\.currentTarget\.style\.background = "\#f8fafc"; e\.currentTarget\.style\.borderColor = "\#cbd5e1"; \}\}\}>

              <div style=\{\{ fontSize: 24, marginBottom: 5 \}\}>\{gallery\.length > i ? "✅" : r\.icon\}</div>

              <div style=\{\{ fontSize: 12, fontWeight: 600, color: "\#374151" \}\}>\{r\.label\}</div>

              <div style=\{\{ fontSize: 10, color: "\#94a3b8", marginTop: 2 \}\}>\{r\.tip\}</div>

            </div>

          \)\)\}

        </div>

        <input type="file" ref=\{fileRef\} multiple accept="image/\*" onChange=\{e => uploadFiles\(Array\.from\(e\.target\.files\)\)\} style=\{\{ display: "none" \}\} />

        <div

          ref=\{dropRef\}

          onDragOver=\{e => \{ e\.preventDefault\(\); setDragging\(true\); \}\}

          onDragLeave=\{\(\) => setDragging\(false\)\}

          onDrop=\{e => \{ e\.preventDefault\(\); setDragging\(false\); uploadFiles\(Array\.from\(e\.dataTransfer\.files\)\.filter\(f => f\.type\.startsWith\("image/"\)\)\); \}\}

          onClick=\{\(\) => fileRef\.current?\.click\(\)\}

          style=\{\{ border: \`2\.5px dashed $\{dragging ? "\#27ae60" : "\#94a3b8"\}\`, borderRadius: 16, padding: "48px 24px", textAlign: "center", cursor: "pointer", background: dragging ? "\#f0fff4" : "\#fafbfc", transition: "all 0\.2s", marginBottom: gallery\.length > 0 ? 24 : 0 \}\}

        >

          <div style=\{\{ fontSize: 44, marginBottom: 10 \}\}>📤</div>

          <div style=\{\{ fontWeight: 700, color: "\#0B1F45", fontSize: 15, marginBottom: 5 \}\}>\{dragging ? "Drop photos here\!" : "Click or Drag & Drop Photos"\}</div>

          <div style=\{\{ color: "\#94a3b8", fontSize: 13 \}\}>JPG, PNG, HEIC — Upload multiple at once</div>

        </div>

        \{uploading && \(

          <div style=\{\{ marginTop: 16 \}\}>

            <div style=\{\{ display: "flex", justifyContent: "space\-between", marginBottom: 6 \}\}>

              <span style=\{\{ fontSize: 13, fontWeight: 600, color: "\#374151" \}\}>Uploading\.\.\.</span>

              <span style=\{\{ fontSize: 13, fontWeight: 700, color: "\#27ae60" \}\}>\{uploadPct\}%</span>

            </div>

            <div style=\{\{ height: 8, background: "\#e2e8f0", borderRadius: 8, overflow: "hidden" \}\}>

              <div style=\{\{ height: "100%", width: \`$\{uploadPct\}%\`, background: "linear\-gradient\(90deg, \#27ae60, \#2ecc71\)", borderRadius: 8, transition: "width 0\.3s" \}\} />

            </div>

          </div>

        \)\}

        \{gallery\.length > 0 && \(

          <div>

            <div style=\{\{ fontWeight: 700, color: "\#0B1F45", fontSize: 15, marginBottom: 14 \}\}>✅ Uploaded Photos \(\{gallery\.length\}\)</div>

            <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fill, minmax\(130px, 1fr\)\)", gap: 10 \}\}>

              \{gallery\.map\(\(f, i\) => \(

                <div key=\{i\} onClick=\{\(\) => setSelectedPhoto\(f\)\} style=\{\{ borderRadius: 12, overflow: "hidden", height: 110, cursor: "pointer", position: "relative", boxShadow: "0 2px 8px rgba\(0,0,0,0\.1\)" \}\}>

                  <img src=\{f\.url\} alt=\{f\.name\} style=\{\{ width: "100%", height: "100%", objectFit: "cover" \}\} />

                </div>

              \)\)\}

            </div>

          </div>

        \)\}

        <div style=\{\{ marginTop: 20, background: "\#f0f9ff", borderRadius: 12, padding: "14px 18px", fontSize: 13, color: "\#1e3a5f" \}\}>

          📱 Or text photos directly to <a href=\{\`sms:$\{PHONE\_RAW\}\`\} style=\{\{ color: "\#2563eb", fontWeight: 700 \}\}>\{PHONE\}</a> — we'll attach them to your file automatically\.

        </div>

      </div>

      \{selectedPhoto && \(

        <div onClick=\{\(\) => setSelectedPhoto\(null\)\} style=\{\{ position: "fixed", inset: 0, background: "rgba\(0,0,0,0\.88\)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" \}\}>

          <img src=\{selectedPhoto\.url\} alt=\{selectedPhoto\.name\} style=\{\{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 12, objectFit: "contain" \}\} />

          <button style=\{\{ position: "absolute", top: 20, right: 24, background: "rgba\(255,255,255,0\.15\)", border: "none", borderRadius: "50%", width: 40, height: 40, color: "\#fff", fontSize: 20, cursor: "pointer", fontWeight: 700 \}\}>×</button>

        </div>

      \)\}

    </div>

  \);

\}
