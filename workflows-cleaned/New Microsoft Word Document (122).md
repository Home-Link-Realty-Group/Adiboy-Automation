# New Microsoft Word Document (122)

Source: New Microsoft Word Document (122).docx

import { useState } from 'react';

import { base44 } from '@/api/base44Client';

import { socialMediaManager } from '@/functions/socialMediaManager';

const STATUS_COLORS = { Active: '#27ae60', Paused: '#f39c12', Completed: '#3498db', Draft: '#9b59b6' };

export default function CampaignManager({ campaigns, posts, onRefresh }) {

  const [showCreate, setShowCreate] = useState(false);

  const [showPlanner, setShowPlanner] = useState(false);

  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const [form, setForm] = useState({ name: '', goal: '', platforms: 'Facebook, Instagram', start_date: '', end_date: '', notes: '', status: 'Draft' });

  const [saving, setSaving] = useState(false);

  const [plannerForm, setPlannerForm] = useState({ campaign_goal: '', platforms: 'Facebook, Instagram', duration_days: '30', post_frequency: '5 posts per week' });

  const [planning, setPlanning] = useState(false);

  const [generatedPlan, setGeneratedPlan] = useState(null);

  const saveCampaign = async () => {

    if (!form.name) return;

    setSaving(true);

    await base44.entities.SocialCampaign.create(form);

    setSaving(false);

    setShowCreate(false);

    setForm({ name: '', goal: '', platforms: 'Facebook, Instagram', start_date: '', end_date: '', notes: '', status: 'Draft' });

    if (onRefresh) onRefresh();

  };

  const updateStatus = async (id, status) => {

    await base44.entities.SocialCampaign.update(id, { status });

    if (onRefresh) onRefresh();

  };

  const deleteCampaign = async (id) => {

    if (!confirm('Delete this campaign?')) return;

    await base44.entities.SocialCampaign.delete(id);

    setSelectedCampaign(null);

    if (onRefresh) onRefresh();

  };

  const planCampaign = async () => {

    if (!plannerForm.campaign_goal) return;

    setPlanning(true);

    setGeneratedPlan(null);

    try {

      const res = await socialMediaManager({ action: 'plan_campaign', ...plannerForm });

      setGeneratedPlan(res.data?.plan);

    } catch (e) {

      alert('Planning failed: ' + e.message);

    }

    setPlanning(false);

  };

  const getCampaignPosts = (campaignId) => posts.filter(p => p.campaign_id === campaignId);

  return (

    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>

        <div>

          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0 }}>🚀 Campaigns</h1>

          <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>Group posts into focused marketing campaigns</div>

        </div>

        <div style={{ display: 'flex', gap: 10 }}>

          <button onClick={() => setShowPlanner(true)} style={{ background: 'rgba(52,152,219,0.2)', border: '1px solid rgba(52,152,219,0.4)', color: '#3498db', borderRadius: 8, padding: '10px 16px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>

            🤖 AI Campaign Planner

          </button>

          <button onClick={() => setShowCreate(true)} style={{ background: '#e74c3c', border: 'none', color: '#fff', borderRadius: 8, padding: '10px 16px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>

            + New Campaign

          </button>

        </div>

      </div>

      {campaigns.length === 0 ? (

        <div style={{ textAlign: 'center', padding: '80px 0', color: '#444' }}>

          <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>

          <div style={{ fontWeight: 700, marginBottom: 6 }}>No campaigns yet</div>

          <div style={{ fontSize: 12 }}>Create a campaign to group related posts and track performance together</div>

        </div>

      ) : (

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>

          {campaigns.map(c => {

            const cPosts = getCampaignPosts(c.id);

            return (

              <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${STATUS_COLORS[c.status]}30`, borderTop: `3px solid ${STATUS_COLORS[c.status]}`, borderRadius: 12, padding: 18 }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>

                  <div>

                    <div style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>{c.name}</div>

                    <div style={{ fontSize: 11, color: '#666', marginTop: 3 }}>{c.goal}</div>

                  </div>

                  <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 8, background: STATUS_COLORS[c.status] + '25', color: STATUS_COLORS[c.status] }}>{c.status}</span>

                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>

                  {[['Posts', cPosts.length], ['Reach', (c.total_reach || 0).toLocaleString()], ['Leads', c.total_leads || 0]].map(([label, val]) => (

                    <div key={label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 7, padding: '8px' }}>

                      <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{val}</div>

                      <div style={{ fontSize: 9, color: '#555' }}>{label}</div>

                    </div>

                  ))}

                </div>

                {c.start_date && <div style={{ fontSize: 10, color: '#555', marginBottom: 10 }}>📅 {c.start_date}{c.end_date ? ` → ${c.end_date}` : ''}</div>}

                <div style={{ display: 'flex', gap: 6 }}>

                  {c.status !== 'Active' && <button onClick={() => updateStatus(c.id, 'Active')} style={{ flex: 1, background: '#27ae6020', border: '1px solid #27ae6040', color: '#27ae60', borderRadius: 6, padding: '6px', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>▶ Activate</button>}

                  {c.status === 'Active' && <button onClick={() => updateStatus(c.id, 'Paused')} style={{ flex: 1, background: '#f39c1220', border: '1px solid #f39c1240', color: '#f39c12', borderRadius: 6, padding: '6px', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>⏸ Pause</button>}

                  <button onClick={() => deleteCampaign(c.id)} style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', color: '#e74c3c', borderRadius: 6, padding: '6px 10px', fontSize: 10, cursor: 'pointer' }}>🗑️</button>

                </div>

              </div>

            );

          })}

        </div>

      )}

      {/* Create Campaign Modal */}

      {showCreate && (

        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}

          onClick={() => setShowCreate(false)}>

          <div onClick={e => e.stopPropagation()} style={{ background: '#1a1a2e', borderRadius: 16, padding: 28, maxWidth: 480, width: '90%', border: '1px solid rgba(255,255,255,0.1)' }}>

            <div style={{ fontSize: 16, fontWeight: 900, color: '#fff', marginBottom: 20 }}>🚀 New Campaign</div>

            {[

              { label: 'Campaign Name *', field: 'name', placeholder: 'e.g. April Motivated Seller Push' },

              { label: 'Goal / Objective', field: 'goal', placeholder: 'e.g. Generate 10 seller leads from Facebook' },

              { label: 'Platforms', field: 'platforms', placeholder: 'Facebook, Instagram' },

              { label: 'Start Date', field: 'start_date', type: 'date' },

              { label: 'End Date', field: 'end_date', type: 'date' },

            ].map(f => (

              <div key={f.field} style={{ marginBottom: 12 }}>

                <label style={{ fontSize: 10, color: '#888', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>{f.label}</label>

                <input type={f.type || 'text'} value={form[f.field]} onChange={e => setForm(p => ({ ...p, [f.field]: e.target.value }))} placeholder={f.placeholder}

                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 7, padding: '9px 12px', fontSize: 12, boxSizing: 'border-box' }} />

              </div>

            ))}

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>

              <button onClick={() => setShowCreate(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: 'none', color: '#888', borderRadius: 8, padding: '11px', cursor: 'pointer', fontSize: 12 }}>Cancel</button>

              <button onClick={saveCampaign} disabled={saving || !form.name} style={{ flex: 2, background: '#e74c3c', border: 'none', color: '#fff', borderRadius: 8, padding: '11px', fontWeight: 900, fontSize: 12, cursor: 'pointer' }}>

                {saving ? 'Creating...' : 'Create Campaign'}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* AI Planner Modal */}

      {showPlanner && (

        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}

          onClick={() => { setShowPlanner(false); setGeneratedPlan(null); }}>

          <div onClick={e => e.stopPropagation()} style={{ background: '#1a1a2e', borderRadius: 16, padding: 28, maxWidth: 640, width: '95%', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '85vh', overflowY: 'auto' }}>

            <div style={{ fontSize: 16, fontWeight: 900, color: '#fff', marginBottom: 20 }}>🤖 AI Campaign Planner</div>

            {!generatedPlan ? (

              <>

                {[

                  { label: 'Campaign Goal', field: 'campaign_goal', placeholder: 'e.g. Generate motivated seller leads for Dallas TX market' },

                  { label: 'Target Platforms', field: 'platforms', placeholder: 'Facebook, Instagram' },

                  { label: 'Duration (days)', field: 'duration_days', placeholder: '30' },

                  { label: 'Post Frequency', field: 'post_frequency', placeholder: '5 posts per week' },

                ].map(f => (

                  <div key={f.field} style={{ marginBottom: 14 }}>

                    <label style={{ fontSize: 10, color: '#888', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>{f.label}</label>

                    <input value={plannerForm[f.field]} onChange={e => setPlannerForm(p => ({ ...p, [f.field]: e.target.value }))} placeholder={f.placeholder}

                      style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 7, padding: '9px 12px', fontSize: 12, boxSizing: 'border-box' }} />

                  </div>

                ))}

                <button onClick={planCampaign} disabled={planning || !plannerForm.campaign_goal} style={{ width: '100%', background: planning ? '#333' : '#3498db', border: 'none', color: '#fff', borderRadius: 8, padding: '13px', fontWeight: 900, fontSize: 13, cursor: planning ? 'not-allowed' : 'pointer', marginTop: 6 }}>

                  {planning ? '🤖 Planning your campaign...' : '⚡ Generate Campaign Plan'}

                </button>

              </>

            ) : (

              <div>

                <div style={{ background: 'rgba(52,152,219,0.1)', border: '1px solid rgba(52,152,219,0.3)', borderRadius: 10, padding: 16, marginBottom: 16 }}>

                  <div style={{ fontSize: 14, fontWeight: 900, color: '#3498db', marginBottom: 6 }}>{generatedPlan.campaign_name}</div>

                  <div style={{ fontSize: 12, color: '#aaa' }}>Theme: {generatedPlan.theme}</div>

                </div>

                <div style={{ marginBottom: 14 }}>

                  <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>Weekly Themes</div>

                  {(generatedPlan.weekly_themes || []).map((wt, i) => (

                    <div key={i} style={{ fontSize: 12, color: '#ccc', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>• {wt}</div>

                  ))}

                </div>

                <div style={{ marginBottom: 14 }}>

                  <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>Post Ideas ({(generatedPlan.post_ideas || []).length})</div>

                  <div style={{ maxHeight: 280, overflowY: 'auto' }}>

                    {(generatedPlan.post_ideas || []).map((pi, i) => (

                      <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

                        <div style={{ fontSize: 10, fontWeight: 900, color: '#e74c3c', minWidth: 40, marginTop: 2 }}>Day {pi.day}</div>

                        <div>

                          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{pi.type} — {pi.topic}</div>

                          <div style={{ fontSize: 10, color: '#666', marginTop: 2, fontStyle: 'italic' }}>"{pi.hook}"</div>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {generatedPlan.hashtags?.length > 0 && (

                  <div style={{ marginBottom: 16 }}>

                    <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', marginBottom: 6 }}>Hashtags</div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>

                      {generatedPlan.hashtags.map((h, i) => (

                        <span key={i} style={{ fontSize: 10, background: 'rgba(52,152,219,0.15)', color: '#3498db', padding: '3px 8px', borderRadius: 8 }}>#{h}</span>

                      ))}

                    </div>

                  </div>

                )}

                <div style={{ display: 'flex', gap: 10 }}>

                  <button onClick={() => setGeneratedPlan(null)} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: 'none', color: '#888', borderRadius: 8, padding: '10px', cursor: 'pointer', fontSize: 12 }}>← Regenerate</button>

                  <button onClick={async () => {

                    await base44.entities.SocialCampaign.create({

                      name: generatedPlan.campaign_name,

                      goal: plannerForm.campaign_goal,

                      platforms: plannerForm.platforms,

                      status: 'Draft',

                      notes: `AI Generated — Theme: ${generatedPlan.theme}\nCTA: ${generatedPlan.cta}`

                    });

                    setShowPlanner(false);

                    setGeneratedPlan(null);

                    if (onRefresh) onRefresh();

                  }} style={{ flex: 2, background: '#27ae60', border: 'none', color: '#fff', borderRadius: 8, padding: '10px', fontWeight: 900, fontSize: 12, cursor: 'pointer' }}>

                    💾 Save Campaign

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}
