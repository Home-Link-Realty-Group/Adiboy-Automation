# New Microsoft Word Document (77)

Source: New Microsoft Word Document (77).docx

import { useState, useRef } from 'react';

import { base44 } from '@/api/base44Client';

const PLATFORMS = {

  facebook: {

    name: 'Facebook', icon: '📘', color: '#1877F2',

    maxChars: 63206, imageRatio: '1.91:1', recommendedSize: '1200×628',

    hashtagLimit: 'No strict limit (5–10 recommended)',

    rules: ['No misleading claims', 'No before/after images for health', 'No discriminatory targeting', 'Real estate: include fair housing statement'],

    adSizes: ['1200×628 (Feed)', '1080×1080 (Square)', '1080×1350 (Portrait)', '1200×628 (Carousel)'],

    cta_options: ['Learn More', 'Contact Us', 'Get Quote', 'Send Message', 'Call Now'],

  },

  instagram: {

    name: 'Instagram', icon: '📸', color: '#E1306C',

    maxChars: 2200, imageRatio: '1:1 or 4:5', recommendedSize: '1080×1080',

    hashtagLimit: '30 max (9–11 optimal)',

    rules: ['No excessive text on image (keep under 20%)', 'High quality images only', 'No before/after for health claims', 'Real estate: include equal housing'],

    adSizes: ['1080×1080 (Feed Square)', '1080×1350 (Feed Portrait)', '1080×1920 (Story/Reel)'],

    cta_options: ['Learn More', 'Contact Us', 'Send Message', 'Book Now', 'Get Quote'],

  },

  linkedin: {

    name: 'LinkedIn', icon: '💼', color: '#0A66C2',

    maxChars: 3000, imageRatio: '1.91:1', recommendedSize: '1200×628',

    hashtagLimit: '3–5 professional hashtags',

    rules: ['Professional tone required', 'No misleading business claims', 'No spam or self-promotion without value', 'B2B focus works best'],

    adSizes: ['1200×628 (Sponsored Content)', '1200×1200 (Square)', '360×360 (Message Ad image)'],

    cta_options: ['Learn More', 'Register', 'Sign Up', 'Subscribe', 'Download', 'View Quote'],

  },

  twitter: {

    name: 'X / Twitter', icon: '🐦', color: '#1DA1F2',

    maxChars: 280, imageRatio: '16:9', recommendedSize: '1600×900',

    hashtagLimit: '1–2 hashtags max',

    rules: ['280 char limit including links', 'No misleading or spam', 'Keep hashtags minimal', 'Conversational tone works best'],

    adSizes: ['1600×900 (Landscape)', '1200×1200 (Square)', '1080×1920 (Story-style)'],

    cta_options: ['Learn More', 'Shop Now', 'Book Now', 'Sign Up', 'Watch Now'],

  },

  google: {

    name: 'Google Ads', icon: '🎯', color: '#4285F4',

    maxChars: 90, imageRatio: '1.91:1 or 1:1', recommendedSize: '1200×628',

    hashtagLimit: 'N/A — not used in Google Ads',

    rules: ['No excessive capitalization', 'No misleading claims', 'No superlatives unless substantiated', 'Real estate: fair housing compliance required', 'No punctuation in headlines except ! which is limited'],

    adSizes: ['1200×628 (Responsive Display)', '1200×1200 (Square)', '1920×1080 (Landscape)'],

    cta_options: ['Get a Free Quote', 'Call Now', 'Learn More', 'Get Offer', 'Contact Us Today'],

  },

  craigslist: {

    name: 'Craigslist', icon: '📰', color: '#7B0D1E',

    maxChars: 5000, imageRatio: 'Any', recommendedSize: '800×600 min',

    hashtagLimit: 'N/A',

    rules: ['No HTML except basic tags', 'No spam or duplicate posts', 'Post in correct category', 'Real estate: For Sale By Owner section', 'One post per property per area'],

    adSizes: ['800×600 (Minimum)', '1200×800 (Recommended)'],

    cta_options: ['Call us', 'Text us', 'Email us', 'Visit our website'],

  },

};

