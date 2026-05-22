# New Microsoft Word Document (116)

Source: New Microsoft Word Document (116).docx

import { Phone } from 'lucide-react';

import SectionCard from '../SectionCard';

import SettingRow from '../SettingRow';

import Toggle from '../Toggle';

const GOLD = '#D4A843';

const inputSty = { width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, boxSizing: 'border-box' };

export default function DialerSection({ prefs, onChange, onSave, saving }) {

  return (

    <SectionCard icon={Phone} accent="#16a34a" tint="#dcfce7" title="Dialer & Calls" description="Power Dialer behavior and call recording defaults">

      <SettingRow title="Default Lines (Parallel Dial)" description="How many simultaneous calls each blast attempts"

        why="More lines = more pickups per hour, but also more 'dead air' when multiple sellers answer at once (you have to drop them, killing your reputation). 5 lines is the sweet spot for solo callers; 8+ requires a team to handle overflow.">

        <select value={prefs.dialer_lines} onChange={e => onChange({ dialer_lines: parseInt(e.target.value) })} style={inputSty}>

          <option value={1}>1 line</option>

          <option value={3}>3 lines</option>

          <option value={5}>5 lines (Starter cap)</option>

          <option value={8}>8 lines (Pro cap)</option>

          <option value={15}>15 lines (Enterprise)</option>

        </select>

      </SettingRow>

      <SettingRow title="Caller ID" description="Phone number sellers see on their caller ID"

        why="Use a LOCAL area code matching the market you're calling — local numbers get answered 3-4× more often than out-of-state numbers. Rotating numbers (Enterprise) prevents spam-flagging.">

        <input value={prefs.dialer_caller_id || ''} onChange={e => onChange({ dialer_caller_id: e.target.value })} style={inputSty} placeholder="+15555551234" />

      </SettingRow>

      <SettingRow title="Record All Calls" description="Save outbound call recordings to the lead record"

        why="Recordings are gold — review your top closers' calls for training, dispute 'I never said that' scenarios, and build AI call coaching. The 1¢/min Twilio cost pays for itself on the first deal.">

        <Toggle value={prefs.dialer_record_calls} onChange={v => onChange({ dialer_record_calls: v })} />

      </SettingRow>

      <SettingRow title="Recording Disclosure" description='Plays "this call may be recorded" before connecting (legally required in 12+ states)'

        why="REQUIRED in two-party consent states (CA, FL, IL, MD, MA, MT, NH, PA, WA + more). Recording without disclosure in these states is a felony. Keep this ON — period.">

        <Toggle value={prefs.dialer_recording_disclosure} onChange={v => onChange({ dialer_recording_disclosure: v })} />

      </SettingRow>

      <SettingRow title="Answering Machine Detection" description="Skip voicemails automatically and mark them as no-answer"

        why="AMD saves ~40% of your dialing time by auto-hanging on voicemails. False positives (~3-5%) occasionally hang up on real humans, but the time savings outweigh it. Disable only if you want to leave voicemails on every call.">

        <Toggle value={prefs.dialer_amd_enabled} onChange={v => onChange({ dialer_amd_enabled: v })} />

      </SettingRow>

      <SettingRow title="Auto Voicemail Drop" description="Drop a pre-recorded voicemail when AMD detects a machine (Enterprise feature)"

        why="Triples your daily voicemail count without adding time, but TCPA-risky if your voicemail isn't compliant. Get a real estate attorney to approve the script before turning this on.">

        <Toggle value={prefs.dialer_voicemail_drop} onChange={v => onChange({ dialer_voicemail_drop: v })} />

      </SettingRow>

      <div style={{ marginTop: 12, padding: 12, background: '#f8fafc', borderRadius: 8, fontSize: 12, color: '#475569' }}>

        Need to connect or change your Twilio account?{' '}

        <a href="/DialerSetup" style={{ color: '#0B1F45', fontWeight: 700 }}>Open Dialer Setup →</a>

      </div>

      <SaveBar saving={saving} onSave={onSave} />

    </SectionCard>

  );

}

function SaveBar({ saving, onSave }) {

  return (

    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>

      <button onClick={onSave} disabled={saving}

        style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 800, fontSize: 13, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>

        {saving ? 'Saving…' : 'Save Dialer Settings'}

      </button>

    </div>

  );

}
