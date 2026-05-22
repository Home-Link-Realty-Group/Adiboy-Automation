# New Microsoft Word Document (83)

Source: New Microsoft Word Document (83).docx

import \{ CheckCircle2, Lock, Circle, ChevronRight \} from 'lucide\-react';

const NAVY = '\#0B1F45';

const GOLD = '\#D4A843';

const GREEN = '\#16a34a';

/\*\*

 \* Sidebar step indicator for the locked onboarding flow\.

 \* States: locked | available | active | complete

 \*/

export default function StepCard\(\{ number, title, subtitle, state, required, onClick \}\) \{

  const config = \{

    complete:  \{ color: GREEN,    bg: '\#f0fdf4', Icon: CheckCircle2, label: 'COMPLETE' \},

    active:    \{ color: GOLD,     bg: '\#fffbeb', Icon: Circle,       label: 'IN PROGRESS' \},

    available: \{ color: '\#64748b',bg: '\#f8fafc', Icon: Circle,       label: 'READY' \},

    locked:    \{ color: '\#cbd5e1',bg: '\#f8fafc', Icon: Lock,         label: 'LOCKED' \},

  \}\[state\];

  const \{ color, bg, Icon, label \} = config;

  const clickable = state === 'available' || state === 'active' || state === 'complete';

  return \(

    <button

      onClick=\{clickable ? onClick : undefined\}

      disabled=\{\!clickable\}

      style=\{\{

        width: '100%',

        textAlign: 'left',

        background: state === 'active' ? '\#fff' : bg,

        border: state === 'active' ? \`2px solid $\{GOLD\}\` : '1\.5px solid \#e2e8f0',

        borderRadius: 12,

        padding: '14px 16px',

        cursor: clickable ? 'pointer' : 'not\-allowed',

        opacity: state === 'locked' ? 0\.6 : 1,

        transition: 'all 0\.15s',

        display: 'flex',

        alignItems: 'center',

        gap: 12,

      \}\}

    >

      <div style=\{\{

        width: 36, height: 36, borderRadius: '50%',

        background: state === 'complete' ? GREEN : state === 'active' ? GOLD : '\#e2e8f0',

        color: '\#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',

        fontWeight: 900, fontSize: 14, flexShrink: 0,

      \}\}>

        \{state === 'complete' ? <CheckCircle2 size=\{18\} /> : state === 'locked' ? <Lock size=\{14\} /> : number\}

      </div>

      <div style=\{\{ flex: 1, minWidth: 0 \}\}>

        <div style=\{\{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 \}\}>

          <span style=\{\{ fontSize: 13, fontWeight: 800, color: NAVY \}\}>\{title\}</span>

          \{required && <span style=\{\{ fontSize: 9, fontWeight: 800, color: '\#dc2626', background: '\#fef2f2', padding: '1px 5px', borderRadius: 3 \}\}>REQUIRED</span>\}

        </div>

        <div style=\{\{ fontSize: 11, color: '\#64748b', lineHeight: 1\.4 \}\}>\{subtitle\}</div>

        <div style=\{\{ fontSize: 9, fontWeight: 800, color, letterSpacing: 0\.5, marginTop: 4 \}\}>\{label\}</div>

      </div>

      \{clickable && state \!== 'complete' && <ChevronRight size=\{16\} color=\{color\} style=\{\{ flexShrink: 0 \}\} />\}

    </button>

  \);

\}
