# New Microsoft Word Document (41)

Source: New Microsoft Word Document (41).docx

import \{ useState, useEffect, useRef, useCallback \} from 'react';

import \{ base44 \} from '@/api/base44Client';

const CATEGORIES = \['All', 'Contracts', 'Deals', 'Marketing', 'Legal', 'Finance', 'Operations', 'Personal', 'Other'\];

const EXT\_ICONS = \{

  pdf: '📄', doc: '📝', docx: '📝', txt: '📃', md: '📃',

  xls: '📊', xlsx: '📊', csv: '📊',

  jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', webp: '🖼️',

  mp4: '🎬', mov: '🎬', avi: '🎬',

  mp3: '🎵', wav: '🎵',

  zip: '📦', rar: '📦',

\};

function getIcon\(fileName, fileType\) \{

  const ext = fileName?\.split\('\.'\)\.pop\(\)?\.toLowerCase\(\) || '';

  return EXT\_ICONS\[ext\] || \(fileType?\.startsWith\('image'\) ? '🖼️' : '📁'\);

\}

function isTextEditable\(fileName\) \{

  const ext = fileName?\.split\('\.'\)\.pop\(\)?\.toLowerCase\(\) || '';

  return \['txt', 'md', 'csv', 'html', 'json', 'js', 'jsx', 'ts', 'tsx'\]\.includes\(ext\);

\}

function fmtSize\(bytes\) \{

  if \(\!bytes\) return '';

  if \(bytes < 1024\) return bytes \+ ' B';

  if \(bytes < 1024 \* 1024\) return \(bytes / 1024\)\.toFixed\(1\) \+ ' KB';

  return \(bytes / \(1024 \* 1024\)\)\.toFixed\(1\) \+ ' MB';

\}

function fmtDate\(iso\) \{

  if \(\!iso\) return '';

  return new Date\(iso\)\.toLocaleDateString\('en\-US', \{ month: 'short', day: 'numeric', year: 'numeric' \}\);

\}

