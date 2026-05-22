# New Microsoft Word Document (128)

Source: New Microsoft Word Document (128).docx

import { useState } from 'react';

import { base44 } from '@/api/base44Client';

import { publishSocialPost } from '@/functions/publishSocialPost';

const STATUS_COLORS = { Draft: '#9b59b6', Scheduled: '#3498db', Published: '#27ae60', Failed: '#e74c3c' };

const PLATFORM_COLORS = { facebook: '#1877F2', instagram: '#E1306C', linkedin: '#0A66C2', twitter: '#1DA1F2' };

const PLATFORM_ICONS = { facebook: '📘', instagram: '📸', linkedin: '💼', twitter: '🐦' };

export default function PostLibrary({ posts, onRefresh }) {

  const [filter, setFilter] = useState('all');

  const [platformFilter, setPlatformFilter] = useState('all');

  const [selectedPost, setSelectedPost] = useState(null);

  const [publishing, setPublishing] = useState(null);

  const [publishResult, setPublishResult] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editContent, setEditContent] = useState('');

  const [saving, setSaving] = useState(false);

  const filtered = posts.filter(p => {

    const statusOk = filter === 'all' || p.status === filter;

    const pfOk = platformFilter === 'all' || (p.platforms || '').toLowerCase().includes(platformFilter);

    return statusOk && pfOk;

  });

  const publishNow = async (post) => {

    setPublishing(post.id);

    setPublishResult(null);

    try {

      const res = await publishSocialPost({

        action: 'publish_all',

        post_id: post.id,

        content: post.content,

        image_url: post.image_url,

        platforms: post.platforms,

      });

      setPublishResult(res.data);

      if (res.data?.ok) onRefresh();

    } catch (e) {

      setPublishResult({ ok: false, error: e.message });

    }

    setPublishing(null);

  };

  const deletePost = async (id) => {

    if (!confirm('Delete this post?')) return;

    setDeleting(true);

    await base44.entities.SocialPost.delete(id);

    setSelectedPost(null);

    setPublishResult(null);

    onRefresh();

    setDeleting(false);

  };

  const saveEdit = async () => {

    setSaving(true);

    await base44.entities.SocialPost.update(selectedPost.id, { content: editContent });

    setSelectedPost(p => ({ ...p, content: editContent }));

    setEditMode(false);

    setSaving(false);

    onRefresh();

  };

  return (

    <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>

        <div>

          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0 }}>📚 Post Library</h1>

          <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{posts.length} total posts · {posts.filter(p=>p.status==='Published').length} published · {posts.filter(p=>p.status==='Draft').length} drafts</div>

        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>

          {['all', 'Draft', 'Scheduled', 'Published', 'Failed'].map(s => (

            <button key={s} onClick={() => setFilter(s)} style={{

              padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${filter === s ? (STATUS_COLORS[s] || '#e74c3c') : 'rgba(255,255,255,0.1)'}`,

              background: filter === s ? (STATUS_COLORS[s] || '#e74c3c') + '20' : 'transparent',

              color: filter === s ? (STATUS_COLORS[s] || '#fff') : '#666', fontSize: 11, fontWeight: 700, cursor: 'pointer'

            }}>{s === 'all' ? 'All Posts' : s}</button>

          ))}

          <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)} style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', color: '#888', borderRadius: 20, padding: '6px 12px', fontSize: 11 }}>

            <option value="all">All Platforms</option>

            <option value="facebook">Facebook</option>

            <option value="instagram">Instagram</option>

            <option value="linkedin">LinkedIn</option>

            <option value="twitter">Twitter</option>

          </select>

        </div>

      </div>

      {filtered.length === 0 ? (

        <div style={{ textAlign: 'center', padding: '80px 0', color: '#444' }}>

          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>

          <div style={{ fontWeight: 700, color: '#666' }}>No posts found</div>

        </div>

      ) : (

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>

          {filtered.map(p => (

            <div key={p.id} style={{

              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',

              borderLeft: `3px solid ${STATUS_COLORS[p.status] || '#555'}`,

              borderRadius: 12, padding: 16, cursor: 'pointer', transition: 'all 0.15s'

            }}

              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}

              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}

              onClick={() => { setSelectedPost(p); setEditMode(false); setEditContent(p.content); setPublishResult(null); }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>

                <div style={{ flex: 1 }}>

                  <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 3, lineHeight: 1.3 }}>{p.title || 'Untitled Post'}</div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>

                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 8, background: STATUS_COLORS[p.status] + '25', color: STATUS_COLORS[p.status] }}>{p.status}</span>

                    <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', color: '#666' }}>{p.post_type}</span>

                  </div>

                </div>

                {p.image_url && <img src={p.image_url} alt="" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8, flexShrink: 0, marginLeft: 10 }} onError={e => e.target.style.display = 'none'} />}

              </div>

              <div style={{ fontSize: 11, color: '#888', lineHeight: 1.55, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>

                {p.content}

              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <div style={{ display: 'flex', gap: 4 }}>

                  {(p.platforms || '').split(',').map(pf => pf.trim().toLowerCase()).filter(Boolean).map(pf => (

                    <span key={pf} title={pf} style={{ fontSize: 14 }}>{PLATFORM_ICONS[pf] || '🌐'}</span>

                  ))}

                </div>

                <div style={{ display: 'flex', gap: 12, fontSize: 10, color: '#555' }}>

                  {p.reach > 0 && <span>👁 {p.reach}</span>}

                  {p.likes > 0 && <span>❤️ {p.likes}</span>}

                  <span>{p.scheduled_date || (p.created_date || '').slice(0,10)}</span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Post Detail Drawer */}

      {selectedPost && (

        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 999, display: 'flex', justifyContent: 'flex-end' }}

          onClick={() => setSelectedPost(null)}>

          <div onClick={e => e.stopPropagation()} style={{

            width: 480, background: '#13132a', borderLeft: '1px solid rgba(255,255,255,0.1)',

            overflowY: 'auto', padding: 28, display: 'flex', flexDirection: 'column', gap: 16

          }}>

            {/* Header */}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

              <div>

                <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{selectedPost.title}</div>

                <div style={{ display: 'flex', gap: 6 }}>

                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 8, background: STATUS_COLORS[selectedPost.status] + '30', color: STATUS_COLORS[selectedPost.status] }}>{selectedPost.status}</span>

                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', color: '#666' }}>{selectedPost.post_type}</span>

                </div>

              </div>

              <button onClick={() => setSelectedPost(null)} style={{ background: 'none', border: 'none', color: '#555', fontSize: 20, cursor: 'pointer' }}>✕</button>

            </div>

            {/* Platforms */}

            <div style={{ display: 'flex', gap: 8 }}>

              {(selectedPost.platforms || '').split(',').map(pf => pf.trim().toLowerCase()).filter(Boolean).map(pf => (

                <div key={pf} style={{ display: 'flex', alignItems: 'center', gap: 5, background: (PLATFORM_COLORS[pf] || '#555') + '20', border: `1px solid ${(PLATFORM_COLORS[pf] || '#555')}40`, borderRadius: 8, padding: '5px 10px' }}>

                  <span>{PLATFORM_ICONS[pf] || '🌐'}</span>

                  <span style={{ fontSize: 11, fontWeight: 700, color: PLATFORM_COLORS[pf] || '#aaa', textTransform: 'capitalize' }}>{pf}</span>

                </div>

              ))}

            </div>

            {/* Content */}

            <div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>

                <span style={{ fontSize: 10, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>Content</span>

                <button onClick={() => setEditMode(!editMode)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#888', borderRadius: 6, padding: '3px 10px', fontSize: 10, cursor: 'pointer' }}>

                  {editMode ? '✕ Cancel' : '✏️ Edit'}

                </button>

              </div>

              {editMode ? (

                <>

                  <textarea value={editContent} onChange={e => setEditContent(e.target.value)} rows={8}

                    style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: 8, padding: 12, fontSize: 12, lineHeight: 1.7, resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />

                  <button onClick={saveEdit} disabled={saving} style={{ width: '100%', background: '#27ae60', border: 'none', color: '#fff', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 12, cursor: 'pointer', marginTop: 8 }}>

                    {saving ? 'Saving...' : '💾 Save Changes'}

                  </button>

                </>

              ) : (

                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: 14, fontSize: 12, color: '#ddd', lineHeight: 1.7, whiteSpace: 'pre-wrap', maxHeight: 220, overflowY: 'auto' }}>

                  {selectedPost.content}

                </div>

              )}

            </div>

            {/* Image */}

            {selectedPost.image_url && (

              <img src={selectedPost.image_url} alt="Post visual" style={{ width: '100%', borderRadius: 10, maxHeight: 200, objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />

            )}

            {/* Analytics */}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>

              {[['👁', 'Reach', selectedPost.reach], ['❤️', 'Likes', selectedPost.likes], ['💬', 'Replies', selectedPost.comments], ['🎯', 'Leads', selectedPost.leads_generated]].map(([icon, label, val]) => (

                <div key={label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 4px' }}>

                  <div style={{ fontSize: 16 }}>{icon}</div>

                  <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{val || 0}</div>

                  <div style={{ fontSize: 9, color: '#555' }}>{label}</div>

                </div>

              ))}

            </div>

            {/* Publish Result */}

            {publishResult && (

              <div style={{ background: publishResult.ok ? 'rgba(39,174,96,0.12)' : 'rgba(231,76,60,0.12)', border: `1px solid ${publishResult.ok ? '#27ae60' : '#e74c3c'}40`, borderRadius: 10, padding: 14 }}>

                {publishResult.ok ? (

                  <div>

                    <div style={{ fontSize: 13, fontWeight: 800, color: '#27ae60', marginBottom: 6 }}>✅ Published Successfully!</div>

                    {publishResult.results?.facebook?.ok && <div style={{ fontSize: 11, color: '#aaa' }}>📘 Facebook: {publishResult.results.facebook.page_name || 'Posted'}</div>}

                    {publishResult.results?.instagram?.ok && <div style={{ fontSize: 11, color: '#aaa' }}>📸 Instagram: Posted</div>}

                  </div>

                ) : (

                  <div>

                    <div style={{ fontSize: 13, fontWeight: 800, color: '#e74c3c', marginBottom: 4 }}>❌ Publish Failed</div>

                    <div style={{ fontSize: 11, color: '#888' }}>{publishResult.error || JSON.stringify(publishResult.results)}</div>

                    {publishResult.not_connected && (

                      <div style={{ marginTop: 8, fontSize: 11, color: '#f39c12' }}>

                        👉 Go to <strong>Connect Accounts</strong> tab to link your Meta account first.

                      </div>

                    )}

                  </div>

                )}

              </div>

            )}

            {/* Actions */}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

              {selectedPost.status !== 'Published' && (

                <button onClick={() => publishNow(selectedPost)} disabled={publishing === selectedPost.id} style={{

                  background: publishing === selectedPost.id ? '#333' : 'linear-gradient(135deg, #1877F2, #E1306C)',

                  border: 'none', color: '#fff', borderRadius: 10, padding: '14px', fontWeight: 900, fontSize: 14, cursor: 'pointer'

                }}>

                  {publishing === selectedPost.id ? '⏳ Publishing...' : '🚀 Publish Now to Social'}

                </button>

              )}

              <button onClick={() => deletePost(selectedPost.id)} disabled={deleting} style={{

                background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.25)',

                color: '#e74c3c', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 12, cursor: 'pointer'

              }}>

                {deleting ? 'Deleting...' : '🗑️ Delete Post'}

              </button>

            </div>

            {selectedPost.scheduled_date && (

              <div style={{ fontSize: 11, color: '#555', textAlign: 'center' }}>📅 Scheduled: {selectedPost.scheduled_date} at {selectedPost.scheduled_time || '09:00'}</div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}
