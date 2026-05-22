# New Microsoft Word Document (117)

Source: New Microsoft Word Document (117).docx

import \{ Eye \} from 'lucide\-react';

import SectionCard from '\.\./SectionCard';

import SettingRow from '\.\./SettingRow';

const GOLD = '\#D4A843';

const inputSty = \{ width: '100%', padding: '10px 12px', border: '1\.5px solid \#e2e8f0', borderRadius: 8, fontSize: 13, boxSizing: 'border\-box' \};

const ACCENT\_OPTIONS = \['\#D4A843', '\#0B1F45', '\#16a34a', '\#7b2d8b', '\#dc2626', '\#0891b2', '\#d97706', '\#ec4899'\];

export default function DisplaySection\(\{ prefs, onChange, onSave, saving \}\) \{

  return \(

    <SectionCard icon=\{Eye\} accent="\#8b5cf6" tint="\#ede9fe" title="Display & Region" description="How information looks and which formats to use">

      <SettingRow title="Theme"

        why="Light mode is recommended for daytime calling — easier to read while you're talking\. Dark mode reduces eye strain for evening admin work, deal analysis, and CRM cleanup\.">

        <select value=\{prefs\.theme\} onChange=\{e => onChange\(\{ theme: e\.target\.value \}\)\} style=\{inputSty\}>

          <option value="light">Light</option>

          <option value="dark">Dark</option>

          <option value="system">Match system</option>

        </select>

      </SettingRow>

      <SettingRow title="UI Density" description="How tightly information packs in lists and tables"

        why="Compact fits ~40% more leads on screen — best for high\-volume callers\. Comfortable is the default\. Spacious is recommended if you use a smaller laptop screen or have any vision accessibility needs\.">

        <select value=\{prefs\.ui\_density\} onChange=\{e => onChange\(\{ ui\_density: e\.target\.value \}\)\} style=\{inputSty\}>

          <option value="compact">Compact</option>

          <option value="comfortable">Comfortable</option>

          <option value="spacious">Spacious</option>

        </select>

      </SettingRow>

      <SettingRow title="Accent Color" description="Used for buttons, highlights, and active states"

        why="Match this to your brand color so emails, contracts, and seller portals you generate stay consistent\. Don't pick red — it's psychologically associated with errors and warnings\.">

        <div style=\{\{ display: 'flex', gap: 8, flexWrap: 'wrap' \}\}>

          \{ACCENT\_OPTIONS\.map\(c => \(

            <button key=\{c\} onClick=\{\(\) => onChange\(\{ accent\_color: c \}\)\}

              aria\-label=\{\`Accent color $\{c\}\`\}

              style=\{\{

                width: 28, height: 28, borderRadius: '50%',

                background: c, border: prefs\.accent\_color === c ? '3px solid \#fff' : '2px solid transparent',

                outline: prefs\.accent\_color === c ? \`2px solid $\{c\}\` : 'none',

                cursor: 'pointer',

              \}\} />

          \)\)\}

        </div>

      </SettingRow>

      <SettingRow title="Currency"

        why="Affects how dollar amounts display in MAO calculations, offers, and contracts\. Set this to the currency of your active market — mixing currencies on contracts is a legal risk\.">

        <select value=\{prefs\.currency\} onChange=\{e => onChange\(\{ currency: e\.target\.value \}\)\} style=\{inputSty\}>

          <option value="USD">USD \($\)</option>

          <option value="CAD">CAD \($\)</option>

          <option value="EUR">EUR \(€\)</option>

          <option value="GBP">GBP \(£\)</option>

        </select>

      </SettingRow>

      <SettingRow title="Date Format"

        why="MM/DD/YYYY is the US legal standard for real estate contracts\. ISO \(YYYY\-MM\-DD\) is best for international teams and CSV exports\. Mixing formats on contracts can cause closing delays\.">

        <select value=\{prefs\.date\_format\} onChange=\{e => onChange\(\{ date\_format: e\.target\.value \}\)\} style=\{inputSty\}>

          <option value="MM/DD/YYYY">MM/DD/YYYY \(US\)</option>

          <option value="DD/MM/YYYY">DD/MM/YYYY \(EU\)</option>

          <option value="YYYY\-MM\-DD">YYYY\-MM\-DD \(ISO\)</option>

        </select>

      </SettingRow>

      <SettingRow title="First Day of Week" description="Used in calendars and weekly views"

        why="Most wholesalers track KPIs Monday\-Sunday because Saturday/Sunday calls have very different conversion rates than weekday calls\. Pick Sunday only if you do a Sunday morning planning ritual\.">

        <select value=\{prefs\.first\_day\_of\_week\} onChange=\{e => onChange\(\{ first\_day\_of\_week: e\.target\.value \}\)\} style=\{inputSty\}>

          <option value="sunday">Sunday</option>

          <option value="monday">Monday</option>

        </select>

      </SettingRow>

      <SaveBar saving=\{saving\} onSave=\{onSave\} />

    </SectionCard>

  \);

\}

function SaveBar\(\{ saving, onSave \}\) \{

  return \(

    <div style=\{\{ marginTop: 20, display: 'flex', justifyContent: 'flex\-end' \}\}>

      <button onClick=\{onSave\} disabled=\{saving\}

        style=\{\{ background: GOLD, color: '\#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 800, fontSize: 13, cursor: saving ? 'not\-allowed' : 'pointer', opacity: saving ? 0\.6 : 1 \}\}>

        \{saving ? 'Saving…' : 'Save Display'\}

      </button>

    </div>

  \);

\}
