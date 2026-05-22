# sitemanagerAI

Source: sitemanagerAI.docx

import \{ useState, useEffect, useContext \} from "react";

import \{ base44 \} from "@/api/base44Client";

import \{ ChevronDown, Plus, Trash2, Edit2, Image as ImageIcon, Video, Palette, Zap, Wand2 \} from "lucide\-react";

import ImageOptimizer from "@/components/ImageOptimizer";

import PageScoreAnalyzer from "@/components/PageScoreAnalyzer";

import LunaKnowledgeBase from "@/components/LunaKnowledgeBase";

import SiteAdvisor from "@/components/SiteAdvisor";

import \{ EditModeContext \} from "@/lib/EditModeContext";

import ElementEditor from "@/components/ElementEditor";

const NAVY = "\#0B1F45";

const GOLD = "\#D4A843";

const GREEN = "\#27ae60";

const inp = \{ width: "100%", padding: "10px 12px", border: "1\.5px solid \#e0e0e0", borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border\-box", fontFamily: "inherit" \};

export default function SiteManager\(\) \{

  const \{ editModeActive, setEditModeActive \} = useContext\(EditModeContext\);

  const \[pages, setPages\] = useState\(\[\]\);

  const \[images, setImages\] = useState\(\[\]\);

  const \[videos, setVideos\] = useState\(\[\]\);

  const \[components, setComponents\] = useState\(\[\]\);

  const \[loading, setLoading\] = useState\(true\);

  const \[expandedPage, setExpandedPage\] = useState\(null\);

  const \[activeTabs, setActiveTabs\] = useState\(\{\}\);

  const \[showImageOptimizer, setShowImageOptimizer\] = useState\(false\);

  const \[advisorData, setAdvisorData\] = useState\(null\);

  const \[editingPage, setEditingPage\] = useState\(null\);

  const \[editingImage, setEditingImage\] = useState\(null\);

  const \[editingVideo, setEditingVideo\] = useState\(null\);

  const \[newPage, setNewPage\] = useState\(\{ route: "", display\_name: "", seo\_title: "", seo\_description: "" \}\);

  const \[newImage, setNewImage\] = useState\(\{ page\_route: "", image\_url: "", alt\_text: "", seo\_title: "", description: "" \}\);

  const \[newVideo, setNewVideo\] = useState\(\{ page\_route: "", video\_url: "", video\_type: "mp4", video\_name: "", thumbnail\_url: "" \}\);

  const \[showNewPage, setShowNewPage\] = useState\(false\);

  const \[showNewImage, setShowNewImage\] = useState\(false\);

  const \[showNewVideo, setShowNewVideo\] = useState\(false\);

  useEffect\(\(\) => \{

    loadData\(\);

  \}, \[\]\);

  async function loadData\(\) \{

    try \{

      const \[pagesData, imagesData, videosData, componentsData\] = await Promise\.all\(\[

        base44\.entities\.Page\.list\(\)\.catch\(\(\) => \[\]\),

        base44\.entities\.PageImage\.list\(\)\.catch\(\(\) => \[\]\),

        base44\.entities\.PageVideo\.list\(\)\.catch\(\(\) => \[\]\),

        base44\.entities\.PageComponent\.list\(\)\.catch\(\(\) => \[\]\)

      \]\);

      setPages\(pagesData || \[\]\);

      setImages\(imagesData || \[\]\);

      setVideos\(videosData || \[\]\);

      setComponents\(componentsData || \[\]\);

    \} catch \(e\) \{

      console\.error\("Failed to load data:", e\);

    \} finally \{

      setLoading\(false\);

    \}

  \}

  async function handleSavePage\(page\) \{

    if \(\!page\.route\.trim\(\) || \!page\.display\_name\.trim\(\)\) return alert\("Route and name required"\);

    

    // Trigger advisor for page changes

    setAdvisorData\(\{

      changeType: editingPage?\.id ? "page\_update" : "page\_create",

      changeData: page,

      pageData: page

    \}\);

    try \{

      if \(editingPage?\.id\) \{

        await base44\.entities\.Page\.update\(editingPage\.id, page\);

      \} else \{

        await base44\.entities\.Page\.create\(page\);

      \}

      loadData\(\);

      setEditingPage\(null\);

      setNewPage\(\{ route: "", display\_name: "", seo\_title: "", seo\_description: "" \}\);

      setShowNewPage\(false\);

    \} catch \(e\) \{

      alert\("Failed to save page: " \+ e\.message\);

    \}

  \}

  async function handleDeletePage\(id\) \{

    if \(\!window\.confirm\("Delete this page?"\)\) return;

    try \{

      await base44\.entities\.Page\.delete\(id\);

      loadData\(\);

    \} catch \(e\) \{

      alert\("Failed to delete: " \+ e\.message\);

    \}

  \}

  async function handleSaveImage\(image\) \{

    if \(\!image\.page\_route\.trim\(\) || \!image\.image\_url\.trim\(\) || \!image\.alt\_text\.trim\(\)\) \{

      return alert\("Page, URL, and alt text required"\);

    \}

    try \{

      if \(editingImage?\.id\) \{

        await base44\.entities\.PageImage\.update\(editingImage\.id, image\);

      \} else \{

        await base44\.entities\.PageImage\.create\(image\);

      \}

      loadData\(\);

      setEditingImage\(null\);

      setNewImage\(\{ page\_route: "", image\_url: "", alt\_text: "", seo\_title: "", description: "" \}\);

      setShowNewImage\(false\);

    \} catch \(e\) \{

      alert\("Failed to save image: " \+ e\.message\);

    \}

  \}

  async function handleSaveVideo\(video\) \{

    if \(\!video\.page\_route\.trim\(\) || \!video\.video\_url\.trim\(\) || \!video\.video\_type\.trim\(\)\) \{

      return alert\("Page, URL, and type required"\);

    \}

    try \{

      if \(editingVideo?\.id\) \{

        await base44\.entities\.PageVideo\.update\(editingVideo\.id, video\);

      \} else \{

        await base44\.entities\.PageVideo\.create\(video\);

      \}

      loadData\(\);

      setEditingVideo\(null\);

      setNewVideo\(\{ page\_route: "", video\_url: "", video\_type: "mp4", video\_name: "", thumbnail\_url: "" \}\);

      setShowNewVideo\(false\);

    \} catch \(e\) \{

      alert\("Failed to save video: " \+ e\.message\);

    \}

  \}

  async function handleDeleteImage\(id\) \{

    if \(\!window\.confirm\("Delete this image?"\)\) return;

    try \{

      await base44\.entities\.PageImage\.delete\(id\);

      loadData\(\);

    \} catch \(e\) \{

      alert\("Failed to delete: " \+ e\.message\);

    \}

  \}

  async function handleDeleteVideo\(id\) \{

    if \(\!window\.confirm\("Delete this video?"\)\) return;

    try \{

      await base44\.entities\.PageVideo\.delete\(id\);

      loadData\(\);

    \} catch \(e\) \{

      alert\("Failed to delete: " \+ e\.message\);

    \}

  \}

  const pageImages = \(route\) => images\.filter\(img => img\.page\_route === route\);

  const pageVideos = \(route\) => videos\.filter\(v => v\.page\_route === route\);

  const pageComponents = \(route\) => components\.filter\(c => c\.page\_route === route\);

  async function handleSaveComponent\(comp\) \{

    if \(\!comp\.page\_route || \!comp\.component\_type || \!comp\.component\_name\) return alert\("Required fields missing"\);

    try \{

      if \(comp\.id\) \{

        await base44\.entities\.PageComponent\.update\(comp\.id, comp\);

      \} else \{

        await base44\.entities\.PageComponent\.create\(comp\);

      \}

      loadData\(\);

    \} catch \(e\) \{

      alert\("Failed to save component: " \+ e\.message\);

    \}

  \}

  async function handleDeleteComponent\(id\) \{

    if \(\!window\.confirm\("Delete this component?"\)\) return;

    try \{

      await base44\.entities\.PageComponent\.delete\(id\);

      loadData\(\);

    \} catch \(e\) \{

      alert\("Failed to delete: " \+ e\.message\);

    \}

  \}

  if \(loading\) return <div style=\{\{ padding: 40, textAlign: "center" \}\}>Loading\.\.\.</div>;

  return \(

    <div style=\{\{ fontFamily: "'Segoe UI', Arial, sans\-serif", background: "\#f5f5f5", minHeight: "100vh", padding: 24 \}\}>

      <div style=\{\{ maxWidth: 1400, margin: "0 auto" \}\}>

        <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 32 \}\}>

          <h1 style=\{\{ fontSize: 28, fontWeight: 900, color: NAVY, margin: 0 \}\}>🗺️ Site Manager</h1>

          <div style=\{\{ display: "flex", gap: 8 \}\}>

            <button

              onClick=\{\(\) => setEditModeActive\(\!editModeActive\)\}

              style=\{\{

                background: editModeActive ? GOLD : "\#f0f0f0",

                color: editModeActive ? "\#fff" : NAVY,

                border: "none",

                borderRadius: 6,

                padding: "10px 18px",

                cursor: "pointer",

                fontWeight: 700,

                fontSize: 13,

                display: "flex",

                alignItems: "center",

                gap: 6,

                transition: "all 0\.2s"

              \}\}

            >

              <Wand2 size=\{18\} /> \{editModeActive ? "Edit Mode ON" : "Edit Mode OFF"\}

            </button>

            <button

              onClick=\{\(\) => setShowImageOptimizer\(true\)\}

              style=\{\{ background: "\#f0f0f0", color: NAVY, border: "none", borderRadius: 6, padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 \}\}

            >

              <Zap size=\{18\} /> Image Optimizer

            </button>

            <button

              onClick=\{\(\) => setShowNewPage\(\!showNewPage\)\}

              style=\{\{ background: GOLD, color: "\#fff", border: "none", borderRadius: 6, padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 \}\}

            >

              <Plus size=\{18\} /> Add Page

            </button>

          </div>

        </div>

        \{/\* NEW PAGE FORM \*/\}

        \{showNewPage && \(

          <div style=\{\{ background: "\#fff", borderRadius: 10, padding: 20, marginBottom: 24, border: \`2px solid $\{GOLD\}\` \}\}>

            <h2 style=\{\{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 14, margin: 0 \}\}>Add New Page</h2>

            <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 \}\}>

              <div>

                <label style=\{\{ fontSize: 12, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>Route \*</label>

                <input style=\{inp\} placeholder="/MyPage" value=\{newPage\.route\} onChange=\{e => setNewPage\(\{ \.\.\.newPage, route: e\.target\.value \}\)\} />

              </div>

              <div>

                <label style=\{\{ fontSize: 12, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>Display Name \*</label>

                <input style=\{inp\} placeholder="My Page" value=\{newPage\.display\_name\} onChange=\{e => setNewPage\(\{ \.\.\.newPage, display\_name: e\.target\.value \}\)\} />

              </div>

              <div style=\{\{ gridColumn: "1/\-1" \}\}>

                <label style=\{\{ fontSize: 12, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>SEO Title</label>

                <input style=\{inp\} placeholder="Page title \(50\-60 chars\)" value=\{newPage\.seo\_title\} onChange=\{e => setNewPage\(\{ \.\.\.newPage, seo\_title: e\.target\.value \}\)\} />

              </div>

              <div style=\{\{ gridColumn: "1/\-1" \}\}>

                <label style=\{\{ fontSize: 12, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>SEO Description</label>

                <textarea style=\{\{ \.\.\.inp, minHeight: 60, resize: "vertical" \}\} placeholder="Meta description \(150\-160 chars\)" value=\{newPage\.seo\_description\} onChange=\{e => setNewPage\(\{ \.\.\.newPage, seo\_description: e\.target\.value \}\)\} />

              </div>

            </div>

            <div style=\{\{ display: "flex", gap: 8 \}\}>

              <button

                onClick=\{\(\) => handleSavePage\(newPage\)\}

                style=\{\{ flex: 1, background: GREEN, color: "\#fff", border: "none", borderRadius: 6, padding: 10, fontWeight: 700, cursor: "pointer", fontSize: 13 \}\}

              >

                ✅ Save Page

              </button>

              <button

                onClick=\{\(\) => \{ setShowNewPage\(false\); setNewPage\(\{ route: "", display\_name: "", seo\_title: "", seo\_description: "" \}\); \}\}

                style=\{\{ background: "\#eee", color: "\#333", border: "none", borderRadius: 6, padding: 10, cursor: "pointer", fontWeight: 700 \}\}

              >

                Cancel

              </button>

            </div>

          </div>

        \)\}

        \{/\* LUNA'S KNOWLEDGE BASE \*/\}

        <div style=\{\{ marginBottom: 24 \}\}>

          <LunaKnowledgeBase />

        </div>

        \{/\* SCORE ANALYZER \*/\}

        <div style=\{\{ marginBottom: 24 \}\}>

          <PageScoreAnalyzer pages=\{pages\} />

        </div>

        \{/\* PAGES LIST \*/\}

        <div style=\{\{ background: "\#fff", borderRadius: 10, boxShadow: "0 1px 4px rgba\(0,0,0,0\.1\)" \}\}>

          <div style=\{\{ padding: 20, borderBottom: "1px solid \#e0e0e0" \}\}>

            <h2 style=\{\{ fontSize: 16, fontWeight: 800, color: NAVY, margin: 0 \}\}>Pages \(\{pages\.length\}\)</h2>

          </div>

          <div style=\{\{ maxHeight: "900px", overflowY: "auto" \}\}>

            \{pages\.length === 0 ? \(

              <div style=\{\{ padding: 20, color: "\#888", textAlign: "center" \}\}>No pages yet\. Create your first page\!</div>

            \) : \(

              pages\.map\(page => \(

                <div key=\{page\.id\} style=\{\{ borderBottom: "1px solid \#e0e0e0" \}\}>

                  \{/\* PAGE HEADER \*/\}

                  <div style=\{\{ padding: 16, display: "flex", justifyContent: "space\-between", alignItems: "center", cursor: "pointer", background: expandedPage === page\.id ? "\#f9f9f9" : "\#fff" \}\} onClick=\{\(\) => setExpandedPage\(expandedPage === page\.id ? null : page\.id\)\}>

                    <div style=\{\{ flex: 1 \}\}>

                      <div style=\{\{ fontWeight: 700, fontSize: 14, color: NAVY \}\}>\{page\.display\_name\}</div>

                      <div style=\{\{ fontSize: 12, color: "\#888", marginTop: 2 \}\}>\{page\.route\}</div>

                    </div>

                    <div style=\{\{ display: "flex", gap: 8, alignItems: "center" \}\}>

                      <button

                        onClick=\{\(e\) => \{ e\.stopPropagation\(\); setEditingPage\(page\); setShowNewPage\(false\); \}\}

                        style=\{\{ background: "\#f0f0f0", border: "none", borderRadius: 4, padding: "6px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600 \}\}

                      >

                        <Edit2 size=\{14\} />

                      </button>

                      <button

                        onClick=\{\(e\) => \{ e\.stopPropagation\(\); handleDeletePage\(page\.id\); \}\}

                        style=\{\{ background: "\#ffe0e0", border: "none", borderRadius: 4, padding: "6px 10px", cursor: "pointer", color: "\#c0392b", fontSize: 12, fontWeight: 600 \}\}

                      >

                        <Trash2 size=\{14\} />

                      </button>

                      <ChevronDown size=\{18\} style=\{\{ transition: "transform 0\.2s", transform: expandedPage === page\.id ? "rotate\(180deg\)" : "" \}\} />

                    </div>

                  </div>

                  \{/\* EXPANDED SECTION \*/\}

                  \{expandedPage === page\.id && \(

                    <div style=\{\{ padding: 16, background: "\#f9f9f9", borderTop: "1px solid \#e0e0e0" \}\}>

                      \{/\* TABS \*/\}

                      <div style=\{\{ display: "flex", gap: 8, marginBottom: 16, borderBottom: "2px solid \#e0e0e0", paddingBottom: 8, overflowX: "auto" \}\}>

                        \{\[

                          \{ id: "general", label: "General Info", icon: "📝" \},

                          \{ id: "colors", label: "Colors", icon: "🎨" \},

                          \{ id: "images", label: "Images", icon: "🖼️" \},

                          \{ id: "videos", label: "Videos", icon: "🎬" \},

                          \{ id: "components", label: "Components", icon: "🧩" \}

                        \]\.map\(t => \(

                          <button

                            key=\{t\.id\}

                            onClick=\{\(\) => setActiveTabs\(\{ \.\.\.activeTabs, \[page\.id\]: t\.id \}\)\}

                            style=\{\{

                              background: \(activeTabs\[page\.id\] || "general"\) === t\.id ? GOLD : "\#fff",

                              color: \(activeTabs\[page\.id\] || "general"\) === t\.id ? "\#fff" : "\#555",

                              border: "none",

                              borderRadius: 4,

                              padding: "8px 14px",

                              cursor: "pointer",

                              fontWeight: 600,

                              fontSize: 12

                            \}\}

                          >

                            \{t\.icon\} \{t\.label\}

                          </button>

                        \)\)\}

                      </div>

                      \{/\* TAB: GENERAL \*/\}

                      \{\(activeTabs\[page\.id\] || "general"\) === "general" && editingPage?\.id === page\.id && \(

                        <div>

                          <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 \}\}>

                            <div>

                              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>Display Name</label>

                              <input style=\{inp\} value=\{editingPage\.display\_name || ""\} onChange=\{e => setEditingPage\(\{ \.\.\.editingPage, display\_name: e\.target\.value \}\)\} />

                            </div>

                            <div>

                              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>Route</label>

                              <input style=\{\{ \.\.\.inp, background: "\#f0f0f0" \}\} value=\{editingPage\.route || ""\} disabled />

                            </div>

                            <div style=\{\{ gridColumn: "1/\-1" \}\}>

                              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>SEO Title</label>

                              <input style=\{inp\} value=\{editingPage\.seo\_title || ""\} onChange=\{e => setEditingPage\(\{ \.\.\.editingPage, seo\_title: e\.target\.value \}\)\} />

                            </div>

                            <div style=\{\{ gridColumn: "1/\-1" \}\}>

                              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>SEO Description</label>

                              <textarea style=\{\{ \.\.\.inp, minHeight: 50, resize: "vertical" \}\} value=\{editingPage\.seo\_description || ""\} onChange=\{e => setEditingPage\(\{ \.\.\.editingPage, seo\_description: e\.target\.value \}\)\} />

                            </div>

                          </div>

                          <div style=\{\{ display: "flex", gap: 8 \}\}>

                            <button onClick=\{\(\) => handleSavePage\(editingPage\)\} style=\{\{ flex: 1, background: GREEN, color: "\#fff", border: "none", borderRadius: 4, padding: 8, fontWeight: 700, cursor: "pointer", fontSize: 12 \}\}>✅ Save</button>

                            <button onClick=\{\(\) => setEditingPage\(null\)\} style=\{\{ background: "\#eee", border: "none", borderRadius: 4, padding: 8, cursor: "pointer", fontWeight: 700, fontSize: 12 \}\}>Cancel</button>

                          </div>

                        </div>

                      \)\}

                      \{/\* TAB: COLORS \*/\}

                      \{\(activeTabs\[page\.id\] || "general"\) === "colors" && editingPage?\.id === page\.id && \(

                        <div>

                          <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 \}\}>

                            \{\[

                              \{ key: "primary\_color", label: "Primary Color" \},

                              \{ key: "secondary\_color", label: "Secondary Color" \},

                              \{ key: "accent\_color", label: "Accent Color" \},

                              \{ key: "background\_color", label: "Background Color" \},

                              \{ key: "text\_color", label: "Text Color" \}

                            \]\.map\(c => \(

                              <div key=\{c\.key\}>

                                <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>\{c\.label\}</label>

                                <div style=\{\{ display: "flex", gap: 8 \}\}>

                                  <input

                                    type="color"

                                    value=\{editingPage\[c\.key\] || "\#000000"\}

                                    onChange=\{e => setEditingPage\(\{ \.\.\.editingPage, \[c\.key\]: e\.target\.value \}\)\}

                                    style=\{\{ width: 50, height: 40, border: "1px solid \#ddd", borderRadius: 4, cursor: "pointer" \}\}

                                  />

                                  <input

                                    type="text"

                                    value=\{editingPage\[c\.key\] || ""\}

                                    onChange=\{e => setEditingPage\(\{ \.\.\.editingPage, \[c\.key\]: e\.target\.value \}\)\}

                                    placeholder="\#000000"

                                    style=\{\{ \.\.\.inp, flex: 1 \}\}

                                  />

                                </div>

                              </div>

                            \)\)\}

                          </div>

                          <div style=\{\{ display: "flex", gap: 8 \}\}>

                            <button onClick=\{\(\) => handleSavePage\(editingPage\)\} style=\{\{ flex: 1, background: GREEN, color: "\#fff", border: "none", borderRadius: 4, padding: 8, fontWeight: 700, cursor: "pointer", fontSize: 12 \}\}>✅ Save Colors</button>

                            <button onClick=\{\(\) => setEditingPage\(null\)\} style=\{\{ background: "\#eee", border: "none", borderRadius: 4, padding: 8, cursor: "pointer", fontWeight: 700, fontSize: 12 \}\}>Cancel</button>

                          </div>

                        </div>

                      \)\}

                      \{/\* TAB: HERO MEDIA \*/\}

                      \{\(activeTabs\[page\.id\] || "general"\) === "colors" && editingPage?\.id === page\.id && \(

                        <div style=\{\{ marginTop: 16, paddingTop: 16, borderTop: "2px solid \#e0e0e0" \}\}>

                          <h4 style=\{\{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 12 \}\}>Hero Media</h4>

                          <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 \}\}>

                            <div>

                              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>Hero Image URL</label>

                              <input style=\{inp\} value=\{editingPage\.hero\_image\_url || ""\} onChange=\{e => setEditingPage\(\{ \.\.\.editingPage, hero\_image\_url: e\.target\.value \}\)\} placeholder="https://\.\.\." />

                            </div>

                            <div>

                              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 4 \}\}>Hero Video URL</label>

                              <input style=\{inp\} value=\{editingPage\.hero\_video\_url || ""\} onChange=\{e => setEditingPage\(\{ \.\.\.editingPage, hero\_video\_url: e\.target\.value \}\)\} placeholder="https://\.\.\." />

                            </div>

                          </div>

                          <div style=\{\{ display: "flex", gap: 8 \}\}>

                            <button onClick=\{\(\) => handleSavePage\(editingPage\)\} style=\{\{ flex: 1, background: GREEN, color: "\#fff", border: "none", borderRadius: 4, padding: 8, fontWeight: 700, cursor: "pointer", fontSize: 12 \}\}>✅ Save</button>

                            <button onClick=\{\(\) => setEditingPage\(null\)\} style=\{\{ background: "\#eee", border: "none", borderRadius: 4, padding: 8, cursor: "pointer", fontWeight: 700, fontSize: 12 \}\}>Cancel</button>

                          </div>

                        </div>

                      \)\}

                      \{/\* TAB: IMAGES \*/\}

                      \{\(activeTabs\[page\.id\] || "general"\) === "images" && \(

                        <div>

                          <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 12 \}\}>

                            <h4 style=\{\{ fontSize: 12, fontWeight: 800, color: NAVY, margin: 0, display: "flex", alignItems: "center", gap: 6 \}\}>

                              <ImageIcon size=\{16\} /> Images \(\{pageImages\(page\.route\)\.length\}\)

                            </h4>

                            <button

                              onClick=\{\(\) => \{ setShowNewImage\(true\); setNewImage\(\{ \.\.\.newImage, page\_route: page\.route \}\); \}\}

                              style=\{\{ background: GOLD, color: "\#fff", border: "none", borderRadius: 4, padding: "4px 12px", cursor: "pointer", fontWeight: 600, fontSize: 11, display: "flex", alignItems: "center", gap: 4 \}\}

                            >

                              <Plus size=\{14\} /> Add Image

                            </button>

                          </div>

                          \{pageImages\(page\.route\)\.length === 0 ? \(

                            <p style=\{\{ fontSize: 12, color: "\#888", margin: 0 \}\}>No images for this page</p>

                          \) : \(

                            <div style=\{\{ display: "grid", gap: 10 \}\}>

                              \{pageImages\(page\.route\)\.map\(img => \(

                                <div key=\{img\.id\} style=\{\{ background: "\#fff", border: "1px solid \#e0e0e0", borderRadius: 6, padding: 12 \}\}>

                                  <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "start" \}\}>

                                    <div style=\{\{ flex: 1 \}\}>

                                      <div style=\{\{ fontSize: 11, fontWeight: 700, color: NAVY \}\}>\{img\.image\_name || "Image"\}</div>

                                      <div style=\{\{ fontSize: 10, color: "\#888", marginTop: 2, wordBreak: "break\-all" \}\}>\{img\.image\_url\}</div>

                                      <div style=\{\{ fontSize: 10, color: "\#666", marginTop: 4 \}\}><strong>Alt:</strong> \{img\.alt\_text\}</div>

                                    </div>

                                    <div style=\{\{ display: "flex", gap: 6 \}\}>

                                      <button onClick=\{\(\) => setEditingImage\(img\)\} style=\{\{ background: "\#f0f0f0", border: "none", borderRadius: 4, padding: 6, cursor: "pointer" \}\}>✏️</button>

                                      <button onClick=\{\(\) => handleDeleteImage\(img\.id\)\} style=\{\{ background: "\#ffe0e0", border: "none", borderRadius: 4, padding: 6, cursor: "pointer", color: "\#c0392b" \}\}>🗑️</button>

                                    </div>

                                  </div>

                                </div>

                              \)\)\}

                            </div>

                          \)\}

                          \{editingImage && editingImage\.page\_route === page\.route && \(

                           <div style=\{\{ marginTop: 12, padding: 12, background: "\#fff", border: \`2px solid $\{GOLD\}\`, borderRadius: 6 \}\}>

                             <div style=\{\{ display: "grid", gap: 10, marginBottom: 10 \}\}>

                               <div>

                                 <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Image URL or Upload \*</label>

                                 <div style=\{\{ display: "flex", gap: 8 \}\}>

                                   <input style=\{\{ \.\.\.inp, flex: 1 \}\} placeholder="https://\.\.\. or click Upload" value=\{editingImage\.image\_url\} onChange=\{e => setEditingImage\(\{ \.\.\.editingImage, image\_url: e\.target\.value \}\)\} readOnly=\{editingImage\.image\_url\.startsWith\("https://media\.base44\.com"\)\} />

                                    <input

                                      type="file"

                                      accept="image/\*"

                                      onChange=\{async \(e\) => \{

                                       const file = e\.target\.files?\.\[0\];

                                       if \(file\) \{

                                         try \{

                                           const res = await base44\.integrations\.Core\.UploadFile\(\{ file \}\);

                                           setEditingImage\(\{ \.\.\.editingImage, image\_url: res\.file\_url \}\);

                                         \} catch \(err\) \{

                                           alert\("Upload failed: " \+ err\.message\);

                                         \}

                                       \}

                                      \}\}

                                      style=\{\{ display: "none" \}\}

                                      id=\{\`img\-upload\-edit\-$\{editingImage\.id\}\`\}

                                    />

                                    <label

                                      htmlFor=\{\`img\-upload\-edit\-$\{editingImage\.id\}\`\}

                                      style=\{\{ background: GOLD, color: "\#fff", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 11, whiteSpace: "nowrap" \}\}

                                    >

                                      📤 Upload

                                    </label>

                                    </div>

                                    </div>

                                    <div>

                                    <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Alt Text \*</label>

                                    <input style=\{inp\} placeholder="Descriptive alt text" value=\{editingImage\.alt\_text\} onChange=\{e => setEditingImage\(\{ \.\.\.editingImage, alt\_text: e\.target\.value \}\)\} />

                                    </div>

                                    <div>

                                    <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Image Name</label>

                                    <input style=\{inp\} placeholder="Image name" value=\{editingImage\.image\_name || ""\} onChange=\{e => setEditingImage\(\{ \.\.\.editingImage, image\_name: e\.target\.value \}\)\} />

                                    </div>

                                    </div>

                                    <div style=\{\{ display: "flex", gap: 6 \}\}>

                                    <button onClick=\{\(\) => handleSaveImage\(editingImage\)\} style=\{\{ flex: 1, background: GREEN, color: "\#fff", border: "none", borderRadius: 4, padding: 8, fontWeight: 700, cursor: "pointer", fontSize: 12 \}\}>✅ Save</button>

                                    <button onClick=\{\(\) => setEditingImage\(null\)\} style=\{\{ background: "\#eee", border: "none", borderRadius: 4, padding: 8, cursor: "pointer", fontWeight: 700, fontSize: 12 \}\}>Cancel</button>

                                    </div>

                                    </div>

                                    \)\}

                        </div>

                      \)\}

                      \{/\* TAB: COMPONENTS \*/\}

                      \{\(activeTabs\[page\.id\] || "general"\) === "components" && \(

                        <div>

                          <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 12 \}\}>

                            <h4 style=\{\{ fontSize: 12, fontWeight: 800, color: NAVY, margin: 0 \}\}>Page Components \(\{pageComponents\(page\.route\)\.length\}\)</h4>

                            <button

                              onClick=\{\(\) => setEditingPage\(\{ \.\.\.page, \_newComponent: \{ page\_route: page\.route, component\_type: "section", component\_name: "" \} \}\)\}

                              style=\{\{ background: GOLD, color: "\#fff", border: "none", borderRadius: 4, padding: "4px 12px", cursor: "pointer", fontWeight: 600, fontSize: 11, display: "flex", alignItems: "center", gap: 4 \}\}

                            >

                              <Plus size=\{14\} /> Add Component

                            </button>

                          </div>

                          \{pageComponents\(page\.route\)\.length === 0 ? \(

                            <p style=\{\{ fontSize: 12, color: "\#888", margin: 0 \}\}>No components on this page</p>

                          \) : \(

                            <div style=\{\{ display: "grid", gap: 10 \}\}>

                              \{pageComponents\(page\.route\)\.map\(comp => \(

                                <div key=\{comp\.id\} style=\{\{ background: "\#fff", border: "1px solid \#e0e0e0", borderRadius: 6, padding: 12 \}\}>

                                  <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "start" \}\}>

                                    <div style=\{\{ flex: 1 \}\}>

                                      <div style=\{\{ fontSize: 11, fontWeight: 700, color: NAVY \}\}>\{comp\.component\_name\}</div>

                                      <div style=\{\{ fontSize: 10, color: "\#888", marginTop: 2 \}\}>Type: <strong>\{comp\.component\_type\}</strong></div>

                                      \{comp\.title && <div style=\{\{ fontSize: 10, color: "\#666", marginTop: 2 \}\}>Title: \{comp\.title\}</div>\}

                                    </div>

                                    <div style=\{\{ display: "flex", gap: 6 \}\}>

                                      <button onClick=\{\(\) => setEditingPage\(\{ \.\.\.page, \_editComponent: comp \}\)\} style=\{\{ background: "\#f0f0f0", border: "none", borderRadius: 4, padding: 6, cursor: "pointer" \}\}>✏️</button>

                                      <button onClick=\{\(\) => handleDeleteComponent\(comp\.id\)\} style=\{\{ background: "\#ffe0e0", border: "none", borderRadius: 4, padding: 6, cursor: "pointer", color: "\#c0392b" \}\}>🗑️</button>

                                    </div>

                                  </div>

                                </div>

                              \)\)\}

                            </div>

                          \)\}

                          \{editingPage?\.\_newComponent?\.page\_route === page\.route && \(

                            <ComponentBuilder

                              component=\{editingPage\.\_newComponent\}

                              onSave=\{\(comp\) => \{

                                handleSaveComponent\(comp\);

                                setEditingPage\(\{ \.\.\.editingPage, \_newComponent: null \}\);

                              \}\}

                              onCancel=\{\(\) => setEditingPage\(\{ \.\.\.editingPage, \_newComponent: null \}\)\}

                            />

                          \)\}

                        </div>

                      \)\}

                      \{/\* TAB: VIDEOS \*/\}

                      \{\(activeTabs\[page\.id\] || "general"\) === "videos" && \(

                        <div>

                          <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 12 \}\}>

                            <h4 style=\{\{ fontSize: 12, fontWeight: 800, color: NAVY, margin: 0, display: "flex", alignItems: "center", gap: 6 \}\}>

                              <Video size=\{16\} /> Videos \(\{pageVideos\(page\.route\)\.length\}\)

                            </h4>

                            <button

                              onClick=\{\(\) => \{ setShowNewVideo\(true\); setNewVideo\(\{ \.\.\.newVideo, page\_route: page\.route \}\); \}\}

                              style=\{\{ background: GOLD, color: "\#fff", border: "none", borderRadius: 4, padding: "4px 12px", cursor: "pointer", fontWeight: 600, fontSize: 11, display: "flex", alignItems: "center", gap: 4 \}\}

                            >

                              <Plus size=\{14\} /> Add Video

                            </button>

                          </div>

                          \{pageVideos\(page\.route\)\.length === 0 ? \(

                            <p style=\{\{ fontSize: 12, color: "\#888", margin: 0 \}\}>No videos for this page</p>

                          \) : \(

                            <div style=\{\{ display: "grid", gap: 10 \}\}>

                              \{pageVideos\(page\.route\)\.map\(vid => \(

                                <div key=\{vid\.id\} style=\{\{ background: "\#fff", border: "1px solid \#e0e0e0", borderRadius: 6, padding: 12 \}\}>

                                  <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "start" \}\}>

                                    <div style=\{\{ flex: 1 \}\}>

                                      <div style=\{\{ fontSize: 11, fontWeight: 700, color: NAVY \}\}>\{vid\.video\_name || "Video"\}</div>

                                      <div style=\{\{ fontSize: 10, color: "\#888", marginTop: 2, wordBreak: "break\-all" \}\}>\{vid\.video\_url\}</div>

                                      <div style=\{\{ fontSize: 10, color: "\#666", marginTop: 4 \}\}><strong>Type:</strong> \{vid\.video\_type\}</div>

                                    </div>

                                    <div style=\{\{ display: "flex", gap: 6 \}\}>

                                      <button onClick=\{\(\) => setEditingVideo\(vid\)\} style=\{\{ background: "\#f0f0f0", border: "none", borderRadius: 4, padding: 6, cursor: "pointer" \}\}>✏️</button>

                                      <button onClick=\{\(\) => handleDeleteVideo\(vid\.id\)\} style=\{\{ background: "\#ffe0e0", border: "none", borderRadius: 4, padding: 6, cursor: "pointer", color: "\#c0392b" \}\}>🗑️</button>

                                    </div>

                                  </div>

                                </div>

                              \)\)\}

                            </div>

                          \)\}

                          \{editingVideo && editingVideo\.page\_route === page\.route && \(

                           <div style=\{\{ marginTop: 12, padding: 12, background: "\#fff", border: \`2px solid $\{GOLD\}\`, borderRadius: 6 \}\}>

                             <div style=\{\{ display: "grid", gap: 10, marginBottom: 10 \}\}>

                               <div>

                                 <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Video URL or Upload \*</label>

                                 <div style=\{\{ display: "flex", gap: 8 \}\}>

                                   <input

                                     style=\{\{ \.\.\.inp, flex: 1 \}\}

                                     placeholder="https://\.\.\. or click Upload"

                                     value=\{editingVideo\.video\_url\}

                                     onChange=\{e => setEditingVideo\(\{ \.\.\.editingVideo, video\_url: e\.target\.value \}\)\}

                                     readOnly=\{editingVideo\.video\_url\.startsWith\("https://media\.base44\.com"\)\}

                                   />

                                    <input

                                      type="file"

                                      accept="video/\*"

                                      onChange=\{async \(e\) => \{

                                       const file = e\.target\.files?\.\[0\];

                                       if \(file\) \{

                                         try \{

                                           const res = await base44\.integrations\.Core\.UploadFile\(\{ file \}\);

                                           setEditingVideo\(\{ \.\.\.editingVideo, video\_url: res\.file\_url, video\_type: "mp4" \}\);

                                         \} catch \(err\) \{

                                           alert\("Upload failed: " \+ err\.message\);

                                         \}

                                       \}

                                      \}\}

                                      style=\{\{ display: "none" \}\}

                                      id=\{\`vid\-upload\-edit\-$\{editingVideo\.id\}\`\}

                                    />

                                    <label

                                      htmlFor=\{\`vid\-upload\-edit\-$\{editingVideo\.id\}\`\}

                                      style=\{\{ background: GOLD, color: "\#fff", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 11, whiteSpace: "nowrap" \}\}

                                    >

                                      📤 Upload

                                    </label>

                                    </div>

                                    </div>

                                    <div>

                                    <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Video Type \*</label>

                                    <select style=\{inp\} value=\{editingVideo\.video\_type\} onChange=\{e => setEditingVideo\(\{ \.\.\.editingVideo, video\_type: e\.target\.value \}\)\}>

                                    <option value="mp4">MP4</option>

                                    <option value="youtube">YouTube</option>

                                    <option value="vimeo">Vimeo</option>

                                    <option value="other">Other</option>

                                    </select>

                                    </div>

                                    <div>

                                    <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Video Name</label>

                                    <input style=\{inp\} placeholder="Video name" value=\{editingVideo\.video\_name\} onChange=\{e => setEditingVideo\(\{ \.\.\.editingVideo, video\_name: e\.target\.value \}\)\} />

                                    </div>

                                    <div>

                                    <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Thumbnail URL</label>

                                    <input style=\{inp\} placeholder="https://\.\.\." value=\{editingVideo\.thumbnail\_url || ""\} onChange=\{e => setEditingVideo\(\{ \.\.\.editingVideo, thumbnail\_url: e\.target\.value \}\)\} />

                                    </div>

                                    </div>

                                    <div style=\{\{ display: "flex", gap: 6 \}\}>

                                    <button onClick=\{\(\) => handleSaveVideo\(editingVideo\)\} style=\{\{ flex: 1, background: GREEN, color: "\#fff", border: "none", borderRadius: 4, padding: 8, fontWeight: 700, cursor: "pointer", fontSize: 12 \}\}>✅ Save</button>

                                    <button onClick=\{\(\) => setEditingVideo\(null\)\} style=\{\{ background: "\#eee", border: "none", borderRadius: 4, padding: 8, cursor: "pointer", fontWeight: 700, fontSize: 12 \}\}>Cancel</button>

                                    </div>

                                    </div>

                                    \)\}

                        </div>

                      \)\}

                    </div>

                  \)\}

                </div>

              \)\)

            \)\}

          </div>

        </div>

      </div>

      \{showImageOptimizer && <ImageOptimizer onClose=\{\(\) => setShowImageOptimizer\(false\)\} onOptimized=\{\(url\) => \{ /\* handle optimized image \*/ \}\} />\}

      

      \{advisorData && <SiteAdvisor \{\.\.\.advisorData\} onClose=\{\(\) => setAdvisorData\(null\)\} />\}

      \{editModeActive && <ElementEditor />\}

    </div>

  \);

\}

function ComponentBuilder\(\{ component, onSave, onCancel \}\) \{

  const \[comp, setComp\] = useState\(component\);

  const GOLD = "\#D4A843";

  const GREEN = "\#27ae60";

  const inp = \{ width: "100%", padding: "10px 12px", border: "1\.5px solid \#e0e0e0", borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border\-box" \};

  const componentTypes = \["section", "form", "carousel", "reviews", "popup", "newsletter", "testimonial", "pricing\_table", "feature\_grid", "cta\_button", "countdown", "accordion", "faq"\];

  return \(

    <div style=\{\{ marginTop: 12, padding: 12, background: "\#fff", border: \`2px solid $\{GOLD\}\`, borderRadius: 6 \}\}>

      <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 \}\}>

        <div>

          <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Component Name \*</label>

          <input style=\{inp\} placeholder="My Section" value=\{comp\.component\_name\} onChange=\{e => setComp\(\{ \.\.\.comp, component\_name: e\.target\.value \}\)\} />

        </div>

        <div>

          <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Type \*</label>

          <select style=\{inp\} value=\{comp\.component\_type\} onChange=\{e => setComp\(\{ \.\.\.comp, component\_type: e\.target\.value \}\)\}>

            \{componentTypes\.map\(t => <option key=\{t\} value=\{t\}>\{t\}</option>\)\}

          </select>

        </div>

        <div style=\{\{ gridColumn: "1/\-1" \}\}>

          <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Title</label>

          <input style=\{inp\} placeholder="Component title" value=\{comp\.title || ""\} onChange=\{e => setComp\(\{ \.\.\.comp, title: e\.target\.value \}\)\} />

        </div>

        <div style=\{\{ gridColumn: "1/\-1" \}\}>

          <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Description</label>

          <textarea style=\{\{ \.\.\.inp, minHeight: 40, resize: "vertical" \}\} placeholder="Component content" value=\{comp\.description || ""\} onChange=\{e => setComp\(\{ \.\.\.comp, description: e\.target\.value \}\)\} />

        </div>

        <div>

          <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Background Color</label>

          <input type="color" value=\{comp\.background\_color || "\#ffffff"\} onChange=\{e => setComp\(\{ \.\.\.comp, background\_color: e\.target\.value \}\)\} style=\{\{ width: "100%", height: 35, border: "1px solid \#ddd", borderRadius: 4 \}\} />

        </div>

        <div>

          <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Text Color</label>

          <input type="color" value=\{comp\.text\_color || "\#000000"\} onChange=\{e => setComp\(\{ \.\.\.comp, text\_color: e\.target\.value \}\)\} style=\{\{ width: "100%", height: 35, border: "1px solid \#ddd", borderRadius: 4 \}\} />

        </div>

        <div>

          <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Button Text</label>

          <input style=\{inp\} placeholder="Click me" value=\{comp\.button\_text || ""\} onChange=\{e => setComp\(\{ \.\.\.comp, button\_text: e\.target\.value \}\)\} />

        </div>

        <div>

          <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 3 \}\}>Button URL</label>

          <input style=\{inp\} placeholder="https://\.\.\." value=\{comp\.link\_url || ""\} onChange=\{e => setComp\(\{ \.\.\.comp, link\_url: e\.target\.value \}\)\} />

        </div>

      </div>

      <div style=\{\{ display: "flex", gap: 6 \}\}>

        <button onClick=\{\(\) => onSave\(comp\)\} style=\{\{ flex: 1, background: GREEN, color: "\#fff", border: "none", borderRadius: 4, padding: 8, fontWeight: 700, cursor: "pointer", fontSize: 12 \}\}>✅ Save</button>

        <button onClick=\{onCancel\} style=\{\{ background: "\#eee", border: "none", borderRadius: 4, padding: 8, cursor: "pointer", fontWeight: 700, fontSize: 12 \}\}>Cancel</button>

      </div>

    </div>

  \);

\}
