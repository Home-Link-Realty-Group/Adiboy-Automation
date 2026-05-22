# New Microsoft Word Document (129)

Source: New Microsoft Word Document (129).docx

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PLATFORM_COLORS = {

  Facebook: '#1877F2', Instagram: '#E1306C', LinkedIn: '#0A66C2', Twitter: '#1DA1F2',

  facebook: '#1877F2', instagram: '#E1306C', linkedin: '#0A66C2', twitter: '#1DA1F2'

};

const STATUS_COLORS = { Published: '#27ae60', Scheduled: '#3498db', Draft: '#9b59b6', Failed: '#e74c3c' };

export default function SocialDashboard({ posts, campaigns, comments, onNavigate }) {

  const published = posts.filter(p => p.status === 'Published');

  const scheduled = posts.filter(p => p.status === 'Scheduled');

  const drafts = posts.filter(p => p.status === 'Draft');

  const newComments = comments.filter(c => c.status === 'New');

  const leadComments = comments.filter(c => c.is_lead);

  const activeCampaigns = campaigns.filter(c => c.status === 'Active');

  const totalReach = published.reduce((s, p) => s + (p.reach || 0), 0);

  const totalLeads = published.reduce((s, p) => s + (p.leads_generated || 0), 0);

  const totalLikes = published.reduce((s, p) => s + (p.likes || 0), 0);

  // Platform distribution for bar chart

  const platformCounts = {};

  posts.forEach(p => {

    (p.platforms || '').split(',').forEach(pf => {

      const k = pf.trim().toLowerCase();

      if (k) platformCounts[k] = (platformCounts[k] || 0) + 1;

    });

  });

  const platformData = Object.entries(platformCounts).map(([name, value]) => ({

    name: name.charAt(0).toUpperCase() + name.slice(1), value,

    fill: PLATFORM_COLORS[name] || '#666'

  }));

  const recentPosts = [...posts].sort((a, b) => new Date(b.created_date) - new Date(a.created_date)).slice(0, 6);

  const CustomTooltip = ({ active, payload, label }) => {

    if (!active || !payload?.length) return null;

    return (

      <div style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', fontSize: 11 }}>

        <div style={{ color: '#fff', fontWeight: 700 }}>{label}: {payload[0]?.value}</div>

      </div>

    );

  };

  return (

    <div style={{ padding: '28px', maxWidth: 1400, margin: '0 auto' }}>

      {/* Header */}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>

        <div>

          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: 0 }}>📊 Social Dashboard</h1>

          <div style={{ fontSize: 12, color: '#444', marginTop: 5 }}>Home-Link Realty Group · All Platforms Overview</div>

        </div>

        <button onClick={() => onNavigate('composer')} style={{

          background: 'linear-gradient(135deg, #e74c3c, #c0392b)', border: 'none', color: '#fff',

          borderRadius: 10, padding: '12px 22px', fontWeight: 900, fontSize: 13, cursor: 'pointer'

        }}>

          ✍️ New Post

        </button>

      </div>

      {/* KPI Strip */}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 10, marginBottom: 24 }}>

        {[

          { label: 'Published', val: published.length, icon: '✅', color: '#27ae60' },

          { label: 'Scheduled', val: scheduled.length, icon: '📅', color: '#3498db' },

          { label: 'Drafts', val: drafts.length, icon: '📝', color: '#9b59b6' },

          { label: 'Campaigns', val: activeCampaigns.length, icon: '🚀', color: '#e67e22' },

          { label: 'Total Reach', val: totalReach > 999 ? (totalReach/1000).toFixed(1)+'K' : totalReach, icon: '👁', color: '#3498db' },

          { label: 'Total Likes', val: totalLikes.toLocaleString(), icon: '❤️', color: '#e74c3c' },

          { label: 'New Comments', val: newComments.length, icon: '💬', color: '#1abc9c', alert: newComments.length > 0 },

          { label: 'Social Leads', val: totalLeads, icon: '🎯', color: '#f39c12' },

        ].map(s => (

          <div key={s.label} onClick={() => {

            if (s.label === 'New Comments') onNavigate('comments');

            if (s.label === 'Campaigns') onNavigate('campaigns');

            if (s.label === 'Drafts') onNavigate('library');

          }} style={{

            background: s.alert ? 'rgba(26,188,156,0.08)' : 'rgba(255,255,255,0.04)',

            borderTop: `2px solid ${s.color}`, borderRadius: 10, padding: '12px 8px', textAlign: 'center',

            cursor: ['New Comments', 'Campaigns', 'Drafts'].includes(s.label) ? 'pointer' : 'default',

            transition: 'all 0.15s'

          }}>

            <div style={{ fontSize: 18 }}>{s.icon}</div>

            <div style={{ fontSize: 18, fontWeight: 900, color: s.color, lineHeight: 1.2 }}>{s.val}</div>

            <div style={{ fontSize: 9, color: '#555', marginTop: 2, lineHeight: 1.3 }}>{s.label}</div>

          </div>

        ))}

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>

        {/* Recent Posts */}

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20 }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>

            <div style={{ fontSize: 12, fontWeight: 900, color: '#3498db', textTransform: 'uppercase', letterSpacing: 1 }}>📋 Recent Posts</div>

            <button onClick={() => onNavigate('library')} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>View All →</button>

          </div>

          {recentPosts.length === 0 ? (

            <div style={{ textAlign: 'center', padding: '40px 0', color: '#444' }}>

              <div style={{ fontSize: 28, marginBottom: 8 }}>✍️</div>

              <div style={{ fontSize: 12 }}>No posts yet — create your first in the AI Composer!</div>

              <button onClick={() => onNavigate('composer')} style={{ background: '#e74c3c', border: 'none', color: '#fff', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 12, cursor: 'pointer', marginTop: 12 }}>Create First Post</button>

            </div>

          ) : recentPosts.map(p => (

            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

              <div style={{ flex: 1 }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>

                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{p.title || 'Untitled Post'}</span>

                  <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 7, background: STATUS_COLORS[p.status] + '25', color: STATUS_COLORS[p.status] }}>{p.status}</span>

                </div>

                <div style={{ fontSize: 10, color: '#444' }}>{(p.content || '').slice(0, 70)}</div>

              </div>

              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>

                <div style={{ fontSize: 10, color: '#555' }}>{(p.platforms || '').split(',').slice(0,2).join(', ')}</div>

                <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>

                  {p.reach > 0 && `👁 ${p.reach}`} {p.likes > 0 && `❤️ ${p.likes}`}

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Right column */}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Platform Distribution */}

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18 }}>

            <div style={{ fontSize: 11, fontWeight: 900, color: '#e67e22', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>🌐 Platform Mix</div>

            {platformData.length === 0 ? (

              <div style={{ color: '#444', fontSize: 11, padding: '20px 0', textAlign: 'center' }}>No posts yet</div>

            ) : (

              <ResponsiveContainer width="100%" height={140}>

                <BarChart data={platformData}>

                  <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 9 }} />

                  <YAxis tick={{ fill: '#555', fontSize: 9 }} />

                  <Tooltip content={({ active, payload, label }) => active && payload?.length ? (

                    <div style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '7px 11px', fontSize: 11 }}>

                      <span style={{ color: '#fff' }}>{label}: {payload[0]?.value}</span>

                    </div>

                  ) : null} />

                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>

                    {platformData.map((entry, i) => (

                      <rect key={i} fill={entry.fill} />

                    ))}

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            )}

          </div>

          {/* Active Campaigns */}

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18, flex: 1 }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>

              <div style={{ fontSize: 11, fontWeight: 900, color: '#e74c3c', textTransform: 'uppercase', letterSpacing: 1 }}>🚀 Active Campaigns</div>

              <button onClick={() => onNavigate('campaigns')} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>+ New</button>

            </div>

            {activeCampaigns.length === 0 ? (

              <div style={{ color: '#444', fontSize: 11, padding: '16px 0', textAlign: 'center' }}>No active campaigns</div>

            ) : activeCampaigns.map(c => (

              <div key={c.id} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{c.name}</div>

                <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>{c.post_count || 0} posts · {c.total_leads || 0} leads</div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* New Comments / Leads */}

      {newComments.length > 0 && (

        <div style={{ background: 'rgba(26,188,156,0.05)', border: '1px solid rgba(26,188,156,0.2)', borderRadius: 14, padding: 20 }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>

            <div style={{ fontSize: 12, fontWeight: 900, color: '#1abc9c', textTransform: 'uppercase', letterSpacing: 1 }}>💬 Comments Needing Response ({newComments.length})</div>

            <button onClick={() => onNavigate('comments')} style={{ background: 'none', border: 'none', color: '#1abc9c', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Respond All →</button>

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>

            {newComments.slice(0, 4).map(c => (

              <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 12 }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>

                  <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{c.commenter_name || 'Anonymous'}</span>

                  <span style={{ fontSize: 9, background: (PLATFORM_COLORS[c.platform] || '#555') + '30', color: PLATFORM_COLORS[c.platform] || '#888', padding: '1px 6px', borderRadius: 8 }}>{c.platform}</span>

                  {c.is_lead && <span style={{ fontSize: 9, background: '#f39c1225', color: '#f39c12', padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>🎯 LEAD</span>}

                </div>

                <div style={{ fontSize: 11, color: '#888', lineHeight: 1.5 }}>{(c.comment_text || '').slice(0, 90)}</div>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );

}
