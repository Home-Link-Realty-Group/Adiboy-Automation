# New Microsoft Word Document (60)

Source: New Microsoft Word Document (60).docx

import { useState, useEffect } from 'react';

const C = { red: '#e63946', green: '#16a34a', gold: '#d97706', blue: '#2563eb', muted: '#64748b', border: '#e2e8f0' };

export default function HQGBPPanel() {

  const [connected, setConnected] = useState(false);

  const [stats, setStats] = useState({ reviews: 0, avgRating: 0, unanswered: 0, posts: 0 });

  const [loading, setLoading] = useState(true);

  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {

    checkGBPStatus();

  }, []);

  async function checkGBPStatus() {

    try {

      const res = await fetch('https://the-replicator-bfa0beaa.base44.app/functions/gbpData', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ action: 'get_accounts' }),

      });

      const data = await res.json();

      if (data.accounts?.length > 0) {

        setConnected(true);

        // Mock stats — in production would fetch real data

        setStats({ reviews: 24, avgRating: 4.8, unanswered: 2, posts: 7 });

        setRecentReviews([

          { name: 'John Smith', rating: 5, text: 'Great service! Closed in 7 days.', date: '2026-04-14' },

          { name: 'Sarah Johnson', rating: 4, text: 'Professional team, fair offer.', date: '2026-04-12' },

        ]);

      }

    } catch (e) {

      setConnected(false);

    }

    setLoading(false);

  }

  if (loading) return <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 16, color: '#666', fontSize: 12 }}>Loading GBP...</div>;

  return (

    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 16 }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>

        <div style={{ fontSize: 11, fontWeight: 900, color: '#4285F4', textTransform: 'uppercase', letterSpacing: 1 }}>📍 Google Business Profile</div>

        <a href='/GBPManager' style={{ fontSize: 10, color: '#4285F4', fontWeight: 700, textDecoration: 'none' }}>Manage →</a>

      </div>

      {!connected ? (

        <div style={{ textAlign: 'center', padding: '20px 0', color: C.muted, fontSize: 12 }}>

          <div style={{ marginBottom: 10 }}>Not connected</div>

          <a href='/GBPManager' style={{ display: 'inline-block', background: '#4285F4', color: '#fff', padding: '6px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>

            Connect GBP →

          </a>

        </div>

      ) : (

        <>

          {/* Stats */}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>

            {[

              { label: 'Reviews', val: stats.reviews, color: C.blue },

              { label: 'Rating', val: stats.avgRating, color: C.gold },

              { label: 'Unanswered', val: stats.unanswered, color: stats.unanswered > 0 ? C.red : C.green },

              { label: 'Posts', val: stats.posts, color: C.green },

            ].map(s => (

              <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 8, textAlign: 'center' }}>

                <div style={{ fontSize: 14, fontWeight: 900, color: s.color }}>{s.val}</div>

                <div style={{ fontSize: 8, color: '#555', marginTop: 2 }}>{s.label}</div>

              </div>

            ))}

          </div>

          {/* Recent reviews */}

          <div style={{ fontSize: 9, fontWeight: 700, color: '#555', textTransform: 'uppercase', marginBottom: 6 }}>Recent Reviews</div>

          {recentReviews.map((r, i) => (

            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: '8px 10px', marginBottom: 6, fontSize: 10 }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>

                <span style={{ fontWeight: 700, color: '#ccc' }}>{r.name}</span>

                <span style={{ color: C.gold }}>{'★'.repeat(r.rating)}</span>

              </div>

              <div style={{ color: '#999', fontSize: 9 }}>{r.text.substring(0, 50)}...</div>

            </div>

          ))}

          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>

            <a href='/GBPManager' style={{ flex: 1, background: 'rgba(66,133,244,0.2)', border: '1px solid rgba(66,133,244,0.3)', color: '#4285F4', borderRadius: 6, padding: '6px', fontSize: 10, fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}>

              📤 Post

            </a>

            <a href='/GBPManager' style={{ flex: 1, background: 'rgba(66,133,244,0.2)', border: '1px solid rgba(66,133,244,0.3)', color: '#4285F4', borderRadius: 6, padding: '6px', fontSize: 10, fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}>

              💬 Reply

            </a>

          </div>

        </>

      )}

    </div>

  );

}
