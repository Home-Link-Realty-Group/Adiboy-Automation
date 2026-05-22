# New Microsoft Word Document (115)

Source: New Microsoft Word Document (115).docx

import \{ Calculator, Check \} from 'lucide\-react';

import SectionCard from '\.\./SectionCard';

import SettingRow from '\.\./SettingRow';

import Toggle from '\.\./Toggle';

import \{ MAO\_FORMULAS, MAO\_FORMULA\_ORDER, calculateAllMAO \} from '@/lib/maoFormulas';

const NAVY = '\#0B1F45';

const GOLD = '\#D4A843';

const inputSty = \{ width: '100%', padding: '10px 12px', border: '1\.5px solid \#e2e8f0', borderRadius: 8, fontSize: 13, boxSizing: 'border\-box' \};

const SAMPLE = \{ arv: 220000, repairs: 35000, fee: 10000, monthlyHolding: 600, holdingMonths: 4, monthlyRent: 1650, targetCap: 0\.08 \};

const fmt = \(n\) => '$' \+ Math\.round\(n\)\.toLocaleString\(\);

export default function DealDefaultsSection\(\{ prefs, onChange, onSave, saving \}\) \{

  const all = calculateAllMAO\(SAMPLE\);

  return \(

    <SectionCard icon=\{Calculator\} accent="\#D4A843" tint="\#fef3c7" title="Deal Defaults" description="The numbers and formulas pre\-filled on every new deal analysis">

      \{/\* Formula picker \*/\}

      <SettingRow title="Default MAO Formula" description="Pre\-selected on every Deal Analysis\. You can switch per\-deal\." badge="MOST USED" badgeColor=\{GOLD\}

        why="The 70% Rule is the industry default and what 80%\+ of cash buyers expect\. Use 65% in soft/declining markets \(more cushion\), 75% in hot markets where buyers accept thin margins\. Cap Rate is for BRRRR/rental buyers only\.">

        

        <select value=\{prefs\.default\_mao\_formula\} onChange=\{e => onChange\(\{ default\_mao\_formula: e\.target\.value \}\)\} style=\{inputSty\}>

          \{MAO\_FORMULA\_ORDER\.map\(id => \(

            <option key=\{id\} value=\{id\}>\{MAO\_FORMULAS\[id\]\.label\} — \{MAO\_FORMULAS\[id\]\.short\}</option>

          \)\)\}

        </select>

      </SettingRow>

      \{/\* Live preview — every formula side\-by\-side \*/\}

      <div style=\{\{ marginTop: 14, padding: 16, background: '\#f8fafc', borderRadius: 10, border: '1px solid \#e2e8f0' \}\}>

        <div style=\{\{ display: 'flex', alignItems: 'center', justifyContent: 'space\-between', marginBottom: 10, flexWrap: 'wrap', gap: 6 \}\}>

          <div style=\{\{ fontSize: 11, fontWeight: 800, color: NAVY, letterSpacing: 0\.5 \}\}>LIVE PREVIEW — every formula on the same sample deal</div>

          <div style=\{\{ fontSize: 11, color: '\#64748b' \}\}>ARV \{fmt\(SAMPLE\.arv\)\} · Repairs \{fmt\(SAMPLE\.repairs\)\} · Fee \{fmt\(SAMPLE\.fee\)\}</div>

        </div>

        <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fit, minmax\(160px, 1fr\)\)', gap: 10 \}\}>

          \{all\.map\(f => \{

            const isDefault = f\.id === prefs\.default\_mao\_formula;

            return \(

              <button key=\{f\.id\} onClick=\{\(\) => onChange\(\{ default\_mao\_formula: f\.id \}\)\}

                style=\{\{

                  textAlign: 'left', cursor: 'pointer',

                  background: isDefault ? '\#fefce8' : '\#fff',

                  border: \`1\.5px solid $\{isDefault ? GOLD : '\#e2e8f0'\}\`,

                  borderRadius: 10, padding: 12, position: 'relative',

                \}\}>

                \{isDefault && \(

                  <div style=\{\{ position: 'absolute', top: 8, right: 8, background: GOLD, color: '\#fff', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' \}\}>

                    <Check size=\{11\} strokeWidth=\{3\} />

                  </div>

                \)\}

                <div style=\{\{ fontSize: 9, fontWeight: 800, color: f\.badgeColor, marginBottom: 4, letterSpacing: 0\.5 \}\}>\{f\.badge\}</div>

                <div style=\{\{ fontWeight: 800, color: NAVY, fontSize: 13, marginBottom: 6 \}\}>\{f\.label\}</div>

                <div style=\{\{ fontSize: 18, fontWeight: 900, color: NAVY \}\}>\{fmt\(f\.value\)\}</div>

                <div style=\{\{ fontSize: 10, color: '\#64748b', marginTop: 4 \}\}>\{f\.short\}</div>

              </button>

            \);

          \}\)\}

        </div>

      </div>

      <SettingRow title="Show all formulas on Deal Analysis" description="Display all 6 calculations side\-by\-side instead of just your default"

        why="Seeing every formula at once stops you from leaving money on the table\. If three formulas all land near $112K but one says $145K, you immediately spot the outlier\.">

        <Toggle value=\{prefs\.show\_all\_mao\_formulas\} onChange=\{v => onChange\(\{ show\_all\_mao\_formulas: v \}\)\} />

      </SettingRow>

      <SettingRow title="Default ARV Comp Radius" description="How far out to pull sold comps when estimating ARV"

        why="0\.5 mi is the sweet spot — same buyer pool, same school zone, same micro\-market\. Tighten to 0\.25 mi only in dense urban grids; widen to 1 mi only in rural/sparse markets\. Going wider than 1 mi is the \#1 cause of inflated ARVs\.">

        <select value=\{prefs\.default\_arv\_radius\_miles\} onChange=\{e => onChange\(\{ default\_arv\_radius\_miles: parseFloat\(e\.target\.value\) \}\)\} style=\{inputSty\}>

          <option value=\{0\.25\}>0\.25 miles — Tight \(same blocks\)</option>

          <option value=\{0\.5\}>0\.5 miles — Standard \(same neighborhood\)</option>

          <option value=\{1\}>1 mile — Wide \(same submarket\)</option>

        </select>

      </SettingRow>

      <SettingRow title="Default Rehab Tier" description="Pre\-selected when you open a new deal"

        why="Most wholesale deals are 'Average' — kitchen \+ bath updates, paint, flooring\. Pick 'Always ask' if you work multiple markets or property types where one default doesn't fit\.">

        <select value=\{prefs\.default\_repair\_tier\} onChange=\{e => onChange\(\{ default\_repair\_tier: e\.target\.value \}\)\} style=\{inputSty\}>

          <option value="light">Light — $15\-25/sqft \(cosmetic\)</option>

          <option value="average">Average — $25\-40/sqft \(kitchen \+ bath\)</option>

          <option value="heavy">Heavy — $40\-75/sqft \(full gut\)</option>

          <option value="always\_ask">Ask me per\-deal</option>

        </select>

      </SettingRow>

      <SettingRow title="Default Assignment Fee" description="Your typical wholesale fee — subtracted from MAO"

        why="$10K is the national median assignment fee\. Set this to your real average — too low and your MAO is too high \(you'll lose deals to better\-priced wholesalers\); too high and your offers get rejected by sellers\.">

        <input type="number" value=\{prefs\.default\_wholesale\_fee\} onChange=\{e => onChange\(\{ default\_wholesale\_fee: parseFloat\(e\.target\.value\) || 0 \}\)\} style=\{inputSty\} />

      </SettingRow>

      <SettingRow title="Holding Period \(months\)" description="Used in All\-In Cost formula for carrying costs"

        why="Most fix\-and\-flip buyers underwrite 4 months\. Use 6 in slow markets \(winter, high DOM areas\) and 3 in hot markets\. Each extra month is ~$600\-1500 in carrying costs that comes out of your spread\.">

        <input type="number" value=\{prefs\.default\_holding\_months\} onChange=\{e => onChange\(\{ default\_holding\_months: parseFloat\(e\.target\.value\) || 0 \}\)\} style=\{inputSty\} />

      </SettingRow>

      <SettingRow title="Closing Costs %" description="Buyer's closing cost % subtracted from offers"

        why="3% is the typical investor closing cost \(title, escrow, attorney, transfer tax\)\. It's higher in NY/NJ/PA \(4\-5%\) and lower in TX/FL \(2\-2\.5%\)\. Don't skip this — it's the silent profit killer on tight deals\.">

        <input type="number" step="0\.5" value=\{prefs\.default\_closing\_cost\_pct\} onChange=\{e => onChange\(\{ default\_closing\_cost\_pct: parseFloat\(e\.target\.value\) || 0 \}\)\} style=\{inputSty\} />

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

        \{saving ? 'Saving…' : 'Save Deal Defaults'\}

      </button>

    </div>

  \);

\}
