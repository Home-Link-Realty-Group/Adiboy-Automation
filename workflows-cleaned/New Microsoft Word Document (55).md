# New Microsoft Word Document (55)

Source: New Microsoft Word Document (55).docx

import { useState, useEffect } from 'react';

import { DailyKPI } from '@/api/entities';

const GOALS = { calls_made: 60, contacts_reached: 15, offers_made: 3, talk_time_hours: 3.5 };

export default function HQBattlefield({ leads, followUps }) {

  const [todayKPI, setTodayKPI] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [edit, setEdit] = useState({ calls_made: 0, contacts_reached: 0, offers_made: 0, talk_time_hours: 0 });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => { loadKPI(); }, []);

  async function loadKPI() {

    setLoading(true);

    try {

      const all = await DailyKPI.list();

      const tk = all.find(k => k.date === today);

      setTodayKPI(tk || null);

      if (tk) {

        setEdit({

          calls_made: tk.calls_made || 0,

          contacts_reached: tk.contacts_reached || 0,

          offers_made: tk.offers_made || 0,

          talk_time_hours: tk.talk_time_hours || 0,

        });

      }

    } catch (e) { console.error(e); }

    setLoading(false);

  }

  async function increment(field, delta = 1) {

    const newVal = Math.max(0, (edit[field] || 0) + delta);

    const newEdit = { ...edit, [field]: newVal };

    setEdit(newEdit);

    setSaving(true);

    try {

      if (todayKPI) {

        await DailyKPI.update(todayKPI.id, { [field]: newVal });

      } else {

        const created = await DailyKPI.create({ date: today, ...newEdit });

        setTodayKPI(created);

      }

    } catch (e) { console.error(e); }

    setSaving(false);

  }

  const today_date_str = new Date().toISOString().split('T')[0];

  const overdue = followUps.filter(f => f.scheduled_date < today_date_str && f.status === 'Scheduled').length;

  const todayFU = followUps.filter(f => f.scheduled_date === today_date_str && f.status === 'Scheduled').length;

  const kpiItems = [

    { key: 'calls_made', label: 'Dials', icon: '📞', goal: GOALS.calls_made, color: '#e74c3c' },

    { key: 'contacts_reached', label: 'Contacts', icon: '🤝', goal: GOALS.contacts_reached, color: '#9b59b6' },

    { key: 'offers_made', label: 'Offers', icon: '💵', goal: GOALS.offers_made, color: '#27ae60' },

    { key: 'talk_time_hours', label: 'Talk Hrs', icon: '⏱️', goal: GOALS.talk_time_hours, color: '#3498db', decimal: true },

  ];

  return (

    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18 }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>

        <div style={{ fontSize: 12, fontWeight: 900, color: '#e74c3c', letterSpacing: 1, textTransform: 'uppercase' }}>⚔️ Today's Battlefield</div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>

          {saving && <span style={{ fontSize: 9, color: '#888' }}>saving...</span>}

          <span style={{ fontSize: 9, color: '#555', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 10 }}>{today}</span>

        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>

        {kpiItems.map(item => {

          const val = edit[item.key] || 0;

          const pct = Math.min(100, Math.round((val / item.goal) * 100));

          const met = val >= item.goal;

          return (

            <div key={item.key} style={{ background: met ? `rgba(${item.color === '#27ae60' ? '39,174,96' : item.color === '#e74c3c' ? '231,76,60' : item.color === '#9b59b6' ? '155,89,182' : '52,152,219'},0.12)` : 'rgba(255,255,255,0.04)', border: `1px solid ${met ? item.color + '50' : 'rgba(255,255,255,0.06)'}`, borderRadius: 10, padding: '10px 12px' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>

                <span style={{ fontSize: 12 }}>{item.icon}</span>

                <span style={{ fontSize: 9, fontWeight: 700, color: met ? '#27ae60' : '#555' }}>{met ? '✅ DONE' : `${pct}%`}</span>

              </div>

              <div style={{ fontSize: 22, fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.decimal ? val.toFixed(1) : val}</div>

              <div style={{ fontSize: 9, color: '#888', marginBottom: 6 }}>{item.label} / {item.goal}</div>

              <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>

                <div style={{ height: '100%', width: `${pct}%`, background: item.color, transition: 'width 0.4s' }} />

              </div>

              <div style={{ display: 'flex', gap: 4 }}>

                <button onClick={() => increment(item.key, item.decimal ? 0.5 : 1)} style={{ flex: 1, background: item.color + '22', border: `1px solid ${item.color}44`, color: item.color, borderRadius: 5, padding: '4px 0', fontSize: 14, cursor: 'pointer', fontWeight: 900 }}>+</button>

                <button onClick={() => increment(item.key, item.decimal ? -0.5 : -1)} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#666', borderRadius: 5, padding: '4px 0', fontSize: 14, cursor: 'pointer' }}>−</button>

              </div>

            </div>

          );

        })}

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>

        <div style={{ background: todayFU > 0 ? 'rgba(52,152,219,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${todayFU > 0 ? 'rgba(52,152,219,0.3)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>

          <div style={{ fontSize: 18, fontWeight: 900, color: '#3498db' }}>{todayFU}</div>

          <div style={{ fontSize: 9, color: '#888' }}>FU Due Today</div>

        </div>

        <div style={{ background: overdue > 0 ? 'rgba(231,76,60,0.12)' : 'rgba(255,255,255,0.03)', border: `1px solid ${overdue > 0 ? 'rgba(231,76,60,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>

          <div style={{ fontSize: 18, fontWeight: 900, color: overdue > 0 ? '#e74c3c' : '#555' }}>{overdue}</div>

          <div style={{ fontSize: 9, color: overdue > 0 ? '#e74c3c' : '#888' }}>{overdue > 0 ? '🚨 OVERDUE' : 'Overdue FUs'}</div>

        </div>

      </div>

      <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>

        <a href="/CallLists" style={{ flex: 1, background: '#e74c3c', border: 'none', color: '#fff', borderRadius: 6, padding: '8px', fontSize: 11, fontWeight: 900, textAlign: 'center', textDecoration: 'none' }}>📞 OPEN DIALER</a>

        <a href="/CRM" style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', borderRadius: 6, padding: '8px', fontSize: 11, fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}>👥 CRM</a>

      </div>

    </div>

  );

}
