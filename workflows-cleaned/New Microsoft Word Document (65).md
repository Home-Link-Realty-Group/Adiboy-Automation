# New Microsoft Word Document (65)

Source: New Microsoft Word Document (65).docx

export default function HQLeadSourceBreakdown({ leads }) {

  const sourceCounts = {};

  leads.forEach(l => {

    const src = l.source || 'Unknown';

    const key = src.length > 25 ? src.substring(0, 25) + '…' : src;

    sourceCounts[key] = (sourceCounts[key] || 0) + 1;

  });

  const sorted = Object.entries(sourceCounts)

    .sort((a, b) => b[1] - a[1])

    .slice(0, 7);

  const total = leads.length || 1;

  const colors = ['#e74c3c', '#3498db', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22'];

  // Status breakdown

  const statusMap = {};

  leads.forEach(l => { statusMap[l.status || 'Unknown'] = (statusMap[l.status || 'Unknown'] || 0) + 1; });

  const topStatuses = Object.entries(statusMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const dead = leads.filter(l => l.status === 'Dead' || l.status === 'Inactive').length;

  const convRate = total > 0 ? Math.round((leads.filter(l => ['Under Contract', 'Offer Sent', 'Closed'].includes(l.status)).length / total) * 100) : 0;

  return (

    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18 }}>

      <div style={{ fontSize: 12, fontWeight: 900, color: '#3498db', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>📊 Lead Analytics</div>

      <div style={{ marginBottom: 14 }}>

        <div style={{ fontSize: 10, color: '#555', fontWeight: 700, marginBottom: 8 }}>SOURCE BREAKDOWN</div>

        {sorted.length === 0 ? (

          <div style={{ fontSize: 11, color: '#444', textAlign: 'center', padding: '16px 0' }}>No leads yet</div>

        ) : sorted.map(([src, count], i) => {

          const pct = Math.round((count / total) * 100);

          return (

            <div key={i} style={{ marginBottom: 5 }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>

                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{src}</span>

                <span style={{ fontSize: 9, fontWeight: 700, color: colors[i % colors.length] }}>{count} ({pct}%)</span>

              </div>

              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>

                <div style={{ height: '100%', width: `${pct}%`, background: colors[i % colors.length], borderRadius: 3 }} />

              </div>

            </div>

          );

        })}

      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>

        <div style={{ fontSize: 10, color: '#555', fontWeight: 700, marginBottom: 8 }}>STATUS SNAPSHOT</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>

          {topStatuses.map(([status, count], i) => (

            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '4px 8px', fontSize: 9, fontWeight: 700, color: colors[i % colors.length] }}>

              {status}: {count}

            </div>

          ))}

        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 12 }}>

        <div style={{ background: 'rgba(39,174,96,0.1)', borderRadius: 6, padding: '6px', textAlign: 'center' }}>

          <div style={{ fontSize: 14, fontWeight: 900, color: '#27ae60' }}>{convRate}%</div>

          <div style={{ fontSize: 8, color: '#888' }}>Conv Rate</div>

        </div>

        <div style={{ background: 'rgba(231,76,60,0.1)', borderRadius: 6, padding: '6px', textAlign: 'center' }}>

          <div style={{ fontSize: 14, fontWeight: 900, color: '#e74c3c' }}>{dead}</div>

          <div style={{ fontSize: 8, color: '#888' }}>Dead/Inactive</div>

        </div>

        <div style={{ background: 'rgba(52,152,219,0.1)', borderRadius: 6, padding: '6px', textAlign: 'center' }}>

          <div style={{ fontSize: 14, fontWeight: 900, color: '#3498db' }}>{total}</div>

          <div style={{ fontSize: 8, color: '#888' }}>Total Leads</div>

        </div>

      </div>

    </div>

  );

}