const POST_TYPES = [

  { value: 'motivated_seller', label: '🏠 Motivated Seller Ad', desc: 'Direct response ad targeting sellers' },

  { value: 'cash_offer', label: '💰 Cash Offer Ad', desc: 'Promote your cash buying service' },

  { value: 'testimonial', label: '⭐ Testimonial Post', desc: 'Social proof from past clients' },

  { value: 'education', label: '📚 Educational Content', desc: 'Tips & how-to for homeowners' },

  { value: 'foreclosure', label: '⚠️ Foreclosure Help', desc: 'Target pre-foreclosure homeowners' },

  { value: 'inherited', label: '📜 Inherited Property', desc: 'Target estate/probate situations' },

  { value: 'landlord', label: '🔑 Tired Landlord', desc: 'Target rental property owners' },

  { value: 'referral', label: '🤝 Referral Partner', label: 'Target attorneys, agents, professionals' },

  { value: 'custom', label: '✏️ Custom', desc: 'Write your own brief, AI generates' },

];

const inp = (extra = {}) => ({

  background: '#0a111e', border: '1px solid #1e2d40', borderRadius: 8,

  padding: '9px 12px', color: '#f1f5f9', fontSize: 12, outline: 'none',

  fontFamily: 'inherit', width: '100%', boxSizing: 'border-box', ...extra,

});

