# New Microsoft Word Document (123)

Source: New Microsoft Word Document (123).docx

import { useState } from 'react';

import { base44 } from '@/api/base44Client';

import { socialMediaManager } from '@/functions/socialMediaManager';

const PLATFORM_COLORS = { Facebook: '#1877F2', Instagram: '#E1306C', LinkedIn: '#0A66C2', Twitter: '#1DA1F2' };

const SENTIMENT_COLORS = { Positive: '#27ae60', Neutral: '#3498db', Negative: '#e74c3c', Lead: '#f39c12' };

export default function CommentCenter({ comments, posts, onRefresh }) {

  const [filter, setFilter] = useState('New');

  const [selectedComment, setSelectedComment] = useState(null);

  const [generatingReply, setGeneratingReply] = useState(false);

  const [generatedReply, setGeneratedReply] = useState('');

  const [replyText, setReplyText] = useState('');

  const [saving, setSaving] = useState(false);

  const [showAddManual, setShowAddManual] = useState(false);

  const [manualForm, setManualForm] = useState({ commenter_name: '', platform: 'Facebook', comment_text: '', is_lead: false, sentiment: 'Neutral' });

  const filtered = filter === 'All' ? comments : comments.filter(c => c.status === filter || (filter === 'Leads' && c.is_lead));

  const generateReply = async (comment) => {

    setGeneratingReply(true);

    setGeneratedReply('');

    const post = posts.find(p => p.id === comment.post_id);

    try {

      const res = await socialMediaManager({

        action: 'generate_reply',

        comment_text: comment.comment_text,

        commenter_name: comment.commenter_name,

        platform: comment.platform,

        context: post ? `Post about: ${post.title || post.content?.slice(0, 100)}` : undefined

      });

      const reply = res.data?.reply || '';

      setGeneratedReply(reply);

      setReplyText(reply);

    } catch (e) {

      setGeneratedReply('Error: ' + e.message);

    }

    setGeneratingReply(false);

  };

  const saveResponse = async () => {

    if (!selectedComment || !replyText) return;

    setSaving(true);

    await base44.entities.SocialComment.update(selectedComment.id, {

      response_text: replyText,

      response_date: new Date().toISOString().split('T')[0],

      status: 'Responded',

    });

    setSelectedComment(null);

    setReplyText('');

    setGeneratedReply('');

    if (onRefresh) onRefresh();

    setSaving(false);

  };

  const markIgnored = async (id) => {

    await base44.entities.SocialComment.update(id, { status: 'Ignored' });

    setSelectedComment(null);

    if (onRefresh) onRefresh();

  };

  const saveManual = async () => {

    await base44.entities.SocialComment.create({ ...manualForm, status: 'New', comment_date: new Date().toISOString().split('T')[0] });

    setShowAddManual(false);

    setManualForm({ commenter_name: '', platform: 'Facebook', comment_text: '', is_lead: false, sentiment: 'Neutral' });

    if (onRefresh) onRefresh();

  };

  const newCount = comments.filter(c => c.status === 'New').length;

  const leadCount = comments.filter(c => c.is_lead).length;

  return (

    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>

        <div>

          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0 }}>💬 Comment & DM Center</h1>

          <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>Monitor and respond to all social engagement with AI</div>

        </div>

        <button onClick={() => setShowAddManual(true)} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', borderRadius: 8, padding: '10px 16px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>

          + Add Comment

        </button>

      </div>

      {/* Filter tabs */}

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>

        {[

          { id: 'New', label: `🔔 New (${newCount})` },

          { id: 'Responded', label: '✅ Responded' },

          { id: 'Leads', label: `🎯 Leads (${leadCount})` },

          { id: 'All', label: '📋 All' },

        ].map(f => (

          <button key={f.id} onClick={() => setFilter(f.id)} style={{

            padding: '8px 16px', borderRadius: 20, border: `1.5px solid ${filter === f.id ? '#e74c3c' : 'rgba(255,255,255,0.1)'}`,

            background: filter === f.id ? 'rgba(231,76,60,0.15)' : 'transparent',

            color: filter === f.id ? '#e74c3c' : '#666', fontWeight: 700, fontSize: 12, cursor: 'pointer'

          }}>{f.label}</button>

        ))}

      </div>

      {filtered.length === 0 ? (

        <div style={{ textAlign: 'center', padding: '80px 0', color: '#444' }}>

          <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>

          <div>No comments in this filter</div>

        </div>

      ) : (

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

          {filtered.map(c => (

            <div key={c.id} onClick={() => { setSelectedComment(c); setReplyText(c.response_text || ''); setGeneratedReply(''); }}

              style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.is_lead ? 'rgba(243,156,18,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 10, padding: '14px 18px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>

              <div style={{ flex: 1 }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>

                  <span style={{ fontSize: 12, fontWeight: 900, color: '#fff' }}>{c.commenter_name || 'Anonymous'}</span>

                  <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: PLATFORM_COLORS[c.platform] + '25', color: PLATFORM_COLORS[c.platform], fontWeight: 700 }}>{c.platform}</span>

                  {c.is_lead && <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: '#f39c1225', color: '#f39c12', fontWeight: 900 }}>🎯 LEAD</span>}

                  {c.sentiment && <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: SENTIMENT_COLORS[c.sentiment] + '25', color: SENTIMENT_COLORS[c.sentiment] }}>{c.sentiment}</span>}

                </div>

                <div style={{ fontSize: 12, color: '#ccc', lineHeight: 1.5 }}>{c.comment_text}</div>

                {c.response_text && (

                  <div style={{ marginTop: 8, fontSize: 11, color: '#27ae60', fontStyle: 'italic', background: 'rgba(39,174,96,0.08)', borderRadius: 6, padding: '6px 10px' }}>

                    ✅ Replied: {c.response_text.slice(0, 100)}...

                  </div>

                )}

              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>

                <div style={{ fontSize: 10, fontWeight: 700, color: c.status === 'New' ? '#e74c3c' : c.status === 'Responded' ? '#27ae60' : '#888' }}>{c.status}</div>

                <div style={{ fontSize: 9, color: '#555', marginTop: 3 }}>{c.comment_date}</div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Reply Modal */}

      {selectedComment && (

        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}

          onClick={() => { setSelectedComment(null); setGeneratedReply(''); }}>

          <div onClick={e => e.stopPropagation()} style={{ background: '#1a1a2e', borderRadius: 16, padding: 28, maxWidth: 600, width: '95%', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '85vh', overflowY: 'auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>

              <div style={{ fontSize: 15, fontWeight: 900, color: '#fff' }}>Reply to {selectedComment.commenter_name}</div>

              <button onClick={() => { setSelectedComment(null); setGeneratedReply(''); }} style={{ background: 'none', border: 'none', color: '#888', fontSize: 18, cursor: 'pointer' }}>✕</button>

            </div>

            {/* Original comment */}

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: 12, marginBottom: 16 }}>

              <div style={{ fontSize: 10, color: '#555', marginBottom: 4 }}>{selectedComment.platform} · {selectedComment.comment_date}</div>

              <div style={{ fontSize: 13, color: '#ddd', lineHeight: 1.6 }}>{selectedComment.comment_text}</div>

            </div>

            <button onClick={() => generateReply(selectedComment)} disabled={generatingReply} style={{

              width: '100%', background: generatingReply ? '#333' : 'rgba(231,76,60,0.2)', border: '1px solid rgba(231,76,60,0.4)',

              color: '#e74c3c', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 12, cursor: 'pointer', marginBottom: 12

            }}>

              {generatingReply ? '🤖 Generating AI reply...' : '🤖 Generate AI Reply'}

            </button>

            <div style={{ marginBottom: 14 }}>

              <label style={{ fontSize: 10, color: '#888', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Your Reply</label>

              <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={5} placeholder="Write or edit your reply..."

                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 8, padding: '10px 12px', fontSize: 12, boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 }} />

            </div>

            <div style={{ display: 'flex', gap: 8 }}>

              <button onClick={() => markIgnored(selectedComment.id)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#666', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Ignore</button>

              <button onClick={saveResponse} disabled={saving || !replyText} style={{ flex: 2, background: '#27ae60', border: 'none', color: '#fff', borderRadius: 8, padding: '10px', fontWeight: 900, fontSize: 12, cursor: 'pointer' }}>

                {saving ? 'Saving...' : '✅ Save Reply'}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* Add Manual Comment Modal */}

      {showAddManual && (

        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}

          onClick={() => setShowAddManual(false)}>

          <div onClick={e => e.stopPropagation()} style={{ background: '#1a1a2e', borderRadius: 16, padding: 28, maxWidth: 480, width: '90%', border: '1px solid rgba(255,255,255,0.1)' }}>

            <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginBottom: 18 }}>+ Log Comment / DM</div>

            {[

              { label: 'Name', field: 'commenter_name', placeholder: 'John Smith' },

              { label: 'Comment / DM Text', field: 'comment_text', placeholder: 'What did they say?', textarea: true },

            ].map(f => (

              <div key={f.field} style={{ marginBottom: 12 }}>

                <label style={{ fontSize: 10, color: '#888', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>{f.label}</label>

                {f.textarea

                  ? <textarea value={manualForm[f.field]} onChange={e => setManualForm(p => ({ ...p, [f.field]: e.target.value }))} rows={3} placeholder={f.placeholder} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 7, padding: '8px 12px', fontSize: 12, boxSizing: 'border-box', fontFamily: 'inherit' }} />

                  : <input value={manualForm[f.field]} onChange={e => setManualForm(p => ({ ...p, [f.field]: e.target.value }))} placeholder={f.placeholder} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 7, padding: '8px 12px', fontSize: 12, boxSizing: 'border-box' }} />

                }

              </div>

            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>

              <div>

                <label style={{ fontSize: 10, color: '#888', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Platform</label>

                <select value={manualForm.platform} onChange={e => setManualForm(p => ({ ...p, platform: e.target.value }))} style={{ width: '100%', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 7, padding: '8px 10px', fontSize: 12 }}>

                  {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map(p => <option key={p}>{p}</option>)}

                </select>

              </div>

              <div>

                <label style={{ fontSize: 10, color: '#888', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Sentiment</label>

                <select value={manualForm.sentiment} onChange={e => setManualForm(p => ({ ...p, sentiment: e.target.value }))} style={{ width: '100%', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 7, padding: '8px 10px', fontSize: 12 }}>

                  {['Positive', 'Neutral', 'Negative', 'Lead'].map(s => <option key={s}>{s}</option>)}

                </select>

              </div>

            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>

              <input type="checkbox" id="isLead" checked={manualForm.is_lead} onChange={e => setManualForm(p => ({ ...p, is_lead: e.target.checked }))} style={{ accentColor: '#f39c12' }} />

              <label htmlFor="isLead" style={{ fontSize: 12, color: '#f39c12', fontWeight: 700, cursor: 'pointer' }}>🎯 Mark as Potential Lead</label>

            </div>

            <div style={{ display: 'flex', gap: 10 }}>

              <button onClick={() => setShowAddManual(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: 'none', color: '#888', borderRadius: 8, padding: '11px', cursor: 'pointer' }}>Cancel</button>

              <button onClick={saveManual} style={{ flex: 2, background: '#e74c3c', border: 'none', color: '#fff', borderRadius: 8, padding: '11px', fontWeight: 900, cursor: 'pointer' }}>Save Comment</button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}
