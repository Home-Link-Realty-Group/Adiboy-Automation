# New Microsoft Word Document (126)

Source: New Microsoft Word Document (126).docx

import { useState, useRef, useCallback } from 'react';

import { base44 } from '@/api/base44Client';

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTERS = [

  { label: 'None', value: '' },

  { label: 'Warm', value: 'sepia(0.3) saturate(1.4) brightness(1.05)' },

  { label: 'Cool', value: 'hue-rotate(20deg) saturate(1.2) brightness(1.02)' },

  { label: 'Bold', value: 'contrast(1.3) saturate(1.5)' },

  { label: 'Fade', value: 'brightness(1.1) contrast(0.85) saturate(0.8)' },

  { label: 'Drama', value: 'contrast(1.4) brightness(0.9) saturate(1.3)' },

  { label: 'B&W', value: 'grayscale(1)' },

  { label: 'Vivid', value: 'saturate(2) contrast(1.1)' },

  { label: 'Matte', value: 'contrast(0.9) brightness(1.1) saturate(0.7) sepia(0.1)' },

  { label: 'Cinematic', value: 'contrast(1.2) saturate(0.85) brightness(0.95) sepia(0.15)' },

  { label: 'Pop', value: 'saturate(1.8) contrast(1.15) brightness(1.05)' },

  { label: 'Noir', value: 'grayscale(0.9) contrast(1.4) brightness(0.85)' },

];

const OVERLAYS = [

  { label: 'None', bg: 'transparent' },

  { label: 'Dark 25%', bg: 'rgba(0,0,0,0.25)' },

  { label: 'Dark 50%', bg: 'rgba(0,0,0,0.5)' },

  { label: 'Dark 75%', bg: 'rgba(0,0,0,0.75)' },

  { label: 'Navy', bg: 'rgba(11,31,69,0.55)' },

  { label: 'Gold', bg: 'rgba(212,168,67,0.35)' },

  { label: 'Red', bg: 'rgba(231,76,60,0.4)' },

  { label: 'Green', bg: 'rgba(39,174,96,0.35)' },

  { label: 'Purple', bg: 'rgba(155,89,182,0.35)' },

];

