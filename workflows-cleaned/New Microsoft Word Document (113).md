# New Microsoft Word Document (113)

Source: New Microsoft Word Document (113).docx

import { Mail } from 'lucide-react';

import SectionCard from '../SectionCard';

import SettingRow from '../SettingRow';

const GOLD = '#D4A843';

const inputSty = { width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', fontFamily: 'inherit' };

export default function CommunicationsSection({ prefs, onChange, onSave, saving }) {

  return (

    <SectionCard icon={Mail} accent="#0891b2" tint="#cffafe" title="Communications" description="Templates and signatures used across emails and SMS">

      <SettingRow title="Email Signature" description="Appended to every outbound email from the CRM"

        why="Keep it under 4 lines — long signatures with logos, social icons, and disclaimers trigger spam filters and tank your deliverability. Include name, company, phone, email. That's it.">

        <textarea

          value={prefs.email_signature || ''}

          onChange={e => onChange({ email_signature: e.target.value })}

          rows={5}

          placeholder="— Jane Smith&#10;Acme Real Estate LLC&#10;(555) 123-4567 · jane@acme.com"

          style={{ ...inputSty, resize: 'vertical' }}

        />

      </SettingRow>

      <SettingRow title="Speed-to-Lead SMS Template"

        description="Sent within 60 seconds of every new lead. Use {{name}}, {{address}}, {{agent}} as merge tags."

        why="Personalize with name + address — generic 'Hi, got your inquiry!' messages get 70% lower reply rates. Always include 'Reply STOP to opt out' to stay TCPA-compliant. Keep under 160 characters to avoid SMS splitting.">

        <textarea

          value={prefs.sms_speed_to_lead_text || ''}

          onChange={e => onChange({ sms_speed_to_lead_text: e.target.value })}

          rows={4}

          style={{ ...inputSty, resize: 'vertical' }}

        />

      </SettingRow>

      <SaveBar saving={saving} onSave={onSave} />

    </SectionCard>

  );

}

function SaveBar({ saving, onSave }) {

  return (

    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>

      <button onClick={onSave} disabled={saving}

        style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 800, fontSize: 13, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>

        {saving ? 'Saving…' : 'Save Templates'}

      </button>

    </div>

  );

}
