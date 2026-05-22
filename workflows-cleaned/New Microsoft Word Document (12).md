# New Microsoft Word Document (12)

Source: New Microsoft Word Document (12).docx

import { useState, useEffect } from 'react';

import { base44 } from '@/api/base44Client';

import ToggleSwitch from './ToggleSwitch';

import StatusLight from './StatusLight';

import { Zap } from 'lucide-react';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

/**

 * Automated workflow sequences with on/off control.

 * Persists to localStorage (per-user) for fast UI feedback.

 */

const AUTOMATIONS = [

  { key: 'speed_to_lead',     label: 'Speed-to-Lead Alerts',       desc: 'SMS + email within 60 sec of new lead' },

  { key: 'auto_skip_trace',   label: 'Auto Skip-Trace',            desc: 'Enrich every new lead with phone/email' },

  { key: 'auto_lead_score',   label: 'AI Motivation Scoring',      desc: 'Score every lead 0–100 on creation' },

  { key: 'follow_up_15touch', label: '15-Touch Follow-Up Sequence', desc: 'Drip campaign across SMS, email, voicemail' },

  { key: 'buyer_drip',        label: 'Buyer Drip Campaign',         desc: 'Auto-blast new deals to your buyer list' },

  { key: 'auto_offer',        label: 'Auto Offer Engine',           desc: 'AI generates cash offers from MAO formula' },

  { key: 'social_auto_post',  label: 'Social Auto-Post',            desc: 'Daily posts to FB, IG, LinkedIn, TikTok' },

  { key: 'gbp_auto_review',   label: 'GBP Review Auto-Reply',       desc: 'AI responds to Google reviews' },

  { key: 'kpi_daily_digest',  label: 'Daily KPI Digest Email',      desc: 'Morning summary of yesterday\'s metrics' },

  { key: 'abandonment_alert', label: 'Form Abandonment Alerts',     desc: 'Recover incomplete lead forms' },

];

export default function AutomationToggles({ userEmail }) {

  const [states, setStates] = useState({});

  useEffect(() => {

    const saved = localStorage.getItem(`hl_automations_${userEmail}`);

    if (saved) {

      try { setStates(JSON.parse(saved)); } catch { /* ignore */ }

    } else {

      // Default: all on except auto_offer

      const defaults = {};

      AUTOMATIONS.forEach(a => { defaults[a.key] = a.key !== 'auto_offer'; });

      setStates(defaults);

    }

  }, [userEmail]);

  function toggle(key, value) {

    const next = { ...states, [key]: value };

    setStates(next);

    localStorage.setItem(`hl_automations_${userEmail}`, JSON.stringify(next));

    // Best-effort persist to backend (non-blocking)

    base44.functions.invoke('saveAutomationToggles', {

      user_email: userEmail,

      automations: next,

    }).catch(() => { /* silent */ });

  }

  const enabledCount = Object.values(states).filter(Boolean).length;

  return (

    <div style={{

      background: '#fff',

      borderRadius: 14,

      padding: 18,

      border: '1.5px solid #e2e8f0',

    }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

          <Zap size={16} color={GOLD} />

          <div style={{ fontWeight: 900, fontSize: 13, color: NAVY }}>Automated Workflows</div>

        </div>

        <div style={{

          fontSize: 11, fontWeight: 800, color: '#64748b',

          background: '#f1f5f9', padding: '3px 9px', borderRadius: 10,

        }}>

          {enabledCount}/{AUTOMATIONS.length} ON

        </div>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        {AUTOMATIONS.map(a => (

          <div key={a.key} style={{

            display: 'flex', alignItems: 'center', gap: 10,

            padding: '10px 0',

            borderBottom: '1px solid #f1f5f9',

          }}>

            <div style={{ flex: 1, minWidth: 0 }}>

              <div style={{ fontWeight: 700, fontSize: 12, color: NAVY, marginBottom: 2 }}>{a.label}</div>

              <div style={{ fontSize: 10, color: '#64748b', lineHeight: 1.4 }}>{a.desc}</div>

            </div>

            <StatusLight on={!!states[a.key]} size={9} />

            <ToggleSwitch

              checked={!!states[a.key]}

              onChange={v => toggle(a.key, v)}

              size="sm"

              label={a.label}

            />

          </div>

        ))}

      </div>

    </div>

  );

}
