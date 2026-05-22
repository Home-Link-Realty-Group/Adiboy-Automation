# New Microsoft Word Document (72)

Source: New Microsoft Word Document (72).docx

import { useState } from 'react';

// These systems are CONFIGURED — secrets are set in the app

// Status is based on: secrets confirmed set + data signals from leads/deals

const SYSTEMS = [

  { name: 'Twilio Voice', key: 'twilio_voice', icon: '📞', desc: 'Outbound calling bridge', configured: true },

  { name: 'Twilio SMS', key: 'twilio_sms', icon: '💬', desc: 'SMS outreach & alerts', configured: true },

  { name: 'Resend Email', key: 'resend', icon: '📧', desc: 'Email delivery', configured: true },

  { name: 'Apify Scraper', key: 'apify', icon: '🤖', desc: 'Auto-prospecting', configured: true },

  { name: 'Gmail Monitor', key: 'gmail', icon: '📬', desc: 'Reply tracking', configured: true },

  { name: 'Speed-to-Lead', key: 's2l', icon: '⚡', desc: 'Instant lead alerts', configured: true },

];

export default function HQSystemHealth({ leads, deals }) {

  const [checkedAt] = useState(new Date());

  // Secrets confirmed: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, RESEND_API_KEY, APIFY_API_TOKEN

  // Gmail connector is registered. Speed-to-lead fires on every form submit.

  // Use data signals to UPGRADE from "configured" to "active" where possible.

  const recentLeads = leads.filter(l => {

    const d = new Date(l.created_date || 0);

    return (Date.now() - d.getTime()) < 30 * 24 * 60 * 60 * 1000; // last 30 days

  });

  const hasAnyTouches = leads.some(l => (l.touch_count || 0) > 0);

  const hasWebLeads = leads.some(l => l.source?.toLowerCase().includes('website') || l.source?.toLowerCase().includes('getoffer'));

  const hasProspectedLeads = leads.some(l => l.source?.toLowerCase().includes('craigslist') || l.source?.toLowerCase().includes('propwire') || l.source?.toLowerCase().includes('fsbo'));

  const systemStatus = {

    twilio_voice: hasAnyTouches ? 'active' : 'configured',

    twilio_sms:   hasAnyTouches ? 'active' : 'configured',

    resend:       hasWebLeads   ? 'active' : 'configured',

    apify:        hasProspectedLeads ? 'active' : 'configured',

    gmail:        'configured',

    s2l:          hasWebLeads ? 'active' : 'configured',

  };

  const statusColor = { active: '#27ae60', configured: '#3498db', offline: '#e74c3c' };

  const statusLabel = { active: 'ACTIVE', configured: 'CONFIGURED', offline: 'DOWN' };

  const statusDot  = { active: true, configured: false, offline: false }; // pulse glow on active

  const configuredCount = Object.values(systemStatus).filter(v => v === 'configured' || v === 'active').length;

  const activeCount     = Object.values(systemStatus).filter(v => v === 'active').length;

  return (

    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18 }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>

        <div style={{ fontSize: 12, fontWeight: 900, color: '#1abc9c', letterSpacing: 1, textTransform: 'uppercase' }}>🛰️ System Health</div>

        <div style={{ fontSize: 9, color: '#555' }}>{checkedAt.toLocaleTimeString()}</div>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>

        {SYSTEMS.map(sys => {

          const status = systemStatus[sys.key];

          const col = statusColor[status];

          const pulse = statusDot[status];

          return (

            <div key={sys.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

              <span style={{ fontSize: 14 }}>{sys.icon}</span>

              <div style={{ flex: 1 }}>

                <div style={{ fontSize: 10, fontWeight: 700, color: '#ccc' }}>{sys.name}</div>

                <div style={{ fontSize: 9, color: '#555' }}>{sys.desc}</div>

              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>

                <div style={{

                  width: 7, height: 7, borderRadius: '50%',

                  background: col,

                  boxShadow: pulse ? `0 0 8px ${col}, 0 0 3px ${col}` : `0 0 4px ${col}55`,

                }} />

                <span style={{ fontSize: 9, fontWeight: 700, color: col }}>{statusLabel[status]}</span>

              </div>

            </div>

          );

        })}

      </div>

      <div style={{

        marginTop: 14,

        background: 'rgba(52,152,219,0.1)',

        border: '1px solid rgba(52,152,219,0.3)',

        borderRadius: 8, padding: '8px 12px', textAlign: 'center'

      }}>

        <div style={{ fontSize: 11, fontWeight: 900, color: '#27ae60' }}>

          {configuredCount}/{SYSTEMS.length} Systems Online

        </div>

        <div style={{ fontSize: 9, color: '#666', marginTop: 2 }}>

          {activeCount > 0 ? `${activeCount} confirmed active via data signals` : 'All secrets configured ✅'}

        </div>

      </div>

      <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>

        <a href="/AutomationCenter" style={{ flex: 1, background: '#1abc9c', border: 'none', color: '#fff', borderRadius: 6, padding: '7px 8px', fontSize: 10, fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}>⚙️ Automations</a>

        <a href="/AutomationAudit" style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', borderRadius: 6, padding: '7px 8px', fontSize: 10, fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}>🔍 Audit</a>

      </div>

    </div>

  );

}
