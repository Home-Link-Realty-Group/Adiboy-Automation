# New Microsoft Word Document (69)

Source: New Microsoft Word Document (69).docx

export default function HQRevenuePanel({ deals }) {

  const now = new Date();

  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const lastMonth = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;

  const closed = deals.filter(d => d.status === 'Closed');

  const underContract = deals.filter(d => d.status === 'Under Contract');

  const buyerFound = deals.filter(d => d.status === 'Buyer Found');

  const totalRevenue = closed.reduce((s, d) => s + (d.assignment_fee || 0), 0);

  const thisMonthRev = closed

    .filter(d => d.closing_date?.startsWith(thisMonth) || d.created_date?.startsWith(thisMonth))

    .reduce((s, d) => s + (d.assignment_fee || 0), 0);

  const lastMonthRev = closed

    .filter(d => d.closing_date?.startsWith(lastMonth) || d.created_date?.startsWith(lastMonth))

    .reduce((s, d) => s + (d.assignment_fee || 0), 0);

  const pendingValue = [...underContract, ...buyerFound].reduce((s, d) => s + (d.assignment_fee || 0), 0);

  const growth = lastMonthRev > 0 ? Math.round(((thisMonthRev - lastMonthRev) / lastMonthRev) * 100) : 0;

  // Build 6-month trend

  const months = [];

  for (let i = 5; i >= 0; i--) {

    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

    const label = d.toLocaleString('default', { month: 'short' });

    const rev = closed

      .filter(dl => dl.closing_date?.startsWith(key) || dl.created_date?.startsWith(key))

      .reduce((s, dl) => s + (dl.assignment_fee || 0), 0);

    months.push({ label, rev, key });

  }

  const maxRev = Math.max(...months.map(m => m.rev), 1);

  return (

    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18 }}>

      <div style={{ fontSize: 12, fontWeight: 900, color: '#27ae60', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>💰 Revenue & Deals</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>

        {[

          { label: 'Total Earned', val: '$' + totalRevenue.toLocaleString(), color: '#27ae60' },

          { label: 'This Month', val: '$' + thisMonthRev.toLocaleString(), color: '#2ecc71' },

          { label: 'Pending Pipeline', val: '$' + pendingValue.toLocaleString(), color: '#f39c12' },

          { label: 'MoM Growth', val: `${growth > 0 ? '+' : ''}${growth}%`, color: growth >= 0 ? '#27ae60' : '#e74c3c' },

        ].map((item, i) => (

          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>

            <div style={{ fontSize: 14, fontWeight: 900, color: item.color }}>{item.val}</div>

            <div style={{ fontSize: 9, color: '#888', marginTop: 2 }}>{item.label}</div>

          </div>

        ))}

      </div>

      {/* 6-month bar chart */}

      <div style={{ fontSize: 10, color: '#555', marginBottom: 8, fontWeight: 700 }}>6-MONTH REVENUE TREND</div>

      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>

        {months.map((m, i) => {

          const h = maxRev > 0 ? Math.max((m.rev / maxRev) * 52, m.rev > 0 ? 4 : 0) : 0;

          const isCurrent = i === months.length - 1;

          return (

            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>

              <div style={{

                width: '100%', height: h, borderRadius: '3px 3px 0 0',

                background: isCurrent ? '#27ae60' : 'rgba(39,174,96,0.3)',

                transition: 'height 0.6s ease',

              }} title={`$${m.rev.toLocaleString()}`} />

              <div style={{ fontSize: 8, color: isCurrent ? '#27ae60' : '#555' }}>{m.label}</div>

            </div>

          );

        })}

      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>

        <div style={{ flex: 1, background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.2)', borderRadius: 6, padding: '5px 8px', textAlign: 'center' }}>

          <div style={{ fontSize: 14, fontWeight: 900, color: '#27ae60' }}>{closed.length}</div>

          <div style={{ fontSize: 8, color: '#888' }}>Deals Closed</div>

        </div>

        <div style={{ flex: 1, background: 'rgba(155,89,182,0.1)', border: '1px solid rgba(155,89,182,0.2)', borderRadius: 6, padding: '5px 8px', textAlign: 'center' }}>

          <div style={{ fontSize: 14, fontWeight: 900, color: '#9b59b6' }}>{underContract.length}</div>

          <div style={{ fontSize: 8, color: '#888' }}>Under Contract</div>

        </div>

        <div style={{ flex: 1, background: 'rgba(243,156,18,0.1)', border: '1px solid rgba(243,156,18,0.2)', borderRadius: 6, padding: '5px 8px', textAlign: 'center' }}>

          <div style={{ fontSize: 14, fontWeight: 900, color: '#f39c12' }}>{buyerFound.length}</div>

          <div style={{ fontSize: 8, color: '#888' }}>Buyer Found</div>

        </div>

      </div>

    </div>

  );

}
