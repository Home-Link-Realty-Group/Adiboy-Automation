# New Microsoft Word Document (75)

Source: New Microsoft Word Document (75).docx

import { useRef, useState, useCallback, useEffect } from "react";

const PUBLISH_DESTINATIONS = [

  { name: "Facebook Page", icon: "📘", color: "#1877F2", url: "https://www.facebook.com/", instructions: "Click 'Photo/Video' → upload image → paste caption → Post" },

  { name: "Instagram", icon: "📸", color: "#E1306C", url: "https://www.instagram.com/", instructions: "Tap + → select image → add caption → Share" },

  { name: "TikTok", icon: "🎵", color: "#010101", url: "https://www.tiktok.com/upload", instructions: "Upload → select image → caption + hashtags → Post" },

  { name: "LinkedIn", icon: "💼", color: "#0A66C2", url: "https://www.linkedin.com/feed/", instructions: "Start a post → photo icon → upload → add text → Post" },

  { name: "X / Twitter", icon: "🐦", color: "#000000", url: "https://twitter.com/compose/tweet", instructions: "Compose → attach image → write tweet → Post" },

  { name: "Google My Business", icon: "📍", color: "#4285F4", url: "https://business.google.com/", instructions: "Your listing → Photos → Upload OR Posts → Add photo" },

  { name: "Yelp", icon: "⭐", color: "#D32323", url: "https://biz.yelp.com/", instructions: "Business Info → Photos → Add Photo" },

  { name: "YouTube Community", icon: "▶️", color: "#FF0000", url: "https://studio.youtube.com/", instructions: "Create → New Post → Image post" },

  { name: "Craigslist Ad", icon: "📰", color: "#7B0D1E", url: "https://post.craigslist.org/", instructions: "Post → Real Estate → For Sale By Owner → add image" },

  { name: "Meta Ads Manager", icon: "💰", color: "#0668E1", url: "https://adsmanager.facebook.com/", instructions: "Create Ad → Ad Creative → Upload Image" },

  { name: "Dropbox", icon: "📦", color: "#0061FF", url: "https://www.dropbox.com/upload", instructions: "Upload → select image → saves to Dropbox" },

  { name: "Google Drive", icon: "💾", color: "#34A853", url: "https://drive.google.com/", instructions: "My Drive → + New → File Upload" },

];

