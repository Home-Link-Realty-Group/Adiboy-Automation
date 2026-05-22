# New Microsoft Word Document (114)

Source: New Microsoft Word Document (114).docx

import \{ ShieldCheck \} from 'lucide\-react';

import SectionCard from '\.\./SectionCard';

import SettingRow from '\.\./SettingRow';

import Toggle from '\.\./Toggle';

const GOLD = '\#D4A843';

export default function ComplianceSection\(\{ prefs, onChange, onSave, saving \}\) \{

  return \(

    <SectionCard icon=\{ShieldCheck\} accent="\#dc2626" tint="\#fee2e2" title="Compliance & Legal" description="TCPA, DNC, and consent settings — keep your business bulletproof">

      <SettingRow title="TCPA Strict Mode" description="Only dial numbers with documented consent \(TrustedForm cert \+ timestamp\)" badge="RECOMMENDED" badgeColor="\#16a34a"

        why="TCPA fines run $500\-$1,500 PER CALL with no cap\. One angry seller filing a class\-action can end your business\. Strict mode auto\-blocks any number without a valid consent record — non\-negotiable for serious operators\.">

        <Toggle value=\{prefs\.tcpa\_strict\_mode\} onChange=\{v => onChange\(\{ tcpa\_strict\_mode: v \}\)\} />

      </SettingRow>

      <SettingRow title="DNC Check Before Dialing" description="Block any number on the federal Do\-Not\-Call registry" badge="REQUIRED" badgeColor="\#dc2626"

        why="The FTC fines $43,792 per violation as of 2024\. The federal DNC registry has 250M\+ numbers — at scale, you WILL hit them\. This check costs $0\.001 per lookup and prevents company\-ending fines\.">

        <Toggle value=\{prefs\.dnc\_check\_before\_dial\} onChange=\{v => onChange\(\{ dnc\_check\_before\_dial: v \}\)\} />

      </SettingRow>

      <div style=\{\{ marginTop: 12, padding: 14, background: '\#fef2f2', border: '1px solid \#fecaca', borderRadius: 8, fontSize: 12, color: '\#7f1d1d', lineHeight: 1\.6 \}\}>

        <strong>Heads up:</strong> Disabling DNC checks or TCPA strict mode can result in fines up to $40,000 per call under federal law\. Keep these on unless you have explicit legal counsel telling you otherwise\.

      </div>

      <SaveBar saving=\{saving\} onSave=\{onSave\} />

    </SectionCard>

  \);

\}

function SaveBar\(\{ saving, onSave \}\) \{

  return \(

    <div style=\{\{ marginTop: 20, display: 'flex', justifyContent: 'flex\-end' \}\}>

      <button onClick=\{onSave\} disabled=\{saving\}

        style=\{\{ background: GOLD, color: '\#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 800, fontSize: 13, cursor: saving ? 'not\-allowed' : 'pointer', opacity: saving ? 0\.6 : 1 \}\}>

        \{saving ? 'Saving…' : 'Save Compliance'\}

      </button>

    </div>

  \);

\}