const GRADIENTS = [

  { label: 'None', value: 'none' },

  { label: 'Bottom Dark', value: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' },

  { label: 'Top Dark', value: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 60%)' },

  { label: 'Navy Bottom', value: 'linear-gradient(to top, rgba(11,31,69,0.9) 0%, transparent 65%)' },

  { label: 'Full Navy', value: 'linear-gradient(135deg, rgba(11,31,69,0.8) 0%, rgba(18,43,94,0.6) 100%)' },

  { label: 'Gold Accent', value: 'linear-gradient(to top, rgba(212,168,67,0.6) 0%, transparent 50%)' },

  { label: 'Diagonal', value: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, transparent 70%)' },

  { label: 'Vignette', value: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' },

];

const TEXT_POSITIONS = ['Top Left', 'Top Center', 'Top Right', 'Center', 'Bottom Left', 'Bottom Center', 'Bottom Right'];

const FONTS = ['inherit', 'Georgia', 'Arial Black', 'Trebuchet MS', 'Impact', 'Courier New', 'Palatino'];

const BRAND_TEMPLATES = [

  {

    label: '🏠 Cash Offer CTA', color: '#D4A843',

    line1: 'WE BUY HOUSES FAST', line2: 'Cash Offer in 24 Hours · (855) 810-1786',

    overlay: 'rgba(11,31,69,0.55)', gradient: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',

  },

  {

    label: '⚡ No Fees', color: '#ffffff',

    line1: 'NO REPAIRS · NO FEES', line2: 'Close in 7 Days · Home-Link Realty Group',

    overlay: 'rgba(0,0,0,0.4)', gradient: 'linear-gradient(to top, rgba(11,31,69,0.9) 0%, transparent 65%)',

  },

  {

    label: '🚨 Foreclosure Help', color: '#e74c3c',

    line1: 'FACING FORECLOSURE?', line2: 'We can close BEFORE the auction · Call now',

    overlay: 'rgba(0,0,0,0.5)', gradient: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',

  },

  {

    label: '💛 Inherited Home', color: '#f1c40f',

    line1: 'INHERITED A PROPERTY?', line2: 'We handle everything · Fast, fair cash offer',

    overlay: 'rgba(11,31,69,0.5)', gradient: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 65%)',

  },

  {

    label: '✅ Testimonial', color: '#2ecc71',

    line1: '"Jacob closed in 11 days."', line2: '— Sandra M. · Home-Link Realty Group',

    overlay: 'rgba(0,0,0,0.45)', gradient: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',

  },

];

const AI_PROMPTS = [

  'Professional aerial photo of a suburban neighborhood, golden hour lighting, warm tones',

  'Modern suburban home exterior, bright daylight, green lawn, American flag, ultra realistic',

  'Distressed property needing repairs, overgrown yard, broken windows, dramatic lighting',

  'Happy family in front of sold house, smiling, keys in hand, sunny day',

  'Real estate investor shaking hands with homeowner, professional setting, trust',

  'Stack of cash on a table next to house keys, real estate deal concept',

  'Moving boxes in an empty living room, starting over, new beginnings',

  'Aerial view of a Texas suburb, homes and streets, golden afternoon light',

  'Foreclosure sign in front of house, urgent situation, dramatic sky',

  'Beautiful renovated kitchen, after renovation, bright and modern',

];

const SECTION = ({ color, title, children }) => (

  <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}25`, borderRadius: 14, padding: 18, marginBottom: 14 }}>

    <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>{title}</div>

    {children}

  </div>

);

const Inp = (props) => (

  <input {...props} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 8, padding: '9px 12px', fontSize: 12, boxSizing: 'border-box', fontFamily: 'inherit', ...props.style }} />

);

const Lbl = ({ children }) => (

  <div style={{ fontSize: 10, color: '#666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{children}</div>

);

const Slider = ({ label, value, min, max, step = 1, onChange, color = '#e74c3c' }) => (

  <div style={{ marginBottom: 12 }}>

    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>

      <Lbl>{label}</Lbl>

      <span style={{ fontSize: 10, color, fontWeight: 700 }}>{value}</span>

    </div>

    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}

      style={{ width: '100%', accentColor: color, cursor: 'pointer' }} />

  </div>

);

export default function ImageEditor({ onImageReady, existingUrl = '' }) {

  const fileRef = useRef(null);

  const [tab, setTab] = useState('source'); // source | adjust | overlay | text | brand | export

  // Source

  const [imageUrl, setImageUrl] = useState(existingUrl);

  const [urlInput, setUrlInput] = useState(existingUrl);

  const [generating, setGenerating] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [genPrompt, setGenPrompt] = useState('Professional real estate photo, suburban home, bright daylight, cash home buyers');

  const [history, setHistory] = useState(existingUrl ? [existingUrl] : []);

  // Adjustments

  const [brightness, setBrightness] = useState(100);

  const [contrast, setContrast] = useState(100);

  const [saturation, setSaturation] = useState(100);

  const [blur, setBlur] = useState(0);

  const [sharpness, setSharpness] = useState(0);

  const [filterPreset, setFilterPreset] = useState('');

  // Overlay & Gradient

  const [overlay, setOverlay] = useState('transparent');

  const [gradient, setGradient] = useState('none');

  const [overlayOpacity, setOverlayOpacity] = useState(100);

  // Text Line 1

  const [text1, setText1] = useState('');

  const [text1Pos, setText1Pos] = useState('Bottom Center');

  const [text1Color, setText1Color] = useState('#ffffff');

  const [text1Size, setText1Size] = useState(28);

  const [text1Font, setText1Font] = useState('inherit');

  const [text1Shadow, setText1Shadow] = useState(true);

  const [text1Weight, setText1Weight] = useState('900');

  const [text1BgColor, setText1BgColor] = useState('transparent');

  // Text Line 2

  const [text2, setText2] = useState('');

  const [text2Pos, setText2Pos] = useState('Bottom Center');

  const [text2Color, setText2Color] = useState('#D4A843');

  const [text2Size, setText2Size] = useState(16);

  const [text2Font, setText2Font] = useState('inherit');

  // Crop ratio

  const [cropRatio, setCropRatio] = useState('16/9');

  // Build CSS filter from sliders + preset

  const buildFilter = () => {

    const adj = `brightness(${brightness / 100}) contrast(${contrast / 100}) saturate(${saturation / 100}) blur(${blur}px)`;

    return filterPreset ? filterPreset + ' ' + adj : adj;

  };

  const getPosStyle = (pos) => {

    const map = {

      'Top Left': { top: 16, left: 16, textAlign: 'left' },

      'Top Center': { top: 16, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' },

      'Top Right': { top: 16, right: 16, textAlign: 'right' },

      'Center': { top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' },

      'Bottom Left': { bottom: 22, left: 16, textAlign: 'left' },

      'Bottom Center': { bottom: 22, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' },

      'Bottom Right': { bottom: 22, right: 16, textAlign: 'right' },

    };

    return map[pos] || map['Bottom Center'];

  };

  const setImage = (url) => {

    setImageUrl(url);

    setUrlInput(url);

    setHistory(prev => [url, ...prev.filter(u => u !== url)].slice(0, 6));

  };

  const generateImage = async () => {

    setGenerating(true);

    try {

      const res = await base44.integrations.Core.GenerateImage({ prompt: genPrompt });

      setImage(res.url);

    } catch (e) { alert('Generation failed: ' + e.message); }

    setGenerating(false);

  };

  const handleFileUpload = async (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {

      const res = await base44.integrations.Core.UploadFile({ file });

      setImage(res.file_url);

    } catch (e) { alert('Upload failed: ' + e.message); }

    setUploading(false);

  };

  const applyBrandTemplate = (t) => {

    setText1(t.line1); setText1Color(t.color); setText1Pos('Bottom Center');

    setText2(t.line2); setText2Color('#ccc'); setText2Pos('Bottom Center');

    setOverlay(t.overlay); setGradient(t.gradient);

  };

  const resetAdjustments = () => {

    setBrightness(100); setContrast(100); setSaturation(100); setBlur(0); setFilterPreset('');

  };

  const useImage = () => onImageReady && onImageReady(imageUrl);

  const cssFilter = buildFilter();

  const TABS = [

    { id: 'source', label: '📁 Source' },

    { id: 'adjust', label: '🎛️ Adjust' },

    { id: 'overlay', label: '🎨 Overlay' },

    { id: 'text', label: '✍️ Text' },

    { id: 'brand', label: '🏠 Brand Templates' },

  ];

  return (

    <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, alignItems: 'start' }}>

      {/* ── LEFT PANEL ── */}

      <div>

        {/* Tab Navigation */}

        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 14 }}>

          {TABS.map(t => (

            <button key={t.id} onClick={() => setTab(t.id)} style={{

              padding: '6px 11px', borderRadius: 20, border: `1.5px solid ${tab === t.id ? '#e74c3c' : 'rgba(255,255,255,0.08)'}`,

              background: tab === t.id ? 'rgba(231,76,60,0.15)' : 'transparent',

              color: tab === t.id ? '#e74c3c' : '#555', fontSize: 10, fontWeight: 700, cursor: 'pointer'

            }}>{t.label}</button>

          ))}

        </div>

        {/* SOURCE TAB */}

        {tab === 'source' && (

          <div>

            <SECTION color="#e74c3c" title="🤖 AI Image Generator">

              <Lbl>Describe your image</Lbl>

              <textarea value={genPrompt} onChange={e => setGenPrompt(e.target.value)} rows={3}

                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 8, padding: '9px 12px', fontSize: 12, boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', marginBottom: 10 }} />

              <div style={{ marginBottom: 10 }}>

                <Lbl>Quick Prompts</Lbl>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, maxHeight: 140, overflowY: 'auto' }}>

                  {AI_PROMPTS.map((p, i) => (

                    <button key={i} onClick={() => setGenPrompt(p)} style={{

                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',

                      color: '#777', borderRadius: 6, padding: '5px 10px', fontSize: 10, cursor: 'pointer', textAlign: 'left', lineHeight: 1.4

                    }}>{p}</button>

                  ))}

                </div>

              </div>

              <button onClick={generateImage} disabled={generating || !genPrompt.trim()} style={{

                width: '100%', background: generating ? '#333' : '#e74c3c', border: 'none',

                color: generating ? '#555' : '#fff', borderRadius: 8, padding: '12px', fontWeight: 900, fontSize: 13, cursor: generating ? 'not-allowed' : 'pointer'

              }}>

                {generating ? '⏳ Generating...' : '⚡ Generate with AI'}

              </button>

            </SECTION>

            <SECTION color="#3498db" title="📁 Upload or URL">

              <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />

              <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{

                width: '100%', background: 'rgba(52,152,219,0.15)', border: '1px solid rgba(52,152,219,0.3)',

                color: '#3498db', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 12, cursor: 'pointer', marginBottom: 10

              }}>{uploading ? '⏳ Uploading...' : '📤 Upload from Device'}</button>

              <Lbl>Or paste image URL</Lbl>

              <div style={{ display: 'flex', gap: 6 }}>

                <Inp value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://..." onKeyDown={e => e.key === 'Enter' && setImage(urlInput)} style={{ flex: 1 }} />

                <button onClick={() => setImage(urlInput)} style={{ background: '#3498db', border: 'none', color: '#fff', borderRadius: 8, padding: '9px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Go</button>

              </div>

            </SECTION>

            {/* Image History */}

            {history.length > 0 && (

              <SECTION color="#9b59b6" title="🕐 Recent Images">

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>

                  {history.map((url, i) => (

                    <div key={i} onClick={() => setImage(url)} style={{ cursor: 'pointer', borderRadius: 8, overflow: 'hidden', border: `2px solid ${url === imageUrl ? '#9b59b6' : 'transparent'}`, aspectRatio: '1/1' }}>

                      <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />

                    </div>

                  ))}

                </div>

              </SECTION>

            )}

          </div>

        )}

        {/* ADJUST TAB */}

        {tab === 'adjust' && (

          <div>

            <SECTION color="#f39c12" title="🎛️ Manual Adjustments">

              <Slider label="Brightness" value={brightness} min={50} max={200} onChange={setBrightness} color="#f1c40f" />

              <Slider label="Contrast" value={contrast} min={50} max={200} onChange={setContrast} color="#e67e22" />

              <Slider label="Saturation" value={saturation} min={0} max={300} onChange={setSaturation} color="#e74c3c" />

              <Slider label="Blur (px)" value={blur} min={0} max={10} step={0.5} onChange={setBlur} color="#3498db" />

              <button onClick={resetAdjustments} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#888', borderRadius: 8, padding: '9px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>↩ Reset All Adjustments</button>

            </SECTION>

            <SECTION color="#9b59b6" title="✨ Filter Presets">

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>

                {FILTERS.map(f => (

                  <button key={f.label} onClick={() => setFilterPreset(f.value)} style={{

                    padding: '7px 4px', borderRadius: 7, border: `1.5px solid ${filterPreset === f.value ? '#9b59b6' : 'rgba(255,255,255,0.07)'}`,

                    background: filterPreset === f.value ? 'rgba(155,89,182,0.2)' : 'rgba(255,255,255,0.03)',

                    color: filterPreset === f.value ? '#9b59b6' : '#666', fontSize: 10, fontWeight: 700, cursor: 'pointer'

                  }}>{f.label}</button>

                ))}

              </div>

            </SECTION>

            <SECTION color="#1abc9c" title="📐 Crop Ratio">

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>

                {[['16:9', '16/9'], ['1:1', '1/1'], ['4:3', '4/3'], ['9:16', '9/16'], ['4:5', '4/5']].map(([label, ratio]) => (

                  <button key={label} onClick={() => setCropRatio(ratio)} style={{

                    padding: '6px 12px', borderRadius: 8, border: `1.5px solid ${cropRatio === ratio ? '#1abc9c' : 'rgba(255,255,255,0.08)'}`,

                    background: cropRatio === ratio ? 'rgba(26,188,156,0.15)' : 'transparent',

                    color: cropRatio === ratio ? '#1abc9c' : '#555', fontSize: 11, fontWeight: 700, cursor: 'pointer'

                  }}>{label}</button>

                ))}

              </div>

            </SECTION>

          </div>

        )}

        {/* OVERLAY TAB */}

        {tab === 'overlay' && (

          <div>

            <SECTION color="#e67e22" title="🎨 Color Overlay">

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 12 }}>

                {OVERLAYS.map(o => (

                  <button key={o.label} onClick={() => setOverlay(o.bg)} style={{

                    padding: '8px 6px', borderRadius: 8, border: `1.5px solid ${overlay === o.bg ? '#fff' : 'rgba(255,255,255,0.07)'}`,

                    background: o.bg === 'transparent' ? 'rgba(255,255,255,0.04)' : o.bg,

                    color: '#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer', textShadow: '0 1px 4px rgba(0,0,0,0.8)'

                  }}>{o.label}</button>

                ))}

              </div>

              <Slider label="Overlay Opacity %" value={overlayOpacity} min={0} max={100} onChange={setOverlayOpacity} color="#e67e22" />

            </SECTION>

            <SECTION color="#3498db" title="🌅 Gradient Overlays">

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

                {GRADIENTS.map(g => (

                  <button key={g.label} onClick={() => setGradient(g.value)} style={{

                    padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${gradient === g.value ? '#3498db' : 'rgba(255,255,255,0.07)'}`,

                    background: g.value === 'none' ? 'rgba(255,255,255,0.04)' : g.value,

                    color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer', textAlign: 'left',

                    textShadow: '0 1px 6px rgba(0,0,0,1)'

                  }}>{g.label}</button>

                ))}

              </div>

            </SECTION>

          </div>

        )}

        {/* TEXT TAB */}

        {tab === 'text' && (

          <div>

            <SECTION color="#27ae60" title="✍️ Headline (Line 1)">

              <Lbl>Text</Lbl>

              <Inp value={text1} onChange={e => setText1(e.target.value)} placeholder="WE BUY HOUSES FAST" style={{ marginBottom: 10 }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>

                <div><Lbl>Color</Lbl><input type="color" value={text1Color} onChange={e => setText1Color(e.target.value)} style={{ width: '100%', height: 38, border: 'none', borderRadius: 6, cursor: 'pointer' }} /></div>

                <div><Lbl>Size (px)</Lbl><Inp type="number" value={text1Size} onChange={e => setText1Size(Number(e.target.value))} min={10} max={80} /></div>

              </div>

              <div style={{ marginBottom: 10 }}>

                <Lbl>Font</Lbl>

                <select value={text1Font} onChange={e => setText1Font(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 8, padding: '9px 12px', fontSize: 12 }}>

                  {FONTS.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f === 'inherit' ? 'Default' : f}</option>)}

                </select>

              </div>

              <div style={{ marginBottom: 10 }}>

                <Lbl>Font Weight</Lbl>

                <div style={{ display: 'flex', gap: 6 }}>

                  {['400', '600', '700', '900'].map(w => (

                    <button key={w} onClick={() => setText1Weight(w)} style={{ flex: 1, padding: '6px', borderRadius: 6, border: `1.5px solid ${text1Weight === w ? '#27ae60' : 'rgba(255,255,255,0.08)'}`, background: text1Weight === w ? 'rgba(39,174,96,0.15)' : 'transparent', color: text1Weight === w ? '#27ae60' : '#555', fontSize: 11, fontWeight: w, cursor: 'pointer' }}>{w}</button>

                  ))}

                </div>

              </div>

              <div style={{ marginBottom: 10 }}>

                <Lbl>Position</Lbl>

                <select value={text1Pos} onChange={e => setText1Pos(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 8, padding: '9px 12px', fontSize: 12 }}>

                  {TEXT_POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}

                </select>

              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

                <input type="checkbox" checked={text1Shadow} onChange={e => setText1Shadow(e.target.checked)} id="t1shadow" style={{ cursor: 'pointer' }} />

                <label htmlFor="t1shadow" style={{ fontSize: 11, color: '#888', cursor: 'pointer' }}>Drop Shadow</label>

              </div>

            </SECTION>

            <SECTION color="#f39c12" title="📝 Subline (Line 2)">

              <Lbl>Text</Lbl>

              <Inp value={text2} onChange={e => setText2(e.target.value)} placeholder="Call (855) 810-1786 · No Fees · No Repairs" style={{ marginBottom: 10 }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>

                <div><Lbl>Color</Lbl><input type="color" value={text2Color} onChange={e => setText2Color(e.target.value)} style={{ width: '100%', height: 38, border: 'none', borderRadius: 6, cursor: 'pointer' }} /></div>

                <div><Lbl>Size (px)</Lbl><Inp type="number" value={text2Size} onChange={e => setText2Size(Number(e.target.value))} min={8} max={56} /></div>

              </div>

              <div style={{ marginBottom: 10 }}>

                <Lbl>Font</Lbl>

                <select value={text2Font} onChange={e => setText2Font(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 8, padding: '9px 12px', fontSize: 12 }}>

                  {FONTS.map(f => <option key={f} value={f}>{f === 'inherit' ? 'Default' : f}</option>)}

                </select>

              </div>

              <div>

                <Lbl>Position</Lbl>

                <select value={text2Pos} onChange={e => setText2Pos(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 8, padding: '9px 12px', fontSize: 12 }}>

                  {TEXT_POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}

                </select>

              </div>

            </SECTION>

          </div>

        )}

        {/* BRAND TEMPLATES TAB */}

        {tab === 'brand' && (

          <SECTION color="#D4A843" title="🏠 Brand Templates — One Click Apply">

            <div style={{ fontSize: 11, color: '#555', marginBottom: 14, lineHeight: 1.6 }}>

              Each template sets overlay, gradient, and both text layers to match Home-Link Realty Group brand standards.

            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

              {BRAND_TEMPLATES.map((t, i) => (

                <button key={i} onClick={() => applyBrandTemplate(t)} style={{

                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,168,67,0.2)',

                  borderRadius: 10, padding: '14px 16px', cursor: 'pointer', textAlign: 'left'

                }}>

                  <div style={{ fontSize: 13, fontWeight: 800, color: t.color, marginBottom: 4 }}>{t.label}</div>

                  <div style={{ fontSize: 11, color: '#aaa', fontStyle: 'italic' }}>"{t.line1}"</div>

                  <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>{t.line2}</div>

                </button>

              ))}

            </div>

            <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(212,168,67,0.07)', border: '1px solid rgba(212,168,67,0.15)', borderRadius: 10, fontSize: 11, color: '#888', lineHeight: 1.6 }}>

              💡 Tip: Apply a template, then switch to the <strong style={{ color: '#D4A843' }}>Text</strong> tab to fine-tune the copy, or <strong style={{ color: '#D4A843' }}>Overlay</strong> tab to adjust the look.

            </div>

          </SECTION>

        )}

      </div>

      {/* ── RIGHT PANEL — Preview ── */}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1 }}>👁 Live Preview</div>

          {imageUrl && (

            <div style={{ fontSize: 10, color: '#444' }}>Ratio: {cropRatio.replace('/', ':')}</div>

          )}

        </div>

        {/* Main Preview Canvas */}

        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: '#0a0a15', border: '1px solid rgba(255,255,255,0.08)', aspectRatio: cropRatio }}>

          {imageUrl ? (

            <>

              <img src={imageUrl} alt="Preview"

                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: cssFilter }}

                onError={e => e.target.style.display = 'none'} />

              {/* Color overlay */}

              {overlay !== 'transparent' && (

                <div style={{ position: 'absolute', inset: 0, background: overlay, opacity: overlayOpacity / 100, pointerEvents: 'none' }} />

              )}

              {/* Gradient overlay */}

              {gradient !== 'none' && (

                <div style={{ position: 'absolute', inset: 0, background: gradient, pointerEvents: 'none' }} />

              )}

              {/* Text Line 1 */}

              {text1 && (

                <div style={{

                  position: 'absolute', ...getPosStyle(text1Pos),

                  color: text1Color, fontSize: text1Size, fontWeight: text1Weight,

                  fontFamily: text1Font, lineHeight: 1.25, maxWidth: '88%',

                  textShadow: text1Shadow ? '0 2px 12px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.9)' : 'none',

                  pointerEvents: 'none', letterSpacing: text1Weight === '900' ? '0.03em' : 'normal',

                  textTransform: text1Weight === '900' ? 'uppercase' : 'none',

                }}>{text1}</div>

              )}

              {/* Text Line 2 */}

              {text2 && (

                <div style={{

                  position: 'absolute',

                  ...(() => {

                    const base = getPosStyle(text2Pos);

                    // Offset line2 below line1 if same position

                    if (text2Pos === text1Pos && text2Pos.includes('Bottom')) {

                      return { ...base, bottom: (base.bottom || 22) + text1Size + 10 };

                    }

                    if (text2Pos === text1Pos && text2Pos.includes('Top')) {

                      return { ...base, top: (base.top || 16) + text1Size + 10 };

                    }

                    return base;

                  })(),

                  color: text2Color, fontSize: text2Size, fontWeight: 600,

                  fontFamily: text2Font, lineHeight: 1.4, maxWidth: '90%',

                  textShadow: '0 1px 8px rgba(0,0,0,0.9)',

                  pointerEvents: 'none',

                }}>{text2}</div>

              )}

            </>

          ) : (

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 12, color: '#222', padding: 40, textAlign: 'center' }}>

              <div style={{ fontSize: 64 }}>🖼️</div>

              <div style={{ fontSize: 14, color: '#333', fontWeight: 700 }}>No image yet</div>

              <div style={{ fontSize: 12, color: '#222' }}>Use the Source tab to generate with AI or upload a photo</div>

            </div>

          )}

        </div>

        {/* Platform Crop Previews */}

        {imageUrl && (

          <div>

            <div style={{ fontSize: 10, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Platform Crop Previews</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>

              {[

                { name: 'Facebook', ratio: '16/9', color: '#1877F2' },

                { name: 'Instagram', ratio: '1/1', color: '#E1306C' },

                { name: 'LinkedIn', ratio: '16/9', color: '#0A66C2' },

                { name: 'Twitter', ratio: '16/9', color: '#1DA1F2' },

                { name: 'IG Story', ratio: '9/16', color: '#f09433' },

                { name: 'TikTok', ratio: '9/16', color: '#000' },

                { name: 'Pinterest', ratio: '2/3', color: '#E60023' },

                { name: 'YouTube', ratio: '16/9', color: '#FF0000' },

              ].map(p => (

                <div key={p.name} style={{ borderRadius: 8, overflow: 'hidden', border: `1.5px solid ${p.color}30`, cursor: 'pointer' }} onClick={() => setCropRatio(p.ratio)}>

                  <div style={{ aspectRatio: p.ratio, overflow: 'hidden', position: 'relative', background: '#000' }}>

                    <img src={imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: cssFilter }} onError={e => e.target.style.display = 'none'} />

                    {overlay !== 'transparent' && <div style={{ position: 'absolute', inset: 0, background: overlay, opacity: overlayOpacity / 100 }} />}

                    {gradient !== 'none' && <div style={{ position: 'absolute', inset: 0, background: gradient }} />}

                    {text1 && <div style={{ position: 'absolute', bottom: 4, left: 4, right: 4, color: text1Color, fontSize: Math.max(6, text1Size * 0.28), fontWeight: text1Weight, textShadow: '0 1px 4px rgba(0,0,0,1)', lineHeight: 1.2, overflow: 'hidden' }}>{text1.slice(0, 28)}</div>}

                  </div>

                  <div style={{ padding: '4px 6px', background: p.color + '18', textAlign: 'center', fontSize: 9, fontWeight: 700, color: p.color }}>{p.name}</div>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Action Buttons */}

        {imageUrl && (

          <div style={{ display: 'flex', gap: 10 }}>

            <button onClick={useImage} style={{

              flex: 2, background: 'linear-gradient(135deg, #27ae60, #2ecc71)', border: 'none', color: '#fff',

              borderRadius: 11, padding: '15px', fontWeight: 900, fontSize: 14, cursor: 'pointer',

              boxShadow: '0 4px 20px rgba(39,174,96,0.3)'

            }}>✅ Use This Image in Post</button>

            <button onClick={() => { setImageUrl(''); setUrlInput(''); }} style={{

              flex: 1, background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.25)',

              color: '#e74c3c', borderRadius: 11, padding: '15px', fontWeight: 700, fontSize: 13, cursor: 'pointer'

            }}>🗑 Clear</button>

          </div>

        )}

        {/* Adjustment Summary */}

        {imageUrl && (brightness !== 100 || contrast !== 100 || saturation !== 100 || blur > 0 || filterPreset) && (

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px' }}>

            <div style={{ fontSize: 10, fontWeight: 700, color: '#555', textTransform: 'uppercase', marginBottom: 8 }}>Applied Adjustments</div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>

              {filterPreset && <span style={{ fontSize: 10, padding: '3px 8px', background: 'rgba(155,89,182,0.15)', color: '#9b59b6', borderRadius: 6, fontWeight: 700 }}>🎞 {FILTERS.find(f => f.value === filterPreset)?.label}</span>}

              {brightness !== 100 && <span style={{ fontSize: 10, padding: '3px 8px', background: 'rgba(241,196,15,0.12)', color: '#f1c40f', borderRadius: 6, fontWeight: 700 }}>☀ {brightness}%</span>}

              {contrast !== 100 && <span style={{ fontSize: 10, padding: '3px 8px', background: 'rgba(230,126,34,0.12)', color: '#e67e22', borderRadius: 6, fontWeight: 700 }}>◑ {contrast}%</span>}

              {saturation !== 100 && <span style={{ fontSize: 10, padding: '3px 8px', background: 'rgba(231,76,60,0.12)', color: '#e74c3c', borderRadius: 6, fontWeight: 700 }}>🎨 {saturation}%</span>}

              {blur > 0 && <span style={{ fontSize: 10, padding: '3px 8px', background: 'rgba(52,152,219,0.12)', color: '#3498db', borderRadius: 6, fontWeight: 700 }}>💧 Blur {blur}px</span>}

              {gradient !== 'none' && <span style={{ fontSize: 10, padding: '3px 8px', background: 'rgba(52,152,219,0.12)', color: '#3498db', borderRadius: 6, fontWeight: 700 }}>🌅 {GRADIENTS.find(g => g.value === gradient)?.label}</span>}

            </div>

            <button onClick={resetAdjustments} style={{ marginTop: 8, background: 'none', border: 'none', color: '#555', fontSize: 10, cursor: 'pointer', textDecoration: 'underline' }}>Reset adjustments</button>

          </div>

        )}

      </div>

    </div>

  );

}
