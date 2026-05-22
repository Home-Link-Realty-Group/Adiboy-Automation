# New Microsoft Word Document (112)

Source: New Microsoft Word Document (112).docx

import { Zap } from 'lucide-react';

import SectionCard from '../SectionCard';

import SettingRow from '../SettingRow';

import Toggle from '../Toggle';

const GOLD = '#D4A843';

const NAVY = '#0B1F45';

const GREEN = '#16a34a';

// Cost badge / note — kept as no-op stubs.

// Specific dollar amounts removed to avoid misleading pricing claims.

// Each user's actual cost depends on their own provider plan (Twilio, Apify, etc).

function CostBadge() { return null; }

function CostNote() { return null; }

export default function AutomationsSection({ prefs, onChange, onSave, saving }) {

  return (

    <SectionCard icon={Zap} accent="#f59e0b" tint="#fef3c7" title="Automations" description="Master toggle for every automated workflow — costs shown per feature">

      <SettingRow

        title="Auto Skip-Trace"

        description="Automatically pull phone, email, and LLC info on every new lead"

        why="Saves 4-6 minutes of manual lookup per lead. At even 20 leads/day that's 2 hours back in your week — enough time to make 60+ extra dials.">

        <Toggle value={prefs.auto_skip_trace} onChange={v => onChange({ auto_skip_trace: v })} />

      </SettingRow>

      <SettingRow

        title="AI Motivation Scoring"

        description="Score every lead 0-100 based on distress, equity, urgency, and life events"

        why="80%+ of your deals come from the top 20% of leads. Scoring lets you call hottest first instead of working leads in random order — typically doubles deals/month for the same dial volume.">

        <Toggle value={prefs.auto_lead_score} onChange={v => onChange({ auto_lead_score: v })} />

      </SettingRow>

      <SettingRow

        title="15-Touch Follow-Up Sequence"

        description="Auto-drip across SMS, email, and voicemail for 90 days"

        why="80% of wholesale deals close on touch #5 or later. Most wholesalers stop after touch #2-3 and lose the deal to whoever follows up longer. This automation makes you that wholesaler.">

        <Toggle value={prefs.auto_followup_sequence} onChange={v => onChange({ auto_followup_sequence: v })} />

      </SettingRow>

      <SettingRow

        title="Buyer Drip Campaign"

        description="Auto-blast every new deal to your matched cash buyer list"

        why="Cuts your average days-to-assign from ~14 days down to ~3-5 days. Faster assignments = faster cash = more deals you can fund concurrently.">

        <Toggle value={prefs.auto_buyer_drip} onChange={v => onChange({ auto_buyer_drip: v })} />

      </SettingRow>

      <SettingRow

        title="Auto Offer Engine"

        description="AI generates and sends MAO-based cash offers automatically (advanced)"

        why="Powerful but risky — once an offer is sent, you're contractually exposed if the seller accepts. Only enable AFTER you've manually closed 5+ deals and trust your MAO formula completely.">

        <Toggle value={prefs.auto_offer_engine} onChange={v => onChange({ auto_offer_engine: v })} />

      </SettingRow>

      <SettingRow

        title="Social Auto-Post"

        description="Daily branded posts to Facebook, Instagram, LinkedIn, TikTok"

        why="Builds brand authority and inbound leads over 6-12 months. Don't expect short-term results, but turn ON early — compound growth means starting late costs you years of momentum.">

        <Toggle value={prefs.auto_social_post} onChange={v => onChange({ auto_social_post: v })} />

      </SettingRow>

      <div style={{ marginTop: 12, padding: 12, background: '#f8fafc', borderRadius: 8, fontSize: 12, color: '#475569' }}>

        Want to see the full workflow blueprints?{' '}

        <a href="/ControlCenter" style={{ color: '#0B1F45', fontWeight: 700 }}>Open Mission Control →</a>

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

        {saving ? 'Saving…' : 'Save Automations'}

      </button>

    </div>

  );

}