export default function FileVault\(\) \{

  const \[docs, setDocs\] = useState\(\[\]\);

  const \[loading, setLoading\] = useState\(true\);

  const \[search, setSearch\] = useState\(''\);

  const \[category, setCategory\] = useState\('All'\);

  const \[uploading, setUploading\] = useState\(false\);

  const \[selected, setSelected\] = useState\(null\);

  const \[editing, setEditing\] = useState\(false\);

  const \[editContent, setEditContent\] = useState\(''\);

  const \[editTitle, setEditTitle\] = useState\(''\);

  const \[editCategory, setEditCategory\] = useState\(''\);

  const \[editNotes, setEditNotes\] = useState\(''\);

  const \[editTags, setEditTags\] = useState\(''\);

  const \[saving, setSaving\] = useState\(false\);

  const \[dragOver, setDragOver\] = useState\(false\);

  const \[newDocModal, setNewDocModal\] = useState\(false\);

  const \[newDocTitle, setNewDocTitle\] = useState\(''\);

  const \[newDocCategory, setNewDocCategory\] = useState\('Other'\);

  const \[newDocContent, setNewDocContent\] = useState\(''\);

  const fileRef = useRef\(\);

  const load = useCallback\(async \(\) => \{

    setLoading\(true\);

    const data = await base44\.entities\.StoredDocument\.list\('\-created\_date', 200\);

    setDocs\(data || \[\]\);

    setLoading\(false\);

  \}, \[\]\);

  useEffect\(\(\) => \{ load\(\); \}, \[load\]\);

  const handleUpload = async \(files\) => \{

    if \(\!files?\.length\) return;

    setUploading\(true\);

    for \(const file of Array\.from\(files\)\) \{

      try \{

        const \{ file\_url \} = await base44\.integrations\.Core\.UploadFile\(\{ file \}\);

        await base44\.entities\.StoredDocument\.create\(\{

          title: file\.name\.replace\(/\\\.\[^/\.\]\+$/, ''\),

          file\_url,

          file\_name: file\.name,

          file\_type: file\.type || 'application/octet\-stream',

          file\_size: fmtSize\(file\.size\),

          category: 'Other',

          content: '',

          notes: '',

          tags: '',

        \}\);

      \} catch \(e\) \{

        alert\('Upload failed: ' \+ e\.message\);

      \}

    \}

    await load\(\);

    setUploading\(false\);

  \};

  const openDoc = async \(doc\) => \{

    setSelected\(doc\);

    setEditing\(false\);

    setEditContent\(doc\.content || ''\);

    setEditTitle\(doc\.title || ''\);

    setEditCategory\(doc\.category || 'Other'\);

    setEditNotes\(doc\.notes || ''\);

    setEditTags\(doc\.tags || ''\);

  \};

  const saveEdit = async \(\) => \{

    setSaving\(true\);

    await base44\.entities\.StoredDocument\.update\(selected\.id, \{

      title: editTitle,

      category: editCategory,

      notes: editNotes,

      tags: editTags,

      content: editContent,

    \}\);

    const updated = \{ \.\.\.selected, title: editTitle, category: editCategory, notes: editNotes, tags: editTags, content: editContent \};

    setSelected\(updated\);

    setDocs\(d => d\.map\(x => x\.id === selected\.id ? updated : x\)\);

    setSaving\(false\);

    setEditing\(false\);

  \};

  const deleteDoc = async \(doc\) => \{

    if \(\!confirm\(\`Delete "$\{doc\.title\}"? This cannot be undone\.\`\)\) return;

    await base44\.entities\.StoredDocument\.delete\(doc\.id\);

    setDocs\(d => d\.filter\(x => x\.id \!== doc\.id\)\);

    if \(selected?\.id === doc\.id\) setSelected\(null\);

  \};

  const togglePin = async \(doc\) => \{

    const updated = \{ \.\.\.doc, is\_pinned: \!doc\.is\_pinned \};

    await base44\.entities\.StoredDocument\.update\(doc\.id, \{ is\_pinned: updated\.is\_pinned \}\);

    setDocs\(d => d\.map\(x => x\.id === doc\.id ? updated : x\)\);

    if \(selected?\.id === doc\.id\) setSelected\(updated\);

  \};

  const createBlankDoc = async \(\) => \{

    if \(\!newDocTitle\.trim\(\)\) return;

    const doc = await base44\.entities\.StoredDocument\.create\(\{

      title: newDocTitle,

      category: newDocCategory,

      content: newDocContent,

      file\_name: newDocTitle \+ '\.txt',

      file\_type: 'text/plain',

      notes: '',

      tags: '',

    \}\);

    setDocs\(d => \[doc, \.\.\.d\]\);

    setNewDocModal\(false\);

    setNewDocTitle\(''\);

    setNewDocContent\(''\);

    openDoc\(doc\);

  \};

  const filtered = docs\.filter\(d => \{

    const matchCat = category === 'All' || d\.category === category;

    const matchSearch = \!search || d\.title?\.toLowerCase\(\)\.includes\(search\.toLowerCase\(\)\) || d\.tags?\.toLowerCase\(\)\.includes\(search\.toLowerCase\(\)\) || d\.notes?\.toLowerCase\(\)\.includes\(search\.toLowerCase\(\)\) || d\.file\_name?\.toLowerCase\(\)\.includes\(search\.toLowerCase\(\)\);

    return matchCat && matchSearch;

  \}\);

  const pinned = filtered\.filter\(d => d\.is\_pinned\);

  const unpinned = filtered\.filter\(d => \!d\.is\_pinned\);

  const inp = \{ background: 'rgba\(0,0,0,0\.4\)', border: '1px solid rgba\(255,255,255,0\.12\)', color: '\#fff', borderRadius: 8, padding: '9px 12px', fontSize: 12, outline: 'none', boxSizing: 'border\-box', width: '100%', fontFamily: 'inherit' \};

  return \(

    <div style=\{\{ display: 'flex', height: 'calc\(100vh \- 117px\)', overflow: 'hidden', fontFamily: "'Segoe UI', Arial, sans\-serif" \}\}>

      \{/\* ── LEFT PANEL: Upload \+ Browse ── \*/\}

      <div style=\{\{ width: selected ? 340 : '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: selected ? '1px solid rgba\(255,255,255,0\.07\)' : 'none', background: '\#0a0a1a' \}\}>

        \{/\* Search \+ controls \*/\}

        <div style=\{\{ padding: '16px 16px 12px', borderBottom: '1px solid rgba\(255,255,255,0\.07\)' \}\}>

          <div style=\{\{ display: 'flex', gap: 8, marginBottom: 12 \}\}>

            <input value=\{search\} onChange=\{e => setSearch\(e\.target\.value\)\} placeholder="🔍 Search documents\.\.\." style=\{\{ \.\.\.inp, flex: 1 \}\} />

            <button onClick=\{\(\) => setNewDocModal\(true\)\}

              style=\{\{ background: '\#3498db', border: 'none', color: '\#fff', borderRadius: 8, padding: '9px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' \}\}>

              ✍️ New

            </button>

            <button onClick=\{\(\) => fileRef\.current\.click\(\)\} disabled=\{uploading\}

              style=\{\{ background: uploading ? '\#333' : '\#27ae60', border: 'none', color: '\#fff', borderRadius: 8, padding: '9px 14px', fontWeight: 700, fontSize: 12, cursor: uploading ? 'not\-allowed' : 'pointer', whiteSpace: 'nowrap' \}\}>

              \{uploading ? '⏳\.\.\.' : '⬆️ Upload'\}

            </button>

            <input ref=\{fileRef\} type="file" multiple onChange=\{e => handleUpload\(e\.target\.files\)\} style=\{\{ display: 'none' \}\} />

          </div>

          \{/\* Category filter \*/\}

          <div style=\{\{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 4 \}\}>

            \{CATEGORIES\.map\(c => \(

              <button key=\{c\} onClick=\{\(\) => setCategory\(c\)\} style=\{\{

                padding: '4px 11px', borderRadius: 20, border: \`1px solid $\{category === c ? '\#e74c3c' : 'rgba\(255,255,255,0\.1\)'\}\`,

                background: category === c ? 'rgba\(231,76,60,0\.15\)' : 'transparent',

                color: category === c ? '\#e74c3c' : '\#666', fontSize: 10, fontWeight: category === c ? 800 : 500, cursor: 'pointer', whiteSpace: 'nowrap'

              \}\}>\{c\}</button>

            \)\)\}

          </div>

        </div>

        \{/\* Drop zone \*/\}

        <div

          onDragOver=\{e => \{ e\.preventDefault\(\); setDragOver\(true\); \}\}

          onDragLeave=\{\(\) => setDragOver\(false\)\}

          onDrop=\{e => \{ e\.preventDefault\(\); setDragOver\(false\); handleUpload\(e\.dataTransfer\.files\); \}\}

          onClick=\{\(\) => fileRef\.current\.click\(\)\}

          style=\{\{

            margin: '12px 16px', border: \`2px dashed $\{dragOver ? '\#27ae60' : 'rgba\(255,255,255,0\.1\)'\}\`,

            borderRadius: 10, padding: '14px', textAlign: 'center', cursor: 'pointer',

            background: dragOver ? 'rgba\(39,174,96,0\.06\)' : 'transparent', transition: 'all 0\.15s',

            fontSize: 11, color: dragOver ? '\#27ae60' : '\#444', flexShrink: 0,

          \}\}>

          \{uploading ? '⏳ Uploading\.\.\.' : '📁 Drop files here or click to upload'\}

        </div>

        \{/\* Document list \*/\}

        <div style=\{\{ flex: 1, overflowY: 'auto', padding: '0 12px 16px' \}\}>

          \{loading ? \(

            <div style=\{\{ textAlign: 'center', padding: 40, color: '\#444', fontSize: 13 \}\}>Loading vault\.\.\.</div>

          \) : filtered\.length === 0 ? \(

            <div style=\{\{ textAlign: 'center', padding: 40, color: '\#444', fontSize: 13 \}\}>

              <div style=\{\{ fontSize: 40, marginBottom: 10 \}\}>📂</div>

              No documents found\. Upload your first file above\.

            </div>

          \) : \(

            <>

              \{pinned\.length > 0 && \(

                <>

                  <div style=\{\{ fontSize: 10, color: '\#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '8px 4px 4px' \}\}>📌 Pinned</div>

                  \{pinned\.map\(doc => <DocRow key=\{doc\.id\} doc=\{doc\} selected=\{selected?\.id === doc\.id\} onClick=\{\(\) => openDoc\(doc\)\} onPin=\{\(\) => togglePin\(doc\)\} onDelete=\{\(\) => deleteDoc\(doc\)\} />\)\}

                  <div style=\{\{ fontSize: 10, color: '\#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '12px 4px 4px' \}\}>All Documents</div>

                </>

              \)\}

              \{unpinned\.map\(doc => <DocRow key=\{doc\.id\} doc=\{doc\} selected=\{selected?\.id === doc\.id\} onClick=\{\(\) => openDoc\(doc\)\} onPin=\{\(\) => togglePin\(doc\)\} onDelete=\{\(\) => deleteDoc\(doc\)\} />\)\}

            </>

          \)\}

          <div style=\{\{ fontSize: 11, color: '\#333', textAlign: 'center', padding: '10px 0' \}\}>

            \{filtered\.length\} document\{filtered\.length \!== 1 ? 's' : ''\}

          </div>

        </div>

      </div>

      \{/\* ── RIGHT PANEL: Document Viewer / Editor ── \*/\}

      \{selected && \(

        <div style=\{\{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '\#0d0d20' \}\}>

          \{/\* Header \*/\}

          <div style=\{\{ padding: '14px 20px', borderBottom: '1px solid rgba\(255,255,255,0\.07\)', background: '\#0a0a18', display: 'flex', justifyContent: 'space\-between', alignItems: 'center', flexShrink: 0 \}\}>

            <div style=\{\{ flex: 1, minWidth: 0 \}\}>

              \{editing ? \(

                <input value=\{editTitle\} onChange=\{e => setEditTitle\(e\.target\.value\)\}

                  style=\{\{ \.\.\.inp, fontSize: 16, fontWeight: 900, background: 'rgba\(255,255,255,0\.06\)', width: '100%', maxWidth: 500 \}\} />

              \) : \(

                <div>

                  <div style=\{\{ fontSize: 16, fontWeight: 900, color: '\#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' \}\}>

                    \{getIcon\(selected\.file\_name, selected\.file\_type\)\} \{selected\.title\}

                  </div>

                  <div style=\{\{ fontSize: 10, color: '\#555', marginTop: 3 \}\}>

                    \{selected\.category && <span style=\{\{ background: '\#ffffff11', borderRadius: 4, padding: '1px 7px', marginRight: 6 \}\}>\{selected\.category\}</span>\}

                    \{selected\.file\_size && <span>\{selected\.file\_size\} · </span>\}

                    \{fmtDate\(selected\.created\_date\)\}

                    \{selected\.tags && <span style=\{\{ color: '\#3498db', marginLeft: 8 \}\}>\{selected\.tags\}</span>\}

                  </div>

                </div>

              \)\}

            </div>

            <div style=\{\{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 12 \}\}>

              \{editing ? \(

                <>

                  <button onClick=\{saveEdit\} disabled=\{saving\}

                    style=\{\{ background: '\#27ae60', border: 'none', color: '\#fff', borderRadius: 7, padding: '7px 16px', fontWeight: 700, fontSize: 12, cursor: 'pointer' \}\}>

                    \{saving ? '💾\.\.\.' : '💾 Save'\}

                  </button>

                  <button onClick=\{\(\) => setEditing\(false\)\}

                    style=\{\{ background: 'none', border: '1px solid rgba\(255,255,255,0\.1\)', color: '\#aaa', borderRadius: 7, padding: '7px 12px', fontSize: 12, cursor: 'pointer' \}\}>

                    Cancel

                  </button>

                </>

              \) : \(

                <>

                  <button onClick=\{\(\) => setEditing\(true\)\}

                    style=\{\{ background: 'rgba\(52,152,219,0\.15\)', border: '1px solid rgba\(52,152,219,0\.3\)', color: '\#3498db', borderRadius: 7, padding: '7px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer' \}\}>

                    ✏️ Edit

                  </button>

                  \{selected\.file\_url && \(

                    <a href=\{selected\.file\_url\} target="\_blank" rel="noopener noreferrer"

                      style=\{\{ background: 'rgba\(155,89,182,0\.15\)', border: '1px solid rgba\(155,89,182,0\.3\)', color: '\#9b59b6', borderRadius: 7, padding: '7px 14px', fontWeight: 700, fontSize: 12, textDecoration: 'none', display: 'inline\-flex', alignItems: 'center' \}\}>

                      ⬇️ Download

                    </a>

                  \)\}

                  <button onClick=\{\(\) => togglePin\(selected\)\} title=\{selected\.is\_pinned ? 'Unpin' : 'Pin'\}

                    style=\{\{ background: selected\.is\_pinned ? 'rgba\(241,196,15,0\.15\)' : 'rgba\(255,255,255,0\.05\)', border: \`1px solid $\{selected\.is\_pinned ? 'rgba\(241,196,15,0\.3\)' : 'rgba\(255,255,255,0\.08\)'\}\`, color: selected\.is\_pinned ? '\#f1c40f' : '\#555', borderRadius: 7, padding: '7px 10px', fontSize: 14, cursor: 'pointer' \}\}>

                    📌

                  </button>

                  <button onClick=\{\(\) => deleteDoc\(selected\)\}

                    style=\{\{ background: 'rgba\(231,76,60,0\.1\)', border: '1px solid rgba\(231,76,60,0\.2\)', color: '\#e74c3c', borderRadius: 7, padding: '7px 10px', fontSize: 14, cursor: 'pointer' \}\}>

                    🗑

                  </button>

                  <button onClick=\{\(\) => setSelected\(null\)\}

                    style=\{\{ background: 'none', border: 'none', color: '\#555', fontSize: 20, cursor: 'pointer', padding: '0 4px' \}\}>

                    ✕

                  </button>

                </>

              \)\}

            </div>

          </div>

          \{/\* Edit metadata row \*/\}

          \{editing && \(

            <div style=\{\{ padding: '12px 20px', borderBottom: '1px solid rgba\(255,255,255,0\.07\)', background: '\#0b0b1a', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', flexShrink: 0 \}\}>

              <select value=\{editCategory\} onChange=\{e => setEditCategory\(e\.target\.value\)\}

                style=\{\{ \.\.\.inp, width: 'auto' \}\}>

                \{CATEGORIES\.filter\(c => c \!== 'All'\)\.map\(c => <option key=\{c\} value=\{c\}>\{c\}</option>\)\}

              </select>

              <input value=\{editTags\} onChange=\{e => setEditTags\(e\.target\.value\)\} placeholder="Tags \(comma\-separated\)"

                style=\{\{ \.\.\.inp, flex: 1, minWidth: 150 \}\} />

              <input value=\{editNotes\} onChange=\{e => setEditNotes\(e\.target\.value\)\} placeholder="Notes\.\.\."

                style=\{\{ \.\.\.inp, flex: 2, minWidth: 200 \}\} />

            </div>

          \)\}

          \{/\* Content area \*/\}

          <div style=\{\{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' \}\}>

            \{/\* Image preview \*/\}

            \{selected\.file\_type?\.startsWith\('image'\) && selected\.file\_url && \(

              <div style=\{\{ padding: 20, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '\#08080f' \}\}>

                <img src=\{selected\.file\_url\} alt=\{selected\.title\} style=\{\{ maxWidth: '100%', maxHeight: '100%', borderRadius: 10, objectFit: 'contain' \}\} />

              </div>

            \)\}

            \{/\* PDF preview \*/\}

            \{selected\.file\_name?\.toLowerCase\(\)\.endsWith\('\.pdf'\) && selected\.file\_url && \(

              <iframe src=\{selected\.file\_url\} style=\{\{ flex: 1, border: 'none', width: '100%', minHeight: 500 \}\} title=\{selected\.title\} />

            \)\}

            \{/\* Text / editable content \*/\}

            \{\(\!selected\.file\_type?\.startsWith\('image'\) && \!selected\.file\_name?\.toLowerCase\(\)\.endsWith\('\.pdf'\)\) && \(

              <textarea

                value=\{editing ? editContent : \(selected\.content || \`📁 File: $\{selected\.file\_name || 'Uploaded document'\}\\n\\nThis file is stored in the vault\.\\n\\n$\{selected\.notes ? 'Notes: ' \+ selected\.notes : 'Click Edit to add notes or text content\.'\}\`\)\}

                onChange=\{editing ? e => setEditContent\(e\.target\.value\) : undefined\}

                readOnly=\{\!editing\}

                style=\{\{

                  flex: 1, background: '\#0d0d1e', border: 'none', color: editing ? '\#e8e8e8' : '\#aaa',

                  fontFamily: "'Courier New', monospace", fontSize: 12, lineHeight: 1\.9, padding: '24px 28px',

                  resize: 'none', outline: 'none', width: '100%', boxSizing: 'border\-box',

                  cursor: editing ? 'text' : 'default'

                \}\}

              />

            \)\}

          </div>

        </div>

      \)\}

      \{/\* ── NEW DOCUMENT MODAL ── \*/\}

      \{newDocModal && \(

        <div style=\{\{ position: 'fixed', inset: 0, background: 'rgba\(0,0,0,0\.85\)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' \}\}

          onClick=\{\(\) => setNewDocModal\(false\)\}>

          <div onClick=\{e => e\.stopPropagation\(\)\} style=\{\{ background: '\#0d0d20', border: '1px solid rgba\(255,255,255,0\.12\)', borderRadius: 16, padding: 32, width: 520, maxHeight: '90vh', overflowY: 'auto' \}\}>

            <div style=\{\{ fontWeight: 900, color: '\#fff', fontSize: 17, marginBottom: 4 \}\}>✍️ Create New Document</div>

            <div style=\{\{ fontSize: 11, color: '\#555', marginBottom: 24 \}\}>Create a new editable document directly in the vault</div>

            <div style=\{\{ marginBottom: 14 \}\}>

              <label style=\{\{ fontSize: 10, color: '\#aaa', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Document Title \*</label>

              <input value=\{newDocTitle\} onChange=\{e => setNewDocTitle\(e\.target\.value\)\} placeholder="e\.g\. Seller Script, SOW, Offer Letter\.\.\."

                style=\{\{ \.\.\.inp \}\} autoFocus />

            </div>

            <div style=\{\{ marginBottom: 14 \}\}>

              <label style=\{\{ fontSize: 10, color: '\#aaa', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Category</label>

              <select value=\{newDocCategory\} onChange=\{e => setNewDocCategory\(e\.target\.value\)\} style=\{inp\}>

                \{CATEGORIES\.filter\(c => c \!== 'All'\)\.map\(c => <option key=\{c\} value=\{c\}>\{c\}</option>\)\}

              </select>

            </div>

            <div style=\{\{ marginBottom: 24 \}\}>

              <label style=\{\{ fontSize: 10, color: '\#aaa', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Initial Content \(optional\)</label>

              <textarea value=\{newDocContent\} onChange=\{e => setNewDocContent\(e\.target\.value\)\} rows=\{6\} placeholder="Start typing\.\.\."

                style=\{\{ \.\.\.inp, resize: 'vertical' \}\} />

            </div>

            <div style=\{\{ display: 'flex', gap: 10 \}\}>

              <button onClick=\{\(\) => setNewDocModal\(false\)\}

                style=\{\{ flex: 1, background: 'rgba\(255,255,255,0\.05\)', border: '1px solid rgba\(255,255,255,0\.1\)', color: '\#aaa', borderRadius: 8, padding: 12, fontSize: 13, cursor: 'pointer' \}\}>

                Cancel

              </button>

              <button onClick=\{createBlankDoc\} disabled=\{\!newDocTitle\.trim\(\)\}

                style=\{\{ flex: 2, background: newDocTitle\.trim\(\) ? '\#3498db' : '\#333', border: 'none', color: '\#fff', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 800, cursor: newDocTitle\.trim\(\) ? 'pointer' : 'not\-allowed' \}\}>

                ✅ Create Document

              </button>

            </div>

          </div>

        </div>

      \)\}

    </div>

  \);

\}

function DocRow\(\{ doc, selected, onClick, onPin, onDelete \}\) \{

  const \[hover, setHover\] = useState\(false\);

  return \(

    <div onClick=\{onClick\}

      onMouseEnter=\{\(\) => setHover\(true\)\} onMouseLeave=\{\(\) => setHover\(false\)\}

      style=\{\{

        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderRadius: 9, cursor: 'pointer', marginBottom: 4,

        background: selected ? 'rgba\(52,152,219,0\.12\)' : hover ? 'rgba\(255,255,255,0\.04\)' : 'transparent',

        border: \`1px solid $\{selected ? 'rgba\(52,152,219,0\.3\)' : 'transparent'\}\`,

        transition: 'all 0\.1s',

      \}\}>

      <span style=\{\{ fontSize: 20, flexShrink: 0 \}\}>\{getIcon\(doc\.file\_name, doc\.file\_type\)\}</span>

      <div style=\{\{ flex: 1, minWidth: 0 \}\}>

        <div style=\{\{ fontSize: 12, fontWeight: 700, color: selected ? '\#60a5fa' : '\#e8e8e8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' \}\}>

          \{doc\.title\}

        </div>

        <div style=\{\{ fontSize: 9, color: '\#444', marginTop: 2 \}\}>

          \{doc\.category && <span style=\{\{ background: '\#ffffff08', borderRadius: 3, padding: '1px 5px', marginRight: 4 \}\}>\{doc\.category\}</span>\}

          \{doc\.file\_size && doc\.file\_size \+ ' · '\}

          \{fmtDate\(doc\.created\_date\)\}

        </div>

      </div>

      <div style=\{\{ display: 'flex', gap: 4, flexShrink: 0, opacity: hover || selected ? 1 : 0, transition: 'opacity 0\.1s' \}\}>

        <button onClick=\{e => \{ e\.stopPropagation\(\); onPin\(\); \}\}

          style=\{\{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: doc\.is\_pinned ? '\#f1c40f' : '\#444', padding: '2px 4px' \}\} title=\{doc\.is\_pinned ? 'Unpin' : 'Pin'\}>

          📌

        </button>

        <button onClick=\{e => \{ e\.stopPropagation\(\); onDelete\(\); \}\}

          style=\{\{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '\#e74c3c', padding: '2px 4px', opacity: 0\.7 \}\} title="Delete">

          🗑

        </button>

      </div>

    </div>

  \);

\}