export default function SocialPostGenerator() {

  const [platform, setPlatform] = useState('facebook');

  const [postType, setPostType] = useState('motivated_seller');

  const [customBrief, setCustomBrief] = useState('');

  const [includeImage, setIncludeImage] = useState(true);

  const [generatedPost, setGeneratedPost] = useState(null);

  const [generatedImage, setGeneratedImage] = useState(null);

  const [generating, setGenerating] = useState(false);

  const [generatingImage, setGeneratingImage] = useState(false);

  const [copied, setCopied] = useState(false);

  const [editedContent, setEditedContent] = useState('');

  const [editing, setEditing] = useState(false);

  const [savedPosts, setSavedPosts] = useState(() => {

    try { return JSON.parse(localStorage.getItem('hq_saved_posts_v1') || '[]'); } catch { return []; }

  });

  const [showSaved, setShowSaved] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);

  const fileRef = useRef(null);

  const p = PLATFORMS[platform];

  const generate = async () => {

    setGenerating(true);

    setGeneratedPost(null);

    setGeneratedImage(null);

    setEditing(false);

    try {

      const typeLabel = POST_TYPES.find(t => t.value === postType)?.label || postType;

      const brief = customBrief.trim() || `Create a ${typeLabel} for Home-Link Realty Group LLC, a cash home buying company in the US. Phone: (855) 810-1786. Website: homelinkrealtygroup.com.`;


      const prompt = `You are an expert social media marketer and compliance specialist for real estate.

Generate a COMPLIANT, HIGH-CONVERTING ${p.name} post for the following brief:

"${brief}"

Platform rules to follow:

${p.rules.map(r => `- ${r}`).join('\n')}

Platform specs:

- Max characters: ${p.maxChars}

- Hashtag guidance: ${p.hashtagLimit}

- Tone: ${platform === 'linkedin' ? 'Professional and authoritative' : platform === 'twitter' ? 'Conversational and punchy' : 'Friendly, empathetic, direct'}

Company: Home-Link Realty Group LLC

Phone: (855) 810-1786

Location: Nationwide, USA

Generate the following JSON:

{

  "post_text": "The full ready-to-paste post text including hashtags if applicable. Must be under ${p.maxChars} characters.",

  "headline": "Short punchy headline (for ads)",

  "cta": "Best call-to-action button text for this platform",

  "image_prompt": "Detailed AI image generation prompt for a professional, compliant real estate marketing image that fits this post. Describe the scene, mood, colors, style. No text in the image.",

  "compliance_notes": ["List of compliance items this post follows"],

  "char_count": 0,

  "hashtags": "Hashtags only (separate from post if platform prefers)",

  "suggested_ad_format": "Best ad format for this platform and post type"

}`;

      const result = await base44.integrations.Core.InvokeLLM({

        prompt,

        response_json_schema: {

          type: 'object',

          properties: {

            post_text: { type: 'string' },

            headline: { type: 'string' },

            cta: { type: 'string' },

            image_prompt: { type: 'string' },

            compliance_notes: { type: 'array', items: { type: 'string' } },

            char_count: { type: 'number' },

            hashtags: { type: 'string' },

            suggested_ad_format: { type: 'string' },

          },

        },

      });

      result.char_count = result.post_text?.length || 0;

      setGeneratedPost(result);

      setEditedContent(result.post_text || '');

      if (includeImage && result.image_prompt) {

        setGeneratingImage(true);

        try {

          const imgResult = await base44.integrations.Core.GenerateImage({ prompt: result.image_prompt });

          setGeneratedImage(imgResult.url);

        } catch (e) { console.warn('Image generation failed:', e); }

        setGeneratingImage(false);

      }

    } catch (e) {

      alert('Generation failed: ' + e.message);

    }

    setGenerating(false);

  };

  const copyPost = () => {

    const text = editing ? editedContent : (generatedPost?.post_text || '');

    navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);

  };

  const savePost = () => {

    if (!generatedPost) return;

    const entry = {

      id: Date.now(),

      platform,

      postType,

      text: editing ? editedContent : generatedPost.post_text,

      headline: generatedPost.headline,

      image: generatedImage || uploadedImage,

      saved: new Date().toISOString(),

    };

    const updated = [entry, ...savedPosts].slice(0, 50);

    setSavedPosts(updated);

    localStorage.setItem('hq_saved_posts_v1', JSON.stringify(updated));

    alert('✅ Post saved to library!');

  };

  const deleteSaved = (id) => {

    const updated = savedPosts.filter(p => p.id !== id);

    setSavedPosts(updated);

    localStorage.setItem('hq_saved_posts_v1', JSON.stringify(updated));

  };

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = ev => setUploadedImage(ev.target.result);

    reader.readAsDataURL(file);

  };

  const currentImage = generatedImage || uploadedImage;

  const charCount = (editing ? editedContent : generatedPost?.post_text || '').length;

  const overLimit = charCount > p.maxChars;

  return (

    <div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>

        <div>

          <div style={{ fontSize: 18, fontWeight: 900, color: '#f1f5f9' }}>🎯 Social Post & Ad Generator</div>

          <div style={{ fontSize: 11, color: '#334155', marginTop: 2 }}>Platform-compliant posts + AI images — choose your platform, get a ready-to-publish post</div>

        </div>

        <button onClick={() => setShowSaved(p => !p)} style={{ background: '#1e2d40', border: '1px solid #2d4060', color: '#94a3b8', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>

          📚 Saved Posts ({savedPosts.length})

        </button>

      </div>

      {showSaved ? (

        <div>

          <div style={{ fontSize: 13, fontWeight: 800, color: '#f1f5f9', marginBottom: 14 }}>📚 Saved Post Library</div>

          {savedPosts.length === 0 ? (

            <div style={{ textAlign: 'center', padding: 40, color: '#334155' }}>No saved posts yet. Generate and save posts to build your library.</div>

          ) : (

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

              {savedPosts.map(sp => {

                const pl = PLATFORMS[sp.platform];

                return (

                  <div key={sp.id} style={{ background: '#0d1520', border: `1px solid ${pl?.color || '#1e2d40'}30`, borderRadius: 12, padding: 16, display: 'flex', gap: 14 }}>

                    {sp.image && <img src={sp.image} alt="" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}

                    <div style={{ flex: 1, minWidth: 0 }}>

                      <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>

                        <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 6, background: `${pl?.color || '#475569'}20`, color: pl?.color || '#94a3b8', fontWeight: 700 }}>{pl?.icon} {pl?.name}</span>

                        <span style={{ fontSize: 10, color: '#475569' }}>{new Date(sp.saved).toLocaleDateString()}</span>

                      </div>

                      {sp.headline && <div style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{sp.headline}</div>}

                      <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{sp.text}</div>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>

                      <button onClick={() => { navigator.clipboard.writeText(sp.text); }} style={{ background: '#1e2d40', border: 'none', color: '#60a5fa', borderRadius: 6, padding: '5px 10px', fontSize: 10, cursor: 'pointer', fontWeight: 700 }}>📋 Copy</button>

                      <button onClick={() => deleteSaved(sp.id)} style={{ background: '#ef444418', border: 'none', color: '#f87171', borderRadius: 6, padding: '5px 10px', fontSize: 10, cursor: 'pointer' }}>🗑 Delete</button>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>

      ) : (

        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20 }}>

          {/* ── LEFT: Controls ── */}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Platform Selection */}

            <div style={{ background: '#0d1520', border: '1px solid #1e2d40', borderRadius: 12, padding: 16 }}>

              <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>1. Choose Platform</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

                {Object.entries(PLATFORMS).map(([key, pl]) => (

                  <button key={key} onClick={() => setPlatform(key)} style={{

                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 9,

                    border: `1.5px solid ${platform === key ? pl.color : '#1e2d40'}`,

                    background: platform === key ? `${pl.color}15` : 'transparent',

                    color: platform === key ? pl.color : '#64748b', cursor: 'pointer', textAlign: 'left', fontWeight: platform === key ? 700 : 400, fontSize: 13,

                  }}>

                    <span style={{ fontSize: 18 }}>{pl.icon}</span>

                    <div style={{ flex: 1 }}>

                      <div style={{ fontWeight: 700, fontSize: 12 }}>{pl.name}</div>

                      <div style={{ fontSize: 9, opacity: 0.7 }}>Max {pl.maxChars > 1000 ? Math.round(pl.maxChars/1000) + 'k' : pl.maxChars} chars · {pl.recommendedSize}</div>

                    </div>

                    {platform === key && <span style={{ fontSize: 14 }}>✓</span>}

                  </button>

                ))}

              </div>

            </div>

            {/* Platform Compliance Card */}

            <div style={{ background: '#0a111e', border: `1px solid ${p.color}30`, borderRadius: 12, padding: 14 }}>

              <div style={{ fontSize: 10, fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>⚠️ {p.name} Compliance Rules</div>

              {p.rules.map((rule, i) => (

                <div key={i} style={{ fontSize: 10, color: '#64748b', padding: '3px 0', display: 'flex', gap: 5, lineHeight: 1.5 }}>

                  <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span>{rule}

                </div>

              ))}

              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${p.color}20` }}>

                <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>📐 Ad Sizes:</div>

                {p.adSizes.map((s, i) => <div key={i} style={{ fontSize: 10, color: '#334155', padding: '2px 0' }}>• {s}</div>)}

              </div>

            </div>

          </div>

          {/* ── RIGHT: Generator + Output ── */}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Post Type + Brief */}

            <div style={{ background: '#0d1520', border: '1px solid #1e2d40', borderRadius: 12, padding: 18 }}>

              <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>2. Post Type & Brief</div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7, marginBottom: 14 }}>

                {POST_TYPES.map(pt => (

                  <button key={pt.value} onClick={() => setPostType(pt.value)} style={{

                    padding: '9px 8px', borderRadius: 8, textAlign: 'left',

                    border: `1.5px solid ${postType === pt.value ? '#22c55e' : '#1e2d40'}`,

                    background: postType === pt.value ? '#22c55e15' : 'transparent',

                    color: postType === pt.value ? '#4ade80' : '#64748b', cursor: 'pointer', fontSize: 11, fontWeight: postType === pt.value ? 700 : 400,

                  }}>

                    {pt.label}

                  </button>

                ))}

              </div>

              {postType === 'custom' && (

                <textarea value={customBrief} onChange={e => setCustomBrief(e.target.value)} rows={3}

                  placeholder="Describe what you want: topic, key message, target audience, any specific details..."

                  style={{ ...inp({ resize: 'vertical', marginBottom: 12 }) }} />

              )}

              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, color: '#94a3b8', userSelect: 'none' }}>

                  <div onClick={() => setIncludeImage(p => !p)} style={{ width: 36, height: 20, borderRadius: 10, background: includeImage ? '#22c55e' : '#1e2d40', position: 'relative', transition: 'background 0.2s', cursor: 'pointer', flexShrink: 0 }}>

                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: includeImage ? 18 : 2, transition: 'left 0.2s' }} />

                  </div>

                  Generate AI Image with post

                </label>

                <span style={{ fontSize: 10, color: '#334155' }}>~5 sec · uses 1 integration credit</span>

              </div>

            </div>

            {/* Generate Button */}

            <button onClick={generate} disabled={generating} style={{

              background: generating ? '#0d1520' : `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,

              border: `1px solid ${p.color}50`, color: generating ? '#334155' : '#fff',

              borderRadius: 11, padding: '15px', fontWeight: 900, fontSize: 15, cursor: generating ? 'not-allowed' : 'pointer',

              boxShadow: generating ? 'none' : `0 4px 20px ${p.color}40`,

            }}>

              {generating ? `⚡ Generating ${p.name} post...` : `${p.icon} Generate ${p.name} Post`}

            </button>

            {/* Output */}

            {generatedPost && (

              <div style={{ background: '#0d1520', border: `1px solid ${p.color}30`, borderRadius: 12, padding: 20 }}>

                {/* Headline */}

                {generatedPost.headline && (

                  <div style={{ fontSize: 18, fontWeight: 900, color: '#f1f5f9', marginBottom: 6 }}>{generatedPost.headline}</div>

                )}

                {/* CTA + format badges */}

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>

                  {generatedPost.cta && <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, background: `${p.color}20`, color: p.color, fontWeight: 700, border: `1px solid ${p.color}40` }}>🎯 CTA: {generatedPost.cta}</span>}

                  {generatedPost.suggested_ad_format && <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, background: '#1e2d40', color: '#94a3b8', fontWeight: 600 }}>📐 {generatedPost.suggested_ad_format}</span>}

                  <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, background: overLimit ? '#ef444420' : '#22c55e15', color: overLimit ? '#f87171' : '#4ade80', fontWeight: 700 }}>

                    {charCount}/{p.maxChars} chars {overLimit ? '⚠️ OVER LIMIT' : '✓'}

                  </span>

                </div>

                {/* Post Text */}

                {editing ? (

                  <textarea value={editedContent} onChange={e => setEditedContent(e.target.value)} rows={8}

                    style={{ ...inp({ resize: 'vertical', lineHeight: 1.7, marginBottom: 10 }) }} />

                ) : (

                  <pre style={{ margin: '0 0 14px', fontFamily: 'inherit', fontSize: 13, color: '#94a3b8', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: '#0a111e', borderRadius: 8, padding: 14 }}>

                    {generatedPost.post_text}

                  </pre>

                )}

                {generatedPost.hashtags && !editing && (

                  <div style={{ fontSize: 12, color: '#3b82f6', fontWeight: 600, marginBottom: 10 }}>{generatedPost.hashtags}</div>

                )}

                {/* Compliance notes */}

                {generatedPost.compliance_notes?.length > 0 && (

                  <div style={{ background: '#22c55e08', border: '1px solid #22c55e20', borderRadius: 8, padding: 12, marginBottom: 14 }}>

                    <div style={{ fontSize: 10, fontWeight: 700, color: '#22c55e', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>✅ Compliance Checklist</div>

                    {generatedPost.compliance_notes.map((note, i) => (

                      <div key={i} style={{ fontSize: 10, color: '#4ade80', padding: '2px 0' }}>✓ {note}</div>

                    ))}

                  </div>

                )}

                {/* Image */}

                {(generatingImage || currentImage) && (

                  <div style={{ marginBottom: 14 }}>

                    <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>🖼 Post Image</div>

                    {generatingImage ? (

                      <div style={{ height: 180, background: '#0a111e', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: 12 }}>

                        ⚡ Generating AI image...

                      </div>

                    ) : currentImage && (

                      <div style={{ position: 'relative' }}>

                        <img src={currentImage} alt="Generated" style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 10, display: 'block' }} />

                        <a href={currentImage} download={`${platform}-post-${Date.now()}.jpg`} style={{ position: 'absolute', top: 8, right: 8, background: '#0a111e', color: '#94a3b8', border: '1px solid #1e2d40', borderRadius: 8, padding: '5px 10px', fontSize: 11, textDecoration: 'none', fontWeight: 700 }}>⬇ Download</a>

                      </div>

                    )}

                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>

                      <label style={{ background: '#1e2d40', border: 'none', color: '#94a3b8', borderRadius: 6, padding: '5px 12px', fontSize: 11, cursor: 'pointer', fontWeight: 700 }}>

                        📁 Upload your own

                        <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />

                      </label>

                      <span style={{ fontSize: 10, color: '#334155' }}>Recommended: {p.recommendedSize} · {p.imageRatio} ratio</span>

                    </div>

                  </div>

                )}

                {/* Image prompt (collapsed) */}

                {generatedPost.image_prompt && (

                  <details style={{ marginBottom: 14 }}>

                    <summary style={{ fontSize: 10, color: '#475569', cursor: 'pointer', fontWeight: 700, userSelect: 'none' }}>🤖 View AI image prompt</summary>

                    <div style={{ fontSize: 11, color: '#334155', marginTop: 6, lineHeight: 1.6, background: '#0a111e', borderRadius: 6, padding: 10 }}>{generatedPost.image_prompt}</div>

                  </details>

                )}

                {/* Action buttons */}

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>

                  <button onClick={copyPost} style={{ flex: 1, background: copied ? '#22c55e15' : '#3b82f615', border: `1px solid ${copied ? '#22c55e40' : '#3b82f640'}`, color: copied ? '#4ade80' : '#60a5fa', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>

                    {copied ? '✅ Copied!' : '📋 Copy Post'}

                  </button>

                  <button onClick={() => setEditing(e => !e)} style={{ background: editing ? '#f59e0b15' : '#1e2d40', border: `1px solid ${editing ? '#f59e0b40' : '#2d4060'}`, color: editing ? '#fbbf24' : '#94a3b8', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>

                    {editing ? '✅ Done Editing' : '✏️ Edit'}

                  </button>

                  <button onClick={savePost} style={{ background: '#a855f715', border: '1px solid #a855f740', color: '#c084fc', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>

                    💾 Save

                  </button>

                  <button onClick={generate} style={{ background: '#1e2d40', border: '1px solid #2d4060', color: '#64748b', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>

                    ↺ Regenerate

                  </button>

                </div>

                {/* Platform publish links */}

                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #1e2d40' }}>

                  <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>🚀 Publish to {p.name}</div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>

                    {platform === 'facebook' && <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ background: '#1877F220', color: '#60a5fa', borderRadius: 7, padding: '6px 12px', fontSize: 11, textDecoration: 'none', fontWeight: 700, border: '1px solid #1877F240' }}>📘 Open Facebook →</a>}

                    {platform === 'instagram' && <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ background: '#E1306C20', color: '#f472b6', borderRadius: 7, padding: '6px 12px', fontSize: 11, textDecoration: 'none', fontWeight: 700, border: '1px solid #E1306C40' }}>📸 Open Instagram →</a>}

                    {platform === 'linkedin' && <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" style={{ background: '#0A66C220', color: '#60a5fa', borderRadius: 7, padding: '6px 12px', fontSize: 11, textDecoration: 'none', fontWeight: 700, border: '1px solid #0A66C240' }}>💼 Open LinkedIn →</a>}

                    {platform === 'twitter' && <a href="https://twitter.com/compose/tweet" target="_blank" rel="noopener noreferrer" style={{ background: '#1DA1F220', color: '#60a5fa', borderRadius: 7, padding: '6px 12px', fontSize: 11, textDecoration: 'none', fontWeight: 700, border: '1px solid #1DA1F240' }}>🐦 Open Twitter/X →</a>}

                    {platform === 'google' && <a href="https://ads.google.com/" target="_blank" rel="noopener noreferrer" style={{ background: '#4285F420', color: '#60a5fa', borderRadius: 7, padding: '6px 12px', fontSize: 11, textDecoration: 'none', fontWeight: 700, border: '1px solid #4285F440' }}>🎯 Open Google Ads →</a>}

                    {platform === 'craigslist' && <a href="https://post.craigslist.org/" target="_blank" rel="noopener noreferrer" style={{ background: '#7B0D1E20', color: '#f87171', borderRadius: 7, padding: '6px 12px', fontSize: 11, textDecoration: 'none', fontWeight: 700, border: '1px solid #7B0D1E40' }}>📰 Post to Craigslist →</a>}

                    <a href="/SocialHQ" style={{ background: '#1e2d40', color: '#94a3b8', borderRadius: 7, padding: '6px 12px', fontSize: 11, textDecoration: 'none', fontWeight: 700, border: '1px solid #2d4060' }}>📣 Open Social HQ →</a>

                  </div>

                </div>

              </div>

            )}

            {/* Upload own image without generating */}

            {!generatedPost && (

              <div style={{ background: '#0d1520', border: '1px dashed #1e2d40', borderRadius: 12, padding: 20, textAlign: 'center' }}>

                <div style={{ fontSize: 32, marginBottom: 10 }}>🖼</div>

                <div style={{ fontSize: 13, color: '#475569', marginBottom: 10 }}>Have your own image? Upload it and generate a matching post.</div>

                <label style={{ background: '#1e2d40', color: '#94a3b8', borderRadius: 8, padding: '8px 16px', fontSize: 12, cursor: 'pointer', fontWeight: 700, display: 'inline-block' }}>

                  📁 Upload Image

                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />

                </label>

                {uploadedImage && <div style={{ marginTop: 10 }}><img src={uploadedImage} alt="" style={{ maxWidth: '100%', maxHeight: 160, borderRadius: 8, objectFit: 'cover' }} /></div>}

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}
