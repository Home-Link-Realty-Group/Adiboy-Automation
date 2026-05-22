# New Microsoft Word Document (119)

Source: New Microsoft Word Document (119).docx

// Profile section

import { User } from 'lucide-react';

import SectionCard from '../SectionCard';

import SettingRow from '../SettingRow';

import AvatarPicker from '../AvatarPicker';

const GOLD = '#D4A843';

const inputSty = { width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, boxSizing: 'border-box' };

export default function ProfileSection({ prefs, email, onChange, onSave, saving }) {

  return (

    <SectionCard icon={User} accent="#3b82f6" tint="#dbeafe" title="Profile" description="Your name, photo, and account basics">

      <div style={{ paddingBottom: 18 }}>

        <AvatarPicker

          avatarUrl={prefs.avatar_url}

          avatarKind={prefs.avatar_kind}

          fullName={prefs.full_name}

          email={email}

          onChange={onChange}

        />

      </div>

      <SettingRow title="Full Name" description="Shown in emails, signatures, and the dialer"

        why="Sellers and cash buyers respond 2-3× more often to messages from a real person than from a company name. Always use the name of the human they'll actually talk to.">

        <input style={inputSty} value={prefs.full_name || ''} onChange={e => onChange({ full_name: e.target.value })} placeholder="Jane Smith" />

      </SettingRow>

      <SettingRow title="Email" description="Used to sign in and receive notifications"

        why="Use a business domain email (you@yourcompany.com) — Gmail/Yahoo addresses get flagged as spam 6× more often by seller email providers.">

        <input style={{ ...inputSty, background: '#f8fafc', color: '#64748b' }} value={email} disabled />

      </SettingRow>

      <SettingRow title="Phone" description="Your personal cell — used for hot-lead alerts"

        why="MIT research shows leads called within 60 seconds convert 391% higher. Put your real cell here so hot-lead SMS alerts reach you instantly.">

        <input style={inputSty} value={prefs.phone || ''} onChange={e => onChange({ phone: e.target.value })} placeholder="(555) 123-4567" />

      </SettingRow>

      <SettingRow title="Company" description="Optional — appears on signed documents and emails if you add it"

        why="Totally optional. If you do operate under an LLC and want it shown on contracts and outbound emails, we recommend entering it exactly as it appears on your operating agreement. You can always add or change this later — leave it blank if you'd rather not.">

        <input style={inputSty} value={prefs.company || ''} onChange={e => onChange({ company: e.target.value })} placeholder="Acme Real Estate LLC (optional)" />

      </SettingRow>

      <SettingRow title="Timezone" description="All times in the app convert to this"

        why="Set this to the timezone of the market you're calling, not where you live. Calling sellers at 9pm their time tanks contact rates and can violate TCPA quiet-hour rules.">

        <select style={inputSty} value={prefs.timezone} onChange={e => onChange({ timezone: e.target.value })}>

          <option value="America/New_York">Eastern (New York)</option>

          <option value="America/Chicago">Central (Chicago)</option>

          <option value="America/Denver">Mountain (Denver)</option>

          <option value="America/Phoenix">Arizona (Phoenix)</option>

          <option value="America/Los_Angeles">Pacific (Los Angeles)</option>

          <option value="America/Anchorage">Alaska</option>

          <option value="Pacific/Honolulu">Hawaii</option>

        </select>

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

        {saving ? 'Saving…' : 'Save Profile'}

      </button>

    </div>

  );

}
