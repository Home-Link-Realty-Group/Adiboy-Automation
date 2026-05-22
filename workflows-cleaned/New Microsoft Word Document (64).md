# New Microsoft Word Document (64)

Source: New Microsoft Word Document (64).docx

export default function HQHotLeadsWall({ leads, followUps }) {

  const today = new Date().toISOString().split('T')[0];

  const hotLeads = leads

    .filter(l => !['Dead', 'Inactive', 'Closed'].includes(l.status))

    .sort((a, b) => (b.motivation_total_score || 0) - (a.motivation_total_score || 0))

    .slice(0, 10);

  const overdueFU = followUps

    .filter(f => f.scheduled_date < today && f.status === 'Scheduled')

    .slice(0, 5);

  const getScoreColor = (score) => {

    if (score >= 16) return '#e74c3c';

    if (score >= 12) return '#f39c12';

    if (score >= 8) return '#3498db';

    return '#555';

  };

  const statusColors = {

    'New Lead': '#3498db', 'Contacted': '#9b59b6', 'Responded': '#e67e22',

    'Offer Sent': '#f39c12', 'Under Contract': '#27ae60', 'Hot': '#e74c3c',

  };

  return (

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

      {/* Hot Leads */}

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>

          <div style={{ fontSize: 12, fontWeight: 900, color: '#e74c3c', letterSpacing: 1, textTransform: 'uppercase' }}>🔥 Top Priority Leads</div>

          <a href="/CRM" style={{ fontSize: 10, color: '#3498db', textDecoration: 'none' }}>View All →</a>

        </div>

        {hotLeads.length === 0 ? (

          <div style={{ textAlign: 'center', padding: '20px 0', color: '#444', fontSize: 12 }}>No active leads yet</div>

        ) : (

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

            {hotLeads.map((l, i) => {

              const score = l.motivation_total_score || 0;

              const sc = getScoreColor(score);

              return (

                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: `3px solid ${sc}` }}>

                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: sc + '22', border: `1.5px solid ${sc}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: sc, flexShrink: 0 }}>

                    {score || '?'}

                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>

                    <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.name || 'Unknown'}</div>

                    <div style={{ fontSize: 9, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.address || l.city || 'No address'}</div>

                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>

                    <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 8, background: (statusColors[l.status] || '#555') + '22', color: statusColors[l.status] || '#888', whiteSpace: 'nowrap' }}>{l.status}</span>

                    {l.priority === 'Hot' && <span style={{ fontSize: 8, color: '#e74c3c', fontWeight: 700 }}>🔥 HOT</span>}

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

      {/* Overdue Follow-Ups */}

      <div style={{ background: overdueFU.length > 0 ? 'rgba(231,76,60,0.05)' : 'rgba(255,255,255,0.03)', border: `1px solid ${overdueFU.length > 0 ? 'rgba(231,76,60,0.25)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 14, padding: 18 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>

          <div style={{ fontSize: 12, fontWeight: 900, color: overdueFU.length > 0 ? '#e74c3c' : '#888', letterSpacing: 1, textTransform: 'uppercase' }}>

            {overdueFU.length > 0 ? '🚨 OVERDUE FOLLOW-UPS' : '📅 Follow-Up Queue'}

          </div>

          <span style={{ fontSize: 10, background: overdueFU.length > 0 ? '#e74c3c' : '#555', color: '#fff', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>{overdueFU.length}</span>

        </div>

        {overdueFU.length === 0 ? (

          <div style={{ textAlign: 'center', padding: '20px 0' }}>

            <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>

            <div style={{ color: '#27ae60', fontSize: 12, fontWeight: 700 }}>All Caught Up!</div>

            <div style={{ color: '#555', fontSize: 10, marginTop: 4 }}>No overdue follow-ups</div>

          </div>

        ) : (

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

            {overdueFU.map((f, i) => {

              const daysOverdue = Math.floor((new Date() - new Date(f.scheduled_date)) / (1000 * 60 * 60 * 24));

              return (

                <div key={i} style={{ padding: '8px 10px', background: 'rgba(231,76,60,0.08)', borderRadius: 8, borderLeft: '3px solid #e74c3c' }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <div>

                      <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{f.lead_name || 'Unknown'}</div>

                      <div style={{ fontSize: 9, color: '#888' }}>Touch #{f.touch_number} — {f.method}</div>

                    </div>

                    <div style={{ textAlign: 'right' }}>

                      <div style={{ fontSize: 9, fontWeight: 700, color: '#e74c3c' }}>{daysOverdue}d overdue</div>

                      <div style={{ fontSize: 8, color: '#666' }}>{f.scheduled_date}</div>

                    </div>

                  </div>

                </div>

              );

            })}

            <a href="/CallLists" style={{ display: 'block', background: '#e74c3c', color: '#fff', borderRadius: 7, padding: '8px', fontSize: 11, fontWeight: 900, textAlign: 'center', textDecoration: 'none', marginTop: 4 }}>

              📞 CALL THEM NOW

            </a>

          </div>

        )}

      </div>

    </div>

  );

}