const rgba = (hex, a = 1) => {

  const r = parseInt(hex.slice(1, 3), 16);

  const g = parseInt(hex.slice(3, 5), 16);

  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r},${g},${b},${a})`;

};

const Card = ({ children, style = {}, glow }) => (

  <div style={{

    background: "linear-gradient(145deg, #0f1826, #0d1520)",

    border: `1px solid ${glow ? rgba(glow, 0.35) : "#0B1F45"}`,

    borderRadius: 16, overflow: "hidden",

    boxShadow: glow ? `0 0 30px ${rgba(glow, 0.08)}` : "none",

    ...style,

  }}>{children}</div>

);

const CardHeader = ({ icon, title, subtitle, right }) => (

  <div style={{ padding: "16px 20px", borderBottom: "1px solid #0f1e2e", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

    <div>

      <div style={{ fontWeight: 800, color: "#f1f5f9", fontSize: 15, display: "flex", alignItems: "center", gap: 7 }}>

        <span>{icon}</span>{title}

      </div>

      {subtitle && <div style={{ fontSize: 11, color: "#334155", marginTop: 2 }}>{subtitle}</div>}

    </div>

    {right}

  </div>

);

const SIZES = [

  { label: "Facebook/Instagram", w: 1200, h: 630 },

  { label: "Instagram Square", w: 1080, h: 1080 },

  { label: "Instagram Story", w: 1080, h: 1920 },

  { label: "LinkedIn Banner", w: 1584, h: 396 },

  { label: "Twitter/X", w: 1600, h: 900 },

];

export default function PhotoEditor() {

  const canvasRef = useRef(null);

  const fileRef = useRef(null);

  const [img, setImg] = useState(null);

  const [layers, setLayers] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  const [dragging, setDragging] = useState(null);

  const [dragOff, setDragOff] = useState({ x: 0, y: 0 });

  const [cW, setCW] = useState(1200);

  const [cH, setCH] = useState(630);

  const [text, setText] = useState("Home-Link Realty Group");

  const [color, setColor] = useState("#ffffff");

  const [size, setSize] = useState(52);

  const [font, setFont] = useState("Arial");

  const [bold, setBold] = useState(true);

  const [shadow, setShadow] = useState(true);

  const [brightness, setBrightness] = useState(100);

  const [contrast, setContrast] = useState(100);

  const [exportUrl, setExportUrl] = useState(null);

  const draw = useCallback(() => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, cW, cH);

    if (img) {

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      ctx.drawImage(img, 0, 0, cW, cH);

      ctx.filter = "none";

    } else {

      const grad = ctx.createLinearGradient(0, 0, cW, cH);

      grad.addColorStop(0, "#0f1826");

      grad.addColorStop(1, "#1a2e1a");

      ctx.fillStyle = grad;

      ctx.fillRect(0, 0, cW, cH);

      ctx.fillStyle = "rgba(34,197,94,0.04)";

      for (let i = 0; i < cW; i += 40) { ctx.fillRect(i, 0, 1, cH); }

      for (let j = 0; j < cH; j += 40) { ctx.fillRect(0, j, cW, 1); }

    }

    layers.forEach(l => {

      ctx.font = `${l.bold ? "bold " : ""}${l.size}px ${l.font}`;

      ctx.textAlign = "left";

      if (l.shadow) {

        ctx.shadowColor = "rgba(0,0,0,0.8)";

        ctx.shadowBlur = 12;

        ctx.shadowOffsetX = 2;

        ctx.shadowOffsetY = 2;

      } else {

        ctx.shadowColor = "transparent";

        ctx.shadowBlur = 0;

        ctx.shadowOffsetX = 0;

        ctx.shadowOffsetY = 0;

      }

      ctx.fillStyle = selectedId === l.id ? "#fbbf24" : l.color;

      ctx.fillText(l.text, l.x, l.y);

      if (selectedId === l.id) {

        ctx.shadowColor = "transparent";

        const m = ctx.measureText(l.text);

        ctx.strokeStyle = "#fbbf24";

        ctx.lineWidth = 1.5;

        ctx.setLineDash([5, 3]);

        ctx.strokeRect(l.x - 4, l.y - l.size, m.width + 8, l.size + 8);

        ctx.setLineDash([]);

      }

    });

    ctx.shadowColor = "transparent";

  }, [img, layers, selectedId, cW, cH, brightness, contrast]);

  useEffect(() => { draw(); }, [draw]);

  const addText = () => {

    const id = Date.now();

    setLayers(p => [...p, { id, text, color, size, font, bold, shadow, x: 80, y: cH / 2 }]);

    setSelectedId(id);

  };

  const loadImg = e => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = ev => {

      const i = new Image();

      i.onload = () => { setImg(i); };

      i.src = ev.target.result;

    };

    reader.readAsDataURL(file);

  };

  const canvasClick = e => {

    const rect = canvasRef.current.getBoundingClientRect();

    const sx = cW / rect.width;

    const sy = cH / rect.height;

    const mx = (e.clientX - rect.left) * sx;

    const my = (e.clientY - rect.top) * sy;

    const ctx = canvasRef.current.getContext("2d");

    let hit = null;

    layers.slice().reverse().forEach(l => {

      ctx.font = `${l.bold ? "bold " : ""}${l.size}px ${l.font}`;

      const w = ctx.measureText(l.text).width;

      if (mx >= l.x - 4 && mx <= l.x + w + 4 && my >= l.y - l.size && my <= l.y + 8) hit = l.id;

    });

    setSelectedId(hit);

  };

  const canvasMouseDown = e => {

    const rect = canvasRef.current.getBoundingClientRect();

    const sx = cW / rect.width;

    const sy = cH / rect.height;

    const mx = (e.clientX - rect.left) * sx;

    const my = (e.clientY - rect.top) * sy;

    if (!selectedId) return;

    const l = layers.find(x => x.id === selectedId);

    if (!l) return;

    setDragging(selectedId);

    setDragOff({ x: mx - l.x, y: my - l.y });

  };

  const canvasMouseMove = e => {

    if (!dragging) return;

    const rect = canvasRef.current.getBoundingClientRect();

    const sx = cW / rect.width;

    const sy = cH / rect.height;

    const mx = (e.clientX - rect.left) * sx;

    const my = (e.clientY - rect.top) * sy;

    setLayers(p => p.map(l => l.id === dragging ? { ...l, x: mx - dragOff.x, y: my - dragOff.y } : l));

  };

  const exportImg = () => {

    const url = canvasRef.current.toDataURL("image/jpeg", 0.95);

    setExportUrl(url);

  };

  const downloadImg = () => {

    const a = document.createElement("a");

    a.href = exportUrl;

    a.download = `homelink-post-${Date.now()}.jpg`;

    a.click();

  };

  return (

    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>

      {/* Controls */}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

        <Card>

          <CardHeader icon="🖼️" title="Canvas Size" />

          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>

            {SIZES.map(s => (

              <button key={s.label} onClick={() => { setCW(s.w); setCH(s.h); }} style={{

                background: cW === s.w && cH === s.h ? rgba("#22c55e", 0.15) : "#0a111e",

                border: `1px solid ${cW === s.w && cH === s.h ? "#22c55e" : "#1e2d40"}`,

                color: cW === s.w && cH === s.h ? "#4ade80" : "#94a3b8",

                borderRadius: 8, padding: "7px 12px", fontSize: 11, cursor: "pointer", textAlign: "left", fontWeight: 600,

              }}>{s.label} <span style={{ color: "#334155" }}>({s.w}×{s.h})</span></button>

            ))}

          </div>

        </Card>

        <Card>

          <CardHeader icon="📷" title="Background Image" />

          <div style={{ padding: "12px 16px" }}>

            <button onClick={() => fileRef.current.click()} style={{

              width: "100%", background: rgba("#3b82f6", 0.15), border: "1px solid " + rgba("#3b82f6", 0.3),

              color: "#60a5fa", borderRadius: 8, padding: "10px", fontSize: 12, cursor: "pointer", fontWeight: 700,

            }}>📁 Upload Photo</button>

            <input ref={fileRef} type="file" accept="image/*" onChange={loadImg} style={{ display: "none" }} />

            <div style={{ marginTop: 12 }}>

              <div style={{ fontSize: 11, color: "#475569", marginBottom: 6 }}>Brightness</div>

              <input type="range" min={50} max={150} value={brightness} onChange={e => setBrightness(+e.target.value)} style={{ width: "100%" }} />

              <div style={{ fontSize: 11, color: "#475569", marginBottom: 6, marginTop: 8 }}>Contrast</div>

              <input type="range" min={50} max={150} value={contrast} onChange={e => setContrast(+e.target.value)} style={{ width: "100%" }} />

            </div>

          </div>

        </Card>

        <Card>

          <CardHeader icon="✏️" title="Add Text Layer" />

          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>

            <input value={text} onChange={e => setText(e.target.value)} placeholder="Your text..." style={{ background: "#0a111e", border: "1px solid #1e2d40", borderRadius: 8, padding: "8px 10px", color: "#f1f5f9", fontSize: 12, outline: "none" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>

              <div>

                <div style={{ fontSize: 10, color: "#475569", marginBottom: 4 }}>Color</div>

                <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: "100%", height: 36, border: "1px solid #1e2d40", borderRadius: 6, cursor: "pointer", background: "#0a111e" }} />

              </div>

              <div>

                <div style={{ fontSize: 10, color: "#475569", marginBottom: 4 }}>Size: {size}px</div>

                <input type="range" min={14} max={120} value={size} onChange={e => setSize(+e.target.value)} style={{ width: "100%", marginTop: 8 }} />

              </div>

            </div>

            <select value={font} onChange={e => setFont(e.target.value)} style={{ background: "#0a111e", border: "1px solid #1e2d40", borderRadius: 8, padding: "7px 10px", color: "#f1f5f9", fontSize: 12, outline: "none" }}>

              {["Arial", "Georgia", "Impact", "Verdana", "Trebuchet MS", "Times New Roman"].map(f => <option key={f}>{f}</option>)}

            </select>

            <div style={{ display: "flex", gap: 8 }}>

              {[["Bold", bold, setBold], ["Shadow", shadow, setShadow]].map(([l, v, s]) => (

                <button key={l} onClick={() => s(!v)} style={{ flex: 1, background: v ? rgba("#22c55e", 0.15) : "#0a111e", border: `1px solid ${v ? "#22c55e" : "#1e2d40"}`, color: v ? "#4ade80" : "#64748b", borderRadius: 8, padding: "7px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>{l}</button>

              ))}

            </div>

            <button onClick={addText} style={{ background: "linear-gradient(135deg, #166534, #15803d)", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>+ Add to Canvas</button>

          </div>

        </Card>

        {layers.length > 0 && (

          <Card>

            <CardHeader icon="📋" title="Layers" />

            <div style={{ padding: "8px 12px" }}>

              {layers.map(l => (

                <div key={l.id} onClick={() => setSelectedId(l.id)} style={{

                  display: "flex", justifyContent: "space-between", alignItems: "center",

                  padding: "6px 8px", borderRadius: 6, cursor: "pointer", marginBottom: 4,

                  background: selectedId === l.id ? rgba("#22c55e", 0.1) : "transparent",

                  border: `1px solid ${selectedId === l.id ? rgba("#22c55e", 0.3) : "transparent"}`,

                }}>

                  <span style={{ fontSize: 11, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{l.text}</span>

                  <button onClick={e => { e.stopPropagation(); setLayers(p => p.filter(x => x.id !== l.id)); if (selectedId === l.id) setSelectedId(null); }} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 14, padding: "0 4px" }}>×</button>

                </div>

              ))}

            </div>

          </Card>

        )}

        <button onClick={exportImg} style={{ background: "linear-gradient(135deg, #1d4ed8, #1e40af)", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>

          💾 Export Image

        </button>

        {exportUrl && (

          <button onClick={downloadImg} style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>

            ⬇️ Download JPG

          </button>

        )}

      </div>

      {/* Canvas */}

      <div>

        <canvas

          ref={canvasRef} width={cW} height={cH}

          onClick={canvasClick} onMouseDown={canvasMouseDown}

          onMouseMove={canvasMouseMove} onMouseUp={() => setDragging(null)}

          style={{ width: "100%", borderRadius: 12, border: "1px solid #0B1F45", cursor: dragging ? "grabbing" : "pointer", display: "block" }}

        />

        {exportUrl && (

          <div style={{ marginTop: 16 }}>

            <div style={{ fontSize: 12, color: "#4ade80", fontWeight: 700, marginBottom: 10 }}>✅ Ready to download & publish:</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>

              {PUBLISH_DESTINATIONS.map(d => (

                <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>

                  <div style={{

                    background: "#0a111e", border: `1px solid ${rgba(d.color, 0.3)}`,

                    borderRadius: 8, padding: "10px 8px", textAlign: "center",

                    transition: "all 0.15s",

                  }}

                    onMouseEnter={e => { e.currentTarget.style.background = rgba(d.color, 0.08); e.currentTarget.style.borderColor = d.color; }}

                    onMouseLeave={e => { e.currentTarget.style.background = "#0a111e"; e.currentTarget.style.borderColor = rgba(d.color, 0.3); }}

                  >

                    <div style={{ fontSize: 18, marginBottom: 4 }}>{d.icon}</div>

                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{d.name}</div>

                  </div>

                </a>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}
