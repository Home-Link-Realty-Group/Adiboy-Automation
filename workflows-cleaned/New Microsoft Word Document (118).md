# New Microsoft Word Document (118)

Source: New Microsoft Word Document (118).docx

import { Bell } from 'lucide-react';

import SectionCard from '../SectionCard';

import SettingRow from '../SettingRow';

import Toggle from '../Toggle';

const GOLD = '#D4A843';

const inputSty = { width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, boxSizing: 'border-box' };

export default function NotificationsSection({ prefs, onChange, onSave, saving }) {

  return (

    <SectionCard icon={Bell} accent="#ec4899" tint="#fce7f3" title="Notifications" description="When and how the app reaches out to you">

      <SettingRow title="New Lead — Email" description="Email you the moment a new lead lands"

        why="Useful for record-keeping and forwarding to VAs, but email alone is too slow — average open time is 90 minutes. Pair this with SMS for actual speed-to-lead.">

        <Toggle value={prefs.notify_new_lead_email} onChange={v => onChange({ notify_new_lead_email: v })} />

      </SettingRow>

      <SettingRow title="New Lead — SMS" description="Text your phone within 60 seconds of every new lead"

        why="This is the single highest-ROI notification you can enable. Leads contacted in under 60 seconds convert 391% higher than 5+ minute response times (MIT study). Keep this ON.">

        <Toggle value={prefs.notify_new_lead_sms} onChange={v => onChange({ notify_new_lead_sms: v })} />

      </SettingRow>

      <SettingRow title="Hot Leads Only" description="Only notify for leads scoring 70+ (silences low-priority alerts)"

        why="Turn this ON once you're getting 30+ leads/day — alert fatigue is real and you'll start ignoring all of them. Keep OFF in your first 90 days when every lead is worth a call.">

        <Toggle value={prefs.notify_hot_lead_only} onChange={v => onChange({ notify_hot_lead_only: v })} />

      </SettingRow>

      <SettingRow title="Daily Digest Email" description="Yesterday's calls, leads, deals, and revenue rolled up"

        why="Single most important habit-builder we offer. The wholesalers who close 3+ deals/month read this every morning. Closes the loop on whether yesterday actually moved the needle.">

        <Toggle value={prefs.notify_daily_digest} onChange={v => onChange({ notify_daily_digest: v })} />

      </SettingRow>

      <SettingRow title="Digest Delivery Time" description="When the daily digest arrives (your local timezone)"

        why="6 AM is recommended — it lands before you start dialing so you can adjust your KPIs for the day. Avoid 9-10 AM when you should already be on the phones.">

        <input type="time" value={prefs.digest_time} onChange={e => onChange({ digest_time: e.target.value })} style={inputSty} />

      </SettingRow>

      <SettingRow title="Quiet Hours" description="Pause SMS notifications during these hours"

        why="Federal TCPA law restricts seller calls to 8 AM – 9 PM in their local time. Quiet hours protects you from accidentally responding to a 2 AM lead alert by texting back outside legal hours.">

        <Toggle value={prefs.quiet_hours_enabled} onChange={v => onChange({ quiet_hours_enabled: v })} />

      </SettingRow>

      {prefs.quiet_hours_enabled && (

        <>

          <SettingRow title="Quiet Hours Start">

            <input type="time" value={prefs.quiet_hours_start} onChange={e => onChange({ quiet_hours_start: e.target.value })} style={inputSty} />

          </SettingRow>

          <SettingRow title="Quiet Hours End">

            <input type="time" value={prefs.quiet_hours_end} onChange={e => onChange({ quiet_hours_end: e.target.value })} style={inputSty} />

          </SettingRow>

        </>

      )}

      <SaveBar saving={saving} onSave={onSave} />

    </SectionCard>

  );

}

function SaveBar({ saving, onSave }) {

  return (

    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>

      <button onClick={onSave} disabled={saving}

        style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 800, fontSize: 13, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>

        {saving ? 'Saving…' : 'Save Notifications'}

      </button>

    </div>

  );

}
