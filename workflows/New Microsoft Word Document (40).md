# New Microsoft Word Document (40)

Source: New Microsoft Word Document (40).docx

import \{ useState, useEffect, useRef \} from "react";

import \{ base44 \} from "@/api/base44Client";

import \{ Loader, Search, Replace, Download, Save, Copy, X, FileText, Sparkles \} from "lucide\-react";

import \{ jsPDF \} from "jspdf";

const NAVY = "\#0B1F45";

const GOLD = "\#D4A843";

export default function EditDocumentModal\(\{ doc, onClose, onSave \}\) \{

  const \[title, setTitle\] = useState\(doc\.title || ""\);

  const \[content, setContent\] = useState\(doc\.content || ""\);

  const \[notes, setNotes\] = useState\(doc\.notes || ""\);

  const \[loading, setLoading\] = useState\(false\);

  const \[extractError, setExtractError\] = useState\(null\);

  const \[saving, setSaving\] = useState\(false\);

  const \[findText, setFindText\] = useState\(""\);

  const \[replaceText, setReplaceText\] = useState\(""\);

  const \[matchCount, setMatchCount\] = useState\(0\);

  const textareaRef = useRef\(null\);

  // On open: if no saved content yet but a file\_url exists, auto\-extract text from the file

  useEffect\(\(\) => \{

    if \(\!doc\.content && doc\.file\_url\) \{

      extractTextFromFile\(\);

    \}

    // eslint\-disable\-next\-line react\-hooks/exhaustive\-deps

  \}, \[\]\);

  // Recount matches whenever find text or content changes

  useEffect\(\(\) => \{

    if \(\!findText\) \{ setMatchCount\(0\); return; \}

    try \{

      const escaped = findText\.replace\(/\[\.\*\+?^$\{\}\(\)|\[\\\]\\\\\]/g, "\\\\$&"\);

      const matches = content\.match\(new RegExp\(escaped, "gi"\)\);

      setMatchCount\(matches ? matches\.length : 0\);

    \} catch \{

      setMatchCount\(0\);

    \}

  \}, \[findText, content\]\);

  async function extractTextFromFile\(\) \{

    setLoading\(true\);

    setExtractError\(null\);

    try \{

      // Use Base44's built\-in extraction to pull raw text from PDFs, DOCX, images, etc\.

      const result = await base44\.integrations\.Core\.ExtractDataFromUploadedFile\(\{

        file\_url: doc\.file\_url,

        json\_schema: \{

          type: "object",

          properties: \{

            full\_text: \{

              type: "string",

              description: "The complete, full text content of the document, preserving line breaks, paragraphs, and structure as much as possible\."

            \}

          \},

          required: \["full\_text"\]

        \}

      \}\);

      if \(result?\.status === "success" && result?\.output?\.full\_text\) \{

        setContent\(result\.output\.full\_text\);

      \} else if \(result?\.status === "success" && Array\.isArray\(result\.output\) && result\.output\[0\]?\.full\_text\) \{

        setContent\(result\.output\[0\]\.full\_text\);

      \} else \{

        setExtractError\(result?\.details || "Could not extract text from this file\. You can still type content manually below\."\);

      \}

    \} catch \(e\) \{

      setExtractError\("Extraction failed: " \+ e\.message \+ "\. You can still type content manually below\."\);

    \}

    setLoading\(false\);

  \}

  function handleReplaceAll\(\) \{

    if \(\!findText\) return;

    try \{

      const escaped = findText\.replace\(/\[\.\*\+?^$\{\}\(\)|\[\\\]\\\\\]/g, "\\\\$&"\);

      const re = new RegExp\(escaped, "gi"\);

      const newContent = content\.replace\(re, replaceText\);

      setContent\(newContent\);

    \} catch \(e\) \{

      alert\("Replace failed: " \+ e\.message\);

    \}

  \}

  function handleReplaceFirst\(\) \{

    if \(\!findText\) return;

    try \{

      const escaped = findText\.replace\(/\[\.\*\+?^$\{\}\(\)|\[\\\]\\\\\]/g, "\\\\$&"\);

      const re = new RegExp\(escaped, "i"\);

      setContent\(content\.replace\(re, replaceText\)\);

    \} catch \(e\) \{

      alert\("Replace failed: " \+ e\.message\);

    \}

  \}

  async function saveChanges\(\) \{

    setSaving\(true\);

    await base44\.entities\.StoredDocument\.update\(doc\.id, \{ title, content, notes \}\);

    setSaving\(false\);

    onSave\(\);

  \}

  async function saveAsCopy\(\) \{

    setSaving\(true\);

    await base44\.entities\.StoredDocument\.create\(\{

      title: title \+ " \(Copy\)",

      category: doc\.category || "Other",

      content,

      notes,

      file\_size: \(\(content\.length / 1024\)\.toFixed\(2\)\) \+ " KB",

      file\_type: "text/plain",

      file\_name: title \+ " \(Copy\)\.txt"

    \}\);

    setSaving\(false\);

    onSave\(\);

  \}

  function downloadAsPDF\(\) \{

    const pdf = new jsPDF\(\{ unit: "pt", format: "letter" \}\);

    const margin = 50;

    const pageWidth = pdf\.internal\.pageSize\.getWidth\(\);

    const pageHeight = pdf\.internal\.pageSize\.getHeight\(\);

    const maxWidth = pageWidth \- margin \* 2;

    pdf\.setFont\("helvetica", "bold"\);

    pdf\.setFontSize\(16\);

    pdf\.text\(title || "Document", margin, margin\);

    pdf\.setFont\("helvetica", "normal"\);

    pdf\.setFontSize\(11\);

    const lines = pdf\.splitTextToSize\(content || "", maxWidth\);

    let y = margin \+ 30;

    const lineHeight = 14;

    lines\.forEach\(line => \{

      if \(y \+ lineHeight > pageHeight \- margin\) \{

        pdf\.addPage\(\);

        y = margin;

      \}

      pdf\.text\(line, margin, y\);

      y \+= lineHeight;

    \}\);

    pdf\.save\(\(title || "document"\)\.replace\(/\[^a\-z0\-9\]/gi, "\_"\) \+ "\.pdf"\);

  \}

  return \(

    <div style=\{overlay\} onClick=\{onClose\}>

      <div style=\{modal\} onClick=\{e => e\.stopPropagation\(\)\}>

        \{/\* Header \*/\}

        <div style=\{header\}>

          <div style=\{\{ display: "flex", alignItems: "center", gap: 10 \}\}>

            <FileText size=\{20\} color=\{GOLD\} />

            <div>

              <div style=\{\{ fontSize: 18, fontWeight: 900, color: NAVY \}\}>Edit Document</div>

              <div style=\{\{ fontSize: 11, color: "\#666" \}\}>\{doc\.file\_name || doc\.title\}</div>

            </div>

          </div>

          <button onClick=\{onClose\} style=\{iconBtn\} aria\-label="Close"><X size=\{18\} /></button>

        </div>

        \{/\* Title \*/\}

        <div style=\{\{ padding: "16px 24px 0" \}\}>

          <label style=\{lbl\}>Document Title</label>

          <input value=\{title\} onChange=\{e => setTitle\(e\.target\.value\)\} style=\{inp\} />

        </div>

        \{/\* Find & Replace toolbar \*/\}

        <div style=\{toolbar\}>

          <div style=\{\{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, color: NAVY, letterSpacing: 0\.5, textTransform: "uppercase" \}\}>

            <Search size=\{13\} /> Find & Replace

          </div>

          <div style=\{\{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1 \}\}>

            <input

              placeholder="Find \(e\.g\. JOHN SMITH\)"

              value=\{findText\}

              onChange=\{e => setFindText\(e\.target\.value\)\}

              style=\{\{ \.\.\.inp, flex: 1, minWidth: 160, marginBottom: 0 \}\}

            />

            <input

              placeholder="Replace with"

              value=\{replaceText\}

              onChange=\{e => setReplaceText\(e\.target\.value\)\}

              style=\{\{ \.\.\.inp, flex: 1, minWidth: 160, marginBottom: 0 \}\}

            />

            <span style=\{\{ fontSize: 11, color: matchCount > 0 ? "\#16a34a" : "\#94a3b8", fontWeight: 700, alignSelf: "center", whiteSpace: "nowrap" \}\}>

              \{findText ? \`$\{matchCount\} match$\{matchCount === 1 ? "" : "es"\}\` : ""\}

            </span>

            <button onClick=\{handleReplaceFirst\} disabled=\{\!findText || matchCount === 0\} style=\{smallBtn\(\!findText || matchCount === 0\)\}>

              <Replace size=\{12\} /> First

            </button>

            <button onClick=\{handleReplaceAll\} disabled=\{\!findText || matchCount === 0\} style=\{smallBtnPrimary\(\!findText || matchCount === 0\)\}>

              <Replace size=\{12\} /> Replace All

            </button>

          </div>

        </div>

        \{/\* Body / extraction status / textarea \*/\}

        <div style=\{\{ padding: "0 24px", flex: 1, overflowY: "auto", minHeight: 0 \}\}>

          \{loading && \(

            <div style=\{extractBanner\}>

              <Loader size=\{16\} className="dv\-spin" color=\{GOLD\} />

              <div>

                <div style=\{\{ fontWeight: 800, color: NAVY, fontSize: 13 \}\}>Extracting text from your document…</div>

                <div style=\{\{ fontSize: 11, color: "\#666", marginTop: 2 \}\}>This may take 5\-15 seconds for PDFs and Word docs\.</div>

              </div>

            </div>

          \)\}

          \{extractError && \(

            <div style=\{\{ \.\.\.extractBanner, background: "\#fff7ed", border: "1px solid \#fb923c" \}\}>

              <Sparkles size=\{16\} color="\#ea580c" />

              <div style=\{\{ fontSize: 12, color: "\#9a3412" \}\}>\{extractError\}</div>

              <button onClick=\{extractTextFromFile\} style=\{\{ marginLeft: "auto", background: "\#fff", border: "1px solid \#fb923c", color: "\#ea580c", borderRadius: 6, padding: "5px 10px", fontWeight: 700, fontSize: 11, cursor: "pointer" \}\}>Retry</button>

            </div>

          \)\}

          <label style=\{lbl\}>Document Content \(edit anything — names, dates, amounts, addresses\)</label>

          <textarea

            ref=\{textareaRef\}

            value=\{content\}

            onChange=\{e => setContent\(e\.target\.value\)\}

            placeholder=\{loading ? "Loading…" : "Type or paste document content here…"\}

            style=\{\{

              width: "100%", padding: "12px 14px",

              border: "1\.5px solid \#ddd", borderRadius: 8,

              fontSize: 13, lineHeight: 1\.6,

              boxSizing: "border\-box",

              fontFamily: "ui\-monospace, 'SF Mono', Menlo, monospace",

              minHeight: 320, resize: "vertical",

              background: "\#fafbfc",

            \}\}

          />

          <div style=\{\{ marginTop: 14, marginBottom: 16 \}\}>

            <label style=\{lbl\}>Internal Notes \(optional\)</label>

            <input value=\{notes\} onChange=\{e => setNotes\(e\.target\.value\)\} placeholder="e\.g\. Used for cash assignment deals" style=\{inp\} />

          </div>

        </div>

        \{/\* Footer actions \*/\}

        <div style=\{footer\}>

          <button onClick=\{onClose\} style=\{btnGhost\}>Cancel</button>

          <div style=\{\{ flex: 1 \}\} />

          <button onClick=\{downloadAsPDF\} disabled=\{\!content\} style=\{btnSecondary\(\!content\)\}>

            <Download size=\{13\} /> Download PDF

          </button>

          <button onClick=\{saveAsCopy\} disabled=\{\!content || saving\} style=\{btnSecondary\(\!content || saving\)\}>

            <Copy size=\{13\} /> Save as Copy

          </button>

          <button onClick=\{saveChanges\} disabled=\{saving\} style=\{btnPrimary\(saving\)\}>

            <Save size=\{13\} /> \{saving ? "Saving…" : "Save Changes"\}

          </button>

        </div>

        <style>\{\`@keyframes dvSpin \{ to \{ transform: rotate\(360deg\); \} \} \.dv\-spin \{ animation: dvSpin 1s linear infinite; \}\`\}</style>

      </div>

    </div>

  \);

\}

const overlay = \{ position: "fixed", inset: 0, background: "rgba\(11,31,69,0\.55\)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 \};

const modal = \{ background: "\#fff", borderRadius: 16, width: "100%", maxWidth: 960, maxHeight: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba\(0,0,0,0\.3\)", overflow: "hidden" \};

const header = \{ padding: "18px 24px", borderBottom: "1px solid \#eef2f7", display: "flex", alignItems: "center", justifyContent: "space\-between", flexShrink: 0 \};

const toolbar = \{ padding: "12px 24px", background: "linear\-gradient\(135deg, \#fef3c7 0%, \#fff 100%\)", borderBottom: "1px solid \#eef2f7", display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 \};

const footer = \{ padding: "14px 24px", borderTop: "1px solid \#eef2f7", display: "flex", gap: 8, alignItems: "center", flexShrink: 0, background: "\#fafbfc", flexWrap: "wrap" \};

const lbl = \{ fontSize: 11, fontWeight: 800, color: "\#475569", letterSpacing: 0\.5, marginBottom: 4, display: "block", textTransform: "uppercase" \};

const inp = \{ width: "100%", padding: "9px 12px", border: "1\.5px solid \#ddd", borderRadius: 8, fontSize: 13, boxSizing: "border\-box", marginBottom: 8 \};

const iconBtn = \{ background: "transparent", border: "none", cursor: "pointer", color: "\#64748b", padding: 6, borderRadius: 6, display: "flex" \};

const extractBanner = \{ display: "flex", alignItems: "center", gap: 10, background: "\#eff6ff", border: "1px solid \#93c5fd", borderRadius: 8, padding: "10px 14px", margin: "12px 0" \};

const btnPrimary = \(disabled\) => \(\{ background: disabled ? "\#cbd5e1" : GOLD, color: "\#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontWeight: 800, fontSize: 13, cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", gap: 6 \}\);

const btnSecondary = \(disabled\) => \(\{ background: disabled ? "\#f1f5f9" : "\#fff", color: disabled ? "\#94a3b8" : NAVY, border: \`1\.5px solid $\{disabled ? "\#e2e8f0" : NAVY\}\`, borderRadius: 8, padding: "9px 14px", fontWeight: 700, fontSize: 12, cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", gap: 6 \}\);

const btnGhost = \{ background: "transparent", color: "\#64748b", border: "1px solid \#e2e8f0", borderRadius: 8, padding: "9px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" \};

const smallBtn = \(disabled\) => \(\{ background: disabled ? "\#f1f5f9" : "\#fff", color: disabled ? "\#94a3b8" : NAVY, border: \`1px solid $\{disabled ? "\#e2e8f0" : "\#cbd5e1"\}\`, borderRadius: 6, padding: "7px 11px", fontWeight: 700, fontSize: 11, cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", gap: 4 \}\);

const smallBtnPrimary = \(disabled\) => \(\{ background: disabled ? "\#cbd5e1" : NAVY, color: "\#fff", border: "none", borderRadius: 6, padding: "7px 11px", fontWeight: 800, fontSize: 11, cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", gap: 4 \}\);
